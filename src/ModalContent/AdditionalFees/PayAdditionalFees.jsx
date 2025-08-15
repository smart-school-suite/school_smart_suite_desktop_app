import { useState } from "react";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { usePayAdditionalFee } from "../../hooks/additionalFee/usePayAdditionalFee";
import { Icon } from "@iconify/react";
import { InputGroup } from "../../components/FormComponents/InputComponents";
import { numberSchema } from "../../ComponentConfig/YupValidationSchema";
import { useSelector } from "react-redux";
import CustomDropdown from "../../components/Dropdowns/Dropdowns";
import { paymentMethods } from "../../data/data";
function PayAdditionalFees({ rowData, handleClose }) {
  const {id:additionalFeeId, amount} = rowData;
      const currencyState = useSelector((state) => state.auth.user);
      const userCurrencySymbol =
        currencyState?.schoolDetails?.school?.country?.currency || "";
  const [formData, setFormData] = useState({
    amount: "",
    payment_method: "",
    fee_id: additionalFeeId,
  });
  const [errors, setErrors] = useState({
    payment_method: "",
  });
  const [isValid, setIsValid] = useState({
     amount: "",
  })
  const { mutate: payAdditionalFee, isPending } = usePayAdditionalFee(
    handleClose,
    additionalFeeId
  );
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const handleFieldValid = (field, value) => {
     setIsValid((prev) => ({...prev, [field]:value }))
  }
  const handleFieldError = (field, value) => {
    setErrors((prev) => ({ ...prev, [field]:value }))
  }
  const handleSubmit = async () => {
    payAdditionalFee(formData);
  };
  return (
    <span>
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
            <label htmlFor="amount" className="font-size-sm">Amount</label>
             <InputGroup 
                onChange={(value) => handleInputChange('amount', value)}
                onValidationChange={(value) => handleFieldValid('amount', value)}
                value={formData.amount}
                validationSchema={numberSchema({ min:amount, max:amount })}
                placeholder={"Enter Amount Paid"}
                InputGroupText={userCurrencySymbol}
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
    </span>
  );
}
export default PayAdditionalFees;
