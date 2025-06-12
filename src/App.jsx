import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from './pages/home';
import EmisorLoginPage, { EmisorRegisterPage } from './pages/emisor';
import InversionistaLoginPage, { InversionistaRegisterPage } from './pages/inversionista';
import { FormProvider } from './context/FormContext';
import './App.css';

function App() {
  return (
    <FormProvider>
      <Router>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/emisor/login" element={<EmisorLoginPage />} />
          <Route path="/emisor/register" element={<EmisorRegisterPage />} />
          <Route path="/inversionista/login" element={<InversionistaLoginPage />} />
          <Route path="/inversionista/register" element={<InversionistaRegisterPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </FormProvider>
  );
}

export default App;
