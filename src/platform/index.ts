import type { PublisherStrategy } from "./strategy.js";
import { CurseForgePublisherStrategy } from "./curseforge/publisherStrategy.js";

export function createPublisherStrategy(
    curseforge?: { projectID: string | Promise<string>, token: string | Promise<string> },
    userAgent?: string | Promise<string>
): PublisherStrategy {
    if (curseforge) {
        return new CurseForgePublisherStrategy(curseforge.projectID, curseforge.token, userAgent)
    }

    return { publish: async () => new Response(null, { status: 400 }) }
}
