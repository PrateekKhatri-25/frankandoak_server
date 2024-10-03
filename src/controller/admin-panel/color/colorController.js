const colorModal = require("../../../model/color/colorModal");

const addColor = async (req, res) => {
    try {
        const data = req.body;
        if (req.file) {
            data.productImage = req.file.filename;
        }
        const dateToSave = new colorModal(data);
        const response = await dateToSave.save();
        res.status(200).json({ message: 'color added', data: response })
    }
    catch (error) {
        res.status(400).json({ message: 'something went wrong' })
    }
};

const readColor = async (req, res) => {
    try {
        const response = await colorModal.find();
        res.status(200).json({ message: 'color found', data: response })
    }
    catch (error) {
        res.status(400).json({ message: 'something went wrong' })
    }
};

const deleteColor = async (req, res) => {
    try {
        const response = await colorModal.deleteMany(req.params);
        res.status(200).json({ message: 'color deleted', data: response })
    }
    catch (error) {
        res.status(500).json({ message: 'internal server error' })
    }
};

const updateColorStatus = async (req, res) => {
    if (!req.params._id) return res.status(404).json({ message: 'please send the Id' })
    try {

        const response = await colorModal.updateOne(
            req.params,
            {
                $set: {
                    status: req.body.newValue
                }
            }
        )
        res.status(200).json({ message: 'status updated', data: response })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server error' })
    }
};

const readColorById = async (req, res) => {
    try {
        const response = await colorModal.findById(req.params._id)

        if (!response) return res.status(400).json({ message: 'enter a valid ID' })

        res.status(200).json({ message: 'success', data: response })
    }
    catch (error) {
        console.log(error);

        res.status(500).json({ message: 'internal server error' })
    }
};

const updateColor = async (req, res) => {
    // if(!req.params._id) return res.status(404).json({message:'please send the Id'})
    try {
        const { colorName, colorcode } = req.body

        const response = await colorModal.updateOne(
            req.params,
            {
                $set: {
                    colorName,
                    colorcode
                }
            }
        )
        res.status(200).json({ message: 'color updated', data: response })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server error' })
    }
};

const activeColors=async(req,res)=>{
    try{
        const response=await colorModal.find({status:true});

        if(response.length===0) return res.status(404).json({message:'no active color'});

        res.status(200).json({message:'success', data:response});
    }
    catch(error){
        res.status(500).json({message:'internal server error'})
        console.log(error);
    }
};

module.exports = {
    addColor,
    readColor,
    deleteColor,
    updateColorStatus,
    updateColor,
    readColorById,
    activeColors
}