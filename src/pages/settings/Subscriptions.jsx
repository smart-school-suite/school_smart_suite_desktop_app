import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { BarChart3, CalendarClock, CircleAlert, Headset, Layers, ShieldCheck, Zap } from "lucide-react";
import { useRef, useState } from "react";
import { ModalButton } from "../../components/DataTableComponents/ActionComponent";
import SectionCard from "../../components/Election/SectionCard";
import StatTile from "../../components/Election/StatTile";
import StatusPill from "../../components/Election/StatusPill";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import PlanCard from "../../components/Subscription/PlanCard";
import PlanComparisonTable from "../../components/Subscription/PlanComparisonTable";
import RecommendationHero from "../../components/Subscription/RecommendationHero";
import UsageCard from "../../components/Subscription/UsageCard";
import EmptyState from "../../components/errors/EmptyState";
import { useGetPlanInsights } from "../../hooks/subscription/useGetPlanInsights";
import ChangePlanDialog from "../../ModalContent/Subscription/ChangePlanDialog";
import PlanDetailsDialog from "../../ModalContent/Subscription/PlanDetailsDialog";
import {
  PLAN_PROMISES,
  SALES_CONTACT_URL,
  STATUS_PILL,
  formatDate,
  formatMoney,
} from "../../utils/subscription/planDisplay";

const TABS = [
  { id: "plans", label: "Plans" },
  { id: "usage", label: "Usage & limits" },
  { id: "compare", label: "Compare features" },
];

const PROMISE_ICONS = { zap: Zap, shield: ShieldCheck, chart: BarChart3 };

function Subscriptions() {
  const { data: insights, isLoading, error, refetch } = useGetPlanInsights();
  const [tab, setTab] = useState("plans");
  const plansRef = useRef(null);

  const showTab = (id) => {
    setTab(id);
    plansRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="h-100 d-flex flex-column">
      <div className="flex-grow-1 scroll-bar-sm over-flow-y-auto over-flow-x-hidden pe-1" style={{ minHeight: 0 }}>
        <div className="d-flex flex-column gap-4 pb-4 pt-1">
          <PageHeader subscription={insights?.subscription} />

          {isLoading ? (
            <PageSkeleton />
          ) : error ? (
            <EmptyState
              mascot="error"
              height="60dvh"
              mascotHeight="7rem"
              title={error?.response?.data?.errors?.title ?? "We couldn't load your plans"}
              description={error?.response?.data?.errors?.description ?? "Check your connection and try again."}
              actions={
                <button type="button" className="border-none rounded-3 primary-background text-white font-size-sm px-3 py-2" onClick={() => refetch()}>
                  Try again
                </button>
              }
            />
          ) : !insights?.plans?.length ? (
            <EmptyState
              mascot="sad"
              height="60dvh"
              mascotHeight="7rem"
              title="No plans available yet"
              description="There are no active plans for your country. Contact support and we'll set your school up."
            />
          ) : (
            <Content insights={insights} tab={tab} setTab={setTab} showTab={showTab} plansRef={plansRef} />
          )}
        </div>
      </div>
    </div>
  );
}
export default Subscriptions;

function PageHeader({ subscription }) {
  const status = STATUS_PILL[subscription?.status];
  return (
    <div className="d-flex flex-row flex-wrap align-items-end justify-content-between gap-2">
      <div className="d-flex flex-column">
        <span className="fw-semibold">Subscription & Billing</span>
        <span className="font-size-sm text-iron-500">
          The right plan keeps your school running at full speed. Here's what fits you best.
        </span>
      </div>
      {subscription && (
        <div className="d-flex flex-row align-items-center gap-2 font-size-xs text-iron-500">
          {status && <StatusPill tone={status.tone}>{status.label}</StatusPill>}
          <span>
            {subscription.plan?.name} · renews {formatDate(subscription.end_date)}
          </span>
        </div>
      )}
    </div>
  );
}

function Content({ insights, tab, setTab, showTab, plansRef }) {
  const reduceMotion = useReducedMotion();
  const { subscription, usage = [], usage_summary: summary, plans, recommendation } = insights;
  const currentPlan = plans.find((plan) => plan.is_current) ?? null;
  const planById = (id) => plans.find((plan) => plan.id === id);
  const renewalDue = subscription?.renewal_due || subscription?.status === "expired";
  // usage arrives busiest first; plan cards lead with gains on those features
  const focusKeys = usage.filter((row) => row.ratio !== null).map((row) => row.key);

  return (
    <>
      <RecommendationHero
        recommendation={recommendation}
        subscription={subscription}
        actions={
          <HeroActions
            recommendation={recommendation}
            plan={planById(recommendation?.plan_id)}
            currentPlan={currentPlan}
            subscription={subscription}
            focusKeys={focusKeys}
            showTab={showTab}
          />
        }
      />

      {subscription && (
        <div className="d-grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(13rem, 1fr))" }}>
          <StatTile
            icon={Layers}
            label="Current plan"
            value={subscription.plan?.name}
            hint={`${formatMoney(subscription.plan?.price, subscription.plan?.currency)} / year`}
          />
          <StatTile
            icon={CalendarClock}
            tone={renewalDue ? "warning" : "neutral"}
            label="Renews on"
            value={formatDate(subscription.end_date)}
            hint={subscription.days_left !== null ? `${subscription.days_left} days left` : undefined}
          />
          <StatTile
            icon={CircleAlert}
            tone={summary?.at_risk ? "warning" : "success"}
            label="Features near their limit"
            value={summary?.at_risk ?? 0}
            suffix={`of ${summary?.features ?? 0}`}
            hint={summary?.at_risk ? "See Usage & limits" : "Everything has room to grow"}
          />
          <StatTile
            icon={BarChart3}
            tone="primary"
            label="Busiest feature"
            value={summary?.busiest ? `${summary.busiest.percent}%` : "—"}
            hint={summary?.busiest?.name}
          />
        </div>
      )}

      <section ref={plansRef} className="d-flex flex-column gap-3" aria-labelledby="plans-title" style={{ scrollMarginTop: "0.5rem" }}>
        <div className="d-flex flex-row flex-wrap align-items-end justify-content-between gap-2">
          <div className="d-flex flex-column">
            <span id="plans-title" className="fw-semibold">Find the plan that fits your school</span>
            <span className="font-size-xs text-iron-500">
              Every plan includes the full Smart School Suite. Higher plans raise the limits you use the most.
            </span>
          </div>
          <div className="subscription-tabs" role="tablist" aria-label="Plan views">
            {TABS.map((item) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                id={`subscription-tab-${item.id}`}
                aria-selected={tab === item.id}
                aria-controls={`subscription-panel-${item.id}`}
                onClick={() => setTab(item.id)}
              >
                {item.label}
                {item.id === "usage" && summary?.at_risk > 0 && (
                  <span className="ms-1 rounded-pill px-1 bg-old-lace-100 text-old-lace-700 fw-semibold" style={{ fontSize: "0.62rem" }}>
                    {summary.at_risk}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={tab}
            role="tabpanel"
            id={`subscription-panel-${tab}`}
            aria-labelledby={`subscription-tab-${tab}`}
            initial={reduceMotion ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
          >
            {tab === "plans" && (
              <PlansPanel
                plans={plans}
                currentPlan={currentPlan}
                subscription={subscription}
                renewalDue={renewalDue}
                focusKeys={focusKeys}
              />
            )}
            {tab === "usage" && <UsagePanel usage={usage} plans={plans} currentPlan={currentPlan} />}
            {tab === "compare" && (
              <SectionCard
                title="Compare every limit"
                description="Hover a feature to see what it covers."
                bodyClassName="pt-2"
              >
                <PlanComparisonTable plans={plans} />
              </SectionCard>
            )}
          </motion.div>
        </AnimatePresence>
      </section>

      <div className="d-flex flex-row flex-wrap align-items-center justify-content-between gap-3 border rounded-4 bg-white p-3">
        <div className="d-flex flex-row align-items-center gap-3" style={{ minWidth: 0 }}>
          <div className="d-grid rounded-3 bg-iron-100 text-iron-700 flex-shrink-0" style={{ width: "2.5rem", height: "2.5rem", placeItems: "center" }}>
            <Headset size={18} />
          </div>
          <div className="d-flex flex-column" style={{ minWidth: 0 }}>
            <span className="fw-semibold font-size-sm">Need custom limits or several campuses?</span>
            <span className="font-size-xs text-iron-500">Our team builds plans for large institutions and school groups.</span>
          </div>
        </div>
        <a href={SALES_CONTACT_URL} className="border rounded-3 px-3 py-2 font-size-sm text-iron-800 text-decoration-none fw-medium">
          Talk to sales
        </a>
      </div>
    </>
  );
}

function HeroActions({ recommendation, plan, currentPlan, subscription, focusKeys, showTab }) {
  if (!recommendation) return null;
  const changePlan = (mode, target) => (
    <ModalButton
      classname="w-100"
      action={{ modalContent: ChangePlanDialog }}
      rowData={{ mode, plan: target, currentPlan, subscription, focusKeys }}
      size="md"
    >
      <button type="button" className="plan-hero__cta w-100">
        {recommendation.cta_text}
      </button>
    </ModalButton>
  );

  switch (recommendation.type) {
    case "upgrade":
      return (
        <>
          {changePlan("upgrade", plan ?? recommendation.plan)}
          <button type="button" className="plan-hero__ghost w-100" onClick={() => showTab("compare")}>
            Compare all plans
          </button>
        </>
      );
    case "renew":
      return (
        <>
          {changePlan("renew", plan ?? recommendation.plan)}
          <button type="button" className="plan-hero__ghost w-100" onClick={() => showTab("plans")}>
            See bigger plans
          </button>
        </>
      );
    case "top_plan":
      return (
        <>
          <a href={SALES_CONTACT_URL} className="plan-hero__cta w-100 text-center text-decoration-none">
            {recommendation.cta_text}
          </a>
          <button type="button" className="plan-hero__ghost w-100" onClick={() => showTab("usage")}>
            See usage
          </button>
        </>
      );
    default:
      return (
        <>
          <button type="button" className="plan-hero__cta w-100" onClick={() => showTab("plans")}>
            {recommendation.cta_text ?? "Compare plans"}
          </button>
          {subscription && (
            <button type="button" className="plan-hero__ghost w-100" onClick={() => showTab("usage")}>
              See usage
            </button>
          )}
        </>
      );
  }
}

function PlansPanel({ plans, currentPlan, subscription, renewalDue, focusKeys }) {
  return (
    <div className="d-flex flex-column gap-4">
      <div className="plan-grid">
        {plans.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            focusKeys={focusKeys}
            cta={
              <PlanCta
                plan={plan}
                currentPlan={currentPlan}
                subscription={subscription}
                renewalDue={renewalDue}
                focusKeys={focusKeys}
              />
            }
            details={
              <ModalButton action={{ modalContent: PlanDetailsDialog }} rowData={{ plan }} size="md">
                <button type="button" className="plan-card__link">See all limits</button>
              </ModalButton>
            }
          />
        ))}
      </div>

      <div className="d-grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(14rem, 1fr))" }}>
        {PLAN_PROMISES.map((promise) => {
          const PromiseIcon = PROMISE_ICONS[promise.icon];
          return (
            <div key={promise.title} className="d-flex flex-row gap-3 align-items-start">
              <div className="d-grid rounded-3 bg-primary-50 text-primary-600 flex-shrink-0" style={{ width: "2.25rem", height: "2.25rem", placeItems: "center" }}>
                <PromiseIcon size={16} />
              </div>
              <div className="d-flex flex-column">
                <span className="fw-semibold font-size-sm">{promise.title}</span>
                <span className="font-size-xs text-iron-500" style={{ lineHeight: 1.5 }}>{promise.description}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PlanCta({ plan, currentPlan, subscription, renewalDue, focusKeys }) {
  const open = (mode, label, primary) => (
    <ModalButton
      classname="w-100"
      action={{ modalContent: ChangePlanDialog }}
      rowData={{ mode, plan, currentPlan, subscription, focusKeys }}
      size="md"
    >
      <button type="button" className={`plan-card__cta ${primary ? "plan-card__cta--primary" : ""}`}>
        {label}
      </button>
    </ModalButton>
  );

  if (plan.action === "current") {
    return renewalDue ? open("renew", "Renew plan", true) : (
      <button type="button" className="plan-card__cta" disabled>
        Your current plan
      </button>
    );
  }
  if (plan.action === "upgrade") {
    return open("upgrade", `Upgrade to ${plan.name}`, plan.is_recommended);
  }
  return (
    <button type="button" className="plan-card__cta" disabled title="Downgrades are handled by our support team">
      {plan.action === "downgrade" ? "Below your current plan" : "Available at sign-up"}
    </button>
  );
}

function UsagePanel({ usage, plans, currentPlan }) {
  if (!usage.length) {
    return (
      <EmptyState
        mascot="empty"
        height="16rem"
        mascotHeight="6rem"
        title="No usage to show yet"
        description="Usage appears here once your school has an active subscription."
      />
    );
  }

  // the cheapest bigger plan that raises each feature's limit
  const nextPlanFor = (row) => {
    const bigger = plans.filter((plan) => currentPlan && plan.price > currentPlan.price);
    for (const plan of bigger) {
      const feature = plan.features.find((f) => f.key === row.key);
      if (feature && (feature.unlimited || feature.value > (row.limit ?? 0))) {
        return { name: plan.name, value: feature.value, unlimited: feature.unlimited };
      }
    }
    return null;
  };

  return (
    <div className="usage-grid">
      {usage.map((row) => (
        <UsageCard key={row.key} row={row} nextPlan={nextPlanFor(row)} />
      ))}
    </div>
  );
}

function PageSkeleton() {
  return (
    <div className="d-flex flex-column gap-4">
      <RectangleSkeleton height="15rem" />
      <div className="d-grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(13rem, 1fr))" }}>
        {[...Array(4)].map((_, index) => (
          <RectangleSkeleton key={index} height="4.5rem" />
        ))}
      </div>
      <div className="plan-grid">
        {[...Array(4)].map((_, index) => (
          <RectangleSkeleton key={index} height="22rem" />
        ))}
      </div>
    </div>
  );
}
