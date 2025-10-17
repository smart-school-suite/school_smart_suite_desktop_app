import { Icon } from "@iconify/react";
import {
  TimeInput,
  TextAreaInput,
  TextInput,
  DateInput,
} from "../../components/FormComponents/InputComponents";
import { useState, useCallback, useRef } from "react";
import {
  dateValidationSchema,
  nameSchema,
  textareaSchema,
  timeValidationSchema,
} from "../../ComponentConfig/YupValidationSchema";
import { useGetAnnouncementTags } from "../../hooks/announcement/useGetAnnouncementTags";
import { useGetAnnouncementLabels } from "../../hooks/announcement/useGetAnnouncementLabels";
import { useGetAnnouncementCategories } from "../../hooks/announcement/useGetAnnouncementCategories";
import CustomDropdown, {
  MultiSelectDropdown,
} from "../../components/Dropdowns/Dropdowns";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import { useSelector } from "react-redux";
import {
  allFieldsValid,
  formatDate,
  formatToMySQLDateTime,
} from "../../utils/functions";
import { useGetSpecialties } from "../../hooks/specialty/useGetSpecialties";
import { useGetTeachers } from "../../hooks/teacher/useGetTeachers";
import { useGetSchoolAdmins } from "../../hooks/schoolAdmin/useGetSchoolAdmins";
import { announcementStatus } from "../../data/data";
import ToastWarning from "../../components/Toast/ToastWarning";
import { useCreateAnnouncement } from "../../hooks/announcement/useCreateAnnouncement";
import { SingleSpinner } from "../../components/Spinners/Spinners";
function CreateAnnouncement({ handleClose }) {
  const [toggle, setToggle] = useState("createContent");
  const { data: tags, isLoading: isTagLoading } = useGetAnnouncementTags();
  const { data: labels, isLoading: isLabelLoading } = useGetAnnouncementLabels();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: [],
    label_id: "",
    category_id: "",
    status: "",
    student_audience: [],
    teacher_ids: [],
    school_admin_ids: [],
    published_date: "",
    published_time: "",
  });
  const [isValid, setIsValid] = useState({
    title: null,
    content: null,
    published_date: null,
    published_time: null,
  });
  const [errors, setErrors] = useState({
    tag_ids: "",
    label_id: "",
    category_id: "",
    status: "",
    student_audience: "",
    teacher_ids: "",
    school_admin_ids: "",
    published_at: "",
  });
  const handleStateChange = useCallback((field, value, stateFn) => {
    stateFn((prev) => ({ ...prev, [field]: value }));
  }, []);
  return (
    <>
      {toggle == "createContent" ? (
        <AnnouncementContent
          formData={formData}
          setIsValid={setIsValid}
          errors={errors}
          setErrors={setErrors}
          handleStateChange={handleStateChange}
          handleClose={handleClose}
          isValid={isValid}
          setFormData={setFormData}
          setToggle={setToggle}
          labelData={labels?.data || []}
          tagData={tags?.data || []}
          isTagLoading={isTagLoading}
          isLabelLoading={isLabelLoading}
        />
      ) : (
        <AnnouncementCreate
          formData={formData}
          setIsValid={setIsValid}
          errors={errors}
          setErrors={setErrors}
          handleStateChange={handleStateChange}
          handleClose={handleClose}
          isValid={isValid}
          setFormData={setFormData}
          setToggle={setToggle}
          labelData={labels?.data || []}
          tagData={tags?.data || []}
          isTagLoading={isTagLoading}
          isLabelLoading={isLabelLoading}
        />
      )}
    </>
  );
}
export default CreateAnnouncement;

function AnnouncementCreate({
  formData,
  setFormData,
  setIsValid,
  errors,
  setErrors,
  handleStateChange,
  handleClose,
  setToggle,
  labelData,
  tagData,
  isValid,
}) {
  const { data: specialty, isLoading: isSpecialtyLoading } =
    useGetSpecialties();
  const { data: teachers, isLoading: isTeacherLoading } = useGetTeachers();
  const { data: schoolAdmins, isLoading: isSchoolAdminLoading } =
    useGetSchoolAdmins();
  const { mutate: createAnnouncement, isPending } =
    useCreateAnnouncement(handleClose);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const dateRef = useRef();
  const timeRef = useRef();
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
      const date = await dateRef.current.triggerValidation();
      const time = await timeRef.current.triggerValidation();
      return { ...result, date, time };
    }
  };

  const handleCreateAnnouncement = async () => {
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
          published_date: isValid.published_date,
          published_time: isValid.published_time,
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
      content: formData.content,
      status: formData?.status || "draft",
      published_at: formatToMySQLDateTime(
        formData.published_date,
        formData.published_time
      ),
      category_id: formData.category_id,
      label_id: formData.label_id,
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

    createAnnouncement(payload);
  };
  return (
    <>
      <div className="d-flex flex-row align-items-center justify-content-between mb-3 w-100">
        <span>Create Announcement Content</span>
        <span
          className="m-0"
          onClick={() => {
            handleClose();
          }}
        >
          <Icon icon="charm:cross" width="22" height="22" />
        </span>
      </div>
      <div className="w-100 d-flex flex-row align-items-start gap-2">
        <div className="w-50 d-flex flex-column">
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
              placeholder="Select Announcement Status"
              error={errors.status}
              errorMessage="Announcement Status Required"
              onError={(msg) => handleStateChange("status", msg, setErrors)}
            />
          </div>
          {formData.status === "scheduled" && (
            <div className="w-100">
              <label
                htmlFor="publishedAt"
                className="font-size-sm gainsboro-color fw-light"
              >
                Schedule Announcement To Be Published at the specified datetime
                mentioned below
              </label>
              <div className="d-flex flex-row align-items-center gap-2 w-100">
                <div className="w-50">
                  <label htmlFor="date" className="font-size-sm">
                    Date
                  </label>
                  <DateInput
                    onChange={(value) =>
                      handleStateChange("published_date", value, setFormData)
                    }
                    onValidationChange={(value) =>
                      handleStateChange("published_date", value, setIsValid)
                    }
                    validationSchema={dateValidationSchema({
                      futureOrToday: true,
                      required: true,
                    })}
                    ref={dateRef}
                  />
                </div>
                <div className="w-50">
                  <label htmlFor="time" className="font-size-sm">
                    Time
                  </label>
                  <TimeInput
                    onChange={(value) =>
                      handleStateChange("published_time", value, setFormData)
                    }
                    onValidationChange={(value) =>
                      handleStateChange("published_time", value, setIsValid)
                    }
                    validationSchema={timeValidationSchema({
                      futureOrNow: true,
                      required: true,
                    })}
                    ref={timeRef}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="w-50 d-flex flex-column">
          <div className="d-flex flex-column gap-1">
            <span>Announcement Preview</span>
            <div
              className={`
              card p-2 rounded-4 d-flex flex-column gap-3 align-items-center ${
                darkMode && "dark-bg dark-mode-border dark-mode-text"
              }
              `}
            >
              <div className="w-100 d-flex flex-row align-items-center justify-content-between">
                <span className="fw-semibold">{formData?.title}</span>
                {formData.label_id && (
                  <div
                    className="py-1 px-2 d-flex align-items-center gap-1 font-size-xs primary-background-50 rounded-pill"
                    style={{
                      backgroundColor: labelData.find(
                        (label) => label.id === formData.label_id
                      )
                        ? JSON.parse(
                            labelData.find(
                              (label) => label.id === formData.label_id
                            ).color
                          ).color_light
                        : null,
                      color: labelData.find(
                        (label) => label.id === formData.label_id
                      )
                        ? JSON.parse(
                            labelData.find(
                              (label) => label.id === formData.label_id
                            ).color
                          ).color_thick
                        : null,
                    }}
                  >
                    <span>
                      <Icon
                        icon={
                          labelData.find(
                            (label) => label.id === formData.label_id
                          )
                            ? labelData.find(
                                (label) => label.id === formData.label_id
                              ).icon
                            : ""
                        }
                        className="font-size-sm"
                      />
                    </span>
                    <span>
                      {labelData.find((label) => label.id === formData.label_id)
                        ? labelData.find(
                            (label) => label.id === formData.label_id
                          ).name
                        : "N/A"}
                    </span>
                  </div>
                )}
              </div>
              <div className="font-size-sm">{formData.content}</div>
              <div className="d-flex flex-row flex-wrap gap-2">
                  {formData.tags.map((item) => {
                  const matchingTag = tagData?.find((tag) => tag.id === item.id);
                  return (
                    <div
                      className="font-size-sm primary-background-50 px-4 py-2 rounded-pill color-primary"
                      key={item.id}
                    >
                      <span>{matchingTag ? matchingTag.name : "N/A"}</span>
                    </div>
                  );
                })}
              </div>
              <div className="w-100">
                {formData?.status === "scheduled" && (
                  <div className="d-flex flex-row w-100 justify-content-start">
                    <div className="d-flex flex-column gap-2">
                      <span className="font-size-sm">
                        Scheduled To Be Published At
                      </span>
                      <div className="d-flex flex-row gap-2 font-size-sm align-items-center">
                        <span>
                          <Icon icon="solar:calendar-linear" />
                        </span>
                        <span>{formatDate(formData?.published_date)}</span>,
                        <span>{formData?.published_time}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex flex-row justify-content-between w-100 mt-2">
        <div
          className="d-flex flex-row align-items-center gap-2 color-primary font-size-sm pointer-cursor"
          onClick={() => {
            if (isPending) {
              return;
            }
            setToggle("createContent");
          }}
        >
          <span>
            <Icon icon="eva:arrow-back-outline" />
          </span>
          <span>Back</span>
        </div>
        <button
          className="border-none rounded-3 px-4 py-2 primary-background text-white font-size-sm"
          onClick={() => {
            handleCreateAnnouncement();
          }}
          disabled={isPending}
        >
         {
           isPending ? <SingleSpinner /> :  <span>Submit</span>
         }
        </button>
      </div>
    </>
  );
}
function AnnouncementContent({
  formData,
  setFormData,
  setIsValid,
  isValid,
  errors,
  setErrors,
  handleStateChange,
  handleClose,
  setToggle,
  labelData,
  tagData,
  isLabelLoading,
  isTagLoading
}) {
  const titleRef = useRef();
  const contentRef = useRef();
  const tagRef = useRef();
  const labelRef = useRef();
  const categoryRef = useRef();
  const handlePrevalidation = async () => {
    const title = await titleRef.current.triggerValidation();
    const content = await contentRef.current.triggerValidation();
    const tag = await tagRef.current.triggerValidation();
    const label = await labelRef.current.triggerValidation();
    const category = await categoryRef.current.triggerValidation();
    return {
      title,
      content,
      tag,
      label,
      category,
    };
  };
  const { data: categories, isLoading: isCategoryLoading } =
    useGetAnnouncementCategories();
  const darkMode = useSelector((state) => state.theme.darkMode);
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
    if (!allFieldsValid({ title: isValid.title, content: isValid.content })) {
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
    setToggle("createAnnouncement");
  };
  return (
    <>
      <div className="d-flex flex-row align-items-center justify-content-between mb-3 w-100">
        <span>Create Announcement Content</span>
        <span
          className="m-0"
          onClick={() => {
            handleClose();
          }}
        >
          <Icon icon="charm:cross" width="22" height="22" />
        </span>
      </div>
      <div className="d-flex flex-row align-items-start gap-2">
        <div className="w-50 d-flex flex-column gap-1">
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
              validationSchema={nameSchema({
                min: 3,
                max: 200,
                required: true,
                messages: {
                  required: "Announcement Title Required",
                  min: "Announcement Title Must Be Atleast 3 Characters Long",
                  max: "Announcement Title Must Not Exceed 200 Characters",
                },
              })}
              value={formData.title}
              placeholder={"e.g Upcoming School Science Fair"}
              ref={titleRef}
            />
          </div>
          <div>
            <label htmlFor="label" className="font-size-sm">
              Label
            </label>
            <CustomDropdown
              data={labelData.filter((items) => items.name !== 'All') || []}
              displayKey={["name"]}
              valueKey={["id"]}
              direction="up"
              onSelect={(value) =>
                handleStateChange("label_id", value.id, setFormData)
              }
              placeholder="Select Announcement Label"
              error={errors.label_id}
              isLoading={isLabelLoading}
              errorMessage="Announcement Label Required"
              onError={(msg) => handleStateChange("label_id", msg, setErrors)}
              ref={labelRef}
            />
          </div>
          <div>
            <label htmlFor="label" className="font-size-sm">
              Category
            </label>
            <CustomDropdown
              data={categories?.data || []}
              displayKey={["name"]}
              valueKey={["id"]}
              direction="up"
              onSelect={(value) =>
                handleStateChange("category_id", value.id, setFormData)
              }
              placeholder="Select Announcement Category"
              error={errors.category_id}
              isLoading={isCategoryLoading}
              errorMessage="Announcement Category Required"
              onError={(msg) =>
                handleStateChange("category_id", msg, setErrors)
              }
              ref={categoryRef}
            />
          </div>
          <div>
            <label htmlFor="tags" className="font-size-sm">
              Tag (Tip: You can select up to five)
            </label>
            <MultiSelectDropdown
              data={tagData || []}
              displayKey={["name"]}
              valueKey={["id"]}
              direction="up"
              isLoading={isTagLoading}
              placeholder={"Select Tags"}
              errorMessage={"Announcement Tags Required"}
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
              onError={(error) => handleStateChange("tag_ids", error, setErrors)}
              error={errors.tag_ids}
              ref={tagRef}
            />
          </div>
          <div>
            <label htmlFor="content" className="font-size-sm">
              Content
            </label>
            <TextAreaInput
              onChange={(value) =>
                handleStateChange("content", value, setFormData)
              }
              onValidationChange={(value) =>
                handleStateChange("content", value, setIsValid)
              }
              value={formData.content}
              placeholder={"Enter Announcement Content"}
              validationSchema={textareaSchema({
                min: 10,
                max: 1000,
                required: true,
                messages: {
                  required: "Announcement Description Required",
                  min: "Announcement Description Must Be Atleast 10 Characters Long",
                  max: "Announcement Description Must Be Not Exceed 1000 Characters",
                },
              })}
              ref={contentRef}
            />
          </div>
        </div>
        <div className="w-50">
          <div className="d-flex flex-column gap-1">
            <span>Announcement Preview</span>
            <div
              className={`
              card p-2 rounded-4 d-flex flex-column gap-3 align-items-center ${
                darkMode && "dark-bg dark-mode-border dark-mode-text"
              }
              `}
            >
              <div className="w-100 d-flex flex-row align-items-center justify-content-between">
                <span className="fw-semibold">{formData.title}</span>
                {formData.label_id && (
                  <div
                    className="py-1 px-2 d-flex align-items-center gap-1 font-size-xs primary-background-50 rounded-pill"
                    style={{
                      backgroundColor: labelData?.find(
                        (label) => label.id === formData.label_id
                      )
                        ? JSON.parse(
                            labelData?.find(
                              (label) => label.id === formData.label_id
                            ).color
                          ).color_light
                        : null,
                      color: labelData?.find(
                        (label) => label.id === formData.label_id
                      )
                        ? JSON.parse(
                            labelData.find(
                              (label) => label.id === formData.label_id
                            ).color
                          ).color_thick
                        : null,
                    }}
                  >
                    <span>
                      <Icon
                        icon={
                          labelData.find(
                            (label) => label.id === formData.label_id
                          )
                            ? labelData.find(
                                (label) => label.id === formData.label_id
                              ).icon
                            : ""
                        }
                        className="font-size-sm"
                      />
                    </span>
                    <span>
                      {labelData.find((label) => label.id === formData.label_id)
                        ? labelData.find(
                            (label) => label.id === formData.label_id
                          ).name
                        : "N/A"}
                    </span>
                  </div>
                )}
              </div>
              <div className="font-size-sm">{formData.content}</div>
              <div className="d-flex flex-row flex-wrap gap-2">
                {formData?.tags?.map((item) => {
                  const matchingTag = tagData?.find((tag) => tag.id === item.id);
                  return (
                    <div
                      className="font-size-sm primary-background-50 px-4 py-2 rounded-pill color-primary"
                      key={item.id}
                    >
                      <span>{matchingTag ? matchingTag.name : "N/A"}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex flex-row justify-content-end w-100">
        <button
          className="border-none rounded-3 px-4 py-2 primary-background text-white font-size-sm"
          onClick={() => {
            handleNext();
          }}
        >
          <span>Next</span>
        </button>
      </div>
    </>
  );
}
