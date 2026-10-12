import { Icon } from "@iconify/react";
import { useState } from "react";
import toast from "react-hot-toast";
import {
    nameSchema,
    textareaSchema,
} from "../../ComponentConfig/YupValidationSchema";
import HorizontalDashedLine from "../../components/DashedLine/HorizonetalDashedLine";
import {
    TextAreaInput,
    TextInput,
} from "../../components/FormComponents/InputComponents";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import ToastWarning from "../../components/Toast/ToastWarning";
import { useUpdateElectionType } from "../../hooks/electionType/useUpdateElectionType";
import {
    hasNonEmptyValue,
    optionalValidateObject,
} from "../../utils/functions";
function UpdateElectionType({ drawerData, handleClose }) {
  const {
    id: electionTypeId,
    election_title: electionName,
    description,
  } = drawerData;
  const { mutate: updateElectionType, isPending } =
    useUpdateElectionType(handleClose);
  const [formData, setFormData] = useState({
    election_title: electionName || "",
    description: description || "",
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
        />,
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
        />,
      );
      return;
    }
    updateElectionType({ electionTypeId, updateData: formData });
  };
  return (
    <>
      <div className="drawer-content ps-2 pt-3">
        <div className="d-flex flex-column gap-3">
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
              onChange={(value) =>
                handleStateChange("election_title", value, setFormData)
              }
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
              onClick={() => {
                handleUpdate();
              }}
              disabled={isPending}
            >
              {isPending ? <SingleSpinner /> : "Update Election Type"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default UpdateElectionType;
