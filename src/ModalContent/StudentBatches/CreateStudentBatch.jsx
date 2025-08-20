import { useRef, useState } from "react";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { useCreateStudentBatch } from "../../hooks/studentBatch/useCreateBatch";
import { Icon } from "@iconify/react";
import { TextAreaInput, TextInput } from "../../components/FormComponents/InputComponents";
import { nameSchema, textareaSchema } from "../../ComponentConfig/YupValidationSchema";
import { allFieldsValid } from "../../utils/functions";
import toast from "react-hot-toast";
import ToastWarning from "../../components/Toast/ToastWarning";
function CreateStudentBatch({ handleClose }) {
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
      const batchTitle = batchTitleRef.current.triggerValidation();
      const batchDescription = batchDescriptionRef.current.triggerValidation();
      return {
          batchTitle,
          batchDescription
      }
  }
  const handleStateChange = (field, value, stateFn) => {
    stateFn((prev) => ({ ...prev, [field]: value }));
  };
  const handleSubmit = async () => {
    const prevalidation = await handlePrevalidation();
    if(!allFieldsValid(prevalidation)){
      toast.custom(
         <ToastWarning 
           title={"Invalid Fields"}
              description={"Some Fields Seem To Be Invalid Please Go Through the form and try again"}
         />
      )
      return;
    }
    if(!allFieldsValid(isValid)){
      toast.custom(
         <ToastWarning 
           title={"Invalid Fields"}
           description={"Some Fields Seem To Be Invalid Please Go Through the form and try again"}
         />
      )
    }
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
          onChange={(value) => handleStateChange('name', value, setFormData)}
          onValidationChange={(value) => handleStateChange('name', value, setIsValid)}
          validationSchema={nameSchema({
             min:3,
             max:100,
             required:true,
             messages:{
               min:"Batch Title Must Be Atleast 3 Characters Long",
               max:"Batch Title Must Not Exceed 100 Characters",
               required:"Batch Title Required"
             }
          })}
          placeholder={"e.g Batch Of 2027"}
          value={formData.name}
          ref={batchTitleRef}
        />
      </div>
      <div>
        <label htmlFor="batchDescription" className="font-size-sm">Batch Description</label>
        <TextAreaInput 
          onChange={(value) => handleStateChange('description', value, setFormData)}
          onValidationChange={(value) => handleStateChange('description', value, setIsValid)}
          validationSchema={textareaSchema({
              min:10,
              max:1000,
              required:true,
              messages:{
                 required:"Batch Description Required",
                 min:"Batch Description Must Be Atleast 10 Characters Long",
                 max:"Batch Description Must Not Exceed 1000 Characters"
              }
          })}
          value={formData.description}
          placeholder={formData.name === null ? "Enter A short description of student batch" : `Enter A Short Description of ${formData.name}`}
          ref={batchDescriptionRef}
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
