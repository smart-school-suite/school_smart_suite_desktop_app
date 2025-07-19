import { useState } from "react";
import { usePayRegistrationFee } from "../../hooks/feePayment/usePayRegistrationFee";
import  { SingleSpinner } from "../../components/Spinners/Spinners";
import { Icon } from "@iconify/react";
function PayRegistrationFees({ handleClose, rowData }) {
  const registrationFeeId = rowData.id;
  const [formData, setFormData] = useState({
    amount: "",
    payment_method: "",
    registration_fee_id: registrationFeeId,
  });
  const { mutate:handlePayment, isPending } = usePayRegistrationFee(handleClose);
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const handleSubmit = async () => {
     handlePayment(formData);
  };
  return (
    <>
      <span>
        <div>
          <div className="block">
          <div className="d-flex flex-row align-items-center justify-content-between mb-3">
            <h5 className="m-0">Make Registration Fee Payment</h5>
            <span
              className="m-0"
              onClick={() => {
                handleClose();
              }}
            >
              <Icon icon="charm:cross" width="22" height="22" />
            </span>
          </div>
          <span className="gainsboro-color font-size-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem harum
            nesciunt sunt
          </span>
        </div>
          <div className="my-2">
            <span>Amount</span>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Amount"
              name="amount"
              value={formData.amount}
              onChange={(e) => handleInputChange("amount", e.target.value)}
            />
          </div>
          <div className="my-2">
            <span>Payment Method</span>
            <select
              className="form-select"
              onChange={(e) =>
                handleInputChange("payment_method", e.target.value)
              }
              name="payment_method"
              value={formData.payment_method}
            >
              <option selected>Select Payment Method</option>
              <option value="cash">Cash Payment</option>
              <option value="cheque">cheque</option>
              <option value="credit_card">Credit card</option>
              <option value="debit_card">Debit card</option>
              <option value="bank_transfer">Bank transfer</option>
            </select>
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
