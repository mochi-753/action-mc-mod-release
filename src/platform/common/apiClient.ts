export abstract class ApiClient {
    constructor(protected readonly baseURL: string | Promise<string>) {
    }

    abstract publish(httpObject: RequestInit | Promise<RequestInit>): Promise<Response>
}
