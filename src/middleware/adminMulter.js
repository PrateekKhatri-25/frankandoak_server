const multer = require('multer');
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/uploads')
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname)
        cb(null, Date.now() + Math.floor(Math.random() * 99999) + ext)
    }
})

const adminUploads = multer({ storage: storage }).fields([
    { name: 'logo', maxCount: 1 },
    { name: 'footlogo', maxCount: 1 },
    { name: 'favicon', maxCount: 1 },
    { name: 'profile', maxCount: 1 }

])

module.exports =  adminUploads 