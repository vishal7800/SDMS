import React from 'react';

const ViewCircularModal = ({ circular, onClose }) => {
  if (!circular) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>View Circular</h3>
        <p><strong>Date:</strong> {circular.date}</p>
        <p><strong>Content:</strong> {circular.content}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ViewCircularModal;
