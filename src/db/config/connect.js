const mongoose = require('mongoose');
const { dbUrl, options } = require('./config');
const Category = require('../models/Category.model')

function connect() {
  mongoose.connect(dbUrl, options).then(() => console.log('Connect to DB'));
  // Здесь вам нужно реализовать логику подключения сервера к базе данных
  // Не забудьте вызвать эту функцию в главном файле с настройками сервера!
  // seeder()
}

module.exports = connect;

const seeder = async () => {
  await Category.insertMany([
    { name: "Cloth" },
    { name: "Fruits" },
    { name: "Cars" },
    { name: "Toys" }
  ])
  console.log("DB is seeded")

}
