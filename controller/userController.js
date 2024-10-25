//Import models
const Tour = require('../models/tour')

module.exports = {
  //Function for fetch all tours
  getAllTours: async (req, res) => {
    try {
      const tours = await Tour.find().select('_id title featureImage pricePerPerson')

      return res.status(200).json({
        success: true,
        message: "Fetched all tours",
        tours
      })
    } catch (error) {
      console.error(error)
      return res.status(400).json({
        success: false,
        message: "Cannot fetch tour datas"
      })
    }
  },

  //Function for fetch a specific tour
  getTour: async (req, res) => {
    const tourId = req.params.id
    try {
      const tour = await Tour.findById(tourId)
      return res.status(200).json({
        success: true,
        message: "Fetched a tour",
        tour
      })
    } catch (error) {
      console.error(error)
      return res.status(400).json({
        success: false,
        message: "Cannot fetch tour details"
      })
    }
  }
}