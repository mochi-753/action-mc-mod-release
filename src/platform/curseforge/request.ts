import { PlatformRequest } from "../common/request.js";
import type { Artifact } from "../common/artifact.js";
import type { CurseForgeMetadata } from "./metadata.js";

export class CurseForgeRequest extends PlatformRequest {
    async buildPublishFormData(inputs: { metadata: CurseForgeMetadata; file: Artifact }): Promise<FormData> {
        const metadata = {
            changelog: inputs.metadata.changelog,
            changelogType: inputs.metadata.changelogType,
            displayName: inputs.metadata.name,
            gameVersions: inputs.metadata.gameVersions,
            gameVersionNames: inputs.metadata.gameVersionNames,
            releaseType: inputs.metadata.releaseType,
            isMarkedForManualRelease: inputs.metadata.isMarkedForManualRelease,
        }

        if (inputs.metadata.parentFileID) {
            Object.assign(metadata, { parentFileID: inputs.metadata.parentFileID })
        }

        if (inputs.metadata.relations) {
            Object.assign(metadata, { relations: inputs.metadata.relations })
        }

        const formData = new FormData()
        formData.append('metadata', JSON.stringify(metadata))
        formData.append('file', new Blob([new Uint8Array(inputs.file.file)], { type: 'application/java-archive' }), inputs.file.fileName)

        return Promise.resolve(formData);
    }

    async buildRequestInit(inputs: { method: string, formData?: FormData | Promise<FormData> }): Promise<RequestInit> {
        return {
            method: inputs.method,
            headers: {
                'X-Api-Token': this.token,
                'User-Agent': this.userAgent
            },
            body: await inputs.formData ?? null
        }
    }
}
