const express = require('express');
const { addProduct, readProduct, deleteProduct, updateProductStatus, readProductById, updateProduct } = require('../../../controller/controller');
const multer = require('multer');
const storage = require('../../../middleware/multer');

const productRouter = express.Router();
const uploads = multer({ storage: storage('products') }).fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'hover_thumbnail', maxCount: 1 },
    { name: 'images', maxCount: 10 }
])

productRouter.post('/add-product', uploads, addProduct);
productRouter.get('/read-product',readProduct);
productRouter.delete('/delete-product/:_id',deleteProduct);
productRouter.put('/update-product-status/:_id',updateProductStatus);
productRouter.get('/read-product-by-id/:_id',readProductById);
productRouter.put('/update-product/:_id',uploads,updateProduct)

module.exports = productRouter;