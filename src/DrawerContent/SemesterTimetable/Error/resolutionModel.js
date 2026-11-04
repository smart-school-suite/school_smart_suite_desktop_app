// Pure helpers for the timetable resolution drawer. They read the shape
// returned by GET semester-timetable/version/{id}/solutions:
//   { version, summary, days[{ day, day_label, issue_count, problems[] }], setup_problems[] }
// problem: { id, day, title, description, issues[], options[] }
// option:  { id, rank, recommended, title, summary, fixes, effort, checked, apply, steps[] }

export const allProblems = (days = []) =>
  days.flatMap((day) => day.problems ?? []);

export const findOption = (problem, optionId) =>
  problem?.options?.find((option) => option.id === optionId) ?? null;

export const canApplyOption = (option) => option?.apply?.possible !== false;

export const recommendedOption = (problem) =>
  (problem.options ?? []).find(
    (option) => option.recommended && canApplyOption(option),
  ) ??
  (problem.options ?? []).find(canApplyOption) ??
  null;

export const problemSeverity = (problem) =>
  (problem.issues ?? []).some((issue) => issue.severity === "blocking")
    ? "blocking"
    : "warning";

// Issue ids already claimed by selections on *other* problems. The API
// refuses two solutions that fix the same issue (422 "Solutions Overlap").
export const claimedIssueIds = (selection, problems, exceptProblemId) => {
  const claimed = new Set();
  problems.forEach((problem) => {
    if (problem.id === exceptProblemId) return;
    const option = findOption(problem, selection[problem.id]);
    option?.fixes?.issue_ids?.forEach((id) => claimed.add(id));
  });
  return claimed;
};

export const overlapsClaimed = (option, claimed) =>
  (option?.fixes?.issue_ids ?? []).some((id) => claimed.has(id));

// Drop selections that no longer exist (e.g. after the solutions refetch).
export const pruneSelection = (selection, problems) => {
  const next = {};
  problems.forEach((problem) => {
    const option = findOption(problem, selection[problem.id]);
    if (option && canApplyOption(option)) next[problem.id] = option.id;
  });
  const same =
    Object.keys(next).length === Object.keys(selection).length &&
    Object.keys(next).every((id) => selection[id] === next[id]);
  return same ? selection : next;
};

// Request body for POST .../solutions/apply, in problem order.
export const toApplyPayload = (selection, problems) =>
  problems
    .map((problem) => selection[problem.id])
    .filter(Boolean);

export const apiError = (error) => ({
  title:
    error?.response?.data?.errors?.title ??
    (error?.response ? "Could not apply solutions" : "Connection problem"),
  description:
    error?.response?.data?.errors?.description ??
    (error?.response
      ? "Something went wrong while applying the chosen solutions."
      : "We could not reach the server. Check your connection and try again."),
  status: error?.response?.status ?? null,
});
