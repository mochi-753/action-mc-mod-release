import type {ChangelogStrategy} from "./strategy.js";
import {DirectChangelogStrategy} from "./directStrategy.js";
import {FileChangelogStrategy} from "./fileStrategy.js";

export function createChangelogStrategy(inputs: { changelog?: string, path?: string }): ChangelogStrategy {
    if (inputs.changelog && inputs.changelog.trim().length > 0) {
        return new DirectChangelogStrategy(inputs.changelog)
    }

    if (inputs.path && inputs.path.trim().length > 0) {
        return new FileChangelogStrategy(inputs.path)
    }

    return {getChangelog: async () => ''}
}
