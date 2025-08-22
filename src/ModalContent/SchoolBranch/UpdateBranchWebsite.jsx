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
import { urlSchema } from "../../ComponentConfig/YupValidationSchema";
function UpdateSchoolBranchWebsite({ handleClose }) {
  const [formData, setFormData] = useState({
    website: "",
  });
  const [isValid, setIsValid] = useState({
     website:"",
  })
  const handleChangeState = (field, value, stateFn) => {
    stateFn((prev) => ({ ...prev, [field]: value }));
  };
  const { mutate: update, isPending } = useUpdateSchoolBranch(
    handleClose,
    "website"
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
            <span className="m-0">Update website</span>
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
          <label htmlFor="website" className="font-size-sm">Website</label>
          <TextInput 
            type="url"
            placeholder="e.g https://www.example.com"
            onChange={(value) =>  handleChangeState('website', value, setFormData)}
            onValidationChange={(value) =>  handleChangeState('state', value, setIsValid)}
            value={formData.website}
            validationSchema={urlSchema(true)}
          />
        </div>
        <button
          className="border-none px-3 mt-2 py-2 rounded-3 font-size-sm primary-background text-white w-100"
          onClick={() => {
            handleUpdate();
          }}
          disabled={isPending}
        >
          {isPending ? <SingleSpinner /> : "Update website"}
        </button>
      </div>
    </>
  );
}
export default UpdateSchoolBranchWebsite;
