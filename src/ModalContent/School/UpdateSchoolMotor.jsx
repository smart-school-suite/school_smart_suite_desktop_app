import { Icon } from "@iconify/react";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { useUpdateSchool } from "../../hooks/school/useUpdateSchool";
import { useState } from "react";
import { TextAreaInput } from "../../components/FormComponents/InputComponents";
import { textareaSchema } from "../../ComponentConfig/YupValidationSchema";
import toast from "react-hot-toast";
import ToastWarning from "../../components/Toast/ToastWarning";
import {
  hasNonEmptyValue,
  optionalValidateObject,
} from "../../utils/functions";
function UpdateSchoolMotor({ handleClose }) {
  const [formData, setFormData] = useState({
    motor: "",
  });
  const [isValid, setIsValid] = useState({
     motor:""
  })
  const handleStateChange = (field, value, stateFn) => {
    stateFn((prev) => ({ ...prev, [field]: value }));
  };
  const { mutate: updateMotor, isPending } = useUpdateSchool(
    handleClose,
    "motor"
  );
  const handleUpdateMotor = () => {
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
    updateMotor({ updateData:formData });
  };
  return (
    <>
      <div>
        <div className="block">
          <div className="d-flex flex-row align-items-center justify-content-between mb-3">
            <span className="m-0">Update School Motor</span>
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
          <label htmlFor="schoolMotor" className="font-size-sm">School Motor</label>
          <TextAreaInput 
            onChange={(value) => handleStateChange('motor', value, setFormData)}
            onValidationChange={(value) => handleStateChange('motor', value, setIsValid)}
            value={formData.motor}
            optional={true}
            validationSchema={textareaSchema({
                min:10,
                max:100,
                required:false,
                messages:{
                   min:"School Motor Must Be Atleast 10 characters Long",
                   max:"School Motor Must Not Exceed 100 Characters"
                }
            })}
            placeholder={"Enter School Motor"}
          />
          </div>
          <button
            className="border-none px-3 mt-4 py-2 rounded-3 font-size-sm primary-background text-white w-100"
            onClick={() => {
              handleUpdateMotor();
            }}
            disabled={isPending}
          >
            {isPending ? <SingleSpinner /> : "Update School Motor"}
          </button>    
      </div>
    </>
  );
}
export default UpdateSchoolMotor;
