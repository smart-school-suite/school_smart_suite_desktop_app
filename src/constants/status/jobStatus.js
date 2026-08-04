export const JOB_STATUS = Object.freeze({
  PROCESSING: "processing",
  COMPLETED: "completed",
  COMPLETED_WITH_ISSUES: "completed_with_issues",
  FAILED: "failed",
  QUEUED: "queued",
});

export const JOB_STATUS_LABEL = Object.freeze({
  [JOB_STATUS.PROCESSING]: "Processing",
  [JOB_STATUS.COMPLETED]: "Completed",
  [JOB_STATUS.COMPLETED_WITH_ISSUES]: "Completed with Issues",
  [JOB_STATUS.FAILED]: "Failed",
  [JOB_STATUS.QUEUED]: "Queued",
});

export const JOB_STATUS_META = Object.freeze({
  [JOB_STATUS.PROCESSING]: {
    label: JOB_STATUS_LABEL[JOB_STATUS.PROCESSING],
    description: "Job is currently being processed",
    useCase: "Show progress indicator / disable actions",
  },
  [JOB_STATUS.COMPLETED]: {
    label: JOB_STATUS_LABEL[JOB_STATUS.COMPLETED],
    description: "Job finished successfully with no issues",
    useCase: "Show success state / enable download or next steps",
  },
  [JOB_STATUS.COMPLETED_WITH_ISSUES]: {
    label: JOB_STATUS_LABEL[JOB_STATUS.COMPLETED_WITH_ISSUES],
    description: "Job finished but some items had problems",
    useCase: "Show warning state / allow review of issues",
  },
  [JOB_STATUS.FAILED]: {
    label: JOB_STATUS_LABEL[JOB_STATUS.FAILED],
    description: "Job failed and could not be completed",
    useCase: "Show error state / allow retry or cancellation",
  },
  [JOB_STATUS.QUEUED]: {
    label: JOB_STATUS_LABEL[JOB_STATUS.QUEUED],
    description: "Job is queued for processing",
    useCase: "Show queued state / enable cancellation",
  },
});

export const DEFAULT_JOB_STATUS = JOB_STATUS.PROCESSING;
