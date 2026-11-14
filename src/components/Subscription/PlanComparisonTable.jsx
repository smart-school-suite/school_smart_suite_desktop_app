import { formatLimit, formatMoney } from "../../utils/subscription/planDisplay";

/**
 * Every feature limit side by side, the recommended plan's column tinted.
 *
 *   <PlanComparisonTable plans={insights.plans} />
 */
export default function PlanComparisonTable({ plans = [] }) {
  const features = [];
  const seen = new Set();
  plans.forEach((plan) =>
    plan.features.forEach((feature) => {
      if (!seen.has(feature.key)) {
        seen.add(feature.key);
        features.push(feature);
      }
    }),
  );

  const columnClass = (plan) =>
    plan.is_recommended ? "plan-compare__col--recommended" : plan.is_current ? "plan-compare__col--current" : "";

  return (
    <div className="scroll-bar-sm over-flow-x-auto">
      <table className="plan-compare">
        <caption className="visually-hidden">Feature limits by plan</caption>
        <thead>
          <tr>
            <th scope="col" className="text-iron-500 fw-medium">Feature</th>
            {plans.map((plan) => (
              <th key={plan.id} scope="col" className={columnClass(plan)}>
                <div className="d-flex flex-column align-items-center">
                  <span>{plan.name}</span>
                  <span className="fw-normal text-iron-500" style={{ fontSize: "0.68rem" }}>
                    {formatMoney(plan.price, plan.currency)}
                  </span>
                  {(plan.is_recommended || plan.is_current) && (
                    <span className="fw-semibold" style={{ fontSize: "0.62rem" }}>
                      {plan.is_recommended ? "Recommended" : "Current"}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {features.map((feature) => (
            <tr key={feature.key}>
              <th scope="row" className="fw-normal text-iron-700" title={feature.description}>
                {feature.name}
              </th>
              {plans.map((plan) => {
                const cell = plan.features.find((f) => f.key === feature.key);
                return (
                  <td key={plan.id} className={columnClass(plan)}>
                    {formatLimit(cell)}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
