import { useState } from "react";
import ListPage from "./pages/ListPage";
import DetailPage from "./pages/DetailPage";

export default function App() {
  const [view, setView] = useState({ page: "list", id: null });
  const [todos, setTodos] = useState([]);

  const navigate = (page, id = null) => setView({ page, id });

  return (
    <>
      <header className="header">
        <div className="header-brand">
          <div className="header-dot" />
          <h1 className="header-title">Todos</h1>
        </div>
      </header>

      {view.page === "list" && (
        <ListPage onNavigate={navigate} todos={todos} setTodos={setTodos} />
      )}

      {view.page === "detail" && (
        <DetailPage
          id={view.id}
          todos={todos}
          onBack={() => navigate("list")}
        />
      )}
    </>
  );
}