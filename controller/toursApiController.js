const { uploadFile, deleteImages } = require('../config/s3')

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
    try {
      const tourData = req.body;

      // Parse stringified JSON fields
      ['itinerary', 'hotel', 'cabin'].forEach(field => {
        if (tourData[field]) {
          tourData[field] = JSON.parse(tourData[field]);
        }
      });

      function transformTourData(tourData) {
        return {
          ...tourData,
          itinerary: tourData.itinerary.map(item => ({
            ...item,
            included: item.included.split(',').map(str => str.trim())
          }))
        };
      }

      // Usage
      const transformedTourData = transformTourData(tourData);
      console.log(transformedTourData);


      // Handle file uploads
      if (req.files.featureImage) {
        const featureImageUrl = await uploadFile(
          req.files.featureImage[0],
          'feature-images'
        );
        transformedTourData.featureImage = featureImageUrl
      }

      // Handle gallery images upload
      if (req.files.gallery) {
        const galleryUrls = await Promise.all(
          req.files.gallery.map(async (file) => {
            return await uploadFile(file, 'gallery-images')
          })
        )
        transformedTourData.gallery = galleryUrls
      }

      // Create a new instance of tour in mongodb
      const tour = new Tour(transformedTourData)
      await tour.save()

      res.status(201).json({
        success: true,
        message: 'Tour Created successfully',
        data: tour
      })
    } catch (error) {
      console.error('Error creating tour:', error);
      res.status(500).json({
        success: false,
        message: 'Error creating tour',
        error: error.message
      });
    }

  },

  getTour: async (req, res) => {
    try {
      const tours = await Tour.find()
        .populate('categories')
        .exec()

      if (!tours) {
        return res.status(400).json({
          success: false,
          message: 'No tours found'
        })
      }

      return res.status(200).json({
        success: true,
        message: 'Fetched tours',
        tours
      })
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message: "Can't fetch tours"
      })
    }
  },

  //Deleting tour
  deleteTour: async (req, res) => {
    const tourId = req.params.id
    try {
      //Get the tour to collect image urls
      const tour = await Tour.findById(tourId)

      //Collecting all image urls
      const imagesToDelete = [tour.featureImage, ...(tour.gallery || [])]

      if (imagesToDelete.length > 0) {
        const response = await deleteImages(imagesToDelete) //Delete image from s3 bucket

        await Tour.findByIdAndDelete(tourId) //Delete from mongodb
        return res.status(201).json({
          success: true,
          message: "Tour deleted successfully"
        })
      }

    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: 'Tour deletion failed!!'
      })
    }
  }
}