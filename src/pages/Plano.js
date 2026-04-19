import Header from '../components/Header';
import { supabase } from '../services/supabaseClient';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function Plano() {
  const { id } = useParams();
  const [plano, setPlano] = useState(null);
  const [paciente, setPaciente] = useState(null);
  const [planExercicios, setPlanoExercicios] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: dataPatient, error: errorPat } = await supabase
        .from('users')
        .select('*')
        .eq('id', id)
        .single();
      if (!errorPat) {
        setPaciente(dataPatient);
      }
      // get in plans
      const { data, error } = await supabase
        .from('plans')
        .select('*')
        .eq('patient_id', id)
        .single();
      if (!error) {
        setPlano(data);
      }
      // get in plans exercises
      if (data) {
        const { data: dataPlanExercises, error: errorPlanEx } = await supabase
          .from('plan_exercises')
          .select(`*, exercises(*)`)
          .eq('plan_id', data.id);

        if (!errorPlanEx) {
          setPlanoExercicios(dataPlanExercises);
        }
      }
      console.log('Paciente:', dataPatient, errorPat);
      console.log('Plano:', data, error);
    };

    fetchData();
  }, []);

  return (
    <div>
      <Header></Header>
      {paciente && plano && (
        <div>
          <h1>Plano do paciente {paciente.name}</h1>
          <p>Exercícios atribuídos ao paciente</p>
          <Link to={`/`}>Novo Exercicio</Link>
          <Link to={`/`}>Apagar Plano</Link>
          {planExercicios.map((item) => (
            <div key={item.id}>
              <p>{item.exercises.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Plano;
