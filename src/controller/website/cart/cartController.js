const CartModel = require("../../../model/cart/cart");


const AddToCart=async(req,res)=>{
    try{
        const dataToSave=new CartModel(req.body);

        const response=await dataToSave.save();

        res.status(200).json({message:'successfully product added to cart',data:response});
    }
    catch(error){
        console.log(error);
        alert('somthing went wrong');
    }
};

const ViewCart=async(req,res)=>{
    try{
        const response=await CartModel.findById(req.params)
        .populate('product')
        .populate('color')
        .populate('size')
        .populate('users');

        res.status(200).json({message:'successfully product added to cart',data:response});
    }
    catch(error){
        console.log(error);
        alert('somthing went wrong');
    }
};

module.exports={
    AddToCart,
    ViewCart
};



