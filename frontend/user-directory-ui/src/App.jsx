import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Toast from "./components/Toast";
import ListUsers from "./pages/ListUsers";
import AddUser from "./pages/AddUser";
import "./styles/app.css";

export default function App() {
  const [toast, setToast] = useState({ message: "", type: "success" });

  function showToast(message, type = "success") {
    setToast({ message, type });
    window.clearTimeout(window.__toastTimer);
    window.__toastTimer = window.setTimeout(() => {
      setToast({ message: "", type: "success" });
    }, 2500);
  }

  return (
    <>
      <Navbar />
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: "", type: "success" })}
      />
      <Routes>
        <Route path="/" element={<Navigate to="/list" replace />} />
        <Route path="/list" element={<ListUsers toast={toast} />} />
        <Route path="/add" element={<AddUser showToast={showToast} />} />
        <Route path="*" element={<Navigate to="/list" replace />} />
      </Routes>
    </>
  );
}