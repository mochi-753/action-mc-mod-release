export interface ChangelogStrategy {
    getChangelog(): Promise<string>
}
