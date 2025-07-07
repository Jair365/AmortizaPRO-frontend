import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import EmisorGraphic from '../../components/EmisorGraphic';
import { useFormContext } from '../../context/FormContext';
import '../../styles/EmisorPage.css';

const EmisorLoginPage = () => {
  const navigate = useNavigate();
  const { handleLogin, formErrors, isSubmitting } = useFormContext();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  useEffect(() => {
    // Agregar clase no-scroll al body
    document.body.classList.add('no-scroll');
    
    // Limpiar al desmontar el componente
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const submitForm = (e) => {
    e.preventDefault();
    handleLogin(
      formData,
      'emisor', // Rol esperado
      (userData) => {
        // Success callback
        console.log('Login exitoso:', userData);
        // Redirect to main page after successful login
        setTimeout(() => {
          navigate('/emisor/main');
        }, 1500);
      },
      (error) => {
        console.error('Error de inicio de sesión:', error);
      }
    );
  };

  return (
    <div className="emisor-container">
      <div className="login-section">
        <h1 className="app-title">AmortizaPro</h1>
        <h2 className="login-title">Inicia Sesión</h2>
          <div className="register-link">
          <span>¿No tienes una cuenta?</span>
          <Link to="/emisor/register">Regístrate</Link>
        </div>
        
        <form className="login-form" onSubmit={submitForm}>
            <div className="form-group">
              <label>Correo Electrónico</label>
              <input 
                type="email" 
                className={`form-control ${formErrors.email ? 'error' : ''}`} 
                placeholder="ejemplo@correo.com"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {formErrors.email && <div className="error-message">{formErrors.email}</div>}
            </div>
            
            <div className="form-group">
              <label>Contraseña</label>
              <input 
                type="password" 
                className={`form-control ${formErrors.password ? 'error' : ''}`} 
                placeholder="Tu contraseña"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              {formErrors.password && <div className="error-message">{formErrors.password}</div>}
            </div>
            
            <button 
              type="submit" 
              className="login-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Procesando...' : 'Iniciar sesión'}
            </button>
            
            <div className="back-link">
              <Link to="/">Volver a la página principal</Link>
            </div>
          </form>
      </div>
      
      <div className="emisor-info-section">
        <h2 className="emisor-title">Emisor</h2>
        <div className="emisor-image">
          <EmisorGraphic />
        </div>
      </div>
    </div>
  );
};

export default EmisorLoginPage;
