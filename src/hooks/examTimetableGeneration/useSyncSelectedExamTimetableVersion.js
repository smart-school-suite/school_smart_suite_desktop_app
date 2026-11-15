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
  return useSyncSelectedTimetableVersion({
    stateKey: "examTimetable",
    setVersion: setExamTimetableVersion,
    useVersions: useGetExamTimetableVersions,
    keys: EXAM_TIMETABLE_KEYS,
  });
}

/** The same for any timetable of exams (see TimetableKind). */
export function useSyncSelectedTimetableVersion({ stateKey, setVersion, useVersions, keys }) {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const examId = useSelector((state) => state[stateKey].exam?.id);
  const selected = useSelector((state) => state[stateKey].timetableVersion);
  const { data, isSuccess, isFetching, dataUpdatedAt } = useVersions(examId);
  const previousStatuses = useRef({});

  useEffect(() => {
    previousStatuses.current = {};
  }, [examId]);

  useEffect(() => {
    if (!isSuccess) return;
    const versions = data?.data ?? [];

    versions.forEach((version) => {
      if (previousStatuses.current[version.id] === SCHEDULER_STATUS.GENERATING && !isGenerating(version)) {
        [keys.slots, keys.solutions, keys.activationCheck].forEach((key) =>
          queryClient.invalidateQueries({ queryKey: [key, version.id] }),
        );
      }
    });
    previousStatuses.current = Object.fromEntries(versions.map((version) => [version.id, version.scheduler_status]));

    const fresh = selected ? versions.find((version) => version.id === selected.id) : null;
    if (fresh) {
      if (!sameVersion(fresh, selected)) dispatch(setVersion(fresh));
      return;
    }
    // A version just created by "Generate" may not be in this list yet.
    if (selected && isFetching) return;

    const fallback = versions.find((version) => version.is_latest) ?? versions[0] ?? null;
    if (!sameVersion(fallback, selected)) dispatch(setVersion(fallback));
  }, [dataUpdatedAt, isSuccess, isFetching, selected, dispatch, queryClient, setVersion, keys]);
}
