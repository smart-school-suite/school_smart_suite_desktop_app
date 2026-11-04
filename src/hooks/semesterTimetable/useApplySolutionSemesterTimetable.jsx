import { useMutation, useQueryClient } from "@tanstack/react-query";
import { applySolution } from "../../services/semesterTimetable";
import { SEMESTER_TIMETABLE_SOLUTIONS_KEY } from "./useGetSemesterTimetableSolutions";

// POST semester-timetable/version/{versionId}/solutions/apply
// body: { solution_ids: string[] } — one option id per problem.
// The API creates and generates a new version; the source version is untouched.
// Errors are shown inline by the caller (drawer), so no toast here.
export const useApplySemesterTimetableSolutions = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ versionId, solutionIds }) =>
      applySolution(versionId, { solution_ids: solutionIds }),
    onSuccess: (_response, { versionId }) => {
      queryClient.invalidateQueries({
        queryKey: ["semester-timetable-versions"],
      });
      queryClient.invalidateQueries({
        queryKey: [SEMESTER_TIMETABLE_SOLUTIONS_KEY, versionId],
      });
    },
    onError: (_error, { versionId }) => {
      // A 404 means the stored solutions changed; refresh them.
      queryClient.invalidateQueries({
        queryKey: [SEMESTER_TIMETABLE_SOLUTIONS_KEY, versionId],
      });
    },
  });
};
