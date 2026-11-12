import { CircleX } from "lucide-react";
import ParticipantIdentity from "../../components/Election/ParticipantIdentity";
import StatusPill from "../../components/Election/StatusPill";
import EmptyState from "../../components/errors/EmptyState";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { useGetParticipantElectionHistory } from "../../hooks/electionOffice/useGetParticipantElectionHistory";
import {
  APPLICATION_STATUS,
  APPOINTMENT_TYPE,
  CANDIDATE_STATUS,
  OFFICE_HOLDER_STATUS,
  formatElectionDate,
  serverErrorCopy,
} from "../../utils/election/electionDisplay";

function Section({ title, empty, children, count }) {
  return (
    <div className="d-flex flex-column gap-2">
      <span className="text-iron-500 font-size-xs fw-semibold text-uppercase" style={{ letterSpacing: "0.04em" }}>
        {title} · {count}
      </span>
      {count === 0 ? <span className="text-iron-400 font-size-sm">{empty}</span> : children}
    </div>
  );
}

function Row({ title, subtitle, pill }) {
  return (
    <div className="d-flex flex-row align-items-center justify-content-between gap-2 border rounded-3 px-2 py-2">
      <div className="d-flex flex-column" style={{ minWidth: 0 }}>
        <span className="fw-medium font-size-sm text-truncate">{title}</span>
        <span className="text-iron-500 font-size-xs text-truncate">{subtitle}</span>
      </div>
      {pill}
    </div>
  );
}

/** Applications, candidacies and offices of one person. rowData: { type, id, name, person } */
export default function ParticipantHistoryDialog({ rowData, handleClose }) {
  const { data, isLoading, error } = useGetParticipantElectionHistory(rowData?.type, rowData?.id);
  const history = data?.data;
  return (
    <div className="w-100 d-flex flex-column">
      <div className="border-bottom rounded-top-4 px-3 py-2 d-flex flex-row align-items-center justify-content-between bg-iron-50">
        <span className="font-size-sm fw-semibold">Election history</span>
        <button type="button" onClick={() => handleClose?.()} className="border-none border rounded-circle bg-transparent p-0 d-grid" style={{ width: "2rem", height: "2rem", placeItems: "center" }} aria-label="Close">
          <CircleX size={16} />
        </button>
      </div>
      <div className="p-3 d-flex flex-column gap-3">
        <ParticipantIdentity person={rowData?.person} name={rowData?.name ?? history?.name} type={rowData?.type} />
        {isLoading ? (
          [...Array(3)].map((_, index) => <RectangleSkeleton key={index} height="3rem" />)
        ) : error ? (
          <EmptyState mascot="error" height="14rem" mascotHeight="6rem" {...serverErrorCopy(error, "Unable to load history", "Something went wrong while loading this person's election history.")} />
        ) : (
          <>
            <Section title="Offices held" count={history?.offices?.length ?? 0} empty="Has not held an office yet.">
              {history?.offices?.map((office) => (
                <Row
                  key={office.id}
                  title={`${office.position?.name} · ${APPOINTMENT_TYPE[office.appointment_type]?.label}`}
                  subtitle={`${formatElectionDate(office.started_at)} → ${formatElectionDate(office.ended_at ?? office.expected_end_at)}`}
                  pill={<StatusPill meta={OFFICE_HOLDER_STATUS[office.status]} />}
                />
              ))}
            </Section>
            <Section title="Candidacies" count={history?.candidacies?.length ?? 0} empty="Has not stood as a candidate.">
              {history?.candidacies?.map((candidacy) => (
                <Row key={candidacy.id} title={candidacy.position?.name} subtitle={candidacy.election?.title} pill={<StatusPill meta={CANDIDATE_STATUS[candidacy.status]} />} />
              ))}
            </Section>
            <Section title="Applications" count={history?.applications?.length ?? 0} empty="Has not applied for a position.">
              {history?.applications?.map((application) => (
                <Row key={application.id} title={application.position?.name} subtitle={application.election?.title} pill={<StatusPill meta={APPLICATION_STATUS[application.application_status]} />} />
              ))}
            </Section>
            <span className="text-iron-500 font-size-xs">Voted in {history?.elections_voted ?? 0} election(s).</span>
          </>
        )}
      </div>
    </div>
  );
}
