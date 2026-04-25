function Card({ title, name, description, extraInfo, buttonText, onClick }) {
  return (
    <div className="card h-100 shadow rounded p-4">
      <div className="card-body">
        <h2 className="card-title mb-3">{title}</h2>

        <p className="card-text">{name}</p>

        <p className="card-text">{description}</p>

        <p className="card-text text-muted">{extraInfo}</p>

        {buttonText && (
          <button
            className="btn btn-primary mt-3"
            onClick={onClick}
          >
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
}

export default Card;