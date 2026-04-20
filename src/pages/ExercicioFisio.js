import Header from '../components/Header';
import { supabase } from '../services/supabaseClient';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BotaoVoltar from '../components/BotaoVoltar';
import ModalEditarExercicio from '../components/ModalEditarExercicio';
import ModalRemoverExercicio from '../components/ModalRemoverExercicio';

function ExercicioFisio() {
  const { id } = useParams();
  const [exercicio, setExercicio] = useState(null);
  const [modalEditarAberto, setModalEditarAberto] = useState(false);
  const [modalRemoverAberto, setModalRemoverAberto] = useState(false);

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

  useEffect(() => {
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
            <button onClick={() => setModalEditarAberto(true)}>
              Editar exercício
            </button>
            <button onClick={() => setModalRemoverAberto(true)}>
              Remover exercício
            </button>
          </div>
        </div>
      )}
      {modalEditarAberto && (
        <ModalEditarExercicio
          planExerciseId={id}
          repeticoesAtual={exercicio.repetitions}
          setsAtual={exercicio.sets}
          duracaoAtual={exercicio.duration}
          instrucaoAtual={exercicio.instruction}
          onClose={() => setModalEditarAberto(false)}
          onEditado={() => {
            fetchData();
          }}
        />
      )}
      {modalRemoverAberto && (
        <ModalRemoverExercicio
          planExerciseId={id}
          onClose={() => setModalRemoverAberto(false)}
        />
      )}
    </div>
  );
}

export default ExercicioFisio;
