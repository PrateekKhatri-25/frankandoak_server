const productCategoryModal = require("../../../model/product-category/productCategoryModal");

const insertProductCategory = async (req, res) => {
    try {
        data = req.body
        if (req.file) {
            data.thumbnail = req.file.filename
        }
        const dataToSave = new productCategoryModal(data);
        const response = await dataToSave.save();
        res.status(200).json({ message: 'success', data: response })
    }
    catch (error) {
        res.status(500).json({ message: 'internal server error' })
        console.log(error);
    }
};

const readProductCategory=async(req,res)=>{
    try{
        const response=await productCategoryModal.find().populate('parent_category');
        const file_path=`${req.protocol}://${req.get('host')}/frankandoak-files/`;
        res.status(200).json({message:'success',data:response,file_path:file_path})
    }
    catch(error){
        res.status(500).json({message:'internal server error'})
    }
};

const deleteProductCategory=async(req,res)=>{
    try{
        const response=await productCategoryModal.deleteOne(req.params);
        res.status(200).json({message:'success',data:response})
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:'internal server error'})
    }
};

const activeProductCategories=async(req,res)=>{
    try{
        const response=await productCategoryModal.find({status:true}).populate('parent_category');

        if(response.length===0) return res.status(404).json({message:'no active category'})

        res.status(200).json({message:'success', data:response})
    }
    catch(error){
        res.status(500).json({message:'internal server error'})
        console.log(error);
    }
};

const updateProductCategoryStatus=async(req,res)=>{
    if(!req.params._id) return res.status(404).json({message:'please send the Id'})
    try{

        const response=await productCategoryModal.updateOne(
            req.params,
            {
                $set:{
                    status:req.body.newValue
                }
            }
        )
        res.status(200).json({message:'status updated',data:response})
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:'internal server error'})
    }
};

const readCategoryById=async(req,res)=>{
    try {
        const response = await productCategoryModal.findById(req.params._id)

        if (!response) return res.status(400).json({ message: 'enter a valid ID' })

        res.status(200).json({ message: 'success', data: response })
    }
    catch (error) {
        res.status(500).json({ message: 'internal server error' })
        console.log(error);
    }
};

const updateProductCategory=async(req,res)=>{
    try {
        const {name,description,thumbnail,parent_category} = req.body;

        const response = await productCategoryModal.updateOne(
            req.params,
            {

                $set: {
                    name,
                    description,
                    parent_category,
                    thumbnail
                }
            }
        )
        res.status(200).json({ message: 'successfully updated', data: response })
    }
    catch (error) {
        res.status(500).json({ message: 'internal server error' })
        console.log(error);
    }
};

module.exports = {
    insertProductCategory,
    readProductCategory,
    deleteProductCategory,
    activeProductCategories,
    updateProductCategoryStatus,
    readCategoryById,
    updateProductCategory
}