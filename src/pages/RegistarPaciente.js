import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabaseClient';

function RegistarPaciente() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegisto = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('As passwords têm que ser iguais.');
    } else {
      const { error: RegistrationError } = await supabase.from('users').insert({
        email: email,
        name: nome,
        type: 'paciente',
        password: password,
      });

      if (RegistrationError) {
        setError('Erro no Registo.'); // Verificar para dar handling a outros erros
      } else {
        navigate('/login');
      }
    }
  };

  return (
    <form onSubmit={handleRegisto}>
      <input
        type="text"
        placeholder="Nome completo"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <input
        type="email"
        placeholder="exemplo@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Introduza a sua palavra-passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Repita a palavra-passe"
        value={confirmPassword}
        onChange={(e) => setconfirmPassword(e.target.value)}
      />
      <button type="submit">Registar</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}

export default RegistarPaciente;
