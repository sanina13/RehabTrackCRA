import { useState } from 'react';
import { supabase } from '../services/supabaseClient';

function ModalFeedback({ planExerciseId, inicio, onClose, repeticoes }) {
  const [dificuldade, setDificuldade] = useState(3);
  const [notas, setNotas] = useState('');

  const handleSubmit = async () => {
    const durationFeed = Math.max(1, Math.round((Date.now() - inicio) / 60000));
    const { error } = await supabase.from('sessions').insert([
      {
        plan_exercise_id: planExerciseId,
        date: new Date().toISOString().split('T')[0],
        repetitions_done: Number(repeticoes),
        difficulty_feedback: dificuldade,
        notes: notas,
        duration: durationFeed,
      },
    ]);
    if (error) {
      return;
    }
    const { error: errorUpdate } = await supabase
      .from('plan_exercises')
      .update({ exercise_completed: true })
      .eq('id', planExerciseId);

    if (errorUpdate) {
      return;
    }

    onClose();
  };

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal-apagar-plano" onClick={(e) => e.stopPropagation()}>
        <h2>Como correu o exercício?</h2>
        <div>
          <input
            type="range"
            min="1"
            max="5"
            value={dificuldade}
            onChange={(e) => setDificuldade(Number(e.target.value))}
          />
          <p>{dificuldade}</p>
        </div>
        <textarea
          placeholder="Deixa um comentário..."
          value={notas}
          onChange={(e) => setNotas(e.target.value)}
        ></textarea>
        <div>
          <button onClick={onClose}>Cancelar</button>
          <button onClick={handleSubmit}>Guardar</button>
        </div>
      </div>
    </div>
  );
}

export default ModalFeedback;
