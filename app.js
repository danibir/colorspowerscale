//variables

const express = require('express')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const os = require('os')
const path = require('path')
const env = require("dotenv")
env.config()

//const mid_main = require('./middleware/mid-main')

const router_main = require('./routers/rou-main')
const router_entry = require('./routers/rou-entry')

const renderErrorPage = require('./handlers/renderErrorPage')

const app = express()

//config

app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(cookieParser())
//app.use(mid_main.setLocals)

//routers
app.use('/', router_main)
app.use('/entry', router_entry)
app.use((req, res) => {
    renderErrorPage(res, 404, "No page found.")
})
app.listen(3000)