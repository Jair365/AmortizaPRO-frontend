import React from 'react';
import EmisorToolbar from './EmisorToolbar';
import EmisorFooter from './EmisorFooter';
import '../styles/EmisorLayout.css';

const EmisorLayout = ({ children }) => {
  return (
    <div className="emisor-layout">
      <EmisorToolbar />
      <main className="emisor-layout-content">
        {children}
      </main>
      <EmisorFooter />
    </div>
  );
};

export default EmisorLayout;
