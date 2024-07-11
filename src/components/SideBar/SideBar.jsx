import React from 'react';
import './sidebar.scss'; // Certifique-se de que o CSS está no caminho correto

const Sidebar = ({ isActive }) => {
  return (
    <div className={`sidebar ${isActive ? 'active' : ''}`}>
      <div className="sidebar-menu">
        <div className="menu-item">
          <span className="icon">🏠</span>
          <span className="text">Home</span>
        </div>
        <div className="menu-item">
          <span className="icon">🏠</span>
          <span className="text">Compras</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
