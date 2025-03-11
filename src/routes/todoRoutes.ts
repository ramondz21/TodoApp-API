import { validateTodo } from './../middleware/validationMiddleware';
import express from 'express';
import { getTodos, addTodo, editTodoById, deleteTodoById, getTodoById } from '../controllers/todoController';

const router = express.Router();

router.get('/todos', getTodos);

router.get('/todos/:id', getTodoById);

router.post('/todos', validateTodo, addTodo);

router.put('/todos/:id', validateTodo, editTodoById);

router.delete('/todos/:id', deleteTodoById);


export default router;