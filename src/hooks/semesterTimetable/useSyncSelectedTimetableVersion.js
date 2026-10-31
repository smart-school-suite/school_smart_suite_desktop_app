import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTimetableVersion } from "../../Slices/SemesterTimetable/semesterTimetableSlice";
import {
  isGenerating,
  SCHEDULER_STATUS,
} from "../../utils/semesterTimetable/schedulerStatus";
import { useGetSemesterTimetableVersions } from "./useGetSemesterTimetableVersion";

const VERSION_FIELDS = [
  "id",
  "label",
  "version_number",
  "scheduler_status",
  "is_latest",
  "updated_at",
];

const sameVersion = (a, b) =>
  VERSION_FIELDS.every((field) => a?.[field] === b?.[field]);

export const invalidateVersionResults = (queryClient, versionId) => {
  [
    "timetable-slots",
    "timetable-errors",
    "parsed-semester-timetable-daignostics",
    "semester-timetable-diagnostics",
    "raw-diagnostics",
    "timetable-status",
  ].forEach((key) =>
    queryClient.invalidateQueries({ queryKey: [key, versionId] }),
  );
};

// Keeps the selected version in the store in step with the server, so the
// page always renders from the latest scheduler_status:
// - refreshes the selected version whenever the versions list changes,
// - selects the latest version when nothing (or a deleted one) is selected,
// - refetches a version's results once it leaves "generating", however that
//   was detected (realtime event or polling).
export function useSyncSelectedTimetableVersion() {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const schoolSemesterId = useSelector(
    (state) => state.semesterTimetable.schoolSemester?.id,
  );
  const selectedVersion = useSelector(
    (state) => state.semesterTimetable.timetableVersion,
  );
  const { data, isSuccess, isFetching, dataUpdatedAt } =
    useGetSemesterTimetableVersions(schoolSemesterId);
  const previousStatuses = useRef({});

  useEffect(() => {
    previousStatuses.current = {};
  }, [schoolSemesterId]);

  useEffect(() => {
    if (!isSuccess) return;
    const versions = data?.data ?? [];

    versions.forEach((version) => {
      const previous = previousStatuses.current[version.id];
      if (previous === SCHEDULER_STATUS.GENERATING && !isGenerating(version)) {
        invalidateVersionResults(queryClient, version.id);
      }
    });
    previousStatuses.current = Object.fromEntries(
      versions.map((version) => [version.id, version.scheduler_status]),
    );

    const fresh = selectedVersion
      ? versions.find((version) => version.id === selectedVersion.id)
      : null;

    if (fresh) {
      if (!sameVersion(fresh, selectedVersion)) {
        dispatch(setTimetableVersion(fresh));
      }
      return;
    }

    // The selection is not in this list. If a refetch is in flight it may be
    // a version that was just created (e.g. by "Generate"), so wait for it.
    if (selectedVersion && isFetching) return;

    const fallback =
      versions.find((version) => version.is_latest) ?? versions[0] ?? null;
    if (!sameVersion(fallback, selectedVersion)) {
      dispatch(setTimetableVersion(fallback));
    }
  }, [dataUpdatedAt, isSuccess, isFetching, selectedVersion, dispatch, queryClient]);
}
