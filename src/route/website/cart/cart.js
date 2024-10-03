const express=require('express');
const { AddToCart, ViewCart, DeleteCartItem } = require('../../../controller/controller');

const cartRouter=express.Router();

cartRouter.post('/add-to-cart/:_id?',AddToCart);
cartRouter.get('/view-cart/:_id',ViewCart);
cartRouter.delete('/delete-cart-item/:_id',DeleteCartItem)

module.exports=cartRouter;