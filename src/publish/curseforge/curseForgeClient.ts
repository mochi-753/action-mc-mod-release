import type {Artifact} from "../buildArtifact.js";
import type {CurseForgeRequest} from "./curseforgeRequest.js";

export class CurseForgeClient {
    constructor(private token: string, private userAgent?: string, private baseURL: string = 'https://minecraft.curseforge.com/api') {
    }

    async uploadFile(params: { file: Artifact, req: CurseForgeRequest }): Promise<void> {
        const formData = new FormData()
        formData.append("metadata", new Blob([JSON.stringify(params.req)], {type: "application/json"}))
        formData.append("file", new Blob([new Uint8Array(params.file.file)], {type: "application/java-archive"}), params.file.fileName)

        const response = await fetch(
            `${this.baseURL}/projects/${params.req.projectID}/upload-file`,
            {
                method: 'POST',
                headers: {
                    'User-Agent': this.userAgent !== undefined ? this.userAgent : '',
                    'X-Api-Token': this.token
                },
                body: formData as any
            }
        )

        if (!response.ok) {
            throw new Error(`Failed to create CurseForge Release. ${response.status} ${response.statusText} - ${await response.text()}`)
        }
    }
}
