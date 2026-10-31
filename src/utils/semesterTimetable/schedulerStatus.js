// Mirrors SemesterTimetableVersion::STATUS_* on the API. The version's
// scheduler_status is the source of truth for what the timetable page shows;
// realtime events only make the page react faster.
export const SCHEDULER_STATUS = Object.freeze({
  PENDING: "pending",
  GENERATING: "generating",
  OPTIMAL: "optimal",
  PARTIAL: "partial",
  FAILED: "failed",
  ERROR: "error",
});

// While a version is generating, the versions list is polled at this rate so
// the page still finishes if the final realtime event never arrives.
export const GENERATION_POLL_INTERVAL_MS = 5000;

// A job runs at most 3 tries x 120s. Past this, a version still marked
// "generating" most likely belongs to a worker that died without reporting.
export const GENERATION_STALE_AFTER_MS = 10 * 60 * 1000;

export const isGenerating = (version) =>
  version?.scheduler_status === SCHEDULER_STATUS.GENERATING;

export const hasGeneratedTimetable = (version) =>
  version?.scheduler_status === SCHEDULER_STATUS.OPTIMAL ||
  version?.scheduler_status === SCHEDULER_STATUS.PARTIAL;

export const isFinalGenerationEvent = (payload) =>
  Number(payload?.percentage) >= 100 ||
  ["completed", "partial", "failed"].includes(payload?.status);

export const isGenerationStale = (version, lastEventAt, now = Date.now()) => {
  if (!isGenerating(version)) return false;
  const startedAt = version?.updated_at ? Date.parse(version.updated_at) : NaN;
  const lastActivity = Math.max(
    Number.isNaN(startedAt) ? 0 : startedAt,
    lastEventAt ?? 0,
  );
  if (!lastActivity) return false;
  return now - lastActivity > GENERATION_STALE_AFTER_MS;
};
