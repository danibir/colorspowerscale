const entryGet = require('./entryGet')

const entryLib = async () => {
    function countElm (arr, targetValue) {
        return arr.filter(item => item === targetValue).length;
    }
    function sortByCount (arr) {
        arr.sort((elm1, elm2)=>{
            return countElm(arr, elm2) - countElm(arr, elm1)
        })
    }
    function removeDups (arr) {
        const seen = new Set()
        const result = []
        arr.forEach(elm => {
            if (!seen.has(elm)) {
                seen.add(elm)
                result.push(elm)
            }
        })
        return result
    }
    function getTopResults (arr) {
        sortByCount(arr)
        return removeDups(arr)
    }
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
    lib.species = getTopResults(lib.species)
    lib.origins = getTopResults(lib.origins)
    lib.abilities = getTopResults(lib.abilities)
    return lib
}

module.exports = entryLib