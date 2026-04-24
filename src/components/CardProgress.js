function CardProgress({
  totalExercises,
  completedExercises,
  progressPercentage,
}) {
  return (
    <div className="card shadow rounded p-4 text-center">
      <div className="card-body">
        <h2>Progresso</h2>
        <div
          className="progress-circle"
          style={{
            background: `conic-gradient(
              #0d6efd ${progressPercentage}%,
              #e9ecef ${progressPercentage}%
            )`,
          }}
        >
          <div className="inner-circle">
            <span>{progressPercentage}%</span>
          </div>
        </div>
        <p className="mt-3">
          {completedExercises} de {totalExercises} exercícios concluídos
        </p>
      </div>
    </div>
  );
}

export default CardProgress;
