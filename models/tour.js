const mongoose = require('mongoose')

const tourSchema = new mongoose.Schema({
  title: String,
  description: String,
  location: String,
  pricePerPerson: Number,
  duration: String,
  categories: [String],
  itinerary: [{
    title: String,
    description: String,
    included: String,
    isDone: Boolean
  }],
  hotel: [{
    name: String,
    star: Number,
    price: Number
  }],
  cabin: [{
    name: String,
    price: Number,
    quantity: Number
  }],
  featureImage: String,
  gallery: [String]
});

const Tour = mongoose.model('tour', tourSchema)
module.exports = Tour