import { useUpdateSchoolBranch } from "../../hooks/schoolBranch/useUpdateSchoolBranch";
import { useState } from "react";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { Icon } from "@iconify/react";
import toast from "react-hot-toast";
import ToastWarning from "../../components/Toast/ToastWarning";
import {
  hasNonEmptyValue,
  optionalValidateObject,
} from "../../utils/functions";
import { TextInput } from "../../components/FormComponents/InputComponents";
import { nameSchema } from "../../ComponentConfig/YupValidationSchema";
function UpdateSchoolBranchAbbreviation({ handleClose }) {
  const [formData, setFormData] = useState({
    abbreviation: "",
  });
  const [isValid, setIsvalid] = useState({
    abbreviation: "",
  });
  const handleStateChange = (field, value, stateFn) => {
    stateFn((prev) => ({ ...prev, [field]: value }));
  };
  const { mutate: update, isPending } = useUpdateSchoolBranch(
    handleClose,
    "Abbreviation"
  );
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
    update({ updateData: formData });
  };
  return (
    <>
      <div>
        <div className="block">
          <div className="d-flex flex-row align-items-center justify-content-between mb-3">
            <span className="m-0">Update Abbreviation</span>
            <span
              className="m-0"
              onClick={() => {
                handleClose();
              }}
            >
              <Icon icon="charm:cross" width="22" height="22" />
            </span>
          </div>
        </div>
        <div className="my-1">
          <label htmlFor="abbreviation" className="font-size-sm">
            Abbreviation
          </label>
          <TextInput
            onChange={(value) =>
              handleStateChange("abbreviation", value, setFormData)
            }
            onValidationChange={(value) =>
              handleStateChange("abbreviation", value, setIsvalid)
            }
            value={formData.abbreviation}
            placeholder={"Enter Abbreviation"}
            validationSchema={nameSchema({
              min: 2,
              max: 10,
              required: false,
              messages: {
                min: "Abbreviation Must Be Atleast 2 Characters Long",
                max: "Abbreviation Must Not Exceed 10 Characters",
              },
            })}
          />
        </div>
        <button
          className="border-none px-3 mt-2 py-2 rounded-3 font-size-sm primary-background text-white w-100"
          onClick={() => {
            handleUpdate();
          }}
          disabled={isPending}
        >
          {isPending ? <SingleSpinner /> : "Update Abbreviation"}
        </button>
      </div>
    </>
  );
}
export default UpdateSchoolBranchAbbreviation;
