import { forwardRef, useMemo } from "react";
import CustomDropdown from "../Dropdowns/Dropdowns";
import { useGetSchoolAdminAudience } from "../../hooks/Audience/useGetSchoolAdminAudience";
import { useGetStudentAudience } from "../../hooks/Audience/useGetStudentAudience";
import { useGetTeacherAudience } from "../../hooks/Audience/useGetTeacherAudience";
import { PARTICIPANT_TYPES, personName } from "../../utils/election/electionDisplay";

const SOURCES = {
  student: useGetStudentAudience,
  teacher: useGetTeacherAudience,
  school_admin: useGetSchoolAdminAudience,
};

/**
 * Pick one student, teacher or administrator of the school.
 * value: { type, person } — `ref.current.triggerValidation()` validates the person.
 *
 *   <PersonPicker ref={ref} value={holder} onChange={setHolder} error={err} onError={setErr} />
 */
const PersonPicker = forwardRef(function PersonPicker(
  { value, onChange, error, onError, label = "Person", types = Object.keys(PARTICIPANT_TYPES) },
  ref,
) {
  const type = value?.type ?? types[0];
  const students = SOURCES.student();
  const teachers = SOURCES.teacher();
  const admins = SOURCES.school_admin();
  const query = { student: students, teacher: teachers, school_admin: admins }[type];

  const people = useMemo(
    () =>
      (query?.data?.data ?? []).map((person) => ({
        ...person,
        display_name: [personName(person), person.username ? `@${person.username}` : null, person.specialty]
          .filter(Boolean)
          .join(" · "),
      })),
    [query?.data],
  );

  return (
    <div className="d-flex flex-column gap-2">
      <label className="font-size-sm fw-medium">{label}</label>
      <div className="d-flex flex-row gap-1 bg-iron-50 rounded-3 p-1" role="radiogroup" aria-label={`${label} type`}>
        {types.map((key) => (
          <button
            key={key}
            type="button"
            role="radio"
            aria-checked={type === key}
            onClick={() => onChange({ type: key, person: null })}
            className={`flex-grow-1 border-none rounded-2 font-size-xs py-1 ${type === key ? "bg-white text-primary-600 fw-semibold shadow-sm" : "bg-transparent text-iron-500"}`}
          >
            {PARTICIPANT_TYPES[key].label}
          </button>
        ))}
      </div>
      <CustomDropdown
        key={type}
        ref={ref}
        data={people}
        isLoading={query?.isLoading}
        displayKey={["display_name"]}
        valueKey={["id"]}
        placeholder={`Select ${PARTICIPANT_TYPES[type].label.toLowerCase()}`}
        value={value?.person}
        onSelect={(person) => onChange({ type, person })}
        error={error}
        errorMessage={`Select a ${PARTICIPANT_TYPES[type].label.toLowerCase()}`}
        onError={onError}
        dropdownWidth="100%"
      />
    </div>
  );
});

export default PersonPicker;
