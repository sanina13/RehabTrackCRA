import Header from '../components/Header';
import BotaoVoltar from '../components/BotaoVoltar';
import Card from '../components/Card';
import { supabase } from '../services/supabaseClient';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/AuthContext';

function PlanoPaciente() {
  const { user } = useContext(UserContext);
  const [plan, setPlan] = useState(null);
  const [amountExercise, setAmountExercise] = useState(0);
  const [amountDone, setAmountDone] = useState(0);
  const [exercises, setExercises] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.id) return;
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('plans')
        .select('*')
        .eq('patient_id', user.id)
        .single();

      if (error || !data) {
        return;
      }

      setPlan(data);

      const { data: exercisesData } = await supabase
        .from('plan_exercises')
        .select('*, exercises(*)')
        .eq('plan_id', data.id);

      if (exercisesData) {
        setExercises(exercisesData);
        setAmountExercise(exercisesData.length);
        setAmountDone(
          exercisesData.filter((e) => e.exercise_completed === true).length,
        );
      }
    };
    fetchData();
  }, [user?.id]);

  return (
    <div>
      <Header />
      <BotaoVoltar />
      <h1>Plano de Reabilitação</h1>
      <h5>{plan?.name}</h5>
      <p>Início: {plan?.start_date}</p>
      <p>{amountExercise} exercícios</p>
      <h6>Exercícios da semana</h6>
      <h6>
        {amountDone} de {amountExercise} concluídos
      </h6>
      {exercises.map((item) => (
        <div key={item.id} className="col-md-6">
          <Card
            title={item.exercises.name}
            name={item.exercises.muscle}
            description={
              item.sets + ' séries - ' + item.repetitions + ' repetições'
            }
            buttonText={'Começar ->'}
            onClick={() => navigate(`/paciente/exercicio/${item.id}`)}
          />
        </div>
      ))}
    </div>
  );
}

export default PlanoPaciente;
