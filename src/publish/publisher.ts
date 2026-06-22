import type { ReleaseMetadata } from "./releaseMetadata.js";
import type { Artifact } from "./buildArtifact.js";

export interface Publisher {
    publish(artifacts: Artifact[], metadata: ReleaseMetadata): Promise<void>
}
