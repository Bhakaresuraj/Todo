import React from 'react';

const FilterBar = ({ filters, onFilterChange, onSortChange, onReset }) => {
  return (
    <div className="card">
      <h3 style={{ marginBottom: '15px' }}>Filters & Sort</h3>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '15px',
          marginBottom: '15px',
        }}
      >
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={filters.status || ''}
            onChange={(e) => onFilterChange('status', e.target.value)}
          >
            <option value="">All Status</option>
            <option value="Pending">Pending</option>
            <option value="In-Progress">In-Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className="form-group" style={{ marginBottom: 0 }}>
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            name="priority"
            value={filters.priority || ''}
            onChange={(e) => onFilterChange('priority', e.target.value)}
          >
            <option value="">All Priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div className="form-group" style={{ marginBottom: 0 }}>
          <label htmlFor="sortBy">Sort By</label>
          <select
            id="sortBy"
            name="sortBy"
            value={filters.sortBy || 'createdAt'}
            onChange={(e) => onSortChange('sortBy', e.target.value)}
          >
            <option value="createdAt">Created Date</option>
            <option value="dueDate">Due Date</option>
            <option value="title">Title</option>
            <option value="priority">Priority</option>
          </select>
        </div>

        <div className="form-group" style={{ marginBottom: 0 }}>
          <label htmlFor="sortOrder">Order</label>
          <select
            id="sortOrder"
            name="sortOrder"
            value={filters.sortOrder || 'desc'}
            onChange={(e) => onSortChange('sortOrder', e.target.value)}
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>
      </div>
      <button onClick={onReset} className="btn btn-secondary">
        Reset Filters
      </button>
    </div>
  );
};

export default FilterBar;
