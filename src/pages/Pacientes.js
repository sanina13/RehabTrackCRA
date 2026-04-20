import Header from '../components/Header';
import { supabase } from '../services/supabaseClient';
import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import BotaoVoltar from "../components/BotaoVoltar"

function Pacientes() {
  const { user } = useContext(UserContext);
  const [listPacientes, setListPacientes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('fisioterapeuta_id', user.id);

      if (!error) {
        setListPacientes(data);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <Header></Header>
      <BotaoVoltar></BotaoVoltar>
      {listPacientes.map((paciente) => (
        <div key={paciente.id}>
          <p>{paciente.name}</p>
          <Link to={`/fisio/pacientes/${paciente.id}`}>Ver</Link>
        </div>
      ))}
    </div>
  );
}

export default Pacientes;
