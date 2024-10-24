const mongoose = require('mongoose')

const tourSchema = new mongoose.Schema({
  title: String,
  tripType: String,
  description: String,
  location: String,
  pricePerPerson: Number,
  duration: String,
  categories: [String],
  itinerary: [Object],
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
  gallery: [String],
  publishTime: {
    type: Date,
    default: Date.now()
  }
}, { timestamps: true });

const Tour = mongoose.model('tour', tourSchema)
module.exports = Tour