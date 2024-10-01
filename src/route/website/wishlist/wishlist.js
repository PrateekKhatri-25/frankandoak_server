const express=require('express');
const { AddToWishlist, viewWishlist } = require('../../../controller/controller');

const wishRouter=express.Router();

wishRouter.post('/add-to-wishlist/:_id?',AddToWishlist);
wishRouter.get('/view-wishlist/:_id',viewWishlist);

module.exports=wishRouter;