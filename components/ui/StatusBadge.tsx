type Status = "open" | "pending" | "completed";

const styles: Record<Status, string> = {
  open: "bg-gray-100 text-gray-800 border-gray-200",
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  completed: "bg-green-100 text-green-800 border-green-200",
};

export function StatusBadge({
  status,
  onChange,
}: {
  status: Status;
  onChange?: (next: Status) => void;
}) {
  const cls = styles[status];

  // Read-only badge (fallback)
  if (!onChange) {
    return (
      <span
        className={`inline-flex items-center justify-center rounded-full border px-3 py-1 text-xs font-medium ${cls}`}
      >
        {status}
      </span>
    );
  }

  // Clickable dropdown that LOOKS like a badge
  return (
    <div className="inline-flex justify-center">
      <select
        value={status}
        onChange={(e) => onChange(e.target.value as Status)}
        title="Change status"
        className={[
          "appearance-none",
          "text-center",
          "cursor-pointer",
          "rounded-full",
          "border",
          "px-3",
          "py-1",
          "text-xs",
          "font-medium",
          "outline-none",
          "focus:ring-2",
          "focus:ring-gray-200",
          cls,
        ].join(" ")}
      >
        <option value="open">open</option>
        <option value="pending">pending</option>
        <option value="completed">completed</option>
      </select>
    </div>
  );
}
