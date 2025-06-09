import React, { createContext, useState, useContext } from 'react';

// Create the context
const FormContext = createContext();

// Custom hook to use the form context
export const useFormContext = () => useContext(FormContext);

// Provider component
export const FormProvider = ({ children }) => {
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Function to validate form data
  const validateForm = (formData) => {
    const errors = {};
    
    // Example validation for email
    if (!formData.email) {
      errors.email = 'El correo electrónico es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'El correo electrónico no es válido';
    }
    
    // Example validation for password
    if (!formData.password) {
      errors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      errors.password = 'La contraseña debe tener al menos 6 caracteres';
    }
    
    // For registration form - validate name
    if (formData.name !== undefined && !formData.name) {
      errors.name = 'El nombre es requerido';
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
  
  // Function to handle form submission
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
  
  // The context value
  const value = {
    formErrors,
    isSubmitting,
    validateForm,
    handleSubmit,
    setFormErrors
  };
  
  return (
    <FormContext.Provider value={value}>
      {children}
    </FormContext.Provider>
  );
};

export default FormContext;
