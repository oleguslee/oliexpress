const router = require('express').Router()
const User = require('../db/models/User.model')

router
  .route('/login')
  .get((req, res) => {
    res.render('login')
  })
  .post(async (req, res) => {
    try {
      console.log('reqbody====>', req.body)
      const { email, password } = req.body
      const findUser = await User.findOne({ email, password })
      console.log(findUser)
      if (findUser) {
        req.session.username = findUser.name
      }
      res.redirect('/create')
    } catch (error) {
      res.redirect('/user/login')
    }
  })

router
  .route('/registration')
  .get((req, res) => {
    res.render('registration');
  })
  .post(async (req, res) => {
    try {
      console.log('reqbody====>', req.body)
      await User.create(req.body)
      req.session.username = req.body.name
      res.redirect('/create')

    } catch (error) {
      console.log(error)
      res.redirect('/user/registration')
    }
  })

module.exports = router;
