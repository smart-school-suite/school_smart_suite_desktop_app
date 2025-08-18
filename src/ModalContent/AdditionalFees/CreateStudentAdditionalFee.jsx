import { useCreateStudentAdditionalFee } from "../../hooks/additionalFee/useCreateStudentAdditionalFee";
import { useState } from "react";
import { Icon } from "@iconify/react";
import { useGetAdditionalFeeCategory } from "../../hooks/additionalFee/useGetAdditionalFeeCategories";
import CustomDropdown from "../../components/Dropdowns/Dropdowns";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { InputGroup, NumberInput, TextAreaInput } from "../../components/FormComponents/InputComponents";
import { numberSchema, textareaSchema } from "../../ComponentConfig/YupValidationSchema";

function CreateStudentAdditionalFee({ handleClose, rowData }) {
  const studentId = rowData.id;
  const currencyState = useSelector((state) => state.auth.user);
    const currency =
      currencyState?.schoolDetails?.school?.country?.currency || "";
  const { mutate: createAdditionalFee, isPending } =
    useCreateStudentAdditionalFee(handleClose);
  const { data: category, isFetching } = useGetAdditionalFeeCategory();
  const [formData, setFormData] = useState({
    amount: 0,
    reason: "",
    additionalfee_category_id: "",
    student_id: studentId,
  });
  const [isValid, setIsValid] = useState({
    amount: 0,
    reason: "",
  })
  const [errors, setErrors] = useState({
     additionalfee_category_id: "",
  })
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const handleFieldError = (field, value) => {
    setErrors((prev) => ({ ...prev, [field]:value }))
  }
  const handleFieldValid = (field, value) => {
    setIsValid((prev) => ({ ...prev, [field]:value}))
  }
  const handleSubmit = () => {
    createAdditionalFee(formData);
  };
  return (
    <>
      <div className="card w-100 border-none">
        <div className="d-flex flex-row align-items-center justify-content-between mb-3 w-100">
            <span className="m-0">Create Additional Fee</span>
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
         <div>
          <label htmlFor="amount" className="font-size-sm">Amount</label>
          <InputGroup
            onChange={(value) => handleInputChange('amount', value)}
            onValidationChange={(value) => handleFieldValid('amount', value)}
            value={formData.amount}
            step="0.01"
            type="number"
            validationSchema={numberSchema({
               min:1,
               max:1000000,
               required:true,
               messages:{
                 min:"Amount Must Be Greater Than 1",
                 max:"Amount Must Not Exceed 1000000"
               }
            })}
            InputGroupText={currency}
          />
        </div>
        <div>
           <label htmlFor="category" className="font-size-sm">Category</label>
            <CustomDropdown
              data={category.data}
              displayKey={["title"]}
              valueKey={["id"]}
              filter_array_keys={["id", "title"]}
              renameMapping={{ id: "id", title: "title" }}
              isLoading={isFetching}
              direction="up"
              onSelect={(value) => handleInputChange('additional_fee_category', value)}
              error={errors.additionalfee_category_id}
              errorMessage="Additional Fee Category Required"
              placeholder="Select Additional Fee Category"
            />
        </div>
        <div>
          <label htmlFor="reason" className="font-size-sm">Reason</label>
          <TextAreaInput 
            placeholder={formData.amount ? `Enter Reason For Billing Student Additional Fee of ${formData.amount}`: "Write a short reason for the billing"}
            onChange={(value) => handleInputChange('reason', value)}
            onValidationChange={(value) => handleFieldValid('reason', value)}
            validationSchema={textareaSchema({
               min:10,
               max:1000,
               required:true,
               messages:{
                 required:"Reason Required",
                 min:"Reason Length Must Be Atleast 10 Characters Long",
                 max:"Reason Must Not Exceed 1000 Characters"
               }
            })}
          />
        </div>
      </div>
      <div className="w-100 mt-2">
        <button
          className="border-none px-3 mt-2 py-2 rounded-3 font-size-sm primary-background text-white w-100"
          onClick={() => {
            handleSubmit();
          }}
          disabled={isPending}
        >
          {isPending ? <SingleSpinner /> : "Create Additional Fee"}
        </button>
      </div>
       </div>
    </>
  );
}
export default CreateStudentAdditionalFee;
