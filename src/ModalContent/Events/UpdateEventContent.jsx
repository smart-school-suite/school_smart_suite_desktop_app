import { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { X } from "lucide-react";
import {
  DateTimeRangeInput,
  TextAreaInput,
  TextInput,
} from "../../components/FormComponents/InputComponents";
import HorizontalDashedLine from "../../components/DashedLine/HorizonetalDashedLine";
import CustomDropdown, {
  MultiSelectDropdown,
} from "../../components/Dropdowns/Dropdowns";
import {
  dateTimeRangeValidationSchema,
  nameSchema,
  textareaSchema,
} from "../../ComponentConfig/YupValidationSchema";
import { ModalButton } from "../../components/DataTableComponents/ActionComponent";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { NotFoundError } from "../../components/errors/Error";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import FormErrorBanner from "../../components/errors/FormErrorBanner";
import { useFormError } from "../../hooks/form/useFormError";
import { useGetActiveEventCategories } from "../../hooks/eventCategory/useGetActiveEventCategories";
import { useGetEventTags } from "../../hooks/schoolEvent/useGetSchoolEventTags";
import { useGetSchoolEventDetails } from "../../hooks/schoolEvent/useGetSchoolEventDetails";
import { useUpdateSchoolEventContent } from "../../hooks/schoolEvent/useUpdateSchoolEventContent";
import {
  resetUpdateContent,
  setEventContent,
  setUpdateContentImagesChanged,
  setUpdateContentInitial,
  toggleRemoveImage,
} from "../../Slices/schoolEvent/schoolEventSlice";
import { allFieldsValid } from "../../utils/functions";
import { EventImagesField } from "../../DrawerContent/SchoolEvent/CreateSchoolEvent/EventContent";
import UpdateEventDiscardWarning from "./UpdateEvent";
import {
  orderImageItems,
  toImageOrderPayload,
} from "../../components/FormComponents/MultiImageUploader";

/** Drawer for updating a school event's content and images. */
function UpdateEventContent({ drawerData, handleClose }) {
  const { id: schoolEventId } = drawerData;
  const dispatch = useDispatch();
  const titleRef = useRef();
  const descriptionRef = useRef();
  const tagRef = useRef();
  const categoryRef = useRef();
  const locationRef = useRef();
  const organizerRef = useRef();
  const dateRef = useRef();
  const [images, setImages] = useState([]);
  const [imageOrder, setImageOrder] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const { mutate: updateContent, isPending } =
    useUpdateSchoolEventContent(handleClose);
  const {
    formError,
    errorBannerRef,
    setClientError,
    handleServerError,
    clearFormError,
  } = useFormError("Failed To Update School Event Content");
  const updateState = useSelector((state) => state.schoolEvent.updateContent);
  const moduleState = updateState.draft;
  const isDirty = updateState.isDirty;
  const { data: category, isLoading: isCategoryLoading } =
    useGetActiveEventCategories();
  const { data: tags, isLoading: isTagLoading } = useGetEventTags();
  const {
    data: schoolEvent,
    isLoading: isEventLoading,
    error: eventError,
  } = useGetSchoolEventDetails(schoolEventId);

  // Load the event once per opening; later refetches must not wipe the user's edits.
  useEffect(() => {
    if (!isReady && schoolEvent?.data) {
      dispatch(setUpdateContentInitial({ event: schoolEvent.data }));
      setIsReady(true);
    }
  }, [schoolEvent, isReady, dispatch]);

  const setField = (field, payload) =>
    dispatch(
      setEventContent({
        field,
        actionType: "updateContent",
        ...payload,
      }),
    );

  const orderedItems = (files, order) =>
    orderImageItems({
      order,
      existingImages: updateState.existingImages,
      removeImageIds: updateState.removeImageIds,
      images: files,
    });

  // New files, or saved images in a different order than when the drawer opened.
  const reportImageChanges = (files, order) => {
    const savedOrder = orderedItems(files, order)
      .filter((item) => item.kind === "saved")
      .map((item) => item.image.id);
    const initialOrder = updateState.existingImages.map((image) => image.id);
    dispatch(
      setUpdateContentImagesChanged({
        hasImageChanges:
          files.length > 0 || savedOrder.join() !== initialOrder.join(),
      }),
    );
  };

  const handleImagesChange = (files) => {
    setImages(files);
    reportImageChanges(files, imageOrder);
  };

  const handleOrderChange = (order) => {
    setImageOrder(order);
    reportImageChanges(images, order);
  };

  const closeDrawer = () => {
    handleClose();
    dispatch(resetUpdateContent());
  };

  const handlePrevalidation = async () => ({
    title: await titleRef.current.triggerValidation(),
    description: await descriptionRef.current.triggerValidation(),
    tag: await tagRef.current.triggerValidation(),
    category: await categoryRef.current.triggerValidation(),
    startDate: await dateRef.current.preValidateStart(),
    endDate: await dateRef.current.preValidateEnd(),
    location: await locationRef.current.triggerValidation(),
    organizer: await organizerRef.current.triggerValidation(),
  });

  const handleUpdateContent = async () => {
    clearFormError();
    const prevalidation = await handlePrevalidation();
    if (!allFieldsValid(prevalidation)) {
      setClientError(
        "Invalid Fields",
        "Some Fields are invalid please ensure that all fields are valid before saving",
      );
      return;
    }
    const payload = {
      title: moduleState?.title?.value,
      description: moduleState?.description?.value,
      organizer: moduleState?.organizer?.value,
      location: moduleState?.location?.value,
      start_date: moduleState?.start_date?.value,
      end_date: moduleState?.end_date?.value,
      event_category_id: moduleState?.category?.value?.id,
      tag_ids: (moduleState?.tags?.value ?? []).map((t) => ({ tag_id: t.id })),
      images,
      remove_image_ids: updateState.removeImageIds,
      // display order of the images; the first one is the cover
      image_order: toImageOrderPayload(orderedItems(images, imageOrder)),
    };
    updateContent(
      { schoolEventId, updateData: payload },
      { onError: handleServerError },
    );
  };

  const closeButtonStyle = {
    width: "2rem",
    height: "2rem",
    display: "grid",
    placeItems: "center",
    cursor: "pointer",
  };

  return (
    <>
      <div className="d-flex flex-row align-items-center justify-content-between border-bottom p-2 font-size-sm">
        <span className="fw-medium">Update School Event Content</span>
        {isDirty ? (
          <ModalButton
            action={{ modalContent: UpdateEventDiscardWarning }}
            size={"md"}
            rowData={{ handleCloseDrawer: handleClose }}
            closeOnOutsideClick={false}
            closeOnEscape={false}
          >
            <button
              className="bg-none border-none border rounded-circle"
              style={closeButtonStyle}
              disabled={isPending}
            >
              <X size={16} />
            </button>
          </ModalButton>
        ) : (
          <button
            className="bg-none border-none border rounded-circle"
            aria-label="Close drawer"
            onClick={closeDrawer}
            disabled={isPending}
            style={closeButtonStyle}
          >
            <X size={16} />
          </button>
        )}
      </div>
      {isEventLoading || (!eventError && !isReady) ? (
        <div className="drawer-content px-2 pt-3">
          <div className="d-flex flex-column gap-2">
            {[...Array(8)].map((_, index) => (
              <Fragment key={index}>
                <RectangleSkeleton height="1dvh" width="25%" />
                <RectangleSkeleton height="4dvh" width="100%" />
              </Fragment>
            ))}
          </div>
        </div>
      ) : eventError ? (
        <div className="drawer-content px-2 pt-3">
          <NotFoundError
            title={eventError?.response?.data?.errors?.title}
            description={eventError?.response?.data?.errors?.description}
          />
        </div>
      ) : (
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
            <div className="d-flex flex-column gap-1">
              <span className="fw-medium">Category</span>
              <CustomDropdown
                data={category?.data || []}
                displayKey={["name"]}
                valueKey={["id"]}
                direction="up"
                onSelect={(value) =>
                  setField("category", {
                    value:
                      category?.data?.find((g) => g.id === value.id) || {},
                  })
                }
                placeholder="Select Event Category"
                error={moduleState?.category?.error}
                isLoading={isCategoryLoading}
                errorMessage="Event Category Required"
                onError={(msg) => setField("category", { error: msg })}
                ref={categoryRef}
                value={moduleState?.category?.value?.id}
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
                error={moduleState?.tags?.error}
                ref={tagRef}
                value={moduleState?.tags?.value}
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
                value={moduleState?.title?.value}
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
                value={moduleState?.description?.value}
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
              startValue={moduleState?.start_date?.value}
              endValue={moduleState?.end_date?.value}
              onStartDateTimeChange={(value) =>
                setField("start_date", { value })
              }
              onEndDateTimeChange={(value) => setField("end_date", { value })}
              onStartDateTimeValidationChange={(isValid) =>
                setField("start_date", { isValid })
              }
              onEndDateTimeValidationChange={(isValid) =>
                setField("end_date", { isValid })
              }
              validationSchema={dateTimeRangeValidationSchema({
                required: true,
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
                onValidationChange={(isValid) =>
                  setField("location", { isValid })
                }
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
                value={moduleState?.location?.value}
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
                value={moduleState?.organizer?.value}
                placeholder={"e.g Science Department"}
                ref={organizerRef}
              />
            </div>
            <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.2} />
            <EventImagesField
              existingImages={updateState.existingImages}
              removeImageIds={updateState.removeImageIds}
              onToggleRemove={(imageId) =>
                dispatch(
                  toggleRemoveImage({ imageId, actionType: "updateContent" }),
                )
              }
              images={images}
              onImagesChange={handleImagesChange}
              order={imageOrder}
              onOrderChange={handleOrderChange}
            />
          </div>
        </div>
      )}
      <div className="drawer-footer font-size-sm">
        <div className="d-flex flex-column w-100">
          <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.5} />
          <div className="d-flex flex-row align-items-center justify-content-between p-2">
            {isDirty ? (
              <ModalButton
                action={{ modalContent: UpdateEventDiscardWarning }}
                size={"md"}
                rowData={{ handleCloseDrawer: handleClose }}
                closeOnOutsideClick={false}
                closeOnEscape={false}
              >
                <button className="border-none bg-none">Cancel</button>
              </ModalButton>
            ) : (
              <button className="border-none bg-none" onClick={closeDrawer}>
                Cancel
              </button>
            )}
            {isDirty && (
              <button
                className="border-none rounded-3 primary-background text-white font-size-sm px-3 py-2"
                onClick={() => handleUpdateContent()}
                disabled={isPending}
              >
                {isPending ? <SingleSpinner /> : "Update Content"}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default UpdateEventContent;
