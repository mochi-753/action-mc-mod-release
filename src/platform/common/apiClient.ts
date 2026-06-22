export abstract class ApiClient {
    constructor(protected readonly baseURL: string) {
    }

    abstract publish(httpObject: RequestInit | Promise<RequestInit>): Promise<Response>
}
