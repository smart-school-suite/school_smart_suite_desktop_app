import { CircleX, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { ModalButton } from "../../components/DataTableComponents/ActionComponent";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import FormErrorBanner from "../../components/errors/FormErrorBanner";
import { useFormError } from "../../hooks/form/useFormError";
import { useCreateSchoolEvent } from "../../hooks/schoolEvent/useCreateSchoolEvent";
import { useUpdateDraftSchoolEvent } from "../../hooks/schoolEvent/useUpdateDraftSchoolEvent";
import { resetCreateEvent } from "../../Slices/schoolEvent/schoolEventSlice";

/**
 * Shared pieces of the create / edit-draft school event drawer
 * (DrawerContent/SchoolEvent/CreateSchoolEvent).
 */

const ids = (items) => (items ?? []).map((item) => item?.id ?? item);

// Builds the create / draft-update request body from the wizard state.
export function buildSchoolEventPayload(moduleState, { status, images = [] }) {
  const content = moduleState?.content;
  const targeting = moduleState?.audience?.targeting;
  const isScheduled = status === "scheduled";

  const payload = {
    title: content?.title?.value || null,
    description: content?.description?.value || null,
    organizer: content?.organizer?.value || null,
    location: content?.location?.value || null,
    start_date: content?.start_date?.value || null,
    end_date: content?.end_date?.value || null,
    event_category_id: content?.category?.value?.id || null,
    tag_ids: (content?.tags?.value ?? []).map((t) => ({ tag_id: t?.id })),
    status,
    published_at: isScheduled
      ? moduleState?.publication?.schedule?.value || null
      : null,
    images,
    school_wide: moduleState?.audience?.types?.includes("school_wide") ?? false,
    admin_audience: [
      {
        individual_ids: targeting?.administrators?.individualIds ?? [],
      },
    ],
    student_audience: [
      {
        individual_ids: targeting?.students?.individualIds ?? [],
        department_ids: ids(targeting?.students?.criteria?.departmentIds),
        specialty_ids: ids(targeting?.students?.criteria?.specialtyIds),
        level_ids: ids(targeting?.students?.criteria?.levelIds),
      },
    ],
    teacher_audience: [
      {
        individual_ids: targeting?.teachers?.individualIds ?? [],
        department_ids: ids(targeting?.teachers?.criteria?.departmentIds),
        specialty_ids: ids(targeting?.teachers?.criteria?.specialtyIds),
        level_ids: ids(targeting?.teachers?.criteria?.levelIds),
      },
    ],
  };

  if (moduleState?.draftEventId) {
    payload.school_event_id = moduleState.draftEventId;
    payload.remove_image_ids = moduleState?.removeImageIds ?? [];
  }

  return payload;
}

// Drawer header with the close button; asks to save as draft when the form has changes.
export function EventWizardHeader({ handleClose, images, disabled = false }) {
  const dispatch = useDispatch();
  const moduleState = useSelector((state) => state.schoolEvent.createEvent);
  const title = moduleState?.draftEventId
    ? "Update Draft School Event"
    : "Create School Event";
  const closeButtonStyle = {
    width: "2rem",
    height: "2rem",
    display: "grid",
    placeItems: "center",
    cursor: "pointer",
  };
  return (
    <div className="d-flex flex-row align-items-center justify-content-between border-bottom p-2 font-size-sm">
      <span className="fw-medium">{title}</span>
      {moduleState?.isDirty ? (
        <ModalButton
          action={{
            modalContent: EventDiscardWarning,
          }}
          size={"md"}
          rowData={{ handleCloseDrawer: handleClose, images }}
          closeOnOutsideClick={false}
          closeOnEscape={false}
        >
          <button
            className="bg-none border-none border rounded-circle"
            style={closeButtonStyle}
            disabled={disabled}
          >
            <X size={16} />
          </button>
        </ModalButton>
      ) : (
        <button
          className="bg-none border-none border rounded-circle"
          aria-label="Close drawer"
          onClick={() => {
            handleClose();
            dispatch(resetCreateEvent());
          }}
          disabled={disabled}
          style={closeButtonStyle}
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}

// Cancel button for the drawer footer, with the same save-as-draft prompt.
export function EventWizardCancel({ handleClose, images, label = "Cancel" }) {
  const dispatch = useDispatch();
  const isDirty = useSelector((state) => state.schoolEvent.createEvent.isDirty);
  return isDirty ? (
    <ModalButton
      action={{
        modalContent: EventDiscardWarning,
      }}
      size={"md"}
      rowData={{ handleCloseDrawer: handleClose, images }}
      closeOnOutsideClick={false}
      closeOnEscape={false}
    >
      <button className="border-none bg-none">{label}</button>
    </ModalButton>
  ) : (
    <button
      className="border-none bg-none"
      onClick={() => {
        handleClose();
        dispatch(resetCreateEvent());
      }}
    >
      {label}
    </button>
  );
}

function EventDiscardWarning({ handleClose, rowData }) {
  const { handleCloseDrawer, images = [] } = rowData;
  const dispatch = useDispatch();
  const moduleState = useSelector((state) => state.schoolEvent.createEvent);
  const isDraftEdit = Boolean(moduleState?.draftEventId);
  const { mutate: createSchoolEvent, isPending: isCreating } =
    useCreateSchoolEvent(handleClose, handleCloseDrawer);
  const { mutate: updateDraftSchoolEvent, isPending: isUpdating } =
    useUpdateDraftSchoolEvent(handleClose, handleCloseDrawer);
  const isPending = isCreating || isUpdating;
  const { formError, errorBannerRef, handleServerError, clearFormError } =
    useFormError("Failed To Save School Event");

  const handleDiscard = () => {
    handleClose();
    handleCloseDrawer();
    dispatch(resetCreateEvent());
  };

  const handleSaveToDraft = () => {
    const payload = buildSchoolEventPayload(moduleState, {
      status: "draft",
      images,
    });
    clearFormError();
    if (isDraftEdit) {
      updateDraftSchoolEvent(payload, { onError: handleServerError });
      return;
    }
    createSchoolEvent(payload, { onError: handleServerError });
  };

  return (
    <>
      <div className="w-100">
        <div
          className="border-bottom rounded-top-4 p-2 d-flex flex-column justify-content-center"
          style={{ height: "6dvh", background: "#f9f9f9" }}
        >
          <div className="d-flex flex-row align-items-center justify-content-between">
            <div>
              <span className="font-size-sm fw-semibold">
                Dont Loose Progress
              </span>
            </div>
            <button
              onClick={() => handleClose()}
              disabled={isPending}
              className="border-none border rounded-circle bg-transparent p-0"
              style={{
                width: "2rem",
                height: "2rem",
                display: "grid",
                placeItems: "center",
                cursor: "pointer",
              }}
            >
              <CircleX size={16} />
            </button>
          </div>
        </div>
        <FormErrorBanner
          ref={errorBannerRef}
          error={formError}
          onDismiss={clearFormError}
          className="mx-2 mt-2 mb-0"
        />
        <div className="px-1 d-flex flex-column gap-2 font-size-sm pt-3">
          <span className="fw-semibold">Save This School Event As A Draft?</span>
          <p>
            {isDraftEdit
              ? "You have unsaved changes to this draft. Save them to the draft, or discard them and keep the draft as it was."
              : "You have unsaved changes. Save this school event as a draft to finish it later, or discard it. Discarded changes cannot be recovered."}
          </p>
        </div>
        <div className="mt-auto border-top p-2" style={{ height: "8dvh" }}>
          <div className="d-flex flex-row align-items-center justify-content-end gap-2 w-100">
            <button
              className="border-none px-3 py-2 border rounded-3 font-size-sm w-50 bg-none"
              onClick={() => {
                handleDiscard();
              }}
              disabled={isPending}
            >
              Discard
            </button>
            <button
              className="border-none px-3 py-2 rounded-3 font-size-sm primary-background text-white w-50"
              onClick={() => {
                handleSaveToDraft();
              }}
              disabled={isPending}
            >
              {isPending ? <SingleSpinner /> : "Yes, Save to draft"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default EventDiscardWarning;
