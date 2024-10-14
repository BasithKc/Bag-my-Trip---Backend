const router = require('express').Router()

// Import controller
const tourApiController = require('../controller/toursApiController')

// Endpoint for creating a category
router.post('/categories', tourApiController.addCategory)

// Endpoint for get categories
router.get('/categories', tourApiController.getCategories)


module.exports = router