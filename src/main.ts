import {getBooleanInput, getInput, getMultilineInput} from "@actions/core"
import type {ReleaseMetadata} from "./publish/releaseMetadata.js";
import {createChangelogStrategy} from "./changelog/loader/index.js";
import {createChangelogConverter} from "./changelog/converter/index.js";

export async function main(): Promise<void> {
}

async function parseInputs(): Promise<ReleaseMetadata> {
    const changelogType = getInput('changelog_type')
    const changelogStrategy = createChangelogStrategy({
        changelog: getInput('changelog'),
        path: getInput('changelog_path')
    })
    const changelog = await changelogStrategy.getChangelog()
    const convertedChangelog = createChangelogConverter({
        rawChangelog: changelog,
        convertMode: 'MarkdownToHtml'
    }).convert()
    const name = getInput('name')
    const versionNumber = getInput('version_number')
    const releaseType = getInput('release_type')
    const mcVersions = getMultilineInput('mc_versions')
    const loaders = getMultilineInput('loaders')
    const side = getMultilineInput('side')
    const manualRelease = getBooleanInput('manual_release')
    // const curseforgeDependencies = TODO: あとでやる
    const curseforgeProjectID = getInput('curseforge_project_id')
    const curseforgeToken = getInput('curseforge_token')
    // const modrinthDependencies = TODO: あとでやる
    const modrinthProjectID = getInput('modrinth_project_id')
    const modrinthToken = getInput('modrinth_token')

    return {
        changelog: "", name: "", releaseType: 'release'
    };
}
