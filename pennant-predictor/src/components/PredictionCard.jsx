export default function PredictionCard({
    title,
    value,
  }) {
    return (
      <div className="prediction-card">
        <h3>{title}</h3>
        <p>{value}</p>
      </div>
    );
  }