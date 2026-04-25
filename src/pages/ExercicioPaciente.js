import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import BotaoVoltar from "../components/BotaoVoltar"
import Header from '../components/Header';
import { supabase } from '../services/supabaseClient';
import { useNavigate } from 'react-router-dom';

function ExercicioPaciente() {
  const { id } = useParams()
  const navigate = useNavigate()
  const[exercicio, setExercicio] = useState(null)
  const[exercicioTotal, setExercicioTotal] = useState(0)
  const[exercicioIniciado, setExercicioIniciado] = useState(null)
  const[inicio, setInicio] = useState(0)
  const[modalFeedbackAberto, setModalFeedbackAberto] = useState(false)
  const[completedSets, setCompletedSets] = useState(0)

  useEffect(() => {
   
    const fetchData = async () => {
      const {data, error} = await supabase
      .from('plan_exercises')
      .select('*, exercises(*)')
      .eq('id', id)
      .single()
      
      if(data){
        setExercicio(data)
        setCompletedSets(data.completed_sets)

        const { data: exercisesData } = await supabase
        .from('plan_exercises')
        .select('*, exercises(*)')
        .eq('plan_id', data.plan_id);
        
        
        if(exercisesData){
          setExercicioTotal(exercisesData.length)
        }
      }
    }

    fetchData()
  }, [id])

  const handleIniciar = () => {
    setInicio(Date.now()) 
    setExercicioIniciado(true)
  }

  const handleConcluirSerie = async () => {
    const newValue = completedSets + 1

    const {error} = await supabase
    .from('plan_exercises')
    .update({
      completed_sets: newValue
    })
    .eq("id", id)

    if(error){
      return
    }

    setCompletedSets(prev => prev + 1)

    if(newValue >= exercicio?.sets){
      setModalFeedbackAberto(true)
    }else{
      setExercicioIniciado(false)
    }
  }

  const handleFecharModal = () => {
    setModalFeedbackAberto(false)
    navigate("/paciente/plano")
  }

  return (
    <div>
      <Header/>
      <BotaoVoltar/>
      <h1>{exercicio?.exercises?.name}</h1>
      <p>Exercício {exercicio?.position} de {exercicioTotal}</p>
      <h3>Músculo {exercicio?.exercises?.muscle}</h3>
      <p>{exercicio?.sets} séries - {exercicio?.repetitions} repetições</p>
      <p>Instruções</p>
      <p>{exercicio?.exercises?.instructions}</p>
      <p>Progresso da série</p>
      <p>{completedSets} de {exercicio?.sets} séries concluídas</p>
      <div className="d-flex gap-2">
        {Array.from({ length: exercicio?.sets }).map((_, index) => (
          <div
            key={index}
            style={{
              width: '16px',
              height: '16px',
              borderRadius: '50%',
              backgroundColor: index < completedSets ? '#2a9df4' : '#e0e0e0'
            }}
          />
        ))}
      </div>
      {!exercicioIniciado ? (
        <button onClick={handleIniciar}>Iniciar série</button>
        ) : (
        <button onClick={handleConcluirSerie}>Concluir série</button>
      )}
      
    </div>
  );
}

export default ExercicioPaciente;