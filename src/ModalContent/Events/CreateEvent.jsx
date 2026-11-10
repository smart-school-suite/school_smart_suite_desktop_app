import { CircleX, Save, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { formatDistanceToNow, parseISO } from "date-fns";
import { EventWizardStepBar } from "../../DrawerContent/SchoolEvent/CreateSchoolEvent/EventWizardSteps";
import { useDispatch, useSelector } from "react-redux";
import { ModalButton } from "../../components/DataTableComponents/ActionComponent";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import FormErrorBanner from "../../components/errors/FormErrorBanner";
import { useFormError } from "../../hooks/form/useFormError";
import { useCreateSchoolEvent } from "../../hooks/schoolEvent/useCreateSchoolEvent";
import { useUpdateDraftSchoolEvent } from "../../hooks/schoolEvent/useUpdateDraftSchoolEvent";
import { resetCreateEvent } from "../../Slices/schoolEvent/schoolEventSlice";
import {
  orderImageItems,
  toImageOrderPayload,
} from "../../components/FormComponents/MultiImageUploader";

/**
 * Shared pieces of the create / edit-draft school event drawer
 * (DrawerContent/SchoolEvent/CreateSchoolEvent).
 */

const ids = (items) => (items ?? []).map((item) => item?.id ?? item);

// Builds the create / draft-update request body from the wizard state.
export function buildSchoolEventPayload(
  moduleState,
  { status, images = [], imageOrder = [] },
) {
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

  const imageItems = orderImageItems({
    order: imageOrder,
    existingImages: moduleState?.existingImages,
    removeImageIds: moduleState?.removeImageIds,
    images,
  });
  // display order of the images; the first one is the cover
  payload.image_order = toImageOrderPayload(imageItems);

  if (moduleState?.draftEventId) {
    payload.school_event_id = moduleState.draftEventId;
    payload.remove_image_ids = moduleState?.removeImageIds ?? [];
  }

  return payload;
}

// True when the form has at least one detail worth saving as a draft.
export function hasDraftContent(moduleState, images = []) {
  const content = moduleState?.content ?? {};
  const filled = [
    "title",
    "description",
    "organizer",
    "location",
    "start_date",
    "end_date",
  ].some((field) => String(content?.[field]?.value ?? "").trim() !== "");
  const keptImages = (moduleState?.existingImages ?? []).some(
    (image) => !(moduleState?.removeImageIds ?? []).includes(image.id),
  );
  return (
    filled ||
    Boolean(content?.category?.value?.id) ||
    (content?.tags?.value ?? []).length > 0 ||
    images.length > 0 ||
    keptImages ||
    (moduleState?.audience?.types ?? []).length > 0
  );
}

export const EMPTY_DRAFT_ERROR = {
  title: "Nothing To Save Yet",
  messages: [
    "Add at least one detail (for example a title, description, date, image or invitee) before saving a draft.",
  ],
};

// Saves the wizard as a draft: creates one, or updates the draft being edited.
function useSaveEventDraft(handleClose) {
  const moduleState = useSelector((state) => state.schoolEvent.createEvent);
  const { mutate: createSchoolEvent, isPending: isCreating } =
    useCreateSchoolEvent(handleClose);
  const { mutate: updateDraftSchoolEvent, isPending: isUpdating } =
    useUpdateDraftSchoolEvent(handleClose);

  const saveDraft = ({ images, imageOrder, onError, onEmpty }) => {
    if (!hasDraftContent(moduleState, images)) {
      onEmpty?.();
      return;
    }
    const payload = buildSchoolEventPayload(moduleState, {
      status: "draft",
      images,
      imageOrder,
    });
    const save = moduleState?.draftEventId
      ? updateDraftSchoolEvent
      : createSchoolEvent;
    save(payload, { onError });
  };

  return { saveDraft, isSaving: isCreating || isUpdating };
}

function lastSavedLabel(updatedAt) {
  if (!updatedAt) return null;
  // updated_at is a real moment in time (UTC), so compare it as one
  const savedAt = parseISO(String(updatedAt).replace(" ", "T"));
  if (Number.isNaN(savedAt.getTime())) return null;
  if (savedAt > new Date()) return "just now";
  return formatDistanceToNow(savedAt, { addSuffix: true });
}

// Drawer header: title, draft status, save draft and close, then the step bar.
export function EventWizardHeader({
  handleClose,
  images,
  imageOrder,
  disabled = false,
}) {
  const dispatch = useDispatch();
  const reduceMotion = useReducedMotion();
  const moduleState = useSelector((state) => state.schoolEvent.createEvent);
  const isDraft = Boolean(moduleState?.draftEventId);
  const isDirty = Boolean(moduleState?.isDirty);
  const { saveDraft, isSaving } = useSaveEventDraft(handleClose);
  const { formError, handleServerError, setFormError, clearFormError } =
    useFormError("Failed To Save Draft");
  const title = isDraft ? "Update Draft School Event" : "Create School Event";
  const savedLabel = lastSavedLabel(moduleState?.draftUpdatedAt);
  const isBusy = disabled || isSaving;
  const closeButtonStyle = {
    width: "2rem",
    height: "2rem",
    display: "grid",
    placeItems: "center",
    cursor: "pointer",
  };

  const handleSaveDraft = () => {
    clearFormError();
    saveDraft({
      images,
      imageOrder,
      onError: handleServerError,
      onEmpty: () => setFormError(EMPTY_DRAFT_ERROR),
    });
  };

  return (
    <>
      <div className="d-flex flex-row align-items-center justify-content-between border-bottom p-2 font-size-sm gap-2">
        <div className="d-flex flex-row align-items-center gap-2" style={{ minWidth: 0 }}>
          <span className="fw-medium text-truncate">{title}</span>
          {isDraft && (
            <span
              className="rounded-pill px-2 fw-semibold flex-shrink-0"
              style={{
                fontSize: "0.65rem",
                lineHeight: "1.2rem",
                background: "#EAF7FD",
                color: "#0EA7E9",
              }}
            >
              Draft
            </span>
          )}
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={isDirty ? "dirty" : "clean"}
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -3 }}
              transition={{ duration: 0.15 }}
              className="text-iron-400 text-truncate"
              style={{ fontSize: "0.72rem" }}
            >
              {isDirty
                ? "Unsaved changes"
                : isDraft && savedLabel
                  ? `Saved ${savedLabel}`
                  : ""}
            </motion.span>
          </AnimatePresence>
        </div>
        <div className="d-flex flex-row align-items-center gap-2 flex-shrink-0">
          <AnimatePresence initial={false}>
            {isDirty && (
              <motion.button
                key="save-draft"
                type="button"
                onClick={handleSaveDraft}
                disabled={isBusy}
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 8 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.18 }}
                className="border-none border rounded-pill bg-none d-flex flex-row align-items-center gap-1 px-3"
                style={{ height: "2rem", cursor: isBusy ? "default" : "pointer" }}
              >
                {isSaving ? (
                  <SingleSpinner />
                ) : (
                  <>
                    <Save size={14} />
                    <span>Save draft</span>
                  </>
                )}
              </motion.button>
            )}
          </AnimatePresence>
          {isDirty ? (
            <ModalButton
              action={{
                modalContent: EventDiscardWarning,
              }}
              size={"md"}
              rowData={{ handleCloseDrawer: handleClose, images, imageOrder }}
              closeOnOutsideClick={false}
              closeOnEscape={false}
            >
              <button
                className="bg-none border-none border rounded-circle"
                aria-label="Close drawer"
                style={closeButtonStyle}
                disabled={isBusy}
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
              disabled={isBusy}
              style={closeButtonStyle}
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>
      <AnimatePresence initial={false}>
        {formError && (
          <motion.div
            key="save-error"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <FormErrorBanner
              error={formError}
              onDismiss={clearFormError}
              className="mx-2 mt-2 mb-0"
            />
          </motion.div>
        )}
      </AnimatePresence>
      <EventWizardStepBar />
    </>
  );
}

// Cancel button for the drawer footer, with the same save-as-draft prompt.
export function EventWizardCancel({
  handleClose,
  images,
  imageOrder,
  label = "Cancel",
}) {
  const dispatch = useDispatch();
  const isDirty = useSelector((state) => state.schoolEvent.createEvent.isDirty);
  return isDirty ? (
    <ModalButton
      action={{
        modalContent: EventDiscardWarning,
      }}
      size={"md"}
      rowData={{ handleCloseDrawer: handleClose, images, imageOrder }}
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
  const { handleCloseDrawer, images = [], imageOrder = [] } = rowData;
  const dispatch = useDispatch();
  const moduleState = useSelector((state) => state.schoolEvent.createEvent);
  const isDraftEdit = Boolean(moduleState?.draftEventId);
  const { mutate: createSchoolEvent, isPending: isCreating } =
    useCreateSchoolEvent(handleClose, handleCloseDrawer);
  const { mutate: updateDraftSchoolEvent, isPending: isUpdating } =
    useUpdateDraftSchoolEvent(handleClose, handleCloseDrawer);
  const isPending = isCreating || isUpdating;
  const {
    formError,
    errorBannerRef,
    setFormError,
    handleServerError,
    clearFormError,
  } = useFormError("Failed To Save School Event");

  const handleDiscard = () => {
    handleClose();
    handleCloseDrawer();
    dispatch(resetCreateEvent());
  };

  const handleSaveToDraft = () => {
    if (!hasDraftContent(moduleState, images)) {
      setFormError(EMPTY_DRAFT_ERROR);
      return;
    }
    const payload = buildSchoolEventPayload(moduleState, {
      status: "draft",
      images,
      imageOrder,
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
