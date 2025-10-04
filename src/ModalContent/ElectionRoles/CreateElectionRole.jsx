import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { useCreateElectionRole } from "../../hooks/electionRole/useCreateElectionRole";
import { useGetElectionTypes } from "../../hooks/electionType/useGetElectionTypes";
import CustomDropdown from "../../components/Dropdowns/Dropdowns";
import {
  TextAreaInput,
  TextInput,
} from "../../components/FormComponents/InputComponents";
import {
  nameSchema,
  textareaSchema,
} from "../../ComponentConfig/YupValidationSchema";
import { Icon } from "@iconify/react";
import { allFieldsValid } from "../../utils/functions";
import ToastWarning from "../../components/Toast/ToastWarning";
function CreateElectionRole({ handleClose }) {
  const { mutate: createElectionRole, isPending } =
    useCreateElectionRole(handleClose);
  const { data: electionTypes, isLoading } = useGetElectionTypes();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    election_type_id: "",
  });
  const [isValid, setIsValid] = useState({
    name: null,
    description: null
  });
  const [error, setErrors] = useState({
    election_type_id: "",
  });
  const nameRef = useRef();
  const descriptionRef = useRef();
  const electionTypeRef = useRef();
  const handlePrevalidation = async () => {
    const name = await nameRef.current.triggerValidation();
    const description = await descriptionRef.current.triggerValidation();
    const electionType = await electionTypeRef.current.triggerValidation();
    return {
      name,
      description,
      electionType,
    };
  };
  const handleStateChange = (field, value, stateFn) => {
    stateFn((prev) => ({ ...prev, [field]: value }));
  };
  const handleCreateElectionRole = async () => {
    const prevalidation = await handlePrevalidation();
    if (!allFieldsValid(prevalidation)) {
      toast.custom(
        <ToastWarning
          title={"Invalid Fields"}
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
          title={"Invalid Fields"}
          description={
            "Some Fields Seem To Be Invalid Please Go Through the form and try again"
          }
        />
      );
      return;
    }
    createElectionRole(formData);
  };
  return (
    <>
      <div>
        <div className="d-flex flex-row align-items-center justify-content-between mb-3">
          <span>Create Election Role</span>
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
          <label htmlFor="electionRoleTile" className="font-size-sm">
            Title
          </label>
          <TextInput
            placeholder={"e.g Student Union Goverment"}
            value={formData.name}
            validationSchema={nameSchema({
              min: 3,
              max: 150,
              required: true,
              messages: {
                required: "Election Role Tilte Required",
                min: "Election Role Title Must Be Atleast 3 Characters Long",
                max: "Election Role Title Must Not Exceed 150 Characters",
              },
            })}
            onValidationChange={(value) =>
              handleStateChange("name", value, setIsValid)
            }
            onChange={(value) => handleStateChange("name", value, setFormData)}
            ref={nameRef}
          />
        </div>
        <div>
          <label htmlFor="electionType" className="font-size-sm">
            Election Type
          </label>
          <CustomDropdown
            data={electionTypes?.data || []}
            displayKey={["election_title"]}
            valueKey={["id"]}
            direction="up"
            onSelect={(value) =>
              handleStateChange("election_type_id", value.id, setFormData)
            }
            placeholder="Select Election Type"
            error={error.election_type_id}
            isLoading={isLoading}
            errorMessage="Election Type Required"
            onError={(msg) =>
              handleStateChange("election_type_id", msg, setErrors)
            }
            ref={electionTypeRef}
          />
        </div>
        <div>
          <label htmlFor="electionRoleDescription" className="font-size-sm">
            Description
          </label>
          <TextAreaInput
            placeholder={"Enter Election Role Description"}
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
                required: "Election Role Description Required",
                min: "Election Role Description Must Be Atleast 10 Characters Long",
                max: "Election Role Description Must Not Exceed 1000 Charactes",
              },
            })}
            ref={descriptionRef}
          />
        </div>
         <div className="mt-4">
          <button
            className="border-none px-3 py-2 rounded-3 font-size-sm primary-background text-white w-100"
            disabled={isPending}
            onClick={() => {
              handleCreateElectionRole();
            }}
          >
            {isPending ? <SingleSpinner /> : "Create Election Type"}
          </button>
        </div>
      </div>
    </>
  );
}
export default CreateElectionRole;
