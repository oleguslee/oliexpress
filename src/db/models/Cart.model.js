
const { model, Schema } = require('mongoose');

const Cart = model('Cart', {
  buyer: { type: Schema.Types.ObjectId, ref: 'User' },
  cartGoods: [{
    good: {
      type: Schema.Types.ObjectId,
      ref: 'Good',
    },
    counter: {
      type: Number,
      default: 1,
    },
  }],
});

module.exports = Cart;
