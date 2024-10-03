const express=require('express');
const { purchase } = require('../../../controller/website/payment-gateway/paymentController');

const paymentRouter=express.Router();

paymentRouter.post('/sell',purchase)

module.exports = paymentRouter;