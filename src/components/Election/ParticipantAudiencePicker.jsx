import { ArrowLeft, GraduationCap, School, ShieldCheck, UserMinus, Users } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { MultiSelectAccordion } from "../Accordion/MultiSelectAccordion";
import EmptyState from "../errors/EmptyState";
import Switch from "../input/Switch";
import RectangleSkeleton from "../SkeletonPageLoader/RectangularSkeleton";
import { AudienceCard } from "../../DrawerContent/Announcement/CreateAnnouncement/AnnouncementAudience";
import { useGetAudienceSummary } from "../../hooks/Audience/useGetAudienceSummary";
import { useGetStudentAudience } from "../../hooks/Audience/useGetStudentAudience";
import { useGetTeacherAudience } from "../../hooks/Audience/useGetTeacherAudience";
import {
  resetParticipantTargetingContext,
  setMustBeVoter,
  setParticipantExclusions,
  setParticipantTargetIndividuals,
  setParticipantTargetingContext,
  setParticipantTargetSelection,
  toggleParticipantAudienceType,
} from "../../Slices/election/electionSlice";
import { ANNOUNCEMENT_TARGET_MAP } from "../../utils/maps/announcement/announcementTargetMap";
import { personName, serverErrorCopy } from "../../utils/election/electionDisplay";

const GROUP_COPY = {
  voters: {
    verb: "vote",
    noun: "voters",
    cards: {
      school_wide: "Everyone in this school — students, teachers and administrators — can vote.",
      students: "Let students vote. Target by department, specialty, level or individual students.",
      teachers: "Let teaching staff vote. Target by department, specialty, level or individual teachers.",
      schoolAdmins: "Let selected administrators vote.",
    },
  },
  candidates: {
    verb: "apply",
    noun: "candidates",
    cards: {
      school_wide: "Anyone in this school can apply to stand for a position.",
      students: "Let students apply for candidacy. Target by department, specialty, level or individual students.",
      teachers: "Let teaching staff apply for candidacy. Target by department, specialty, level or individuals.",
      schoolAdmins: "Let selected administrators apply for candidacy.",
    },
  },
};

const AUDIENCES = [
  { key: "school_wide", icon: School, title: "School-wide", countLabel: "people", info: true },
  { key: "students", icon: GraduationCap, title: "Students", countLabel: "students" },
  { key: "teachers", icon: Users, title: "Teachers", countLabel: "teachers" },
  { key: "schoolAdmins", icon: ShieldCheck, title: "Administrators", countLabel: "administrators", configureLabel: "Select administrators" },
];

const selectParticipants = (state) => state.election?.participants;

// The shared target pickers read the group currently being edited.
const selectActiveTargeting = (state) => {
  const participants = selectParticipants(state);
  return participants?.[participants?.activeGroup ?? "voters"]?.targeting;
};

function ExclusionPicker({ group, exclude }) {
  const dispatch = useDispatch();
  const { data: students, isLoading: studentsLoading } = useGetStudentAudience();
  const { data: teachers, isLoading: teachersLoading } = useGetTeacherAudience();
  const renderPerson = (person) => (
    <div className="d-flex flex-column">
      <span className="fw-medium">{personName(person)}</span>
      {person?.username && <span className="text-iron-400 font-size-xs">@{person.username}</span>}
    </div>
  );
  return (
    <div className="d-flex flex-column gap-2 bg-white border rounded-4 p-3">
      <div className="d-flex flex-row align-items-center gap-2">
        <UserMinus size={16} className="text-iron-500" />
        <span className="fw-semibold">Exclusions</span>
        <span className="text-iron-400 font-size-xs">optional</span>
      </div>
      <p className="m-0 text-iron-500 font-size-xs" style={{ lineHeight: 1.55 }}>
        Remove specific people even when their group is eligible — for example a student on suspension.
      </p>
      <MultiSelectAccordion
        label="Excluded students"
        placeholder="Select students to exclude"
        searchPlaceholder="Search students"
        items={students?.data || []}
        selectedIds={exclude?.student_ids ?? []}
        isLoading={studentsLoading}
        onChange={(ids) => dispatch(setParticipantExclusions({ group, key: "student_ids", ids }))}
        searchableKeys={["first_name", "last_name", "username", "name"]}
        renderItem={renderPerson}
      />
      <MultiSelectAccordion
        label="Excluded teachers"
        placeholder="Select teachers to exclude"
        searchPlaceholder="Search teachers"
        items={teachers?.data || []}
        selectedIds={exclude?.teacher_ids ?? []}
        isLoading={teachersLoading}
        onChange={(ids) => dispatch(setParticipantExclusions({ group, key: "teacher_ids", ids }))}
        searchableKeys={["first_name", "last_name", "username", "name"]}
        renderItem={renderPerson}
      />
    </div>
  );
}

/**
 * Chooses who belongs to one participant group of an election.
 * Voters and candidates are configured independently (group="voters" | "candidates").
 * State lives in the election slice (state.election.participants).
 *
 *   <ParticipantAudiencePicker group="voters" />
 */
export default function ParticipantAudiencePicker({ group }) {
  const dispatch = useDispatch();
  const participants = useSelector(selectParticipants);
  const audience = participants?.[group];
  const copy = GROUP_COPY[group];
  const { data: summary, isLoading, error } = useGetAudienceSummary();
  const TargetComponent = ANNOUNCEMENT_TARGET_MAP[audience?.targetingContext]?.component;

  if (TargetComponent) {
    const title = AUDIENCES.find((a) => a.key === audience.targetingContext)?.title;
    return (
      <div className="d-flex flex-column gap-2">
        <button
          type="button"
          className="border-none bg-none d-flex flex-row align-items-center gap-1 color-primary font-size-sm px-2 pt-2"
          onClick={() => dispatch(resetParticipantTargetingContext({ group }))}
        >
          <ArrowLeft size={14} />
          <span>Back to {copy.noun}</span>
        </button>
        <div className="d-flex flex-column px-2 font-size-sm">
          <span className="fw-medium">{title} who can {copy.verb}</span>
          <span className="text-iron-400 font-size-xs">
            Pick any combination; someone matching one of the selections is eligible.
          </span>
        </div>
        <div className="bg-iron-50 rounded-3 pb-4">
          <TargetComponent
            selectTargeting={selectActiveTargeting}
            setTargetIndividuals={setParticipantTargetIndividuals}
            setTargetSelection={setParticipantTargetSelection}
          />
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="d-flex flex-column gap-2">
        {[...Array(4)].map((_, index) => (
          <RectangleSkeleton key={index} height="7rem" width="100%" />
        ))}
      </div>
    );
  }

  if (error) {
    const { title, description } = serverErrorCopy(
      error,
      "Unable to load your school's audience",
      "We could not count students, teachers and administrators. Check your connection and try again.",
    );
    return <EmptyState mascot="error" height="100%" mascotHeight="6rem" title={title} description={description} />;
  }

  return (
    <div className="d-flex flex-column gap-3" role="group" aria-label={`Eligible ${copy.noun}`}>
      {AUDIENCES.map((item) => (
        <AudienceCard
          key={item.key}
          cardKey={item.key}
          icon={item.icon}
          title={item.title}
          description={copy.cards[item.key]}
          count={summary?.data?.[item.key] ?? 0}
          countLabel={item.countLabel}
          footer={
            item.info
              ? { type: "info", label: `Everyone can ${copy.verb} — no targeting needed` }
              : { type: "action", label: item.configureLabel ?? "Configure targeting" }
          }
          selected={audience?.types?.includes(item.key)}
          onSelect={() => dispatch(toggleParticipantAudienceType({ group, audienceType: item.key }))}
          onConfigure={(cardKey) => dispatch(setParticipantTargetingContext({ group, targetContext: cardKey }))}
        />
      ))}

      {group === "candidates" && (
        <div className="d-flex flex-row align-items-center justify-content-between gap-3 bg-white border rounded-4 p-3">
          <div className="d-flex flex-column">
            <span className="fw-semibold font-size-sm">Candidates must also be voters</span>
            <span className="text-iron-500 font-size-xs">
              Only people who are eligible to vote may apply for candidacy.
            </span>
          </div>
          <Switch
            checked={Boolean(participants?.mustBeVoter)}
            onChange={(checked) => dispatch(setMustBeVoter(checked))}
            aria-label="Candidates must also be voters"
          />
        </div>
      )}

      {audience?.types?.length > 0 && <ExclusionPicker group={group} exclude={audience?.exclude} />}
    </div>
  );
}
