import { useState } from "react";
import { createTodo } from "../api/todosApi";

export default function AddTodoModal({ onClose, onAdd }) {
  const [title, setTitle]         = useState("");
  const [completed, setCompleted] = useState("false");
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState("");

  const handleSubmit = async () => {
    if (!title.trim()) {
      setError("Title is required.");
      return;
    }
    setLoading(true);
    try {
      const res = await createTodo({
        title: title.trim(),
        completed: completed === "true",
        userId: 1,
      });
      onAdd({ ...res.data, id: Date.now() });
      onClose();
    } catch {
      setError("Failed to create todo. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="overlay"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modal">
        <h2 className="modal-title">Add new todo</h2>

        <div className="form-group">
          <label className="form-label">Title</label>
          <input
            className="form-input"
            value={title}
            onChange={(e) => { setTitle(e.target.value); setError(""); }}
            placeholder="What needs to be done?"
            autoFocus
          />
          {error && <p className="form-error">{error}</p>}
        </div>

        <div className="form-group">
          <label className="form-label">Status</label>
          <select
            className="form-select"
            value={completed}
            onChange={(e) => setCompleted(e.target.value)}
          >
            <option value="false">Pending</option>
            <option value="true">Done</option>
          </select>
        </div>

        <div className="modal-footer">
          <button className="btn btn-ghost" onClick={onClose}>
            Cancel
          </button>
          <button
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Saving..." : "+ Add todo"}
          </button>
        </div>
      </div>
    </div>
  );
}