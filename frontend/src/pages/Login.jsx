import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Login.css";
import soccerBall from "../assets/Soccerball.svg";

export default function Login ({ setToast }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();

        if (!email || !password) {
            setToast({
                message: "Inserisci email e password",
                type: "error"
            });
            return;
        }

        const loginData = {
            email,
            password
        }

        const jsonLogin = JSON.stringify(loginData);

        const response = await fetch("http://bettracker0.freepage.cc/api/login.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: jsonLogin
        });

        const result = await response.json();
        if(result.message === "Login effettuato") {
            setToast({
                message: result.message,
                type: "success"
            });

            if (result.role === "tipster") {
                navigate("/dashboard");
            } else {
                navigate("/predictions");
            }
        } else {
            setToast({
                message: result.message,
                type: "error"
            });
        }
    }

    useEffect(() => {
        async function checkSession() {
            const response = await fetch("http://localhost:8000/api/checkSession.php", {
                credentials: "include"
            })

            const result = await response.text();
            if (result === "Loggato") {
                navigate("/dashboard");
            }
        }

        checkSession();
    }, [])

    return (
        <main className="login-page">
            <div className="login-decoration">
                <img className="soccer-ball" src={soccerBall}/>
            </div>
            <form className="login-card" onSubmit={handleSubmit}>
                <h1>Login</h1>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Inserisci un'email valida"/>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Inserisci una password valida"/>
                <button type="submit">Accedi</button>
                <p className="register-link">Non hai un'account? <Link to="/register">Registrati</Link></p>
            </form>
        </main>
    )
}