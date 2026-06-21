import type {ChangelogStrategy} from "./strategy.js";

export class DirectChangelogStrategy implements ChangelogStrategy {
    constructor(private changelog: string) {
    }

    async getChangelog(): Promise<string> {
        return Promise.resolve(this.changelog);
    }
}
