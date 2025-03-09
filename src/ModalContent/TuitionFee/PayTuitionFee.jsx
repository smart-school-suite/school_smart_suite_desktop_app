function PayStudentFees({ handleClose, row_id }) {
    const [formData, setFormData] = useState({
       student_id:row_id,
       fee_name:"",
       amount:"",
    })
    const [addFeePaymentTransaction] = useAddFeePaymentTransactionMutation();
    const handleInputChange = (field, value) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    };
    const handleSubmit = async () => {
      try {
        await addFeePaymentTransaction(formData).unwrap();
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
              nesciunt sunt {row_id}
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
        <div className="my-1">
          <span>Fee Type</span>
          <select name="fee_name" id="" className="form-select"
          value={formData.fee_name}
            onChange={(e) => handleInputChange("fee_name", e.target.value)}
          >
             <option value="">select fee type</option>
            <option value="Registration Fee">Registration Fee</option>
            <option value="School Fees">School Fees</option>
          </select>
        </div>
        <div className="my-1">
          <span>Message</span>
          <textarea name="" id="" className="form-control">
          </textarea>
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