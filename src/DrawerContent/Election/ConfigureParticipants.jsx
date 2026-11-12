import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HorizontalDashedLine from "../../components/DashedLine/HorizonetalDashedLine";
import ParticipantAudiencePicker from "../../components/Election/ParticipantAudiencePicker";
import FormErrorBanner from "../../components/errors/FormErrorBanner";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import WizardStepBar from "../../components/Wizard/WizardStepBar";
import { useConfigureElectionParticipants } from "../../hooks/election/useConfigureElectionParticipants";
import { useFormError } from "../../hooks/form/useFormError";
import { loadParticipants, resetParticipants } from "../../Slices/election/electionSlice";
import { participantsToPayload, validateAudience } from "../../utils/election/participantAudience";

const GROUPS = [
  { step: "voters", label: "Voters" },
  { step: "candidates", label: "Candidates" },
];

/**
 * Edit who can vote and who can apply for an existing election.
 * drawerData: { election } — its saved `participants` configuration is loaded.
 */
function ConfigureParticipants({ handleClose, drawerData }) {
  const election = drawerData?.election;
  const dispatch = useDispatch();
  const participants = useSelector((state) => state.election?.participants);
  const [index, setIndex] = useState(0);
  const { mutate: save, isPending } = useConfigureElectionParticipants(handleClose);
  const { formError, errorBannerRef, setClientError, handleServerError, clearFormError } =
    useFormError("Failed To Save Participants");

  useEffect(() => {
    dispatch(loadParticipants({ configuration: election?.participants }));
    return () => dispatch(resetParticipants());
  }, [dispatch, election?.id]);

  const group = GROUPS[index].step;
  const inTargeting = Boolean(participants?.[group]?.targetingContext);

  const handleSave = () => {
    clearFormError();
    for (const [position, item] of GROUPS.entries()) {
      const problem = validateAudience(participants?.[item.step], item.step);
      if (problem) {
        setIndex(position);
        setClientError(problem.title, problem.message);
        return;
      }
    }
    save({ electionId: election.id, data: participantsToPayload(participants) }, { onError: handleServerError });
  };

  return (
    <>
      <WizardStepBar
        steps={GROUPS}
        stepIndex={index}
        canJumpTo={() => !inTargeting}
        navigate={(next) => {
          clearFormError();
          setIndex(next);
        }}
        ariaLabel="Participant groups"
        layoutId="participants-active-group"
      />
      <div className="d-flex flex-column px-2 pt-2 font-size-sm flex-shrink-0">
        <span className="fw-medium">{group === "voters" ? "Who can vote" : "Who can apply for candidacy"}</span>
        <span className="text-iron-400 font-size-xs">
          Saving re-evaluates eligibility for everyone currently in your school.
        </span>
      </div>
      <div className="drawer-content px-2 pt-3 pb-4">
        <FormErrorBanner ref={errorBannerRef} error={formError} onDismiss={clearFormError} className="mb-3" />
        <ParticipantAudiencePicker key={group} group={group} />
      </div>
      <div className="drawer-footer font-size-sm">
        <div className="d-flex flex-column w-100">
          <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.5} />
          <div className="d-flex flex-row align-items-center justify-content-between p-2">
            <button type="button" className="border-none bg-none" onClick={() => handleClose?.()}>
              Cancel
            </button>
            <div className="d-flex flex-row gap-2">
              {index === 0 && (
                <button type="button" className="border rounded-3 bg-white font-size-sm px-3 py-2" onClick={() => setIndex(1)} disabled={inTargeting}>
                  Next: Candidates
                </button>
              )}
              <button
                type="button"
                className="border-none rounded-3 primary-background text-white font-size-sm px-3 py-2"
                onClick={handleSave}
                disabled={isPending || inTargeting}
                style={{ opacity: inTargeting ? 0.6 : 1 }}
              >
                {isPending ? <SingleSpinner /> : "Save Participants"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ConfigureParticipants;
