const mongoose=require('mongoose')

const parentSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    description:String,
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

const ParentCategoryModal=mongoose.model('parent_categories',parentSchema);

module.exports=ParentCategoryModal;