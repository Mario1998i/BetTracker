import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/NewPrediction.css";

export default function NewPrediction({ setToast }) {
    const [form, setForm] = useState({
        sport: "",
        event: "",
        prediction: "",
        analysis: "",
        odds: "",
        eventDate: ""
    });

    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    function handleChange(e) {
        setForm({...form, [e.target.name]: e.target.value});

        setErrors({...errors, [e.target.name]: ""});
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const newErrors = {};

        if (!form.sport) {
            newErrors.sport = "Inserisci lo sport";
        }

        if (!form.event) {
            newErrors.event = "Inserisci l'evento";
        }

        if (!form.prediction) {
            newErrors.prediction = "Inserisci un pronostico";
        }

        if (!form.analysis) {
            newErrors.analysis = "Inserisci un'analisi";
        }

        if (!form.odds) {
            newErrors.odds = "Inserisci le quote";
        }

        if (!form.eventDate) {
            newErrors.eventDate = "Inserisci la data dell'evento";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            return;
        }

        const response = await fetch("http://localhost:8000/api/createPrediction.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(form)
        });

        const result = await response.text();
        if (result === "Prediction creata") {
            setToast({
                message: result,
                type: "success"
            });
            navigate("/dashboard");
        }
    }

    return (
        <form className="prediction-form" onSubmit={handleSubmit}>
            <h1>New Prediction</h1>
            <label htmlFor="sport">Sport</label>
            <input type="text" id="sport" name="sport" value={form.sport} onChange={handleChange} />
            {errors.sport && (
                <p className="form-error">{errors.sport}</p>
            )}

            <label htmlFor="event">Event</label>
            <input type="text" id="event" name="event" value={form.event} onChange={handleChange} />
            {errors.event && (
                <p className="form-error">{errors.event}</p>
            )}

            <label htmlFor="prediction">Prediction</label>
            <input type="text" id="prediction" name="prediction" value={form.prediction} onChange={handleChange} />
            {errors.prediction && (
                <p className="form-error">{errors.prediction}</p>
            )}

            <label htmlFor="analysis">Analysis</label>
            <textarea name="analysis" id="analysis" value={form.analysis} onChange={handleChange} />
            {errors.analysis && (
                <p className="form-error">{errors.analysis}</p>
            )}

            <label htmlFor="odds">Odds</label>
            <input type="text" id="odds" name="odds" value={form.odds} onChange={handleChange} />
            {errors.odds && (
                <p className="form-error">{errors.odds}</p>
            )}

            <label htmlFor="eventDate">Event date</label>
            <input type="datetime-local" id="eventDate" name="eventDate" value={form.eventDate} onChange={handleChange} />
            {errors.eventDate && (
                <p className="form-error">{errors.eventDate}</p>
            )}

            <button type="submit">Pubblica pronostico</button>
        </form>
    )
}