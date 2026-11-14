import { Check, Crown, Sparkles, Star } from "lucide-react";
import { formatLimit, formatMoney, planGains } from "../../utils/subscription/planDisplay";

/**
 * Fixed-size plan summary. The strongest gains over the current plan come
 * first; the full list opens on demand (`details`).
 *
 *   <PlanCard plan={plan} cta={<button/>} details={<ModalButton/>} focusKeys={["school.courses"]} />
 */
export default function PlanCard({ plan, cta, details, maxFeatures = 4, focusKeys = [] }) {
  const ribbon = plan.is_recommended
    ? { className: "plan-card__ribbon--recommended", icon: Sparkles, label: "Recommended for you" }
    : plan.is_current
      ? { className: "plan-card__ribbon--current", icon: Check, label: "Your plan" }
      : plan.is_popular
        ? { className: "plan-card__ribbon--popular", icon: Star, label: "Most popular" }
        : null;

  const gains = planGains(plan, maxFeatures, focusKeys);
  const showsGains = gains.some((feature) => feature.change === "up");
  const RibbonIcon = ribbon?.icon;

  return (
    <article
      className={`plan-card ${plan.is_recommended ? "plan-card--recommended" : ""} ${plan.is_current ? "plan-card--current" : ""}`}
      aria-label={`${plan.name}${ribbon ? `, ${ribbon.label}` : ""}`}
    >
      {ribbon && (
        <span className={`plan-card__ribbon ${ribbon.className}`}>
          <RibbonIcon size={11} aria-hidden="true" />
          {ribbon.label}
        </span>
      )}

      <div className="d-flex flex-column gap-1">
        <div className="d-flex flex-row align-items-center gap-2">
          <span className="fw-semibold" style={{ fontSize: "0.95rem" }}>{plan.name}</span>
          {plan.max_plan && <Crown size={14} className="text-old-lace-500" aria-label="Top plan" />}
        </div>
        <span className="plan-card__description text-iron-500 font-size-xs" title={plan.description}>
          {plan.description}
        </span>
      </div>

      <div className="d-flex flex-column gap-1">
        <span className="plan-card__price">
          {formatMoney(plan.price)}
          <span className="font-size-xs fw-medium text-iron-500 ms-1">{plan.currency} / year</span>
        </span>
        <span className="text-iron-400" style={{ fontSize: "0.7rem" }}>
          {plan.price_delta > 0
            ? `+${formatMoney(plan.price_delta, plan.currency)} a year vs your plan`
            : `About ${formatMoney(plan.monthly_price, plan.currency)} a month`}
        </span>
      </div>

      <div className="plan-card__divider" />

      <div className="d-flex flex-column gap-2">
        <span className="font-size-xs fw-semibold text-iron-700">
          {showsGains ? "What you gain" : "Includes"}
        </span>
        <ul className="list-unstyled m-0 d-flex flex-column gap-2">
          {gains.map((feature) => (
            <li key={feature.key} className="d-flex flex-row align-items-center gap-2" style={{ minWidth: 0 }}>
              <span
                className={`d-grid rounded-circle flex-shrink-0 ${feature.change === "up" ? "bg-primary-100 text-primary-600" : "bg-fern-50 text-fern-600"}`}
                style={{ width: "1.1rem", height: "1.1rem", placeItems: "center" }}
                aria-hidden="true"
              >
                <Check size={10} strokeWidth={3} />
              </span>
              <span className="text-truncate text-iron-700" title={feature.description}>
                <span className="fw-semibold text-iron-900">{formatLimit(feature)}</span> {feature.name}
              </span>
              {feature.change === "up" && feature.multiplier > 1 && (
                <span className="ms-auto flex-shrink-0 rounded-pill px-2 bg-primary-50 text-primary-700 fw-semibold" style={{ fontSize: "0.65rem" }}>
                  {feature.multiplier}×
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="plan-card__footer">
        {cta}
        {details && <div className="d-flex justify-content-center">{details}</div>}
      </div>
    </article>
  );
}
