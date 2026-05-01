const User = require('../models/user');
const { comparePassword } = require('../helpers/auth');
const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET || process.env.REACT_APP_JWT_SECRET;

const isProduction = process.env.NODE_ENV === 'production' || !!process.env.VERCEL;

const authCookieOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    path: '/',
    maxAge: 7 * 24 * 60 * 60 * 1000
};

// Post endpoint admin
const createAdmin = async (req, res) => {
    try {
        const { admin_email, admin_name, admin_tel, password } = req.body;
        
        // Create admin
        const user = await User.create({
            admin_email,
            admin_name,
            admin_tel,
            password
        });
        
        return res.status(200).json({ message: 'Admin created successfully', user });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
};

// Login endpoint
const loginAdmin = async (req, res) => {
    try {
        const { admin_email, password } = req.body;

        if (!jwtSecret) {
            console.error('JWT_SECRET is not set; cannot sign login token');
            return res.status(500).json({ error: 'Server auth is not configured' });
        }
        
        // Check if user exists
        const user = await User.findOne({ admin_email });
        if (!user) {
            return res.status(404).json({
                error: 'No user found'
            });
        }
        
        // Compare password
        const match = await comparePassword(password, user.password);
        if (match) {
            jwt.sign(
                { id: user._id, admin_name: user.admin_name, admin_email: user.admin_email },
                jwtSecret,
                {},
                (err, token) => {
                    if (err) throw err;
                    res.cookie('token', token, authCookieOptions).json(user);
                }
            );
        } else {
            return res.status(401).json({ error: 'Incorrect password' });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Server error' });
    }
};

// Get admin details
const getAdmin = async (req, res) => {
    try {
        if (!jwtSecret) {
            console.error('JWT_SECRET is not set; cannot verify token');
            return res.status(500).json({ error: 'Server auth is not configured' });
        }

        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ error: 'No token, authorization denied' });
        }

        jwt.verify(token, jwtSecret, async (err, decoded) => {
            if (err) {
                return res.status(401).json({ error: 'Token is not valid' });
            }

            const user = await User.findById(decoded.id).select('-password');
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            res.json(user);
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Logout admin
const logoutAdmin = (req, res) => {
    try {
        res.clearCookie('token', authCookieOptions);
        return res.json({ message: 'Logged out successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
};

module.exports = {
    createAdmin,
    loginAdmin,
    getAdmin,
    logoutAdmin
};
