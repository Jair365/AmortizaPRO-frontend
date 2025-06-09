import React from 'react';
import graficoImage from '../assets/grafico.png';

const InversionistaGraphic = () => {
  return (
    <div className="inversionista-graphic-container">
      <img 
        src={graficoImage} 
        alt="Gráfico Inversionista" 
        className="inversionista-graphic-image" 
        style={{ 
          maxWidth: '100%',
          height: 'auto',
          objectFit: 'contain',
          filter: 'hue-rotate(210deg)' // Aplicamos un filtro para darle un tono azul
        }}
      />
    </div>
  );
};

export default InversionistaGraphic;
