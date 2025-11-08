import React from 'react';

const BugList = ({ bugs, onEdit, onDelete }) => {
  if (!bugs.length) return <p style={{ color: '#4e342e' }}>No bugs found!</p>;

  return (
    <div style={{ display: 'grid', gap: '15px' }}>
      {bugs.map(bug => (
        <div key={bug._id} style={{
          backgroundColor: '#fff', 
          padding: '15px', 
          borderRadius: '10px', 
          boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <h4 style={{ margin: 0, color: '#4e342e' }}>{bug.title}</h4>
            <p style={{ margin: '5px 0' }}>{bug.description}</p>
            <small>Status: {bug.status} | Priority: {bug.priority}</small>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={() => onEdit(bug)} style={{
              backgroundColor: '#d7ccc8', color: '#4e342e', padding: '5px 10px', border: 'none', borderRadius: '5px'
            }}>Edit</button>
            <button onClick={() => onDelete(bug._id)} style={{
              backgroundColor: '#4e342e', color: '#fff', padding: '5px 10px', border: 'none', borderRadius: '5px'
            }}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BugList;
