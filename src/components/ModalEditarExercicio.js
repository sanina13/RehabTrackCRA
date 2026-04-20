import { supabase } from '../services/supabaseClient';
import { useState } from 'react';

function ModalEditarExercicio({
  planoExerciseId,
  repeticoesAtual,
  setsAtual,
  duracaoAtual,
  instrucaoAtual,
  onClose,
  onEditado,
}) {
  const [repeticoes, setRepeticoes] = useState(repeticoesAtual);
  const [sets, setSets] = useState(setsAtual);
  const [duracao, setDuracao] = useState(duracaoAtual);
  const [instrucao, setInstrucao] = useState(instrucaoAtual);

  const handleEdit = async () => {
    const { data, error } = await supabase
      .from('plan_exercises')
      .update({
        repetitions: repeticoes,
        sets,
        duration: duracao,
        instruction: instrucao,
      })
      .eq('id', planoExerciseId);
    if (!error) {
      onEditado();
      onClose();
    }
  };

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal-exercicio" onClick={(e) => e.stopPropagation()}>
        <h2>Editar exercício</h2>
        <p>Repetições</p>
        <input
          type="text"
          value={repeticoes}
          onChange={(e) => setRepeticoes(e.target.value)}
        />
        <p>Frequência</p>
        <input
          type="text"
          value={sets}
          onChange={(e) => setSets(e.target.value)}
        />
        <p>Duração</p>
        <input
          type="text"
          value={duracao}
          onChange={(e) => setDuracao(e.target.value)}
        />
        <p>Instruções</p>
        <textarea
          value={instrucao}
          onChange={(e) => setInstrucao(e.target.value)}
        />
        <button onClick={onClose}>Cancelar</button>
        <button onClick={handleEdit}>Guardar alterações</button>
      </div>
    </div>
  );
}

export default ModalEditarExercicio;
