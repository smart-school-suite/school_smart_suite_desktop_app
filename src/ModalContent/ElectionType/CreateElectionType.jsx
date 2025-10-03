import { useRef, useState } from "react";
import {
  TextInput,
  TextAreaInput,
} from "../../components/FormComponents/InputComponents";
import { useCreateElectionType } from "../../hooks/electionType/useCreateElectionType";
import { Icon } from "@iconify/react";
import { allFieldsValid } from "../../utils/functions";
import toast from "react-hot-toast";
import ToastWarning from "../../components/Toast/ToastWarning";
import {
  nameSchema,
  textareaSchema,
} from "../../ComponentConfig/YupValidationSchema";
import { SingleSpinner } from "../../components/Spinners/Spinners";
function CreateElectionType({ handleClose }) {
  const { mutate: createElectionType, isPending } = useCreateElectionType(handleClose);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [isValid, setIsValid] = useState({
    title: null,
    description: null,
  });
  const titleRef = useRef();
  const descriptionRef = useRef();
  const handlePrevalidation = async () => {
    const title = await titleRef.current.triggerValidation();
    const description = await descriptionRef.current.triggerValidation();
    return {
      title,
      description,
    };
  };
  const handleStateChange = (field, value, stateFn) => {
    stateFn((prev) => ({ ...prev, [field]: value }));
  };
  const handleCreateElectionType = async () => {
    const prevalidation = await handlePrevalidation();
    if (!allFieldsValid(prevalidation)) {
      toast.custom(
        <ToastWarning
          title={"Invalid Fields 1"}
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
          title={"Invalid Fields 2"}
          description={
            "Some Fields Seem To Be Invalid Please Go Through the form and try again"
          }
        />
      );
      return;
    }
    createElectionType({
        election_title:formData.title,
        description:formData.description
    });
  };
  return (
    <>
      <div>
        <div className="d-flex flex-row align-items-center justify-content-between mb-3">
          <span>Create Election Type</span>
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
          <label htmlFor="electiontypetitle" className="font-size-sm">
            Title
          </label>
          <TextInput
            placeholder={"Student Union Government Elections"}
            onChange={(value) => handleStateChange("title", value, setFormData)}
            onValidationChange={(value) =>
              handleStateChange("title", value, setIsValid)
            }
            validationSchema={nameSchema({
              min: 5,
              max: 200,
              required: true,
              messages: {
                min: "Election Type Title Must Be Aleast 5 Characters Long",
                max: "Election Type Title Must Not Exceed 200 Characters",
                required: "Election Type Title Required",
              },
            })}
            value={formData.title}
            ref={titleRef}
          />
        </div>
        <div>
          <label htmlFor="description" className="font-size-sm">
            Description
          </label>
          <TextAreaInput
            placeholder={"Write A Short Description of election type"}
            onChange={(value) =>
              handleStateChange("description", value, setFormData)
            }
            onValidationChange={(value) =>
              handleStateChange("description", value, setIsValid)
            }
            validationSchema={textareaSchema({
              required: true,
              min: 10,
              max: 500,
              messages: {
                min: "Election Type Description Must Be Atleast 10 Characters Long",
                max: "Election Type Description Should Not Exceed 500 Characters Long",
                required: "Election Type Description Required",
              },
            })}
            ref={descriptionRef}
            value={formData.description}
          />
        </div>
        <div className="mt-4">
          <button
            className="border-none px-3 py-2 rounded-3 font-size-sm primary-background text-white w-100"
            disabled={isPending}
            onClick={() => {
              handleCreateElectionType();
            }}
          >
            {isPending ? <SingleSpinner /> : "Create Election Type"}
          </button>
        </div>
      </div>
    </>
  );
}
export default CreateElectionType;
