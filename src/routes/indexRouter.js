const router = require('express').Router()
const Category = require('../db/models/Category.model')
const Good = require('../db/models/Good.model')

router
  .route('/')
  .get(async (req, res) => {
    try {
      const listGoods = await Good.find().populate('category').lean()
      const listCategory = await Category.find()
      res.render('index', { listGoods, listCategory })
    } catch (error) {
      console.log('get / error =====>', error)
    }
  })

module.exports = router
