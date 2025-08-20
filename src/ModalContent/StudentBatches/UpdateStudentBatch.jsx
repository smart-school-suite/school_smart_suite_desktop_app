import { Icon } from "@iconify/react";
import { useState } from "react";
import { useUpdateBatch } from "../../hooks/studentBatch/useUpdateBatch";
import { SingleSpinner } from "../../components/Spinners/Spinners";
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
function UpdateStudentBatch({ handleClose, rowData }) {
  const { id: batchId, name, description } = rowData;
  const { mutate: updateBatch, isPending } = useUpdateBatch();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [isValid, setIsValid] = useState({
    name: "",
    description: "",
  });
  const handleStateChange = (field, value, stateFn) => {
    stateFn((prev) => ({ ...prev, [field]: value }));
  };
  const handleUpdateStudentBatch = async () => {
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
    updateBatch({ batchId: batchId, updateData: formData });
  };
  return (
    <>
      <div className="d-flex flex-row align-items-center justify-content-between w-100 mb-3">
        <span className="m-0">Update Student Batch</span>
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
        <label htmlFor="batchTitle" className="font-size-sm">
          Batch Title
        </label>
        <TextInput
          onChange={(value) => handleStateChange("name", value, setFormData)}
          onValidationChange={(value) =>
            handleStateChange("name", value, setIsValid)
          }
          placeholder={name}
          validationSchema={nameSchema({
            min: 3,
            max: 150,
            required: false,
            messages: {
              min: "Batch Title Must Be Atleast 3 Characters Long",
              max: "Batch Title Must Not Exceed 150 Characters",
            },
          })}
        />
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
            handleStateChange("description", value, setFormData)
          }
          validationSchema={textareaSchema({
            min: 10,
            max: 1000,
            required: false,
            messages: {
              min: "Batch Description Must Be Alteast 10 Characters Long",
              max: "Batch Title Must Not Exceed 1000 Characters",
            },
          })}
          placeholder={description || "Enter Description"}
        />
      </div>
      <div className="mt-4">
        <button
          className="border-none px-3 py-2 w-100 rounded-3 font-size-sm primary-background text-white w-50"
          onClick={() => {
            handleUpdateStudentBatch();
          }}
        >
          {isPending ? <SingleSpinner /> : "Update Batch"}
        </button>
      </div>
    </>
  );
}
export default UpdateStudentBatch;
