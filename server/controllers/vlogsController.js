const Vlogs = require('../models/vlogs');
const { uploadBufferToCloudinary } = require('../helpers/upload');

const buildVlogPayload = async (body, file) => {
    const coverImage = file
        ? await uploadBufferToCloudinary(file, 'portfolio/vlogs')
        : body.existingCoverImage || body.cover_image || '';

    return {
        category: body.category,
        title: body.title,
        subject: body.subject,
        description: body.description,
        link: body.link,
        cover_image: coverImage
    };
};

// GET all vlogs
const getAllVlogs = async (req, res) => {
    try {
        const vlogs = await Vlogs.find();
        res.status(200).json(vlogs);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching vlogs', error: error.message });
    }
};



// POST a new vlog
const createVlog = async (req, res) => {
    try {
        const vlog = await Vlogs.create(await buildVlogPayload(req.body, req.file));
        
        res.status(201).json({ message: 'Vlog posted successfully', vlog });
    } catch (error) {
        res.status(400).json({ message: 'Error creating vlog', error: error.message });
    }
};

// PUT (update) an existing vlog
const updateVlog = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedVlog = await Vlogs.findByIdAndUpdate(
            id,
            await buildVlogPayload(req.body, req.file),
            { new: true, runValidators: true }
        );

        if (!updatedVlog) {
            return res.status(404).json({ message: 'Vlog not found' });
        }

        res.status(200).json({ message: 'Vlog updated successfully', vlog: updatedVlog });
    } catch (error) {
        res.status(400).json({ message: 'Error updating vlog', error: error.message });
    }
};

// DELETE a vlog
const deleteVlog = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedVlog = await Vlogs.findByIdAndDelete(id);

        if (!deletedVlog) {
            return res.status(404).json({ message: 'Vlog not found' });
        }

        res.status(200).json({ message: 'Vlog deleted successfully', vlog: deletedVlog });
    } catch (error) {
        res.status(400).json({ message: 'Error deleting vlog', error: error.message });
    }
};

module.exports = {
    getAllVlogs,
    
    createVlog,
    updateVlog,
    deleteVlog
};
