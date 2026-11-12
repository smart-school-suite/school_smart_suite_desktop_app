import { Info } from "lucide-react";
import { useRef, useState } from "react";
import HorizontalDashedLine from "../../components/DashedLine/HorizonetalDashedLine";
import CustomDropdown from "../../components/Dropdowns/Dropdowns";
import PersonPicker from "../../components/Election/PersonPicker";
import FormErrorBanner from "../../components/errors/FormErrorBanner";
import { TextAreaInput } from "../../components/FormComponents/InputComponents";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { useGetAllSystemAcademicYear } from "../../hooks/academicYear/useGetAllSystemAcademicYear";
import { useGetElectionRoles } from "../../hooks/electionRole/useGetElectionRoles";
import { useAppointOfficeHolder } from "../../hooks/electionOffice/useAppointOfficeHolder";
import { useFormError } from "../../hooks/form/useFormError";

const termText = (position) => {
  const term = position?.office_term;
  const years = term?.duration_academic_years ?? 1;
  return `${years} academic year${years > 1 ? "s" : ""}${term?.allow_reelection ? `, up to ${term.maximum_terms ?? "unlimited"} terms` : ", no re-election"}`;
};

/**
 * Appoint someone to a position without an election. Tenure years are
 * resolved from the school academic years (the holder's specialty for students).
 * drawerData: { position? } to preselect a position.
 */
export default function AppointOfficeHolder({ handleClose, drawerData }) {
  const [position, setPosition] = useState(drawerData?.position ?? null);
  const [holder, setHolder] = useState({ type: "student", person: null });
  const [year, setYear] = useState(null);
  const [remarks, setRemarks] = useState("");
  const [errors, setErrors] = useState({});
  const positionRef = useRef();
  const holderRef = useRef();
  const yearRef = useRef();
  const { data: roles, isLoading: rolesLoading } = useGetElectionRoles();
  const { data: years, isLoading: yearsLoading } = useGetAllSystemAcademicYear();
  const { mutate: appoint, isPending } = useAppointOfficeHolder(handleClose);
  const { formError, errorBannerRef, setClientError, handleServerError, clearFormError } =
    useFormError("Failed To Appoint Office Holder");
  const positions = (roles?.data ?? []).filter((role) => role.status === "active");

  const handleSubmit = () => {
    clearFormError();
    const valid = [positionRef, holderRef, yearRef].map((ref) => ref.current?.triggerValidation?.());
    if (valid.includes(false)) {
      setClientError("Missing details", "Choose the position, the person and the academic year their tenure starts.");
      return;
    }
    appoint(
      {
        election_role_id: position.id,
        holder_type: holder.type,
        holder_id: holder.person.id,
        system_academic_year_id: year.id,
        remarks: remarks || null,
      },
      { onError: handleServerError },
    );
  };

  return (
    <>
      <div className="drawer-content px-2 pt-2 pb-4 d-flex flex-column gap-3">
        <FormErrorBanner ref={errorBannerRef} error={formError} onDismiss={clearFormError} />
        <div className="d-flex flex-column gap-1">
          <label className="font-size-sm fw-medium">Position</label>
          <CustomDropdown
            ref={positionRef}
            data={positions}
            isLoading={rolesLoading}
            displayKey={["name"]}
            valueKey={["id"]}
            placeholder="Select position"
            value={position}
            onSelect={setPosition}
            error={errors.position}
            errorMessage="Position required"
            onError={(message) => setErrors((prev) => ({ ...prev, position: message }))}
            dropdownWidth="100%"
          />
          {position && <span className="text-iron-500 font-size-xs">Tenure: {termText(position)} · {position.seats ?? 1} seat(s)</span>}
        </div>
        <PersonPicker
          ref={holderRef}
          label="Office holder"
          value={holder}
          onChange={setHolder}
          error={errors.holder}
          onError={(message) => setErrors((prev) => ({ ...prev, holder: message }))}
        />
        <div className="d-flex flex-column gap-1">
          <label className="font-size-sm fw-medium">Tenure starts in</label>
          <CustomDropdown
            ref={yearRef}
            data={years?.data ?? []}
            isLoading={yearsLoading}
            displayKey={["name"]}
            valueKey={["id"]}
            placeholder="Select academic year"
            value={year}
            onSelect={setYear}
            error={errors.year}
            errorMessage="Academic year required"
            onError={(message) => setErrors((prev) => ({ ...prev, year: message }))}
            dropdownWidth="100%"
          />
        </div>
        <div className="d-flex flex-row gap-2 bg-primary-50 text-primary-800 rounded-3 p-2 font-size-xs" style={{ lineHeight: 1.55 }}>
          <Info size={14} className="flex-shrink-0 mt-1" />
          <span>
            Tenure dates follow the real school academic years: a student's specialty year, or the latest-ending year for teachers and administrators.
            Every academic year of the tenure must already exist.
          </span>
        </div>
        <div className="d-flex flex-column gap-1">
          <label className="font-size-sm fw-medium">Remarks</label>
          <TextAreaInput value={remarks} onChange={setRemarks} onValidationChange={() => {}} optional rows={3} placeholder="Why this appointment was made" />
        </div>
      </div>
      <div className="drawer-footer font-size-sm">
        <div className="d-flex flex-column w-100">
          <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.5} />
          <div className="d-flex flex-row align-items-center justify-content-between p-2">
            <button type="button" className="border-none bg-none" onClick={() => handleClose?.()}>Cancel</button>
            <button type="button" className="border-none rounded-3 primary-background text-white font-size-sm px-3 py-2" onClick={handleSubmit} disabled={isPending}>
              {isPending ? <SingleSpinner /> : "Appoint"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
