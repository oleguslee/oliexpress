const Category = require('../db/models/Category.model')
const Good = require('../db/models/Good.model')
const router = require('express').Router()
const { registeredUser, selfAccess } = require('../middlewars/access')

router
  .route('/')
  .get((req, res) => {
    try {
      res.render('cart')
    } catch (error) {
      console.error(error)
    }
  })

module.exports = router;
