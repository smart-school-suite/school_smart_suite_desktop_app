import { useState } from "react";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { useCreateStudentBatch } from "../../hooks/studentBatch/useCreateBatch";
import { Icon } from "@iconify/react";
import { TextAreaInput, TextInput } from "../../components/FormComponents/InputComponents";
import { batchDescriptionSchema, batchTitleSchema } from "../../ComponentConfig/YupValidationSchema";
function CreateStudentBatch({ handleClose }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [isValid, setIsValid] = useState({
    name: "",
    description: "",
  });
  const { mutate: createBatch, isPending } = useCreateStudentBatch(handleClose);
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const handleIsValid = (field, value) => {
     setIsValid((prev) => ({ ...prev, [field]:value }));
  }
  const handleSubmit = async () => {
    createBatch(formData);
  };
  return (
    <div className="w-100">
      <div className="d-flex flex-row align-items-center justify-content-between mb-3">
        <span className="m-0">Create Student Batch</span>
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
        <label htmlFor="batchTitle" className="font-size-sm">Student Batch Title</label>
        <TextInput 
          onChange={(value) => handleInputChange('name', value)}
          onValidationChange={(value) => handleIsValid('name', value)}
          validationSchema={batchTitleSchema}
          placeholder={"e.g Batch Of 2027"}
        />
      </div>
      <div>
        <label htmlFor="batchDescription" className="font-size-sm">Batch Description</label>
        <TextAreaInput 
          onChange={(value) => handleInputChange('description', value)}
          onValidationChange={(value) => handleIsValid('description', value)}
          validationSchema={batchDescriptionSchema}
          placeholder={formData.name === null ? "Enter A short description of student batch" : `Enter A Short Description of ${formData.name}`}
        />
      </div>
      <div className="mt-4">
        <button
          className="border-none px-3 py-2 w-100 rounded-3 font-size-sm primary-background text-white w-50"
          onClick={() => {
            handleSubmit();
          }}
        >
          {isPending ? <SingleSpinner /> : "Create Batch"}
        </button>
      </div>
    </div>
  );
}
export default CreateStudentBatch;
