const express=require('express');
const { 
    adminLogin,
    generateOtp, 
    updateEmail,
    updateAdmin
} = require('../../../controller/controller');
const adminUploads = require('../../../middleware/adminMulter');
const adminRoutes=express.Router();

adminRoutes.post('/login',adminLogin)
adminRoutes.post('/generate-otp',generateOtp)
adminRoutes.post('/update-email/:_id',updateEmail)
adminRoutes.put('/update-admin/:_id', adminUploads , updateAdmin)


module.exports={adminRoutes}