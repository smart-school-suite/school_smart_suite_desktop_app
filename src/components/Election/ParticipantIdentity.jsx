import TeacherAvatar from "../Card/TeacherAvatar";
import { participantTypeLabel, personName } from "../../utils/election/electionDisplay";

/**
 * Avatar + name + participant type for students, teachers and administrators.
 *
 *   <ParticipantIdentity person={candidate.candidate} type="student" />
 *   <ParticipantIdentity name="Ada Admin" type="school_admin" size="2rem" subtitle="President" />
 */
export default function ParticipantIdentity({ person, name, type, subtitle, size = "2.25rem", trailing }) {
  const displayName = name || personName(person);
  return (
    <div className="d-flex flex-row align-items-center gap-2" style={{ minWidth: 0, fontSize: "0.8rem" }}>
      <TeacherAvatar teacher={person ?? { name: displayName }} size={size} />
      <div className="d-flex flex-column flex-grow-1" style={{ minWidth: 0 }}>
        <span className="fw-semibold text-truncate" title={displayName}>{displayName}</span>
        <span className="text-iron-500 font-size-xs text-truncate">
          {subtitle ?? participantTypeLabel(type)}
        </span>
      </div>
      {trailing}
    </div>
  );
}
