import express from 'express';
import { addNote, deleteNote, getAllNotes, getNoteByTitle, updateNote } from '../controllers/Notes.controller.js';

const router = express.Router();

router.get('/notes', getAllNotes);
router.get('/notes/:title', getNoteByTitle);
router.post('/notes', addNote);
router.patch('/notes/:id', updateNote);
router.delete('/notes/:id', deleteNote);

export default router;