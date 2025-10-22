import { useUpdateAnnouncementContent } from "../../hooks/announcement/useUpdateAnnouncementContent";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import {
  TextAreaInput,
  TextInput,
} from "../../components/FormComponents/InputComponents";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import {
  optionalValidateObject,
  hasNonEmptyValue,
} from "../../utils/functions";
import {
  nameSchema,
  textareaSchema,
} from "../../ComponentConfig/YupValidationSchema";
import { useGetAnnouncementLabels } from "../../hooks/announcement/useGetAnnouncementLabels";
import { useGetAnnouncementCategories } from "../../hooks/announcement/useGetAnnouncementCategories";
import { useGetAnnouncementTags } from "../../hooks/announcement/useGetAnnouncementTags";
import { useGetAnnouncementDetails } from "../../hooks/announcement/useGetAnnouncementDetails";
import CustomDropdown, {
  MultiSelectDropdown,
} from "../../components/Dropdowns/Dropdowns";
import { NotFoundError } from "../../components/errors/Error";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import ToastWarning from "../../components/Toast/ToastWarning";
function UpdateAnnouncementContent({ handleClose, rowData }) {
  const { id: announcementId, title, content } = rowData;
  const darkMode = useSelector((state) => state.theme.darkMode);
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
  });

  const [errors, setErrors] = useState({
    specialty_id: "",
    semester_id: "",
    tags:""
  });
  const [isValid, setIsValid] = useState({
    label_id: "",
    category_id: "",
  });
  const handleStateChange = (field, value, stateFn) => {
    stateFn((prev) => ({ ...prev, [field]: value }));
  };

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
      }));
    }
  }, [isAnnoucementLoading, setFormData]);
  const { mutate: updateContent, isPending } =
    useUpdateAnnouncementContent(handleClose, announcementId);
  const handleUpdateContent = () => {
     if(optionalValidateObject(isValid) == false){
          toast.custom(
            <ToastWarning 
               title={"Invalid Fields"}
               description={"Please Ensure All Fields Are Valid Before Submitting"}
            />
          )
          return;
        }
        if(hasNonEmptyValue(formData) == false){
          toast.custom(
            <ToastWarning 
              title={"Nothing To Update"}
              description={"Please Ensure Atleast One Field Is Updated Before Submitting"}
            />
          )
          return;
        }
    const payload = {
         title:formData.title,
         content:formData.content,
         category_id:formData.category_id,
         label_id:formData.label_id,
         tag_ids:formData.tags.map((items) => ({ tag_id:items.id }))
    }
    updateContent({ id: announcementId, updateData: payload });
  };
  return (
    <>
      <div className="d-flex flex-row align-items-center">
        <div className="d-flex flex-row align-items-center justify-content-between mb-3 w-100">
          <span className="m-0">Update Announcement Content</span>
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
      {isAnnoucementLoading || isLabelLoading || isTagLoading ? (
        <div className="d-flex flex-column gap-2">
          <RectangleSkeleton width="100%" height="20dvh" speed={0.5} />
          <RectangleSkeleton width="100%" height="20dvh" speed={0.5} />
        </div>
      ) : error ? (
        <NotFoundError
          title={error.response.data.errors.title}
          description={error.response.data.errors.description}
        ></NotFoundError>
      ) : (
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
                value={formData.title}
                placeholder={formData.title || title}
                optional={true}
              />
            </div>
            <div>
              <label htmlFor="label" className="font-size-sm">
                Label
              </label>
              <CustomDropdown
                data={labels?.data.filter((items) => items.name !== 'All') || []}
                displayKey={["name"]}
                valueKey={["id"]}
                direction="down"
                onSelect={(value) =>
                  handleStateChange("label_id", value, setFormData)
                }
                placeholder="Select Announcement Label"
                error={errors.label_id}
                isLoading={isLabelLoading}
                errorMessage="Announcement Label Required"
                onError={(msg) => handleStateChange("label_id", msg, setErrors)}
                optional={true}
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
                optional={true}
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
                  if (value.length >= 5) {
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
                onError={(error) => handleStateChange("tags", error, setErrors)}
                error={errors.tag_ids}
                optional={true}
                value={formData.tags}
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
                value={formData.content}
                placeholder={formData.content || content}
                optional={true}
              />
            </div>
          </div>
          <div className="d-flex flex-column gap-1 w-50">
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
                      className={`${darkMode ? "dark-bg-light" : "primary-background-50"} font-size-sm  px-2 py-1 rounded-pill color-primary`}
                      key={item.id}
                      style={{ fontSize:"0.7rem" }}
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
      )}
       <div className="d-flex flex-row align-items-center justify-content-end w-100 mt-2">
         <button
              className="border-none rounded-3 px-4 py-2 primary-background text-white font-size-sm"
              onClick={() => {
                handleUpdateContent();
              }}
              disabled={isPending}
            >
              {isPending ? <SingleSpinner /> : <span>Update Content</span>}
            </button>
       </div>
    </>
  );
}
export default UpdateAnnouncementContent;
