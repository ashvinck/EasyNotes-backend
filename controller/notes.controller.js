import createError from 'http-errors';
import { Notes } from '../models/notes.model.js'; // Adjust the path accordingly

// Add a new note
const addNewNote = async (req, res, next) => {
  try {
    const { id, title, description, timeStamp, category, username } = req.body;

    const newNote = new Notes({
      id,
      title,
      description,
      timeStamp,
      category,
      username,
    });

    const savedNote = await newNote.save();
    if (!savedNote)
      throw createError.InternalServerError('Something went wrong');

    res.status(201).send({ message: 'Note added successfully!' });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const getAllNotes = async (req, res, next) => {
  const { username } = req.params;
  try {
    const allNotes = await Notes.find({ username });
    if (!allNotes)
      throw createError.InternalServerError('Error fetching notes');
    res.status(200).json(allNotes);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// Update note by ID
const updateNoteById = async (req, res, next) => {
  try {
    const { id, username } = req.params;
    const { title, description, timeStamp, category } = req.body;
    const noteExists = await Notes.findOne({ id, username });

    if (noteExists) {
      (noteExists.id = id),
        (noteExists.title = title),
        (noteExists.description = description),
        (noteExists.timeStamp = timeStamp),
        (noteExists.category = category);
      await noteExists.save();
    } else {
      const notesData = new Notes({
        id,
        title,
        description,
        timeStamp,
        category,
        username,
      });
      await notesData.save();
    }
    res.status(200).send({ message: 'Note updated Successfully' });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// Delete note by ID
const deleteNoteById = async (req, res, next) => {
  try {
    const { id, username } = req.params;
    const deletedNote = await Notes.findOneAndDelete({ id, username });
    if (!deletedNote) {
      throw createError.NotFound('Note not found');
    }
    res.status(201).send({ message: 'Note deleted successfully' }); // 204 No Content
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// Update the category
const updateCategory = async (req, res, next) => {
  try {
    const { id, username } = req.params;
    const { category } = req.body;
    const note = await Notes.findOneAndUpdate(
      { id, username },
      { $set: { category } },
      { new: true }
    );
    if (!note) {
      throw createError.InternalServerError('Error updating category');
    }
    // Send a success response with the updated note
    res.status(200).json({ message: 'Category updated successfully' });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const getNoteById = async (req, res, next) => {
  try {
    const { id, username } = req.params;
    const noteById = await Notes.find({ id, username });
    if (!noteById) throw createError.NotFound('Note not found!');
    res.status(200).json(noteById);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export {
  addNewNote,
  getAllNotes,
  updateNoteById,
  deleteNoteById,
  updateCategory,
  getNoteById,
};
