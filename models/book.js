const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
  name: String,
  phone: Number,
  tickets: Number,
  tourId: {
    type: mongoose.Schema.ObjectId,
    ref: 'tour'
  },
  createdAt: { type: Date, default: Date.now }
})

const Book = mongoose.model('book', bookSchema)
module.exports = Book