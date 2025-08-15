import { useState } from "react";
import { usePayTuitionFee } from "../../hooks/feePayment/usePayTuitionFee";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { Icon } from "@iconify/react";
import { useSelector } from "react-redux";
import CustomDropdown from "../../components/Dropdowns/Dropdowns";
import { paymentMethods } from "../../data/data";
import { InputGroup } from "../../components/FormComponents/InputComponents";
import { numberSchema } from "../../ComponentConfig/YupValidationSchema";
function PayStudentTuitionFee({ handleClose, rowData }) {
  const { id: feeId, amount_left: amountLeft } = rowData;
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
  const handleFieldError = (field, value) => {
    setErrors((prev) => ({ ...prev, [field]: value }));
  };
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const handleFieldValid = (field, value) => {
    setIsValid((prev) => ({ ...prev, [field]: value }));
  };
  const handleSubmit = async () => {
    payTuitionFee(formData);
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
          Amount
        </label>
        <InputGroup
          onChange={(value) => handleInputChange("amount", value)}
          value={formData.amount}
          step="0.01"
          validationSchema={numberSchema({ min: 1, max: amountLeft })}
          onValidationChange={(value) => handleFieldValid("amount", value)}
          InputGroupText={userCurrencySymbol}
          placeholder={"Enter Amount Paid"}
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
          onError={(value) => handleFieldError("payment_method", value)}
          onSelect={(value) => handleInputChange("payment_method", value.value)}
          error={errors.payment_method}
          errorMessage="Payment Method Required"
          placeholder="Select Payment Method"
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
