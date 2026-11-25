/**
 * Background jobs started from this window (imports...), followed until they
 * finish. The live "job.update" event is a bonus: JobWatcher polls each
 * tracked job, so a missed event never leaves a job looking stuck.
 *
 * Tracked jobs are kept in sessionStorage so a reload keeps following them.
 */
const STORAGE_KEY = "sss.trackedJobs";
const listeners = new Set();

const read = () => {
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
};

const write = (jobs) => {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
  } catch {
    // Storage unavailable: tracking still works for this page view.
  }
};

let tracked = read();

const emit = (type, job) => listeners.forEach((listener) => listener({ type, job }));

export const FINISHED_JOB_STATUSES = ["completed", "completed_with_issues", "failed"];

export const isJobFinished = (job) =>
  Boolean(job?.is_finished) || FINISHED_JOB_STATUSES.includes(job?.status);

/**
 * Follow a job until it finishes.
 * @param {object} job The job returned by the API (needs an id).
 * @param {{queryKeys?: Array<Array>}} options queryKeys: data to refresh when it finishes.
 */
export const trackJob = (job, { queryKeys = [] } = {}) => {
  if (!job?.id) return;
  tracked = {
    ...tracked,
    [job.id]: { job, queryKeys, trackedAt: Date.now() },
  };
  write(tracked);
  emit("started", job);
};

export const untrackJob = (jobId) => {
  if (!tracked[jobId]) return;
  const { [jobId]: _removed, ...rest } = tracked;
  tracked = rest;
  write(tracked);
};

export const getTrackedJobs = () => Object.values(tracked);

/** Let other parts of the app (the jobs popover) know a job changed. */
export const notifyJobUpdate = (type, job) => emit(type, job);

/** @returns {() => void} unsubscribe */
export const subscribeToJobs = (listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};
