import { APP_STATUS } from "@/constants/status";
import { BADGE_VARIANT } from "./badgeConfig";

const { SUCCESS, PRIMARY, WARNING, DANGER, NEUTRAL } = BADGE_VARIANT;

const booleanStatusMap = (whenTrue, whenFalse) => ({
  true: whenTrue,
  1: whenTrue,
  false: whenFalse,
  0: whenFalse,
});

export const BADGE_CONTEXT = Object.freeze({
  ACADEMIC_PERIOD: "academicPeriod",
  ACTIVATION_CODE: "activationCode",
  CARRY_OVER: "carryOver",
  CONFIGURATION: "configuration",
  ELECTION: "election",
  ELECTION_APPLICATION: "electionApplication",
  ELECTION_CANDIDATE: "electionCandidate",
  EVALUATION: "evaluation",
  GRADUATION_CEREMONY: "graduationCeremony",
  OFFICE_HOLDER: "officeHolder",
  PROMOTION_OUTCOME: "promotionOutcome",
  RESULT_PUBLICATION: "resultPublication",
  SLOT_CHECK: "slotCheck",
  SLOT_PICK: "slotPick",
  SUBSCRIPTION: "subscription",
  TEACHER_ELIGIBILITY: "teacherEligibility",
  TIMETABLE_PUBLICATION: "timetablePublication",
  USAGE: "usage",
});

export const BADGE_CONTEXT_CONFIG = Object.freeze({
  [BADGE_CONTEXT.ACADEMIC_PERIOD]: {
    statuses: {
      [APP_STATUS.ONGOING]: { pulse: true },
      [APP_STATUS.RUNNING]: { label: "Ongoing", pulse: true },
    },
  },
  [BADGE_CONTEXT.ACTIVATION_CODE]: {
    statuses: {
      [APP_STATUS.EXPIRED]: { variant: DANGER },
    },
  },
  [BADGE_CONTEXT.CARRY_OVER]: {
    statusMap: booleanStatusMap(APP_STATUS.CARRY_OVER, APP_STATUS.RESIT_REGISTERED),
  },
  [BADGE_CONTEXT.CONFIGURATION]: {
    statusMap: booleanStatusMap(APP_STATUS.CONFIGURED, APP_STATUS.NOT_CONFIGURED),
  },
  [BADGE_CONTEXT.ELECTION]: {
    statuses: {
      [APP_STATUS.DRAFT]: { variant: NEUTRAL },
      [APP_STATUS.CANCELLED]: { variant: DANGER },
    },
  },
  [BADGE_CONTEXT.ELECTION_APPLICATION]: {
    statuses: {
      [APP_STATUS.PENDING]: { variant: WARNING },
    },
  },
  [BADGE_CONTEXT.ELECTION_CANDIDATE]: {
    statuses: {
      [APP_STATUS.ACTIVE]: { label: "Standing" },
    },
  },
  [BADGE_CONTEXT.EVALUATION]: {
    statusMap: booleanStatusMap(APP_STATUS.EVALUATED, APP_STATUS.NOT_EVALUATED),
  },
  [BADGE_CONTEXT.GRADUATION_CEREMONY]: {
    statuses: {
      [APP_STATUS.IN_PROGRESS]: { variant: SUCCESS },
    },
  },
  [BADGE_CONTEXT.OFFICE_HOLDER]: {
    statuses: {
      [APP_STATUS.SCHEDULED]: { label: "Starts Soon" },
      [APP_STATUS.ACTIVE]: { label: "In Office" },
      [APP_STATUS.COMPLETED]: { label: "Tenure Completed", variant: NEUTRAL },
      [APP_STATUS.TERMINATED]: { label: "Ended Early" },
    },
  },
  [BADGE_CONTEXT.PROMOTION_OUTCOME]: {
    statuses: {
      [APP_STATUS.PENDING_REVIEW]: { label: "Needs Review", variant: WARNING },
    },
  },
  [BADGE_CONTEXT.RESULT_PUBLICATION]: {
    statuses: {
      [APP_STATUS.SCHEDULED]: { icon: "iconamoon:clock-light" },
      [APP_STATUS.PENDING_EVALUATION]: { label: "Pending" },
    },
  },
  [BADGE_CONTEXT.SLOT_CHECK]: {
    statuses: {
      [APP_STATUS.INVALID]: { label: "Needs Attention" },
      [APP_STATUS.CHECKING]: { label: "Checking…" },
      [APP_STATUS.UNVERIFIED]: { label: "Not Checked" },
      [APP_STATUS.READY]: { label: "Available" },
    },
  },
  [BADGE_CONTEXT.SLOT_PICK]: {
    statuses: {
      [APP_STATUS.ASSIGNED]: { label: "Hall Assigned" },
      [APP_STATUS.BLOCKED]: { label: "Unavailable", variant: NEUTRAL },
    },
  },
  [BADGE_CONTEXT.SUBSCRIPTION]: {
    statuses: {
      [APP_STATUS.PENDING]: { variant: WARNING },
      [APP_STATUS.EXPIRED]: { variant: DANGER },
      [APP_STATUS.CANCELLED]: { variant: NEUTRAL },
    },
  },
  [BADGE_CONTEXT.TEACHER_ELIGIBILITY]: {
    statuses: {
      [APP_STATUS.CURRENT]: { label: "Current Teacher" },
      [APP_STATUS.INELIGIBLE]: { label: "Not Eligible", variant: NEUTRAL },
      [APP_STATUS.INACTIVE]: { label: "Deactivated", variant: NEUTRAL },
    },
  },
  [BADGE_CONTEXT.TIMETABLE_PUBLICATION]: {
    statusMap: booleanStatusMap(APP_STATUS.PUBLISHED, APP_STATUS.NOT_PUBLISHED),
  },
  [BADGE_CONTEXT.USAGE]: {
    statuses: {
      [APP_STATUS.WARNING]: { label: "Getting Close" },
      [APP_STATUS.CRITICAL]: { label: "Almost Full" },
      [APP_STATUS.EXCEEDED]: { label: "Limit Reached" },
      [APP_STATUS.UNLIMITED]: { variant: PRIMARY },
      [APP_STATUS.LOCKED]: { label: "Not in Plan" },
    },
  },
});
