const entryGet = require('../handlers/entryGet.js')

const index_get = async (req, res) => {
    const entries = await entryGet()
    let results = entries
    const search = req.query.search
    if (search) {
        const term = search.toLowerCase()
        results = entries.filter(e =>
            e.name.toLowerCase().includes(term)
        )
    }
    res.render('index', { entries: results, search })
}

module.exports = {
    index_get
}