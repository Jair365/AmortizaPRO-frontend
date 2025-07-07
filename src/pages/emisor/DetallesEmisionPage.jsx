import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import EmisorLayout from '../../components/EmisorLayout';
import '../../styles/DetallesEmisionPage.css';

const DetallesEmisionPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [emision, setEmision] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEmisionDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3000/api/emisiones/${id}`);
        setEmision(response.data.emision);
        setError('');
      } catch (err) {
        setError('No se pudieron cargar los detalles de la emisión.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEmisionDetails();
  }, [id]);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  const formatNumber = (num) => {
    if (num === null || num === undefined) return 'N/A';
    return parseFloat(num).toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };
  
  const formatPercentage = (num) => {
    if (num === null || num === undefined) return 'N/A';
    return `${parseFloat(num).toFixed(6)}%`;
  };


  if (loading) {
    return <div className="details-container"><p className="loading-message">Cargando detalles...</p></div>;
  }

  if (error) {
    return <div className="details-container"><p className="error-message">{error}</p></div>;
  }

  if (!emision) {
    return null;
  }

  return (
    <EmisorLayout>
      <div className="details-page-content">
        <main className="details-main-content">
          <div className="details-container">
            <button onClick={() => navigate(-1)} className="btn-regresar">
              &larr; Regresar
            </button>
            
            <h1 className="details-title">Detalles - {emision.nombreEmision}</h1>

            <div className="details-grid">
              <div className="detail-item">
                <label>Fecha de emisión</label>
                <input type="text" value={formatDate(emision.fechaEmision)} readOnly />
              </div>
              <div className="detail-item">
                <label>Capital (C)</label>
                <input type="text" value={formatNumber(emision.capital)} readOnly />
              </div>
              <div className="detail-item">
                <label>Fecha de vencimiento</label>
                <input type="text" value={formatDate(emision.fechaVencimiento)} readOnly />
              </div>
              <div className="detail-item">
                <label>Numero de periodos (n)</label>
                <div className="input-group">
                  <input type="text" value={emision.numeroPeriodos} readOnly />
                  <span>{emision.tipoPeriodo}</span>
                </div>
              </div>
              <div className="detail-item">
                <label>Tasa de interés ofrecida</label>
                <div className="input-group">
                  <input type="text" value={`${parseFloat(emision.tasaInteres).toFixed(2)}%`} readOnly />
                  <span>{emision.tipoTasa}</span>
                </div>
              </div>
              <div className="detail-item">
                <label>Tasa de interés a usar</label>
                <div className="input-group">
                  <input type="text" value={formatPercentage(emision.tasaEnTEM * 100)} readOnly />
                  <span>TEM</span>
                </div>
              </div>
            </div>

            <div className="table-container">
              <table className="amortization-table">
                <thead>
                  <tr>
                    <th>N°</th>
                    <th>{emision.tipoTasa.toUpperCase()}</th>
                    <th>I = TEP</th>
                    <th>P.G.</th>
                    <th>Saldo Inicial</th>
                    <th>Interes</th>
                    <th>Amort.</th>
                    <th>Cuota</th>
                    <th>Saldo Final</th>
                    <th>Flujo inversionista</th>
                    <th>Flujo emisor</th>
                  </tr>
                </thead>
                <tbody>
                  {emision.boletas && emision.boletas.map((boleta) => (
                    <tr key={boleta.id}>
                      <td>{boleta.numeroPeriodo}</td>
                      {/* Usar siempre boleta.tea para el valor, pero el título de la columna es dinámico */}
                      <td>{boleta.tea ? `${parseFloat(boleta.tea).toFixed(6)}%` : '-'}</td>
                      <td>{boleta.tep ? `${parseFloat(boleta.tep).toFixed(6)}%` : '-'}</td>
                      <td>{boleta.pg || '-'}</td>
                      <td>{boleta.saldoInicial ? formatNumber(boleta.saldoInicial) : '-'}</td>
                      <td>{boleta.interes ? formatNumber(boleta.interes) : '-'}</td>
                      <td>{boleta.amortizacion ? formatNumber(boleta.amortizacion) : '-'}</td>
                      <td>{boleta.cuota ? formatNumber(boleta.cuota) : '-'}</td>
                      <td>{boleta.saldoFinal ? formatNumber(boleta.saldoFinal) : '-'}</td>
                      <td className="flujo-inversionista">{formatNumber(boleta.flujoInversionista)}</td>
                      <td className="flujo-emisor">{formatNumber(boleta.flujoEmisor)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </EmisorLayout>
  );
};

export default DetallesEmisionPage;
