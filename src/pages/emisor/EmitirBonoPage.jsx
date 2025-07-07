import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import EmisorLayout from '../../components/EmisorLayout';
import '../../styles/EmitirBonoPage.css';

const EmitirBonoPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombreEmision: '',
    fechaEmision: new Date().toISOString().split('T')[0],
    capital: '',
    numeroPeriodos: '',
    tipoPeriodo: 'meses',
    tasaInteres: '',
    tipoTasa: 'TEA',
    cok: '12.5', // Valor por defecto o podría ser un campo
  });
  const [recentes, setRecentes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRecentes();
  }, []);

  const fetchRecentes = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/emisiones/mis-emisiones');
      setRecentes((response.data.emisiones || []).slice(0, 3));
    } catch (error) {
      toast.error('No se pudieron cargar los bonos recientes.');
      console.error('Error fetching recent emissions:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...formData,
        capital: parseFloat(formData.capital),
        numeroPeriodos: parseInt(formData.numeroPeriodos, 10),
        tasaInteres: parseFloat(formData.tasaInteres),
        cok: parseFloat(formData.cok),
      };
      await axios.post('http://localhost:3000/api/emisiones', payload);
      toast.success('¡Bono emitido exitosamente!');
      fetchRecentes(); // Actualizar la lista de recientes
      // Limpiar formulario
      setFormData({
        nombreEmision: '',
        fechaEmision: new Date().toISOString().split('T')[0],
        capital: '',
        numeroPeriodos: '',
        tipoPeriodo: 'meses',
        tasaInteres: '',
        tipoTasa: 'TEA',
        cok: '12.5',
      });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error al emitir el bono.');
      console.error('Error creating emission:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  return (
    <EmisorLayout>
      <div className="emitir-bono-page-content">
        <main className="emitir-bono-main-content">
          <div className="form-container">
            <button onClick={() => navigate(-1)} className="btn-regresar">
              &larr; Regresar
            </button>
            <h1 className="page-title">Emisión de bonos</h1>
            <form onSubmit={handleSubmit} className="bono-form">
              <div className="form-grid">
                {/* Nombre de emisión */}
                <div className="form-group">
                  <label htmlFor="nombreEmision">Nombre de emisión</label>
                  <input type="text" id="nombreEmision" name="nombreEmision" value={formData.nombreEmision} onChange={handleChange} required />
                </div>
                {/* Capital */}
                <div className="form-group">
                  <label htmlFor="capital">Capital (C)</label>
                  <div className="input-group">
                    <select className="currency-select">
                      <option>S/.</option>
                    </select>
                    <input type="number" id="capital" name="capital" value={formData.capital} onChange={handleChange} required step="0.01" />
                  </div>
                </div>
                {/* Fecha de emisión */}
                <div className="form-group">
                  <label htmlFor="fechaEmision">Fecha de emisión</label>
                  <input type="date" id="fechaEmision" name="fechaEmision" value={formData.fechaEmision} onChange={handleChange} required />
                </div>
                {/* Número de periodos */}
                <div className="form-group">
                  <label htmlFor="numeroPeriodos">Numero de periodos (n)</label>
                  <div className="input-group">
                    <select name="tipoPeriodo" value={formData.tipoPeriodo} onChange={handleChange} className="period-select">
                      <option value="meses">Meses</option>
                      <option value="años">Años</option>
                    </select>
                    <input type="number" id="numeroPeriodos" name="numeroPeriodos" value={formData.numeroPeriodos} onChange={handleChange} required />
                  </div>
                </div>
                {/* Tasa de Interés */}
                <div className="form-group full-width">
                  <label htmlFor="tasaInteres">Tasa de Interés (i)</label>
                  <div className="input-group">
                    <select name="tipoTasa" value={formData.tipoTasa} onChange={handleChange} className="rate-type-select">
                      <option value="TEM">TEM</option>
                      <option value="TNM">TNM</option>
                      <option value="TEB">TEB</option>
                      <option value="TNB">TNB</option>
                      <option value="TET">TET</option>
                      <option value="TNT">TNT</option>
                      <option value="TES">TES</option>
                      <option value="TNS">TNS</option>
                      <option value="TEA">TEA</option>
                      <option value="TNA">TNA</option>
                    </select>
                    <input type="number" id="tasaInteres" name="tasaInteres" value={formData.tasaInteres} onChange={handleChange} required step="0.01" placeholder="%" />
                  </div>
                </div>
              </div>
              <button type="submit" className="btn-guardar-bono" disabled={loading}>
                {loading ? 'Guardando...' : 'Guardar bono'}
              </button>
            </form>
          </div>

          <div className="recentes-container">
            <h2 className="section-title">Bonos Emitidos recientemente</h2>
            <div className="recentes-table-wrapper">
              <table className="recentes-table">
                <thead>
                  <tr>
                    <th>Nombre de boleta</th>
                    <th>Fecha de emisión</th>
                    <th>Fecha de vencimiento</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {recentes.map(bono => (
                    <tr key={bono.id}>
                      <td>{bono.nombreEmision}</td>
                      <td>{formatDate(bono.fechaEmision)}</td>
                      <td>{formatDate(bono.fechaVencimiento)}</td>
                      <td>
                        <button onClick={() => navigate(`/detalles/${bono.id}`)} className="btn-ver-mas-detalles">
                          Ver mas detalles
                        </button>
                      </td>
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

export default EmitirBonoPage;
