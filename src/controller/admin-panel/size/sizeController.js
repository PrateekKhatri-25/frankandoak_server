const SizeModal = require("../../../model/size/sizeModal");

const insertSize = async (req, res) => {
    const data = req.body;
    try {
        const dataToSave = new SizeModal(data);

        const response = await dataToSave.save();

        res.status(200).json({ message: 'success', data: response })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' })
    }
}

const readSize = async (req, res) => {
    const data = req.body;
    try {
        const response = await SizeModal.find();

        res.status(200).json({ message: 'success', data: response })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' })
    }
}

const updateSizeStatus = async (req, res) => {
    if (!req.params._id) return res.status(400).json({ message: 'send the category ID' })
    try {
        const response = await SizeModal.updateOne(
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

const readSizeById = async (req, res) => {
    try {
        const response = await SizeModal.findById(req.params._id)

        if (!response) return res.status(400).json({ message: 'enter a valid ID' })
        res.status(200).json({ message: 'success', data: response })
    }
    catch (error) {
        res.status(500).json({ message: 'internal server error' })
        console.log(error);
    }
}

const updateSize = async (req, res) => {
    try {
        const { size_name, size_order } = req.body;
        const response = await SizeModal.updateOne(
            req.params,
            {
                $set: {
                    size_name,
                    size_order
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

const deleteSize=async (req,res)=>{
    try{
        const response=await SizeModal.deleteOne(req.params)
        res.status(200).json({message:'successfully deleted',data:response})
    }
    catch(error){
        res.status(500).json({message:'internal server error'})
        console.log(error);
    }
}

module.exports = {
    insertSize,
    readSize,
    updateSizeStatus,
    readSizeById,
    updateSize,
    deleteSize
}