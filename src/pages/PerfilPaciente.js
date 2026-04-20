import Header from '../components/Header';
import { supabase } from '../services/supabaseClient';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';import BotaoVoltar from "../components/BotaoVoltar"


function PerfilPaciente() {
  const [paciente, setPaciente] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', id)
        .single();
      if (!error) {
        setPaciente(data);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Header></Header>
      <BotaoVoltar></BotaoVoltar>
      {paciente && (
        <div>
          <p>{paciente.name}</p>
          <Link to={`/fisio/plano/${id}`}>Ver Plano</Link>
        </div>
      )}
    </div>
  );
}

export default PerfilPaciente;
