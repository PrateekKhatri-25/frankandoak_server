const express=require('express');
const { 
    insertParentCategory, 
    readParentCategory, 
    updateParentCatStatus,
    readParentCategoryById,
    updateParentCategory,
    deleteParentCategory,
    activeParentCategories
} = require('../../../controller/controller');

const parentCategoryRoute=express.Router();

parentCategoryRoute.post('/insert-parent-category',insertParentCategory);
parentCategoryRoute.get('/read-parent-category',readParentCategory);
parentCategoryRoute.put('/update-parent-category-status/:_id',updateParentCatStatus);
parentCategoryRoute.get('/read-parent-category-by-id/:_id',readParentCategoryById);
parentCategoryRoute.put('/update-parent-category/:_id',updateParentCategory);
parentCategoryRoute.delete('/delete-parent-category/:_id',deleteParentCategory);
parentCategoryRoute.get('/active-parent-category',activeParentCategories);

module.exports=parentCategoryRoute;