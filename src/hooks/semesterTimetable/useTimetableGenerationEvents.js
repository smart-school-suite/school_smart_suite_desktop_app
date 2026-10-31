import { useQueryClient } from "@tanstack/react-query";
import { useChannel, useConnectionStateListener } from "ably/react";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { isFinalGenerationEvent } from "../../utils/semesterTimetable/schedulerStatus";

const EVENT_NAME = "semesterTimetable.generation";

// Listens for generation progress on the admin's timetable channel.
// Events only speed things up: the versions query is polled while a version
// is generating, so a dropped or missing final (100%) event cannot leave the
// page stuck. Returns the latest progress for the selected version.
export function useTimetableGenerationEvents(selectedVersionId) {
  const queryClient = useQueryClient();
  const schoolAdmin = useSelector((state) => state.auth?.user?.authSchoolAdmin);
  const [progress, setProgress] = useState(null);

  const channelName = `private:schoolBranch.${schoolAdmin?.school_branch_id}.schoolAdmin.${schoolAdmin?.id}.semesterTimetable`;

  const refreshVersions = useCallback(
    () =>
      queryClient.invalidateQueries({
        queryKey: ["semester-timetable-versions"],
      }),
    [queryClient],
  );

  useEffect(() => {
    setProgress(null);
  }, [selectedVersionId]);

  useChannel(channelName, EVENT_NAME, (message) => {
    const payload = message?.data?.payload;
    if (!payload) return;

    const versionId = payload.version_id ?? payload.version?.id ?? null;
    const isFinal = isFinalGenerationEvent(payload);

    if (isFinal) refreshVersions();

    // Older API builds don't send version_id on early events; treat those as
    // belonging to the selected version.
    if (versionId && selectedVersionId && versionId !== selectedVersionId) {
      return;
    }

    setProgress({
      versionId: versionId ?? selectedVersionId,
      stage: payload.stage,
      details: payload.details,
      percentage: Number(payload.percentage) || 0,
      isFinal,
      receivedAt: Date.now(),
    });
  });

  // Messages published while the connection was down are not replayed, so
  // re-read the real status from the server whenever we (re)connect.
  useConnectionStateListener("connected", refreshVersions);

  return progress?.versionId === selectedVersionId ? progress : null;
}
