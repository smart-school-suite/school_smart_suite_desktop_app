import { Icon } from "@iconify/react";
import {
  TextAreaInput,
  TextInput,
  DateTimeRangeInput,
  DateTimeInput,
} from "../../components/FormComponents/InputComponents";
import {
  addressSchema,
  nameSchema,
  textareaSchema,
  dateTimeValidationSchema,
  dateTimeRangeValidationSchema,
} from "../../ComponentConfig/YupValidationSchema";
import { useGetEventTags } from "../../hooks/schoolEvent/useGetSchoolEventTags";
import { useGetActiveEventCategories } from "../../hooks/eventCategory/useGetActiveEventCategories";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import {
  allFieldsValid,
  formatDate,
} from "../../utils/functions";
import CustomDropdown, {
  MultiSelectDropdown,
} from "../../components/Dropdowns/Dropdowns";
import { useState, useCallback, useRef } from "react";
import ToastWarning from "../../components/Toast/ToastWarning";
import TextDisplay from "../../components/TextComponents/TextDisplay";
import { useGetSpecialties } from "../../hooks/specialty/useGetSpecialties";
import { useGetTeachers } from "../../hooks/teacher/useGetTeachers";
import { useGetSchoolAdmins } from "../../hooks/schoolAdmin/useGetSchoolAdmins";
import { announcementStatus } from "../../data/data";
import { useCreateSchoolEvent } from "../../hooks/schoolEvent/useCreateSchoolEvent";
import { SingleSpinner } from "../../components/Spinners/Spinners";
function CreateEvent({ handleClose }) {
  const [tab, setTab] = useState("createContent");
  const { data: eventTags, isLoading: isEventTagLoading } = useGetEventTags();
  const { data: eventCategories, isLoading: isEventCategoryLoading } =
    useGetActiveEventCategories();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    event_category_id: "",
    background_image: "",
    organizer: "",
    location: "",
    start_date: "",
    end_date: "",
    status: "",
    published_at: "",
    tags: [],
    student_audience: [],
    teacher_ids: [],
    school_admin_ids: [],
  });
  const [isValid, setIsValid] = useState({
    title: null,
    description: null,
    organizer: null,
    location: null,
    start_date: null,
    end_date: null,
    published_at: null,
  });

  const [errors, setErrors] = useState({
    tags: "",
    student_audience: "",
    teacher_ids: "",
    school_admin_ids: "",
    status: "",
  });
  const handleStateChange = useCallback((field, value, stateFn) => {
    stateFn((prev) => ({ ...prev, [field]: value }));
  }, []);
  return (
    <>
      {tab == "createContent" ? (
        <CreateContent
          tab={tab}
          setTab={setTab}
          errors={errors}
          setErrors={setErrors}
          isValid={isValid}
          setIsValid={setIsValid}
          formData={formData}
          setFormData={setFormData}
          handleStateChange={handleStateChange}
          eventTags={eventTags}
          eventCategories={eventCategories}
          isCategoryLoading={isEventCategoryLoading}
          isEventTagLoading={isEventTagLoading}
          handleClose={handleClose}
        />
      ) : (
        <CreateSchoolEvent
          tab={tab}
          setTab={setTab}
          errors={errors}
          setErrors={setErrors}
          isValid={isValid}
          setIsValid={setIsValid}
          formData={formData}
          setFormData={setFormData}
          handleStateChange={handleStateChange}
          eventTags={eventTags}
          eventCategories={eventCategories}
          isCategoryLoading={isEventCategoryLoading}
          isEventTagLoading={isEventTagLoading}
          handleClose={handleClose}
        />
      )}
    </>
  );
}
export default CreateEvent;

function CreateContent({
  setTab,
  errors,
  setErrors,
  isValid,
  setIsValid,
  formData,
  setFormData,
  handleStateChange,
  eventTags,
  eventCategories,
  isCategoryLoading,
  isEventTagLoading,
  handleClose,
}) {
  const titleRef = useRef();
  const descriptionRef = useRef();
  const organizerRef = useRef();
  const locationRef = useRef();
  const eventCategoryRef = useRef();
  const tagRef = useRef();
  const dateTimeRangeRef = useRef();

  const handlePrevalidation = async () => {
    const title = await titleRef.current.triggerValidation();
    const description = await descriptionRef.current.triggerValidation();
    const organizer = await organizerRef.current.triggerValidation();
    const location = await locationRef.current.triggerValidation();
    const category = await eventCategoryRef.current.triggerValidation();
    const tag = await tagRef.current.triggerValidation();
    const startDate = await dateTimeRangeRef.current.preValidateStart();
    const endDate = await dateTimeRangeRef.current.preValidateEnd();

    return {
      title,
      description,
      organizer,
      location,
      category,
      tag,
      startDate,
      endDate,
    };
  };

  const handleNext = async () => {
    const prevalidation = await handlePrevalidation();
    if (!allFieldsValid(prevalidation)) {
      toast.custom(
        <ToastWarning
          title={"Invalid Fields"}
          description={
            "Some Fields Seem To Be Invalid Please Go Through the form and try again"
          }
        />
      );
      return;
    }
    if (
      !allFieldsValid({
        title: isValid.title,
        description: isValid.description,
        organizer: isValid.organizer,
        location: isValid.location,
        start_date: isValid.start_date,
        end_date: isValid.end_date,
      })
    ) {
      toast.custom(
        <ToastWarning
          title={"Invalid Fields"}
          description={
            "Some Fields Seem To Be Invalid Please Go Through the form and try again"
          }
        />
      );
      return;
    }
    setTab("createEvent");
  };
  return (
    <>
      <div className="h-100 d-flex flex-column align-items-center gap-2">
        <div
          className="d-flex flex-row align-items-center justify-content-between w-100"
          style={{ height: "5%" }}
        >
          <span className="m-0">Create School Event Content</span>
          <span
            className="m-0"
            onClick={() => {
              handleClose();
            }}
          >
            <Icon icon="charm:cross" width="22" height="22" />
          </span>
        </div>
        <div className="d-flex flex-row w-100 gap-2" style={{ height: "90%" }}>
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
                placeholder={"e.g Cultural Week"}
                value={formData.title}
                validationSchema={nameSchema({
                  max: 250,
                  min: 3,
                  required: true,
                  messages: {
                    required: "Event Title Required",
                    min: "Event Title Must Be Atleast 3 Characters Long",
                    max: "Event Title Should Not Exceed 250 Characters",
                  },
                })}
                ref={titleRef}
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
                  isLoading={isCategoryLoading}
                  errorMessage="Event Category Required"
                  onError={(msg) =>
                    handleStateChange("event_category_id", msg, setErrors)
                  }
                  ref={eventCategoryRef}
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
                  ref={tagRef}
                />
              </div>
            </div>
            <div>
              <DateTimeRangeInput
                startValue={formData.start_date}
                endValue={formData.end_date}
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
                  required: true,
                  futureOrNow: true,
                  messages: {
                    startRequired: "Event start time required",
                    endRequired: "Event end time required",
                  },
                })}
                ref={dateTimeRangeRef}
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
                    required: true,
                    min: 3,
                    max: 150,
                    messages: {
                      required: "Event Location Required",
                      max: "Location Must Not Exceed 150 Characters",
                      min: "Location Must Be Atleast 3 Characters Long",
                    },
                  })}
                  placeholder={"E.g EXHIST"}
                  ref={locationRef}
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
                    required: true,
                    min: 3,
                    max: 150,
                    messages: {
                      required: "Organizer Name Required",
                      max: "Organizer Name Must Not Exceed 150 Characters",
                      min: "Organizer Name Must Be Atleast 3 Characters Long",
                    },
                  })}
                  placeholder={"E.g EXHIST"}
                  ref={organizerRef}
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
                  required: true,
                  min: 10,
                  max: 1000,
                  messages: {
                    required: "Event Description Required",
                    min: "Event Description Must Be Atleast 10 Characters Long",
                    max: "Event Description Must Not Exceed 1000 Characters",
                  },
                })}
                value={formData.description}
                ref={descriptionRef}
              />
            </div>
          </div>
          <div className="d-flex flex-column h-100" style={{ width: "30%" }}>
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
                        <span>{matchingTag ? matchingTag.name : "N/A"}</span>
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
              handleNext();
            }}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

function CreateSchoolEvent({
  setTab,
  errors,
  setErrors,
  isValid,
  setIsValid,
  formData,
  setFormData,
  handleStateChange,
  eventTags,
  handleClose,
}) {
  const { data: specialty, isLoading: isSpecialtyLoading } =
    useGetSpecialties();
  const { data: teachers, isLoading: isTeacherLoading } = useGetTeachers();
  const { data: schoolAdmins, isLoading: isSchoolAdminLoading } =
    useGetSchoolAdmins();
  const { mutate: createEvent, isPending } = useCreateSchoolEvent(handleClose);
  const publishedAtRef = useRef();
  const handlePrevalidation = async () => {
    if (
      formData.student_audience.length === 0 &&
      formData.school_admin_ids.length === 0 &&
      formData.teacher_ids === 0
    ) {
      toast.custom(
        <ToastWarning
          title={"You Must Have At Least One Recipient"}
          description={
            "You must select at least one recipient from either the students, school admins, or teachers."
          }
        />
      );
      return;
    }
    const result = {};
    if (formData.status == "scheduled") {
      const publishedAt = await publishedAtRef.current.triggerValidation();
      return { ...result, publishedAt };
    }
  };
  const handleCreateSchoolEvent = async () => {
    if (formData.status == "scheduled") {
      const prevalidation = await handlePrevalidation();
      if (!allFieldsValid(prevalidation)) {
        toast.custom(
          <ToastWarning
            title={"Invalid Fields"}
            description={
              "Some Fields Seem To Be Invalid Please Go Through the form and try again"
            }
          />
        );
        return;
      }
      if (
        !allFieldsValid({
          published_at: isValid.published_at,
        })
      ) {
        toast.custom(
          <ToastWarning
            title={"Invalid Fields"}
            description={
              "Some Fields Seem To Be Invalid Please Go Through the form and try again"
            }
          />
        );
        return;
      }
    }
    const payload = {
      title: formData.title,
      description: formData.description,
      event_category_id: formData.event_category_id,
      background_image: null,
      organizer: formData.organizer,
      location: formData.location,
      start_date: formData.start_date,
      end_date: formData.end_date,
      status: formData.status,
      published_at: formData.published_at,
      tag_ids: formData.tags.map((tag) => ({
        tag_id: tag.id,
      })),
      teacher_ids: formData.teacher_ids.map((teacher) => ({
        teacher_id: teacher.id,
      })),
      school_admin_ids: formData.school_admin_ids.map((schoolAdmin) => ({
        school_admin_id: schoolAdmin.id,
      })),
      student_audience: formData.student_audience.map((student) => ({
        student_audience_id: student.id,
      })),
    };
    createEvent(payload);
  };
  return (
    <>
      <div className="h-100 d-flex flex-column align-items-center">
        <div
          className="d-flex flex-row align-items-center justify-content-between w-100"
          style={{
            height: "5%",
          }}
        >
          <span className="m-0">Create School Event</span>
          <span
            className="m-0"
            onClick={() => {
              handleClose();
            }}
          >
            <Icon icon="charm:cross" width="22" height="22" />
          </span>
        </div>
        <div
          className="d-flex flex-row align-items-start gap-2 w-100"
          style={{
            height: "85%",
          }}
        >
          <div className="d-flex flex-column" style={{ width: "70%" }}>
            <div>
              <label htmlFor="students" className="font-size-sm">
                Students
              </label>
              <MultiSelectDropdown
                data={
                  specialty?.data.map((items) => ({
                    id: items.id,
                    specialty_name: `${items.specialty_name} students`,
                    level_name: items.level_name,
                  })) || []
                }
                value={formData.student_audience}
                displayKey={["specialty_name", "level_name"]}
                valueKey={["id"]}
                direction="up"
                isLoading={isSpecialtyLoading}
                placeholder={"Select Student Reciepient"}
                errorMessage={"Student Reciepient Required"}
                onSelect={(value) =>
                  handleStateChange("student_audience", value, setFormData)
                }
                onError={(error) =>
                  handleStateChange("student_audience", error, setErrors)
                }
                error={errors.student_audience}
                optional={true}
              />
            </div>
            <div>
              <label htmlFor="teacher" className="font-size-sm">
                Teacher
              </label>
              <MultiSelectDropdown
                data={teachers?.data || []}
                displayKey={["name"]}
                valueKey={["id"]}
                direction="up"
                value={formData.teacher_ids}
                isLoading={isTeacherLoading}
                placeholder={"Select Teacher Reciepient"}
                errorMessage={"Teacher Reciepient Required"}
                onSelect={(value) =>
                  handleStateChange("teacher_ids", value, setFormData)
                }
                onError={(error) =>
                  handleStateChange("teacher_ids", error, setErrors)
                }
                error={errors.teacher_ids}
                optional={true}
              />
            </div>
            <div>
              <label htmlFor="schoolAdmin" className="font-size-sm">
                School Admin
              </label>
              <MultiSelectDropdown
                data={schoolAdmins?.data || []}
                displayKey={["name"]}
                valueKey={["id"]}
                direction="up"
                isLoading={isSchoolAdminLoading}
                placeholder={"Select school Admin Reciepient"}
                errorMessage={"School Admin Reciepient Required"}
                onSelect={(value) =>
                  handleStateChange("school_admin_ids", value, setFormData)
                }
                onError={(error) =>
                  handleStateChange("school_admins_ids", error, setErrors)
                }
                error={errors.school_admin_ids}
                optional={true}
                value={formData.school_admin_ids}
              />
            </div>
            <div>
              <label htmlFor="status" className="font-size-sm">
                Status
              </label>
              <CustomDropdown
                data={announcementStatus || []}
                displayKey={["name", "description"]}
                valueKey={["value"]}
                direction="up"
                onSelect={(value) =>
                  handleStateChange("status", value.value, setFormData)
                }
                placeholder="Select School Event Status"
                error={errors.status}
                errorMessage="School Event Status Required"
                onError={(msg) => handleStateChange("status", msg, setErrors)}
                value={formData.status}
              />
            </div>
            {formData.status === "scheduled" && (
              <div className="w-100 mt-1">
                <label
                  htmlFor="publishedAt"
                  className="font-size-sm gainsboro-color fw-light"
                >
                  Schedule Events To Be Published at the specified datetime
                  mentioned below
                </label>
                <div className="w-100">
                  <label htmlFor="publishedDate" className="font-size-sm">
                    Publish Date
                  </label>
                  <DateTimeInput
                    onChange={(value) =>
                      handleStateChange("published_at", value, setFormData)
                    }
                    onValidationChange={(value) =>
                      handleStateChange("published_at", value, setIsValid)
                    }
                    value={formData.value}
                    validationSchema={dateTimeValidationSchema({
                      required: true,
                      futureOrToday: true,
                      messages: {
                        required: "Published Date Required",
                      },
                    })}
                    ref={publishedAtRef}
                  />
                </div>
              </div>
            )}
          </div>
          <div className="d-flex flex-column h-100" style={{ width: "30%" }}>
            <span className="fs-6 fw-semibold">Event Preview</span>
            <div className="card p-2 rounded-4 d-flex flex-column gap-2 h-100">
              <div className="w-100" style={{ height: "40%" }}>
                <img
                  src="./images/event-img-two.jpg"
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
                        <span>{matchingTag ? matchingTag.name : "N/A"}</span>
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
          className="d-flex flex-row align-items-center justify-content-between w-100"
          style={{
            height: "10%",
          }}
        >
          <div>
            <div
              className="d-flex flex-row align-items-center gap-2 color-primary font-size-sm pointer-cursor"
              onClick={() => {
                setTab("createContent");
              }}
            >
              <span>
                <Icon icon="eva:arrow-back-outline" />
              </span>
              <span>Back</span>
            </div>
          </div>
          <button
            className="border-none primary-background text-white px-4 py-2 font-size-sm rounded-3"
            onClick={() => {
              handleCreateSchoolEvent();
            }}
          >
            {isPending ? <SingleSpinner /> : "Create Event"}
          </button>
        </div>
      </div>
    </>
  );
}
