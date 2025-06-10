// models/assignment.model.js
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const assignmentSchema = new Schema({
  engineerId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  projectId: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  allocationPercentage: {
    type: Number,
    required: true,
    min: [0, 'Allocation cannot be less than 0'],
    max: [100, 'Allocation cannot be more than 100']
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  role: {
    type: String,
    required: true,

  }
}, { timestamps: true });

const Assignment = model('Assignment', assignmentSchema);

export default Assignment;
