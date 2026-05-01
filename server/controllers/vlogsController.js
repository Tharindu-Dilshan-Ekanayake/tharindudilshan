const Vlogs = require('../models/vlogs');

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
        const {
            category,
            title,
            subject,
            description,
            link,
            cover_image
        } = req.body;

        // Create Vlog
        const vlog = await Vlogs.create({
            category,
            title,
            subject,
            description,
            link,
            cover_image
        });
        
        res.status(201).json({ message: 'Vlog posted successfully', vlog });
    } catch (error) {
        res.status(400).json({ message: 'Error creating vlog', error: error.message });
    }
};

// PUT (update) an existing vlog
const updateVlog = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            category,
            title,
            subject,
            description,
            link,
            cover_image
        } = req.body;

        const updatedVlog = await Vlogs.findByIdAndUpdate(
            id,
            {
                category,
                title,
                subject,
                description,
                link,
                cover_image
            },
            { new: true } // This option returns the updated document
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