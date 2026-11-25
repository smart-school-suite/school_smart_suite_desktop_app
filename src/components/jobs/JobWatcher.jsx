import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { getJobDetails } from "../../services/job";
import {
  getTrackedJobs,
  isJobFinished,
  notifyJobUpdate,
  subscribeToJobs,
  untrackJob,
} from "../../utils/jobs/jobTracker";
import ToastDanger from "../Toast/ToastDanger";
import ToastSuccess from "../Toast/ToastSuccess";
import ToastWarning from "../Toast/ToastWarning";

/** How often a running job is checked. */
const POLL_INTERVAL_MS = 4000;
/** Stop following a job after this long; the jobs popover still shows it. */
const GIVE_UP_AFTER_MS = 3 * 60 * 60 * 1000;

const finishedToast = (job) => {
  const title = job.title ?? "Background job";
  const description = job.summary ?? job.stage ?? "";

  if (job.status === "completed") {
    return <ToastSuccess title={`${title} finished`} description={description} />;
  }
  if (job.status === "completed_with_issues") {
    return (
      <ToastWarning
        title={`${title} finished with issues`}
        description={`${description} Open Jobs to see what needs attention.`}
      />
    );
  }
  return (
    <ToastDanger
      title={`${title} failed`}
      description={job.error_message ?? description}
    />
  );
};

/**
 * Follows every job started from this window (see trackJob) until it
 * finishes, by asking the API, so the outcome is known even when the live
 * event is missed. When a job finishes it tells the person and refreshes the
 * data the job changed. Mounted once, in the main layout.
 */
function JobWatcher() {
  const queryClient = useQueryClient();
  const inFlight = useRef(false);

  useEffect(() => {
    let timer;

    const check = async () => {
      if (inFlight.current) return;
      inFlight.current = true;

      try {
        const entries = getTrackedJobs();
        await Promise.all(
          entries.map(async ({ job: trackedJob, queryKeys = [], trackedAt }) => {
            if (Date.now() - trackedAt > GIVE_UP_AFTER_MS) {
              untrackJob(trackedJob.id);
              return;
            }

            let job;
            try {
              job = (await getJobDetails(trackedJob.id))?.data;
            } catch (error) {
              // The job was deleted or belongs to someone else: stop following it.
              if (error?.response?.status === 404) untrackJob(trackedJob.id);
              return;
            }
            if (!job) return;

            notifyJobUpdate("updated", job);

            if (!isJobFinished(job)) return;

            untrackJob(job.id);
            queryKeys.forEach((queryKey) => queryClient.invalidateQueries({ queryKey }));
            queryClient.invalidateQueries({ queryKey: ["jobs"] });
            queryClient.invalidateQueries({ queryKey: ["job-errors", job.id] });
            notifyJobUpdate("finished", job);
            toast.custom(finishedToast(job), { duration: 8000 });
          }),
        );
      } finally {
        inFlight.current = false;
      }
    };

    const schedule = () => {
      clearInterval(timer);
      if (getTrackedJobs().length > 0) {
        timer = setInterval(check, POLL_INTERVAL_MS);
      }
    };

    // A job started (or a live event arrived): check soon, then keep polling.
    const unsubscribe = subscribeToJobs(({ type }) => {
      if (type === "started") {
        schedule();
        setTimeout(check, 1500);
      }
      if (type === "finished") schedule();
    });

    schedule();
    check();

    return () => {
      clearInterval(timer);
      unsubscribe();
    };
  }, [queryClient]);

  return null;
}

export default JobWatcher;
