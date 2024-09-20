const mongoose=require('mongoose');
// const { RiSoundModuleLine } = require('react-icons/ri');

const colorSchema=new mongoose.Schema({
    colorName:String,
    colorcode:String,
    colorPicker:String,
    productImage:String,
    created_at:{
        type:Date,
        default:Date.now
    },
    status:{
        type:Boolean,
        default:true
    },
    updated_at:Date,
    deleted_at:Date,
});

const colorModal=mongoose.model('color',colorSchema);

module.exports=colorModal;