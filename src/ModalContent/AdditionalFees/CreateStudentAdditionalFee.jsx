import { useCreateStudentAdditionalFee } from "../../hooks/additionalFee/useCreateStudentAdditionalFee";
import { useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { useGetAdditionalFeeCategory } from "../../hooks/additionalFee/useGetAdditionalFeeCategories";
import CustomDropdown from "../../components/Dropdowns/Dropdowns";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { InputGroup, TextAreaInput } from "../../components/FormComponents/InputComponents";
import { numberSchema, textareaSchema } from "../../ComponentConfig/YupValidationSchema";
import { allFieldsValid } from "../../utils/functions";
import toast from "react-hot-toast";
import ToastWarning from "../../components/Toast/ToastWarning";
import { useSelector } from "react-redux";
function CreateStudentAdditionalFee({ handleClose, rowData }) {
  const {id:studentId} = rowData;
  const amountRef = useRef();
  const reasonRef = useRef();
  const categoryRef = useRef();
  const currencyState = useSelector((state) => state.auth.user);
    const currency =
      currencyState?.schoolDetails?.school?.country?.currency || "";
  const { mutate: createAdditionalFee, isPending } =
    useCreateStudentAdditionalFee(handleClose);
  const { data: category, isFetching } = useGetAdditionalFeeCategory();
  const [formData, setFormData] = useState({
    amount: "",
    reason: "",
    additionalfee_category_id: "",
    student_id: studentId,
  });
  const [isValid, setIsValid] = useState({
    amount: null,
    reason: null,
  })
  const [errors, setErrors] = useState({
     additionalfee_category_id: "",
  })
  const handlePrevalidation = async () => {
    const amount = await amountRef.current.triggerValidation();
    const reason = await reasonRef.current.triggerValidation();
    const category = await categoryRef.current.triggerValidation();
    return {
      amount,
      reason,
      category
    };
  }
  const handleStateChange = (field, value, stateFn) => {
    stateFn((prev) => ({ ...prev, [field]: value }));
  };
  const handleSubmit = () => {
    const prevalidation = handlePrevalidation();
    if(!allFieldsValid(prevalidation)){
        toast.custom(
           <ToastWarning 
                title={"Invalid Fields"}
                description={"Please Ensure All Fields Are Valid Before Submitting"} 
          />
        )

        return;
    }
    if(!allFieldsValid(isValid)){
        toast.custom(
           <ToastWarning 
                title={"Invalid Fields"}
                description={"Please Ensure All Fields Are Valid Before Submitting"} 
          />
        )

        return;
    }
    createAdditionalFee(formData);
  };
  return (
    <>
      <div className="w-100 border-none">
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
            onChange={(value) => handleStateChange('amount', value, setFormData)}
            onValidationChange={(value) => handleStateChange('amount', value, setIsValid)}
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
            placeholder="Enter Amount"
            ref={amountRef}
          />
        </div>
        <div>
           <label htmlFor="category" className="font-size-sm">Category</label>
            <CustomDropdown
              data={category?.data ? category.data : []}
              displayKey={["title"]}
              valueKey={["id"]}
              isLoading={isFetching}
              direction="up"
              onSelect={(value) => handleStateChange('additionalfee_category_id', value.id, setFormData)}
              onError={(value) => handleStateChange('additionalfee_category_id', value, setErrors)}
              error={errors.additionalfee_category_id}
              errorMessage="Additional Fee Category Required"
              placeholder="Select Additional Fee Category"
              ref={categoryRef}
            />
        </div>
        <div>
          <label htmlFor="reason" className="font-size-sm">Reason</label>
          <TextAreaInput 
            placeholder={formData.amount ? `Enter Reason For Billing Student Additional Fee of ${formData.amount}`: "Write a short reason for the billing"}
            onChange={(value) => handleStateChange('reason', value, setFormData)}
            onValidationChange={(value) => handleStateChange('reason', value, setIsValid)}
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
            ref={reasonRef}
          />
        </div>
      </div>
      <div className="w-100 mt-4">
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
