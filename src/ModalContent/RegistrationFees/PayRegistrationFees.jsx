import { usePayRegistrationFeesMutation } from "../../Slices/Asynslices/postSlice";
import { useState } from "react";
import toast from "react-hot-toast";
function PayRegistrationFees({ row_id: registrationFeeId, handleClose }) {
  const [formData, setFormData] = useState({
    amount: "",
    payment_method: "",
    registration_fee_id: registrationFeeId,
  });
  const [payRegistrationFee] = usePayRegistrationFeesMutation();
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const handleSubmit = async () => {
    try {
      await payRegistrationFee(formData).unwrap();
      toast.success("Registration Fees Paid Successfully!");
      handleClose();
    } catch (error) {
      toast.error("Failed to Pay Registration Fees. Try again.");
    }
  };
  return (
    <>
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
              <option value="cash">Cash Payment</option>
              <option value="cheque">cheque</option>
              <option value="credit_card">Credit card</option>
              <option value="debit_card">Debit card</option>
              <option value="bank_transfer">Bank transfer</option>
            </select>
          </div>
          <div className="mt-3 d-flex gap-2">
            <button
              className="border-none px-3 py-2 text-primary w-50 rounded-3 font-size-sm"
              onClick={() => {
                handleClose();
              }}
            >
              Cancel
            </button>
            <button
              className="border-none px-3 py-2 rounded-3 font-size-sm w-50 primary-background text-white"
              onClick={handleSubmit}
            >
              Create
            </button>
          </div>
        </div>
      </span>
    </>
  );
}
export default PayRegistrationFees;
