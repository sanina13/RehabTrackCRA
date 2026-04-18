import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/AuthContext';
import logo from '../assets/log.png';

function Header() {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header
      className="d-flex justify-content-between align-items-center px-4 py-2"
      style={{ backgroundColor: '#1a2332' }}
    >
      <div>
        <img src={logo} alt="logotipo" height="40" />
      </div>
      <div className="d-flex align-items-center gap-3">
        <p className="mb-0 text-light">{user.name}</p>
        <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
          Sair
        </button>
      </div>
    </header>
  );
}

export default Header;
