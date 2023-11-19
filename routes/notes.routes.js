import { Router } from 'express';
import { authValidation } from '../middleware/authValidation.js';
import {
  addNewNote,
  deleteNoteById,
  getAllNotes,
  updateNoteById,
} from '../controller/notes.controller.js';

const router = Router();

router.route('/:username/view-all-notes').get(authValidation, getAllNotes);
router.route('/:username/add-new-note').post(authValidation, addNewNote);
router.route('/:username/update-note/:id').put(authValidation, updateNoteById);
router
  .route('/:username/delete-note/:id')
  .delete(authValidation, deleteNoteById);
export default router;
