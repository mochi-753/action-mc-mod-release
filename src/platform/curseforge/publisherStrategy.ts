import type { PublisherStrategy } from "../strategy.js";
import type { CurseForgeMetadata } from "./metadata.js";
import type { Artifact } from "../common/artifact.js";
import { CurseForgeRequest } from "./request.js";
import { CurseForgeApiClient } from "./apiClient.js";

export class CurseForgePublisherStrategy implements PublisherStrategy {
    constructor(
        private readonly projectID: string | Promise<string>,
        private readonly token: string | Promise<string>,
        private readonly userAgent?: string | Promise<string>
    ) {
    }

    async publish(inputs: { metadata: CurseForgeMetadata, files: Artifact[] }): Promise<Response> {
        if (inputs.files.length !== 1) {
            throw new Error('The CurseForge release process, which allows only one file to be uploaded at a time, received multiple files.')
        }

        const curseforgeRequest = new CurseForgeRequest(this.token, this.userAgent)
        const curseforgeApiClient = new CurseForgeApiClient('https://minecraft.curseforge.com', await this.projectID)

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const formData = curseforgeRequest.buildPublishFormData({ metadata: inputs.metadata, file: inputs.files[0]! })
        const requestInit = curseforgeRequest.buildRequestInit({ method: 'POST', formData: formData })

        return curseforgeApiClient.publish(requestInit);
    }
}
