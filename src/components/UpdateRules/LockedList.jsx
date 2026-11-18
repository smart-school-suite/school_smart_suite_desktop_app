import { Lock } from "lucide-react";
import SectionCard from "../Election/SectionCard";

/**
 * "What can't be changed": every locked field of an update-rules payload with
 * the API's reasons. Fields locked for the same reasons share one row.
 *
 *   <LockedList fields={rules.fields} labels={{ start_date: "Start date" }} />
 */
export default function LockedList({ fields, labels = {}, description }) {
  const groups = [];
  Object.entries(fields ?? {})
    .filter(([, field]) => !field.editable)
    .forEach(([name, field]) => {
      const key = (field.reasons ?? []).join("\n");
      const group = groups.find((item) => item.key === key);
      if (group) group.names.push(name);
      else groups.push({ key, names: [name], reasons: field.reasons ?? [] });
    });
  if (groups.length === 0) return null;

  return (
    <SectionCard
      title="What can't be changed"
      description={description ?? "Protected because of the record's status or the records that depend on it."}
      bodyClassName="p-0 pt-2"
    >
      {groups.map((group) => (
        <div key={group.key} className="d-flex flex-row align-items-start gap-2 px-3 py-2 border-top">
          <Lock size={14} className="text-iron-400 flex-shrink-0" style={{ marginTop: "0.2rem" }} />
          <div className="d-flex flex-column font-size-sm" style={{ minWidth: 0 }}>
            <span className="fw-semibold">{group.names.map((name) => labels[name] ?? name).join(", ")}</span>
            {group.reasons.map((reason) => (
              <span key={reason} className="font-size-xs text-iron-500" style={{ lineHeight: 1.5 }}>{reason}</span>
            ))}
          </div>
        </div>
      ))}
    </SectionCard>
  );
}
