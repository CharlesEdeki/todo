import { useState, useEffect } from "react";
import { fetchTodo } from "../api/todosApi";
import StatusBadge from "../components/StatusBadge";

export default function DetailPage({ id, todos, onBack }) {
  const [todo, setTodo]       = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const local = todos.find((t) => t.id === id);
    if (local) {
      setTodo(local);
      setLoading(false);
      return;
    }
    fetchTodo(id)
      .then((res) => setTodo(res.data))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div className="page">
      <button className="back-btn" onClick={onBack}>
        &#8592; Back to todos
      </button>

      {loading ? (
        <div className="loading-box">
          <div className="spinner" />
        </div>
      ) : todo ? (
        <div className="detail-card">
          <p className="detail-meta">Todo #{todo.id} &middot; User {todo.userId}</p>
          <h2 className="detail-title">{todo.title}</h2>
          <div className="detail-rows">
            <div className="detail-row">
              <span className="detail-key">Status</span>
              <StatusBadge completed={todo.completed} />
            </div>
            <div className="detail-row">
              <span className="detail-key">Todo ID</span>
              <span className="mono">{todo.id}</span>
            </div>
            <div className="detail-row">
              <span className="detail-key">User ID</span>
              <span className="mono">{todo.userId}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="empty-state">Todo not found.</div>
      )}
    </div>
  );
}