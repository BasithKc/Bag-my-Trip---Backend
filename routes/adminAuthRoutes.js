const router = require('express').Router()

//Import controller
const adminAuthController = require('../controller/adminAuthController')

router.post('/signin', adminAuthController.signin)

module.exports = router