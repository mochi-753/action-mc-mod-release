import type { ChangelogLoaderStrategy } from "./strategy.js";

export class DirectChangelogStrategy implements ChangelogLoaderStrategy {
    constructor(private changelog: string) {
    }

    async loadChangelog(): Promise<string> {
        return Promise.resolve(this.changelog);
    }
}
