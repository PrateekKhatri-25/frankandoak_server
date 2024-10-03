//admin controllers

const {
    adminLogin,
    generateOtp,
    updateEmail,
    updateAdmin
} = require("./admin-panel/admin/adminController");

// color controller
const {
    addColor,
    readColor,
    deleteColor,
    updateColorStatus,
    updateColor,
    readColorById,
    activeColors
} = require("./admin-panel/color/colorController");

//parent category controller
const {
    insertParentCategory,
    readParentCategory,
    updateParentCatStatus,
    readParentCategoryById,
    updateParentCategory,
    deleteParentCategory,
    activeParentCategories
} = require("./admin-panel/parent-category/parentCategoryController");

//product category controller
const {
    insertProductCategory,
    readProductCategory,
    deleteProductCategory,
    activeProductCategories,
    updateProductCategoryStatus,
    readCategoryById,
    updateProductCategory
} = require("./admin-panel/product-category/productCategoryControllers");

//product controller

const {
    addProduct,
    readProduct,
    deleteProduct,
    updateProductStatus,
    readProductById,
    updateProduct,
    activeProducts,
    searchProduct
} = require("./admin-panel/product/productController");


//size controller
const {
    insertSize,
    readSize,
    updateSizeStatus,
    readSizeById,
    updateSize,
    deleteSize,
    activeSize,
} = require("./admin-panel/size/sizeController");
const {
    AddToCart,
    ViewCart,
    DeleteCartItem
} = require("./website/cart/cartController");

//user controller
const {
    registerUser,
    loginUser
} = require("./website/users/userController");

const {
    AddToWishlist,
    viewWishlist,
    deleteWishData
} = require("./website/wishlist/wishlistControllers");

module.exports = {
    adminLogin,
    generateOtp,
    updateEmail,
    updateAdmin,
    insertParentCategory,
    insertSize,
    readParentCategory,
    readSize,
    updateParentCatStatus,
    updateSizeStatus,
    readParentCategoryById,
    readSizeById,
    updateParentCategory,
    updateSize,
    deleteParentCategory,
    deleteSize,
    activeSize,
    addColor,
    readColor,
    updateColorStatus,
    deleteColor,
    updateColor,
    readColorById,
    activeColors,
    activeParentCategories,
    insertProductCategory,
    readProductCategory,
    deleteProductCategory,
    activeProductCategories,
    updateProductCategoryStatus,
    readCategoryById,
    updateProductCategory,
    addProduct,
    readProduct,
    deleteProduct,
    activeProducts,
    searchProduct,
    updateProductStatus,
    readProductById,
    updateProduct,
    registerUser,
    loginUser,
    AddToWishlist,
    viewWishlist,
    deleteWishData,
    AddToCart,
    ViewCart,
    DeleteCartItem
}