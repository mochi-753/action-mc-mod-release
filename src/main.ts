import { getBooleanInput, getInput, getMultilineInput } from "@actions/core"
import type { ReleaseMetadata } from "./publish/releaseMetadata.js";
import { createChangelogLoaderStrategy } from "./changelog/loader/index.js";

export async function main(): Promise<void> {
}

async function parseInputs(): Promise<ReleaseMetadata> {
    const changelogType = getInput('changelog_type')
    const changelogStrategy = createChangelogLoaderStrategy({
        changelog: getInput('changelog'),
        path: getInput('changelog_path')
    })
    const changelog = await changelogStrategy.loadChangelog()
    const name = getInput('name')
    const versionNumber = getInput('version_number')
    const releaseType = getInput('release_type')
    const normalizedReleaseType =
        releaseType === 'release' || releaseType === 'beta' || releaseType === 'alpha' ? releaseType : 'release'
    const mcVersions = getMultilineInput('mc_versions')
    const loaders = getMultilineInput('loaders')
    const side = getMultilineInput('side')
    const manualRelease = getBooleanInput('manual_release')
    const curseforgeDependencies = 'undefined' // TODO: あとでやる
    const curseforgeProjectID = getInput('curseforge_project_id')
    const curseforgeToken = getInput('curseforge_token')
    const modrinthDependencies = undefined // TODO: あとでやる
    const modrinthProjectID = getInput('modrinth_project_id')
    const modrinthToken = getInput('modrinth_token')

    const result: ReleaseMetadata = {
        changelog: changelog,
        side: side,
        gameVersions: mcVersions,
        loaders: loaders,
        name: name,
        releaseType: normalizedReleaseType
    }

    if (curseforgeProjectID && curseforgeProjectID.trim().length > 0) {
        const curseforgeMetadata = {
            curseforge: {
                changelogType: changelogType,
                gameVersions: mcVersions,
                isMarkedForManualRelease: manualRelease,
                projectID: curseforgeProjectID
            }
        }

        if (curseforgeDependencies && curseforgeDependencies.trim().length > 0) {
            Object.assign(curseforgeMetadata, { curseforgeDependencies })
        }

        Object.assign(result, { curseforgeMetadata })
    }

    return result
}
