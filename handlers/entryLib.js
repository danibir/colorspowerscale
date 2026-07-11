const entryGet = require('./entryGet')

const entryLib = async () => {
    const entries = await entryGet()
    const lib = {
        species: [],
        origins: [],
        abilities: []
    }
    for (entry of entries) {
        if (entry.species) lib.species.push(entry.species)
        if (entry.origin) lib.origins.push(entry.origin)
        if (entry.abilities) {
            for (ability of entry.abilities) {
                lib.abilities.push(ability)
            }
        }
    }
    return lib
}

module.exports = entryLib