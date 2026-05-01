const CV = require('../models/cv');
const { uploadBufferToCloudinary } = require('../helpers/upload');
const https = require('https');

const getSafeFileName = (name = 'cv.pdf') => {
    return name.replace(/[^a-zA-Z0-9._-]/g, '_');
};

const getPdfPublicId = (name = 'cv.pdf') => {
    const safeName = getSafeFileName(name);
    return safeName.toLowerCase().endsWith('.pdf') ? safeName : `${safeName}.pdf`;
};

const streamFileFromUrl = (url, res, cv, redirectCount = 0) => {
    https.get(url, (fileResponse) => {
        if ([301, 302, 303, 307, 308].includes(fileResponse.statusCode) && fileResponse.headers.location && redirectCount < 5) {
            return streamFileFromUrl(fileResponse.headers.location, res, cv, redirectCount + 1);
        }

        if (fileResponse.statusCode !== 200) {
            return res.status(502).json({
                message: 'Failed to fetch CV file from Cloudinary',
                statusCode: fileResponse.statusCode
            });
        }

        const fileName = getSafeFileName(cv.original_name || `${cv.title}.pdf`);

        res.setHeader('Content-Type', cv.file_type || fileResponse.headers['content-type'] || 'application/octet-stream');
        res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);

        if (fileResponse.headers['content-length']) {
            res.setHeader('Content-Length', fileResponse.headers['content-length']);
        }

        fileResponse.pipe(res);
    }).on('error', (error) => {
        res.status(500).json({ message: 'Failed to download CV', error: error.message });
    });
};

const getLatestCV = async (req, res) => {
    try {
        const cv = await CV.findOne().sort({ createdAt: -1 });
        if (!cv) {
            return res.status(404).json({ message: 'CV not uploaded yet' });
        }

        res.status(200).json(cv);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch CV', error: error.message });
    }
};

const uploadCV = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Please choose one PDF CV file' });
        }

        if (req.file.mimetype !== 'application/pdf') {
            return res.status(400).json({ message: 'Only PDF files are allowed for CV upload' });
        }

        const fileUrl = await uploadBufferToCloudinary(req.file, 'portfolio/cv', {
            resource_type: 'raw',
            public_id: getPdfPublicId(req.file.originalname),
            unique_filename: false,
            overwrite: true,
            invalidate: true
        });

        await CV.deleteMany({});

        const cv = await CV.create({
            title: req.body.title || 'Tharindu Dilshan CV',
            file_url: fileUrl,
            original_name: req.file.originalname,
            file_type: req.file.mimetype,
            file_size: req.file.size
        });

        res.status(200).json({ message: 'CV updated successfully', cv });
    } catch (error) {
        res.status(500).json({ message: 'Failed to upload CV', error: error.message });
    }
};

const downloadLatestCV = async (req, res) => {
    try {
        const cv = await CV.findOne().sort({ createdAt: -1 });
        if (!cv) {
            return res.status(404).json({ message: 'CV not uploaded yet' });
        }

        streamFileFromUrl(cv.file_url, res, cv);
    } catch (error) {
        res.status(500).json({ message: 'Failed to download CV', error: error.message });
    }
};

module.exports = {
    getLatestCV,
    uploadCV,
    downloadLatestCV
};
