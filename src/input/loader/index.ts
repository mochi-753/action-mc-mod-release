import type { InputLoaderStrategy } from "./strategy.js";
import { DirectInputStrategy } from "./directStrategy.js";
import { PathInputStrategy } from "./pathStrategy.js";

export function createInputLoaderStrategy(inputs: { direct?: string, path?: string }): InputLoaderStrategy {
    if (inputs.direct && inputs.direct.trim().length > 0) {
        return new DirectInputStrategy(inputs.direct)
    }

    if (inputs.path && inputs.path.trim().length > 0) {
        return new PathInputStrategy(inputs.path)
    }

    return { loadInput: async () => '' }
}
