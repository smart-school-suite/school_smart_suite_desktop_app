import { Icon } from "@iconify/react";
import {
  TextAreaInput,
  TextInput,
  DateTimeInput,
} from "../../components/FormComponents/InputComponents";
import { useState, useCallback, useRef, useEffect } from "react";
import {
  dateTimeValidationSchema,
  nameSchema,
  textareaSchema,
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
  formatDate
} from "../../utils/functions";
import { useGetSpecialties } from "../../hooks/specialty/useGetSpecialties";
import { useGetTeachers } from "../../hooks/teacher/useGetTeachers";
import { useGetSchoolAdmins } from "../../hooks/schoolAdmin/useGetSchoolAdmins";
import { announcementStatus } from "../../data/data";
import ToastWarning from "../../components/Toast/ToastWarning";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { useGetAnnouncementDetails } from "../../hooks/announcement/useGetAnnouncementDetails";
import { useUpdateAnnouncementDraft } from "../../hooks/announcement/useUpdateAnnouncementDraft";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
function UpdateAnnouncementDraft({ handleClose, rowData }) {
  const { id: announcementId } = rowData;
  const [tab, setTab] = useState("createContent");
  const { data: labels, isLoading: isLabelLoading } =
    useGetAnnouncementLabels();
  const { data: categories, isLoading: isCategoryLoading } =
    useGetAnnouncementCategories();
  const { data: tags, isLoading: isTagLoading } = useGetAnnouncementTags();
  const {
    data: announcementDetails,
    isLoading: isAnnoucementLoading,
    error,
  } = useGetAnnouncementDetails(announcementId);

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
    published_at:""
  });

  const [errors, setErrors] = useState({
    specialty_id: "",
    semester_id: "",
    tags: ""
  });
  const [isValid, setIsValid] = useState({
    label_id:null,
    category_id:null,
    published_at:null
  });
  const handleStateChange = useCallback((field, value, stateFn) => {
    stateFn((prev) => ({ ...prev, [field]: value }));
  }, []);

  useEffect(() => {
    if (announcementDetails?.data) {
      setFormData((prev) => ({
        ...prev,
        title: announcementDetails?.data?.title,
        content: announcementDetails?.data?.content,
        category_id: {id:announcementDetails?.data?.category_id},
        label_id: {id:announcementDetails?.data?.label_id},
        tags: JSON.parse(announcementDetails?.data?.tags).map((items) => ({
          id: items.id,
        })),
        teacher_ids:
          JSON.parse(announcementDetails?.data?.audience).teachers?.map(
            (items) => ({
              id: items.teacher_id,
            })
          ) || [],
        school_admin_ids:
          JSON.parse(announcementDetails?.data?.audience).admins?.map(
            (items) => ({
              id: items.school_admin_id,
            })
          ) || [],
        student_audience: JSON.parse(
          announcementDetails?.data?.audience
        ).students?.map((items) => ({
          id: items.student_audience_id,
        })),
      }));
    }
  }, [isAnnoucementLoading, setFormData]);
  return (
    <>
      <div className="d-flex flex-row align-items-center">
        <div className="d-flex flex-row align-items-center justify-content-between mb-3 w-100">
          <span className="m-0">Update Draft Announcement</span>
          <span
            className="m-0"
            onClick={() => {
              handleClose();
            }}
          >
            <Icon icon="charm:cross" width="22" height="22" />
          </span>
        </div>
      </div>
      <div>
        {isAnnoucementLoading || isLabelLoading || isLabelLoading ? (
          <div className="d-flex flex-column gap-2">
            <RectangleSkeleton width="100%" height="20dvh" speed={0.5} />
            <RectangleSkeleton width="100%" height="20dvh" speed={0.5} />
          </div>
        ) : (
          <>
            {tab == "createContent" ? (
              <UpdateContent
                setTab={setTab}
                setErrors={setErrors}
                errors={errors}
                setFormData={setFormData}
                formData={formData}
                handleStateChange={handleStateChange}
                labels={labels}
                tags={tags}
                isCategoryLoading={isCategoryLoading}
                isLabelLoading={isLabelLoading}
                isTagLoading={isTagLoading}
                categories={categories}
                setIsValid={setIsValid}
                isValid={isValid}
              />
            ) : (
              <CreateAnnouncement
                setTab={setTab}
                setErrors={setErrors}
                errors={errors}
                setFormData={setFormData}
                formData={formData}
                handleStateChange={handleStateChange}
                labels={labels}
                tags={tags}
                isCategoryLoading={isCategoryLoading}
                isLabelLoading={isLabelLoading}
                isTagLoading={isTagLoading}
                categories={categories}
                setIsValid={setIsValid}
                isValid={isValid}
                announcementId={announcementId}
                handleClose={handleClose}
              />
            )}
          </>
        )}
      </div>
    </>
  );
}
export default UpdateAnnouncementDraft;

function UpdateContent({
  setTab,
  setErrors,
  errors,
  setFormData,
  formData,
  handleStateChange,
  labels,
  tags,
  categories,
  isCategoryLoading,
  isLabelLoading,
  isTagLoading,
  setIsValid,
  isValid,
}) {
  const titleRef = useRef();
  const contentRef = useRef();
  const tagRef = useRef();
  const labelRef = useRef();
  const categoryRef = useRef();
  const handlePrevalidation = async () => {
    const result = {};

    if (!formData.title || isValid.title != null) {
      result.title = await titleRef.current.triggerValidation();
    }
    if (!formData.content || isValid.content != null) {
      result.content = await contentRef.current.triggerValidation();
    }
    if (!formData.tags.length > 0) {
      result.tag = await tagRef.current.triggerValidation();
    }

    if (!formData.label_id) {
      result.label = await labelRef.current.triggerValidation();
    }

    if (!formData.category_id) {
      result.category = await categoryRef.current.triggerValidation();
    }

    return result;
  };

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
    if (isValid.title != null || isValid.content != null) {
      if (
        !allFieldsValid({
          title: isValid.title ? isValid.title : true,
          content: isValid.content ? isValid.content : true,
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
    setTab("createAnnouncement");
  };
  return (
    <>
      <div className="d-flex flex-row align-items-start gap-2 w-100">
        <div className="d-flex flex-column gap-1 w-50">
          <div>
            <label htmlFor="title" className="font-size-sm">
              Title
            </label>
            <TextInput
              validationSchema={nameSchema({
                min: 3,
                max: 200,
                required: false,
                messages: {
                  min: "Announcement Title Must Be Atleast 3 Characters Long",
                  max: "Announcement Title Must Not Exceed 200 Characters",
                },
              })}
              onChange={(value) =>
                handleStateChange("title", value, setFormData)
              }
              onValidationChange={(value) =>
                handleStateChange("title", value, setIsValid)
              }
              value={formData?.title}
              placeholder={formData?.title || "Enter Announcement Title"}
              ref={titleRef}
            />
          </div>
          <div>
            <label htmlFor="label" className="font-size-sm">
              Label
            </label>
            <CustomDropdown
              data={labels?.data.filter((items) => items.name !== "All") || []}
              displayKey={["name"]}
              valueKey={["id"]}
              direction="down"
              onSelect={(value) =>
                handleStateChange("label_id", value, setFormData)
              }
              placeholder="Select Announcement Label"
              error={errors?.label_id}
              isLoading={isLabelLoading}
              errorMessage="Announcement Label Required"
              onError={(msg) => handleStateChange("label_id", msg, setErrors)}
              ref={labelRef}
              value={formData.label_id}
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
                handleStateChange("category_id", value, setFormData)
              }
              placeholder="Select Announcement Category"
              error={errors.category_id}
              isLoading={isCategoryLoading}
              errorMessage="Announcement Category Required"
              onError={(msg) =>
                handleStateChange("category_id", msg, setErrors)
              }
              ref={categoryRef}
              value={formData.category_id}
            />
          </div>
          <div>
            <label htmlFor="tags" className="font-size-sm">
              Tag (Tip: You can select up to five)
            </label>
            <MultiSelectDropdown
              data={tags?.data || []}
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
              onError={(error) =>
                handleStateChange("tag_ids", error, setErrors)
              }
              error={errors.tag_ids}
              ref={tagRef}
              value={formData.tag_ids}
            />
          </div>
          <div>
            <label htmlFor="content" className="font-size-sm">
              Content
            </label>
            <TextAreaInput
              validationSchema={textareaSchema({
                min: 10,
                max: 1000,
                required: false,
                messages: {
                  min: "Announcement Content Must Be Atleast 10 Characters Long",
                  max: "Announcement Content Must Not Exceed 1000 Characters Long",
                },
              })}
              onChange={(value) =>
                handleStateChange("content", value, setFormData)
              }
              onValidationChange={(value) =>
                handleStateChange("content", value, setIsValid)
              }
              value={formData?.content}
              placeholder={formData?.content || "Enter Announcement Content"}
              ref={contentRef}
            />
          </div>
        </div>
        <div className="d-flex flex-column gap-1 w-50">
          <div className="d-flex flex-column gap-1">
            <span>Announcement Preview</span>
            <div
              className={`
                              card p-2 rounded-4 d-flex flex-column gap-3 align-items-center ${
                                darkMode &&
                                "dark-bg dark-mode-border dark-mode-text"
                              }
                              `}
            >
              <div className="w-100 d-flex flex-row align-items-center justify-content-between">
                <span className="fw-semibold">{formData?.title}</span>
                {formData.label_id && (
                  <div
                    className="py-1 px-2 d-flex align-items-center gap-1 font-size-xs primary-background-50 rounded-pill"
                    style={{
                      backgroundColor: labels.data.find(
                        (label) => label.id === formData.label_id.id
                      )
                        ? JSON.parse(
                            labels.data.find(
                              (label) => label.id === formData.label_id.id
                            ).color
                          ).color_light
                        : null,
                      color: labels.data.find(
                        (label) => label.id === formData.label_id.id
                      )
                        ? JSON.parse(
                            labels.data.find(
                              (label) => label.id === formData.label_id.id
                            ).color
                          ).color_thick
                        : null,
                    }}
                  >
                    <span>
                      <Icon
                        icon={
                          labels.data.find(
                            (label) => label.id === formData.label_id.id
                          )
                            ? labels.data.find(
                                (label) => label.id === formData.label_id.id
                              ).icon
                            : ""
                        }
                        className="font-size-sm"
                      />
                    </span>
                    <span>
                      {labels.data.find(
                        (label) => label.id === formData.label_id.id
                      )
                        ? labels.data.find(
                            (label) => label.id === formData.label_id.id
                          ).name
                        : "N/A"}
                    </span>
                  </div>
                )}
              </div>
              <div className="font-size-sm">{formData.content}</div>
              <div className="d-flex flex-row flex-wrap gap-2">
                {formData.tags.map((item) => {
                  const matchingTag = tags?.data?.find(
                    (tag) => tag.id === item.id
                  );
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
      <div className="d-flex flex-row align-items-center mt-2 justify-content-end">
        <button
          className="border-none rounded-3 px-4 py-2 primary-background text-white font-size-sm"
          onClick={() => {
            handleNext();
          }}
        >
          Next
        </button>
      </div>
    </>
  );
}
function CreateAnnouncement({
  setTab,
  setErrors,
  errors,
  setFormData,
  formData,
  handleStateChange,
  labels,
  tags,
  setIsValid,
  isValid,
  announcementId,
  handleClose,
}) {
  const { data: specialty, isLoading: isSpecialtyLoading } =
    useGetSpecialties();
  const { data: teachers, isLoading: isTeacherLoading } = useGetTeachers();
  const { data: schoolAdmins, isLoading: isSchoolAdminLoading } =
    useGetSchoolAdmins();
  const { mutate: updateDraftAnnouncement, isPending } =
    useUpdateAnnouncementDraft(announcementId, handleClose);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const dateRef = useRef();
  const timeRef = useRef();
  const statusRef = useRef();
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
    result.status = await statusRef.current.triggerValidation();
    if (formData.status == "scheduled") {
      result.date = await dateRef.current.triggerValidation();
      result.time = await timeRef.current.triggerValidation();
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
      status: formData?.status,
      announcement_id:announcementId,
      published_at: formData.published_at,
      category_id: formData.category_id.id,
      label_id: formData.label_id.id,
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

    updateDraftAnnouncement({ updateData:payload });
  };
  return (
    <>
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
              value={formData.student_audience}
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
              value={formData.teacher_ids}
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
              data={
                announcementStatus.filter((items) => items.name !== "draft") ||
                []
              }
              displayKey={["name", "description"]}
              valueKey={["value"]}
              direction="up"
              onSelect={(value) =>
                handleStateChange("status", value.value, setFormData)
              }
              placeholder="Select Announcement Status"
              ref={statusRef}
              value={formData.status}
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
                <div className="w-100">
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
                      backgroundColor: labels.data.find(
                        (label) => label.id === formData.label_id.id
                      )
                        ? JSON.parse(
                            labels.data.find(
                              (label) => label.id === formData.label_id.id
                            ).color
                          ).color_light
                        : null,
                      color: labels.data.find(
                        (label) => label.id === formData.label_id.id
                      )
                        ? JSON.parse(
                            labels.data.find(
                              (label) => label.id === formData.label_id.id
                            ).color
                          ).color_thick
                        : null,
                    }}
                  >
                    <span>
                      <Icon
                        icon={
                          labels.data.find(
                            (label) => label.id === formData.label_id.id
                          )
                            ? labels.data.find(
                                (label) => label.id === formData.label_id.id
                              ).icon
                            : ""
                        }
                        className="font-size-sm"
                      />
                    </span>
                    <span>
                      {labels.data.find(
                        (label) => label.id === formData.label_id.id
                      )
                        ? labels.data.find(
                            (label) => label.id === formData.label_id.id
                          ).name
                        : "N/A"}
                    </span>
                  </div>
                )}
              </div>
              <div className="font-size-sm">{formData.content}</div>
              <div className="d-flex flex-row flex-wrap gap-2">
                {formData.tags.map((item) => {
                  const matchingTag = tags?.data?.find(
                    (tag) => tag.id === item.id
                  );
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
            setTab("createContent");
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
          {isPending ? <SingleSpinner /> : <span>Update Announcement</span>}
        </button>
      </div>
    </>
  );
}
