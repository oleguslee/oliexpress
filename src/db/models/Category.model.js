const { model, Schema } = require('mongoose');

const Category = model('Category', {
  name: { type: String, required: true }
});

module.exports = Category;
