const mongoose=require('mongoose')

const Wishlist = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'product'
    },
    color:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'color'
    },
    size:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'size'
    },
    created_at:Date,
    deleted_at:Date,
    updated_at:Date
});

Wishlist.pre('save',(next)=>{
    this.created_at=new Date();

    next();
});

Wishlist.pre('updateOne',(next)=>{
    this.updated_at=new Date();
    
    next();
});

Wishlist.pre('deleteOne',(next)=>{
    this.deleted_at=new Date();
    
    next();
});

const WishlistModel=mongoose.model('Wishlists',Wishlist);

module.exports=WishlistModel;