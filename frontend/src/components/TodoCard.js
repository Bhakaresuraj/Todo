import React from 'react';

const TodoCard = ({ todo, onEdit, onDelete, onStatusChange }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return '#28a745';
      case 'In-Progress':
        return '#007bff';
      case 'Pending':
        return '#ffc107';
      default:
        return '#6c757d';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return '#dc3545';
      case 'Medium':
        return '#ffc107';
      case 'Low':
        return '#28a745';
      default:
        return '#6c757d';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No due date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const isOverdue = (dueDate) => {
    if (!dueDate) return false;
    return new Date(dueDate) < new Date() && todo.status !== 'Completed';
  };

  return (
    <div className="card" style={{ position: 'relative' }}>
      {isOverdue(todo.dueDate) && (
        <div
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: '#dc3545',
            color: 'white',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: 'bold',
          }}
        >
          Overdue
        </div>
      )}
      
      <div style={{ marginBottom: '10px' }}>
        <h3 style={{ marginBottom: '5px', color: '#333' }}>{todo.title}</h3>
        {todo.description && (
          <p style={{ color: '#666', marginBottom: '10px' }}>
            {todo.description}
          </p>
        )}
      </div>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px',
          marginBottom: '15px',
        }}
      >
        <span
          style={{
            background: getStatusColor(todo.status),
            color: 'white',
            padding: '4px 12px',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: '500',
          }}
        >
          {todo.status}
        </span>
        <span
          style={{
            background: getPriorityColor(todo.priority),
            color: 'white',
            padding: '4px 12px',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: '500',
          }}
        >
          {todo.priority}
        </span>
        <span
          style={{
            background: '#e9ecef',
            color: '#495057',
            padding: '4px 12px',
            borderRadius: '4px',
            fontSize: '12px',
          }}
        >
          Due: {formatDate(todo.dueDate)}
        </span>
      </div>

      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        {todo.status !== 'Completed' && (
          <select
            value={todo.status}
            onChange={(e) => onStatusChange(todo._id, e.target.value)}
            style={{
              padding: '6px 12px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px',
              cursor: 'pointer',
            }}
          >
            <option value="Pending">Pending</option>
            <option value="In-Progress">In-Progress</option>
            <option value="Completed">Completed</option>
          </select>
        )}
        <button
          onClick={() => onEdit(todo)}
          className="btn btn-secondary"
          style={{ padding: '6px 12px', fontSize: '14px' }}
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(todo._id)}
          className="btn btn-danger"
          style={{ padding: '6px 12px', fontSize: '14px' }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoCard;
