const mongoose = require('mongoose');
const BASE_URL = process.env.MONGODB_URI || 'mongodb://localhost:27017/URL_Shortener';


mongoose.connect(BASE_URL)
.then(response => {
    console.log("DATABASE CONNECTION SUCCESSFUL");
})
.catch(err => {
    console.log("DATABASE CONNECTION FAILED");
})