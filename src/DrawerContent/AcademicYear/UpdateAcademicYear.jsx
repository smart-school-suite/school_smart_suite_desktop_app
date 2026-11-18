import { Dot, Lock } from "lucide-react";
import { Icon } from "@iconify/react";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import HorizontalDashedLine from "../../components/DashedLine/HorizonetalDashedLine";
import CustomDropdown from "../../components/Dropdowns/Dropdowns";
import StatusPill from "../../components/Election/StatusPill";
import EmptyState from "../../components/errors/EmptyState";
import FormErrorBanner from "../../components/errors/FormErrorBanner";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { useGetSchoolAcademicYearUpdateRules } from "../../hooks/academicYear/useGetSchoolAcademicYearUpdateRules";
import { useUpdateSchoolAcademicYear } from "../../hooks/academicYear/useUpdateSchoolAcademicYear";
import { useFormError } from "../../hooks/form/useFormError";
import { boundsFor, dateError, FIELD_LABELS } from "../../utils/academicYear/updateRules";
import { formatScheduleDate } from "../../utils/feeSchedule/scheduleRules";

const STATUS = {
  upcoming: { label: "Upcoming", tone: "primary" },
  ongoing: { label: "Ongoing", tone: "success", pulse: true },
  ended: { label: "Ended", tone: "neutral" },
};

const DEPENDENTS = [
  { key: "students", label: "Students", icon: "ph:student-light" },
  { key: "tuition_fees", label: "Tuition records", icon: "solar:wallet-money-linear" },
  { key: "semesters", label: "Semesters", icon: "solar:calendar-linear" },
  { key: "exams", label: "Exams", icon: "solar:document-text-linear" },
  { key: "resit_exams", label: "Resit exams", icon: "solar:restart-linear" },
  { key: "fee_installments", label: "Fee installments", icon: "solar:bill-list-linear" },
];

function YearSummary({ rules }) {
  const status = STATUS[rules.status] ?? STATUS.upcoming;
  return (
    <div className="d-flex flex-column gap-2 font-size-sm">
      <div className="d-flex flex-row align-items-center gap-2">
        <div
          style={{ width: "2.5rem", height: "2.5rem", display: "grid", placeItems: "center" }}
          className="bg-primary-50 rounded-2 text-primary-500 flex-shrink-0"
        >
          <Icon icon="solar:calendar-mark-linear" width={20} height={20} />
        </div>
        <div className="d-flex flex-column flex-grow-1" style={{ minWidth: 0 }}>
          <div className="d-flex flex-row align-items-center gap-2">
            <span className="fw-semibold text-truncate">{rules.system_academic_year?.name ?? "Academic year"}</span>
            <StatusPill tone={status.tone} pulse={status.pulse}>{status.label}</StatusPill>
          </div>
          <div className="d-flex flex-row align-items-center text-iron-400 fw-light">
            <span className="text-truncate">{rules.specialty?.name ?? "-"}</span>
            <Dot size={16} />
            <span>{rules.specialty?.level ?? "-"}</span>
          </div>
        </div>
      </div>
      <div className="d-flex flex-row align-items-center gap-1 font-size-xs text-iron-500">
        <Icon icon="solar:calendar-linear" width={14} height={14} />
        <span className="fw-semibold text-iron-700">
          {formatScheduleDate(rules.start_date)} – {formatScheduleDate(rules.end_date)}
        </span>
      </div>
    </div>
  );
}

function SectionTitle({ children, hint }) {
  return (
    <div className="d-flex flex-column">
      <span className="fw-semibold font-size-sm">{children}</span>
      {hint && <span className="font-size-xs text-iron-500">{hint}</span>}
    </div>
  );
}

/** A locked field: its current value with a lock, instead of an input. */
function LockedValue({ value }) {
  return (
    <div className="d-flex flex-row align-items-center justify-content-between border rounded-2 bg-iron-50 px-2 py-2 font-size-sm text-iron-500">
      <span className="text-truncate">{value}</span>
      <Lock size={14} />
    </div>
  );
}

function DateField({ id, label, value, onChange, bounds, error, editable, lockedValue }) {
  const darkMode = useSelector((state) => state.theme.darkMode);
  return (
    <div className="d-flex flex-column gap-1">
      <label htmlFor={id} className="font-size-sm m-0">{label}</label>
      {editable ? (
        <>
          <input
            id={id}
            type="date"
            className={`form-control font-size-sm p-2 ${darkMode ? "dark-mode-input" : ""} ${error ? "is-invalid" : ""}`}
            value={value}
            min={bounds.min?.date}
            max={bounds.max?.date}
            onChange={(e) => onChange(e.target.value)}
          />
          {error ? (
            <span className="font-size-xs text-red-600">{error}</span>
          ) : (
            <span className="font-size-xs text-iron-500">
              {bounds.min && bounds.max
                ? `Between ${formatScheduleDate(bounds.min.date)} and ${formatScheduleDate(bounds.max.date)}.`
                : bounds.min
                  ? `On or after ${formatScheduleDate(bounds.min.date)}.`
                  : bounds.max
                    ? `On or before ${formatScheduleDate(bounds.max.date)}.`
                    : null}
            </span>
          )}
        </>
      ) : (
        <LockedValue value={lockedValue} />
      )}
    </div>
  );
}

/** Every field the user cannot change, and why. */
function LockedList({ rules }) {
  // Fields locked for the same reasons share one row.
  const groups = [];
  Object.entries(rules.fields)
    .filter(([, field]) => !field.editable)
    .forEach(([name, field]) => {
      const key = field.reasons.join("\n");
      const group = groups.find((item) => item.key === key);
      if (group) group.names.push(name);
      else groups.push({ key, names: [name], reasons: field.reasons });
    });
  if (groups.length === 0) return null;

  return (
    <div className="d-flex flex-column gap-2">
      <SectionTitle hint="These are protected because of the academic year's status or the records that depend on it.">
        What can&apos;t be changed
      </SectionTitle>
      <div className="d-flex flex-column border rounded-3">
        {groups.map((group, index) => (
          <div key={group.key} className={`d-flex flex-row align-items-start gap-2 px-3 py-2 ${index > 0 ? "border-top" : ""}`}>
            <Lock size={14} className="text-iron-400 flex-shrink-0" style={{ marginTop: "0.2rem" }} />
            <div className="d-flex flex-column font-size-sm" style={{ minWidth: 0 }}>
              <span className="fw-semibold">{group.names.map((name) => FIELD_LABELS[name] ?? name).join(", ")}</span>
              {group.reasons.map((reason) => (
                <span key={reason} className="font-size-xs text-iron-500" style={{ lineHeight: 1.5 }}>{reason}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Dependents({ counts }) {
  const shown = DEPENDENTS.filter((item) => (counts?.[item.key] ?? 0) > 0);
  if (shown.length === 0) return null;
  return (
    <div className="d-flex flex-column gap-2">
      <SectionTitle hint="Dates must keep these inside the academic year.">Linked to this academic year</SectionTitle>
      <div className="d-flex flex-row flex-wrap gap-3 font-size-xs text-iron-500">
        {shown.map((item) => (
          <div key={item.key} className="d-flex flex-row align-items-center gap-1">
            <Icon icon={item.icon} width={14} height={14} />
            <span className="fw-semibold text-iron-700">{counts[item.key]}</span>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function UpdateAcademicYearForm({ rules, handleClose }) {
  const { fields } = rules;
  const [form, setForm] = useState({
    start_date: rules.start_date ?? "",
    end_date: rules.end_date ?? "",
    system_academic_year: rules.system_academic_year ?? null,
  });
  const [touched, setTouched] = useState(false);
  const { mutate: updateYear, isPending } = useUpdateSchoolAcademicYear(handleClose, rules.id);
  const { formError, errorBannerRef, handleServerError, setClientError, clearFormError } =
    useFormError("Failed To Update Academic Year");

  const systemYearOptions = fields.system_academic_year_id.options ?? [];
  const selectedSystemYear =
    systemYearOptions.find((option) => option.id === form.system_academic_year?.id) ?? form.system_academic_year;
  const systemYearChanged = form.system_academic_year?.id !== rules.system_academic_year?.id;

  const context = { systemYear: selectedSystemYear, start: form.start_date, end: form.end_date };
  const startBounds = useMemo(() => boundsFor("start_date", fields.start_date, context), [fields, form]); // eslint-disable-line react-hooks/exhaustive-deps
  const endBounds = useMemo(() => boundsFor("end_date", fields.end_date, context), [fields, form]); // eslint-disable-line react-hooks/exhaustive-deps

  const changes = {
    ...(fields.start_date.editable && form.start_date !== rules.start_date ? { start_date: form.start_date } : {}),
    ...(fields.end_date.editable && form.end_date !== rules.end_date ? { end_date: form.end_date } : {}),
    ...(systemYearChanged ? { system_academic_year_id: form.system_academic_year?.id } : {}),
  };
  const isDirty = Object.keys(changes).length > 0;

  // A date is checked when it changes, or when a new school year moves its limits.
  const startError = fields.start_date.editable && (changes.start_date || systemYearChanged)
    ? dateError("start date", form.start_date, startBounds) : null;
  const endError = fields.end_date.editable && (changes.end_date || systemYearChanged)
    ? dateError("end date", form.end_date, endBounds) : null;
  const problems = [startError, endError].filter(Boolean);

  const set = (field, value) => {
    clearFormError();
    setTouched(true);
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSave = () => {
    if (problems.length > 0) {
      setClientError("Some dates need attention", problems);
      return;
    }
    clearFormError();
    updateYear({ updateData: changes, schoolAcademicYearId: rules.id }, { onError: handleServerError });
  };

  const canSave = isDirty && problems.length === 0 && !isPending;
  const anyEditable = fields.start_date.editable || fields.end_date.editable || fields.system_academic_year_id.editable;

  return (
    <>
      <div className="d-flex flex-column gap-3 pt-2 px-2 pb-2 flex-shrink-0">
        <YearSummary rules={rules} />
      </div>

      <div className="drawer-content px-2 pb-3 d-flex flex-column gap-4">
        <FormErrorBanner ref={errorBannerRef} error={formError} onDismiss={clearFormError} className="mb-0" />

        {rules.read_only && (
          <div className="d-flex flex-row align-items-start gap-2 rounded-3 bg-old-lace-50 text-old-lace-700 px-3 py-2 font-size-sm">
            <Lock size={15} className="flex-shrink-0" style={{ marginTop: "0.15rem" }} />
            <span>This academic year is read-only. Nothing on it can be changed.</span>
          </div>
        )}

        {anyEditable && (
          <div className="d-flex flex-column gap-3">
            <SectionTitle hint="Only the fields below can be changed right now.">What you can change</SectionTitle>
            <div className="d-flex flex-column gap-1">
              <label className="font-size-sm m-0">School year</label>
              {fields.system_academic_year_id.editable ? (
                <>
                  <CustomDropdown
                    data={systemYearOptions}
                    displayKey={["name"]}
                    valueKey={["id"]}
                    onSelect={(value) => set("system_academic_year", value)}
                    placeholder="Select school year"
                    value={form.system_academic_year}
                    defaultValue={form.system_academic_year}
                    showFeedback={false}
                  />
                  {systemYearChanged && selectedSystemYear && (
                    <span className="font-size-xs text-iron-500">
                      Dates must fall within {selectedSystemYear.name} ({selectedSystemYear.year_start}–{selectedSystemYear.year_end}).
                    </span>
                  )}
                </>
              ) : (
                <LockedValue value={rules.system_academic_year?.name ?? "-"} />
              )}
            </div>
            <div className="row g-2">
              <div className="col-6">
                <DateField
                  id="academic-year-start"
                  label="Start date"
                  value={form.start_date}
                  onChange={(value) => set("start_date", value)}
                  bounds={startBounds}
                  error={startError}
                  editable={fields.start_date.editable}
                  lockedValue={formatScheduleDate(rules.start_date)}
                />
              </div>
              <div className="col-6">
                <DateField
                  id="academic-year-end"
                  label="End date"
                  value={form.end_date}
                  onChange={(value) => set("end_date", value)}
                  bounds={endBounds}
                  error={endError}
                  editable={fields.end_date.editable}
                  lockedValue={formatScheduleDate(rules.end_date)}
                />
              </div>
            </div>
          </div>
        )}

        <LockedList rules={rules} />
        <Dependents counts={rules.dependents} />
      </div>

      <div className="drawer-footer">
        <div className="d-flex flex-column w-100 font-size-sm">
          <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.5} />
          <div className="d-flex flex-row align-items-center justify-content-between gap-3 p-2">
            <button type="button" className="border-none bg-none" onClick={() => handleClose?.()}>
              {anyEditable ? "Cancel" : "Close"}
            </button>
            {anyEditable && (
              <div className="d-flex flex-row align-items-center gap-3" style={{ minWidth: 0 }}>
                <span
                  className={`text-truncate ${problems.length ? "text-red-600" : isDirty ? "text-fern-600" : "text-iron-500"}`}
                  title={problems[0]}
                >
                  {problems.length ? problems[0] : isDirty ? "Ready to save" : touched ? "No changes" : "No changes yet"}
                </span>
                <button
                  type="button"
                  className="border-none rounded-3 primary-background text-white font-size-sm px-3 py-2 flex-shrink-0"
                  onClick={handleSave}
                  disabled={!canSave}
                  style={{ opacity: canSave ? 1 : 0.6 }}
                >
                  {isPending ? <SingleSpinner /> : "Save Changes"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

/**
 * Edits a school academic year within the API's rules: the drawer loads what
 * can change, why the rest can't, and the allowed date range, from
 * GET school-academic-year/{id}/update-rules.
 */
function UpdateAcademicYear({ handleClose, drawerData }) {
  const { data, isLoading, error } = useGetSchoolAcademicYearUpdateRules(drawerData?.id);

  if (isLoading) {
    return (
      <div className="d-flex flex-column gap-3 p-2">
        <RectangleSkeleton height="3.5rem" />
        <RectangleSkeleton height="5rem" />
        <RectangleSkeleton height="7rem" />
      </div>
    );
  }

  if (error || !data?.data) {
    return (
      <div className="drawer-content p-2">
        <EmptyState
          mascot="error"
          height="100%"
          mascotHeight="7rem"
          title={error?.response?.data?.errors?.title ?? "This academic year could not be loaded"}
          description={error?.response?.data?.errors?.description ?? "Check your connection and try again."}
        />
      </div>
    );
  }

  return <UpdateAcademicYearForm rules={data.data} handleClose={handleClose} />;
}

export default UpdateAcademicYear;
