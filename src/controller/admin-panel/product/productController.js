const productModel = require("../../../model/product/productModel");
const fs = require('fs');
const path = require('path');

const addProduct = async (req, res) => {
    try {
        const data = req.body;
        data.color = JSON.parse(data.color);
        data.size = JSON.parse(data.size);
        // console.log(req.files);

        if (req.files) {
            if (req.files.thumbnail) {
                data.thumbnail = req.files.thumbnail[0].filename;
            }
            if (req.files.hover_thumbnail) {
                data.hover_thumbnail = req.files.hover_thumbnail[0].filename;
            }
            if (req.files.images) {
                data.images = req.files.images.map((image) => image.filename);
            }
        }
        // console.log(data);
        const dataToSave = new productModel(data);
        const response = await dataToSave.save();
        res.status(200).json({ message: 'success', data: response })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server error' })
    }
};

const readProduct = async (req, res) => {
    try {
        const response = await productModel.find()
            .populate('size')
            .populate('color')
            .populate({
                path: 'category',
                populate: {
                    path: 'parent_category',
                    model: 'parent_categories'
                }
            })

        const file_path = `${req.protocol}://${req.get('host')}/frankandoak-files/products/`;
        res.status(200).json({ message: 'success', data: response, file_path: file_path })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server error' })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const response = await productModel.deleteOne(req.params);
        res.status(200).json({ message: 'successfully deleted', data: response });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server error' })
    }
};

const updateProductStatus = async (req, res) => {
    if (!req.params._id) res.status(404).json({ message: 'please send the id' })
    try {
        const response = await productModel.updateOne(
            req.params,
            {
                $set: {
                    status: req.body.newValue
                }
            }
        )
        res.status(200).json({ message: 'successfully status changes', data: response })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server error' })
    }
};

const readProductById = async (req, res) => {
    try {
        const response = await productModel.findById(req.params._id)
            .populate('size')
            .populate('color')
            .populate({
                path: 'category',
                populate: {
                    path: 'parent_category',
                    model: 'parent_categories'
                }
            });
        if (!response) return res.status(400).json({ message: 'enter a valid Id' });

        res.status(200).json({ message: 'success', data: response })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server error' })
    }
};

const updateProduct = async (req, res) => {

    const data = req.body;

    const preData = await productModel.findById(req.params._id);

    if (!preData) return res.status(400).json({ message: 'data not found'});

    // console.log(preData);

    // console.log(data);
    data.color = JSON.parse(data.color);
    data.size = JSON.parse(data.size);
    // console.log(__dirname);
    console.log(data);
    console.log(req.files);

    if (req.files) {
        const filepath = path.join(__filename, 'src', 'uploads', 'products')
        // console.log(filepath);
        if (req.files.thumbnail) {
            data.thumbnail = req.files.thumbnail[0].filename;
            if (preData.thumbnail) {
                if (fs.existsSync(`${filepath}/${preData.thumbnail}`)) {
                    fs.unlinkSync(`${filepath}/${preData.thumbnail}`)
                }
            }
        }

        if (req.files.hover_thumbnail) {
            data.hover_thumbnail = req.files.hover_thumbnail[0].filename;
            if (preData.hover_thumbnail) {
                if (fs.existsSync(`${filepath}/${preData.hover_thumbnail}`)) {
                    fs.unlinkSync(`${filepath}/${preData.hover_thumbnail}`)
                }
            }
        }

        if (req.files.images) {
            data.images = req.files.images.map((image) => image.filename);
            preData.images.map((image) => {
                if (preData.images) {
                    if (fs.existsSync(`${filepath}/${image}`)) {
                        fs.unlinkSync(`${filepath}/${image}`)
                    }
                }
            })
        }
    }
    // console.log(__dirname);
    try {
        const response = await productModel.updateOne(
            req.params,
            {
                $set: data
            }
        )
        const file_path = `${req.protocol}://${req.get('host')}/frankandoak-files/products/`
        res.status(200).json({ message: 'successfully updated', data: response, file_path: file_path });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server error' })
    }
};

module.exports = {
    addProduct,
    readProduct,
    deleteProduct,
    updateProductStatus,
    readProductById,
    updateProduct
};