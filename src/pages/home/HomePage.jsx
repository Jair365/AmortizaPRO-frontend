import React from 'react';
import { useNavigate } from 'react-router-dom';
import heroImage from '../../assets/hero-image.png';
import '../../styles/HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();
  const handleEmisorClick = () => {
    navigate('/emisor/login');
  };

  const handleInversionistaClick = () => {
    navigate('/inversionista/login');
  };

  return (
    <div className="home-container">
      {/* Imagen de fondo */}
      <div className="bg-container">
        <img 
          src={heroImage} 
          alt="Background" 
          className="bg-image"
        />
      </div>

      {/* Contenedor de contenido */}
      <div className="content-container">
        <div className="title-container">
          <h1 className="welcome-text">
            <div className="welcome-part1">Bienvenido a</div>
            <div className="welcome-part2">AmortizaPro</div>
          </h1>
            <p className="select-role-text">
            Selecciona tu rol para continuar
          </p>
            <div className="buttons-container">
            <button 
              className="role-button emisor-button"
              onClick={handleEmisorClick}
            >
              Emisor
            </button>
            <button 
              className="role-button inversionista-button"
              onClick={handleInversionistaClick}
            >
              Inversionista
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
