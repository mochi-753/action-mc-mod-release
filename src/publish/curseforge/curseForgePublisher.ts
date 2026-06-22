import type { Publisher } from "../publisher.js";
import type { ReleaseMetadata } from "../releaseMetadata.js";
import type { CurseForgeClient } from "./curseForgeClient.js";
import type { CurseForgeRequest } from "./curseforgeRequest.js";
import type { Artifact } from "../buildArtifact.js";
import { normalize } from "./curseforgeNormalizer.js";
import { info } from "@actions/core";
import { createChangelogConverterStrategy } from "../../changelog/converter/index.js";

export class CurseForgePublisher implements Publisher {
    constructor(private client: CurseForgeClient) {
    }

    async publish(artifacts: Artifact[], metadata: ReleaseMetadata): Promise<void> {
        if (!metadata.curseforge) {
            throw new Error(`The metadata is missing elements required for CurseForge. Metadata: ${metadata}`)
        }

        const curseforgeRequest: CurseForgeRequest = {
            changelog: metadata.changelog,
            changelogType: metadata.curseforge.changelogType,
            displayName: metadata.name,
            gameVersionNames: [],
            gameVersions: [],
            releaseType: metadata.releaseType,
            projectID: metadata.curseforge.projectID
        }

        const gameVersionSlugs: string[] = metadata.gameVersions.map(s => s.toLowerCase().replace(/\./g, '-'))
        curseforgeRequest.gameVersions = await this.client.fetchGameVersions({ slugs: gameVersionSlugs })

        const gameVersionNames: string[] = []
        metadata.side.map(s => normalize(s)).forEach(s => gameVersionNames.push(s))
        metadata.loaders.map(s => normalize(s)).forEach(s => gameVersionNames.push(s))
        metadata.gameVersions.forEach(s => gameVersionNames.push(s))

        if (metadata.curseforge.isMarkedForManualRelease) {
            Object.assign(curseforgeRequest, { isMarkedForManualRelease: metadata.curseforge.isMarkedForManualRelease })
        }

        if (metadata.curseforge.relations) {
            Object.assign(curseforgeRequest, { relations: metadata.curseforge.relations })
        }

        if (curseforgeRequest.changelogType === 'markdown') {
            const changelogConverter = createChangelogConverterStrategy({
                changelog: curseforgeRequest.changelog,
                mode: 'MarkdownToHtml'
            })

            curseforgeRequest.changelogType = 'html'
            curseforgeRequest.changelog = await changelogConverter.convert()
        }

        info(`[CurseForge] Generated metadata: ${JSON.stringify(curseforgeRequest)}`)

        try {
            await Promise.all(
                artifacts.map(artifact => this.client.uploadFile({ file: artifact, req: curseforgeRequest }))
            )
        } catch (e) {
            throw new Error(`Failed to create CurseForge Release: ${String(e)}`)
        }
    }
}
