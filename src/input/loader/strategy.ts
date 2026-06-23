export interface InputLoaderStrategy {
    loadInput(): Promise<string>
}
