import React, { useState } from 'react';
import Header from './components/header/Header';
import Sidebar from './components/SideBar/SideBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'; // Arquivo CSS para estilos personalizados

import Home from './pages/HomePage';
import Settings from './pages/Settings';
import Contracts from './pages/ContractPage';

const App = () => {
  const [isSidebarActive, setIsSidebarActive] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarActive(!isSidebarActive);
  };

  return (
    <Router>
      <div className={`app ${isSidebarActive ? 'sidebar-active' : ''}`}>
        <Header onMenuClick={toggleSidebar} />
        <div className="content-container">
          <Sidebar isActive={isSidebarActive} />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/contracts" element={<Contracts />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
