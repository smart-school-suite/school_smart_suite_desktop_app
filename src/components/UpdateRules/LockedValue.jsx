import { Lock } from "lucide-react";

/** A field that cannot change: its current value with a lock, in place of the input. */
export default function LockedValue({ value }) {
  return (
    <div className="d-flex flex-row align-items-center justify-content-between border rounded-2 bg-iron-50 px-2 py-2 font-size-sm text-iron-500">
      <span className="text-truncate">{value}</span>
      <Lock size={14} />
    </div>
  );
}
