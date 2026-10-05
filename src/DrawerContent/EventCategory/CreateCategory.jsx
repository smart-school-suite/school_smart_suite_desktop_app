import { useCreateEventCategory } from "../../hooks/eventCategory/useCreateEventCategory";
import { useState } from "react";
import { SingleSpinner } from "../../components/Spinners/Spinners";
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
import HorizontalDashedLine from "../../components/DashedLine/HorizonetalDashedLine";
function CreateCategory({ handleClose }) {
  const { mutate: createCategory, isPending } =
    useCreateEventCategory(handleClose);
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

  const handleSubmit = async () => {
    const prevalidation = await handlePrevalidation();
    if (!allFieldsValid(prevalidation)) {
      toast.custom(
        <ToastWarning
          title={"Invalid Fields"}
          description={
            "Some Fields Seem To Be Invalid Please Go Through the form and try again"
          }
        />,
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
        />,
      );
      return;
    }
    createCategory(formData);
  };
  return (
    <>
      <div className="drawer-content px-2 pt-3">
        <div className="d-flex flex-column gap-2">
          <div>
            <label htmlFor="categoryName" className="font-size-sm">
              Category Name
            </label>
            <TextInput
              onChange={(value) =>
                handleStateChange("name", value, setFormData)
              }
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
              onClick={() => handleSubmit()}
              disabled={isPending}
            >
              {isPending ? <SingleSpinner /> : "Create Category"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default CreateCategory;
