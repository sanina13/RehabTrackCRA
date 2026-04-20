import Header from '../components/Header';
import ModalExercicio from '../components/ModalExercicio';
import ModalApagarPlano from '../components/ModalApagarPlano'
import { supabase } from '../services/supabaseClient';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Plano() {
  const { id } = useParams();
  const [plano, setPlano] = useState(null);
  const [paciente, setPaciente] = useState(null);
  const [planExercicios, setPlanoExercicios] = useState([]);

  // modal adicionarExercicio
  const [modalOpen, setModalOpen] = useState(false);

  //modal ApagarExercicio
  const [modalApagarOpen, setModalApagarOpen] = useState(false);

  const fetchExercicios = async (planId) => {
    const { data, error } = await supabase
      .from('plan_exercises')
      .select(`*, exercises(*)`)
      .eq('plan_id', planId);
    if (!error) {
      setPlanoExercicios(data);
    }
  };

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
        fetchExercicios(data.id);
      }
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
          <button onClick={() => setModalOpen(true)}>Novo Exercicio</button>
          <button onClick={() => setModalApagarOpen(true)}>Apagar Plano</button>

          {planExercicios.map((item) => (
            <div key={item.id}>
              <p>{item.exercises.name}</p>
            </div>
          ))}
        </div>
      )}
      {modalOpen && (
        <ModalExercicio
          planId={plano.id}
          onClose={() => setModalOpen(false)}
          onExercicioAdicionado={() => fetchExercicios(plano.id)}
        />
      )}
      { modalApagarOpen &&  (
        <ModalApagarPlano
          planoId={plano.id}
          onClose={() => setModalApagarOpen(false)}
        />
      )}
    </div>
  );
}

export default Plano;
