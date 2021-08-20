import mongoose from 'mongoose';

const { Schema } = mongoose;

const NoteSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  pinned: {
    type: Boolean,
    default: false,
  },
  color: {
    type: String,
    default: 'green',
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

module.exports = mongoose.models.Note || mongoose.model('Note', NoteSchema);
