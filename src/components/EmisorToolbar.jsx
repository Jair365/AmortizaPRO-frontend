import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormContext } from '../context/FormContext';
import '../styles/EmisorToolbar.css';

const EmisorToolbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { user, handleLogout } = useFormContext();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const onLogout = () => {
    handleLogout();
    navigate('/');
  };

  const handleEditProfile = () => {
    console.log('Editar perfil');
  };

  // Obtener el nombre del usuario desde el contexto
  const userName = user?.nombre || "Usuario";

  return (
    <div className="emisor-toolbar">
      <div className="toolbar-left">
        <h1 className="app-title">AmortizaPro - Emisor</h1>
      </div>
      
      <div className="toolbar-right">
        <div className="user-section">
          <span className="welcome-text">Bienvenido, {userName}</span>
          <button className="user-button" onClick={toggleDropdown}>
            <div className="user-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            </div>
          </button>
          
          {isDropdownOpen && (
            <div className="dropdown-menu">
              <button className="dropdown-item" onClick={handleEditProfile}>
                Editar perfil
              </button>
              <button className="dropdown-item logout" onClick={onLogout}>
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmisorToolbar;
