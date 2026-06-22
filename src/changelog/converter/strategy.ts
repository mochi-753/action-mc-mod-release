export interface ChangelogConverterStrategy {
    convert(): Promise<string>
}
