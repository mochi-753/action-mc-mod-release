import type { InputLoaderStrategy } from "./strategy.js";

export class DirectInputStrategy implements InputLoaderStrategy {
    constructor(private readonly direct: string | Promise<string>) {
    }

    async loadInput(): Promise<string> {
        return Promise.resolve(await this.direct);
    }
}
