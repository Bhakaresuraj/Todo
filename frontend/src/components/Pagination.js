import React from 'react';

const Pagination = ({ pagination, onPageChange }) => {
  const { page, pages, total } = pagination;

  if (pages <= 1) return null;

  const pageNumbers = [];
  for (let i = 1; i <= pages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '10px',
        marginTop: '20px',
        flexWrap: 'wrap',
      }}
    >
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="btn btn-secondary"
        style={{ padding: '8px 16px' }}
      >
        Previous
      </button>

      {pageNumbers.map((num) => {
        if (
          num === 1 ||
          num === pages ||
          (num >= page - 2 && num <= page + 2)
        ) {
          return (
            <button
              key={num}
              onClick={() => onPageChange(num)}
              className={`btn ${num === page ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '8px 16px' }}
            >
              {num}
            </button>
          );
        } else if (num === page - 3 || num === page + 3) {
          return <span key={num}>...</span>;
        }
        return null;
      })}

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === pages}
        className="btn btn-secondary"
        style={{ padding: '8px 16px' }}
      >
        Next
      </button>

      <span style={{ marginLeft: '10px', color: '#666' }}>
        Showing {((page - 1) * pagination.limit) + 1} - {Math.min(page * pagination.limit, total)} of {total}
      </span>
    </div>
  );
};

export default Pagination;
