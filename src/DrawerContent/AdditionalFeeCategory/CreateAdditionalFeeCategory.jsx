import { useRef, useState } from "react";
import { useCreateAdditionalFeeCategory } from "../../hooks/additionalFee/useCreateAdditionalFeeCategory";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import {
  TextInput,
  TextAreaInput,
} from "../../components/FormComponents/InputComponents";
import {
  nameSchema,
  textareaSchema,
} from "../../ComponentConfig/YupValidationSchema";
import { allFieldsValid } from "../../utils/functions";
import toast from "react-hot-toast";
import ToastWarning from "../../components/Toast/ToastWarning";
import HorizontalDashedLine from "../../components/DashedLine/HorizonetalDashedLine";
function CreateAdditionalFeeCategory({ handleClose }) {
  const titleRef = useRef();
  const descriptionRef = useRef();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [isValid, setIsValid] = useState({
    title: "",
    description: "",
  });
  const handleStateChange = (field, value, stateFn) => {
    stateFn((prev) => ({ ...prev, [field]: value }));
  };
  const handlePrevalidation = async () => {
    const title = await titleRef.current.triggerValidation();
    const description = await descriptionRef.current.triggerValidation();
    return {
      title,
      description,
    };
  };
  const { mutate: createCategory, isPending } =
    useCreateAdditionalFeeCategory(handleClose);
  const handleCreateCategory = () => {
    const prevalidation = handlePrevalidation();
    if (!allFieldsValid(prevalidation)) {
      toast.custom(
        <ToastWarning
          title={"Invalid Fields"}
          description={"Please Ensure All Fields Are Valid Before Submitting"}
        />,
      );
      return;
    }
    if (!allFieldsValid(isValid)) {
      toast.custom(
        <ToastWarning
          title={"Invalid Fields"}
          description={"Please Ensure All Fields Are Valid Before Submitting"}
        />,
      );
      return;
    }
    createCategory(formData);
  };
  return (
    <>
      <div className="drawer-content px-2 pt-3">
        <div className="d-flex flex-column gap-3">
          <div>
            <label htmlFor="categoryTitle" className="font-size-sm">
              Category Name
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
                max: 100,
                required: true,
                messages: {
                  min: "Category Name Must Be Atleast 3 Characters Long",
                  max: "Category Name Must Not Exceed 100 Characters",
                  required: "Category Name Required",
                },
              })}
              placeholder={"e.g Student Id Card"}
              value={formData.title}
              ref={titleRef}
            />
          </div>
          <div>
            <label htmlFor="description" className="font-size-sm">
              Description
            </label>
            <TextAreaInput
              onChange={(value) =>
                handleInputChange("description", value, setFormData)
              }
              validationSchema={textareaSchema({
                min: 10,
                max: 500,
                required: true,
                messages: {
                  min: "Description Must Be Atleast 10 Characters Long",
                  max: "Description Must Not Exceed 500 Characters",
                  required: "Description Required",
                },
              })}
              onValidationChange={(value) =>
                handleInputChange("name", value, setIsValid)
              }
              placeholder={"Enter Category Description"}
              value={formData.description}
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
              onClick={() => handleCreateCategory()}
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
export default CreateAdditionalFeeCategory;
