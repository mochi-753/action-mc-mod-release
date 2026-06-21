const ALIAS: Record<string, string> = {
    client: 'Client',
    server: 'Server',
    forge: 'Forge',
    lexforge: 'Forge',
    neoforge: 'NeoForge',
    neo: 'NeoForge',
    fabric: 'Fabric',
    quilt: 'Quilt'
}

export function normalize(input: string): string {
    const key = input.trim().toLowerCase()
    const result = ALIAS[key]

    if (!result || result.trim().length === 0) {
        throw new Error(`Unknown: ${input}`)
    }

    return result
}
