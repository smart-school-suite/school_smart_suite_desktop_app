import { AnimatePresence, motion } from "framer-motion";
import {
  CalendarDays,
  ChevronRight,
  CircleAlert,
  MapPin,
  UserRound,
  Users,
} from "lucide-react";
import { Fragment, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dateTimeValidationSchema } from "../../../ComponentConfig/YupValidationSchema";
import HorizontalDashedLine from "../../../components/DashedLine/HorizonetalDashedLine";
import { DateTimeInput } from "../../../components/FormComponents/InputComponents";
import { SingleSpinner } from "../../../components/Spinners/Spinners";
import FormErrorBanner from "../../../components/errors/FormErrorBanner";
import { useFormError } from "../../../hooks/form/useFormError";
import { useCreateSchoolEvent } from "../../../hooks/schoolEvent/useCreateSchoolEvent";
import { useUpdateDraftSchoolEvent } from "../../../hooks/schoolEvent/useUpdateDraftSchoolEvent";
import { EventIcon } from "../../../icons/Icons";
import {
  buildSchoolEventPayload,
  EventWizardHeader,
} from "../../../ModalContent/Events/CreateEvent";
import {
  setPublicationType,
  setPublicationValue,
} from "../../../Slices/schoolEvent/schoolEventSlice";
import { formatISODate } from "../../../utils/functions";
import { eventImageUrl } from "./EventContent";
import ImageCarousel from "../../../components/image/ImageCarousel";
import { orderImageItems } from "../../../components/FormComponents/MultiImageUploader";
import { validateEventAudience } from "./EventAudience";

// What an event still needs before it can be published, with the step to fix it.
const CONTENT_STEP = 0;
const INVITEES_STEP = 2;
export function getMissingForPublish(moduleState) {
  const content = moduleState?.content ?? {};
  const blank = (field) => String(content?.[field]?.value ?? "").trim() === "";
  const missing = [];
  if (!content?.category?.value?.id) missing.push({ label: "Category", step: CONTENT_STEP });
  if (blank("title")) missing.push({ label: "Title", step: CONTENT_STEP });
  if (blank("description")) missing.push({ label: "Description", step: CONTENT_STEP });
  if (blank("start_date") || blank("end_date"))
    missing.push({ label: "Start and end date", step: CONTENT_STEP });
  if (blank("location")) missing.push({ label: "Location", step: CONTENT_STEP });
  if (blank("organizer")) missing.push({ label: "Organizer", step: CONTENT_STEP });
  if (validateEventAudience(moduleState?.audience))
    missing.push({ label: "Invitees", step: INVITEES_STEP });
  return missing;
}

function NotSet({ label = "Not set yet" }) {
  return (
    <span className="fst-italic" style={{ color: "rgba(8,48,73,0.38)" }}>
      {label}
    </span>
  );
}

function PublishChecklist({ missing, onFix }) {
  return (
    <AnimatePresence initial={false}>
      {missing.length > 0 && (
        <motion.div
          key="checklist"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden"
        >
          <div
            className="rounded-4 p-2 d-flex flex-column gap-2"
            style={{ background: "#FFFAEB", border: "1px solid #FEDF89" }}
          >
            <div className="d-flex flex-row align-items-center gap-2" style={{ color: "#B54708" }}>
              <CircleAlert size={15} />
              <span className="fw-medium">
                Finish {missing.length === 1 ? "this detail" : `these ${missing.length} details`} to publish
              </span>
            </div>
            <div className="d-flex flex-row flex-wrap gap-2">
              <AnimatePresence initial={false}>
                {missing.map((item) => (
                  <motion.button
                    key={item.label}
                    type="button"
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => onFix(item.step)}
                    className="border-0 rounded-pill bg-white d-flex flex-row align-items-center gap-1 px-2 py-1 shadow-sm"
                    style={{ fontSize: "0.75rem", color: "#083049", cursor: "pointer" }}
                  >
                    {item.label}
                    <ChevronRight size={12} />
                  </motion.button>
                ))}
              </AnimatePresence>
            </div>
            <span className="text-iron-400" style={{ fontSize: "0.72rem" }}>
              You can still save this as a draft from the header and finish it later.
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const AUDIENCE_LABELS = {
  school_wide: "Everyone in the school",
  students: "Students",
  teachers: "Teachers",
  schoolAdmins: "Administrators",
};

const PUBLICATION_OPTIONS = [
  {
    type: "active",
    title: "Publish Immediately",
    description: "Invitees can see the event as soon as it is created",
  },
  {
    type: "scheduled",
    title: "Schedule For Later",
    description: "Choose when invitees can first see the event",
  },
];

function EventReview({
  handleClose,
  currentStep,
  previousStep,
  fullStep,
  handleNavigate,
  images,
  imageOrder,
}) {
  const dispatch = useDispatch();
  const moduleState = useSelector((state) => state.schoolEvent.createEvent);
  const isDraftEdit = Boolean(moduleState?.draftEventId);
  const { mutate: createSchoolEvent, isPending: isCreating } =
    useCreateSchoolEvent(handleClose);
  const { mutate: updateDraftSchoolEvent, isPending: isUpdating } =
    useUpdateDraftSchoolEvent(handleClose);
  const isPending = isCreating || isUpdating;
  const {
    formError,
    errorBannerRef,
    setClientError,
    handleServerError,
    clearFormError,
  } = useFormError(
    isDraftEdit ? "Failed To Publish School Event" : "Failed To Create School Event",
  );
  const publishedAtRef = useRef();
  const content = moduleState?.content;
  const publication = moduleState?.publication;
  const orderedImages = orderImageItems({
    order: imageOrder,
    existingImages: moduleState?.existingImages,
    removeImageIds: moduleState?.removeImageIds,
    images,
  }).filter((item) => !item.isRemoved);

  const missing = getMissingForPublish(moduleState);
  const canPublish = missing.length === 0;

  const handleSubmit = async () => {
    clearFormError();
    if (!canPublish) {
      setClientError(
        "Event Not Ready To Publish",
        missing.map((item) => `${item.label} is missing`),
      );
      return;
    }
    if (!publication?.type) {
      setClientError(
        "Publication Required",
        "Choose whether to publish the event now or schedule it for later.",
      );
      return;
    }
    if (publication.type === "scheduled") {
      const isValid = await publishedAtRef.current?.triggerValidation();
      if (!isValid) {
        setClientError(
          "Publication Date Required",
          "Enter a valid publication date and time for the scheduled event.",
        );
        return;
      }
      if (
        content?.start_date?.value &&
        publication?.schedule?.value > content.start_date.value
      ) {
        setClientError(
          "Invalid Publication Date",
          "A scheduled event must be published on or before its start date.",
        );
        return;
      }
    }

    const payload = buildSchoolEventPayload(moduleState, {
      status: publication.type,
      images,
      imageOrder,
    });
    if (isDraftEdit) {
      updateDraftSchoolEvent(payload, { onError: handleServerError });
      return;
    }
    createSchoolEvent(payload, { onError: handleServerError });
  };

  return (
    <>
      <EventWizardHeader
        handleClose={handleClose}
        images={images}
        imageOrder={imageOrder}
        disabled={isPending}
      />
      <div className="d-flex flex-row justify-content-between px-2 pt-2 ">
        <div className="d-flex flex-column font-size-sm">
          <span className="fw-medium text-capitalize">
            Review Your School Event
          </span>
          <p className="text-iron-400">
            {canPublish
              ? "Everything looks ready. Review the details below before publishing."
              : "A few details are still missing. Finish them to publish, or save this as a draft."}
          </p>
        </div>
        <div className="d-flex flex-row align-items-center gap-1 fw-semibold text-capitalize font-size-sm">
          <span>step</span>
          <span>{currentStep}</span>
          <span>of</span>
          <span>{fullStep}</span>
          <span>Completed</span>
        </div>
      </div>
      <div
        className="drawer-content"
        style={{ background: "#f9f9f9", paddingBottom: "10rem" }}
      >
        <FormErrorBanner
          ref={errorBannerRef}
          error={formError}
          onDismiss={clearFormError}
          className="mx-2 mb-2"
        />
        <div className="d-flex flex-column gap-3 pt-2 px-2 font-size-sm">
          <div className="d-flex flex-column gap-1">
            <span>Event Preview</span>
            <div
              className="card border-none border p-2 d-flex flex-column gap-3"
              style={{ borderRadius: "0.85rem" }}
            >
              {orderedImages.length > 0 && (
                <ImageCarousel
                  slides={orderedImages.map((item) =>
                    item.kind === "saved"
                      ? {
                          key: item.key,
                          src: eventImageUrl(item.image.object_key),
                          alt: "Event image",
                        }
                      : { key: item.key, file: item.file, alt: item.file.name },
                  )}
                  height="15rem"
                />
              )}
              <div className="d-flex flex-row align-items-center gap-2">
                <div
                  style={{
                    width: "2.5rem",
                    height: "2.5rem",
                    display: "grid",
                    placeItems: "center",
                  }}
                  className="primary-background-50 rounded-2 text-primary-600"
                >
                  <EventIcon size={20} />
                </div>
                <div className="d-flex flex-column">
                  <span className="fw-light text-iron-500">
                    {content?.category?.value?.name}
                  </span>
                  <span className="font-size-sm fw-semibold">
                    {content?.title?.value || "Untitled draft"}
                  </span>
                </div>
              </div>
              <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.2} />
              <div className="d-flex flex-column gap-2">
                <p className="text-iron-400 fw-light m-0">
                  {content?.description?.value || <NotSet label="No description yet" />}
                </p>
                <div className="d-flex flex-row align-items-center flex-wrap gap-2">
                  {content?.tags?.value?.map((tag) => (
                    <Fragment key={tag?.id}>
                      <span
                        className="primary-background-100 color-primary rounded-pill px-2"
                        style={{ fontSize: "0.7rem" }}
                      >
                        {tag?.name}
                      </span>
                    </Fragment>
                  ))}
                </div>
              </div>
              <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.2} />
              <div className="d-flex flex-column gap-2">
                <div className="d-flex flex-row align-items-center gap-2">
                  <CalendarDays size={14} />
                  <span>
                    {content?.start_date?.value && content?.end_date?.value ? (
                      <>
                        {formatISODate(content.start_date.value.replace(" ", "T"))} —{" "}
                        {formatISODate(content.end_date.value.replace(" ", "T"))}
                      </>
                    ) : (
                      <NotSet />
                    )}
                  </span>
                </div>
                <div className="d-flex flex-row align-items-center gap-2">
                  <MapPin size={14} />
                  <span>{content?.location?.value || <NotSet />}</span>
                </div>
                <div className="d-flex flex-row align-items-center gap-2">
                  <UserRound size={14} />
                  <span>{content?.organizer?.value || <NotSet />}</span>
                </div>
                <div className="d-flex flex-row align-items-center gap-2">
                  <Users size={14} />
                  <span>
                    {(moduleState?.audience?.types ?? []).length ? (
                      moduleState.audience.types
                        .map((type) => AUDIENCE_LABELS[type])
                        .join(", ")
                    ) : (
                      <NotSet label="No invitees yet" />
                    )}
                  </span>
                </div>
              </div>
              <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.2} />
              <div className="d-flex flex-row align-items-center justify-content-end gap-2">
                <button
                  className="rounded-3 py-2 px-3 bg-none border-none border"
                  onClick={() => handleNavigate(2)}
                  disabled={isPending}
                >
                  Edit Invitees
                </button>
                <button
                  className="rounded-3 py-2 px-3 bg-none border-none border"
                  onClick={() => handleNavigate(1)}
                  disabled={isPending}
                >
                  Edit Images
                </button>
                <button
                  className="rounded-3 py-2 px-3 bg-none border-none border"
                  onClick={() => handleNavigate(0)}
                  disabled={isPending}
                >
                  Edit Content
                </button>
              </div>
            </div>
          </div>

          <PublishChecklist missing={missing} onFix={handleNavigate} />

          <div className="d-flex flex-column gap-1">
            <span>Publication</span>
            <div className="d-flex flex-row align-items-center gap-2">
              {PUBLICATION_OPTIONS.map((option) => {
                const isSelected = publication?.type === option.type;
                return (
                  <motion.div
                    key={option.type}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    className={`card shadow-sm p-2 d-flex flex-column gap-4 w-50 transition-all hover-bg-primary-50 hover-text-primary-500
                      ${isSelected ? "bg-primary-50 text-primary-500 border-primary-500" : "border border-none"}`}
                    style={{
                      borderRadius: "0.75rem",
                      height: "14dvh",
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      dispatch(setPublicationType({ type: option.type }))
                    }
                  >
                    <span>{option.title}</span>
                    <p
                      className={`p-0 m-0 mt-auto transition-all hover-text-primary-500 ${
                        isSelected ? "text-primary-500" : "text-iron-400"
                      }`}
                    >
                      {option.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
          {publication?.type === "scheduled" && (
            <div className="d-flex flex-column gap-1">
              <span>Publication Date & Time</span>
              <DateTimeInput
                onChange={(value) =>
                  dispatch(setPublicationValue({ field: "value", value }))
                }
                onValidationChange={(value) =>
                  dispatch(setPublicationValue({ field: "isValid", value }))
                }
                value={publication?.schedule?.value}
                validationSchema={dateTimeValidationSchema({
                  required: true,
                  futureOrToday: true,
                  messages: {
                    required:
                      "Published Date and Time Required For Scheduled Events",
                  },
                })}
                ref={publishedAtRef}
              />
            </div>
          )}
        </div>
      </div>
      <div className="drawer-footer font-size-sm">
        <div className="d-flex flex-column w-100">
          <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.5} />
          <div className="d-flex flex-row align-items-center justify-content-between p-2">
            <button
              className="border-none bg-none cursor-pointer"
              onClick={() => previousStep()}
              disabled={isPending}
            >
              <span>Back To Invitees</span>
            </button>
            <button
              className="border-none rounded-3 primary-background text-white font-size-sm px-3 py-2 cursor-pointer"
              onClick={() => handleSubmit()}
              disabled={isPending || !canPublish}
              title={canPublish ? undefined : "Finish the missing details to publish"}
              style={{ opacity: canPublish ? 1 : 0.5, transition: "opacity 150ms ease" }}
            >
              {isPending ? (
                <SingleSpinner />
              ) : isDraftEdit ? (
                "Publish Event"
              ) : (
                "Create Event"
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default EventReview;
