const router = require('express').Router()
const User = require('../db/models/User.model')
const saltRounds = 10 // 0 - шифрование
const bcrypt = require('bcrypt'); // 1 -  шифрование
const Cart = require('../db/models/Cart.model');

router
  .route('/login')
  .get((req, res) => {
    res.render('login')
  })
  .post(async (req, res) => {
    try {
      const { name, email, password } = req.body
      const findUser = await User.findOne({ email })
      const comparePassword = await bcrypt.compare(password, findUser.password); // 2 - шифрование
      if (findUser && comparePassword) {
        req.session.name = findUser.name
        req.session.userId = findUser._id
        res.redirect('/create')
      }
    } catch (error) {
      console.log(error)
      res.redirect('/user/login')
    }
  })

router.get('/logout', (req, res) => {
  req.session.destroy()
  res.redirect('/')
})

router
  .route('/registration')
  .get((req, res) => {
    res.render('registration');
  })
  .post(async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const hash = await bcrypt.hash(password, saltRounds) // 3 - шифрование
      const newUser = await User.create({
        name,
        email,
        password: hash, // 4 - шифрование
      })
      if (newUser) {
        req.session.name = newUser.name
        req.session.userId = newUser._id
        await Cart.create({ buyer: newUser._id })
        res.redirect('/create')
      }
    } catch (error) {
      console.log(error)
      res.redirect('/user/registration')
    }
  })

module.exports = router;
