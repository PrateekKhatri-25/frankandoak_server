const express=require('express');
const { addColor, readColor, deleteColor, updateColorStatus, updateColor, readColorById, activeColors } = require('../../../controller/controller');
const colorPicker = require('../../../middleware/colorMulter');

const colorRouter=express.Router();

colorRouter.post('/add-color',colorPicker, addColor);
colorRouter.get('/read-color',readColor);
colorRouter.delete('/delete-color/:_id',deleteColor);
colorRouter.put('/update-color-status/:_id',updateColorStatus);
colorRouter.put('/update-color/:_id',colorPicker ,updateColor);
colorRouter.get('/read-color-by-id/:_id',readColorById);
colorRouter.get('/active-colors',activeColors)


module.exports=colorRouter;