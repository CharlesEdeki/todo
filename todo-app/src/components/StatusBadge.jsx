export default function StatusBadge({ completed }) {
  return completed
    ? <span className="badge badge-done">&#10003; Done</span>
    : <span className="badge badge-pending">&#9675; Pending</span>;
}