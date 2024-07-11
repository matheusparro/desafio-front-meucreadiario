import React from 'react';
import { useNavigate } from 'react-router-dom';
import './sidebar.scss'; // Certifique-se de que o CSS está no caminho correto

const Sidebar = ({ isActive }) => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className={`sidebar ${isActive ? 'active' : ''}`}>
      <div className="sidebar-menu">
        <div className="menu-item" onClick={() => handleNavigation('/')}>
          <span className="icon">🏠</span>
          <span className="text">Home</span>
        </div>
        <div className="menu-item" onClick={() => handleNavigation('/contracts')}>
          <span className="icon">📄</span>
          <span className="text">Contratos</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
