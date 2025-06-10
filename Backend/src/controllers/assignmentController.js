import Assignment from "../models/assignment.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createAssignment = asyncHandler(async (req, res) => {
  const {
    engineerId,
    projectId,
    allocationPercentage,
    startDate,
    endDate,
    role,
  } = req.body;

  if (
    !engineerId ||
    !projectId ||
    !allocationPercentage ||
    !startDate ||
    !endDate ||
    !role
  ) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const newAssignment = new Assignment({
    engineerId,
    projectId,
    allocationPercentage,
    startDate,
    endDate,
    role,
  });

  await newAssignment.save();

  res.status(200).json({
    message: "Assignment created successfully",
    assignment: newAssignment,
  });
});

const getAllAssignments = asyncHandler(async (req, res) => {
  try {
    const assignments = await Assignment.find();
    res.status(200).json({
      message: "Assignments fetched successfully",
      assignments,
    });
  } catch (error) {
    console.error("Error fetching assignments:", error);
    res
      .status(500)
      .json({ message: "Server error while fetching assignments" });
  }
});

const updateAssignment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  try {
    const updatedAssignment = await Assignment.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true, // return the updated document
        runValidators: true, // validate against schema
      }
    );

    res.status(200).json({
      message: "Assignment updated successfully",
      assignment: updatedAssignment,
    });
  } catch (error) {
    throw new ApiError(500, "Something went wrong while updating assignment");
  }
});

  const deleteAssignment = asyncHandler(async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedAssignment = await Assignment.findByIdAndDelete(id);
  
      if (!deletedAssignment) {
        return res.status(404).json({ message: "Assignment not found" });
      }
  
      res.status(200).json({ message: "Assignment deleted successfully" });
    } catch (error) {
      throw new ApiError(500, "Something went wrong while deleting assignment");
    }
  });

export { createAssignment, getAllAssignments, updateAssignment, deleteAssignment };
