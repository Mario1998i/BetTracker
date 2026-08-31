import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, Link} from "react-router-dom";
import "../styles/Register.css";
import userNeon from "../assets/user-neon.mp4";

export default function Register({ setToast}) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("user");

    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();

        if (!username || !email || !password) {
            setToast({
                message: "Compila tutti i campi",
                type: "error"
            });
            return;
        }

        if (password.length < 8) {
            setToast({
                message: "La password deve contenere almeno 8 caratteri",
                type: "error"
            });
            return;
        }

        const user = {
            username,
            email,
            password,
            role
        }

        const jsonUser = JSON.stringify(user);


        const response = await fetch("http://localhost:8000/api/register.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: jsonUser
        });

        const result = await response.text();
        if (result === "Utente registrato") {
            setToast({
                message: result,
                type: "success"
            });
            navigate("/login");
        } else {
            setToast({
                message: result,
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
            if(result === "Loggato") {
                navigate("/dashboard");
            }
        }

        checkSession();
    })

    return (
        <main className="register-page">
            <div className="register-decoration">
                <video src={userNeon} autoPlay loop muted playsInline disablePictureInPicture/>
            </div>
            <form className="register-card" onSubmit={handleSubmit}>
                <h1>Register</h1>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" value={username} onChange={(event) => setUsername(event.target.value)} placeholder="Inserisci un'username valida" />
                <label htmlFor="email">Email</label>
                <input type="email" id="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Inserisci un'email valida" />
                <label htmlFor="password">Password</label>
                <input type="password" id="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Inserisci una password valida" />
                <label htmlFor="role">Scegli tra:</label>
                <select id="role" value={role} onChange={(event) => setRole(event.target.value)}>
                    <option value="user">User</option>
                    <option value="tipster">Tipster</option>
                </select>
                <button type="submit">Registrati</button>
                <p className="register-link">Hai già un account? <Link to="/login">Accedi</Link></p>
            </form>
        </main>
    )
}