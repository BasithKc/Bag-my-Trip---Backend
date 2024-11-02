const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
  name: String,
  phone: Number,
  tickets: Number,
  tourName: {
    type: String,
  },
  createdAt: { type: Date, default: Date.now }
})

const Book = mongoose.model('book', bookSchema)
module.exports = Book