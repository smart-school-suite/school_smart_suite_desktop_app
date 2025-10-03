import { useUpdateElectionType } from "../../hooks/electionType/useUpdateElectionType";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import {
  TextInput,
  TextAreaInput,
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
import { useState } from "react";
import { Icon } from "@iconify/react";
function UpdateElectionType({ handleClose, rowData }) {
  const {
    id: electionTypeId,
    election_title: electionName,
    description,
  } = rowData;
  const { mutate: updateElectionType, isPending } =
    useUpdateElectionType(handleClose);
  const [formData, setFormData] = useState({
    election_title: "",
    description: "",
  });
  const [isValid, setIsValid] = useState({
    election_title: "",
    description: "",
  });
  const handleStateChange = (field, value, stateFn) => {
    stateFn((prev) => ({ ...prev, [field]: value }));
  };
  const handleUpdate = () => {
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
    updateElectionType({ electionTypeId, updateData: formData });
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
            placeholder={electionName}
            onChange={(value) => handleStateChange("election_title", value, setFormData)}
            onValidationChange={(value) =>
              handleStateChange("election_title", value, setIsValid)
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
          />
        </div>
        <div>
          <label htmlFor="description" className="font-size-sm">
            Description
          </label>
          <TextAreaInput
            placeholder={description}
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
            value={formData.description}
          />
        </div>
        <div className="mt-4">
          <button
            className="border-none px-3 py-2 rounded-3 font-size-sm primary-background text-white w-100"
            disabled={isPending}
            onClick={() => {
              handleUpdate();
            }}
          >
            {isPending ? <SingleSpinner /> : "Create Election Type"}
          </button>
        </div>
      </div>
    </>
  );
}
export default UpdateElectionType;
