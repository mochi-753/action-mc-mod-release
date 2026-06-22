export interface ChangelogLoaderStrategy {
    loadChangelog(): Promise<string>
}
