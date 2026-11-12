import NumberFlow from "@number-flow/react";

/**
 * Compact KPI tile.
 *
 *   <StatTile icon={Users} label="Eligible voters" value={420} hint="Students 400 · Teachers 20" />
 */
export default function StatTile({ icon: TileIcon, label, value, suffix, hint, tone = "primary" }) {
  const iconTone = {
    primary: "bg-primary-50 text-primary-600",
    success: "bg-fern-50 text-fern-600",
    warning: "bg-old-lace-50 text-old-lace-700",
    neutral: "bg-iron-100 text-iron-700",
  }[tone];
  return (
    <div className="d-flex flex-row align-items-center gap-3 p-3 bg-white border rounded-4 h-100" style={{ minWidth: 0 }}>
      {TileIcon && (
        <div className={`d-grid rounded-3 flex-shrink-0 ${iconTone}`} style={{ width: "2.5rem", height: "2.5rem", placeItems: "center" }}>
          <TileIcon size={18} />
        </div>
      )}
      <div className="d-flex flex-column" style={{ minWidth: 0 }}>
        <span className="text-iron-500 font-size-xs text-truncate">{label}</span>
        <span className="fw-semibold" style={{ fontSize: "1.15rem", lineHeight: 1.3 }}>
          {typeof value === "number" ? <NumberFlow value={value} /> : value ?? "—"}
          {suffix && <span className="font-size-xs text-iron-500 ms-1">{suffix}</span>}
        </span>
        {hint && <span className="text-iron-400 text-truncate" style={{ fontSize: "0.68rem" }} title={hint}>{hint}</span>}
      </div>
    </div>
  );
}
