const mongoose = require('mongoose')
const hiringSchema = new mongoose.Schema({
    name_user:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    mobile:{
        type: String,
        required: true
    },
    message:{
        type: String,
        required: true
    },
    read:{
        type:Boolean,
        default:false
    }
}, { timestamps: true });

const Hiring = mongoose.model('Hiring', hiringSchema);
module.exports = Hiring;