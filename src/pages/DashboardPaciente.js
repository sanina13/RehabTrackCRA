import Header from '../components/Header';
import Card from '../components/Card';
import CardProgress from '../components/CardProgress';
import { supabase } from '../services/supabaseClient';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/AuthContext';

function DashboardPaciente() {
  const { user } = useContext(UserContext);
  const [currentPlan, setCurrentPlan] = useState({});
  const [amountExercises, setAmountExercise] = useState(0);
  const [completedExercises, setCompletedExercises] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('plans')
        .select('*')
        .eq('patient_id', user.id)
        .single();

      if (error) {
        console.log(error);
        return;
      } else {
        setCurrentPlan(data);
        const { data: exercises } = await supabase
          .from('plan_exercises')
          .select('*')
          .eq('plan_id', data.id);
        setAmountExercise(exercises.length);
        setCompletedExercises(
          exercises.filter((ex) => ex.exercises_completed === true).length,
        );
      }
    };

    fetchData();
  }, [user.id]);

  const handleClick = () => {
    navigate('/paciente/plano');
  };

  return (
    <div>
      <Header></Header>
      <p>Aqui está o teu progresso de hoje</p>
      <div className="container mt-4">
        <div className="row g-4">
          <div className="col-md-6">
            <Card
              title={'Plano Atual'}
              name={currentPlan?.name}
              description={amountExercises + ' exercícios'}
              extraInfo={'Início: ' + currentPlan?.start_date}
              buttonText={'Ver Plano ->'}
              onClick={handleClick}
            />
          </div>

          <div className="col-md-6">
            <CardProgress
              totalExercises={amountExercises}
              completedExercises={completedExercises}
              progressPercentage={
                amountExercises > 0
                  ? (completedExercises / amountExercises) * 100
                  : 0
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPaciente;
