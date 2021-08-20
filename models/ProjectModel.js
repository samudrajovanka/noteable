import mongoose from 'mongoose';

const { Schema } = mongoose;

const ProjectSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    enum: ['new', 'uncomplete', 'complete'],
    default: 'new',
  },
  task_id: {
    type: Schema.Types.ObjectId,
    ref: 'Task',
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  updated_at: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.models.Project || mongoose.model('Project', ProjectSchema);
