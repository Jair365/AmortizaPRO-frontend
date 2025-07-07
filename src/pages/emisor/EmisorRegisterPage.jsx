import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import EmisorGraphic from '../../components/EmisorGraphic';
import { useFormContext } from '../../context/FormContext';
import '../../styles/EmisorPage.css';
import '../../styles/EmisorRegisterPage.css';

const EmisorRegisterPage = () => {
  const navigate = useNavigate();
  const { handleRegister, formErrors, isSubmitting } = useFormContext();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Manejar scroll de la página
  useEffect(() => {
    document.documentElement.classList.add('no-scroll');
    return () => {
      document.documentElement.classList.remove('no-scroll');
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
    // Pass 'emisor' as the role
    handleRegister(
      formData,
      'emisor',
      () => {
        // Success callback
        setTimeout(() => {
          navigate('/emisor/login');
        }, 1500);
      },
      (error) => {
        console.error('Error de registro:', error);
      }
    );
  };
  
  return (
    <div className="emisor-container register-container">
      <div className="login-section">
        <h1 className="app-title">AmortizaPro</h1>
        <h2 className="register-title">Regístrate</h2>
        
        <div className="login-link">
          <span>¿Ya tienes una cuenta?</span>
          <Link to="/emisor/login">Inicia Sesión</Link>
        </div>
          <form className="register-form" onSubmit={submitForm}>
            <div className="form-group">
              <label>Nombre Completo</label>
              <input 
                type="text" 
                className={`form-control ${formErrors.name ? 'error' : ''}`} 
                placeholder="Tu nombre completo" 
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              {formErrors.name && <div className="error-message">{formErrors.name}</div>}
            </div>
            
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
                placeholder="Contraseña segura" 
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              {formErrors.password && <div className="error-message">{formErrors.password}</div>}
            </div>
            
            <div className="form-group">
              <label>Confirma tu Contraseña</label>
              <input 
                type="password" 
                className={`form-control ${formErrors.confirmPassword ? 'error' : ''}`} 
                placeholder="Repite tu contraseña" 
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {formErrors.confirmPassword && <div className="error-message">{formErrors.confirmPassword}</div>}
            </div>
            
            <button 
              type="submit" 
              className="register-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Procesando...' : 'Crear tu cuenta'}
            </button>
            
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

export default EmisorRegisterPage;
