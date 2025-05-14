import React, { useState } from 'react';
import AttendanceForm from './AttendanceForm';
import CircularForm from './CircularForm';
import CircularList from './CircularList';
import ViewCircularModal from './ViewCircularModal';
import EditCircularModal from './EditCircularModal';
import DeleteCircularModal from './DeleteCircularModal';
import './Admin.css';


const Dashboard = () => {
  const [circulars, setCirculars] = useState([]);
  const [viewingIndex, setViewingIndex] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [deletingIndex, setDeletingIndex] = useState(null);

  const handleAddCircular = (newCircular) => {
    setCirculars([...circulars, newCircular]);
  };

  const handleSaveEdit = (updatedCircular) => {
    const updated = [...circulars];
    updated[editingIndex] = updatedCircular;
    setCirculars(updated);
    setEditingIndex(null);
  };

  const handleDelete = () => {
    const updated = circulars.filter((_, idx) => idx !== deletingIndex);
    setCirculars(updated);
    setDeletingIndex(null);
  };

  return (
    <div className="dashboard">
      <AttendanceForm />
      <CircularForm onAdd={handleAddCircular} />
      <CircularList
        circulars={circulars}
        onView={setViewingIndex}
        onEdit={setEditingIndex}
        onDelete={setDeletingIndex}
      />
      <ViewCircularModal
        circular={circulars[viewingIndex]}
        onClose={() => setViewingIndex(null)}
      />
      <EditCircularModal
        circular={circulars[editingIndex]}
        onSave={handleSaveEdit}
        onClose={() => setEditingIndex(null)}
      />
      <DeleteCircularModal
        onDeleteConfirm={handleDelete}
        onClose={() => setDeletingIndex(null)}
      />
    </div>
  );
};

export default Admin;
