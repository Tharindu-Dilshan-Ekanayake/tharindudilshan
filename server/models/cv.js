const mongoose = require('mongoose');

const cvSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        default: 'Tharindu Dilshan CV'
    },
    file_url: {
        type: String,
        required: true
    },
    original_name: {
        type: String,
        required: true
    },
    file_type: {
        type: String,
        required: true
    },
    file_size: {
        type: Number,
        required: true
    }
}, { timestamps: true });

const CV = mongoose.model('CV', cvSchema);

module.exports = CV;
