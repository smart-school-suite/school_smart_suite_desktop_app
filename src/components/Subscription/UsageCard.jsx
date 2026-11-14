import { TrendingUp } from "lucide-react";
import StatusPill from "../Election/StatusPill";
import UsageMeter from "./UsageMeter";
import { USAGE_STATUS } from "../../utils/subscription/planDisplay";

/**
 * One feature's usage against its limit, with the next plan that raises it.
 *
 *   <UsageCard row={usageRow} nextPlan={{ name: "Growth Plan", value: 200 }} />
 */
export default function UsageCard({ row, nextPlan }) {
  const status = USAGE_STATUS[row.status] ?? USAGE_STATUS.healthy;
  const isBoolean = row.limit_type === "boolean";
  const atRisk = ["warning", "critical", "exceeded"].includes(row.status);

  return (
    <div className="bg-white border rounded-4 p-3 d-flex flex-column gap-2 h-100" style={{ minWidth: 0 }}>
      <div className="d-flex flex-row align-items-start justify-content-between gap-2">
        <div className="d-flex flex-column" style={{ minWidth: 0 }}>
          <span className="fw-semibold font-size-sm text-truncate" title={row.name}>{row.name}</span>
          <span className="text-iron-500 text-truncate" style={{ fontSize: "0.7rem" }} title={row.description}>
            {row.description}
          </span>
        </div>
        <StatusPill tone={status.tone}>{status.label}</StatusPill>
      </div>

      {isBoolean ? (
        <span className="font-size-sm text-iron-600">{row.enabled ? "Included in your plan" : "Not included in your plan"}</span>
      ) : (
        <>
          <div className="d-flex flex-row align-items-baseline gap-1">
            <span className="fw-semibold" style={{ fontSize: "1.15rem" }}>{row.used}</span>
            <span className="text-iron-500 font-size-xs">
              {row.unlimited ? "used · no limit" : `of ${row.limit} used`}
            </span>
            {!row.unlimited && <span className="ms-auto font-size-xs fw-semibold text-iron-600">{row.percent}%</span>}
          </div>
          <UsageMeter percent={row.unlimited ? 0 : row.percent} status={row.status} label={`${row.name} usage`} />
          <span className="text-iron-400" style={{ fontSize: "0.7rem" }}>
            {row.unlimited ? "Unlimited on your plan" : `${row.remaining} left on your plan`}
          </span>
        </>
      )}

      {atRisk && nextPlan && (
        <div className="d-flex flex-row align-items-center gap-2 rounded-3 bg-primary-50 text-primary-700 px-2 py-1 mt-auto" style={{ fontSize: "0.7rem" }}>
          <TrendingUp size={12} aria-hidden="true" />
          <span className="text-truncate">
            {nextPlan.unlimited ? "Unlimited" : nextPlan.value} on the {nextPlan.name}
          </span>
        </div>
      )}
    </div>
  );
}
