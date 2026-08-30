import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Predictions.css";

export default function Predictions({ setToast }) {
    const [predictions, setPredictions] = useState([]);

    const navigate = useNavigate();

    async function handleLogout() {
        const response = await fetch("http://localhost:8000/api/logout.php", {
            credentials: "include"
        });

        const result = await response.text();

        if (result === "Logout effettuato") {
            setToast({
                message: result,
                type: "success"
            });
            navigate("/login");
        }
    }

    async function getPredictions() {
        const response = await fetch("http://localhost:8000/api/getAllPredictions.php", {
            credentials: "include"
        });

        const data = await response.json();

        setPredictions(data);
    }

    useEffect(() => {
        getPredictions();
    }, []);

    return (
        <div className="predictions-page">
            <h1>Predictions</h1>
            <button type="button" onClick={handleLogout}>Logout</button>
            <div className="predictions-container">
                {predictions.map((prediction) => (
                    <div className="prediction" key={prediction.id}>
                        <h3>{prediction.event}</h3>
                        <p><strong>Tipster:</strong> {prediction.username}</p>
                        <p><strong>Sport:</strong> {prediction.sport}</p>
                        <p><strong>Prediction:</strong> {prediction.prediction}</p>
                        <p><strong>Analysis:</strong> {prediction.analysis}</p>
                        <p><strong>Odds:</strong> {prediction.odds}</p>
                        <p><strong>Status:</strong> {prediction.status}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}