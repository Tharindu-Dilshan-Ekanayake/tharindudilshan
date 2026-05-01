const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    images: [{
        type: String, // Storing base64
        required: true
    }]
}, { timestamps: true });

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;
