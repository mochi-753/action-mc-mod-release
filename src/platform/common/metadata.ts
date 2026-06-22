import type { ReleaseType } from "./releaseType.js";

export interface Metadata {
    name: string;
    changelog: string;
    releaseType: ReleaseType;
}
