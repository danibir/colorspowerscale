const setMetaData = require('../handlers/setMetaData.js')

const index_get = (req, res) => {
    setMetaData(req, res, "index get", "Home", "home")
    res.render('index')
}


module.exports = {
    index_get
}