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

const productCatUploads = multer({ storage: storage }).single('thumbnail')

module.exports =  productCatUploads 