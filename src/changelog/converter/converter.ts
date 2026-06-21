export interface ChangelogConverter {
    convert(): Promise<string>
}
