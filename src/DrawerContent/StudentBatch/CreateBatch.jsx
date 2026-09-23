import { useRef, useState } from "react";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { useCreateStudentBatch } from "../../hooks/studentBatch/useCreateBatch";
import {
  TextAreaInput,
  TextInput,
} from "../../components/FormComponents/InputComponents";
import {
  nameSchema,
  textareaSchema,
} from "../../ComponentConfig/YupValidationSchema";
import { allFieldsValid } from "../../utils/functions";
import toast from "react-hot-toast";
import ToastWarning from "../../components/Toast/ToastWarning";
import HorizontalDashedLine from "../../components/DashedLine/HorizonetalDashedLine";
function CreateBatch({ handleClose }) {
  const batchTitleRef = useRef();
  const batchDescriptionRef = useRef();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [isValid, setIsValid] = useState({
    name: "",
    description: "",
  });
  const { mutate: createBatch, isPending } = useCreateStudentBatch(handleClose);
  const handlePrevalidation = async () => {
    const batchTitle = await batchTitleRef.current.triggerValidation();
    const batchDescription =
      await batchDescriptionRef.current.triggerValidation();
    return {
      batchTitle,
      batchDescription,
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
    }
    createBatch(formData);
  };
  return (
    <>
      <div className="drawer-content px-2 pt-3">
        <div className="d-flex flex-column gap-2">
          <div>
            <label htmlFor="batchTitle" className="font-size-sm">
              Student Batch Title
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
                max: 100,
                required: true,
                messages: {
                  min: "Batch Title Must Be Atleast 3 Characters Long",
                  max: "Batch Title Must Not Exceed 100 Characters",
                  required: "Batch Title Required",
                },
              })}
              placeholder={"e.g Batch Of 2027"}
              value={formData.name}
              ref={batchTitleRef}
            />
          </div>
          <div>
            <label htmlFor="batchDescription" className="font-size-sm">
              Batch Description
            </label>
            <TextAreaInput
              onChange={(value) =>
                handleStateChange("description", value, setFormData)
              }
              onValidationChange={(value) =>
                handleStateChange("description", value, setIsValid)
              }
              validationSchema={textareaSchema({
                min: 10,
                max: 1000,
                required: true,
                messages: {
                  required: "Batch Description Required",
                  min: "Batch Description Must Be Atleast 10 Characters Long",
                  max: "Batch Description Must Not Exceed 1000 Characters",
                },
              })}
              value={formData.description}
              placeholder={
                formData.name === null
                  ? "Enter A short description of student batch"
                  : `Enter A Short Description of ${formData.name}`
              }
              ref={batchDescriptionRef}
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
              {isPending ? <SingleSpinner /> : "Create Batch"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default CreateBatch;
