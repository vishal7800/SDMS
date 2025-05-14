import React, { useState } from 'react';

const EditCircularModal = ({ circular, onSave, onClose }) => {
  const [editedCircular, setEditedCircular] = useState(circular || {});

  if (!circular) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedCircular(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editedCircular);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Edit Circular</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="date"
            name="date"
            value={editedCircular.date}
            onChange={handleChange}
            required
          />
          <textarea
            name="content"
            value={editedCircular.content}
            onChange={handleChange}
            required
          />
          <button type="submit">Save</button>
          <button onClick={onClose} type="button">Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default EditCircularModal;