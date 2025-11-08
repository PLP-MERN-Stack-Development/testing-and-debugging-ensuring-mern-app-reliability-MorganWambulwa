import React from 'react';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div>
      <Navbar /> {/* Only here */}
      <Dashboard />
      <ToastContainer />
    </div>
  );
};

export default App;
