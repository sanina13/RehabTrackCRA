import Header from '../components/Header';
import Card from '../components/Card';
import { supabase } from '../services/supabaseClient';
import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { UserContext } from '../context/AuthContext';
import { Link } from "react-router-dom";

function DashboardPaciente() {
  const { user } = useContext(UserContext);
  const [currentPlan, setCurrentPlan] = useState({});
  const [amountExercises, setAmountExercise] = useState('');

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
      }

      setCurrentPlan(data);
    };

    fetchData();
  }, [user.id]);

  return (
    <div>
      <Header></Header>
      <p>Aqui está o teu progresso de hoje</p>
      <div>
        <h2>Plano Atual</h2>
        <Card
          title={currentPlan?.Name}
          description={currentPlan?.Name}
          extraInfo={'Início: ' + currentPlan?.start_date}
        />
      </div>
    </div>
  );
}

export default DashboardPaciente;
