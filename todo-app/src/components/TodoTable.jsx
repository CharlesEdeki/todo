import StatusBadge from "./StatusBadge";

export default function TodoTable({ todos, onView, onDelete }) {
  if (todos.length === 0) {
    return (
      <div className="empty-state">
        <p>No todos found.</p>
      </div>
    );
  }

  return (
    <div className="table-wrap">
      <table>
        <colgroup>
          <col className="col-id" />
          <col className="col-title" />
          <col className="col-status" />
          <col className="col-actions" />
        </colgroup>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.id}>
              <td className="cell-id">{todo.id}</td>
              <td>{todo.title}</td>
              <td><StatusBadge completed={todo.completed} /></td>
              <td>
                <div className="actions">
                  <button
                    className="icon-btn view"
                    title="View"
                    onClick={() => onView(todo.id)}
                  >
                    &#128065;
                  </button>
                  <button
                    className="icon-btn delete"
                    title="Delete"
                    onClick={() => onDelete(todo)}
                  >
                    &#128465;
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}