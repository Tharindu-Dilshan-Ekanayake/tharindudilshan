const Blog = require('../models/blogs');
const { parseJsonField, uploadBufferToCloudinary } = require('../helpers/upload');

const buildBlogPayload = async (body, files = []) => {
    const existingImages = parseJsonField(body.existingImages, parseJsonField(body.images, []));
    const uploadedImages = await Promise.all(
        files.map((file) => uploadBufferToCloudinary(file, 'portfolio/blogs'))
    );

    return {
        category: body.category,
        title: body.title,
        subject: body.subject,
        description: body.description,
        link: body.link,
        images: [...existingImages, ...uploadedImages]
    };
};

// Create a new blog post
const createBlog = async (req, res) => {
    try {
        const newBlog = new Blog(await buildBlogPayload(req.body, req.files));

        await newBlog.save();
        res.status(201).json({ message: 'Blog post created successfully', blog: newBlog });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create blog post' });
    }
};

// Get all blog posts
const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch blog posts' });
    }
};

// Get a single blog post by ID
const getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ error: 'Blog post not found' });
        }
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch blog post' });
    }
};

// Update a blog post by ID
const updateBlog = async (req, res) => {
    try {
        const blogPayload = await buildBlogPayload(req.body, req.files);
        const updatedBlog = await Blog.findByIdAndUpdate(
            req.params.id,
            blogPayload,
            { new: true, runValidators: true }
        );

        if (!updatedBlog) {
            return res.status(404).json({ error: 'Blog post not found' });
        }

        res.status(200).json({ message: 'Blog post updated successfully', blog: updatedBlog });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update blog post' });
    }
};

// Delete a blog post by ID
const deleteBlog = async (req, res) => {
    try {
        const deletedBlog = await Blog.findByIdAndDelete(req.params.id);

        if (!deletedBlog) {
            return res.status(404).json({ error: 'Blog post not found' });
        }

        res.status(200).json({ message: 'Blog post deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete blog post' });
    }
};

module.exports = {
    createBlog,
    getAllBlogs,
    getBlogById,
    updateBlog,
    deleteBlog
};
