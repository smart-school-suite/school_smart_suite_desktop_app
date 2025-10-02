import { Icon } from "@iconify/react";
import { useRef, useState } from "react";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { useCreateAnnouncementCategory } from "../../hooks/announcement/useCreateAnnouncementCategory";
import { TextAreaInput, TextInput } from "../../components/FormComponents/InputComponents";
import { nameSchema, textareaSchema } from "../../ComponentConfig/YupValidationSchema";
import { allFieldsValid } from "../../utils/functions";
import toast from "react-hot-toast";
import ToastWarning from "../../components/Toast/ToastWarning";
function CreateAnnouncementCategory({ handleClose }) {
  const titleRef = useRef();
  const descriptionRef = useRef();
  const [formData, setFormData] = useState({
    name: "",
  });
  const [isValid, setIsValid] = useState({
    name: null,
  });
  const handlePrevalidation = async () => {
      const title = await titleRef.current.triggerValidation();
      const description = await descriptionRef.current.triggerValidation();
      return {
          title,
          description
      }
  }
  const { mutate: createCategory, isPending } =
    useCreateAnnouncementCategory(handleClose);

  const handleInputChange = (field, value, stateFn) => {
    stateFn((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    const prevalidation = await handlePrevalidation();
    if(!allFieldsValid(prevalidation)){
        toast.custom(
           <ToastWarning 
              title={"Invalid Fields 1"}
              description={"Some Fields Seem To Be Invalid Please Go Through the form and try again"}
           />
        )
        return
    }
    if(!allFieldsValid(isValid)){
      console.table(isValid)
        toast.custom(
           <ToastWarning 
              title={"Invalid Fields 2"}
              description={"Some Fields Seem To Be Invalid Please Go Through the form and try again"}
           />
        )
        return
    }
    createCategory(formData);
  };
  return (
    <>
      <div className="w-100">
        <div className="d-flex flex-row align-items-center justify-content-between mb-3">
          <span className="m-0">Create Category</span>
          <span
            className="m-0"
            onClick={() => {
              handleClose();
            }}
          >
            <Icon icon="charm:cross" width="22" height="22" />
          </span>
        </div>
        <div className="d-flex flex-column gap-2">
            <div>
          <label htmlFor="title" className="font-size-sm">
            Title
          </label>
          <TextInput
            onChange={(value) => handleInputChange("name", value, setFormData)}
            validationSchema={nameSchema({
              min: 3,
              max: 150,
              required: true,
              messages: {
                min: "Category Title Must Be Atleast 3 Characters Long",
                max: "Category Title Must Not Exceed 150 Characters",
                required: "Category Title Required",
              },
            })}
            onValidationChange={(value) => handleInputChange('name', value, setIsValid)}
            placeholder={"e.g Graduation & Awards Ceremonies"}
            value={formData.name}
            ref={titleRef}
          />
        </div>
        <div>
          <label htmlFor="description" className="font-size-sm">Description</label>
          <TextAreaInput 
            onChange={(value) => handleInputChange('description', value, setFormData)}
            validationSchema={textareaSchema({
               min:10,
               max:500,
               required:true,
               messages:{
                 min:"Description Must Be Atleast 10 Characters Long",
                 max:"Description Must Not Exceed 500 Characters",
                 required:"Description Required"
               }
            })}
            onValidationChange={(value) => handleInputChange('name', value, setIsValid)}
            placeholder={"Enter Category Description"}
            value={formData.description}
            ref={descriptionRef}
          />
        </div>
        </div>
        <div className="mt-4">
          <button
            className="border-none px-3 py-2 rounded-3 font-size-sm primary-background text-white w-100"
            disabled={isPending}
            onClick={() => {
              handleSubmit();
            }}
          >
            {isPending ? <SingleSpinner /> : "Create Category"}
          </button>
        </div>
      </div>
    </>
  );
}
export default CreateAnnouncementCategory;
