const express=require('express');
const { AddToCart, ViewCart } = require('../../../controller/controller');

const cartRouter=express.Router();

cartRouter.post('/add-to-cart/:_id?',AddToCart);
cartRouter.get('/view-cart/:_id',ViewCart);

module.exports=cartRouter;