import type { Metadata } from "../common/metadata.js";
import type { ChangelogType } from "./changelogType.js";
import type { CurseForgeDependency } from "./dependency.js";

export interface CurseForgeMetadata extends Metadata {
    changelogType: ChangelogType;
    parentFileID?: number;
    gameVersions: number[];
    gameVersionNames: string[];
    isMarkedForManualRelease: boolean;
    relations?: CurseForgeDependency;
}
