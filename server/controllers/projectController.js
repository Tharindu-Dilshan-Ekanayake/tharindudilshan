const Project = require('../models/projects');
const { parseJsonField, uploadBufferToCloudinary } = require('../helpers/upload');

const buildProjectPayload = async (body, files = []) => {
    const existingImages = parseJsonField(body.existingImages, parseJsonField(body.images, []));
    const uploadedImages = await Promise.all(
        files.map((file) => uploadBufferToCloudinary(file, 'portfolio/projects'))
    );

    return {
        category: body.category,
        title: body.title,
        subject: body.subject,
        description: body.description,
        links: parseJsonField(body.links, []),
        images: [...existingImages, ...uploadedImages],
        start_date: body.start_date || null,
        ongoing: body.ongoing === true || body.ongoing === 'true',
        end_date: (body.ongoing === true || body.ongoing === 'true') ? null : body.end_date || null
    };
};

// Create a new Project (POST)
const createProject = async (req, res) => {
    try {
        const newProject = new Project(await buildProjectPayload(req.body, req.files));
        const savedProject = await newProject.save();
        res.status(201).json(savedProject);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all Projects (GET)
const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a specific Project by ID (GET)
const getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ message: 'Project not found' });
        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a Project (PUT)
const updateProject = async (req, res) => {
    try {
        const updatedProject = await Project.findByIdAndUpdate(
            req.params.id,
            await buildProjectPayload(req.body, req.files),
            { new: true, runValidators: true }
        );
        if (!updatedProject) return res.status(404).json({ message: 'Project not found' });
        res.status(200).json(updatedProject);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a Project (DELETE)
const deleteProject = async (req, res) => {
    try {
        const deletedProject = await Project.findByIdAndDelete(req.params.id);
        if (!deletedProject) return res.status(404).json({ message: 'Project not found' });
        res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject
};
