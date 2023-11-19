import mongoose, { Schema } from 'mongoose';

const notesSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    index: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  category: {
    type: Array,
  },
});

export const Notes = mongoose.model('Notes', notesSchema);
