import Header from '../components/Header';
import { useContext } from 'react';
import { UserContext } from '../context/AuthContext';
import { Link } from "react-router-dom";

function DashboardFisio() {
  const { user } = useContext(UserContext);
  return (
    <div>
      <Header></Header>
      <h1>Olá, {user.name}</h1>
      <Link to="/fisio/pacientes">Ver Pacientes</Link>
    </div>
  );
}

export default DashboardFisio;
