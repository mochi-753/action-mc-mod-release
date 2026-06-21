export type ReleaseMetadata = {
    name: string;
    changelog: string;
    releaseType: 'release' | 'beta' | 'alpha';
    gameVersions: string[];
    loaders: string[];
    side: string[]

    curseforge?: {
        changelogType: 'text' | 'html' | 'markdown';
        gameVersions: number[];
        isMarkedForManualRelease?: boolean;
        relations?: {
            projects: object[];
        };

        projectID: string;
    };

    modrinth?: {
        versionNumber: string;
        dependencies: object[];
        featured: boolean;
        fileParts: string[];
        primaryFile: string;

        projectID: string;
    };
}
