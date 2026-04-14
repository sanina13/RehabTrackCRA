import { Link } from 'react-router-dom';
import logo from '../assets/log.png';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container d-flex align-items-center">
        <Link to="/" className="navbar-brand">
          <img src={logo} alt="RehabTrack Logo" height="40" />
        </Link>
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <a className="nav-link" href="#funcionalidades">
              Funcionalidades
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#ComoFunciona">
              Como Funciona
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#contactos">
              Contactos
            </a>
          </li>
        </ul>
        <Link to="/registar" className="btn btn-primary">
          Inscrever-se
        </Link>
        <Link to="/login" className="btn btn-outline-primary ms-2">
          Entrar
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
