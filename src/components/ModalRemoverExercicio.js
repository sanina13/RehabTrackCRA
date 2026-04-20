import { useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabaseClient';

function ModalRemoverExercicio({ planExerciseId, onClose }) {
  const navigate = useNavigate();

  const handleDelete = async () => {
    const { data, error } = await supabase.from('plan_exercises')
      .delete()
      .eq('id', planExerciseId);;
    if(!error){
      navigate(-1, {replace: true})
    }
  };
  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal-exercicio" onClick={(e) => e.stopPropagation()}>
        <h2>Remover exercício</h2>
        <p>
          Tem a certeza que deseja remover este exercício do plano do paciente?
        </p>
        <p>Esta ação não pode ser desfeita</p>
        <button onClick={onClose}>Cancelar</button>
        <button onClick={handleDelete}>Remover</button>
      </div>
    </div>
  );
}

export default ModalRemoverExercicio;
