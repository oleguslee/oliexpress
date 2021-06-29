const Category = require('../db/models/Category.model')
const Good = require('../db/models/Good.model')
const Cart = require('../db/models/Cart.model')
const router = require('express').Router()
const { registeredUser, selfAccess } = require('../middlewars/access')

router.get('/', (req, res) => {
  res.render('cart')
})
router
  .route('/:id')
  .post(registeredUser, async (req, res) => {
    try {
      const goodId = req.params.id;

      await Good.findByIdAndUpdate(
        goodId,
        { $inc: { quantity: -1 } },
        { new: true }
      )
      await Cart.findOneAndUpdate(
        { buyer: req.session.userId },
        {
          $push:
          {
            cartGoods:
            {
              good: goodId,
              $inc: { counter: +1 }
            }
          }
        });
      res.sendStatus(200)
    } catch (error) {
      console.error(error)
      res.sendStatus(500)
    }
  })

module.exports = router;
