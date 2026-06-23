import { readFile } from "node:fs/promises"
import type { InputLoaderStrategy } from "./strategy.js";

export class PathInputStrategy implements InputLoaderStrategy {
    constructor(private readonly path: string | Promise<string>) {
    }

    async loadInput(): Promise<string> {
        try {
            return readFile(await this.path, 'utf-8')
        } catch (e) {
            throw new Error(`Failed to read file at ${await this.path}`)
        }
    }
}
