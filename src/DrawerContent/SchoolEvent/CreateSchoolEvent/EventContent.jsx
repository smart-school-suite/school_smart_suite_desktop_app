import {
  TextAreaInput,
  TextInput,
  DateTimeRangeInput,
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
import { useGetEventCategories } from "../../../hooks/eventCategory/useGetEventCategories";
import { useSelector, useDispatch } from "react-redux";
import {
  setEventContent,
  resetCreateEvent,
} from "../../../Slices/schoolEvent/schoolEventSlice";
import { useRef } from "react";
import { ShieldAlert, Info, TriangleAlert, CircleCheck, X } from "lucide-react";
import toast from "react-hot-toast";
import ToastWarning from "../../../components/Toast/ToastWarning";
import RectangleSkeleton from "../../../components/SkeletonPageLoader/RectangularSkeleton";
import { motion, AnimatePresence } from "framer-motion";
import { ModalButton } from "../../../components/DataTableComponents/ActionComponent";
import { allFieldsValid } from "../../../utils/functions";
import { useState } from "react";
import { useGetTags } from "../../../hooks/tag/useGetTags";
function EventContent({ handleClose, currentStep, nextStep, fullStep }) {
  const dispatch = useDispatch();
  const titleRef = useRef();
  const contentRef = useRef();
  const tagRef = useRef();
  const categoryRef = useRef();
  const locationRef = useRef();
  const organizerRef = useRef();
  const dateRef = useRef();
  const [errors, setErrors] = useState(null);
  const moduleState = useSelector((state) => state.schoolEvent.createEvent);
  const { data: category, isLoading: isCategoryLoading } =
    useGetEventCategories();
  const { data: tags, isLoading: isTagLoading } = useGetTags();

  const handlePrevalidation = async () => {
    const title = await titleRef.current.triggerValidation();
    const content = await contentRef.current.triggerValidation();
    const tag = await tagRef.current.triggerValidation();
    const category = await categoryRef.current.triggerValidation();
    const date = await dateRef.current.triggerValidation();
    const location = await locationRef.current.triggerValidation();
    const organizer = await organizerRef.current.triggerValidation();
    return {
      title,
      content,
      tag,
      category,
      date,
      location,
      organizer,
    };
  };

  const handleNext = async () => {
    const prevalidation = await handlePrevalidation();
    if (!allFieldsValid(prevalidation)) {
      setErrors({
        title: "Invalid Fields",
        message:
          "Some Fields are invalid please ensure that all fields are valid before proceeding to the next step",
      });
      return;
    }
    if (!moduleState?.content?.label?.value?.id) {
      setErrors({
        title: "Announcement Label Required",
        message:
          "Announcement Label Required, You must select atleast one label before proceeding to the next step",
      });
      return;
    }
    nextStep();
  };
  return (
    <>
      <div className="d-flex flex-row align-items-center justify-content-between border-bottom p-2 font-size-sm">
        <span className="fw-medium">Create School Event</span>
        <button
          className="bg-none border-none border rounded-circle"
          aria-label="Close drawer"
          onClick={() => {
            handleClose();
          }}
          style={{
            width: "2rem",
            height: "2rem",
            display: "grid",
            placeItems: "center",
            cursor: "pointer",
          }}
        >
          <X size={16} />
        </button>
      </div>
      <div className="d-flex flex-row align-items-center justify-content-between font-size-sm px-2 pt-2">
        <div className="d-flex flex-column">
          <span className="fw-medium">Event content</span>
          <p className="text-iron-400">
            Give your Event a clear identity and message.
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
      {errors && (
        <div className="p-2">
          <div className="bg-red-50 text-red-800 font-size-sm rounded-2 px-2 py-1">
            <div className="d-flex flex-row align-items-center justify-content-between">
              <span className="fw-semibold">{errors?.title}</span>
              <button
                className="bg-none border-none rounded-circle"
                aria-label="Close drawer"
                onClick={() => {
                  setErrors(null);
                }}
                style={{
                  width: "2rem",
                  height: "2rem",
                  display: "grid",
                  placeItems: "center",
                  cursor: "pointer",
                }}
              >
                <X size={16} />
              </button>
            </div>
            <ul>
              <li>
                <p>{errors?.message}</p>
              </li>
            </ul>
          </div>
        </div>
      )}
      <div
        className="drawer-content px-2 pt-3 font-size-sm"
        style={{ paddingBottom: "10rem" }}
      >
        <div className="d-flex flex-column gap-1">
          <span className="text-iron-400">Event Details</span>
          <div className="d-flex flex-column gap-2">
            <div className="d-flex flex-column gap-1">
              <span>Event Title</span>
              <TextInput
                onChange={(value) =>
                  dispatch(
                    setEventContent({
                      field: "title",
                      value: value,
                      actionType: "createEvent",
                    }),
                  )
                }
                onValidationChange={(value) =>
                  dispatch(
                    setEventContent({
                      field: "title",
                      isValid: value,
                      actionType: "createEvent",
                    }),
                  )
                }
                validationSchema={nameSchema({
                  min: 3,
                  max: 200,
                  required: true,
                  messages: {
                    required: "Event Title Required",
                    min: "Event Title Must Be Atleast 3 Characters Long",
                    max: "Event Title Must Not Exceed 200 Characters",
                  },
                })}
                value={moduleState?.content?.title?.value}
                placeholder={"e.g Upcoming School Science Fair"}
                ref={titleRef}
              />
            </div>
            <div className="d-flex flex-column gap-1">
              <span>Event Description</span>
              <TextAreaInput
                onChange={(value) =>
                  dispatch(
                    setEventContent({
                      field: "content",
                      value: value,
                      actionType: "createEvent",
                    }),
                  )
                }
                onValidationChange={(value) =>
                  dispatch(
                    setEventContent({
                      field: "content",
                      isValid: value,
                      actionType: "createEvent",
                    }),
                  )
                }
                value={moduleState?.content?.content?.value}
                placeholder={"Enter School Event Content"}
                validationSchema={textareaSchema({
                  min: 10,
                  max: 1000,
                  required: true,
                  messages: {
                    required: "School Event Description Required",
                    min: "School Event Description Must Be Atleast 10 Characters Long",
                    max: "School Event Description Must Be Not Exceed 1000 Characters",
                  },
                })}
                ref={contentRef}
              />
            </div>
            <div className="d-flex flex-column gap-1">
              <span className="fw-medium">Category</span>
              <CustomDropdown
                data={category?.data || []}
                displayKey={["name"]}
                valueKey={["id"]}
                direction="up"
                onSelect={(value) => {
                  dispatch(
                    setEventContent({
                      field: "category",
                      actionType: "createEvent",
                      value:
                        category?.data?.find((g) => g.id === value.id) || {},
                    }),
                  );
                }}
                placeholder="Select Event Category"
                error={moduleState?.content?.category?.error}
                isLoading={isCategoryLoading}
                errorMessage="Event Category Required"
                onError={(msg) => {}}
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
                    toast.custom(
                      <ToastWarning
                        title={"Max Amount Reached"}
                        description={
                          "You can only select from 1 - 5 tags maximum"
                        }
                      />,
                    );
                    return;
                  }
                  dispatch(
                    setEventContent({
                      field: "tags",
                      actionType: "createEvent",
                      value: tags?.data.filter((t) =>
                        selectedIds.some((id) => id.id == t.id),
                      ),
                    }),
                  );
                }}
                onError={(error) =>
                  dispatch(
                    setEventContent({
                      field: "tags",
                      actionType: "createEvent",
                      error: error,
                    }),
                  )
                }
                error={moduleState?.content?.tags?.error}
                ref={tagRef}
                value={moduleState?.content?.tags?.value}
              />
            </div>
          </div>
          <span className="text-iron-400">Schedule</span>
          <div className="d-flex flex-column gap-1">
            <DateTimeRangeInput
              startValue={moduleState?.content?.start_date_time?.value}
              endValue={moduleState?.content?.end_date_time?.value}
              onStartDateTimeChange={(startDateTime) => {
                dispatch(
                  setEventContent({
                    field: "start_date_time",
                    actionType: "createEvent",
                    value: startDateTime,
                  }),
                );
              }}
              onEndDateTimeChange={(endDateTime) => {
                dispatch(
                  setEventContent({
                    field: "end_date_time",
                    actionType: "createEvent",
                    value: endDateTime,
                  }),
                );
              }}
              onStartDateTimeValidationChange={(startDateTimeError) => {
                dispatch(
                  setEventContent({
                    field: "start_date_time",
                    actionType: "createEvent",
                    value: startDateTimeError,
                  }),
                );
              }}
              onEndDateTimeValidationChange={(endDateTimeError) => {
                dispatch(
                  setEventContent({
                    field: "end_date_time",
                    actionType: "createEvent",
                    value: endDateTimeError,
                  }),
                );
              }}
              validationSchema={dateTimeRangeValidationSchema({
                futureOrNow: true,
                required: true,
                allowPast: false,
              })}
              ref={dateRef}
            />
          </div>
          <div className="d-flex flex-column gap-3">
            <span className="text-iron-400">Location & Organizers</span>
            <div className="d-flex flex-column gap-1">
              <div className="d-flex flex-column gap-1">
                <span>Location</span>
                <TextInput
                  onChange={(value) =>
                    dispatch(
                      setEventContent({
                        field: "location",
                        value: value,
                        actionType: "createEvent",
                      }),
                    )
                  }
                  onValidationChange={(value) =>
                    dispatch(
                      setEventContent({
                        field: "location",
                        isValid: value,
                        actionType: "createEvent",
                      }),
                    )
                  }
                  validationSchema={nameSchema({
                    min: 3,
                    max: 200,
                    required: true,
                    messages: {
                      required: "Event Location Required",
                      min: "Event Location Must Be Atleast 3 Characters Long",
                      max: "Event Location Must Not Exceed 200 Characters",
                    },
                  })}
                  value={moduleState?.content?.location?.value}
                  placeholder={"e.g Biyem-assi Yaounde"}
                  ref={locationRef}
                />
              </div>
              <div className="d-flex flex-column gap-1">
                <span>Oraganizer</span>
                <TextInput
                  onChange={(value) =>
                    dispatch(
                      setEventContent({
                        field: "organizer",
                        value: value,
                        actionType: "createEvent",
                      }),
                    )
                  }
                  onValidationChange={(value) =>
                    dispatch(
                      setEventContent({
                        field: "organizer",
                        isValid: value,
                        actionType: "createEvent",
                      }),
                    )
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
                  placeholder={"e.g Exhist Yaounde"}
                  ref={organizerRef}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="drawer-footer font-size-sm">
        <div className="d-flex flex-column w-100">
          <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.5} />
          <div className="d-flex flex-row align-items-center justify-content-between p-2">
            <button
              className="border-none bg-none"
              onClick={() => handleClose()}
            >
              Cancel
            </button>
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
