const fs = require('fs')

const entryGet = async () => {
    const location = '.localData/entries'
    if (!fs.existsSync(location)) {
        return []
    }
    const entriesNames = await fs.readdirSync(location)
    const entries = []
    for (const name of entriesNames) {
        try {
            const entry = await fs.readFileSync(`${location}/${name}/data.json`, 'utf8')
            const entryObj = JSON.parse(entry)
            entries.push(entryObj)
        } catch (err) {
            console.log(`Error reading "${name}", error message: ${err}`)
        }
    }
    return entries
}

module.exports = entryGet