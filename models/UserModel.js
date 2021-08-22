import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = new Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  notes_id: [{
    type: Schema.Types.ObjectId,
    ref: 'Note',
    maxItems: 30,
  }],
  projects_id: [{
    type: Schema.Types.ObjectId,
    ref: 'Project',
    maxItems: 20,
  }],
  created_at: {
    type: Date,
    default: Date.now(),
  },
  updated_at: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);
