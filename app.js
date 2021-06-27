/* eslint-disable no-undef */
// require('dotenv').config()
const express = require('express')
const connect = require('./src/db/config/connect')
const hbs = require('hbs')
const path = require('path')
const morgan = require("morgan")
const app = express()
const indexRouter = require('./src/routes/indexRouter')
const createRouter = require('./src/routes/createRouter')
const userRouter = require('./src/routes/userRouter')

const PORT = 3000
connect()

app.use(express.static(path.resolve("public")))
app.use(morgan('dev'))
app.set('view engine', 'hbs')
app.set('views', path.resolve("src", "views"))
hbs.registerPartials(path.resolve("src", "views", "partials"))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user', userRouter)
app.use('/create', createRouter)
app.use('/', indexRouter)

app.listen(PORT, () => {
  console.log('Server started on port ', PORT)
})
