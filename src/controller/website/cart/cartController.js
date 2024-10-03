const CartModel = require("../../../model/cart/cart");


const AddToCart=async(req,res)=>{
    try{
        console.log(req.body);
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
        console.log(req.params);
        const response=await CartModel.find({user_id:req.params})
        .populate('product_id')
        .populate('color_id')
        .populate('size_id')
        .populate('user_id');

        // console.log(response);

        const file_path = `${req.protocol}://${req.get('host')}/frankandoak-files/products/`;


        res.status(200).json({message:'successfully product added to cart',data:response,file_path:file_path});
    }
    catch(error){
        console.log(error);
        alert('somthing went wrong');
    }
};

const DeleteCartItem=async(req,res)=>{
    try{
        const response=await CartModel.deleteOne(req.params);
        res.status(200).json({message:'Item Deleted successfully',data:response});
    }
    catch(error){
        console.log(error);
        alert('somthing went wrong');
    }
}

module.exports={
    AddToCart,
    ViewCart,
    DeleteCartItem
};