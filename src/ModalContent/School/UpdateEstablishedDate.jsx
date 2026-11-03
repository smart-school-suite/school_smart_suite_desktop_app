import { Icon } from "@iconify/react";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { useUpdateSchool } from "../../hooks/school/useUpdateSchool";
import { useState } from "react";
import { DateInput } from "../../components/FormComponents/InputComponents";
import {
  hasNonEmptyValue,
  optionalValidateObject,
} from "../../utils/functions";
import { dateValidationSchema } from "../../ComponentConfig/YupValidationSchema";
import FormErrorBanner from "../../components/errors/FormErrorBanner";
import { useFormError } from "../../hooks/form/useFormError";
function UpdateEstablishedDate({ handleClose }) {
  const [formData, setFormData] = useState({
    established_year: "",
  });
  const [isValid, setIsValid] = useState({
     established_year: "",
  })
  const handleStateChange = (field, value, stateFn) => {
    if (stateFn === setFormData) clearFormError();
    stateFn((prev) => ({ ...prev, [field]: value }));
  };
  const { mutate: updateEstablishedDate, isPending } = useUpdateSchool(
    handleClose,
    "Established Date"
  );
  const { formError, errorBannerRef, setClientError, handleServerError, clearFormError } =
    useFormError("Failed To Update Established Date");
  const handleUpdateDate = () => {
        if (optionalValidateObject(isValid) == false) {
          setClientError("Invalid Fields", "Please Ensure All Fields Are Valid Before Submitting");
          return;
        }
        if (hasNonEmptyValue(formData) == false) {
          setClientError("Nothing To Update", "Please Ensure Atleast One Field Is Updated Before Submitting");
          return;
        }
    clearFormError();
    updateEstablishedDate({ updateData: formData }, { onError: handleServerError });
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
        <FormErrorBanner
          ref={errorBannerRef}
          error={formError}
          onDismiss={clearFormError}
          className="mb-2"
        />
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
