// Imporing models
const Category = require('../models/category')

module.exports = {
  //Function for creating tour category
  addCategory: async (req, res) => {
    try {
      const { name, slug } = req.body

      // Create new instance of category
      const newCategory = new Category({
        name,
        slug
      })
      await newCategory.save()

      // Send successfull response
      return res.status(200).json({
        success: true,
        message: `Successsfully Created Category ${name}`
      })
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        success: false,
        message: "Cannot create category"
      })
    }
  },

  getCategories: async (req, res) => {
    try {
      const categories = await Category.find({}) //Retrieve categories from db

      return res.status(200).json({
        success: true,
        message: "Successfully retrieved categories",
        categories
      })
    } catch (error) {
      console.log(error);

      return res.status(500).json({
        success: false,
        message: 'Server error, Cannot get categories'
      })
    }
  }
}