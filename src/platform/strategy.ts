import type { Artifact } from "./common/artifact.js";
import type { CurseForgeMetadata } from "./curseforge/metadata.js";

export interface PublisherStrategy {
    publish(inputs: { metadata: CurseForgeMetadata, files: Artifact[] }): Promise<Response>
}
