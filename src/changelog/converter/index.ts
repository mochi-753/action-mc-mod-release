import type {ChangelogConverter} from "./converter.js";
import {MarkdownChangelogConverter} from "./markdownConverter.js";

type ConvertMode = "MarkdownToHtml"

export function createChangelogConverter(inputs: {
    rawChangelog: string | Promise<string>,
    convertMode: ConvertMode
}): ChangelogConverter {
    switch (inputs.convertMode) {
        case "MarkdownToHtml":
            return new MarkdownChangelogConverter(inputs.rawChangelog)
    }
}
