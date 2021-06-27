const router = require('express').Router()

router
  .route('/login')
  .get((req, res) => {
    res.render('login')
  })
  .post((req, res) => {
    res.redirect('/user/login')
  })

router
  .route('/registration')
  .get((req, res) => {
    res.render('registration');
  })
  .post((req, res) => {
    res.redirect('/user/registration')
  })

module.exports = router;
