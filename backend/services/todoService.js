const Todo = require('../models/Todo');
const { AppError } = require('../utils/errorHandler');

const createTodo = async (todoData, userId) => {
  const todo = await Todo.create({
    ...todoData,
    user: userId,
  });

  return await Todo.findById(todo._id).populate('user', 'name email');
};

const getTodos = async (userId, queryParams) => {
  const {
    page = 1,
    limit = 10,
    status,
    priority,
    sortBy = 'createdAt',
    sortOrder = 'desc',
  } = queryParams;

  // Build filter
  const filter = { user: userId };
  if (status) {
    filter.status = status;
  }
  if (priority) {
    filter.priority = priority;
  }

  // Build sort
  const sort = {};
  sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

  // Pagination
  const skip = (parseInt(page) - 1) * parseInt(limit);

  const todos = await Todo.find(filter)
    .sort(sort)
    .skip(skip)
    .limit(parseInt(limit))
    .populate('user', 'name email');

  const total = await Todo.countDocuments(filter);

  return {
    todos,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / parseInt(limit)),
    },
  };
};

const getTodoById = async (todoId, userId) => {
  const todo = await Todo.findOne({ _id: todoId, user: userId }).populate(
    'user',
    'name email'
  );

  if (!todo) {
    throw new AppError('Todo not found', 404);
  }

  return todo;
};

const updateTodo = async (todoId, userId, updateData) => {
  const todo = await Todo.findOne({ _id: todoId, user: userId });

  if (!todo) {
    throw new AppError('Todo not found', 404);
  }

  Object.keys(updateData).forEach((key) => {
    todo[key] = updateData[key];
  });

  await todo.save();

  return await Todo.findById(todo._id).populate('user', 'name email');
};

const deleteTodo = async (todoId, userId) => {
  const todo = await Todo.findOne({ _id: todoId, user: userId });

  if (!todo) {
    throw new AppError('Todo not found', 404);
  }

  await todo.deleteOne();

  return { message: 'Todo deleted successfully' };
};

module.exports = {
  createTodo,
  getTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
};
