import type {ChangelogConverterStrategy} from "./strategy.js";
import {marked} from "marked";

export class MarkdownChangelogConverterStrategy implements ChangelogConverterStrategy {
    constructor(private rawChangelog: string | Promise<string>) {
    }

    async convert(): Promise<string> {
        try {
            return marked.parse(typeof this.rawChangelog === 'string' ? this.rawChangelog : await this.rawChangelog)
        } catch (e) {
            throw new Error(`The changelog could not be converted to HTML format. Changelog: ${this.rawChangelog}`)
        }
    }
}
