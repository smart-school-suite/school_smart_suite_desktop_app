import { useQueryClient } from "@tanstack/react-query";
import { useChannel, useConnectionStateListener } from "ably/react";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { isFinalGenerationEvent } from "../../utils/semesterTimetable/schedulerStatus";
import { EXAM_TIMETABLE_KEYS } from "./queries";

const EVENT_NAME = "examTimetable.generation";

// Generation progress on the admin's exam timetable channel. Events only make
// the page react faster; the versions list is polled while generating.
export function useExamTimetableGenerationEvents(selectedVersionId) {
  const queryClient = useQueryClient();
  const schoolAdmin = useSelector((state) => state.auth?.user?.authSchoolAdmin);
  const [progress, setProgress] = useState(null);
  const channelName = `private:schoolBranch.${schoolAdmin?.school_branch_id}.schoolAdmin.${schoolAdmin?.id}.examTimetable`;

  const refreshVersions = useCallback(
    () => queryClient.invalidateQueries({ queryKey: [EXAM_TIMETABLE_KEYS.versions] }),
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
    if (versionId && selectedVersionId && versionId !== selectedVersionId) return;
    setProgress({
      versionId: versionId ?? selectedVersionId,
      stage: payload.stage,
      details: payload.details,
      percentage: Number(payload.percentage) || 0,
      isFinal,
      receivedAt: Date.now(),
    });
  });

  // Events published while disconnected are not replayed: re-read the status.
  useConnectionStateListener("connected", refreshVersions);

  return progress?.versionId === selectedVersionId ? progress : null;
}
