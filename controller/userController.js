//Import models
const Tour = require('../models/tour')
const Book = require('../models/book')

// Nodemailer
const transporter = require('../config/nodemailer')

module.exports = {
  //Function for fetch all tours
  getAllTours: async (req, res) => {
    try {
      const tours = await Tour.find().select('_id title featureImage pricePerPerson duration')

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
  },

  // Function for booking a tour
  bookTour: async (req, res) => {
    try {
      const { name, phone, tickets, tourId } = req.body

      // Fetch tour detials
      const tourDetails = await Tour.findById(tourId).select('title')

      // Save new booking in db
      const newBook = new Book({
        name,
        phone,
        tickets,
        tourName: tourDetails.title
      })
      await newBook.save()

      // Send email notification
      const mailOption = {
        from: process.env.EMAIL_USER,
        to: process.env.OWNER_EMAIL,
        subject: 'New Tour Booking!!',
        html: `
        <h2>New Booking Details</h2>
        <p><strong>Customer Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Number of Tickets:</strong> ${tickets}</p>
        <p><strong>Tour ID:</strong> ${tourDetails.title}</p>
        <p><strong>Booking Time:</strong> ${new Date().toLocaleString()}</p>
      `
      }

      await transporter.sendMail(mailOption)

      return res.status(200).json({
        success: true,
        message: "Tour booked successfully. We will contact you soon"
      })
    } catch (error) {
      console.log(error);

      return res.status(500).json({
        success: false,
        message: "Server error"
      })
    }
  },

  filterTour: async (req, res) => {
    try {
      const destination = req.query['destination']

      const tours = await Tour.find({
        location: destination
      })

      return res.status(200).json({
        success: true,
        messag: "Retrieved the tour data",
        tours
      })
    } catch (error) {
      return res.status(500).json({
        message: 'Server Error'
      })
    }
  }
}