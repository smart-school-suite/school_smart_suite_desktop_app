import { useQueryClient } from "@tanstack/react-query";
import { useChannel, useConnectionStateListener } from "ably/react";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { isFinalGenerationEvent } from "../../utils/semesterTimetable/schedulerStatus";
import { EXAM_TIMETABLE_KEYS } from "./queries";

// Generation progress on the admin's exam timetable channel. Events only make
// the page react faster; the versions list is polled while generating.
export function useExamTimetableGenerationEvents(selectedVersionId) {
  return useTimetableGenerationEvents(selectedVersionId, {
    channel: "examTimetable",
    eventName: "examTimetable.generation",
    versionsKey: EXAM_TIMETABLE_KEYS.versions,
  });
}

/** Generation progress on one of the admin's timetable channels ("examTimetable", "resitTimetable"). */
export function useTimetableGenerationEvents(selectedVersionId, { channel, eventName, versionsKey }) {
  const queryClient = useQueryClient();
  const schoolAdmin = useSelector((state) => state.auth?.user?.authSchoolAdmin);
  const [progress, setProgress] = useState(null);
  const channelName = `private:schoolBranch.${schoolAdmin?.school_branch_id}.schoolAdmin.${schoolAdmin?.id}.${channel}`;

  const refreshVersions = useCallback(
    () => queryClient.invalidateQueries({ queryKey: [versionsKey] }),
    [queryClient, versionsKey],
  );

  useEffect(() => {
    setProgress(null);
  }, [selectedVersionId]);

  useChannel(channelName, eventName, (message) => {
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
