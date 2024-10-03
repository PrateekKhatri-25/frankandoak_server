const express=require('express');
const { AddToWishlist, viewWishlist, deleteWishData } = require('../../../controller/controller');

const wishRouter=express.Router();

wishRouter.post('/add-to-wishlist/:_id?',AddToWishlist);
wishRouter.get('/view-wishlist/:_id',viewWishlist);
wishRouter.delete('/delete-wish-data/:_id',deleteWishData)

module.exports=wishRouter;