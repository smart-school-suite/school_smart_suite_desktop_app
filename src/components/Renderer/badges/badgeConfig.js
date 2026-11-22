import { APP_STATUS } from "@/constants/status";

export const BADGE_VARIANT = Object.freeze({
  SUCCESS: "success",
  INFO: "info",
  WARNING: "warning",
  DANGER: "danger",
  NEUTRAL: "neutral",
});

export const BADGE_VARIANT_STYLES = Object.freeze({
  [BADGE_VARIANT.SUCCESS]: {
    className: "bg-fern-50 text-fern-600",
    icon: "icon-park-solid:check-one",
  },
  [BADGE_VARIANT.INFO]: {
    className: "bg-primary-50 text-primary-600",
    icon: "carbon:pending",
  },
  [BADGE_VARIANT.WARNING]: {
    className: "bg-old-lace-50 text-old-lace-600",
    icon: "icon-park-solid:caution",
  },
  [BADGE_VARIANT.DANGER]: {
    className: "bg-red-50 text-red-600",
    icon: "material-symbols:cancel-outline-rounded",
  },
  [BADGE_VARIANT.NEUTRAL]: {
    className: "bg-iron-50 text-iron-600",
    icon: "fluent-mdl2:processing-cancel",
  },
});

export const STATUS_BADGE_CONFIG = Object.freeze({
  [APP_STATUS.ACTIVE]: { variant: BADGE_VARIANT.SUCCESS },
  [APP_STATUS.INACTIVE]: { variant: BADGE_VARIANT.WARNING },
  [APP_STATUS.DISABLED]: { variant: BADGE_VARIANT.DANGER },
  [APP_STATUS.EXPIRED]: { variant: BADGE_VARIANT.NEUTRAL, icon: "pajamas:expire" },
  [APP_STATUS.ENDED]: { variant: BADGE_VARIANT.NEUTRAL },

  [APP_STATUS.DRAFT]: {
    variant: BADGE_VARIANT.INFO,
    icon: "carbon:license-maintenance-draft",
  },
  [APP_STATUS.SCHEDULED]: {
    variant: BADGE_VARIANT.INFO,
    icon: "ant-design:schedule-outlined",
  },
  [APP_STATUS.NOT_SCHEDULED]: { variant: BADGE_VARIANT.WARNING },
  [APP_STATUS.NO_SCHEDULE]: { variant: BADGE_VARIANT.WARNING },
  [APP_STATUS.UPCOMING]: {
    variant: BADGE_VARIANT.INFO,
    icon: "ant-design:schedule-outlined",
  },
  [APP_STATUS.ONGOING]: { variant: BADGE_VARIANT.SUCCESS },
  [APP_STATUS.IN_PROGRESS]: { variant: BADGE_VARIANT.INFO, label: "In Progress" },
  [APP_STATUS.FINISHED]: { variant: BADGE_VARIANT.NEUTRAL },

  [APP_STATUS.QUEUED]: { variant: BADGE_VARIANT.INFO, icon: "mdi:clock-outline" },
  [APP_STATUS.PENDING]: { variant: BADGE_VARIANT.INFO },
  [APP_STATUS.PENDING_REVIEW]: { variant: BADGE_VARIANT.INFO },
  [APP_STATUS.PENDING_EVALUATION]: { variant: BADGE_VARIANT.WARNING },
  [APP_STATUS.EVALUATING]: { variant: BADGE_VARIANT.INFO },
  [APP_STATUS.PROCESSING]: { variant: BADGE_VARIANT.INFO },
  [APP_STATUS.GENERATING]: { variant: BADGE_VARIANT.INFO },
  [APP_STATUS.COMPLETED]: { variant: BADGE_VARIANT.SUCCESS },
  [APP_STATUS.COMPLETED_WITH_ISSUES]: { variant: BADGE_VARIANT.WARNING },
  [APP_STATUS.PARTIAL]: { variant: BADGE_VARIANT.WARNING },
  [APP_STATUS.PARTIAL_SUCCESS]: { variant: BADGE_VARIANT.WARNING },
  [APP_STATUS.OPTIMAL]: { variant: BADGE_VARIANT.SUCCESS },
  [APP_STATUS.CANCELLED]: { variant: BADGE_VARIANT.WARNING, icon: "iconoir:cancel" },
  [APP_STATUS.FAILED]: { variant: BADGE_VARIANT.DANGER },
  [APP_STATUS.ERROR]: { variant: BADGE_VARIANT.DANGER },

  [APP_STATUS.APPROVED]: { variant: BADGE_VARIANT.SUCCESS },
  [APP_STATUS.REJECTED]: { variant: BADGE_VARIANT.DANGER },
  [APP_STATUS.WITHDRAWN]: {
    variant: BADGE_VARIANT.NEUTRAL,
    icon: "icon-park-outline:back",
  },
  [APP_STATUS.DISQUALIFIED]: { variant: BADGE_VARIANT.WARNING },
  [APP_STATUS.WON]: { variant: BADGE_VARIANT.SUCCESS },
  [APP_STATUS.LOST]: { variant: BADGE_VARIANT.NEUTRAL },

  [APP_STATUS.ELIGIBLE]: { variant: BADGE_VARIANT.SUCCESS },
  [APP_STATUS.INELIGIBLE]: { variant: BADGE_VARIANT.DANGER },
  [APP_STATUS.CLEARED]: { variant: BADGE_VARIANT.SUCCESS },
  [APP_STATUS.BLOCKED]: { variant: BADGE_VARIANT.DANGER },
  [APP_STATUS.ALUMNI]: { variant: BADGE_VARIANT.SUCCESS },
  [APP_STATUS.CONTINUING]: { variant: BADGE_VARIANT.SUCCESS },
  [APP_STATUS.PROMOTED]: { variant: BADGE_VARIANT.SUCCESS },
  [APP_STATUS.GRADUATED]: { variant: BADGE_VARIANT.SUCCESS },
  [APP_STATUS.REPEATED]: { variant: BADGE_VARIANT.WARNING },
  [APP_STATUS.EXCLUDED]: { variant: BADGE_VARIANT.DANGER },
  [APP_STATUS.PASSED]: { variant: BADGE_VARIANT.SUCCESS },

  [APP_STATUS.EVALUATED]: { variant: BADGE_VARIANT.SUCCESS },
  [APP_STATUS.NOT_EVALUATED]: { variant: BADGE_VARIANT.INFO },
  [APP_STATUS.PUBLISHED]: { variant: BADGE_VARIANT.SUCCESS },
  [APP_STATUS.READY_TO_PUBLISH]: { variant: BADGE_VARIANT.SUCCESS },

  [APP_STATUS.ASSIGNED]: { variant: BADGE_VARIANT.SUCCESS },
  [APP_STATUS.UNASSIGNED]: { variant: BADGE_VARIANT.WARNING },
  [APP_STATUS.NOT_ASSIGNED]: { variant: BADGE_VARIANT.WARNING },
  [APP_STATUS.AVAILABLE]: { variant: BADGE_VARIANT.SUCCESS },
  [APP_STATUS.UNAVAILABLE]: {
    variant: BADGE_VARIANT.WARNING,
    icon: "ci:triangle-warning",
  },
  [APP_STATUS.CONFIGURED]: { variant: BADGE_VARIANT.SUCCESS },
  [APP_STATUS.NOT_CONFIGURED]: { variant: BADGE_VARIANT.WARNING },
  [APP_STATUS.CREATED]: { variant: BADGE_VARIANT.SUCCESS },
  [APP_STATUS.NOT_CREATED]: { variant: BADGE_VARIANT.WARNING },
  [APP_STATUS.ADDED]: { variant: BADGE_VARIANT.SUCCESS },
  [APP_STATUS.NOT_ADDED]: { variant: BADGE_VARIANT.WARNING },
  [APP_STATUS.ACCESSED]: { variant: BADGE_VARIANT.SUCCESS },
  [APP_STATUS.NOT_ACCESSED]: { variant: BADGE_VARIANT.WARNING },
  [APP_STATUS.USED]: { variant: BADGE_VARIANT.NEUTRAL },
  [APP_STATUS.UNUSED]: { variant: BADGE_VARIANT.SUCCESS },

  [APP_STATUS.PAID]: { variant: BADGE_VARIANT.SUCCESS },
  [APP_STATUS.UNPAID]: { variant: BADGE_VARIANT.WARNING },
  [APP_STATUS.NOT_PAID]: { variant: BADGE_VARIANT.WARNING },
  [APP_STATUS.OWING]: { variant: BADGE_VARIANT.WARNING },
  [APP_STATUS.DUE]: { variant: BADGE_VARIANT.WARNING },
  [APP_STATUS.BAD_DEBT]: { variant: BADGE_VARIANT.DANGER },
  [APP_STATUS.SUBSCRIBED]: { variant: BADGE_VARIANT.SUCCESS },
  [APP_STATUS.RENEWED]: { variant: BADGE_VARIANT.SUCCESS },

  [APP_STATUS.INFO]: { variant: BADGE_VARIANT.INFO, icon: "akar-icons:info" },
  [APP_STATUS.IMPORTANT]: {
    variant: BADGE_VARIANT.WARNING,
    icon: "codicon:important",
  },
  [APP_STATUS.URGENT]: {
    variant: BADGE_VARIANT.DANGER,
    icon: "fluent:alert-urgent-16-regular",
  },
});

export const UNKNOWN_STATUS_LABEL = "Undetermined";

export const normalizeStatus = (status) =>
  String(status ?? "")
    .trim()
    .toLowerCase()
    .replace(/[\s-]+/g, "_");

export const formatStatusLabel = (status) =>
  normalizeStatus(status)
    .split("_")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

export const getStatusBadgeConfig = (status) =>
  STATUS_BADGE_CONFIG[normalizeStatus(status)];

export function resolveBadgeConfig(status, overrides = {}) {
  const statusConfig = getStatusBadgeConfig(status) ?? {};
  const variant =
    overrides.variant ?? statusConfig.variant ?? BADGE_VARIANT.NEUTRAL;
  const variantStyle =
    BADGE_VARIANT_STYLES[variant] ?? BADGE_VARIANT_STYLES[BADGE_VARIANT.NEUTRAL];

  return {
    status: normalizeStatus(status),
    variant,
    className: variantStyle.className,
    icon: overrides.icon ?? statusConfig.icon ?? variantStyle.icon,
    label:
      overrides.label ??
      statusConfig.label ??
      (formatStatusLabel(status) || UNKNOWN_STATUS_LABEL),
  };
}
