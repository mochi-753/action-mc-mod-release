import { ApiClient } from "../common/apiClient.js";

export class CurseForgeApiClient extends ApiClient {
    constructor(protected readonly baseURL: string | Promise<string>, private readonly projectID: string | Promise<string>) {
        super(baseURL);
    }

    async publish(httpObject: RequestInit | Promise<RequestInit>): Promise<Response> {
        return fetch(`${await this.baseURL}/api/projects/${await this.projectID}/upload-file`, await httpObject)
    }
}
