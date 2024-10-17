// Imporing models
const Category = require('../models/category')
const Tour = require('../models/tour')

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

  // Categery getting function
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
  },

  //Tour creating function
  createTour: async (req, res) => {
    const tourData = req.body;
    console.log(req.files);

    // Parse stringified JSON fields
    ['itinerary', 'hotel', 'cabin'].forEach(field => {
      if (tourData[field]) {
        tourData[field] = JSON.parse(tourData[field]);
      }
    });
    
    console.log(tourData);
    // Handle file uploads
    if (req.files) {
      if (req.files.featureImage) {
        tourData.featureImage = req.files.featureImage[0];
      }
      if (req.files.gallery) {
        tourData.gallery = req.files.gallery;
      }
    }

    // Proceed with creating the tour using tourData
    // ...
  }
}