import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from './pages/home';
import EmisorLoginPage from './pages/emisor/EmisorLoginPage';
import EmisorRegisterPage from './pages/emisor/EmisorRegisterPage';
import EmisorMainPage from './pages/emisor/EmisorMainPage';
import DetallesEmisionPage from './pages/emisor/DetallesEmisionPage';
import EmitirBonoPage from './pages/emisor/EmitirBonoPage';
import InversionistaLoginPage from './pages/inversionista/InversionistaLoginPage';
import { FormProvider } from './context/FormContext';
import './App.css';
import InversionistaRegisterPage from './pages/inversionista/InversionistaRegisterPage';

function App() {
  return (
    <FormProvider>
      <Router>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/emisor/login" element={<EmisorLoginPage />} />
          <Route path="/emisor/register" element={<EmisorRegisterPage />} />
          <Route path="/emisor/main" element={<EmisorMainPage />} />
          <Route path="/detalles/:id" element={<DetallesEmisionPage />} />
          <Route path="/emitir-bono" element={<EmitirBonoPage />} />
          <Route path="/inversionista/login" element={<InversionistaLoginPage />} />
          <Route path="/inversionista/register" element={<InversionistaRegisterPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </FormProvider>
  );
}

export default App;
