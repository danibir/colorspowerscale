const express = require('express')
const Router = express.Router()

const c_entry = require('../controllers/con-entry')

const multer = require('multer')
const storageImg = multer.diskStorage({
  destination: "public/localImg/entry",
  filename: (req, file, cb) => cb(null, `${req.params.id}.${file.mimetype.split("/")[1]}`)
});
const uploadImg = multer({ storage: storageImg })
const storageEntry = multer.diskStorage({
  destination: ".temp",
  filename: (req, file, cb) => cb(null, `upload.zip`)
});
const uploadEntry = multer({ storage: storageEntry })

Router.get('/', c_entry.list_get)
Router.post('/create/template', c_entry.createTemplate_post)
Router.get('/create', c_entry.create_get)
Router.post('/create', c_entry.create_post)
Router.get('/edit/:id', c_entry.edit_get)
Router.post('/edit/:id', c_entry.edit_post)
Router.get('/view/:id', c_entry.view_get)
Router.get('/changeImage/:id', c_entry.imgch_get)
Router.post('/changeImage/:id', uploadImg.single('img'), c_entry.imgch_post)
Router.get('/deleted', c_entry.delete_get)
Router.post('/delete/:id', c_entry.delete_post)
Router.get('/format/:id', c_entry.format_get)
Router.get('/upload', c_entry.upload_get)
Router.post('/upload', uploadEntry.single('zip'), c_entry.upload_post)

module.exports = Router