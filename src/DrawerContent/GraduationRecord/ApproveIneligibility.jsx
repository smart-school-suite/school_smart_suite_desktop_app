import { AlertCircle, ArrowRight, Dot, Info } from "lucide-react";
import { useState } from "react";
import { textareaSchema } from "../../ComponentConfig/YupValidationSchema";
import HorizontalDashedLine from "../../components/DashedLine/HorizonetalDashedLine";
import { TextAreaInput } from "../../components/FormComponents/InputComponents";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { useApproveInEligility } from "../../hooks/graduationRecord/useApproveInEligibility";

function ApproveIneligibility({ drawerData = {}, handleClose = () => {} }) {
  const { mutate: approveIneligibility, isPending = false } =
    useApproveInEligility(handleClose) || {};
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    admin_notes: "",
  });
  const [isValid, setIsValid] = useState({
    admin_notes: null,
  });

  const handleStateChange = (field, value, stateFn) => {
    if (typeof stateFn === "function") {
      stateFn((prev) => ({ ...prev, [field]: value }));
    }
    if (error !== null) {
      setError(null);
    }
  };

  const handleApproveIneligibility = async () => {
    try {
      if (!drawerData?.id) {
        setError("Invalid record selected. Unable to process ineligibility approval.");
        return;
      }

      if (formData?.admin_notes?.trim() && isValid.admin_notes === false) {
        setError("Please check your administrative notes and resolve any formatting errors.");
        return;
      }

      if (typeof approveIneligibility === "function") {
        const payload = {
          admin_notes: formData?.admin_notes?.trim() || "",
          record_id: drawerData.id,
        };
        approveIneligibility({payload});
      }
    } catch {
      setError("An unexpected error occurred while processing the ineligibility approval. Please try again.");
    }
  };

  return (
    <>
      <div className="drawer-content pt-3 ps-2 font-size-sm">
        <div className="d-flex flex-column gap-3">
          {error && (
            <div className="bg-red-100 p-3 rounded-3 text-red-700 mb-2 d-flex align-items-center gap-2 border border-red-200">
              <AlertCircle size={18} className="flex-shrink-0" />
              <p className="m-0 font-size-sm fw-medium">{error}</p>
            </div>
          )}

          <div className="d-flex flex-column gap-1">
            <span className="fw-medium">Student</span>
            <div className="d-flex flex-row align-items-center gap-2">
              <div
                style={{
                  width: "2.5rem",
                  height: "2.5rem",
                  display: "grid",
                  placeItems: "center",
                  flexShrink: 0,
                }}
                className="rounded-circle"
              >
                <img
                  src={drawerData?.avatar || "/images/user.png"}
                  alt={drawerData?.s_full_name || "Student profile"}
                  className="object-fit-cover w-100 h-100 rounded-circle"
                  onError={(e) => {
                    e.currentTarget.src = "/images/user.png";
                  }}
                />
              </div>
              <div className="d-flex flex-column">
                <span className="fw-medium">
                  {drawerData?.s_full_name || "Unknown Student"}
                </span>
                <div className="d-flex flex-row align-items-center fw-light text-iron-500">
                  <span>@{drawerData?.s_username || "N/A"}</span>
                  <Dot size={16} />
                  <span>{drawerData?.s_first_name || "N/A"}</span>
                  <Dot size={16} />
                  <span>{drawerData?.s_last_name || "N/A"}</span>
                </div>
              </div>
            </div>
          </div>

          <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.3} />

          <div className="d-flex flex-column gap-1">
            <span className="fw-medium">Ineligibility Decision</span>
            <div className="card border-none border p-2 rounded-3">
              <div className="d-flex flex-column gap-4">
                <div className="d-flex flex-row align-items-center justify-content-between">
                  <div className="d-flex flex-column gap-1">
                    <span className="text-iron-500 fw-light">
                      Academic Status
                    </span>
                    <div className="d-flex flex-column">
                      <span className="fw-medium">
                        {drawerData?.specialty_name || drawerData?.s_specialty || "N/A"}
                      </span>
                      <span className="text-iron-500 fw-light">
                        {drawerData?.level_name || "Current Level"}
                        {drawerData?.level_number
                          ? ` (${drawerData.level_number})`
                          : ""}
                      </span>
                    </div>
                  </div>
                  <ArrowRight size={16} strokeWidth={1.5} />
                  <div className="d-flex flex-column gap-1">
                    <span className="text-iron-500 fw-light">Graduation Status</span>
                    <div className="d-flex flex-column align-items-start">
                      <span className="fw-medium text-red-600">
                        Ineligible for Graduation
                      </span>
                      <span className="text-iron-500 fw-light">
                        {drawerData?.academic_year || "Current Session"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="d-flex flex-row align-items-center gap-1 text-iron-500">
                  <Info size={16} strokeWidth={1.5} />
                  <span className="fw-light">
                    This approval confirms graduation ineligibility for the selected student.
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex flex-column gap-1">
            <span className="fw-medium">Administrative Notes (Optional)</span>
            <TextAreaInput
              onChange={(value) =>
                handleStateChange("admin_notes", value, setFormData)
              }
              onValidationChange={(value) =>
                handleStateChange("admin_notes", value, setIsValid)
              }
              value={formData?.admin_notes || ""}
              placeholder={
                "Add a reason or any additional context for the ineligibility approval"
              }
              validationSchema={textareaSchema?.({
                required: false,
              })}
              optional={true}
            />
          </div>
        </div>
      </div>

      <div className="drawer-footer font-size-sm">
        <div className="d-flex flex-column w-100">
          <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.5} />
          <div className="d-flex flex-row align-items-center justify-content-between py-2 px-2">
            <button
              type="button"
              className="border-none bg-none cursor-pointer"
              onClick={() => handleClose?.()}
              disabled={isPending}
            >
              Close
            </button>
            <button
              type="button"
              disabled={isPending}
              className="border-none rounded-3 bg-red-600 text-white font-size-sm px-3 py-2 cursor-pointer"
              onClick={handleApproveIneligibility}
            >
              {isPending ? <SingleSpinner /> : "Approve Ineligibility"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ApproveIneligibility;