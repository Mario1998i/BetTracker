import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/Navbar.css";

export default function Navbar () {
    const [isLogged, setIsLogged] = useState(false);
    const location = useLocation();

    useEffect(() => {
        async function checkSession() {
            const response = await fetch("http://localhost:8000/api/checkSession.php", {
                credentials: "include"
            });

            const result = await response.text();

            if (result === "Loggato") {
                setIsLogged(true);
            } else {
                setIsLogged(false);
            }
        }

        checkSession();
    }, [location.pathname]);

    return (
        <nav>
            {isLogged ? (
                <>
                {location.pathname !== "/dashboard" && location.pathname !== "/predictions" && (
                    <Link to="/dashboard">Dashboard</Link>
                )}
                </>       
            ) : (
                <>
                {location.pathname !== "/" && (
                    <Link to="/">Home</Link>
                )}

                {location.pathname !== "/login" && (
                    <Link to="/login">Login</Link>
                )}

                {location.pathname !== "/register" && (
                    <Link to="/register">Register</Link>
                )}
                </>
            )}
        </nav>
    )
}