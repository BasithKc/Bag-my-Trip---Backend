//Importing third party modules
const express = require("express");
require("dotenv").config();
const https = require('https')
const cors = require('cors')
const fs = require('fs')

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

// CORS configuration
app.use(cors({
  origin: 'https://www.bagmytrip.in',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(express.urlencoded({ extended: true }));

app.use('/api/admin/auth', adminAuthRoute)
app.use('/api/admin/tours', toursApiRoutes)
app.use('/api/user/tours', userRoutes)

// HTTPS configuration
const sslOptions = {
  cert: fs.readFileSync('/etc/letsencrypt/live/www.bagmytrip.in/fullchain.pem'),
  key: fs.readFileSync('/etc/letsencrypt/live/www.bagmytrip.in/privkey  .pem')
};
// Create HTTPS server
const httpsServer = https.createServer(sslOptions, app);


//Database connecting and port listen
dbConnect().then(() => {
  httpsServer.listen(port, () => {
    console.log(`server is running on ${port}`);
  });
});