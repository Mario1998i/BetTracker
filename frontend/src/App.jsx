import Home from "./pages/Home";
import Login from "./pages/Login"
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import NewPrediction from "./pages/NewPrediction";
import { Routes, Route, useLocation } from "react-router-dom";
import EditPrediction from "./pages/EditPrediction";
import { useState } from "react";
import Toast from "./components/Toast";
import Predictions from "./pages/Predictions";

export default function App() {
  const location = useLocation();
  const [toast, setToast] = useState(null);
  
  return (
    <>
    {toast && (
      <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
    )}
    <Navbar />
    <div key={location.pathname} className="page">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setToast={setToast} />} />
        <Route path="/register" element={<Register setToast={setToast} />} />
        <Route path="/dashboard" element={<Dashboard setToast={setToast} />} />
        <Route path="/new-prediction" element={<NewPrediction setToast={setToast} />} />
        <Route path="/edit-prediction/:id" element={<EditPrediction setToast={setToast} />} />
        <Route path="/predictions" element={<Predictions setToast={setToast} />} />
      </Routes>
    </div>

    </>
  )
}


