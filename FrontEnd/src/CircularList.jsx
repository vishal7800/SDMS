import React from 'react';

const CircularList = ({ circulars, onView, onEdit, onDelete }) => {
  return (
    <div className="circular-list">
      <h2>All Circulars</h2>
      <ul>
        {circulars.map((circular, index) => (
          <li key={index}>
            <strong>{circular.date}</strong>: {circular.content}
            <div className="actions">
              <button onClick={() => onView(index)}>View</button>
              <button onClick={() => onEdit(index)}>Edit</button>
              <button onClick={() => onDelete(index)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CircularList;
