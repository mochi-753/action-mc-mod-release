import type { ChangelogConverterStrategy } from "./strategy.js";
import { marked } from "marked";

export class MarkdownChangelogConverterStrategy implements ChangelogConverterStrategy {
    constructor(private changelog: string) {
    }

    async convert(): Promise<string> {
        try {
            return marked.parse(this.changelog)
        } catch (e) {
            throw new Error(`The changelog could not be converted to HTML format. Changelog: ${this.changelog}`)
        }
    }
}
