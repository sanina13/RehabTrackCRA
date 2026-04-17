import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/AuthContext'
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
          <Route path="/fisio/dashboard" element={<DashboardFisio />} />
          <Route path="/fisio/pacientes" element={<Pacientes />} />
          <Route path="/fisio/pacientes/:id" element={<PerfilPaciente />} />
          <Route path="/fisio/plano/:id" element={<Plano />} />
          <Route path="/fisio/biblioteca" element={<Biblioteca />} />
          <Route path="/paciente/dashboard" element={<DashboardPaciente />} />
          <Route path="/paciente/plano" element={<PlanoPaciente />} />
          <Route
            path="/paciente/exercicio/:id"
            element={<ExercicioPaciente />}
          />
          <Route path="/paciente/historico" element={<HistoricoSessoes />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
