import { SingleSpinner } from "../../components/Spinners/Spinners";
import { useState } from "react";
import {
  TextAreaInput,
  TextInput,
} from "../../components/FormComponents/InputComponents";
import {
  nameSchema,
  textareaSchema,
} from "../../ComponentConfig/YupValidationSchema";
import {
  hasNonEmptyValue,
  optionalValidateObject,
} from "../../utils/functions";
import toast from "react-hot-toast";
import ToastWarning from "../../components/Toast/ToastWarning";
import { useUpdateEventCategory } from "../../hooks/eventCategory/useUpdateEventCategory";
import HorizontalDashedLine from "../../components/DashedLine/HorizonetalDashedLine";
function UpdateCategory({ drawerData, handleClose }) {
  const { id: categoryId, name, description } = drawerData;
  const { mutate: updateEventCategory, isPending } =
    useUpdateEventCategory(handleClose);
  const [formData, setFormData] = useState({
    name: name  || "",
    description: description || "",
  });
  const [isValid, setIsValid] = useState({
    name: null,
    description: null,
  });
  const handleStateChange = (field, value, stateFn) => {
    stateFn((prev) => ({ ...prev, [field]: value }));
  };
  const handleSubmit = () => {
    if (optionalValidateObject(isValid) == false) {
      toast.custom(
        <ToastWarning
          title={"Invalid Fields"}
          description={"Please Ensure All Fields Are Valid Before Submitting"}
        />,
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
        />,
      );
      return;
    }
    updateEventCategory({ categoryId, updateData: formData });
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
                required: false,
                messages: {
                  min: "Category Name Must Be Atleast 3 Characters Long",
                  max: "Category Name Must Not Exceed 150 Characters",
                  required: "Category Name Required",
                },
              })}
              value={formData.name}
              placeholder={name}
            />
          </div>
          <div>
            <label htmlFor="eventCategoryDescription" className="font-size-sm">
              Description
            </label>
            <TextAreaInput
              placeholder={description}
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
                required: false,
                messages: {
                  min: "Event Category Description Must Be Atleast 10 Characters Long",
                  max: "Event Category Description Must Not Exceed 1000 Charactes",
                },
              })}
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
              {isPending ? <SingleSpinner /> : "Update Category"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default UpdateCategory;
