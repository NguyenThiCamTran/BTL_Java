import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './common/Header';
import logo from '../assets/Logo.png'; // Import the image from the assets folder

const AdminLayout = ({ children }) => {
  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
      {/* Sidebar 30% */}
      <div className="col-md-3 d-flex flex-column" style={{ backgroundColor: '#e6ccff', minHeight: '100vh' }}>
        {/* Image above the sidebar title */}
        <div className="text-center">
          <img
            src={logo}  // Use the imported logo
            alt="Sidebar Logo"
            className="img-fluid"
            style={{
              width: '150px',
              height: 'auto',
              marginTop: '20px', // Add top margin for spacing
              borderRadius: '50%', // Make the image round
            }}  
          />
        </div>

        <h4 className="p-3 text-center"></h4>

        {/* Full width Header */}
        <div className="flex-grow-1">
          <Header />
        </div>
      </div>

      {/* Main Content 70% */}
      <div className="col-md-9 bg-white d-flex flex-column" style={{ minHeight: '100vh' }}>
        <div className="p-3 flex-grow-1">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
