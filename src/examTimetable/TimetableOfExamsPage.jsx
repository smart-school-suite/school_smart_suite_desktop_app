import { useTimetableGenerationEvents } from "../hooks/examTimetableGeneration/useExamTimetableGenerationEvents";
import { useSyncSelectedTimetableVersion } from "../hooks/examTimetableGeneration/useSyncSelectedExamTimetableVersion";
import GridWrapper from "./GridWrapper";
import { TimetableKindProvider, useKindState, useTimetableKind } from "./TimetableKindContext";
import VersionWrapper from "./VersionWrapper";

/**
 * The exam timetable page, for any timetable of exams (see kinds.js): versions
 * and constraints on the left, the picker and the generated timetable on the right.
 */
function TimetableOfExamsPage({ kind }) {
  return (
    <TimetableKindProvider value={kind}>
      <PageBody />
    </TimetableKindProvider>
  );
}

function PageBody() {
  const kind = useTimetableKind();
  const selectedVersionId = useKindState((state) => state.timetableVersion?.id ?? null);
  useSyncSelectedTimetableVersion({
    stateKey: kind.stateKey,
    setVersion: kind.actions.setVersion,
    useVersions: kind.queries.useVersions,
    keys: kind.keys,
  });
  const progress = useTimetableGenerationEvents(selectedVersionId, {
    channel: kind.events.channel,
    eventName: kind.events.eventName,
    versionsKey: kind.keys.versions,
  });

  return (
    <main className="main-container gap-2 h-100 font-size-sm">
      <div className="d-flex flex-row align-items-start flex-grow-1 h-100" style={{ minHeight: 0 }}>
        <VersionWrapper />
        <GridWrapper progress={progress} />
      </div>
    </main>
  );
}

export default TimetableOfExamsPage;
