import type {Publisher} from "../publisher.js";
import type {ReleaseMetadata} from "../releaseMetadata.js";
import type {CurseForgeClient} from "./curseForgeClient.js";
import type {CurseForgeRequest} from "./curseforgeRequest.js";
import type {Artifact} from "../buildArtifact.js";

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
            gameVersionNames: metadata.curseforge.gameVersionNames,
            gameVersions: metadata.curseforge.gameVersions,
            releaseType: metadata.releaseType,
            projectID: metadata.curseforge.projectID
        }

        if (metadata.curseforge.isMarkedForManualRelease) {
            Object.assign(curseforgeRequest, {isMarkedForManualRelease: metadata.curseforge.isMarkedForManualRelease})
        }

        if (metadata.curseforge.parentFileID) {
            Object.assign(curseforgeRequest, {parentFileID: metadata.curseforge.parentFileID})
        }

        if (metadata.curseforge.relations) {
            Object.assign(curseforgeRequest, {relations: metadata.curseforge.relations})
        }

        try {
            for (const artifact of artifacts) {
                await this.client.uploadFile({file: artifact, req: curseforgeRequest})
            }
        } catch (e) {
            throw new Error(`Failed to create CurseForge Release.`)
        }
    }
}
