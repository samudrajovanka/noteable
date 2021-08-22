import mongoose from 'mongoose';

const { Schema } = mongoose;

const TaskSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 30,
  },
  done: {
    type: Boolean,
    default: false,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  update_at: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.models.Task || mongoose.model('Task', TaskSchema);
