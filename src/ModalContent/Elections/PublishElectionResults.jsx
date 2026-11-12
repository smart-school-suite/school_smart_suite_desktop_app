import { Crown, Scale } from "lucide-react";
import { useMemo, useState } from "react";
import ParticipantIdentity from "../../components/Election/ParticipantIdentity";
import ConfirmDialog from "../../components/Modals/ConfirmDialog";
import { usePublishElectionResults } from "../../hooks/election/usePublishElectionResults";
import { useFormError } from "../../hooks/form/useFormError";

/**
 * Publish an election's results. Positions with a tie at the last seat need an
 * explicit choice of winner(s) before publishing.
 * rowData: { election, results } (results from the results endpoint)
 */
export default function PublishElectionResults({ rowData, handleClose }) {
  const results = rowData?.results ?? [];
  const tied = useMemo(() => results.filter((position) => position.requires_tie_resolution), [results]);
  const [choices, setChoices] = useState({});
  const { mutate: publish, isPending } = usePublishElectionResults(handleClose);
  const { formError, errorBannerRef, handleServerError, clearFormError } = useFormError("Failed To Publish Results");

  const openSeats = (position) =>
    position.seats - position.candidates.filter((c) => c.is_winner).length;

  const toggle = (position, candidateId) =>
    setChoices((current) => {
      const selected = new Set(current[position.position_id] ?? []);
      if (selected.has(candidateId)) selected.delete(candidateId);
      else if (selected.size < openSeats(position)) selected.add(candidateId);
      else if (openSeats(position) === 1) {
        selected.clear();
        selected.add(candidateId);
      }
      return { ...current, [position.position_id]: [...selected] };
    });

  const unresolved = tied.filter((position) => (choices[position.position_id] ?? []).length !== openSeats(position));
  const winners = results.flatMap((position) => position.candidates.filter((c) => c.is_winner).map((c) => ({ ...c, position_name: position.position_name })));

  const handlePublish = () => {
    clearFormError();
    publish(
      {
        electionId: rowData?.election?.id,
        data: {
          tie_resolutions: tied.map((position) => ({
            position_id: position.position_id,
            candidate_ids: choices[position.position_id] ?? [],
          })),
        },
      },
      { onError: handleServerError },
    );
  };

  return (
    <ConfirmDialog
      icon={Crown}
      title="Publish results"
      description="Publishing finalises the election: participants can see the results and the winners become office holders for their tenure. This cannot be undone."
      confirmLabel={unresolved.length ? `Resolve ${unresolved.length} tie${unresolved.length > 1 ? "s" : ""} first` : "Publish Results"}
      confirmDisabled={unresolved.length > 0}
      onConfirm={handlePublish}
      onCancel={handleClose}
      isPending={isPending}
      error={formError}
      errorRef={errorBannerRef}
      onDismissError={clearFormError}
    >
      {winners.length > 0 && (
        <div className="d-flex flex-column gap-2">
          <span className="text-iron-500 font-size-xs fw-semibold text-uppercase">Confirmed winners</span>
          {winners.map((winner) => (
            <ParticipantIdentity
              key={winner.candidate_id}
              person={winner.participant}
              name={winner.name}
              subtitle={`${winner.position_name} · ${winner.vote_count} vote${winner.vote_count === 1 ? "" : "s"}`}
              size="2rem"
            />
          ))}
        </div>
      )}
      {tied.map((position) => (
        <div key={position.position_id} className="d-flex flex-column gap-2 bg-old-lace-50 rounded-3 p-2">
          <div className="d-flex flex-row align-items-center gap-2 text-old-lace-800">
            <Scale size={15} />
            <span className="fw-semibold">{position.position_name}: tie for {openSeats(position)} seat(s)</span>
          </div>
          <span className="font-size-xs text-iron-600">
            Choose {openSeats(position)} winner{openSeats(position) > 1 ? "s" : ""}, for example after a run-off or a decision recorded by the electoral committee.
          </span>
          {position.candidates
            .filter((candidate) => position.tied_candidate_ids.includes(candidate.candidate_id))
            .map((candidate) => {
              const selected = (choices[position.position_id] ?? []).includes(candidate.candidate_id);
              return (
                <button
                  type="button"
                  key={candidate.candidate_id}
                  onClick={() => toggle(position, candidate.candidate_id)}
                  aria-pressed={selected}
                  className={`text-start rounded-3 p-2 bg-white border ${selected ? "border-primary-500" : ""}`}
                >
                  <ParticipantIdentity
                    person={candidate.participant}
                    name={candidate.name}
                    subtitle={`${candidate.vote_count} vote${candidate.vote_count === 1 ? "" : "s"}`}
                    size="2rem"
                    trailing={selected ? <Crown size={16} className="text-primary-500" /> : null}
                  />
                </button>
              );
            })}
        </div>
      ))}
    </ConfirmDialog>
  );
}
