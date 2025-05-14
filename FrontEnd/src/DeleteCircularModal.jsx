import React from 'react';

const DeleteCircularModal = ({ onDeleteConfirm, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Are you sure?</h3>
        <p>This action cannot be undone.</p>
        <button onClick={onDeleteConfirm}>Delete</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default DeleteCircularModal;
