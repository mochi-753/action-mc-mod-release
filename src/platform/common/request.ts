import type { Metadata } from "./metadata.js";
import type { Artifact } from "./artifact.js";

export abstract class PlatformRequest {
    constructor(protected readonly token: string | Promise<string>, protected readonly userAgent?: string | Promise<string>) {
    }

    abstract buildPublishFormData(inputs: { metadata: Metadata, file: Artifact }): Promise<FormData>

    abstract buildRequestInit(inputs: { method: string | Promise<string>, formData?: FormData | Promise<FormData> }): Promise<RequestInit>
}
