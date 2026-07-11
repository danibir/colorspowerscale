const fs = require('fs')
const returnError = require('./returnError')

const folderDelete = async (folderPath) => {
    if (fs.existsSync(folderPath)) {
        console.log('Entry folder found.')
    } else {
        return returnError(0, `Error deleting folder (${folderPath}), folder not found`)
    }
    fs.rm(folderPath, { recursive: true, force: true }, (err) => {
        if (err) return returnError(1, `Error deleting folder ${folderPath}, error: ${err}`)
    })
}

module.exports = folderDelete