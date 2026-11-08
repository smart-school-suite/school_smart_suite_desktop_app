import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setExamTimetableVersion } from "../../Slices/ExamTimetable/examTimetableSlice";
import { isGenerating, SCHEDULER_STATUS } from "../../utils/semesterTimetable/schedulerStatus";
import { EXAM_TIMETABLE_KEYS, useGetExamTimetableVersions } from "./queries";

const FIELDS = ["id", "label", "version_number", "scheduler_status", "is_latest", "updated_at"];
const sameVersion = (a, b) => FIELDS.every((field) => a?.[field] === b?.[field]);

// Keeps the selected version in step with the server, like the semester page:
// refreshes it when the versions list changes, falls back to the latest one,
// and refetches a version's results once it leaves "generating".
export function useSyncSelectedExamTimetableVersion() {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const examId = useSelector((state) => state.examTimetable.exam?.id);
  const selected = useSelector((state) => state.examTimetable.timetableVersion);
  const { data, isSuccess, isFetching, dataUpdatedAt } = useGetExamTimetableVersions(examId);
  const previousStatuses = useRef({});

  useEffect(() => {
    previousStatuses.current = {};
  }, [examId]);

  useEffect(() => {
    if (!isSuccess) return;
    const versions = data?.data ?? [];

    versions.forEach((version) => {
      if (previousStatuses.current[version.id] === SCHEDULER_STATUS.GENERATING && !isGenerating(version)) {
        [EXAM_TIMETABLE_KEYS.slots, EXAM_TIMETABLE_KEYS.solutions, EXAM_TIMETABLE_KEYS.activationCheck].forEach((key) =>
          queryClient.invalidateQueries({ queryKey: [key, version.id] }),
        );
      }
    });
    previousStatuses.current = Object.fromEntries(versions.map((version) => [version.id, version.scheduler_status]));

    const fresh = selected ? versions.find((version) => version.id === selected.id) : null;
    if (fresh) {
      if (!sameVersion(fresh, selected)) dispatch(setExamTimetableVersion(fresh));
      return;
    }
    // A version just created by "Generate" may not be in this list yet.
    if (selected && isFetching) return;

    const fallback = versions.find((version) => version.is_latest) ?? versions[0] ?? null;
    if (!sameVersion(fallback, selected)) dispatch(setExamTimetableVersion(fallback));
  }, [dataUpdatedAt, isSuccess, isFetching, selected, dispatch, queryClient]);
}
