import "../styles/app.css";

export default function Toast({ message, type = "success", onClose }) {
  if (!message) return null;
  return (
    <div className={`toast toast-${type}`} role="status" aria-live="polite">
      <span>{message}</span>
      <button className="toast-close" onClick={onClose} aria-label="Close toast">
        ✕
      </button>
    </div>
  );
}