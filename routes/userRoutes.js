const router = require('express').Router()

//Importing controller
const userController = require('../controller/userController')

router.get('/all', userController.getAllTours)

router.get('/:id', userController.getTour)


module.exports = router