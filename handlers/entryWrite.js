const fs = require('fs')

const entryWrite = (obj, filename) => {
    const jsonString = JSON.stringify(obj, null, 2)
    let folderName = 'entries'
    if (fs.existsSync(folderName)) {
        console.log('Entry collection folder found.')
    } else {
        console.log('Entry collection folder does not exist. Creating folder.')
        fs.mkdirSync(folderName, {}, (err)=>{
            if (err) {
                console.error(`Error creating folder ((${folderName})), error: `, err)
            } else {
                console.log(`Successfully created folder (${folderName})`)
            }
        })
    }
    folderName = `${folderName}/entry-${filename}`
    if (fs.existsSync(folderName)) {
        console.log('Entry folder found.')
    } else {
        console.log('Entry-folder does not exist. Creating folder.')
        fs.mkdirSync(folderName, {}, (err)=>{
            if (err) {
                console.error(`Error creating folder ((${folderName})), error: `, err)
            } else {
                console.log(`Successfully created folder (${folderName})`)
            }
        })
    }
    const fileNameUse = `${folderName}/data.json`
    console.log(fileNameUse)
    fs.writeFileSync(fileNameUse, jsonString, (err) => {
        if (err) {
            console.error(`Error writing file ((${fileNameUse})), error: `, err)
        } else {
            console.log(`Successfully wrote file (${fileNameUse})`)
        }
    })
}

module.exports = entryWrite