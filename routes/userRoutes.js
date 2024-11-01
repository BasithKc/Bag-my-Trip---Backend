const router = require('express').Router()

//Importing controller
const userController = require('../controller/userController')

// Return all tours
router.get('/all', userController.getAllTours)

// Get tour by id
router.get('/:id', userController.getTour)

// Book a tour
router.post('/book', userController.bookTour)


module.exports = router