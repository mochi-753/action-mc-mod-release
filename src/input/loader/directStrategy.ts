import type { InputLoaderStrategy } from "./strategy.js";

export class DirectInputStrategy implements InputLoaderStrategy {
    constructor(private direct: string) {
    }

    async loadInput(): Promise<string> {
        return Promise.resolve(this.direct);
    }
}
