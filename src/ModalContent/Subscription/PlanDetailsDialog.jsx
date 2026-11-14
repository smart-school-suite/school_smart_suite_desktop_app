import { ArrowDown, Check, CircleX, Minus, TrendingUp } from "lucide-react";
import { formatLimit, formatMoney } from "../../utils/subscription/planDisplay";

const CHANGE = {
  up: { icon: TrendingUp, className: "text-primary-600", label: "More than your plan" },
  same: { icon: Check, className: "text-fern-500", label: "Same as your plan" },
  down: { icon: ArrowDown, className: "text-iron-400", label: "Less than your plan" },
};

/**
 * Every limit of one plan, compared with the current plan.
 *
 *   <ModalButton action={{ modalContent: PlanDetailsDialog }} rowData={{ plan }} />
 */
export default function PlanDetailsDialog({ handleClose, rowData }) {
  const { plan } = rowData ?? {};
  return (
    <div className="w-100 d-flex flex-column font-size-sm">
      <div className="border-bottom rounded-top-4 px-3 py-2 d-flex flex-row align-items-center justify-content-between bg-iron-50">
        <div className="d-flex flex-column">
          <span className="fw-semibold">{plan?.name}</span>
          <span className="text-iron-500 font-size-xs">{formatMoney(plan?.price, plan?.currency)} per year</span>
        </div>
        <button
          type="button"
          onClick={() => handleClose?.()}
          className="border-none border rounded-circle bg-transparent p-0 d-grid"
          style={{ width: "2rem", height: "2rem", placeItems: "center" }}
          aria-label="Close"
        >
          <CircleX size={16} />
        </button>
      </div>
      <div className="px-3 pt-3 pb-3 d-flex flex-column gap-3">
        {plan?.description && <p className="m-0 text-iron-600" style={{ lineHeight: 1.6 }}>{plan.description}</p>}
        <ul className="list-unstyled m-0 d-flex flex-column">
          {(plan?.features ?? []).map((feature) => {
            const change = CHANGE[feature.change];
            const ChangeIcon = change?.icon ?? Minus;
            return (
              <li key={feature.key} className="d-flex flex-row align-items-center gap-3 py-2 border-bottom">
                <ChangeIcon size={14} className={`flex-shrink-0 ${change?.className ?? "text-iron-300"}`} aria-label={change?.label} />
                <div className="d-flex flex-column flex-grow-1" style={{ minWidth: 0 }}>
                  <span className="fw-medium">{feature.name}</span>
                  <span className="text-iron-500" style={{ fontSize: "0.7rem" }}>{feature.description}</span>
                </div>
                <div className="d-flex flex-column align-items-end flex-shrink-0">
                  <span className="fw-semibold">{formatLimit(feature)}</span>
                  {feature.change === "up" && feature.multiplier > 1 && (
                    <span className="text-primary-600" style={{ fontSize: "0.68rem" }}>{feature.multiplier}× your plan</span>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
