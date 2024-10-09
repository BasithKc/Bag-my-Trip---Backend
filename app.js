//Importing third party modules
const express = require("express");
require("dotenv").config();
const cors = require('cors')

//Import configs
const dbConnect = require('./config/db')
const adminAuthRoute = require('./routes/adminAuthRoutes')

//Express app setup
const app = express();
const port = process.env.PORT || 5000;

//Middle ware for data passing and session
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: true }));

app.use('/admin/auth', adminAuthRoute)

//Database connecting and port listen
dbConnect().then(() => {
  app.listen(port, () => {
    console.log(`server is running on ${port}`);
  });
});