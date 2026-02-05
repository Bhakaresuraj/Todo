import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import * as todoService from '../services/todoService';
import TodoForm from '../components/TodoForm';
import TodoCard from '../components/TodoCard';
import FilterBar from '../components/FilterBar';
import Pagination from '../components/Pagination';
import './Dashboard.css';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    sortBy: 'createdAt',
    sortOrder: 'desc',
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0,
  });

  useEffect(() => {
    fetchTodos();
  }, [filters, pagination.page]);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      setError('');
      const params = {
        page: pagination.page,
        limit: pagination.limit,
        ...filters,
      };
      const response = await todoService.getTodos(params);
      setTodos(response.data);
      setPagination((prev) => ({
        ...prev,
        ...response.pagination,
      }));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch todos');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTodo = async (todoData) => {
    try {
      setFormLoading(true);
      await todoService.createTodo(todoData);
      setShowForm(false);
      fetchTodos();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to create todo');
    } finally {
      setFormLoading(false);
    }
  };

  const handleUpdateTodo = async (todoData) => {
    try {
      setFormLoading(true);
      await todoService.updateTodo(editingTodo._id, todoData);
      setEditingTodo(null);
      setShowForm(false);
      fetchTodos();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update todo');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteTodo = async (id) => {
    if (!window.confirm('Are you sure you want to delete this todo?')) {
      return;
    }

    try {
      await todoService.deleteTodo(id);
      fetchTodos();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete todo');
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await todoService.updateTodo(id, { status: newStatus });
      fetchTodos();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update status');
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
    setPagination((prev) => ({
      ...prev,
      page: 1,
    }));
  };

  const handleSortChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleResetFilters = () => {
    setFilters({
      status: '',
      priority: '',
      sortBy: 'createdAt',
      sortOrder: 'desc',
    });
    setPagination((prev) => ({
      ...prev,
      page: 1,
    }));
  };

  const handlePageChange = (page) => {
    setPagination((prev) => ({
      ...prev,
      page,
    }));
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="container">
          <div className="header-content">
            <h1>Todo App</h1>
            <div className="header-actions">
              <span className="user-name">Welcome, {user?.name}</span>
              <button onClick={handleLogout} className="btn btn-secondary">
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="container">
          <div className="dashboard-actions">
            <button
              onClick={() => {
                setEditingTodo(null);
                setShowForm(!showForm);
              }}
              className="btn btn-primary"
            >
              {showForm ? 'Cancel' : '+ New Todo'}
            </button>
          </div>

          {showForm && (
            <TodoForm
              todo={editingTodo}
              onSubmit={editingTodo ? handleUpdateTodo : handleCreateTodo}
              onCancel={() => {
                setShowForm(false);
                setEditingTodo(null);
              }}
              loading={formLoading}
            />
          )}

          <FilterBar
            filters={filters}
            onFilterChange={handleFilterChange}
            onSortChange={handleSortChange}
            onReset={handleResetFilters}
          />

          {error && <div className="error-message">{error}</div>}

          {loading ? (
            <div className="loading">Loading todos...</div>
          ) : todos.length === 0 ? (
            <div className="empty-state">
              <p>No todos found. Create your first todo!</p>
            </div>
          ) : (
            <>
              <div className="todos-grid">
                {todos.map((todo) => (
                  <TodoCard
                    key={todo._id}
                    todo={todo}
                    onEdit={(todo) => {
                      setEditingTodo(todo);
                      setShowForm(true);
                    }}
                    onDelete={handleDeleteTodo}
                    onStatusChange={handleStatusChange}
                  />
                ))}
              </div>
              <Pagination
                pagination={pagination}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
