import { Lock } from "lucide-react";

/** Shown at the top of an update drawer when nothing on the record can change. */
export default function ReadOnlyNotice({ children }) {
  return (
    <div className="d-flex flex-row align-items-start gap-2 rounded-3 bg-old-lace-50 text-old-lace-700 px-3 py-2 font-size-sm">
      <Lock size={15} className="flex-shrink-0" style={{ marginTop: "0.15rem" }} />
      <span>{children}</span>
    </div>
  );
}
