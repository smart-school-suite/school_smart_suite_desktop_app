import { format, formatDistanceToNowStrict, isValid, parseISO } from "date-fns";

// Tone → utility classes (src/styles/utility.css).
export const TONE_CLASSES = {
  neutral: "bg-iron-100 text-iron-700",
  primary: "bg-primary-50 text-primary-600",
  success: "bg-fern-50 text-fern-600",
  warning: "bg-old-lace-50 text-old-lace-700",
  danger: "bg-red-50 text-red-600",
};

export const ELECTION_STATUS = {
  draft: {
    label: "Draft",
    tone: "neutral",
    description: "Only administrators can see this election. Configure it, then publish it.",
  },
  upcoming: {
    label: "Upcoming",
    tone: "primary",
    description: "Published. Applications open on the scheduled date.",
  },
  application_open: {
    label: "Applications open",
    tone: "primary",
    description: "Eligible participants can apply for the available positions.",
  },
  application_closed: {
    label: "Under review",
    tone: "warning",
    description: "Applications are closed. Review them before voting starts.",
  },
  voting_open: {
    label: "Voting live",
    tone: "success",
    description: "Eligible voters are casting their ballots.",
  },
  voting_closed: {
    label: "Voting closed",
    tone: "warning",
    description: "Ballots are counted. Review the results and publish them.",
  },
  completed: {
    label: "Completed",
    tone: "success",
    description: "Results are published and winners hold office.",
  },
  cancelled: {
    label: "Cancelled",
    tone: "danger",
    description: "This election was cancelled. Its records are kept for history.",
  },
};

export const electionStatusMeta = (status) =>
  ELECTION_STATUS[status] ?? { label: status ?? "Unknown", tone: "neutral", description: "" };

// Ordered phases of the lifecycle, used by the timeline and the card progress.
export const ELECTION_PHASES = [
  { key: "setup", label: "Setup", statuses: ["draft", "upcoming"] },
  { key: "applications", label: "Applications", statuses: ["application_open"] },
  { key: "review", label: "Review", statuses: ["application_closed"] },
  { key: "voting", label: "Voting", statuses: ["voting_open"] },
  { key: "results", label: "Results", statuses: ["voting_closed", "completed"] },
];

export const phaseIndexOf = (status) => {
  if (status === "completed") return ELECTION_PHASES.length;
  const index = ELECTION_PHASES.findIndex((phase) => phase.statuses.includes(status));
  return index === -1 ? 0 : index;
};

export const STATUS_FILTERS = [
  { key: "all", label: "All", statuses: null },
  { key: "draft", label: "Drafts", statuses: ["draft"] },
  { key: "active", label: "In progress", statuses: ["upcoming", "application_open", "application_closed", "voting_open", "voting_closed"] },
  { key: "completed", label: "Completed", statuses: ["completed"] },
  { key: "cancelled", label: "Cancelled", statuses: ["cancelled"] },
];

export const APPLICATION_STATUS = {
  pending: { label: "Pending", tone: "warning" },
  approved: { label: "Approved", tone: "success" },
  rejected: { label: "Rejected", tone: "danger" },
  withdrawn: { label: "Withdrawn", tone: "neutral" },
};

export const CANDIDATE_STATUS = {
  active: { label: "Standing", tone: "success" },
  disqualified: { label: "Disqualified", tone: "danger" },
  withdrawn: { label: "Withdrawn", tone: "neutral" },
};

export const OFFICE_HOLDER_STATUS = {
  scheduled: { label: "Starts soon", tone: "primary" },
  active: { label: "In office", tone: "success" },
  completed: { label: "Tenure completed", tone: "neutral" },
  terminated: { label: "Ended early", tone: "danger" },
};

export const APPOINTMENT_TYPE = {
  elected: { label: "Elected", tone: "primary" },
  appointed: { label: "Appointed", tone: "warning" },
  replacement: { label: "Replacement", tone: "neutral" },
};

export const PARTICIPANT_TYPES = {
  student: { label: "Student", plural: "Students" },
  teacher: { label: "Teacher", plural: "Teachers" },
  school_admin: { label: "Administrator", plural: "Administrators" },
};

export const participantTypeLabel = (type) => PARTICIPANT_TYPES[type]?.label ?? "Participant";

export const personName = (person, fallback = "Unnamed") =>
  person?.name ||
  [person?.first_name, person?.last_name].filter(Boolean).join(" ") ||
  person?.username ||
  fallback;

const toDate = (value) => {
  if (!value) return null;
  const date = value instanceof Date ? value : parseISO(String(value).replace(" ", "T"));
  return isValid(date) ? date : null;
};

export const formatElectionDate = (value, pattern = "d MMM yyyy") => {
  const date = toDate(value);
  return date ? format(date, pattern) : "—";
};

export const formatElectionDateTime = (value) => formatElectionDate(value, "d MMM yyyy, HH:mm");

export const formatRange = (start, end) =>
  `${formatElectionDate(start, "d MMM")} – ${formatElectionDate(end, "d MMM yyyy")}`;

export const relativeTo = (value) => {
  const date = toDate(value);
  return date ? formatDistanceToNowStrict(date, { addSuffix: true }) : null;
};

/** The next milestone of an election, e.g. "Voting opens in 3 days". */
export const nextMilestone = (election) => {
  if (!election) return null;
  const at = (label, value) => {
    const relative = relativeTo(value);
    return relative ? `${label} ${relative}` : null;
  };
  switch (election.status) {
    case "draft":
      return "Not published yet";
    case "upcoming":
      return at("Applications open", election.application_start);
    case "application_open":
      return at("Applications close", election.application_end);
    case "application_closed":
      return at("Voting opens", election.voting_start);
    case "voting_open":
      return at("Voting closes", election.voting_end);
    case "voting_closed":
      return "Results waiting to be published";
    case "completed":
      return at("Results published", election.results_published_at);
    default:
      return null;
  }
};

// Server errors arrive as { response: { data: { errors: { title, description } } } }.
export const serverErrorCopy = (error, fallbackTitle, fallbackDescription) => ({
  title: error?.response?.data?.errors?.title || fallbackTitle,
  description: error?.response?.data?.errors?.description || fallbackDescription,
});

// Search: every word of the query must appear in one of the given fields.
export const matchesQuery = (fields, query) => {
  const terms = (query ?? "").toLowerCase().trim().split(/\s+/).filter(Boolean);
  if (terms.length === 0) return true;
  const text = fields.filter(Boolean).join(" ").toLowerCase();
  return terms.every((term) => text.includes(term));
};
