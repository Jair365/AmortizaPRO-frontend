import React from 'react';
import graficoImage from '../assets/grafico.png';

const EmisorGraphic = () => {
  return (
    <div className="emisor-graphic-container">
      <img 
        src={graficoImage} 
        alt="Gráfico Emisor" 
        className="emisor-graphic-image" 
        style={{ 
          maxWidth: '100%',
          height: 'auto',
          objectFit: 'contain'
        }}
      />
    </div>
  );
};

export default EmisorGraphic;
