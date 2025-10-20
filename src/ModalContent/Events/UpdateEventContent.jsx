import { useGetSchoolEventDetails } from "../../hooks/schoolEvent/useGetSchoolEventDetails";
import { Icon } from "@iconify/react";
import {
  TextAreaInput,
  TextInput,
  DateTimeRangeInput,
} from "../../components/FormComponents/InputComponents";
import {
  addressSchema,
  nameSchema,
  textareaSchema,
  dateTimeRangeValidationSchema,
} from "../../ComponentConfig/YupValidationSchema";
import { useState, useCallback, useEffect } from "react";
import { useGetEventTags } from "../../hooks/schoolEvent/useGetSchoolEventTags";
import { useGetActiveEventCategories } from "../../hooks/eventCategory/useGetActiveEventCategories";
import { NotFoundError } from "../../components/errors/Error";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import {
  formatDate,
  optionalValidateObject,
  hasNonEmptyValue,
  truncateSeconds,
} from "../../utils/functions";
import CustomDropdown, {
  MultiSelectDropdown,
} from "../../components/Dropdowns/Dropdowns";
import TextDisplay from "../../components/TextComponents/TextDisplay";
import { useUpdateSchoolEventContent } from "../../hooks/schoolEvent/useUpdateSchoolEventContent";
import toast from "react-hot-toast";
import ToastWarning from "../../components/Toast/ToastWarning";
import { SingleSpinner } from "../../components/Spinners/Spinners";
function UpdateEventContent({ rowData, handleClose }) {
  const { id: schoolEventId } = rowData;
  const {
    data: schoolEventDetails,
    isLoading: isSchoolEventDetailsLoading,
    error: eventDetailsError,
  } = useGetSchoolEventDetails(schoolEventId);
  const {
    data: eventCategories,
    isLoading: isEventCategoryLoading,
    error: eventCategoryError,
  } = useGetActiveEventCategories();
  const {
    data: eventTags,
    isLoading: isEventTagLoading,
    error: eventTagError,
  } = useGetEventTags();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    event_category_id: "",
    organizer: "",
    location: "",
    start_date: "",
    end_date: "",
    tags: [],
  });
  const [isValid, setIsValid] = useState({
    title: null,
    description: null,
    organizer: null,
    location: null,
    start_date: null,
    end_date: null,
  });
  const [errors, setErrors] = useState({
    tags: "",
  });

  useEffect(() => {
    if (schoolEventDetails?.data) {
      setFormData((prev) => ({
        ...prev,
        title: schoolEventDetails.data.title || "",
        description: schoolEventDetails.data.description || "",
        tags: JSON.parse(schoolEventDetails?.data?.tags).map((items) => ({
          id: items.id,
        })),
        event_category_id: schoolEventDetails.data.event_category_id || "",
        organizer: schoolEventDetails.data.organizer || "",
        location: schoolEventDetails.data.location || "",
        start_date: truncateSeconds(schoolEventDetails.data.start_date) || "",
        end_date: truncateSeconds(schoolEventDetails.data.end_date) || "",
      }));
    }
  }, [setFormData, isSchoolEventDetailsLoading, rowData]);
  const handleStateChange = useCallback((field, value, stateFn) => {
    stateFn((prev) => ({ ...prev, [field]: value }));
  }, []);

  const { mutate: updateEventContent, isPending } =
    useUpdateSchoolEventContent(handleClose, schoolEventId);
  const handleUpdateContent = async () => {
    if (optionalValidateObject(isValid) == false) {
      toast.custom(
        <ToastWarning
          title={"Invalid Fields"}
          description={"Please Ensure All Fields Are Valid Before Submitting"}
        />
      );
      return;
    }
    if (hasNonEmptyValue(formData) == false) {
      toast.custom(
        <ToastWarning
          title={"Nothing To Update"}
          description={
            "Please Ensure Atleast One Field Is Updated Before Submitting"
          }
        />
      );
      return;
    }
    const payload = {
      title: formData.title,
      description: formData.description,
      event_category_id: formData.event_category_id,
      label_id: formData.label_id,
      tag_ids: formData.tags.map((items) => ({ tag_id: items.id })),
      organizer: formData.organizer,
      location: formData.location,
      start_date: formData.start_date,
      end_date: formData.end_date,
    };
    updateEventContent({ schoolEventId, updateData: payload });
  };
  return (
    <>
      <div className="h-100 d-flex flex-column align-items-center gap-2">
        <div
          className="d-flex flex-row align-items-center justify-content-between w-100"
          style={{ height: "5%" }}
        >
          <span className="m-0">Update Event Content</span>
          <span
            className="m-0"
            onClick={() => {
              handleClose();
            }}
          >
            <Icon icon="charm:cross" width="22" height="22" />
          </span>
        </div>
        {isSchoolEventDetailsLoading ||
        isEventCategoryLoading ||
        isEventTagLoading ? (
          <div className="d-flex flex-row w-100 gap-2">
            <div style={{ width: "70%" }} className="d-flex flex-column gap-2">
              {[...Array(7)].map((items, index) => (
                <RectangleSkeleton
                  width="100%"
                  height="8dvh"
                  speed={1}
                  key={index}
                />
              ))}
            </div>
            <div style={{ width: "30%" }}>
              <RectangleSkeleton width="100%" height="80dvh" speed={1} />
            </div>
          </div>
        ) : eventCategoryError || eventDetailsError || eventTagError ? (
          <NotFoundError
            title={
              eventCategories?.response?.data?.errors?.title ||
              eventDetailsError?.response?.data?.errors?.title ||
              eventTagError?.response?.data?.errors?.title
            }
            description={
              eventCategories?.response?.data?.errors?.description ||
              eventDetailsError?.response?.data?.errors?.description ||
              eventTagError?.response?.data?.errors?.description
            }
          ></NotFoundError>
        ) : (
          <>
            <div
              className="d-flex flex-row w-100 gap-2"
              style={{ height: "90%" }}
            >
              <div
                style={{ width: "70%" }}
                className="d-flex flex-column jgap-2"
              >
                <div>
                  <label htmlFor="title" className="font-size-sm">
                    Title
                  </label>
                  <TextInput
                    onChange={(value) =>
                      handleStateChange("title", value, setFormData)
                    }
                    onValidationChange={(value) =>
                      handleStateChange("title", value, setIsValid)
                    }
                    placeholder={formData.title || "Enter Event Title"}
                    value={formData.title}
                    validationSchema={nameSchema({
                      max: 250,
                      min: 3,
                      required: false,
                      messages: {
                        min: "Event Title Must Be Atleast 3 Characters Long",
                        max: "Event Title Should Not Exceed 250 Characters",
                      },
                    })}
                  />
                </div>
                <div className="d-flex flex-row align-items-center gap-2 w-100">
                  <div className="w-50">
                    <label htmlFor="category" className="font-size-sm">
                      Event Category
                    </label>
                    <CustomDropdown
                      data={eventCategories?.data || []}
                      displayKey={["name"]}
                      valueKey={["id"]}
                      direction="up"
                      onSelect={(value) =>
                        handleStateChange(
                          "event_category_id",
                          value.id,
                          setFormData
                        )
                      }
                      placeholder="Select Event Category"
                      error={errors.event_category_id}
                      isLoading={isEventCategoryLoading}
                      errorMessage="Event Category Required"
                      onError={(msg) =>
                        handleStateChange("event_category_id", msg, setErrors)
                      }
                      value={formData.event_category_id}
                    />
                  </div>
                  <div className="w-50">
                    <label htmlFor="tags" className="font-size-sm">
                      Tag (Tip: You can select up to five)
                    </label>
                    <MultiSelectDropdown
                      data={eventTags?.data || []}
                      displayKey={["name"]}
                      valueKey={["id"]}
                      direction="up"
                      isLoading={isEventTagLoading}
                      placeholder={"Select Tags"}
                      errorMessage={"Event Tags Required"}
                      value={formData.tags}
                      onSelect={(value) => {
                        if (value.length > 5) {
                          toast.custom(
                            <ToastSuccess
                              title={"Max Amount Reached"}
                              description={
                                "You can only select from 1 - 5 tags maximum"
                              }
                            />
                          );
                          return;
                        }
                        handleStateChange("tags", value, setFormData);
                      }}
                      onError={(error) =>
                        handleStateChange("tags", error, setErrors)
                      }
                      error={errors.tags}
                    />
                  </div>
                </div>
                <div>
                  <DateTimeRangeInput
                    startValue={formData.start_date}
                    endValue={formData.end_date}
                    placeholderStart={formData.start_date}
                    placeholderEnd={formData.end_date}
                    onStartDateTimeChange={(value) =>
                      handleStateChange("start_date", value, setFormData)
                    }
                    onEndDateTimeChange={(value) =>
                      handleStateChange("end_date", value, setFormData)
                    }
                    onStartDateTimeValidationChange={(value) =>
                      handleStateChange("start_date", value, setIsValid)
                    }
                    onEndDateTimeValidationChange={(value) =>
                      handleStateChange("end_date", value, setIsValid)
                    }
                    validationSchema={dateTimeRangeValidationSchema({
                      required: false,
                      futureOrNow: true,
                      messages: {
                        startRequired: "Event start time required",
                        endRequired: "Event end time required",
                      },
                    })}
                  />
                </div>
                <div className="d-flex flex-row align-items-center gap-2 w-100">
                  <div className="w-50">
                    <label htmlFor="location" className="font-size-sm">
                      Location
                    </label>
                    <TextInput
                      type={"address"}
                      onChange={(value) =>
                        handleStateChange("location", value, setFormData)
                      }
                      onValidationChange={(value) =>
                        handleStateChange("location", value, setIsValid)
                      }
                      value={formData.location}
                      validationSchema={addressSchema({
                        min: 3,
                        max: 150,
                        required: false,
                        messages: {
                          max: "Location Must Not Exceed 150 Characters",
                          min: "Location Must Be Atleast 3 Characters Long",
                        },
                      })}
                      placeholder={formData.location || "E.g EXHIST"}
                    />
                  </div>
                  <div className="w-50">
                    <label htmlFor="organizers" className="font-size-sm">
                      Organizer
                    </label>
                    <TextInput
                      onChange={(value) =>
                        handleStateChange("organizer", value, setFormData)
                      }
                      onValidationChange={(value) =>
                        handleStateChange("organizer", value, setIsValid)
                      }
                      value={formData.organizer}
                      validationSchema={nameSchema({
                        required: false,
                        min: 3,
                        max: 150,
                        messages: {
                          max: "Organizer Name Must Not Exceed 150 Characters",
                          min: "Organizer Name Must Be Atleast 3 Characters Long",
                        },
                      })}
                      placeholder={formData.organizer || "E.g EXHIST"}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="description" className="font-size-sm">
                    Description
                  </label>
                  <TextAreaInput
                    onChange={(value) =>
                      handleStateChange("description", value, setFormData)
                    }
                    onValidationChange={(value) =>
                      handleStateChange("description", value, setIsValid)
                    }
                    validationSchema={textareaSchema({
                      required: false,
                      min: 10,
                      max: 1000,
                      messages: {
                        min: "Event Description Must Be Atleast 10 Characters Long",
                        max: "Event Description Must Not Exceed 1000 Characters",
                      },
                    })}
                    value={formData.description}
                    placeholder={
                      formData.description || "Enter Event Description"
                    }
                  />
                </div>
              </div>
              <div
                className="d-flex flex-column h-100"
                style={{ width: "30%" }}
              >
                <span className="fs-6 fw-semibold">Event Preview</span>
                <div className="card p-2 rounded-4 d-flex flex-column gap-2 h-100">
                  <div className="w-100" style={{ height: "40%" }}>
                    <img
                      src="./images/event-img-one.jpg"
                      className="object-fit-cover w-100 rounded-3 h-100"
                    />
                  </div>
                  <div
                    style={{ height: "60%" }}
                    className="d-flex flex-column gap-1 justify-content-between"
                  >
                    <div>
                      <span className="fw-bold">{formData.title}</span>
                    </div>
                    <div>
                      <TextDisplay
                        content={formData.description}
                        maxLength={175}
                        textStyle={"font-size-sm"}
                        readMeStyle={"fw-semibold text-dark"}
                      />
                    </div>
                    <div className="d-flex flex-row flex-wrap gap-2">
                      {formData.tags.map((item) => {
                        const matchingTag = eventTags?.data.find(
                          (tag) => tag.id === item.id
                        );
                        return (
                          <div
                            className=" primary-background-50 px-3 py-2 rounded-pill color-primary"
                            key={item.id}
                            style={{ fontSize: "0.65rem" }}
                          >
                            <span>
                              {matchingTag ? matchingTag.name : "N/A"}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                    <div className="d-flex flex-column gap-1 font-size-sm">
                      <div className="d-flex flex-row align-items-center gap-2">
                        <Icon icon="ion:location-outline" />
                        <span>{formData.organizer}</span>
                      </div>
                      <div className="d-flex flex-row align-items-center gap-2">
                        <Icon icon="material-symbols:next-plan-outline-rounded" />
                        <span>{formData.location}</span>
                      </div>
                    </div>
                    <div className="d-flex flex-row gap-1 align-items-center fw-semibold font-size-sm">
                      <Icon icon="solar:calendar-linear" />
                      <span>{formatDate(formData.start_date)}</span>
                      <Icon icon="radix-icons:dash" />
                      <span>{formatDate(formData.end_date)},</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="d-flex flex-row w-100 justify-content-end"
              style={{ height: "5%" }}
            >
              <button
                className="border-none primary-background text-white px-4 py-2 font-size-sm rounded-3"
                onClick={() => {
                  handleUpdateContent();
                }}
              >
                {isPending ? <SingleSpinner /> : "Update Event"}
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
export default UpdateEventContent;
