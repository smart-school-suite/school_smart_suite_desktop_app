import {
  TextAreaInput,
  TextInput,
  DateTimeRangeInput,
  ImageUploadComponent,
} from "../../../components/FormComponents/InputComponents";
import HorizontalDashedLine from "../../../components/DashedLine/HorizonetalDashedLine";
import CustomDropdown, {
  MultiSelectDropdown,
} from "../../../components/Dropdowns/Dropdowns";
import {
  dateTimeRangeValidationSchema,
  nameSchema,
  textareaSchema,
} from "../../../ComponentConfig/YupValidationSchema";
import { useGetActiveEventCategories } from "../../../hooks/eventCategory/useGetActiveEventCategories";
import { useGetEventTags } from "../../../hooks/schoolEvent/useGetSchoolEventTags";
import { useSelector, useDispatch } from "react-redux";
import {
  setEventContent,
  markCreateEventDirty,
  toggleRemoveImage,
} from "../../../Slices/schoolEvent/schoolEventSlice";
import { useEffect, useRef, useState } from "react";
import { RotateCcw, Trash2, X } from "lucide-react";
import { allFieldsValid, cleanAssetPath } from "../../../utils/functions";
import FormErrorBanner from "../../../components/errors/FormErrorBanner";
import { useFormError } from "../../../hooks/form/useFormError";
import {
  EventWizardCancel,
  EventWizardHeader,
} from "../../../ModalContent/Events/CreateEvent";

export const MAX_EVENT_IMAGES = 5;
export const MAX_EVENT_IMAGE_SIZE = 2 * 1024 * 1024;
const EVENT_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

export const eventImageUrl = (objectKey) =>
  `https://cdn.smartschoolsuite.com/${cleanAssetPath(objectKey)}`;

// Thumbnail of an image file picked on this device.
export function FilePreview({ file, style, className }) {
  const [url, setUrl] = useState(null);
  useEffect(() => {
    if (!file) return undefined;
    const objectUrl = URL.createObjectURL(file);
    setUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);
  if (!url) return null;
  return (
    <img
      src={url}
      alt={file?.name}
      className={className ?? "object-fit-cover w-100 h-100"}
      style={style}
    />
  );
}

function ImageTile({ children, onAction, actionLabel, muted = false, ActionIcon }) {
  return (
    <div
      className="position-relative rounded-3 overflow-hidden border"
      style={{ width: "6rem", height: "6rem", opacity: muted ? 0.4 : 1 }}
    >
      {children}
      <button
        type="button"
        aria-label={actionLabel}
        title={actionLabel}
        className="position-absolute border-none rounded-circle bg-white shadow-sm"
        style={{
          top: 4,
          right: 4,
          width: "1.6rem",
          height: "1.6rem",
          display: "grid",
          placeItems: "center",
          cursor: "pointer",
        }}
        onClick={onAction}
      >
        <ActionIcon size={12} />
      </button>
    </div>
  );
}

/**
 * Event images: saved images (with remove / undo) and new files, up to 5 in total.
 * Used by the create wizard and the update content drawer.
 */
export function EventImagesField({
  existingImages = [],
  removeImageIds = [],
  onToggleRemove,
  images,
  onImagesChange,
  onError,
}) {
  const keptCount = existingImages.filter(
    (image) => !removeImageIds.includes(image.id),
  ).length;
  const remaining = MAX_EVENT_IMAGES - keptCount - images.length;

  const handleUpload = (file) => {
    if (!EVENT_IMAGE_TYPES.includes(file?.type)) {
      onError?.("Unsupported Image", "Event images must be JPEG, PNG or WebP files.");
      return;
    }
    if (remaining <= 0) {
      onError?.(
        "Max Amount Reached",
        `An event can have at most ${MAX_EVENT_IMAGES} images.`,
      );
      return;
    }
    onImagesChange([...images, file]);
  };

  return (
    <div className="d-flex flex-column gap-2">
      <div className="d-flex flex-row align-items-center justify-content-between">
        <span className="fw-medium">Event Images</span>
        <span className="text-iron-400">
          {keptCount + images.length} of {MAX_EVENT_IMAGES}
        </span>
      </div>
      {(existingImages.length > 0 || images.length > 0) && (
        <div className="d-flex flex-row flex-wrap gap-2">
          {existingImages.map((image) => {
            const isRemoved = removeImageIds.includes(image.id);
            return (
              <ImageTile
                key={image.id}
                muted={isRemoved}
                actionLabel={isRemoved ? "Keep image" : "Remove image"}
                ActionIcon={isRemoved ? RotateCcw : Trash2}
                onAction={() => onToggleRemove?.(image.id)}
              >
                <img
                  src={eventImageUrl(image.object_key)}
                  alt="Event"
                  className="object-fit-cover w-100 h-100"
                />
              </ImageTile>
            );
          })}
          {images.map((file, index) => (
            <ImageTile
              key={`${file.name}-${file.lastModified}-${index}`}
              actionLabel="Remove image"
              ActionIcon={X}
              onAction={() =>
                onImagesChange(images.filter((_, i) => i !== index))
              }
            >
              <FilePreview file={file} />
            </ImageTile>
          ))}
        </div>
      )}
      {remaining > 0 && (
        <ImageUploadComponent
          // a fresh uploader after each pick, so the next image can be added
          key={images.length}
          maxFileSize={MAX_EVENT_IMAGE_SIZE}
          accept="image/jpeg,image/png,image/webp"
          uploadText={`Click Here To Add An Event Image (JPEG, PNG or WebP, max 2 MB, ${remaining} left)`}
          onImageUpload={handleUpload}
        />
      )}
    </div>
  );
}

function EventContent({
  handleClose,
  currentStep,
  nextStep,
  fullStep,
  images,
  setImages,
}) {
  const { formError, errorBannerRef, setClientError, clearFormError } =
    useFormError();
  const dispatch = useDispatch();
  const titleRef = useRef();
  const descriptionRef = useRef();
  const tagRef = useRef();
  const categoryRef = useRef();
  const locationRef = useRef();
  const organizerRef = useRef();
  const dateRef = useRef();
  const moduleState = useSelector((state) => state.schoolEvent.createEvent);
  const { data: category, isLoading: isCategoryLoading } =
    useGetActiveEventCategories();
  const { data: tags, isLoading: isTagLoading } = useGetEventTags();

  const setField = (field, payload) =>
    dispatch(
      setEventContent({
        field,
        actionType: "createEvent",
        ...payload,
      }),
    );

  const handlePrevalidation = async () => {
    const title = await titleRef.current.triggerValidation();
    const description = await descriptionRef.current.triggerValidation();
    const tag = await tagRef.current.triggerValidation();
    const category = await categoryRef.current.triggerValidation();
    const startDate = await dateRef.current.preValidateStart();
    const endDate = await dateRef.current.preValidateEnd();
    const location = await locationRef.current.triggerValidation();
    const organizer = await organizerRef.current.triggerValidation();
    return {
      title,
      description,
      tag,
      category,
      startDate,
      endDate,
      location,
      organizer,
    };
  };

  const handleNext = async () => {
    clearFormError();
    const prevalidation = await handlePrevalidation();
    if (!allFieldsValid(prevalidation)) {
      setClientError(
        "Invalid Fields",
        "Some Fields are invalid please ensure that all fields are valid before proceeding to the next step",
      );
      return;
    }
    nextStep();
  };

  return (
    <>
      <EventWizardHeader handleClose={handleClose} images={images} />
      <div className="d-flex flex-row align-items-center justify-content-between font-size-sm px-2 pt-2">
        <div className="d-flex flex-column">
          <span className="fw-medium">Event content</span>
          <p className="text-iron-400">
            Give your event a clear identity, schedule and venue.
          </p>
        </div>
        <div className="d-flex flex-row align-items-center gap-1 fw-semibold text-capitalize">
          <span>step</span>
          <span>{currentStep}</span>
          <span>of</span>
          <span>{fullStep}</span>
          <span>Completed</span>
        </div>
      </div>
      <div
        className="drawer-content px-2 pt-2 font-size-sm"
        style={{ paddingBottom: "10rem" }}
      >
        <FormErrorBanner
          ref={errorBannerRef}
          error={formError}
          onDismiss={clearFormError}
          className="mb-2"
        />
        <div className="d-flex flex-column gap-3">
          <span className="text-iron-400">Event Details</span>
          <div className="d-flex flex-column gap-1">
            <span className="fw-medium">Category</span>
            <CustomDropdown
              data={category?.data || []}
              displayKey={["name"]}
              valueKey={["id"]}
              direction="up"
              onSelect={(value) =>
                setField("category", {
                  value: category?.data?.find((g) => g.id === value.id) || {},
                })
              }
              placeholder="Select Event Category"
              error={moduleState?.content?.category?.error}
              isLoading={isCategoryLoading}
              errorMessage="Event Category Required"
              onError={(msg) => setField("category", { error: msg })}
              ref={categoryRef}
              value={moduleState?.content?.category?.value?.id}
            />
          </div>
          <div className="d-flex flex-column gap-1">
            <span className="fw-medium">Tags</span>
            <MultiSelectDropdown
              data={tags?.data || []}
              displayKey={["name"]}
              valueKey={["id"]}
              direction="up"
              isLoading={isTagLoading}
              placeholder={"Select Tags"}
              errorMessage={"School Event Tags Required"}
              onSelect={(selectedIds) => {
                if (selectedIds.length > 5) {
                  setClientError(
                    "Max Amount Reached",
                    "You can only select from 1 - 5 tags maximum",
                  );
                  return;
                }
                setField("tags", {
                  value: tags?.data.filter((t) =>
                    selectedIds.some((id) => id.id == t.id),
                  ),
                });
              }}
              onError={(error) => setField("tags", { error })}
              error={moduleState?.content?.tags?.error}
              ref={tagRef}
              value={moduleState?.content?.tags?.value}
            />
          </div>
          <div className="d-flex flex-column gap-1">
            <span className="fw-medium">Title</span>
            <TextInput
              onChange={(value) => setField("title", { value })}
              onValidationChange={(isValid) => setField("title", { isValid })}
              validationSchema={nameSchema({
                min: 3,
                max: 150,
                required: true,
                messages: {
                  required: "Event Title Required",
                  min: "Event Title Must Be Atleast 3 Characters Long",
                  max: "Event Title Must Not Exceed 150 Characters",
                },
              })}
              value={moduleState?.content?.title?.value}
              placeholder={"e.g Annual School Science Fair"}
              ref={titleRef}
            />
          </div>
          <div className="d-flex flex-column gap-1">
            <span className="fw-medium">Description</span>
            <TextAreaInput
              onChange={(value) => setField("description", { value })}
              onValidationChange={(isValid) =>
                setField("description", { isValid })
              }
              value={moduleState?.content?.description?.value}
              placeholder={"Enter School Event Description"}
              validationSchema={textareaSchema({
                min: 10,
                max: 5000,
                required: true,
                messages: {
                  required: "School Event Description Required",
                  min: "School Event Description Must Be Atleast 10 Characters Long",
                  max: "School Event Description Must Not Exceed 5000 Characters",
                },
              })}
              ref={descriptionRef}
            />
          </div>
          <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.2} />
          <span className="text-iron-400">Schedule</span>
          <DateTimeRangeInput
            startValue={moduleState?.content?.start_date?.value}
            endValue={moduleState?.content?.end_date?.value}
            onStartDateTimeChange={(value) => setField("start_date", { value })}
            onEndDateTimeChange={(value) => setField("end_date", { value })}
            onStartDateTimeValidationChange={(isValid) =>
              setField("start_date", { isValid })
            }
            onEndDateTimeValidationChange={(isValid) =>
              setField("end_date", { isValid })
            }
            validationSchema={dateTimeRangeValidationSchema({
              futureOrNow: true,
              required: true,
              allowPast: false,
            })}
            startDateLabel="Starts At"
            endDateLabel="Ends At"
            ref={dateRef}
          />
          <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.2} />
          <span className="text-iron-400">Location & Organizer</span>
          <div className="d-flex flex-column gap-1">
            <span className="fw-medium">Location</span>
            <TextInput
              onChange={(value) => setField("location", { value })}
              onValidationChange={(isValid) => setField("location", { isValid })}
              validationSchema={nameSchema({
                min: 3,
                max: 150,
                required: true,
                messages: {
                  required: "Event Location Required",
                  min: "Event Location Must Be Atleast 3 Characters Long",
                  max: "Event Location Must Not Exceed 150 Characters",
                },
              })}
              value={moduleState?.content?.location?.value}
              placeholder={"e.g Main School Hall"}
              ref={locationRef}
            />
          </div>
          <div className="d-flex flex-column gap-1">
            <span className="fw-medium">Organizer</span>
            <TextInput
              onChange={(value) => setField("organizer", { value })}
              onValidationChange={(isValid) =>
                setField("organizer", { isValid })
              }
              validationSchema={nameSchema({
                min: 3,
                max: 200,
                required: true,
                messages: {
                  required: "Event Organizer Required",
                  min: "Event Organizer Must Be Atleast 3 Characters Long",
                  max: "Event Organizer Must Not Exceed 200 Characters",
                },
              })}
              value={moduleState?.content?.organizer?.value}
              placeholder={"e.g Science Department"}
              ref={organizerRef}
            />
          </div>
          <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.2} />
          <EventImagesField
            existingImages={moduleState?.existingImages}
            removeImageIds={moduleState?.removeImageIds}
            onToggleRemove={(imageId) =>
              dispatch(toggleRemoveImage({ imageId }))
            }
            images={images}
            onImagesChange={(files) => {
              setImages(files);
              dispatch(markCreateEventDirty());
            }}
            onError={setClientError}
          />
        </div>
      </div>
      <div className="drawer-footer font-size-sm">
        <div className="d-flex flex-column w-100">
          <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.5} />
          <div className="d-flex flex-row align-items-center justify-content-between p-2">
            <EventWizardCancel handleClose={handleClose} images={images} />
            <button
              className="border-none rounded-3 primary-background text-white font-size-sm px-3 py-2"
              onClick={() => handleNext()}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default EventContent;
