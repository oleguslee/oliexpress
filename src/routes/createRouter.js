const Category = require('../db/models/Category.model')
const Good = require('../db/models/Good.model')
const router = require('express').Router()

//REST API
router
  .route('/')
  .get(async (req, res) => {
    const listGoods = await Good.find().populate('category')
    const listCategory = await Category.find()
    console.log('listCategory', listCategory)
    res.render('create', { listGoods, listCategory })
  })

  .post(async (req, res) => {
    const good = req.body
    const newGood = await Good.create(good)
    console.log(newGood)
    res.json(newGood)
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
  .get(async (req, res) => {
    const goodIdEdit = req.params.id;
    const goodEdit = await Good.findById(goodIdEdit).populate('category')
    console.log('goodEdit====>', goodEdit)
    const categoryEdit = await Category.find()
    console.log('categoryEdit=====>', categoryEdit)
    res.render('edit', { goodEdit, categoryEdit })
  })

  .post(async (req, res) => {
    const goodEdited = req.params.id
    await Good.findByIdAndUpdate(goodEdited, req.body)
    res.redirect('/create')
  })



module.exports = router
