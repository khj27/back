import express from 'express';
import {
  getTodos,
  addTodo,
  toggleTodo,
  deleteTodo,
} from '../controllers/todoController.js';

const router = express.Router();

router.get('/', getTodos);
router.post('/', addTodo);
router.patch('/:id/toggle', toggleTodo);
router.delete('/:id', deleteTodo);

export default router;
