import { useState } from "react";
import { usePayTuitionFeeMutation } from "../../Slices/Asynslices/postSlice";
import toast from "react-hot-toast";
function PayStudentTuitionFee({ handleClose, row_id:tuitionFeeId }) {
    const [formData, setFormData] = useState({
       tuition_id:tuitionFeeId,
       payment_method:"",
       amount:"",
    })
    const [payTuitionFee] = usePayTuitionFeeMutation();
    const handleInputChange = (field, value) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    };
    const handleSubmit = async () => {
      try {
        await payTuitionFee(formData).unwrap();
        toast.success("Fees Paid successfully!");
        handleClose();
      } catch (error) {
        toast.error("Failed to Pay fees. Try again.");
      }
    };
    return (
      <>
        <div className="d-flex flex-row align-items-center">
          <div className="block">
            <h5>Student Fees Payment</h5>
            <span className="gainsboro-color font-size-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem harum
              nesciunt sunt {tuitionFeeId}
            </span>
          </div>
        </div>
        <div className="my-1">
          <span>Amount</span>
          <input type="number" 
            className="form-control" step="0.01" 
            value={formData.amount}
            placeholder="Enter amount"
            name="amount"
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
        <div className="mt-4">
          <div className="d-flex flex-row align-items-center justify-content-end gap-2 w-100">
            <button
              className="border-none px-3 py-2 text-primary rounded-3 font-size-sm w-50"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button 
              className="border-none px-3 py-2 rounded-3 font-size-sm primary-background text-white w-50"
              onClick={() => {
                handleSubmit();
              }}
              >
              Continue
            </button>
          </div>
        </div>
      </>
    );
  }
  export default PayStudentTuitionFee;