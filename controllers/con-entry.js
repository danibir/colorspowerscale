const archiver = require('archiver')
const fs = require('fs')

const entryWrite = require('../handlers/entryWrite')
const entryGet = require('../handlers/entryGet')
const entryParse = require('../handlers/entryParse')
const entryLib = require('../handlers/entryLib')
const entryFormat = require('../handlers/entryFormat')
const fileDelete = require('../handlers/fileDelete')
const folderDelete = require('../handlers/folderDelete')
const renderErrorPage = require('../handlers/renderErrorPage')

const model = require('../model')
const stats = model.stats
const variations = model.variations

const createChoose_get = (req, res) => {
    res.render('entrycreatechoose', { })
}
const create_get = async (req, res) => {
    const lib = await entryLib()
    res.render('entrycreate', { stats, variations, lib })
}
const createTemplate_post = async (req, res) => {
    const object = {
        stats: {}
    }
    object.id = await model.createId()
    object.name = `Template ${object.id}`
    entryWrite(object, object.id)
    res.redirect(`/entry/view/${object.id}`)
}
const create_post = async (req, res) => {
    const input = req.body
    let output = await entryParse(input)
    console.log(output)
    if (!output.success) {
        console.log(output.error.message)
        return renderErrorPage(res, 500, `Server issue. (${output.error.message}.)`)
    }
    output = output.output
    output.id = await model.createId()
    entryWrite(output, output.id)
    res.redirect(`/entry/view/${output.id}`)
}
const edit_get = async (req, res) => {
    const id = req.params.id
    const lib = await entryLib()
    const entries = await entryGet()
    const entry = entries.find(e => e.id == id)
    if (!entry) return renderErrorPage(res, 404, 'No page found.')
    res.render('entryedit', { stats, variations, entry, lib })
}
const edit_post = async (req, res) => {
    const input = req.body
    const id = req.params.id
    const entries = await entryGet()
    const entry = entries.find(e => e.id == id)
    if (!entry) return renderErrorPage(res, 500, `Server issue. (you tried to edit an entry that doesn't exist.)`)
    let output = await entryParse(input)
    console.log(output)
    if (!output.success) {
        console.log(output.error.message)
        return renderErrorPage(res, 500, `Server issue. (${output.error.message}.)`)
    }
    output = output.output
    output.id = id
    output.img = entry.img
    entryWrite(output, output.id)
    res.redirect(`/entry/view/${id}`)
}
const view_get = async (req, res) => {
    const entries = await entryGet()
    const id = req.params.id
    const entry = entries.find(e => e.id == id)
    if (!entry) return renderErrorPage(res, 404, 'No page found.')
    res.render('entryview', { stats, variations, entry })
}
const imgch_get = async (req, res) => {
    const entries = await entryGet()
    const id = req.params.id
    const entry = entries.find(e => e.id == id)
    if (!entry) return renderErrorPage(res, 404, 'No page found.')
    
    const folderName = 'public/entimg'
    if (fs.existsSync(folderName)) {
        console.log('Entry image collection folder found.')
    } else {
        console.log('Entry image collection folder does not exist. Creating folder.')
        fs.mkdirSync(folderName, {}, (err)=>{
            console.log(err)
        })
    }
    res.render('entryimgch', { entry })
}
const imgch_post = async (req, res) => {
    const entries = await entryGet()
    const id = req.params.id
    const entry = entries.find(e => e.id == id)
    if (!entry) return renderErrorPage(res, 500, `Server issue. (you tried to change the image of an entry that doesn't exist.)`)
    entry.img = req.file.filename
    entryWrite(entry, entry.id)
    res.redirect(`/entry/view/${id}`)
}
const delete_get = (req, res) => {
    res.render('entryDeleted')
}
const delete_post = async (req, res) => {
    const entries = await entryGet()
    const id = req.params.id
    const entry = entries.find(e => e.id == id)
    if (!entry) return renderErrorPage(res, 500, `Server issue. (you tried to delete an entry that doesn't exist.)`)

    if (entry.img) {
        const imgfail = fileDelete('public/entimg', entry.img)
        if (imgfail) return res.json({ message: 'image deletion fail' })
        delete entry.img
    }

    const filefail = await folderDelete(`entries/entry-${entry.id}`)
    if (filefail) return res.json({ message: 'entry deletion fail' })
    
    return res.redirect('/')
}
const format_get = async (req, res) => {
    const entries = await entryGet()
    const id = req.params.id
    const entry = entries.find(e => e.id == id)
    if (!entry) return renderErrorPage(res, 500, `Server issue. (you tried to format an entry that doesn't exist.)`)
    
    const entryF = entryFormat(entry)
    console.log(entryF)

    const filename = `${entry.name}.zip`
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`)
    res.setHeader('Content-Type', 'application/zip')
    
    const archive = archiver('zip', { zlib: { level: 9 } })
    archive.pipe(res)
    archive.append(entryF, { name: "document.txt" })
    if (entry.img) {
        console.log(entry.img)
        const imageLoc = `public/entimg/${entry.img}`
        const newImageName = `image.${entry.img.split(".")[1]}`
        console.log(imageLoc)
        console.log(newImageName)
        archive.file(imageLoc, { name: newImageName})
    }
    archive.finalize()
}

module.exports = {
    createChoose_get,
    createTemplate_post,
    create_get,
    create_post,
    edit_get,
    edit_post,
    view_get,
    imgch_get,
    imgch_post,
    delete_get,
    delete_post,
    format_get
}