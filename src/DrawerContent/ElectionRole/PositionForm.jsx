import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { nameSchema, textareaSchema } from "../../ComponentConfig/YupValidationSchema";
import CustomDropdown from "../../components/Dropdowns/Dropdowns";
import { NumberInput, TextAreaInput, TextInput } from "../../components/FormComponents/InputComponents";
import Switch from "../../components/input/Switch";
import { useGetElectionTypes } from "../../hooks/electionType/useGetElectionTypes";

export const positionFromRole = (role) => ({
  name: role?.name ?? "",
  description: role?.description ?? "",
  election_type: role?.election_type ?? null,
  seats: role?.seats ?? 1,
  duration_academic_years: role?.office_term?.duration_academic_years ?? 1,
  allow_reelection: role?.office_term?.allow_reelection ?? false,
  maximum_terms: role?.office_term?.maximum_terms ?? "",
});

export const positionToPayload = (form) => ({
  name: form.name.trim(),
  description: form.description.trim(),
  election_type_id: form.election_type?.id,
  seats: Number(form.seats) || 1,
  office_term: {
    duration_academic_years: Number(form.duration_academic_years) || 1,
    allow_reelection: Boolean(form.allow_reelection),
    maximum_terms: form.allow_reelection && form.maximum_terms !== "" ? Number(form.maximum_terms) : null,
  },
});

function Field({ label, hint, children }) {
  return (
    <div className="d-flex flex-column gap-1">
      <label className="font-size-sm fw-medium">{label}</label>
      {hint && <span className="text-iron-400 font-size-xs" style={{ marginTop: "-0.2rem" }}>{hint}</span>}
      {children}
    </div>
  );
}

/**
 * Position details and tenure rules. `ref.current.validate()` → boolean.
 */
const PositionForm = forwardRef(function PositionForm({ value, onChange }, ref) {
  const nameRef = useRef();
  const descriptionRef = useRef();
  const typeRef = useRef();
  const [typeError, setTypeError] = useState("");
  const [validity, setValidity] = useState({});
  const { data: types, isLoading } = useGetElectionTypes();
  const set = (field, next) => onChange({ ...value, [field]: next });

  useImperativeHandle(ref, () => ({
    validate: async () => {
      const checks = await Promise.all([
        nameRef.current?.triggerValidation?.(),
        descriptionRef.current?.triggerValidation?.(),
        typeRef.current?.triggerValidation?.(),
      ]);
      return !checks.includes(false) && !Object.values(validity).includes(false);
    },
  }));

  return (
    <div className="d-flex flex-column gap-4">
      <div className="d-flex flex-column gap-3">
        <Field label="Position name">
          <TextInput
            ref={nameRef}
            value={value.name}
            placeholder="e.g. President"
            onChange={(next) => set("name", next)}
            onValidationChange={(ok) => setValidity((prev) => ({ ...prev, name: ok }))}
            validationSchema={nameSchema({ required: true, messages: { required: "Position name required" } })}
          />
        </Field>
        <Field label="Election type">
          <CustomDropdown
            ref={typeRef}
            data={types?.data ?? []}
            isLoading={isLoading}
            displayKey={["election_title"]}
            valueKey={["id"]}
            placeholder="Select election type"
            value={value.election_type}
            onSelect={(next) => set("election_type", next)}
            error={typeError}
            errorMessage="Election type required"
            onError={setTypeError}
            dropdownWidth="100%"
          />
        </Field>
        <Field label="Seats" hint="How many people hold this position at the same time (e.g. 2 senators).">
          <NumberInput value={value.seats} onChange={(next) => set("seats", next)} onValidationChange={() => {}} />
        </Field>
        <Field label="Description">
          <TextAreaInput
            ref={descriptionRef}
            value={value.description}
            rows={3}
            placeholder="Responsibilities of this position"
            onChange={(next) => set("description", next)}
            onValidationChange={(ok) => setValidity((prev) => ({ ...prev, description: ok }))}
            validationSchema={textareaSchema({ required: true, messages: { required: "Description required" } })}
          />
        </Field>
      </div>

      <div className="d-flex flex-column gap-3">
        <span className="text-iron-500 font-size-xs fw-semibold text-uppercase" style={{ letterSpacing: "0.04em" }}>
          Office term
        </span>
        <Field label="Tenure length (academic years)" hint="Tenure ends with the holder's real academic-year end date.">
          <NumberInput
            value={value.duration_academic_years}
            onChange={(next) => set("duration_academic_years", next)}
            onValidationChange={() => {}}
          />
        </Field>
        <div className="d-flex flex-row align-items-center justify-content-between gap-3 border rounded-3 p-2">
          <div className="d-flex flex-column">
            <span className="font-size-sm fw-medium">Allow re-election</span>
            <span className="text-iron-400 font-size-xs">Former holders may stand for this position again.</span>
          </div>
          <Switch checked={Boolean(value.allow_reelection)} onChange={(checked) => set("allow_reelection", checked)} aria-label="Allow re-election" />
        </div>
        {value.allow_reelection && (
          <Field label="Maximum terms" hint="Leave empty for no limit.">
            <NumberInput value={value.maximum_terms} optional onChange={(next) => set("maximum_terms", next)} onValidationChange={() => {}} />
          </Field>
        )}
      </div>
    </div>
  );
});

export default PositionForm;
