import NumberFlow from "@number-flow/react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CalendarClock, CircleCheck, Crown, Sparkles } from "lucide-react";
import { RECOMMENDATION_LOOK, formatMoney } from "../../utils/subscription/planDisplay";

const ICONS = { sparkles: Sparkles, calendar: CalendarClock, check: CircleCheck, crown: Crown };

/**
 * The first thing on the subscription page: the plan we recommend and why.
 *
 *   <RecommendationHero recommendation={rec} subscription={sub} actions={<button/>} />
 */
export default function RecommendationHero({ recommendation, subscription, actions }) {
  const reduceMotion = useReducedMotion();
  if (!recommendation) return null;

  const look = RECOMMENDATION_LOOK[recommendation.type] ?? RECOMMENDATION_LOOK.stay;
  const EyebrowIcon = ICONS[look.icon] ?? Sparkles;
  const plan = recommendation.plan;
  const reasons = recommendation.reasons ?? [];
  const showPeriod = ["renew", "stay"].includes(recommendation.type) && subscription;

  return (
    <motion.section
      className={`plan-hero ${look.tone !== "primary" ? `plan-hero--${look.tone}` : ""}`}
      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.2, 0, 0, 1] }}
      aria-labelledby="plan-hero-title"
    >
      <div className="d-flex flex-row flex-wrap gap-4 align-items-stretch">
        <div className="d-flex flex-column gap-3 flex-grow-1" style={{ flexBasis: "26rem", minWidth: 0 }}>
          <span className="plan-hero__eyebrow align-self-start">
            <EyebrowIcon size={12} />
            {look.eyebrow}
          </span>
          <div className="d-flex flex-column gap-2">
            <h2 id="plan-hero-title" className="m-0 fw-bold" style={{ fontSize: "1.45rem", lineHeight: 1.25 }}>
              {recommendation.headline}
            </h2>
            <p className="m-0 font-size-sm" style={{ opacity: 0.9, lineHeight: 1.6, maxWidth: "38rem" }}>
              {recommendation.description}
            </p>
          </div>

          {reasons.length > 0 && (
            <div className="d-flex flex-column gap-2">
              <span className="font-size-xs fw-semibold" style={{ opacity: 0.85 }}>
                Why we recommend it
              </span>
              <div className="d-flex flex-row flex-wrap gap-2">
                {reasons.slice(0, 3).map((reason) => (
                  <ReasonTile key={reason.key} reason={reason} planName={plan?.name} />
                ))}
              </div>
            </div>
          )}

          {showPeriod && subscription.elapsed_percent !== null && (
            <div className="d-flex flex-column gap-1" style={{ maxWidth: "24rem" }}>
              <div className="d-flex flex-row justify-content-between font-size-xs" style={{ opacity: 0.9 }}>
                <span>Billing period</span>
                <span>{subscription.days_left} days left</span>
              </div>
              <div className="plan-hero__track">
                <span style={{ width: `${subscription.elapsed_percent}%` }} />
              </div>
            </div>
          )}
        </div>

        {plan && (
          <div
            className="plan-hero__glass d-flex flex-column justify-content-between gap-3 p-3 flex-grow-1"
            style={{ flexBasis: "15rem", maxWidth: "22rem" }}
          >
            <div className="d-flex flex-column gap-1">
              <span className="font-size-xs" style={{ opacity: 0.85 }}>
                {recommendation.type === "upgrade" || recommendation.type === "start" ? "Recommended plan" : "Your plan"}
              </span>
              <span className="fw-semibold" style={{ fontSize: "1.05rem" }}>{plan.name}</span>
            </div>
            <div className="d-flex flex-column">
              <span className="fw-bold" style={{ fontSize: "1.75rem", lineHeight: 1.1 }}>
                <NumberFlow value={Number(plan.price) || 0} />
                <span className="font-size-sm fw-medium ms-1" style={{ opacity: 0.85 }}>
                  {plan.currency} / year
                </span>
              </span>
              <span className="font-size-xs" style={{ opacity: 0.8 }}>
                About {formatMoney(Math.round((plan.price || 0) / 12), plan.currency)} a month
              </span>
            </div>
            {actions && <div className="d-flex flex-column gap-2">{actions}</div>}
          </div>
        )}
      </div>
    </motion.section>
  );
}

function ReasonTile({ reason, planName }) {
  const isBoolean = reason.limit_type === "boolean";
  const target = reason.recommended_unlimited ? "Unlimited" : reason.recommended_limit;
  return (
    <div className="plan-hero__glass d-flex flex-column gap-2 px-3 py-2" style={{ minWidth: "11rem", flex: "1 1 11rem", maxWidth: "16rem" }}>
      <div className="d-flex flex-row justify-content-between align-items-baseline gap-2">
        <span className="font-size-xs fw-semibold text-truncate" title={reason.name}>{reason.name}</span>
        {!isBoolean && <span className="font-size-xs fw-semibold">{reason.percent}%</span>}
      </div>
      {isBoolean ? (
        <span className="font-size-xs" style={{ opacity: 0.9 }}>{reason.message}</span>
      ) : (
        <>
          <div className="plan-hero__track">
            <span style={{ width: `${Math.min(100, reason.percent)}%` }} />
          </div>
          <div className="d-flex flex-row align-items-center gap-1 font-size-xs" style={{ opacity: 0.9 }}>
            <span>
              {reason.used} / {reason.current_limit}
            </span>
            {target !== null && target !== undefined && (
              <>
                <ArrowRight size={12} aria-hidden="true" />
                <span className="fw-semibold" title={planName ? `on the ${planName}` : undefined}>{target}</span>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
