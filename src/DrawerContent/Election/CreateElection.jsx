import { CalendarRange, GraduationCap, Settings2, Vote } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import HorizontalDashedLine from "../../components/DashedLine/HorizonetalDashedLine";
import ParticipantAudiencePicker from "../../components/Election/ParticipantAudiencePicker";
import FormErrorBanner from "../../components/errors/FormErrorBanner";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import WizardStepBar from "../../components/Wizard/WizardStepBar";
import { useCreateElection } from "../../hooks/election/useCreateElection";
import { useFormError } from "../../hooks/form/useFormError";
import { resetParticipants } from "../../Slices/election/electionSlice";
import {
  formatElectionDateTime,
} from "../../utils/election/electionDisplay";
import {
  describeAudience,
  participantsToPayload,
  validateAudience,
} from "../../utils/election/participantAudience";
import ElectionDetailsForm, {
  detailsToPayload,
  emptyElectionDetails,
} from "./ElectionDetailsForm";

const STEPS = [
  { step: "details", label: "Details" },
  { step: "voters", label: "Voters" },
  { step: "candidates", label: "Candidates" },
  { step: "review", label: "Review" },
];

const STEP_COPY = {
  details: { title: "Election details", description: "Choose the election type, academic year and schedule." },
  voters: { title: "Who can vote", description: "Voters and candidates are configured separately." },
  candidates: { title: "Who can apply", description: "People in this group can apply to stand for a position." },
  review: { title: "Review", description: "Check everything before saving the election as a draft." },
};

function ReviewRow({ icon: RowIcon, label, children }) {
  return (
    <div className="d-flex flex-row gap-3 py-2">
      <div className="d-grid rounded-3 bg-primary-50 text-primary-600 flex-shrink-0" style={{ width: "2rem", height: "2rem", placeItems: "center" }}>
        <RowIcon size={15} />
      </div>
      <div className="d-flex flex-column gap-1 font-size-sm" style={{ minWidth: 0 }}>
        <span className="text-iron-500 font-size-xs">{label}</span>
        {children}
      </div>
    </div>
  );
}

function ReviewStep({ details, participants }) {
  const voters = describeAudience(participants?.voters);
  const candidates = describeAudience(participants?.candidates);
  return (
    <div className="bg-white border rounded-4 px-3 py-2 d-flex flex-column">
      <ReviewRow icon={Settings2} label="Election">
        <span className="fw-semibold">
          {details.title || `${details.election_type?.election_title ?? "Election"} ${details.system_academic_year?.name ?? ""}`}
        </span>
        <span className="text-iron-500">
          {details.election_type?.election_title} · {details.system_academic_year?.name}
        </span>
      </ReviewRow>
      <HorizontalDashedLine dashed={false} color="#eee" thickness={0.5} />
      <ReviewRow icon={CalendarRange} label="Schedule">
        <span>Applications · {formatElectionDateTime(details.application_start)} → {formatElectionDateTime(details.application_end)}</span>
        <span>Voting · {formatElectionDateTime(details.voting_start)} → {formatElectionDateTime(details.voting_end)}</span>
      </ReviewRow>
      <HorizontalDashedLine dashed={false} color="#eee" thickness={0.5} />
      <ReviewRow icon={Vote} label="Voters">
        {voters.map((line) => <span key={line}>{line}</span>)}
      </ReviewRow>
      <HorizontalDashedLine dashed={false} color="#eee" thickness={0.5} />
      <ReviewRow icon={GraduationCap} label="Candidates">
        {candidates.map((line) => <span key={line}>{line}</span>)}
        {participants?.mustBeVoter && <span className="text-iron-500">Candidates must also be voters</span>}
        <span className="text-iron-500">
          Up to {details.max_applications_per_participant || 1} position(s) per applicant
          {details.allow_candidate_self_vote ? "" : " · no self-votes"}
        </span>
      </ReviewRow>
    </div>
  );
}

/**
 * Create election drawer. Saves the election as a draft with its voter and
 * candidate eligibility, then opens the election workspace.
 */
function CreateElection({ handleClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const participants = useSelector((state) => state.election?.participants);
  const [stepIndex, setStepIndex] = useState(0);
  const [furthestStep, setFurthestStep] = useState(0);
  const [details, setDetails] = useState(emptyElectionDetails);
  const detailsRef = useRef();
  const { mutate: createElection, isPending } = useCreateElection(handleClose);
  const { formError, errorBannerRef, setClientError, handleServerError, clearFormError } =
    useFormError("Failed To Create Election");

  // A new election never starts from the eligibility of a previous one.
  useEffect(() => {
    dispatch(resetParticipants());
  }, [dispatch]);

  const step = STEPS[stepIndex];
  const goTo = (index) => {
    clearFormError();
    setStepIndex(index);
    setFurthestStep((prev) => Math.max(prev, index));
  };

  const validateStep = async () => {
    if (step.step === "details") {
      const problems = await detailsRef.current?.validate();
      if (problems?.length) {
        setClientError("Check the election details", problems);
        return false;
      }
    }
    if (step.step === "voters" || step.step === "candidates") {
      const problem = validateAudience(participants?.[step.step], step.step);
      if (problem) {
        setClientError(problem.title, problem.message);
        return false;
      }
    }
    return true;
  };

  const handleNext = async () => {
    clearFormError();
    if (await validateStep()) goTo(stepIndex + 1);
  };

  const handleCreate = () => {
    clearFormError();
    createElection(
      { ...detailsToPayload(details), participants: participantsToPayload(participants) },
      {
        onError: handleServerError,
        onSuccess: (response) => {
          dispatch(resetParticipants());
          const id = response?.data?.id;
          if (id) navigate(`/elections/${id}`);
        },
      },
    );
  };

  const copy = STEP_COPY[step.step];
  const inTargeting = Boolean(participants?.[step.step]?.targetingContext);

  return (
    <>
      <WizardStepBar
        steps={STEPS}
        stepIndex={stepIndex}
        canJumpTo={(index) => index <= furthestStep}
        navigate={goTo}
        ariaLabel="Create election steps"
        layoutId="create-election-active-step"
      />
      <div className="d-flex flex-row align-items-center justify-content-between px-2 pt-2 font-size-sm flex-shrink-0">
        <div className="d-flex flex-column">
          <span className="fw-medium">{copy.title}</span>
          <span className="text-iron-400 font-size-xs">{copy.description}</span>
        </div>
        <span className="text-iron-500 font-size-xs text-nowrap">
          Step {stepIndex + 1} of {STEPS.length}
        </span>
      </div>
      <div className="drawer-content px-2 pt-3 pb-4">
        <FormErrorBanner ref={errorBannerRef} error={formError} onDismiss={clearFormError} className="mb-3" />
        {step.step === "details" && (
          <ElectionDetailsForm ref={detailsRef} value={details} onChange={setDetails} />
        )}
        {(step.step === "voters" || step.step === "candidates") && (
          <ParticipantAudiencePicker key={step.step} group={step.step} />
        )}
        {step.step === "review" && <ReviewStep details={details} participants={participants} />}
      </div>
      <div className="drawer-footer font-size-sm">
        <div className="d-flex flex-column w-100">
          <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.5} />
          <div className="d-flex flex-row align-items-center justify-content-between p-2">
            <button
              type="button"
              className="border-none bg-none"
              onClick={() => (stepIndex === 0 ? handleClose?.() : goTo(stepIndex - 1))}
              disabled={inTargeting}
            >
              {stepIndex === 0 ? "Cancel" : "Back"}
            </button>
            {step.step === "review" ? (
              <button
                type="button"
                className="border-none rounded-3 primary-background text-white font-size-sm px-3 py-2"
                onClick={handleCreate}
                disabled={isPending}
              >
                {isPending ? <SingleSpinner /> : "Save Draft Election"}
              </button>
            ) : (
              <button
                type="button"
                className="border-none rounded-3 primary-background text-white font-size-sm px-3 py-2"
                onClick={handleNext}
                disabled={inTargeting}
                style={{ opacity: inTargeting ? 0.6 : 1 }}
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateElection;
