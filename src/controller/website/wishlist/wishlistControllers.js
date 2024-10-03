const WishlistModel = require("../../../model/wishlist/wishlist");

const AddToWishlist = async (req, res) => {
    try {

        console.log(req.body);

        const dataToSave = new WishlistModel(req.body);

        const response = await dataToSave.save();

        res.status(200).json({ message: 'successfully product added to wishlist', data: response });
    }
    catch (error) {
        console.log(error);
        alert('somthing went wrong')
    }
};

const viewWishlist = async (req, res) => {
    console.log(req.params);
    try {
        if (!req.params) return res.status(404).json({ message: '' })
        const response = await WishlistModel.find({user_id:req.params})
            .populate('size_id')
            .populate('color_id')
            .populate('product_id')
            .populate('user_id')

            // console.log(response);

        const file_path = `${req.protocol}://${req.get('host')}/frankandoak-files/products/`;

        res.status(200).json({ message: 'success', data: response, file_path: file_path })
    }
    catch (error) {
        console.log(error);
        // alert('somthing went wrong')
    }
}

const deleteWishData=async (req,res)=>{
    try{
        const response=await WishlistModel.deleteOne(req.params)
        res.status(200).json({message:'Item Deleted successfully',data:response});
    }
    catch(error){
        console.log(error);
        alert('somthing went wrong')
    }
}

module.exports = {
    AddToWishlist,
    viewWishlist,
    deleteWishData
}