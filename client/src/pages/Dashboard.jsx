import React, { useState, useEffect } from 'react';
import BugForm from '../components/BugForm';
import BugList from '../components/BugList';
import { fetchBugs, addBug, updateBug, deleteBug } from '../api/bugApi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () => {
  const [bugs, setBugs] = useState([]);
  const [editingBug, setEditingBug] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load all bugs from backend
  const loadBugs = async () => {
    try {
      setLoading(true);
      const data = await fetchBugs();
      setBugs(data);
    } catch (err) {
      console.error(err.response ? err.response.data : err);
      toast.error('Unable to load bugs from server');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBugs();
  }, []);

  // Add or update bug
  const handleAddBug = async (bug) => {
    try {
      if (editingBug) {
        const updated = await updateBug(editingBug._id, bug);
        setBugs(bugs.map(b => (b._id === updated._id ? updated : b)));
        setEditingBug(null);
        toast.success('Bug updated successfully');
      } else {
        const newBug = await addBug(bug);
        setBugs([newBug, ...bugs]);
        toast.success('Bug added successfully');
      }
    } catch (err) {
      console.error(err.response ? err.response.data : err);
      toast.error('Error saving bug');
    }
  };

  // Delete bug
  const handleDeleteBug = async (id) => {
    try {
      await deleteBug(id);
      setBugs(bugs.filter(b => b._id !== id));
      toast.success('Bug deleted successfully');
    } catch (err) {
      console.error(err.response ? err.response.data : err);
      toast.error('Error deleting bug');
    }
  };

  return (
    <div className="container mt-4">
      <BugForm 
        onSubmit={handleAddBug} 
        editingBug={editingBug} 
        cancelEdit={() => setEditingBug(null)} 
      />

      {loading ? (
        <p className="text-center mt-4" style={{ color: '#4e342e' }}>Loading bugs...</p>
      ) : bugs.length === 0 ? (
        <p className="text-center mt-4" style={{ color: '#4e342e' }}>No bugs found!</p>
      ) : (
        <BugList bugs={bugs} onEdit={setEditingBug} onDelete={handleDeleteBug} />
      )}
    </div>
  );
};

export default Dashboard;
