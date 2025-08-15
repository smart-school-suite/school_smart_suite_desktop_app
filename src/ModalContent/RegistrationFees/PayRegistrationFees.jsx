import { useState } from "react";
import { usePayRegistrationFee } from "../../hooks/feePayment/usePayRegistrationFee";
import  { SingleSpinner } from "../../components/Spinners/Spinners";
import { Icon } from "@iconify/react";
import { InputGroup } from "../../components/FormComponents/InputComponents";
import { useSelector } from "react-redux";
import { numberSchema } from "../../ComponentConfig/YupValidationSchema";
import CustomDropdown from "../../components/Dropdowns/Dropdowns";
import { paymentMethods } from "../../data/data";
function PayRegistrationFees({ handleClose, rowData }) {
  const {id:registrationFeeId, amount} = rowData;
    const currencyState = useSelector((state) => state.auth.user);
    const userCurrencySymbol =
      currencyState?.schoolDetails?.school?.country?.currency || "";
  const [formData, setFormData] = useState({
    amount: "",
    payment_method: "",
    registration_fee_id: registrationFeeId,
  });
  const [errors, setErrors] = useState({
    payment_method: "",
  });
  const [isValid, setValid] = useState({
    amount: "",
  })
  const { mutate:handlePayment, isPending } = usePayRegistrationFee(handleClose);
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const handleFieldValid = (field, value) =>{
    setValid((prev) => ({ ...prev, [field]:value }))
  }
  const handleFieldError = (field,value) => {
    setErrors((prev) => ({ ...prev, [field]:value }) )
  }
  const handleSubmit = async () => {
     handlePayment(formData);
  };
  return (
    <>
      <span>
        <div>
          <div className="block">
          <div className="d-flex flex-row align-items-center justify-content-between mb-3">
            <span className="m-0">Make Registration Fee Payment</span>
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
            <label htmlFor="amount" className="font-size-sm">Amount</label>
            <InputGroup 
              onChange={(value) => handleInputChange('amount', value)}
              InputGroupText={userCurrencySymbol}
              onValidationChange={(value) => handleFieldValid('amount', value)}
              validationSchema={numberSchema({ min:amount, max:amount })}
              placeholder={"Enter Amount Paid"}
            />
          </div>
          <div>
            <label htmlFor="paymentMethod" className="font-size-sm">Payment Method</label>
            <CustomDropdown
          data={paymentMethods}
          valueKey={["value"]}
          displayKey={["label"]}
          direction="down"
          onError={(value) => handleFieldError("payment_method", value)}
          onSelect={(value) => handleInputChange("payment_method", value.value)}
          error={errors.payment_method}
          errorMessage="Payment Method Required"
          placeholder="Select Payment Method"
        />
          </div>
          <div className="mt-3 d-flex gap-2">
            <button
              className="border-none px-3 py-2 rounded-3 font-size-sm w-50 primary-background text-white w-100"
              onClick={() => {
                handleSubmit();
              }}
            >
             { isPending ?  <SingleSpinner /> : "Make Payment"}
            </button>
          </div>
        </div>
      </span>
    </>
  );
}
export default PayRegistrationFees;
