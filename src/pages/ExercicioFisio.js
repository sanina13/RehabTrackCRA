import Header from '../components/Header';
import { supabase } from '../services/supabaseClient';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BotaoVoltar from '../components/BotaoVoltar';

function ExercicioFisio() {
  const { id } = useParams();
  const [exercicio, setExercicio] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('plan_exercises')
        .select('* , exercises(*)')
        .eq('id', id)
        .single();
      if (!error) {
        setExercicio(data);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {exercicio && (
        <div>
          <Header></Header>
          <BotaoVoltar></BotaoVoltar>
          <h2>Exercicio: {exercicio.exercises.name}</h2>
          <p>Detalhes do exercício atribuído ao paciente</p>
          <div>
            <p>Repetições: {exercicio.repetitions}x</p>
            <p>Frequência: {exercicio.sets}x/dia</p>
            <p>Duração estimada {exercicio.duration} min</p>
            <button>Editar exercício</button>
            <button>Remover exercício</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ExercicioFisio;
