import { APP_STATUS, APP_STATUS_ALIASES } from "@/constants/status";

export const BADGE_VARIANT = Object.freeze({
  SUCCESS: "success",
  PRIMARY: "primary",
  WARNING: "warning",
  DANGER: "danger",
  NEUTRAL: "neutral",
});

export const BADGE_VARIANT_STYLES = Object.freeze({
  [BADGE_VARIANT.SUCCESS]: {
    className: "bg-fern-50 text-fern-600",
    icon: "icon-park-solid:check-one",
  },
  [BADGE_VARIANT.PRIMARY]: {
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

const { SUCCESS, PRIMARY, WARNING, DANGER, NEUTRAL } = BADGE_VARIANT;

export const STATUS_BADGE_CONFIG = Object.freeze({
  [APP_STATUS.ACTIVE]: { variant: SUCCESS },
  [APP_STATUS.INACTIVE]: { variant: WARNING },
  [APP_STATUS.DISABLED]: { variant: DANGER },
  [APP_STATUS.EXPIRED]: { variant: NEUTRAL, icon: "pajamas:expire" },
  [APP_STATUS.ENDED]: { variant: NEUTRAL },
  [APP_STATUS.MAINTENANCE]: { variant: WARNING },

  [APP_STATUS.DRAFT]: { variant: PRIMARY, icon: "carbon:license-maintenance-draft" },
  [APP_STATUS.SCHEDULED]: { variant: PRIMARY, icon: "ant-design:schedule-outlined" },
  [APP_STATUS.NOT_SCHEDULED]: { variant: WARNING },
  [APP_STATUS.NO_SCHEDULE]: { variant: WARNING },
  [APP_STATUS.UPCOMING]: { variant: PRIMARY, icon: "ant-design:schedule-outlined" },
  [APP_STATUS.ONGOING]: { variant: SUCCESS },
  [APP_STATUS.IN_PROGRESS]: { variant: SUCCESS },
  [APP_STATUS.RUNNING]: { variant: SUCCESS },
  [APP_STATUS.FINISHED]: { variant: NEUTRAL },
  [APP_STATUS.HELD]: { variant: NEUTRAL },

  [APP_STATUS.QUEUED]: { variant: PRIMARY, icon: "mdi:clock-outline" },
  [APP_STATUS.PENDING]: { variant: PRIMARY },
  [APP_STATUS.PENDING_REVIEW]: { variant: PRIMARY },
  [APP_STATUS.PENDING_EVALUATION]: { variant: WARNING },
  [APP_STATUS.EVALUATING]: { variant: PRIMARY },
  [APP_STATUS.PROCESSING]: { variant: PRIMARY },
  [APP_STATUS.GENERATING]: { variant: PRIMARY },
  [APP_STATUS.COMPLETED]: { variant: SUCCESS },
  [APP_STATUS.COMPLETED_WITH_ISSUES]: { variant: WARNING },
  [APP_STATUS.PARTIAL]: { variant: WARNING },
  [APP_STATUS.PARTIAL_SUCCESS]: { variant: WARNING },
  [APP_STATUS.OPTIMAL]: { variant: SUCCESS },
  [APP_STATUS.CANCELLED]: { variant: WARNING, icon: "iconoir:cancel" },
  [APP_STATUS.TERMINATED]: { variant: DANGER },
  [APP_STATUS.FAILED]: { variant: DANGER },
  [APP_STATUS.ERROR]: { variant: DANGER },

  [APP_STATUS.APPROVED]: { variant: SUCCESS },
  [APP_STATUS.REJECTED]: { variant: DANGER },
  [APP_STATUS.WITHDRAWN]: { variant: NEUTRAL, icon: "icon-park-outline:back" },
  [APP_STATUS.DISQUALIFIED]: { variant: DANGER },
  [APP_STATUS.WON]: { variant: SUCCESS },
  [APP_STATUS.LOST]: { variant: NEUTRAL },
  [APP_STATUS.APPLICATION_OPEN]: { variant: PRIMARY, label: "Applications Open" },
  [APP_STATUS.APPLICATION_CLOSED]: { variant: WARNING, label: "Under Review" },
  [APP_STATUS.VOTING_OPEN]: { variant: SUCCESS, label: "Voting Live", pulse: true },
  [APP_STATUS.VOTING_CLOSED]: { variant: WARNING },
  [APP_STATUS.ELECTED]: { variant: PRIMARY },
  [APP_STATUS.APPOINTED]: { variant: WARNING },
  [APP_STATUS.REPLACEMENT]: { variant: NEUTRAL },

  [APP_STATUS.CURRENT]: { variant: PRIMARY },
  [APP_STATUS.ELIGIBLE]: { variant: SUCCESS },
  [APP_STATUS.INELIGIBLE]: { variant: DANGER },
  [APP_STATUS.CLEARED]: { variant: SUCCESS },
  [APP_STATUS.BLOCKED]: { variant: DANGER },
  [APP_STATUS.ALUMNI]: { variant: SUCCESS, icon: "iconoir:graduation-cap" },
  [APP_STATUS.CONTINUING]: { variant: SUCCESS },
  [APP_STATUS.PROMOTED]: { variant: SUCCESS },
  [APP_STATUS.GRADUATED]: { variant: SUCCESS },
  [APP_STATUS.REPEATED]: { variant: WARNING },
  [APP_STATUS.RETAINED]: { variant: DANGER },
  [APP_STATUS.EXCLUDED]: { variant: DANGER },
  [APP_STATUS.PASSED]: { variant: SUCCESS },
  [APP_STATUS.CARRY_OVER]: { variant: WARNING },
  [APP_STATUS.RESIT_REGISTERED]: { variant: PRIMARY },
  [APP_STATUS.RESIT_REQUIRED]: { variant: WARNING },
  [APP_STATUS.NO_RESIT]: { variant: SUCCESS },
  [APP_STATUS.HIGH_RESIT_POTENTIAL]: { variant: DANGER },
  [APP_STATUS.LOW_RESIT_POTENTIAL]: { variant: WARNING },

  [APP_STATUS.EVALUATED]: { variant: SUCCESS },
  [APP_STATUS.NOT_EVALUATED]: { variant: PRIMARY },
  [APP_STATUS.PUBLISHED]: { variant: SUCCESS, icon: "akar-icons:circle-check-fill" },
  [APP_STATUS.NOT_PUBLISHED]: { variant: WARNING },
  [APP_STATUS.READY_TO_PUBLISH]: { variant: SUCCESS, label: "Ready" },

  [APP_STATUS.ASSIGNED]: { variant: SUCCESS },
  [APP_STATUS.UNASSIGNED]: { variant: WARNING },
  [APP_STATUS.NOT_ASSIGNED]: { variant: WARNING },
  [APP_STATUS.AVAILABLE]: { variant: SUCCESS },
  [APP_STATUS.UNAVAILABLE]: { variant: WARNING, icon: "ci:triangle-warning" },
  [APP_STATUS.CONFIGURED]: { variant: SUCCESS },
  [APP_STATUS.NOT_CONFIGURED]: { variant: WARNING },
  [APP_STATUS.CREATED]: { variant: SUCCESS },
  [APP_STATUS.NOT_CREATED]: { variant: WARNING },
  [APP_STATUS.ADDED]: { variant: SUCCESS },
  [APP_STATUS.NOT_ADDED]: { variant: WARNING },
  [APP_STATUS.ACCESSED]: { variant: SUCCESS },
  [APP_STATUS.NOT_ACCESSED]: { variant: WARNING },
  [APP_STATUS.USED]: { variant: NEUTRAL },
  [APP_STATUS.UNUSED]: { variant: SUCCESS },
  [APP_STATUS.SELECTED]: { variant: PRIMARY },
  [APP_STATUS.INCOMPLETE]: { variant: NEUTRAL },
  [APP_STATUS.INVALID]: { variant: DANGER },
  [APP_STATUS.CHECKING]: { variant: NEUTRAL },
  [APP_STATUS.CONFLICT]: { variant: DANGER },
  [APP_STATUS.UNVERIFIED]: { variant: WARNING },
  [APP_STATUS.READY]: { variant: SUCCESS },

  [APP_STATUS.PAID]: { variant: SUCCESS },
  [APP_STATUS.UNPAID]: { variant: WARNING },
  [APP_STATUS.NOT_PAID]: { variant: WARNING },
  [APP_STATUS.OWING]: { variant: WARNING },
  [APP_STATUS.DUE]: { variant: WARNING },
  [APP_STATUS.BAD_DEBT]: { variant: DANGER },
  [APP_STATUS.SUBSCRIBED]: { variant: SUCCESS },
  [APP_STATUS.RENEWED]: { variant: SUCCESS },

  [APP_STATUS.HEALTHY]: { variant: SUCCESS },
  [APP_STATUS.WARNING]: { variant: WARNING },
  [APP_STATUS.CRITICAL]: { variant: DANGER },
  [APP_STATUS.EXCEEDED]: { variant: DANGER },
  [APP_STATUS.UNLIMITED]: { variant: PRIMARY },
  [APP_STATUS.INCLUDED]: { variant: SUCCESS },
  [APP_STATUS.LOCKED]: { variant: NEUTRAL },

  [APP_STATUS.INFO]: { variant: PRIMARY, icon: "akar-icons:info" },
  [APP_STATUS.IMPORTANT]: { variant: WARNING, icon: "codicon:important" },
  [APP_STATUS.URGENT]: { variant: DANGER, icon: "fluent:alert-urgent-16-regular" },
});

export const UNKNOWN_STATUS_LABEL = "Undetermined";

export const normalizeStatus = (status) => {
  const key = String(status ?? "")
    .trim()
    .toLowerCase()
    .replace(/[\s-]+/g, "_");
  return APP_STATUS_ALIASES[key] ?? key;
};

export const formatStatusLabel = (status) =>
  normalizeStatus(status)
    .split("_")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
