const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    profile:String,
    name: String,
    fb: String,
    insta: String,
    twitter: String,
    yt: String,
    logo: String,
    favicon: String,
    footlogo: String,
    email: String,
    password: String,
});

const AdminModal = new mongoose.model('admins', adminSchema);

module.exports = AdminModal;