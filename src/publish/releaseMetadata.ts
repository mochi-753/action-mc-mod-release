export type ReleaseMetadata = {
    name: string;
    changelog: string;
    releaseType: 'release' | 'beta' | 'alpha';

    curseforge?: {
        changelogType: 'text' | 'html' | 'markdown';
        parentFileID?: number;
        gameVersions: number[];
        gameVersionNames: string[];
        isMarkedForManualRelease?: boolean;
        relations?: {
            projects: object[];
        };

        projectID: string;
    };

    modrinth?: {
        versionNumber: string;
        dependencies: object[];
        gameVersions: string[];
        loaders: string[];
        featured: boolean;
        fileParts: string[];
        primaryFile: string;

        projectID: string;
    };
}
