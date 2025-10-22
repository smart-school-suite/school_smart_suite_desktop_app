import { useRef, useState } from "react";
import { usePayTuitionFee } from "../../hooks/feePayment/usePayTuitionFee";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { Icon } from "@iconify/react";
import { useSelector } from "react-redux";
import CustomDropdown from "../../components/Dropdowns/Dropdowns";
import { paymentMethods } from "../../data/data";
import { InputGroup } from "../../components/FormComponents/InputComponents";
import { numberSchema } from "../../ComponentConfig/YupValidationSchema";
import { allFieldsValid, formatNumber } from "../../utils/functions";
import toast from "react-hot-toast";
import ToastWarning from "../../components/Toast/ToastWarning";
function PayStudentTuitionFee({ handleClose, rowData }) {
  const { id: feeId, amount_left: amountLeft } = rowData;
  const amountRef = useRef();
  const methodRef = useRef();
  const currencyState = useSelector((state) => state.auth.user);
  const userCurrencySymbol =
    currencyState?.schoolDetails?.school?.country?.currency || "";
  const { mutate: payTuitionFee, isPending } = usePayTuitionFee(handleClose);
  const [formData, setFormData] = useState({
    tuition_id: feeId,
    payment_method: "",
    amount: "",
  });
  const [isValid, setIsValid] = useState({
    amount: "",
  });
  const [errors, setErrors] = useState({
    payment_method: "",
  });
  const handlePrevalidation = async () => {
    const amount = await amountRef.current.triggerValidation();
    const paymentMethod = await methodRef.current.triggerValidation();
    return {
      amount,
      payment_method: paymentMethod,
    };
  }
  const handleStateChange = (field, value, stateFn) => {
    stateFn((prev) => ({ ...prev, [field]: value }));
  };
  const handleSubmit = async () => {
    const prevalidation = await handlePrevalidation();
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
    payTuitionFee({...formData, payment_method:formData.payment_method.value});
  };
  return (
    <>
      <div className="block">
        <div className="d-flex flex-row align-items-center justify-content-between mb-3">
          <span className="m-0">Make Tuition Fee Payment</span>
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
        <label htmlFor="amount" className="font-size-sm">
          Amount  <span className="gainsboro-color"> Hint(amount left: {formatNumber(amountLeft)} {userCurrencySymbol})</span>
        </label>
        <InputGroup
          onChange={(value) => handleStateChange("amount", value, setFormData)}
          value={formData.amount}
          step="0.01"
          validationSchema={numberSchema({ 
            min: 1, 
            max: amountLeft,
            required:true,
            integerOnly:false,
            messages:{
                required: "Amount is required",
                min: `Amount must be atleast 1 ${userCurrencySymbol}`, 
                max: `Amount must not exceed ${amountLeft} ${userCurrencySymbol}`,
            }
          })}
          onValidationChange={(value) => handleStateChange("amount", value, setIsValid)}
          InputGroupText={userCurrencySymbol}
          placeholder={"Enter Amount Paid"}
          ref={amountRef}
        />
      </div>
      <div className="my-2">
        <label htmlFor="paymentMethod" className="font-size-sm">
          Payment Method
        </label>
        <CustomDropdown
          data={paymentMethods}
          valueKey={["value"]}
          displayKey={["label"]}
          direction="down"
          onError={(value) => handleStateChange("payment_method", value, setErrors)}
          onSelect={(value) => handleStateChange("payment_method", value, setFormData)}
          error={errors.payment_method}
          errorMessage="Payment Method Required"
          placeholder="Select Payment Method"
          ref={methodRef}
          value={formData.payment_method}
        />
      </div>
      <div className="mt-4">
        <div className="d-flex flex-row align-items-center justify-content-end gap-2 w-100">
          <button
            className="border-none px-3 py-2 rounded-3 font-size-sm primary-background text-white w-100"
            onClick={() => {
              handleSubmit();
            }}
          >
            {isPending ? <SingleSpinner /> : "Make Payment"}
          </button>
        </div>
      </div>
    </>
  );
}
export default PayStudentTuitionFee;
