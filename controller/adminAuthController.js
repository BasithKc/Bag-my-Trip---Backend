//Import models
const admin = require('../models/admin')
const jwt = require('jsonwebtoken')

// Validation import
const validation = require('../utils/validation')

const jwt_secret = process.env.JWT_SECRET

module.exports = {
  signin: async (req, res) => {
    try {
      const { userName, password } = req.body

      const existUser = await admin.findOne({ userName })
      //Checking if admin exist
      if (!existUser) {
        return res.status(400).json({
          success: false,
          message: 'No admin found, Invalid username or password'
        })
      } else if (!validation.comparePassword(existUser.password, password)) { //Checking password
        return res.status(400).json({
          success: false,
          message: 'No admin found, Invalid username or password'
        })
      } else {
        //Generate token
        const token = await jwt.sign({ userName: existUser.userName }, jwt_secret, { expiresIn: '1h' })
        return res.status(200).json({
          success: true,
          message: "Successfully logged in",
          token
        })
      }

    } catch (error) {
      //Catch errors
      return res.status(500).json({
        success: false,
        message: "Connot login"
      })
    }
  }
}