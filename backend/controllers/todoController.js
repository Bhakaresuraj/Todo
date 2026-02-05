const { validationResult } = require('express-validator');
const { AppError } = require('../utils/errorHandler');
const todoService = require('../services/todoService');

const createTodo = async (req, res, next) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        errors: errors.array(),
      });
    }

    const todo = await todoService.createTodo(req.body, req.user.id);

    res.status(201).json({
      status: 'success',
      data: todo,
    });
  } catch (error) {
    next(error);
  }
};

const getTodos = async (req, res, next) => {
  try {
    const result = await todoService.getTodos(req.user.id, req.query);

    res.status(200).json({
      status: 'success',
      data: result.todos,
      pagination: result.pagination,
    });
  } catch (error) {
    next(error);
  }
};

const getTodoById = async (req, res, next) => {
  try {
    const todo = await todoService.getTodoById(req.params.id, req.user.id);

    res.status(200).json({
      status: 'success',
      data: todo,
    });
  } catch (error) {
    next(error);
  }
};

const updateTodo = async (req, res, next) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        errors: errors.array(),
      });
    }

    const todo = await todoService.updateTodo(
      req.params.id,
      req.user.id,
      req.body
    );

    res.status(200).json({
      status: 'success',
      data: todo,
    });
  } catch (error) {
    next(error);
  }
};

const deleteTodo = async (req, res, next) => {
  try {
    const result = await todoService.deleteTodo(req.params.id, req.user.id);

    res.status(200).json({
      status: 'success',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTodo,
  getTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
};
