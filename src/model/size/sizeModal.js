const mongoose=require('mongoose');

const sizeSchema=new mongoose.Schema({
    size_name:{
        type:String,
        required:true
    },
    size_order:String,
    status:{
        type:Boolean,
        default:true
    },
    created_at:{
        type:Date,
        default:Date.now()
    },
    updated_at:Date,
    deleted_at:Date
});

const SizeModal=mongoose.model('size',sizeSchema);

module.exports=SizeModal;
