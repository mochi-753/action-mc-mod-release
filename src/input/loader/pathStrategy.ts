import { readFile } from "node:fs/promises"
import type { InputLoaderStrategy } from "./strategy.js";

export class PathInputStrategy implements InputLoaderStrategy {
    constructor(private path: string) {
    }

    async loadInput(): Promise<string> {
        try {
            return readFile(this.path, 'utf-8')
        } catch (e) {
            throw new Error(`Failed to read file at ${this.path}`)
        }
    }
}
