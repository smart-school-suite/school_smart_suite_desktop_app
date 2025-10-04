import { useUpdateElectionRole } from "../../hooks/electionRole/useUpdateElectionRole";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { useState } from "react";
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
import {
  hasNonEmptyValue,
  optionalValidateObject,
} from "../../utils/functions";
import toast from "react-hot-toast";
import ToastWarning from "../../components/Toast/ToastWarning";
function UpdateElectionRole({ handleClose, rowData }) {
  const { mutate: updateElectionRole, isPending } =
    useUpdateElectionRole(handleClose);
  const { data: electionTypes, isLoading } = useGetElectionTypes();
  const { id: electionRoleId, role_title:title, description } = rowData;
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    election_type_id: "",
  });
  const [isValid, setIsValid] = useState({
    name: null,
    description: null,
  });
  const [errors, setErrors] = useState({
    election_type_id: "",
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
    updateElectionRole({ electionRoleId, updateData: formData });
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
            placeholder={title}
            value={formData.name}
            validationSchema={nameSchema({
              min: 3,
              max: 150,
              required: false,
              messages: {
                min: "Election Role Title Must Be Atleast 3 Characters Long",
                max: "Election Role Title Must Not Exceed 150 Characters",
              },
            })}
            onValidationChange={(value) =>
              handleStateChange("name", value, setIsValid)
            }
            onChange={(value) => handleStateChange("name", value, setFormData)}
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
            error={errors.election_type_id}
            isLoading={isLoading}
            errorMessage="Election Type Required"
            onError={(msg) =>
              handleStateChange("election_type_id", msg, setErrors)
            }
            optional={true}
          />
        </div>
        <div>
          <label htmlFor="electionRoleDescription" className="font-size-sm">
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
                min: "Election Role Description Must Be Atleast 10 Characters Long",
                max: "Election Role Description Must Not Exceed 1000 Charactes",
              },
            })}
          />
        </div>
         <div className="mt-4">
          <button
            className="border-none px-3 py-2 rounded-3 font-size-sm primary-background text-white w-100"
            disabled={isPending}
            onClick={() => {
              handleSubmit();
            }}
          >
            {isPending ? <SingleSpinner /> : "Create Election Type"}
          </button>
        </div>
      </div>
    </>
  );
}
export default UpdateElectionRole;
