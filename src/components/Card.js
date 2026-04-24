function Card({ title, description, extraInfo, buttonText, onClick }) {
  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
      <p>{extraInfo}</p>
      {buttonText && <button onClick={onClick}>{buttonText}</button>}
    </div>
  );
}

export default Card;
