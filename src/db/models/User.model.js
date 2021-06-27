const { model } = require('mongoose');

const User = model('User', {
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  seller: { type: Boolean, default: false },
  admin: { type: Boolean, default: false },
});

module.exports = User;
