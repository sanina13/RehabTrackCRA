import { useContext } from 'react';
import { UserContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, tipoPermitido }) {
  const { user } = useContext(UserContext);

  if (!user) {
    return <Navigate to="/login" />;
  } else if (user.type !== tipoPermitido) {
    if (user.type === 'fisioterapeuta') {
      return <Navigate to="/fisio/dashboard" />;
    } else if (user.type === 'paciente') {
      return <Navigate to="/paciente/dashboard" />;
    }
  } else {
    return children;
  }
}

export default ProtectedRoute;
