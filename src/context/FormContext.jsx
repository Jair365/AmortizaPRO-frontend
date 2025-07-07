import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

// Create the context
const FormContext = createContext();

// Custom hook to use the form context
export const useFormContext = () => useContext(FormContext);

// Provider component
export const FormProvider = ({ children }) => {
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState(null);

  // Cargar usuario del localStorage al inicializar
  React.useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setUser(JSON.parse(userData));
      // Configurar axios para incluir el token en todas las requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, []);
  
  // Function to validate form data
  const validateForm = (formData) => {
    const errors = {};
    
    // Example validation for email
    if (!formData.email && !formData.correo) {
      errors.email = 'El correo electrónico es requerido';
      errors.correo = 'El correo electrónico es requerido';
    } else if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'El correo electrónico no es válido';
    } else if (formData.correo && !/\S+@\S+\.\S+/.test(formData.correo)) {
      errors.correo = 'El correo electrónico no es válido';
    }
    
    // Example validation for password
    if (!formData.password && !formData.contraseña) {
      errors.password = 'La contraseña es requerida';
      errors.contraseña = 'La contraseña es requerida';
    } else if ((formData.password && formData.password.length < 6) || 
               (formData.contraseña && formData.contraseña.length < 6)) {
      errors.password = 'La contraseña debe tener al menos 6 caracteres';
      errors.contraseña = 'La contraseña debe tener al menos 6 caracteres';
    }
    
    // For registration form - validate name
    if ((formData.name !== undefined || formData.nombre !== undefined) && 
        (!formData.name && !formData.nombre)) {
      errors.name = 'El nombre es requerido';
      errors.nombre = 'El nombre es requerido';
    }
    
    // For registration form - validate password confirmation
    if (formData.confirmPassword !== undefined) {
      if (!formData.confirmPassword) {
        errors.confirmPassword = 'Confirma tu contraseña';
      } else if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = 'Las contraseñas no coinciden';
      }
    }
    
    return errors;
  };
    // Function to handle form submission for login
  const handleLogin = async (formData, expectedRole, successCallback, errorCallback) => {
    setIsSubmitting(true);
    
    // Validate the form
    const errors = validateForm(formData);
    setFormErrors(errors);
    
    if (Object.keys(errors).length === 0) {
      try {
        // Format data for API
        const loginData = {
          correo: formData.email,
          contraseña: formData.password
        };

        // Make API call
        const response = await axios.post('http://localhost:3000/api/auth/login', loginData);
        
        // Verify if user role matches expected role
        if (response.data && response.data.usuario && response.data.usuario.rol) {
          const userRole = response.data.usuario.rol.toLowerCase();
          
          if (userRole !== expectedRole.toLowerCase()) {
            // Role mismatch error
            toast.error(`Acceso denegado. Esta cuenta no es de tipo ${expectedRole}.`);
            
            if (errorCallback) {
              errorCallback({ message: 'Role mismatch' });
            }
            setIsSubmitting(false);
            return;
          }
        }

        // Guardar token y datos del usuario en localStorage
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', JSON.stringify(response.data.usuario));
          setUser(response.data.usuario);
          
          // Configurar axios para incluir el token en futuras requests
          axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        }

        // Show success notification
        toast.success('¡Inicio de sesión exitoso!');
        
        // Execute the callback if provided
        if (successCallback) {
          successCallback(response.data);
        }
      } catch (error) {
        // Show error notification
        toast.error(error.response?.data?.message || 'Error al iniciar sesión');
        
        if (errorCallback) {
          errorCallback(error);
        }
      }
    }
    
    setIsSubmitting(false);
  };

  // Function to handle form submission for registration
  const handleRegister = async (formData, rol, successCallback, errorCallback) => {
    setIsSubmitting(true);
    
    // Validate the form
    const errors = validateForm(formData);
    setFormErrors(errors);
    
    if (Object.keys(errors).length === 0) {
      try {
        // Format data for API
        const registerData = {
          nombre: formData.name,
          correo: formData.email,
          contraseña: formData.password,
          rol: rol
        };

        // Make API call
        const response = await axios.post('http://localhost:3000/api/auth/register', registerData);

        // Show success notification
        toast.success('¡Registro exitoso! Ahora puedes iniciar sesión.');
        
        // Execute the callback if provided
        if (successCallback) {
          successCallback(response.data);
        }
      } catch (error) {
        // Show error notification
        toast.error(error.response?.data?.message || 'Error al registrarse');
        
        if (errorCallback) {
          errorCallback(error);
        }
      }
    }
    
    setIsSubmitting(false);
  };
  
  // Maintain handleSubmit for backward compatibility
  const handleSubmit = async (formData, submitCallback, redirectCallback) => {
    setIsSubmitting(true);
    
    // Validate the form
    const errors = validateForm(formData);
    setFormErrors(errors);
    
    if (Object.keys(errors).length === 0) {
      try {
        // Simulate an API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Execute the callback if provided
        if (submitCallback) {
          await submitCallback(formData);
        }
        
        // Redirect if needed
        if (redirectCallback) {
          redirectCallback();
        }
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    }
    
    setIsSubmitting(false);
  };

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    delete axios.defaults.headers.common['Authorization'];
    toast.success('Sesión cerrada correctamente');
  };
  
  // The context value
  const value = {
    formErrors,
    isSubmitting,
    user,
    validateForm,
    handleSubmit,
    handleLogin,
    handleRegister,
    handleLogout,
    setFormErrors
  };
  
  return (
    <FormContext.Provider value={value}>
      {children}
    </FormContext.Provider>
  );
};

export default FormContext;
