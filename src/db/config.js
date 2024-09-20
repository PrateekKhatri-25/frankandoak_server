const mongoose = require('mongoose');
const { registerAdmin } = require('../controller/admin-panel/admin/adminController');

require('dotenv').config();


const uri=`mongodb+srv://${process.env.DATABASE_USER_NAME}:${process.env.DATABASE_USER_PASSWORD}@prateek.dbkzk.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority&appName=${process.env.DATABASE_APP_NAME}`;

mongoose.connect(uri)
    .then(() => {
        console.log("Connected to MongoDB");
        registerAdmin();
    })
    .catch((error) => {
        console.log("Error connecting to MongoDB", error)
    })