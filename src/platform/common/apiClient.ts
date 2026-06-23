export abstract class ApiClient {
    protected constructor(protected readonly baseURL: string | Promise<string>) {
    }

    abstract publish(httpObject: RequestInit | Promise<RequestInit>): Promise<Response>
}
