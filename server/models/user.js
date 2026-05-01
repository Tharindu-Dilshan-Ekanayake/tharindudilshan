const mongoose = require('mongoose');
const { hashPassword } = require('../helpers/auth');

const userSchema = new mongoose.Schema({
    admin_email: {
        type: String,
        required: true,
        unique: true
    },
    admin_name: {
        type: String,
        required: true
    },
    admin_tel: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });

userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await hashPassword(this.password);
    }
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;