import React from 'react';
import './header.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons'; // Importe o ícone de barras

const Header = ({ onMenuClick }) => {
  return (
    <header className="header">
      <button onClick={onMenuClick} className="menu-button">
        <FontAwesomeIcon icon={faBars} />
      </button>
      <a href="https://www.google.com">
        <img src="https://www.meucrediario.com.br/wp-content/uploads/2023/04/logo-full-default-1920w-1024x255.webp" alt="Logo" />
      </a>
    </header>
  );
};

export default Header;
