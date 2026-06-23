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

    async publish(inputs: { metadata: CurseForgeMetadata, file: Artifact }): Promise<Response> {
        const curseforgeRequest = new CurseForgeRequest(this.token, this.userAgent)
        const formData = curseforgeRequest.buildPublishFormData({ metadata: inputs.metadata, file: inputs.file })
        const requestInit = curseforgeRequest.buildRequestInit({ method: 'POST', formData: formData })

        const curseforgeApiClient = new CurseForgeApiClient('https://minecraft.curseforge.com', await this.projectID)
        return curseforgeApiClient.publish(requestInit);
    }
}
