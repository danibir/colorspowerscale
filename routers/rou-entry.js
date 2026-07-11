const express = require('express')
const Router = express.Router()

const c_entry = require('../controllers/con-entry')

const multer = require('multer')
const storage = multer.diskStorage({
  destination: "public/entimg",
  filename: (req, file, cb) => cb(null, `${req.params.id}.${file.mimetype.split("/")[1]}`)
});

const upload = multer({ storage })

Router.get('/create', c_entry.create_get)
Router.post('/create', c_entry.create_post)
Router.get('/edit/:id', c_entry.edit_get)
Router.post('/edit/:id', c_entry.edit_post)
Router.get('/view/:id', c_entry.view_get)
Router.get('/changeImage/:id', c_entry.imgch_get)
Router.post('/changeImage/:id', upload.single('img'), c_entry.imgch_post)
Router.get('/delete', c_entry.delete_get)
Router.post('/delete/:id', c_entry.delete_post)
Router.get('/format/:id', c_entry.format_get)

module.exports = Router