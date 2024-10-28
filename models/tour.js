const mongoose = require('mongoose')

const itinerarySchema = new mongoose.Schema({
  title: {
    type: String
  },
  description: String,
  includes: [String]
})

const tourSchema = new mongoose.Schema({
  title: String,
  tripType: String,
  description: String,
  location: String,
  includes: [String],
  excludes: [String],
  pricePerPerson: Number,
  duration: String,
  categories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'category'
  }],
  itinerary: [itinerarySchema],
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