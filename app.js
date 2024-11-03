//Importing third party modules
const express = require("express");
require("dotenv").config();
const cors = require('cors')

//Import configs
const dbConnect = require('./config/db')

// Import routes
const adminAuthRoute = require('./routes/adminAuthRoutes')
const toursApiRoutes = require('./routes/toursApiRoutes')
const userRoutes = require('./routes/userRoutes')

//Express app setup
const app = express();
const port = process.env.PORT || 5000;

//Middle ware for data passing and session
app.use(express.json());
app.use(cors({
  orgin: 'http://13.49.69.58:4200/',
  credentials: true
}))
app.use(express.urlencoded({ extended: true }));

app.use('/api/admin/auth', adminAuthRoute)
app.use('/api/admin/tours', toursApiRoutes)
app.use('/api/user/tours', userRoutes)

//Database connecting and port listen
dbConnect().then(() => {
  app.listen(port, () => {
    console.log(`server is running on ${port}`);
  });
});