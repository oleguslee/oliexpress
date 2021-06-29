/* eslint-disable no-undef */
// require('dotenv').config()
const express = require('express')
const connect = require('./src/db/config/connect')
const hbs = require('hbs')
const session = require('express-session')
const path = require('path')
const morgan = require("morgan")
const app = express()
const MongoStore = require('connect-mongo')
const { dbUrl } = require('./src/db/config/config') // сессию в базу
const indexRouter = require('./src/routes/indexRouter')
const createRouter = require('./src/routes/createRouter')
const userRouter = require('./src/routes/userRouter')
const cartRouter = require('./src/routes/cartRouter')


const PORT = 3000
connect()

hbs.registerPartials(path.join(__dirname, "src", "views", "partials"))
app.use(express.static(path.resolve("public")))
app.use(morgan('dev'))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, "src", "views"))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({    //мидлвар express-session
  secret: 'thisissecretkeyTssssssss!',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },   //true для https
  store: MongoStore.create({ mongoUrl: dbUrl }) //сессию в базу

}))

app.use((req, res, next) => {    //мидлвар локальной переменной
  res.locals.name = req.session?.name;
  res.locals.id = req.session.userId
  next()
}
)

app.use('/cart', cartRouter)
app.use('/create', createRouter)
app.use('/user', userRouter)
app.use('/', indexRouter)

app.listen(PORT, () => {
  console.log('Server started on port ', PORT)
})
