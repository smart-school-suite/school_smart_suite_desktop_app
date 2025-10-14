import { useCreateEventCategory } from "../../hooks/eventCategory/useCreateEventCategory";
import { useState } from "react";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { Icon } from "@iconify/react";
import { useRef } from "react";
import ToastWarning from "../../components/Toast/ToastWarning";
import toast from "react-hot-toast";
import {
  TextAreaInput,
  TextInput,
} from "../../components/FormComponents/InputComponents";
import {
  nameSchema,
  textareaSchema,
} from "../../ComponentConfig/YupValidationSchema";
import { allFieldsValid } from "../../utils/functions";
function CreateCategory({ handleClose }) {
  const { mutate: createCategory, isPending } = useCreateEventCategory(handleClose);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [isValid, setIsValid] = useState({
    name: null,
    description: null,
  });
  const nameRef = useRef();
  const descriptionRef = useRef();
  const handlePrevalidation = async () => {
    const name = await nameRef.current.triggerValidation();
    const description = await descriptionRef.current.triggerValidation();
    return {
      name,
      description,
    };
  };

  const handleStateChange = (field, value, stateFn) => {
    stateFn((prev) => ({ ...prev, [field]: value }));
  };

  const handleCreateCategory = async () => {
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
    if (!allFieldsValid(isValid)) {
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
    createCategory(formData);
  };
  return (
    <>
      <div>
        <div className="d-flex flex-row align-items-center justify-content-between mb-3">
          <span>Create Event Category</span>
          <span
            className="m-0"
            onClick={() => {
              handleClose();
            }}
          >
            <Icon icon="charm:cross" width="22" height="22" />
          </span>
        </div>
        <div>
          <label htmlFor="categoryName" className="font-size-sm">
            Category Name
          </label>
          <TextInput
            onChange={(value) => handleStateChange("name", value, setFormData)}
            onValidationChange={(value) =>
              handleStateChange("name", value, setIsValid)
            }
            validationSchema={nameSchema({
              min: 3,
              max: 150,
              required: true,
              messages: {
                min: "Category Name Must Be Atleast 3 Characters Long",
                max: "Category Name Must Not Exceed 150 Characters",
                required: "Category Name Required",
              },
            })}
            value={formData.name}
            placeholder={"E.g Sports Day"}
            ref={nameRef}
          />
        </div>
        <div>
          <label htmlFor="eventCategoryDescription" className="font-size-sm">
            Description
          </label>
          <TextAreaInput
            placeholder={"Enter Event Category Description"}
            onChange={(value) =>
              handleStateChange("description", value, setFormData)
            }
            value={formData.description}
            onValidationChange={(value) =>
              handleStateChange("description", value, setIsValid)
            }
            validationSchema={textareaSchema({
              min: 10,
              max: 1000,
              required: true,
              messages: {
                required: "Event Category Description Required",
                min: "Event Category Description Must Be Atleast 10 Characters Long",
                max: "Event Category Description Must Not Exceed 1000 Charactes",
              },
            })}
            ref={descriptionRef}
          />
        </div>
        <button
          className="border-none px-3 mt-4 py-2 rounded-3 font-size-sm primary-background text-white w-100"
          onClick={() => {
            handleCreateCategory();
          }}
          disabled={isPending}
        >
          {isPending ? <SingleSpinner /> : "Create Category"}
        </button>
      </div>
    </>
  );
}
export default CreateCategory;
