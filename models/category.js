const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  slug: {
    type: String,
    require: true
  }
})

const category = mongoose.model('category', categorySchema)
module.exports = category