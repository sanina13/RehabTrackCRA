import { supabase } from '../services/supabaseClient';
import { useNavigate, useParams } from 'react-router-dom';

function ModalApagarPlano({ planoId, onClose }) {
  const { id } = useParams();
  const navigate = useNavigate();

  // Apagar Plano
  const handleApagarPlano = async () => {
    const { data, error } = await supabase
      .from('plans')
      .delete()
      .eq('id', planoId);

    if (!error) {
      navigate(`/fisio/pacientes/${id}`);
    }
  };

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal-apagar-plano" onClick={(e) => e.stopPropagation()}>
        <div>
          <h2>Tens a certeza que queres apagar este plano?</h2>
        </div>
        <div>
          <button onClick={onClose}>Cancelar</button>
          <button onClick={handleApagarPlano}>Apagar</button>
        </div>
      </div>
    </div>
  );
}

export default ModalApagarPlano;
