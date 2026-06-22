import { readFile } from "node:fs/promises"
import type { ChangelogLoaderStrategy } from "./strategy.js";

export class FileChangelogStrategy implements ChangelogLoaderStrategy {
    constructor(private path: string) {
    }

    async loadChangelog(): Promise<string> {
        try {
            return readFile(this.path, 'utf-8')
        } catch (e) {
            throw new Error(`Failed to read changelog file at ${this.path}`)
        }
    }
}
