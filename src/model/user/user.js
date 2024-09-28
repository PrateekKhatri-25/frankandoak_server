const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
    f_name:{
        type:String,
        required:true
    },
    l_name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    created_at:Date,
    deleted_at:Date,
    updated_at:Date
})

userSchema.pre('save',(next)=>{
    this.created_at=new Date();

    next();
});

userSchema.pre('updateOne',(next)=>{
    this.updated_at=new Date();
    
    next();
});

const userModel=mongoose.model('users',userSchema);

module.exports=userModel;