import { useState } from "react";
import { deleteTodo } from "../api/todosApi";

export default function ConfirmModal({ todo, onClose, onConfirm }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteTodo(todo.id);
      onConfirm(todo.id);
      onClose();
    } catch {
      setLoading(false);
    }
  };

  const shortTitle =
    todo.title.length > 60 ? todo.title.slice(0, 60) + "..." : todo.title;

  return (
    <div className="overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <h2 className="modal-title">Delete Todo?</h2>
        <p className="modal-body">
          You are about to delete <strong>"{shortTitle}"</strong>. This cannot be undone.
        </p>
        <div className="modal-footer">
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn-danger" onClick={handleDelete} disabled={loading}>
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}