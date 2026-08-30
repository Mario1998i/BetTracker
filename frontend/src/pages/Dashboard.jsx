import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PredictionCard from "../components/PredictionCard";
import "../styles/Dashboard.css";

export default function Dashboard ({ setToast }) {
    const navigate = useNavigate();
    const [predictions, setPredictions] = useState([]);

    async function handleLogout() {
        const response = await fetch("http://localhost:8000/api/logout.php", {
            credentials: "include"
        }) 

        const result = await response.text();
        if(result === "Logout effettuato") {
            setToast({
                message: result,
                type: "success"
            });
            navigate("/login");
        }
    }

    async function getPredictions() {
        const response = await fetch("http://localhost:8000/api/getPredictions.php", {
            credentials: "include"
        });

        const data = await response.json();

        setPredictions(data);
    }

    useEffect(() => {
        async function checkSession() {
            const response = await fetch("http://localhost:8000/api/checkSession.php", {
            credentials: "include"
            });

            const result = await response.text();

            if (result === "Non loggato") {
                navigate("/login");
            }
        }

        checkSession();
        getPredictions();
    }, [navigate])


    return (
        <div className="dashboard">
            <h1>Dashboard</h1>
            <div className="dashboard-buttons">
                <button type="button" onClick={handleLogout}>Logout</button>
                <button type="button" onClick={() => navigate("/new-prediction")}>Nuovo pronostico</button>
            </div>
            <div className="predictions-container">
                {predictions.map((prediction) => (
                    <PredictionCard key={prediction.id} prediction={prediction} getPredictions={getPredictions} setToast={setToast} />
                ))}
            </div>

        </div>
    )
}