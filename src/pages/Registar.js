import { useNavigate } from 'react-router-dom';

function Registar() {
  const navigate = useNavigate();
  const handleClickPaciente = () => {
    navigate('/registar/paciente');
  };
  const handleClickFisioterapeuta = () => {
    navigate('/registar/fisioterapeuta');
  };
  return (
    <div>
      <button onClick={handleClickPaciente}>Paciente</button>
      <button onClick={handleClickFisioterapeuta}>Fisioterapeuta</button>
    </div>
  );
}

export default Registar;
