import JobCompletedCard from "../../components/jobs/progress/JobCompletedCard";
import JobIssueCard from "../../components/jobs/progress/JobIssueCard";
import JobProgressCard from "../../components/jobs/progress/JobProgressCard";
import JobQueuedCard from "../../components/jobs/progress/JobQueuedCard";

export const jobProgressMap = [
  {
    status: "completed",
    component: JobCompletedCard,
  },
  {
    status: "failed",
    component: JobIssueCard,
  },
  {
    status: "completed_with_issues",
    component: JobIssueCard,
  },
  {
    status: "processing",
    component: JobProgressCard,
  },
  {
    status: "queued",
    component: JobQueuedCard,
  },
];
