import { useState, useEffect } from "react";
import { fetchTodos } from "../api/todosApi";
import TodoTable from "../components/TodoTable";
import AddTodoModal from "../components/AddTodoModal";
import ConfirmModal from "../components/ConfirmModal";

const PER_PAGE = 15;

export default function ListPage({ onNavigate }) {
  const [todos, setTodos]               = useState([]);
  const [loading, setLoading]           = useState(true);
  const [search, setSearch]             = useState("");
  const [filter, setFilter]             = useState("all");
  const [page, setPage]                 = useState(1);
  const [showAdd, setShowAdd]           = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toast, setToast]               = useState("");

  useEffect(() => {
    fetchTodos()
      .then((res) => setTodos(res.data))
      .finally(() => setLoading(false));
  }, []);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2800);
  };

  const filtered = todos.filter((t) => {
    const matchSearch = t.title.toLowerCase().includes(search.toLowerCase());
    const matchFilter =
      filter === "all"     ? true :
      filter === "done"    ? t.completed :
      !t.completed;
    return matchSearch && matchFilter;
  });

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paged      = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const done       = todos.filter((t) => t.completed).length;

  const handleAdd    = (todo) => { setTodos((p) => [todo, ...p]); showToast("Todo added."); };
  const handleDelete = (id)   => { setTodos((p) => p.filter((t) => t.id !== id)); showToast("Todo deleted."); };

  return (
    <div className="page">
      <div className="page-header">
        <h2>My todos</h2>
        <button className="btn btn-primary" onClick={() => setShowAdd(true)}>
          + Add todo
        </button>
      </div>

      <div className="stats-row">
        <div className="stat">
          <div className="stat-num">{todos.length}</div>
          <div className="stat-label">Total</div>
        </div>
        <div className="stat">
          <div className="stat-num">{done}</div>
          <div className="stat-label">Done</div>
        </div>
        <div className="stat">
          <div className="stat-num">{todos.length - done}</div>
          <div className="stat-label">Pending</div>
        </div>
      </div>

      <div className="toolbar">
        <input
          className="search-input"
          placeholder="Search todos..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
        />
        <select
          className="filter-select"
          value={filter}
          onChange={(e) => { setFilter(e.target.value); setPage(1); }}
        >
          <option value="all">All</option>
          <option value="done">Done</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      <div className="card">
        {loading ? (
          <div className="loading-box">
            <div className="spinner" />
          </div>
        ) : (
          <TodoTable
            todos={paged}
            onView={(id) => onNavigate("detail", id)}
            onDelete={(todo) => setDeleteTarget(todo)}
          />
        )}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <span>
            {(page - 1) * PER_PAGE + 1}–{Math.min(page * PER_PAGE, filtered.length)} of {filtered.length}
          </span>
          <div className="page-btns">
            <button
              className="btn btn-ghost"
              style={{ padding: "5px 11px", fontSize: 13 }}
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              &#8592;
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                className={`page-num ${p === page ? "active" : ""}`}
                onClick={() => setPage(p)}
              >
                {p}
              </button>
            ))}
            <button
              className="btn btn-ghost"
              style={{ padding: "5px 11px", fontSize: 13 }}
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              &#8594;
            </button>
          </div>
        </div>
      )}

      {showAdd && (
        <AddTodoModal
          onClose={() => setShowAdd(false)}
          onAdd={handleAdd}
        />
      )}

      {deleteTarget && (
        <ConfirmModal
          todo={deleteTarget}
          onClose={() => setDeleteTarget(null)}
          onConfirm={handleDelete}
        />
      )}

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}