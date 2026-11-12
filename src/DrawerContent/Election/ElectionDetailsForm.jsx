import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { dateTimeRangeValidationSchema } from "../../ComponentConfig/YupValidationSchema";
import CustomDropdown from "../../components/Dropdowns/Dropdowns";
import {
  DateTimeRangeInput,
  NumberInput,
  TextAreaInput,
  TextInput,
} from "../../components/FormComponents/InputComponents";
import Switch from "../../components/input/Switch";
import { useGetAllSystemAcademicYear } from "../../hooks/academicYear/useGetAllSystemAcademicYear";
import { useGetActiveElectionTypes } from "../../hooks/electionType/useGetActiveElectionTypes";

export const emptyElectionDetails = {
  title: "",
  description: "",
  election_type: null,
  system_academic_year: null,
  application_start: "",
  application_end: "",
  voting_start: "",
  voting_end: "",
  max_applications_per_participant: 1,
  allow_candidate_self_vote: true,
};

// Election (API) → form values.
export const detailsFromElection = (election) => ({
  title: election?.title ?? "",
  description: election?.description ?? "",
  election_type: election?.election_type ?? null,
  system_academic_year: election?.system_academic_year ?? null,
  application_start: toInputDateTime(election?.application_start),
  application_end: toInputDateTime(election?.application_end),
  voting_start: toInputDateTime(election?.voting_start),
  voting_end: toInputDateTime(election?.voting_end),
  max_applications_per_participant: election?.max_applications_per_participant ?? 1,
  allow_candidate_self_vote: election?.allow_candidate_self_vote ?? true,
});

// Form values → API payload.
export const detailsToPayload = (details) => ({
  title: details.title?.trim() || null,
  description: details.description?.trim() || null,
  election_type_id: details.election_type?.id,
  system_academic_year_id: details.system_academic_year?.id,
  application_start: details.application_start,
  application_end: details.application_end,
  voting_start: details.voting_start,
  voting_end: details.voting_end,
  max_applications_per_participant: Number(details.max_applications_per_participant) || 1,
  allow_candidate_self_vote: Boolean(details.allow_candidate_self_vote),
});

function toInputDateTime(value) {
  if (!value) return "";
  // "2026-10-01T08:00:00.000000Z" / "2026-10-01 08:00:00" → "2026-10-01 08:00"
  const date = new Date(String(value).includes("T") ? value : String(value).replace(" ", "T"));
  if (Number.isNaN(date.getTime())) return "";
  const pad = (n) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

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
 * Election details (type, academic year, schedule and settings).
 * `ref.current.validate()` resolves to a list of problems (empty when valid).
 *
 *   <ElectionDetailsForm ref={formRef} value={details} onChange={setDetails} />
 *   <ElectionDetailsForm ... lockStructure />   // type & year read-only (edit)
 */
const ElectionDetailsForm = forwardRef(function ElectionDetailsForm(
  { value, onChange, lockStructure = false, scheduleFutureOnly = true },
  ref,
) {
  const applicationRef = useRef();
  const votingRef = useRef();
  const typeRef = useRef();
  const yearRef = useRef();
  const [dropdownErrors, setDropdownErrors] = useState({ type: "", year: "" });
  const [dateValidity, setDateValidity] = useState({});
  const { data: years, isLoading: yearsLoading } = useGetAllSystemAcademicYear();
  const { data: types, isLoading: typesLoading } = useGetActiveElectionTypes();

  const set = (field, next) => onChange({ ...value, [field]: next });

  useImperativeHandle(ref, () => ({
    validate: async () => {
      const problems = [];
      const checks = await Promise.all([
        applicationRef.current?.preValidateStart?.(),
        applicationRef.current?.preValidateEnd?.(),
        votingRef.current?.preValidateStart?.(),
        votingRef.current?.preValidateEnd?.(),
        lockStructure ? true : typeRef.current?.triggerValidation?.(),
        lockStructure ? true : yearRef.current?.triggerValidation?.(),
      ]);
      if (checks.some((ok) => ok === false) || Object.values(dateValidity).some((ok) => ok === false)) {
        problems.push("Some fields are missing or invalid. Check the highlighted fields.");
      }
      if (value.application_end && value.voting_start && value.application_end > value.voting_start) {
        problems.push("Voting cannot start before the application period ends.");
      }
      const year = value.system_academic_year;
      if (year?.year_start && value.application_start && Number(value.application_start.slice(0, 4)) < Number(year.year_start)) {
        problems.push(`The schedule must fall within the ${year.name} academic year.`);
      }
      if (year?.year_end && value.voting_end && Number(value.voting_end.slice(0, 4)) > Number(year.year_end)) {
        problems.push(`Voting must end within the ${year.name} academic year.`);
      }
      return problems;
    },
  }));

  const rangeSchema = (start, end) =>
    dateTimeRangeValidationSchema({
      required: true,
      futureOrNow: scheduleFutureOnly,
      messages: { startRequired: start, endRequired: end },
    });

  return (
    <div className="d-flex flex-column gap-4">
      <div className="d-flex flex-column gap-3">
        <span className="text-iron-500 font-size-xs fw-semibold text-uppercase" style={{ letterSpacing: "0.04em" }}>
          Election
        </span>
        <Field label="Election type" hint="Positions on the ballot come from the election type.">
          {lockStructure ? (
            <div className="border rounded-3 px-2 py-2 bg-iron-50 font-size-sm">{value.election_type?.election_title ?? "—"}</div>
          ) : (
            <CustomDropdown
              ref={typeRef}
              data={types?.data || []}
              isLoading={typesLoading}
              displayKey={["election_title"]}
              valueKey={["id"]}
              placeholder="Select election type"
              value={value.election_type}
              onSelect={(next) => set("election_type", next)}
              error={dropdownErrors.type}
              errorMessage="Election type required"
              onError={(message) => setDropdownErrors((prev) => ({ ...prev, type: message }))}
              dropdownWidth="100%"
            />
          )}
        </Field>
        <Field label="Academic year" hint="Office terms begin in this academic year.">
          {lockStructure ? (
            <div className="border rounded-3 px-2 py-2 bg-iron-50 font-size-sm">{value.system_academic_year?.name ?? "—"}</div>
          ) : (
            <CustomDropdown
              ref={yearRef}
              data={years?.data || []}
              isLoading={yearsLoading}
              displayKey={["name"]}
              valueKey={["id"]}
              placeholder="Select academic year"
              value={value.system_academic_year}
              onSelect={(next) => set("system_academic_year", next)}
              error={dropdownErrors.year}
              errorMessage="Academic year required"
              onError={(message) => setDropdownErrors((prev) => ({ ...prev, year: message }))}
              dropdownWidth="100%"
            />
          )}
        </Field>
        <Field label="Title" hint="Optional. Defaults to the election type and academic year.">
          <TextInput
            value={value.title}
            placeholder="e.g. Student Union Government 2026–2027"
            onChange={(next) => set("title", next)}
            onValidationChange={() => {}}
          />
        </Field>
        <Field label="Description">
          <TextAreaInput
            value={value.description}
            optional
            rows={3}
            placeholder="What this election is for and what voters should know."
            onChange={(next) => set("description", next)}
            onValidationChange={() => {}}
          />
        </Field>
      </div>

      <div className="d-flex flex-column gap-3">
        <span className="text-iron-500 font-size-xs fw-semibold text-uppercase" style={{ letterSpacing: "0.04em" }}>
          Schedule
        </span>
        <DateTimeRangeInput
          ref={applicationRef}
          startValue={value.application_start}
          endValue={value.application_end}
          onStartDateTimeChange={(next) => set("application_start", next)}
          onEndDateTimeChange={(next) => set("application_end", next)}
          onStartDateTimeValidationChange={(ok) => setDateValidity((prev) => ({ ...prev, application_start: ok }))}
          onEndDateTimeValidationChange={(ok) => setDateValidity((prev) => ({ ...prev, application_end: ok }))}
          validationSchema={rangeSchema("Application start required", "Application end required")}
          startDateLabel="Applications open"
          endDateLabel="Applications close"
        />
        <DateTimeRangeInput
          ref={votingRef}
          startValue={value.voting_start}
          endValue={value.voting_end}
          onStartDateTimeChange={(next) => set("voting_start", next)}
          onEndDateTimeChange={(next) => set("voting_end", next)}
          onStartDateTimeValidationChange={(ok) => setDateValidity((prev) => ({ ...prev, voting_start: ok }))}
          onEndDateTimeValidationChange={(ok) => setDateValidity((prev) => ({ ...prev, voting_end: ok }))}
          validationSchema={rangeSchema("Voting start required", "Voting end required")}
          startDateLabel="Voting opens"
          endDateLabel="Voting closes"
        />
      </div>

      <div className="d-flex flex-column gap-3">
        <span className="text-iron-500 font-size-xs fw-semibold text-uppercase" style={{ letterSpacing: "0.04em" }}>
          Settings
        </span>
        <Field label="Positions per applicant" hint="How many positions one person may apply for in this election.">
          <NumberInput
            value={value.max_applications_per_participant}
            onChange={(next) => set("max_applications_per_participant", next)}
            onValidationChange={() => {}}
          />
        </Field>
        <div className="d-flex flex-row align-items-center justify-content-between gap-3 border rounded-3 p-2">
          <div className="d-flex flex-column">
            <span className="font-size-sm fw-medium">Candidates can vote for themselves</span>
            <span className="text-iron-400 font-size-xs">Turn off to stop candidates choosing themselves on the ballot.</span>
          </div>
          <Switch
            checked={Boolean(value.allow_candidate_self_vote)}
            onChange={(checked) => set("allow_candidate_self_vote", checked)}
            aria-label="Candidates can vote for themselves"
          />
        </div>
      </div>
    </div>
  );
});

export default ElectionDetailsForm;
