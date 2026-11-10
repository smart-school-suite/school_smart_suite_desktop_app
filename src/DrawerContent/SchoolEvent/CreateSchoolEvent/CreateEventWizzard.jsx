import { CREATE_SCHOOL_EVENT_STEP_FLOW } from "../../../utils/steps/schoolEvent/createSchoolEventStepFlow";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Fragment } from "react";
import { useGetSchoolEventDetails } from "../../../hooks/schoolEvent/useGetSchoolEventDetails";
import {
  resetCreateEvent,
  setCreateEventFromDraft,
} from "../../../Slices/schoolEvent/schoolEventSlice";
import RectangleSkeleton from "../../../components/SkeletonPageLoader/RectangularSkeleton";
import { NotFoundError } from "../../../components/errors/Error";
import { EventWizardContext } from "./EventWizardSteps";
import { getMissingForPublish } from "./EventReview";

/**
 * Create school event drawer. Opened with a draft event as `drawerData`, the same
 * steps edit that draft and publish it.
 */
function CreateEventWizzard({ handleClose, drawerData }) {
  const dispatch = useDispatch();
  const draftEventId = drawerData?.id ?? null;
  const moduleState = useSelector((state) => state.schoolEvent.createEvent);
  const loadedDraftId = moduleState.draftEventId;
  const [stepIndex, setStepIndex] = useState(0);
  // furthest step reached; new events can jump back to any step up to it
  const [furthestStep, setFurthestStep] = useState(0);
  // New image files stay here: File objects cannot go into the persisted store.
  const [images, setImages] = useState([]);
  // Display order of saved and new images (item keys); the first is the cover.
  const [imageOrder, setImageOrder] = useState([]);
  const {
    data: draftEvent,
    isLoading: isDraftLoading,
    error: draftError,
  } = useGetSchoolEventDetails(draftEventId);

  // Load the draft once per opening; later refetches must not wipe the user's edits.
  const hasLoadedDraft = useRef(false);
  useEffect(() => {
    if (draftEventId && draftEvent?.data && !hasLoadedDraft.current) {
      hasLoadedDraft.current = true;
      dispatch(setCreateEventFromDraft({ event: draftEvent.data }));
    }
  }, [draftEventId, draftEvent, dispatch]);

  useEffect(() => {
    // A create form left from an edited draft must not leak into a new event.
    if (!draftEventId && loadedDraftId) {
      dispatch(resetCreateEvent());
    }
  }, []);

  const currentStep = CREATE_SCHOOL_EVENT_STEP_FLOW[stepIndex];

  const CurrentComponent = currentStep.component;
  const goToStep = (step) => {
    setStepIndex(step);
    setFurthestStep((prev) => Math.max(prev, step));
  };
  const nextStep = () => goToStep(stepIndex + 1);
  const previousStep = () => goToStep(stepIndex - 1);
  const handleNavigate = (step) => goToStep(step);

  // A draft can be filled in any order; a new event goes forward through Next.
  const canJumpTo = (step) => Boolean(draftEventId) || step <= furthestStep;
  const missingSteps = new Set(getMissingForPublish(moduleState).map((m) => m.step));
  const wizard = {
    steps: CREATE_SCHOOL_EVENT_STEP_FLOW,
    stepIndex,
    canJumpTo,
    navigate: goToStep,
    // steps that still have details missing for publishing
    isIncomplete: (step) => missingSteps.has(step),
  };

  if (draftEventId && (isDraftLoading || draftError || loadedDraftId !== draftEventId)) {
    return (
      <div className="drawer-content px-2 pt-3 font-size-sm">
        {draftError ? (
          <NotFoundError
            title={draftError?.response?.data?.errors?.title}
            description={draftError?.response?.data?.errors?.description}
          />
        ) : (
          <div className="d-flex flex-column gap-2">
            {[...Array(8)].map((_, index) => (
              <Fragment key={index}>
                <RectangleSkeleton height="1dvh" width="25%" />
                <RectangleSkeleton height="4dvh" width="100%" />
              </Fragment>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <EventWizardContext.Provider value={wizard}>
      <CurrentComponent
        handleClose={handleClose}
        currentStep={stepIndex + 1}
        nextStep={nextStep}
        previousStep={previousStep}
        fullStep={CREATE_SCHOOL_EVENT_STEP_FLOW.length}
        drawerData={drawerData}
        handleNavigate={handleNavigate}
        images={images}
        setImages={setImages}
        imageOrder={imageOrder}
        setImageOrder={setImageOrder}
      />
    </EventWizardContext.Provider>
  );
}
export default CreateEventWizzard;
