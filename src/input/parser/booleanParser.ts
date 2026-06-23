export async function getBooleanInput(value: string | Promise<string>): Promise<boolean> {
    return Promise.resolve((await value).toUpperCase() === 'TRUE')
}
