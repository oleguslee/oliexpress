const Category = require('../db/models/Category.model')
const Good = require('../db/models/Good.model')
const router = require('express').Router()
const { registeredUser, selfAccess } = require('../middlewars/access')

//REST API
router
  .route('/')
  .get(registeredUser, async (req, res) => {
    try {
      const listGoods = await Good.find({ seller: req.session.userId }).populate('category').lean()
      const listCategory = await Category.find()
      return res.render('create', { listGoods, listCategory })
    } catch (error) {
      console.log(error);
    }
  })

  .post(async (req, res) => {
    try {
      const good = req.body
      const newGood = await Good.create({ ...good, seller: req.session.userId })
      console.log(newGood);
      const category = await Category.findById(newGood.category).lean()
      const goodWithCategory = { ...JSON.parse(JSON.stringify(newGood)), category }   //glubokaya kopiya objecta 
      res.json(goodWithCategory)
    } catch (error) {
      console.log(error);
    }
  })
//--------------------------------------

router.delete("/:id", async (req, res) => {
  const goodId = req.params.id;
  try {
    await Good.findOneAndDelete({ _id: goodId });
    console.log("success");
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
});

router
  .route('/:id')
  .get(selfAccess, async (req, res) => {
    const goodIdEdit = req.params.id;
    const goodEdit = await Good.findById(goodIdEdit).populate('category')
    const goodCategoryId = JSON.stringify(goodEdit.category._id)   //приводим к строке, так как монго Г
    const categoryEditAll = await Category.find()
    const categoryFlaged = categoryEditAll.map((category) => {
      if (JSON.stringify(category._id) === goodCategoryId) { //приводим к строке, так как монго Г
        category.isCurrent = true
      }
      return category
    })
    res.render('edit', { goodEdit, categoryFlaged })
  })


  .post(async (req, res) => {
    const goodEdited = req.params.id
    await Good.findByIdAndUpdate(goodEdited, req.body)
    res.redirect('/create')
  })



module.exports = router
