import React from 'react';
import '../../styles/InversionistaPage.css';

const InversionistaPage = () => {
  return (
    <div className="inversionista-container">
      <h1>Página de Inversionista</h1>
      <p>Esta página está en construcción.</p>
      <button className="back-button" onClick={() => window.history.back()}>
        Volver
      </button>
    </div>
  );
};

export default InversionistaPage;
