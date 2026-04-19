import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Registar from './pages/Registar';
import RegistarFisioterapeuta from './pages/RegistarFisioterapeuta';
import RegistarPaciente from './pages/RegistarPaciente';
import DashboardPaciente from './pages/DashboardPaciente';
import DashboardFisio from './pages/DashboardFisio';
import Biblioteca from './pages/Biblioteca';
import ExercicioPaciente from './pages/ExercicioPaciente';
import HistoricoSessoes from './pages/HistoricoSessoes';
import Pacientes from './pages/Pacientes';
import Plano from './pages/Plano';
import PlanoPaciente from './pages/PlanoPaciente';
import PerfilPaciente from './pages/PerfilPaciente';
import './App.css'

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registar" element={<Registar />} />
          <Route path="/registar/paciente" element={<RegistarPaciente />} />
          <Route
            path="/registar/fisioterapeuta"
            element={<RegistarFisioterapeuta />}
          />

          <Route
            path="/fisio/dashboard"
            element={
              <ProtectedRoute tipoPermitido="fisioterapeuta">
                <DashboardFisio />
              </ProtectedRoute>
            }
          />
          <Route
            path="/fisio/pacientes"
            element={
              <ProtectedRoute tipoPermitido="fisioterapeuta">
                <Pacientes />
              </ProtectedRoute>
            }
          />
          <Route
            path="/fisio/pacientes/:id"
            element={
              <ProtectedRoute tipoPermitido="fisioterapeuta">
                <PerfilPaciente />
              </ProtectedRoute>
            }
          />
          <Route
            path="/fisio/plano/:id"
            element={
              <ProtectedRoute tipoPermitido="fisioterapeuta">
                <Plano />
              </ProtectedRoute>
            }
          />
          <Route
            path="/fisio/biblioteca"
            element={
              <ProtectedRoute tipoPermitido="fisioterapeuta">
                <Biblioteca />
              </ProtectedRoute>
            }
          />

          <Route
            path="/paciente/dashboard"
            element={
              <ProtectedRoute tipoPermitido="paciente">
                <DashboardPaciente />
              </ProtectedRoute>
            }
          />
          <Route
            path="/paciente/plano"
            element={
              <ProtectedRoute tipoPermitido="paciente">
                <PlanoPaciente />
              </ProtectedRoute>
            }
          />
          <Route
            path="/paciente/exercicio/:id"
            element={
              <ProtectedRoute tipoPermitido="paciente">
                <ExercicioPaciente />
              </ProtectedRoute>
            }
          />
          <Route
            path="/paciente/historico"
            element={
              <ProtectedRoute tipoPermitido="paciente">
                <HistoricoSessoes />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
