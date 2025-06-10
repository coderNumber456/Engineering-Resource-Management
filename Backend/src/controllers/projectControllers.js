import { Project } from "../models/project.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createProject = asyncHandler(async (req, res) => {
  try {
    const {
      name,
      description,
      startDate,
      endDate,
      requiredSkills,
      teamSize,
      status,
      managerId,
    } = req.body;

    // Basic validation
    if (!name || !startDate || !status || !managerId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newProject = new Project({
      name,
      description,
      startDate,
      endDate,
      requiredSkills,
      teamSize,
      status,
      managerId,
    });

    const savedProject = await newProject.save();

    res.status(201).json({
      message: "Project created successfully",
      project: savedProject,
    });
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ message: "Server error while creating project" });
  }
});


const updateProject = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params; // Project ID from URL
    const updateData = req.body; // Fields to update

    const updatedProject = await Project.findByIdAndUpdate(id, updateData, {
      new: true, // return the updated document
      runValidators: true, // validate against schema
    });

    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json({
      message: "Project updated successfully",
      project: updatedProject,
    });
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).json({ message: "Server error while updating project" });
  }
});

const getAllProjects = asyncHandler( async (req, res) => {
  try {
    const projects = await Project.find().populate('managerId', 'name email'); // Optional: populate manager info

    res.status(200).json({
      message: 'Projects fetched successfully',
      projects,
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ message: 'Server error while fetching projects',projects:null});  
  }
});

const getProject = asyncHandler( async (req, res) => {
  try {
    const { id } = req.params; // Project ID from URL
    console.log(id);

    const project = await Project.findById(id); // Optional: populate manager info

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json({
      message: 'Project fetched successfully',
      project,
    });

} catch(error) {
    console.error('Error fetching project:', error);
    res.status(500).json({ message: 'Server error while fetching project',project:null});  
  }
});




export { createProject , updateProject, getAllProjects, getProject };
