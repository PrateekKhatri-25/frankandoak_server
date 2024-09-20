const express=require('express');
const { insertProductCategory, readProductCategory, deleteProductCategory, activeProductCategories, updateProductCategoryStatus, readCategoryById, updateProductCategory } = require('../../../controller/controller');
const productCatUploads = require('../../../middleware/productCategoryMulter');

const productCategoryRoute=express.Router();

productCategoryRoute.post('/insert-product-category',productCatUploads, insertProductCategory);
productCategoryRoute.get('/read-product-category',readProductCategory);
productCategoryRoute.delete('/delete-product-category/:_id',deleteProductCategory);
productCategoryRoute.get('/active-product-category',activeProductCategories);
productCategoryRoute.put('/update-product-category-status/:_id',updateProductCategoryStatus);
productCategoryRoute.get('/read-product-category-by-id/:_id',readCategoryById);
productCategoryRoute.put('/update-product-category/:_id',productCatUploads,updateProductCategory)

module.exports=productCategoryRoute;