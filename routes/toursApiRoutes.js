const router = require('express').Router()
const multer = require('multer')

const storage = multer.memoryStorage(); // Or use diskStorage if you prefer
const upload = multer({
  storage: storage,
});

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


module.exports = router