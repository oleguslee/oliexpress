const { model, Schema } = require('mongoose');

const Good = model('Good', {
  picture: { type: String, default: 'public/img/default.png' },
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  quantity: { type: Number, default: 0, min: 0 },
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  seller: { type: Schema.Types.ObjectId, ref: 'User' },
});

module.exports = Good;
