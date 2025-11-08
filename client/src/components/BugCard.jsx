import React from 'react';

const BugCard = ({ bug, onEdit, onDelete }) => (
  <div className="card mb-3" style={{ backgroundColor: '#fff8f0', borderColor: '#d7ccc8' }}>
    <div className="card-body">
      <h5 className="card-title" style={{ color: '#4e342e' }}>{bug.title}</h5>
      <p className="card-text">{bug.description}</p>
      <p>Status: <strong>{bug.status}</strong> | Priority: <strong>{bug.priority}</strong></p>
      <button className="btn btn-sm btn-warning me-2" onClick={() => onEdit(bug)}>Edit</button>
      <button className="btn btn-sm btn-danger" onClick={() => onDelete(bug._id)}>Delete</button>
    </div>
  </div>
);

export default BugCard;
