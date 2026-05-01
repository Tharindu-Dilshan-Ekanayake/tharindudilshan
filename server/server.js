const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Behind Vercel/Proxies, trust X-Forwarded-* headers
app.set('trust proxy', 1);

// Connect to MongoDB
const mongoUrl = process.env.MONGO_URL || process.env.REACT_APP_MONGO_URL;

if (mongoUrl) {
    mongoose
        .connect(mongoUrl)
        .then(() => console.log('Database connected'))
        .catch((err) => console.log('Database not connected', err));
} else {
    console.warn('MongoDB connection skipped: MONGO_URL is not set');
}

// CORS
// Note: On Vercel, the public site might be served from a custom domain that
// doesn't equal VERCEL_URL, so an allowlist can accidentally block preflights.
const allowedOrigins = [
    'http://localhost:3000',
    process.env.CLIENT_URL,
    process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`
].filter(Boolean);

app.use((req, res, next) => {
    if (req.url === '/api') {
        req.url = '/';
    } else if (req.url.startsWith('/api/')) {
        req.url = req.url.slice(4);
    }
    next();
});

app.use(cors({
    // In Vercel deployments, reflect the request origin (enables custom domains).
    // In local/self-hosted, keep a stricter allowlist.
    origin: process.env.VERCEL
        ? true
        : (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                return callback(null, true);
            }
            const err = new Error('Not allowed by CORS');
            err.status = 403;
            return callback(err);
        },
    credentials: true,
    optionsSuccessStatus: 204
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());

// Routes
app.get('/health', (req, res) => {
    res.json({ ok: true });
});

app.use('/', require('./routes/adminLoginRoutes'));
app.use('/vlog', require('./routes/vlogsRoutes'));
app.use('/blog',require('./routes/blogsRoutes'));
app.use('/projects', require('./routes/projectRoutes'));
app.use('/hiring',require('./routes/hiringRoutes'));
app.use('/cv', require('./routes/cvRoutes'));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || 'Something broke!');
});

if (require.main === module) {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

module.exports = app;
