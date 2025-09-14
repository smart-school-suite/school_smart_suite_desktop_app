import { useState, useRef } from "react";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { Icon } from "@iconify/react";
import { InputGroup } from "../../components/FormComponents/InputComponents";
import { numberSchema } from "../../ComponentConfig/YupValidationSchema";
import { useSelector } from "react-redux";
import CustomDropdown from "../../components/Dropdowns/Dropdowns";
import { paymentMethods } from "../../data/data";
import { allFieldsValid } from "../../utils/functions";
import toast from "react-hot-toast";
import ToastWarning from "../../components/Toast/ToastWarning";
import { useBulkPayAdditionalFee } from "../../hooks/additionalFee/useBulkPayAdditionalFee";
function BulkPayAdditionalFee({ handleClose, resetAll, bulkData }){
  const amountRef = useRef();
  const methodRef = useRef();
  const currencyState = useSelector((state) => state.auth.user);
  const userCurrencySymbol =
    currencyState?.schoolDetails?.school?.country?.currency || "";
  const [formData, setFormData] = useState({
    amount: "",
    payment_method: "",
  });
  const [errors, setErrors] = useState({
    payment_method: "",
  });
  const [isValid, setIsValid] = useState({
    amount: "",
  });
  const { mutate: payAdditionalFee, isPending } = useBulkPayAdditionalFee(
    handleClose,
    resetAll
  );
  const handlePrevalidation = async () => {
    const amount = await amountRef.current.triggerValidation();
    const paymentMethod = await methodRef.current.triggerValidation();
    return {
      amount,
      payment_method: paymentMethod,
    };
  };
  const handleStateChange = (field, value, stateFn) => {
    stateFn((prev) => ({ ...prev, [field]: value }));
  };
  const handleSubmit = async () => {
    const prevalidation = await handlePrevalidation();
    if (!allFieldsValid(prevalidation)) {
      toast.custom(
        <ToastWarning
          title={"Invalid Fields"}
          description={"Please Ensure All Fields Are Valid Before Submitting"}
        />
      );
      return;
    }
    if (!allFieldsValid(isValid)) {
      toast.custom(
        <ToastWarning
          title={"Invalid Fields"}
          description={"Please Ensure All Fields Are Valid Before Submitting"}
        />
      );
      return;
    }
    const formattedData = bulkData.map((items) => ({
         fee_id:items.id,
         amount:formData.amount,
         payment_method:formData.payment_method
    }))
    payAdditionalFee({ additional_fee:formattedData });
  };
    return(
        <>
      <div>
        <div className="block">
          <div className="d-flex flex-row align-items-center justify-content-between mb-3">
            <span className="m-0">Pay Additional Fee</span>
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
            <label htmlFor="amount" className="font-size-sm">
              Amount
            </label>
            <InputGroup
              onChange={(value) => handleStateChange("amount", value, setFormData)}
              onValidationChange={(value) => handleStateChange("amount", value, setIsValid)}
              value={formData.amount}
              validationSchema={numberSchema({ 
                min: 1,
                max: 500000,
                required:true,
                integerOnly:false,
                messages: {
                  required: "Amount is required",
                  min: `Minimum amount is 1 ${userCurrencySymbol}`,
                  max: `Maximum amount is 500000 ${userCurrencySymbol}`,
                },
              })}
              placeholder={"Enter Amount Paid"}
              InputGroupText={userCurrencySymbol}
              ref={amountRef}
            />
          </div>
          <div>
            <label htmlFor="paymentMethod" className="font-size-sm">
              Payment Method
            </label>
            <CustomDropdown
              data={paymentMethods}
              valueKey={["value"]}
              displayKey={["label"]}
              direction="down"
              onError={(value) => handleStateChange("payment_method", value, setErrors)}
              onSelect={(value) =>
                handleStateChange("payment_method", value.value, setFormData)
              }
              error={errors.payment_method}
              errorMessage="Payment Method Required"
              placeholder="Select Payment Method"
              ref={methodRef}
            />
          </div>
          <div className="mt-3">
            <button
              className="border-none px-3 py-2 rounded-3 font-size-sm w-50 primary-background text-white w-100"
              onClick={() => {
                handleSubmit();
              }}
            >
              {isPending ? <SingleSpinner /> : "Pay Additional Fee"}
            </button>
          </div>
        </div>
      </div>
        </>
    )
}
export default BulkPayAdditionalFee;