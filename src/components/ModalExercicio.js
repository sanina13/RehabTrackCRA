import { useState, useEffect } from 'react';
import { supabase } from '../services/supabaseClient';

function ModalExercicio({ planId, onClose, onExercicioAdicionado }) {
  const [option, setOption] = useState('');
  const [exercicios, setExercicios] = useState([]);
  const [repeticoes, setRepeticoes] = useState('');
  const [frequencia, setFrequencia] = useState('');
  const [duracao, setDuracao] = useState('');
  const [erro, setErro] = useState('');
  const [instrucao, setInstrucao] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from('exercises').select('*');
      if (!error) {
        setExercicios(data);
      }
    };
    fetchData();
  }, []);

  const handleAdicionar = async () => {
    const { data } = await supabase
      .from('plan_exercises')
      .select('*')
      .eq('plan_id', planId)
      .eq('exercise_id', option);
    if (data.length <= 0) {
      const { data, error } = await supabase.from('plan_exercises').insert([
        {
          plan_id: planId,
          exercise_id: option,
          sets: frequencia,
          repetitions: repeticoes,
          duration: duracao,
          instruction: instrucao,
        },
      ]);
      if (!error) {
        onExercicioAdicionado();
        onClose();
      }
    } else {
      setErro('Este exercício já está no plano');
      setOption('');
      setRepeticoes('');
      setFrequencia('');
      setDuracao('');
      setInstrucao('');
    }
  };

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal-exercicio" onClick={(e) => e.stopPropagation()}>
        <h2>Adicionar Exercicio</h2>
        <div>
          <p>Exercicio</p>
          <select value={option} onChange={(e) => {setOption(e.target.value); setErro('')}}>
            <option value="">Seleciona um exercicio</option>
            {exercicios.map((ex) => (
              <option key={ex.id} value={ex.id}>
                {ex.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <p>Repetições</p>
          <input
            type="text"
            placeholder="10"
            value={repeticoes}
            onChange={(e) => setRepeticoes(e.target.value)}
          />
        </div>
        <div>
          <p>Frequência</p>
          <input
            type="text"
            placeholder="2x/dia"
            value={frequencia}
            onChange={(e) => setFrequencia(e.target.value)}
          />
        </div>
        <div>
          <p>Duração estimada</p>
          <input
            type="text"
            placeholder="2 min"
            value={duracao}
            onChange={(e) => setDuracao(e.target.value)}
          />
        </div>
        <div>
          <p>Instruções</p>
          <textarea
            placeholder="Escreve aqui..."
            value={instrucao}
            onChange={(e) => setInstrucao(e.target.value)}
          ></textarea>
        </div>
        <div>
          {erro && <p style={{color: 'red'}}>{erro}</p>}
          <button onClick={onClose}>Cancelar</button>
          <button onClick={handleAdicionar}>Adicionar exercício</button>
        </div>
      </div>
    </div>
  );
}

export default ModalExercicio;
