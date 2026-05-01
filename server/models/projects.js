const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    }
});

const projectSchema = new mongoose.Schema({
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
    links: [linkSchema],
    images: [{
        type: String, // Storing base64
        required: true
    }],
    start_date: {
        type: Date,
    },
    ongoing:{
        type:Boolean,
        default: false
    },
    end_date: {
        type: Date,
    }
}, { timestamps: true });

const Projects = mongoose.model('Projects', projectSchema);

module.exports = Projects;