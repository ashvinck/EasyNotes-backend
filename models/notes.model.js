import mongoose, { Schema } from 'mongoose';

const notesSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
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
  timeStamp: {
    type: Date,
    required: true,
  },
  category: {
    type: String,
  },
  username: {
    type: String,
    required: true,
  },
});

export const Notes = mongoose.model('Notes', notesSchema);
