import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import EmisorLayout from '../../components/EmisorLayout';
import '../../styles/EmisorMainPage.css';

const EmisorMainPage = () => {
  const [emisiones, setEmisiones] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmisiones();
  }, []);

  const fetchEmisiones = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3000/api/emisiones/mis-emisiones');
      setEmisiones(response.data.emisiones || []);
    } catch (error) {
      toast.error('Error al cargar las emisiones');
      console.error('Error fetching emisiones:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const handleVerDetalles = (emisionId) => {
    console.log('Ver detalles de emisión:', emisionId);
    navigate(`/detalles/${emisionId}`);
  };

  const handleEmitirNuevoBono = () => {
    navigate('/emitir-bono');
  };

  const BonoCard = ({ bono }) => (
    <div className="bono-card">
      <div className="bono-info">
        <h3 className="bono-name">{bono.nombreEmision}</h3>
        <div className="bono-dates">
          <span className="date-item">
            <strong>Emisión:</strong> {formatDate(bono.fechaEmision)}
          </span>
          <span className="date-item">
            <strong>Vencimiento:</strong> {formatDate(bono.fechaVencimiento)}
          </span>
        </div>
      </div>
      <div className="bono-actions">
        <button onClick={() => handleVerDetalles(bono.id)} className="btn-ver-detalles">
          Ver Detalles
        </button>
      </div>
    </div>
  );

  return (
    <EmisorLayout>
      <div className="emisor-main-page">
        <div className="content-container">
          <div className="page-header">
            <h1>Bonos Emitidos</h1>
            <button 
              className="btn-emitir-bono"
              onClick={handleEmitirNuevoBono}
            >
              Emitir nuevo bono +
            </button>
          </div>

          <div className="bonos-section">
            {loading ? (
              <div className="loading-message">
                Cargando emisiones...
              </div>
            ) : emisiones.length === 0 ? (
              <div className="empty-message">
                No tienes bonos emitidos aún.
              </div>
            ) : (
              <div className="bonos-list">
                {emisiones.map((emision) => (
                  <BonoCard key={emision.id} bono={emision} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </EmisorLayout>
  );
};

export default EmisorMainPage;
