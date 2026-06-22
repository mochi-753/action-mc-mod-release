import type {ChangelogConverterStrategy} from "./strategy.js";
import {MarkdownChangelogConverterStrategy} from "./markdownStrategy.js";

type ConvertMode = "MarkdownToHtml"

export function createChangelogConverter(inputs: {
    rawChangelog: string | Promise<string>,
    convertMode: ConvertMode
}): ChangelogConverterStrategy {
    switch (inputs.convertMode) {
        case "MarkdownToHtml":
            return new MarkdownChangelogConverterStrategy(inputs.rawChangelog)
    }
}
