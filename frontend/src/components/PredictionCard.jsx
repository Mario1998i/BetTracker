import { useNavigate } from "react-router-dom";
import "../styles/PredictionCard.css";

export default function PredictionCard({ prediction, getPredictions, setToast }) {
    const navigate = useNavigate();

    function handleEdit() {
        navigate(`/edit-prediction/${prediction.id}`);
    }

    async function handleDelete() {
        const response = await fetch("http://localhost:8000/api/deletePrediction.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                id: prediction.id
            })
        })

        const result = await response.text();
        if (result === "Prediction eliminata") {
            setToast({
                message: result,
                type: "success"
            });
            getPredictions();
        }
    }
    
    return (
        <div className="prediction-card">
            <h3>{prediction.event}</h3>
            <p><strong>Sport:</strong> {prediction.sport}</p>
            <p><strong>Prediction:</strong> {prediction.prediction}</p>
            <p><strong>Analysis:</strong> {prediction.analysis}</p>
            <p><strong>Odds:</strong> {prediction.odds}</p>
            <p><strong>Status:</strong><span className={`status ${prediction.status.toLowerCase()}`}>{prediction.status}</span></p>
            <div className="prediction-card-buttons">
                <button type="button" onClick={handleEdit}>Modifica</button>
                <button type="button" onClick={handleDelete}>Elimina</button>
            </div>
        </div>
    )
}

