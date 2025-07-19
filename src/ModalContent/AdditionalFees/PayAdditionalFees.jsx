import { useState } from "react";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { usePayAdditionalFee } from "../../hooks/additionalFee/usePayAdditionalFee";
function PayAdditionalFees({ rowData, handleClose }) {
  const additionalFeeId = rowData.id;
  const [formData, setFormData] = useState({
    amount: "",
    payment_method: "",
    fee_id: additionalFeeId,
  });
  const { mutate:payAdditionalFee, isPending } = usePayAdditionalFee(handleClose, additionalFeeId);
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const handleSubmit = async () => {
     payAdditionalFee(formData);
  };
  return (
    <span>
      <div>
        <h5>Make Additional Fee Payment</h5>
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
           {
             isPending ? <SingleSpinner /> : "Pay Additional Fee"
           }
          </button>
        </div>
      </div>
    </span>
  );
}
export default PayAdditionalFees;
