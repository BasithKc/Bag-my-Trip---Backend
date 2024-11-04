const router = require('express').Router()

//Importing controller
const userController = require('../controller/userController')

// Return all tours
router.get('/all', userController.getAllTours)

router.get('/filter', userController.filterTour)

// Book a tour
router.post('/book', userController.bookTour)

// Get tour by id
router.get('/:id', userController.getTour)



module.exports = router