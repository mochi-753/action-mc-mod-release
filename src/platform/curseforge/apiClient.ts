import { ApiClient } from "../common/apiClient.js";

export class CurseForgeApiClient extends ApiClient {
    constructor(protected readonly baseURL: string, private readonly projectID: string) {
        super(baseURL);
    }

    async publish(httpObject: RequestInit | Promise<RequestInit>): Promise<Response> {
        return fetch(`${this.baseURL}/api/projects/${this.projectID}/upload-file`, await httpObject)
    }
}
