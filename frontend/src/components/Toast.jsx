import { useEffect } from "react";
import "../styles/Toast.css"; 

export default function Toast({ message, type, onClose }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 4000);

        return () => clearTimeout(timer);
    }, [])

    return (
        <div className={`toast ${type}`}>{type === "error" ? "⚠" : "✓"} {message}</div>
    )
} 