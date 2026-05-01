const multer = require('multer');
const { v2: cloudinary } = require('cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024
    },
    fileFilter(req, file, callback) {
        const allowedDocumentTypes = [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ];

        if (!file.mimetype.startsWith('image/') && !allowedDocumentTypes.includes(file.mimetype)) {
            return callback(new Error('Only image, PDF, or Word files are allowed'));
        }
        callback(null, true);
    }
});

const uploadPdf = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024
    },
    fileFilter(req, file, callback) {
        if (file.mimetype !== 'application/pdf') {
            return callback(new Error('Only PDF files are allowed for CV upload'));
        }
        callback(null, true);
    }
});

const uploadBufferToCloudinary = (file, folder, options = {}) => {
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
        throw new Error('Cloudinary environment variables are not configured');
    }

    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder,
                resource_type: options.resource_type || 'image',
                use_filename: true,
                unique_filename: options.unique_filename ?? true,
                overwrite: options.overwrite ?? false,
                invalidate: options.invalidate ?? false,
                public_id: options.public_id
            },
            (error, result) => {
                if (error) {
                    return reject(error);
                }
                resolve(result.secure_url);
            }
        );

        stream.end(file.buffer);
    });
};

const parseJsonField = (value, fallback) => {
    if (value === undefined || value === null || value === '') {
        return fallback;
    }

    if (Array.isArray(value) || typeof value === 'object') {
        return value;
    }

    try {
        return JSON.parse(value);
    } catch (error) {
        return fallback;
    }
};

module.exports = {
    upload,
    uploadPdf,
    uploadBufferToCloudinary,
    parseJsonField
};
