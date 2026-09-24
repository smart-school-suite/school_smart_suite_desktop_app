import { SingleSpinner } from "../../components/Spinners/Spinners";
import { useEffect, useState } from "react";
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
import HorizontalDashedLine from "../../components/DashedLine/HorizonetalDashedLine";
import { useUpdateAnnouncementCategory } from "../../hooks/announcement/useUpdateAnnouncementCategory";
function UpdateAnnouncementCategory({ handleClose, drawerData }) {
  const { id: categoryId, name, description } = drawerData;
  const { mutate: updateCategory, isPending } =
    useUpdateAnnouncementCategory(handleClose);
  const [formData, setFormData] = useState({
    name: name || "",
    description: description || "",
  });
  const [isFieldValid, setFieldValid] = useState({
    name: "",
    description: "",
  });
  const handleStateChange = (field, value, stateFn) => {
    stateFn((prev) => ({ ...prev, [field]: value }));
  };
  const handleUpdate = () => {
    if (optionalValidateObject(isFieldValid) == false) {
      toast.custom(
        <ToastWarning
          title={"Invalid Fields"}
          description={"Please ensure all fields are valid before updating."}
        />,
      );
      return;
    }

    if (hasNonEmptyValue(formData) == false) {
      toast.custom(
        <ToastWarning
          title={"Nothing to Update"}
          description={"Please ensure all fields are filled before updating."}
        />,
      );
      return;
    }
    updateCategory({ categoryId, updateData: formData });
  };
  return (
    <>
      <div className="drawer-content px-2 pt-3">
        <div className="d-flex flex-column gap-4">
          <div>
            <label htmlFor="departmentName" className="font-size-sm">
              Category Name
            </label>
            <TextInput
              onChange={(value) =>
                handleStateChange("name", value, setFormData)
              }
              onValidationChange={(value) =>
                handleStateChange("name", value, setFieldValid)
              }
              validationSchema={nameSchema({
                min: 3,
                max: 100,
                required: false,
                messages: {
                  min: "Category Name Must Be Atleast 3 characters Long",
                  max: "Category Name Must Not Exceed 100 Characters",
                },
              })}
              value={formData.name}
            />
          </div>
          <div>
            <label htmlFor="description" className="font-size-sm">
              Category Description
            </label>
            <TextAreaInput
              onChange={(value) =>
                handleStateChange("description", value, setFormData)
              }
              onValidationChange={(value) =>
                handleStateChange("description", value, setFieldValid)
              }
              validationSchema={textareaSchema({
                min: 10,
                max: 1000,
                required: false,
                messages: {
                  min: "Category Description Must Be Atleast 10 characters long",
                  max: "Category Description Must Not Exceed 1000 characters",
                },
              })}
              value={formData.description}
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
              onClick={() => handleUpdate()}
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
export default UpdateAnnouncementCategory;
