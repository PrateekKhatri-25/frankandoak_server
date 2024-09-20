const mongoose=require('mongoose');

const productCategorySchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    parent_category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'parent_categories'
    },
    description:String,
    thumbnail:String,
    status:{
        type:Boolean,
        default:true
    },
    created_at:{
        type:Date,
        default:Date.now
    },
    updated_at:Date,
    deleted_at:Date
});

const productCategoryModal=mongoose.model('product_categories',productCategorySchema);

module.exports=productCategoryModal