import { useUpdateSchoolBranch } from "../../hooks/schoolBranch/useUpdateSchoolBranch";
import {  useState } from "react";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { Icon } from "@iconify/react";
import { nameSchema } from "../../ComponentConfig/YupValidationSchema";
import { TextInput } from "../../components/FormComponents/InputComponents";
import { hasNonEmptyValue, optionalValidateObject } from "../../utils/functions";
import toast from "react-hot-toast";
import ToastWarning from "../../components/Toast/ToastWarning";
function UpdateSchoolBranchCity({ handleClose }) {
  const [formData, setFormData] = useState({
    city: "",
  });
  const [isValid, setIsValid] = useState({
      city:""
  })
  const handleStateChange = (field, value, stateFn) => {
    stateFn((prev) => ({ ...prev, [field]: value }));
  };
  const { mutate: update, isPending } = useUpdateSchoolBranch(
    handleClose,
    "city"
  );
  const handleUpdate = () => {
    if(optionalValidateObject(isValid) == false){
          toast.custom(
            <ToastWarning 
               title={"Invalid Fields"}
               description={"Please Ensure All Fields Are Valid Before Submitting"}
            />
          )
          return;
      }
      if(hasNonEmptyValue(formData) == false){
          toast.custom(
            <ToastWarning 
               title={"Nothing To Update"}
               description={"Please Ensure Atleast One Field Is Updated Before Submitting"}
            />
          )
          return;
      }
    update({ updateData: formData });
  };
  return (
    <>
      <div>
        <div className="block">
          <div className="d-flex flex-row align-items-center justify-content-between mb-3">
            <span className="m-0">Update city</span>
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
          <label htmlFor="city" className="font-size-sm">City</label>
          <TextInput 
             onChange={(value) => handleStateChange('city', value, setFormData)}
             onValidationChange={(value) => handleStateChange('city', value, setIsValid)}
              value={formData.city}
               placeholder={"Enter City"} 
               validationSchema={nameSchema({
                  required:false,
                  min:2,
                  max:150,
                  messages:{
                     min:"City Name Must Be Atleast 2 Characters Long",
                     max:"City Name Must Not Exceed 150 Characters"
                  }
               })} 
               type="city"
          />
        </div>
        <button
          className="border-none px-3 mt-2 py-2 rounded-3 font-size-sm primary-background text-white w-100"
          onClick={() => {
            handleUpdate();
          }}
          disabled={isPending}
        >
          {isPending ? <SingleSpinner /> : "Update city"}
        </button>
      </div>
    </>
  );
}
export default UpdateSchoolBranchCity;
