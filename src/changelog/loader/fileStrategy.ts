import {readFile} from "node:fs/promises"
import type {ChangelogStrategy} from "./strategy.js";

export class FileChangelogStrategy implements ChangelogStrategy {
    constructor(private path: string) {
    }

    async getChangelog(): Promise<string> {
        try {
            return readFile(this.path, 'utf-8')
        } catch (e) {
            throw new Error(`Failed to read changelog file at ${this.path}`)
        }
    }
}
