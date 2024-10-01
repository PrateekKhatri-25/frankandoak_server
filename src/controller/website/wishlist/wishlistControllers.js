const WishlistModel = require("../../../model/wishlist/wishlist");

const AddToWishlist = async (req, res) => {
    try {
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
    try {
        if (!req.params) return res.status(404).json({ message: '' })
        const response = await WishlistModel.findById(req.params)
            .populate('size')
            .populate('color')
            .populate('product')
            .populate('users')

        const file_path = `${req.protocol}://${req.get('host')}/frankandoak-files/products/`;

        res.status(200).json({ message: 'success', data: response, file_path: file_path })
    }
    catch (error) {
        console.log(error);
        alert('somthing went wrong')
    }
}

module.exports = {
    AddToWishlist,
    viewWishlist
}