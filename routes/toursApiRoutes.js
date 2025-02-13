const router = require('express').Router()
//Import multer
const upload = require('../config/multer')

// Import controller
const tourApiController = require('../controller/toursApiController')

// Endpoint for creating a category
router.post('/categories', tourApiController.addCategory)

// Endpoint for get categories
router.get('/categories', tourApiController.getCategories)

// Endpoint for creating a tour
router.post('/create', upload.fields([
  { name: 'featureImage', maxCount: 1 },
  { name: 'gallery', maxCount: 10 }
]), tourApiController.createTour)

//Endpont for get tours
router.get('/get', tourApiController.getTour)


// Endpoint of get tour bookings
router.get('/bookings', tourApiController.getBookings)

//Endpoint for deleting tour
router.delete('/delete/:id', tourApiController.deleteTour)

// Update tours
router.put('/update/:id', upload.fields([
  { name: 'featureImage', maxCount: 1 },
  { name: 'gallery', maxCount: 10 }
]), tourApiController.updateTour)

// Get tour by id
router.get('/:tourId', tourApiController.getTourById)

module.exports = router