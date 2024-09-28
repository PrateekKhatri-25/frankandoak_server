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
    readColorById
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
    updateProduct
} = require("./admin-panel/product/productController");


//size controller
const {
    insertSize,
    readSize,
    updateSizeStatus,
    readSizeById,
    updateSize,
    deleteSize
} = require("./admin-panel/size/sizeController");

//user controller
const {
    registerUser,
    loginUser
} = require("./website/users/userController");

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
    addColor,
    readColor,
    updateColorStatus,
    deleteColor,
    updateColor,
    readColorById,
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
    updateProductStatus,
    readProductById,
    updateProduct,
    registerUser,
    loginUser
}