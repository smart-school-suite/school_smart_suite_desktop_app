// Display helpers for the subscription page (pages/settings/Subscriptions.jsx).

export const formatMoney = (value, currency) => {
  const amount = Number(value);
  if (!Number.isFinite(amount)) return "—";
  const formatted = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(amount);
  return currency ? `${formatted} ${currency}` : formatted;
};

export const formatDate = (value) => {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

/** "Unlimited", "Included", "—" or the number. */
export const formatLimit = (feature) => {
  if (!feature) return "—";
  if (feature.limit_type === "boolean") return feature.value ? "Included" : "—";
  if (feature.unlimited) return "Unlimited";
  return new Intl.NumberFormat("en-US").format(feature.value ?? 0);
};

// Usage status → colours of the meter and label.
export const USAGE_STATUS = {
  healthy: { label: "Healthy", tone: "success", bar: "bg-fern-400" },
  warning: { label: "Getting close", tone: "warning", bar: "bg-old-lace-400" },
  critical: { label: "Almost full", tone: "danger", bar: "bg-red-400" },
  exceeded: { label: "Limit reached", tone: "danger", bar: "bg-red-500" },
  unlimited: { label: "Unlimited", tone: "primary", bar: "bg-primary-400" },
  included: { label: "Included", tone: "success", bar: "bg-fern-400" },
  locked: { label: "Not in plan", tone: "neutral", bar: "bg-iron-300" },
};

// Recommendation type → hero look and wording around the headline.
export const RECOMMENDATION_LOOK = {
  upgrade: { eyebrow: "Recommended for your school", tone: "primary", icon: "sparkles" },
  start: { eyebrow: "Our pick for you", tone: "primary", icon: "sparkles" },
  renew: { eyebrow: "Renewal due", tone: "warning", icon: "calendar" },
  stay: { eyebrow: "You're on the right plan", tone: "success", icon: "check" },
  top_plan: { eyebrow: "Beyond our biggest plan", tone: "dark", icon: "crown" },
};

/**
 * The features a plan card leads with: gains on the features the school uses
 * most (`focusKeys`, busiest first), then the biggest other gains, then the rest.
 */
export const planGains = (plan, max = 4, focusKeys = []) => {
  const features = plan?.features ?? [];
  const focus = (feature) => {
    const index = focusKeys.indexOf(feature.key);
    return index === -1 ? Infinity : index;
  };
  const size = (feature) => (feature.unlimited ? 1e9 : feature.multiplier ?? 0);
  const ups = features
    .filter((f) => f.change === "up")
    .sort((a, b) => focus(a) - focus(b) || size(b) - size(a));
  const rest = features.filter((f) => f.change !== "up").sort((a, b) => focus(a) - focus(b));
  return [...ups, ...rest].slice(0, max);
};

export const STATUS_PILL = {
  active: { label: "Active", tone: "success" },
  pending: { label: "Pending", tone: "warning" },
  expired: { label: "Expired", tone: "danger" },
  cancelled: { label: "Cancelled", tone: "neutral" },
};

// Why schools pay for a plan, shown under the plans grid.
export const PLAN_PROMISES = [
  { icon: "zap", title: "Limits that grow with you", description: "Every plan up the ladder raises the limits of the features you use most." },
  { icon: "shield", title: "No interruptions", description: "Upgrades apply instantly and keep all your data, settings and history." },
  { icon: "chart", title: "Recommendations from your usage", description: "We watch how your school uses each feature and suggest a plan only when it pays off." },
];

// Where "Talk to sales" goes (contact listed in the README).
export const SALES_CONTACT_URL = "mailto:eduamange@info.com?subject=Custom%20plan%20for%20our%20school";
