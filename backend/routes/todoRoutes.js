const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');
const { protect } = require('../middlewares/auth');
const { validateTodo } = require('../middlewares/validator');

// All routes are protected
router.use(protect);

router
  .route('/')
  .get(todoController.getTodos)
  .post(validateTodo, todoController.createTodo);

router
  .route('/:id')
  .get(todoController.getTodoById)
  .put(validateTodo, todoController.updateTodo)
  .delete(todoController.deleteTodo);

module.exports = router;
