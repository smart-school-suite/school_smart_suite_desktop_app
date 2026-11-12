import { ArrowDown } from "lucide-react";
import { useRef, useState } from "react";
import HorizontalDashedLine from "../../components/DashedLine/HorizonetalDashedLine";
import ParticipantIdentity from "../../components/Election/ParticipantIdentity";
import PersonPicker from "../../components/Election/PersonPicker";
import FormErrorBanner from "../../components/errors/FormErrorBanner";
import { TextAreaInput } from "../../components/FormComponents/InputComponents";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { useReplaceOfficeHolder } from "../../hooks/electionOffice/useReplaceOfficeHolder";
import { useFormError } from "../../hooks/form/useFormError";
import { formatElectionDate } from "../../utils/election/electionDisplay";

/**
 * End a holder's tenure today and hand the remaining academic years to a replacement.
 * drawerData: { holder } (an office holder from the office endpoints)
 */
export default function ReplaceOfficeHolder({ handleClose, drawerData }) {
  const current = drawerData?.holder;
  const [replacement, setReplacement] = useState({ type: current?.holder_type ?? "student", person: null });
  const [reason, setReason] = useState("");
  const [remarks, setRemarks] = useState("");
  const [pickerError, setPickerError] = useState("");
  const pickerRef = useRef();
  const { mutate: replace, isPending } = useReplaceOfficeHolder(handleClose);
  const { formError, errorBannerRef, setClientError, handleServerError, clearFormError } =
    useFormError("Failed To Replace Office Holder");

  const remaining = (current?.tenure_years ?? []).filter(
    (year) => !year.school_academic_year?.end_date || new Date(year.school_academic_year.end_date) >= new Date(new Date().toDateString()),
  );

  const handleSubmit = () => {
    clearFormError();
    if (pickerRef.current?.triggerValidation?.() === false) {
      setClientError("Choose the replacement", "Select who takes over the remaining tenure.");
      return;
    }
    if (!reason.trim()) {
      setClientError("Add a reason", "Explain why the current holder is being replaced. It is kept in the office history.");
      return;
    }
    replace(
      {
        holderId: current.id,
        data: {
          holder_type: replacement.type,
          holder_id: replacement.person.id,
          termination_remarks: reason,
          remarks: remarks || null,
        },
      },
      { onError: handleServerError },
    );
  };

  return (
    <>
      <div className="drawer-content px-2 pt-2 pb-4 d-flex flex-column gap-3">
        <FormErrorBanner ref={errorBannerRef} error={formError} onDismiss={clearFormError} />
        <div className="d-flex flex-column gap-2 bg-iron-50 rounded-3 p-2">
          <span className="text-iron-500 font-size-xs">Current holder · {current?.position?.name}</span>
          <ParticipantIdentity person={current?.holder} name={current?.name} type={current?.holder_type} />
          <span className="text-iron-500 font-size-xs">
            In office {formatElectionDate(current?.started_at)} → {formatElectionDate(current?.expected_end_at)}
          </span>
        </div>
        <div className="d-flex justify-content-center text-iron-400"><ArrowDown size={18} /></div>
        <PersonPicker ref={pickerRef} label="Replacement" value={replacement} onChange={setReplacement} error={pickerError} onError={setPickerError} />
        <div className="d-flex flex-column gap-1 font-size-xs text-iron-600">
          <span className="fw-semibold">Remaining tenure</span>
          {remaining.length === 0 ? (
            <span className="text-red-600">No academic years remain in this tenure.</span>
          ) : (
            remaining.map((year) => (
              <span key={year.term_year_number}>
                Year {year.term_year_number} · {year.system_academic_year?.name} (re-resolved to the replacement's own academic year dates)
              </span>
            ))
          )}
        </div>
        <div className="d-flex flex-column gap-1">
          <label className="font-size-sm fw-medium">Reason for replacement</label>
          <TextAreaInput value={reason} onChange={setReason} onValidationChange={() => {}} rows={3} placeholder="e.g. Graduated early, resigned, transferred" />
        </div>
        <div className="d-flex flex-column gap-1">
          <label className="font-size-sm fw-medium">Notes for the replacement</label>
          <TextAreaInput value={remarks} onChange={setRemarks} onValidationChange={() => {}} optional rows={2} placeholder="Optional" />
        </div>
      </div>
      <div className="drawer-footer font-size-sm">
        <div className="d-flex flex-column w-100">
          <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.5} />
          <div className="d-flex flex-row align-items-center justify-content-between p-2">
            <button type="button" className="border-none bg-none" onClick={() => handleClose?.()}>Cancel</button>
            <button type="button" className="border-none rounded-3 primary-background text-white font-size-sm px-3 py-2" onClick={handleSubmit} disabled={isPending || remaining.length === 0}>
              {isPending ? <SingleSpinner /> : "Replace Holder"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
