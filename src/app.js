const express=require('express');
const { adminRoutes } = require('./route/admin/admin/admin');
const parentCategoryRoute = require('./route/admin/parent-category/parentCategory');
const sizeRouter = require('./route/admin/size/size');
const colorRouter = require('./route/admin/color/color');
const productCategoryRoute = require('./route/admin/product-category/productCategory');
const productRouter = require('./route/admin/product/product');

const allRoutes=express.Router();

const websiteRouter=express.Router();
const adminRouter=express.Router();
// const appRouter=express.Router();


//admin-panel route
adminRouter.use('/admin',adminRoutes);
adminRouter.use('/parent-category',parentCategoryRoute);
adminRouter.use('/size',sizeRouter);
adminRouter.use('/color',colorRouter);
adminRouter.use('/product-category',productCategoryRoute);
adminRouter.use('/product',productRouter)

//websiste route


allRoutes.use('/frankandOak-services',websiteRouter);
allRoutes.use('/admin-panel',adminRouter)
module.exports={
    allRoutes
}