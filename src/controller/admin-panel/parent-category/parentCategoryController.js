const ParentCategoryModal = require("../../../model/parent-category/parentCategoryModal");

const insertParentCategory = async (req, res) => {
    try {
        const data = req.body;

        const dataToSave = new ParentCategoryModal(data);

        const response = await dataToSave.save();

        res.status(200).json({ messgae: 'success', data: response });
    }
    catch (error) {
        console.log(error);

        if (error.code === 11000 && error.keyPattern && error.keyPattern.name){
            return res.status(404).json({message:'category already exist'})
        }
            res.status(500).json({ message: 'Internal server error' })
    }
}

const readParentCategory = async (req, res) => {
    try {
        const response = await ParentCategoryModal.find();

        res.status(200).json({ message: 'success', data: response })
    }
    catch (error) {
        res.status(500).json({ message: 'internal server error' })
        console.log(error);
    }
}

const updateParentCatStatus = async (req, res) => {
    if (!req.params._id) return res.status(400).json({ message: 'send the category ID' })
    try {
        const response = await ParentCategoryModal.updateOne(
            req.params,
            {
                $set: {
                    status: req.body.newValue
                }
            }
        )
        res.status(200).json({ message: 'success', data: response })
    }
    catch (error) {
        res.status(500).json({ message: 'internal server error' })
        console.log(error);
    }
}

const readParentCategoryById = async (req, res) => {
    try {
        const response = await ParentCategoryModal.findById(req.params._id)

        if (!response) return res.status(400).json({ message: 'enter a valid ID' })

        res.status(200).json({ message: 'success', data: response })
    }
    catch (error) {
        res.status(500).json({ message: 'internal server error' })
        console.log(error);
    }
}

const updateParentCategory = async (req, res) => {
    try {
        const { name, description } = req.body;

        const response = await ParentCategoryModal.updateOne(
            req.params,
            {

                $set: {
                    name,
                    description
                }
            }
        )
        res.status(200).json({ message: 'successfully updated', data: response })
    }
    catch (error) {
        res.status(500).json({ message: 'internal server error' })
        console.log(error);
    }
}

const deleteParentCategory = async (req, res) => {
    try {
        const response = await ParentCategoryModal.deleteOne(req.params);
        res.status(200).json({ message: 'successfully deleted', data: response })
    }
    catch (error) {
        res.status(500).json({ message: 'internal server error' })
        console.log(error);
    }
}

const activeParentCategories=async(req,res)=>{
    try{
        const response=await ParentCategoryModal.find({status:true});

        if(response.length===0) return res.status(404).json({message:'no active category'})

        res.status(200).json({message:'success', data:response})
    }
    catch(error){
        res.status(500).json({message:'internal server error'})
        console.log(error);
    }
}

module.exports = {
    insertParentCategory,
    readParentCategory,
    updateParentCatStatus,
    readParentCategoryById,
    updateParentCategory,
    deleteParentCategory,
    activeParentCategories
}