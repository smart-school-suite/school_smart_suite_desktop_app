import { useUpdateAdditionalFee } from "../../hooks/additionalFee/useUpdateAdditionalFee";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { Icon } from "@iconify/react";
import { useState } from "react";
import CustomDropdown from "../../components/Dropdowns/Dropdowns";
import { useGetAdditionalFeeCategory } from "../../hooks/additionalFee/useGetAdditionalFeeCategories";
import { InputGroup, TextAreaInput } from "../../components/FormComponents/InputComponents";
import { numberSchema, textareaSchema } from "../../ComponentConfig/YupValidationSchema";
import { useSelector } from "react-redux";
function UpdateAdditionalFees({ rowData, handleClose }) {
    const currencyState = useSelector((state) => state.auth.user);
    const currency =
      currencyState?.schoolDetails?.school?.country?.currency || "";
  const [formData, setFormData] = useState({
    title: "",
    reason:"",
    additionalfee_category_id: "",
  });
  const [isValid, setIsValid] = useState({
     title: "",
    reason:"",
  })
  const [errors, setErrors] = useState({
    additionalfee_category_id: "", 
  })
  const { data: category, isFetching } = useGetAdditionalFeeCategory();
  const { id: additionalFeeId, amount, reason } = rowData;
  const { mutate: updateAdditionalFee, isPending } = useUpdateAdditionalFee(
    handleClose,
    additionalFeeId
  );
   const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const handleFieldValid = (field, value) => {
    setIsValid((prev) => ({...prev, [field]:value }));
  }
  const handleFieldError = (field, value) => {
    setErrors((prev) => ({...prev, [field]:value}))
  }
  const handleUpdate = () => {
    updateAdditionalFee({ additionalFeeId, updateData: formData });
  };
  return (
    <>
      <div className="card w-100 border-none">
        <div className="block">
          <div className="d-flex flex-row align-items-center justify-content-between mb-3 w-100">
            <span className="m-0">Update Additional Fee</span>
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
        <div>
          <div>
            <label htmlFor="amount" className="font-size-sm">Amount</label>
            <InputGroup 
              placeholder={amount}
              validationSchema={numberSchema({
                  min:1,
                  max:1000000,
                  integerOnly:false,
                  required:false,
                  messages:{
                     min:`Amount Must Be Atleast 1 ${currency}`,
                     max:`Amount Must Not Exceed 1000000 ${currency} `
                  }
              })}
              onChange={(value) => handleInputChange('amount', value)}
              onValidationChange={(value) => handleFieldValid('amount', value)}
             
            />
          </div>
          <div className="my-1">
             <label htmlFor="category" className="font-size-sm">Additional Fee Category</label>
              <CustomDropdown
                data={category.data}
                displayKey={["title"]}
                valueKey={["id"]}
                filter_array_keys={["id", "title"]}
                renameMapping={{ id: "id", title: "title" }}
                isLoading={isFetching}
                direction="up"
                onSelect={(value) => handleInputChange('additionalfee_category_id', value)}
                errorMessage="Category Required"
                error={errors.additionalfee_category_id}
                onError={(value) => handleFieldError('additionalfee_category_id', value)}
              />
          </div>
          <div>
            <label htmlFor="reason" className="font-size-sm">Reason</label>
            <TextAreaInput 
              onChange={(value) => handleInputChange('reason', value)}
              onValidationChange={(value) => handleFieldValid('reason', value)}
              validationSchema={textareaSchema({
                  min:10,
                  max:1000,
                  required:false,
                  messages:{
                     min:"Reason Must Be Atleast 10 Characters Long",
                     max:"Reason Must Not Exceed 1000 Characters"
                  }
              })}
              value={formData.reason}
              placeholder={reason ? reason : "Enter Reason For the bill"}
            />
          </div>
        </div>
        <div className="w-100 mt-2">
          <button
            className="border-none px-3 mt-2 py-2 rounded-3 font-size-sm primary-background text-white w-100"
            onClick={() => {
              handleUpdate();
            }}
            disabled={isPending}
          >
            {isPending ? <SingleSpinner /> : "Update Additional Fee"}
          </button>
        </div>
      </div>
    </>
  );
}
export default UpdateAdditionalFees;
