import { Icon } from "@iconify/react";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { useUpdateSchool } from "../../hooks/school/useUpdateSchool";
import { useState } from "react";
import { DateInput } from "../../components/FormComponents/InputComponents";
import toast from "react-hot-toast";
import ToastWarning from "../../components/Toast/ToastWarning";
import {
  hasNonEmptyValue,
  optionalValidateObject,
} from "../../utils/functions";
import { dateValidationSchema } from "../../ComponentConfig/YupValidationSchema";
function UpdateEstablishedDate({ handleClose }) {
  const [formData, setFormData] = useState({
    established_year: "",
  });
  const [isValid, setIsValid] = useState({
     established_year: "",
  })
  const handleStateChange = (field, value, stateFn) => {
    stateFn((prev) => ({ ...prev, [field]: value }));
  };
  const { mutate: updateEstablishedDate, isPending } = useUpdateSchool(
    handleClose,
    "Established Date"
  );
  const handleUpdateDate = () => {
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
    updateEstablishedDate({ updateData: formData });
  };
  return (
    <>
      <div>
        <div className="block">
          <div className="d-flex flex-row align-items-center justify-content-between mb-3">
            <h5 className="m-0">Update Established Date</h5>
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
          <label htmlFor="establishedDate" className="date">Established Date</label>
          <DateInput 
            onChange={(value) => handleStateChange('established_year', value, setFormData)}
            onValidationChange={(value) => handleStateChange('established_year', value, setIsValid)}
            value={formData.date}
            validationSchema={dateValidationSchema({
                required:false,
                futureOrToday:false
            })}
          />
        </div>
        <button
          className="border-none px-3 mt-2 py-2 rounded-3 font-size-sm primary-background text-white w-100"
          onClick={() => {
            handleUpdateDate();
          }}
          disabled={isPending}
        >
          {isPending ? <SingleSpinner /> : "Update Established Date"}
        </button>
      </div>
    </>
  );
}
export default UpdateEstablishedDate;
