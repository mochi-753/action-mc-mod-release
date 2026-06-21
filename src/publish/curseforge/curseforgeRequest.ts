export type CurseForgeRequest = {
    changelog: string;
    changelogType: string;
    displayName: string;
    parentFileID?: number;
    gameVersions: number[];
    gameVersionNames: string[];
    releaseType: string;
    isMarkedForManualRelease?: boolean;
    relations?: {
        projects: object[];
    };
    projectID: string;
}
