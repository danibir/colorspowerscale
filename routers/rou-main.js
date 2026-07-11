const express = require('express')
const Router = express.Router()

const c_main = require('../controllers/con-main')

Router.get('/', c_main.index_get)

module.exports = Router