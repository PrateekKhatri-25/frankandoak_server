const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    short_description: String,
    thumbnail: String,
    hover_thumbnail: String,
    images: Object,
    price: Number,
    MRP: Number,
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product_categories'
    },
    stock: {
        type: Boolean,
        default: true
    },
    brand: String,
    size: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'size'
    }],
    color: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'color'
    }],
    created_at: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        default: true
    },
    updated_at: Date,
    delete_at: Date
});

productSchema.pre('save', (next) => {
    this.created_at = new Date();

    next();
})
productSchema.pre('updateOne', (next) => {
    this.updated_at = new Date();

    next();
})

const productModel = mongoose.model('product', productSchema)

module.exports = productModel;
