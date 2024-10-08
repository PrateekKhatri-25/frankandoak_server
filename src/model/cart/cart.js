const mongoose=require('mongoose')

const Cart = new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    product_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'product'
    },
    color_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'color'
    },
    size_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'size'
    },
    quantity:{
        type:Number,
        required:true,
        default:1
    },
    created_at:Date,
    deleted_at:Date,
    updated_at:Date
});

Cart.pre('save',(next)=>{
    this.created_at=new Date();

    next();
});

Cart.pre('updateOne',(next)=>{
    this.updated_at=new Date();
    
    next();
});

Cart.pre('deleteOne',(next)=>{
    this.deleted_at=new Date();
    
    next();
});

const CartModel=mongoose.model('Carts',Cart);

module.exports=CartModel;