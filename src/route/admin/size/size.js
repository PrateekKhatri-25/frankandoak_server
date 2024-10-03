const express=require('express');
const {
     insertSize, 
     readSize, 
     updateSizeStatus, 
     readSizeById, 
     updateSize, 
     deleteSize,
      activeSize } = require('../../../controller/controller');

const sizeRouter=express.Router();

sizeRouter.post('/insert-size',insertSize);
sizeRouter.get('/read-size',readSize);
sizeRouter.put('/update-size-status/:_id',updateSizeStatus);
sizeRouter.get('/read-size-by-id/:_id',readSizeById);
sizeRouter.put('/update-size/:_id',updateSize);
sizeRouter.delete('/delete-size/:_id',deleteSize);
sizeRouter.get('/active-size',activeSize);

module.exports=sizeRouter;