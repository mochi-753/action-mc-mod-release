import type {ChangelogLoaderStrategy} from "./strategy.js";
import {DirectChangelogStrategy} from "./directStrategy.js";
import {FileChangelogStrategy} from "./fileStrategy.js";

export function createChangelogLoaderStrategy(inputs: { changelog?: string, path?: string }): ChangelogLoaderStrategy {
    if (inputs.changelog && inputs.changelog.trim().length > 0) {
        return new DirectChangelogStrategy(inputs.changelog)
    }

    if (inputs.path && inputs.path.trim().length > 0) {
        return new FileChangelogStrategy(inputs.path)
    }

    return { loadChangelog: async () => '' }
}
