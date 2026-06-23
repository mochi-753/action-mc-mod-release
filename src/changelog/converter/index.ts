import type { ChangelogConverterStrategy } from "./strategy.js";
import { MarkdownChangelogConverterStrategy } from "./markdownStrategy.js";
import type { ConvertMode } from "./mode.js";

export function createChangelogConverterStrategy(inputs: { changelog: string, mode?: ConvertMode }): ChangelogConverterStrategy {
    switch (inputs.mode) {
        case 'MarkdownToHtml':
            return new MarkdownChangelogConverterStrategy(inputs.changelog)
        case undefined:
            return { convert: async () => '' }
        default:
            return { convert: async () => '' }
    }
}
