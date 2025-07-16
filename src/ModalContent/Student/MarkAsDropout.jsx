import { useMarkStudentAsDropOutMutation } from "../../Slices/Asynslices/postSlice";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { useState } from "react";
function MarkAsDropout({ handleClose, row_id: studentId }) {
  const [markStudentAsDropOut] = useMarkStudentAsDropOutMutation();
  const [formData, setFormData] = useState({
    reason: ""});
    const handleInputChange = (field, value) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    };
  const [isMarkingAsDropOut, setIsMarkingAsDropOut] = useState(false);
  const handleMarkStudentAsDropOut = async () => {
    setIsMarkingAsDropOut(true);
    try {
      await markStudentAsDropOut({studentId, formData}).unwrap();
      handleClose();
      setIsMarkingAsDropOut(false);
      toast.custom(
        <ToastSuccess
          title={"Account Marked as Dropout ✅"}
          description={"Account Has Been Successfully Marked as Dropout"}
        />
      );
    } catch (e) {
      setIsMarkingAsDropOut(false);
      toast.custom(
        <ToastDanger
          title={"Account Marking Failed ❌"}
          description={
            "❌ Something went wrong! The Account marking failed due to an error. Please try again later."
          }
        />
      );
    }
  };
  const dropoutReasons = [
    "Financial difficulties",
    "Lack of interest in the curriculum",
    "Poor academic performance",
    "Health issues (physical or mental)",
    "Family responsibilities",
    "Need to work for income",
    "Feeling unsupported or isolated",
    "Bullying or peer pressure",
    "Inadequate academic preparation",
    "Moving to a different location",
    "Lack of engagement with teachers",
    "Dissatisfaction with school environment",
    "Disciplinary issues or expulsion",
    "Pregnancy or parenting responsibilities",
    "Difficulty balancing school and personal life",
    "Cultural or language barriers",
    "Educational disengagement",
    "Loss of motivation or goals",
    "Inaccessible transportation",
    "Perception that school is not relevant"
];
  return (
    <>
      <div className="w-100">
        <h4 className="fw-semibold">Are you Absolutely sure ?</h4>
        <p className="my-3" style={{ fontSize: "0.85rem" }}>
          <span>{studentId}</span>
          This action cannot be undone. This will Permanently delete This
          account and remove this account data from our servers
        </p>
        <div className="my-1">
          <label htmlFor="reason">Reason For Dropout</label>
          <select 
            name="reason" 
            className="form-select"
            onChange={(e) => handleInputChange("reason", e.target.value)} 
            value={formData.reason}
            >
            {
              dropoutReasons.map((reason, index) => {
                return (
                  <option key={index} value={reason}>
                    {reason}
                  </option>
                );
              })
            }
          </select>
        </div>
        <div className="mt-4">
          <div className="d-flex flex-row align-items-center justify-content-end gap-2 w-100">
            <button
              className="border-none px-3 py-2 color-primary rounded-3 font-size-sm"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              className="border-none px-3 py-2 rounded-3 font-size-sm primary-background text-white"
              onClick={() => {
                handleMarkStudentAsDropOut();
              }}
            >
              {isMarkingAsDropOut ? <SingleSpinner /> : "Yes, Mark as Dropout"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default MarkAsDropout;
