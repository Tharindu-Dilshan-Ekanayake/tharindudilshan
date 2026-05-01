const express = require('express');
const router = express.Router();
const { upload } = require('../helpers/upload');

const {
    createBlog,
    getAllBlogs,
    getBlogById,
    updateBlog,
    deleteBlog
} = require('../controllers/blogsController');

// Route to create a new blog post
router.post('/create', upload.array('images', 10), createBlog);

// Route to get all blog posts
router.get('/getblogs', getAllBlogs);

// Route to get a single blog post by ID
router.get('/getbyidblog/:id', getBlogById);

// Route to update a blog post by ID
router.put('/updateblog/:id', upload.array('images', 10), updateBlog);

// Route to delete a blog post by ID
router.delete('/deleteblog/:id', deleteBlog);

module.exports = router;
