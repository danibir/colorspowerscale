const fs = require('fs')
const returnError = require('./returnError')

const fileDelete = (folder, file) => {
  const filePath = `${folder}/${file}`;
  if (!fs.existsSync(filePath)) {
    return returnError(0, `Error deleting image (${filePath}); image not found.`)
  }
  fs.unlinkSync(filePath);
}

module.exports = fileDelete