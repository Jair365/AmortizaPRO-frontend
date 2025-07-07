import React from 'react';
import EmisorToolbar from '../../components/EmisorToolbar';
import EmisorFooter from '../../components/EmisorFooter';
import '../../styles/EmisorDashboard.css';

const EmisorDashboard = () => {
  return (
    <div className="emisor-dashboard">
      <EmisorToolbar userName="Brian Cruz" />
      
      <main className="dashboard-content">
        <div className="dashboard-container">
          <h1>Dashboard del Emisor</h1>
          <p>Bienvenido a tu panel de control. Aquí podrás gestionar tus préstamos e inversiones.</p>
          
          <div className="dashboard-cards">
            <div className="dashboard-card">
              <h3>Préstamos Activos</h3>
              <div className="card-value">12</div>
            </div>
            
            <div className="dashboard-card">
              <h3>Total Prestado</h3>
              <div className="card-value">$250,000</div>
            </div>
            
            <div className="dashboard-card">
              <h3>Ingresos Este Mes</h3>
              <div className="card-value">$15,750</div>
            </div>
            
            <div className="dashboard-card">
              <h3>Clientes Activos</h3>
              <div className="card-value">8</div>
            </div>
          </div>

          {/* Contenido adicional para demostrar el scroll */}
          <div className="additional-content">
            <div className="content-section">
              <h2>Actividad Reciente</h2>
              <div className="activity-list">
                <div className="activity-item">
                  <span className="activity-date">Hoy</span>
                  <span className="activity-description">Nuevo préstamo aprobado por $50,000</span>
                </div>
                <div className="activity-item">
                  <span className="activity-date">Ayer</span>
                  <span className="activity-description">Pago recibido de Cliente #1234</span>
                </div>
                <div className="activity-item">
                  <span className="activity-date">2 días</span>
                  <span className="activity-description">Nuevo cliente registrado</span>
                </div>
                <div className="activity-item">
                  <span className="activity-date">3 días</span>
                  <span className="activity-description">Préstamo completado exitosamente</span>
                </div>
                <div className="activity-item">
                  <span className="activity-date">5 días</span>
                  <span className="activity-description">Nueva solicitud de préstamo recibida</span>
                </div>
              </div>
            </div>

            <div className="content-section">
              <h2>Próximos Vencimientos</h2>
              <div className="upcoming-payments">
                <div className="payment-item">
                  <span className="payment-client">Cliente ABC Corp</span>
                  <span className="payment-amount">$12,500</span>
                  <span className="payment-date">15 Jul 2025</span>
                </div>
                <div className="payment-item">
                  <span className="payment-client">Empresa XYZ</span>
                  <span className="payment-amount">$8,750</span>
                  <span className="payment-date">20 Jul 2025</span>
                </div>
                <div className="payment-item">
                  <span className="payment-client">Comercial DEF</span>
                  <span className="payment-amount">$15,200</span>
                  <span className="payment-date">25 Jul 2025</span>
                </div>
                <div className="payment-item">
                  <span className="payment-client">Industria GHI</span>
                  <span className="payment-amount">$22,800</span>
                  <span className="payment-date">30 Jul 2025</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <EmisorFooter />
    </div>
  );
};

export default EmisorDashboard;
