import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { timeRangeSchema } from "../../../../ComponentConfig/YupValidationSchema";
import { TimeRangeInput } from "../../../../components/FormComponents/InputComponents";
import {
  EmptyState,
  IconButton,
  Section,
  Stats,
  TextButton,
  TimeField,
  TimeSpan,
  WizardFooter,
  WizardStep,
} from "../../../../components/SemesterTimetable/ConstraintWizard/WizardPrimitives";
import { useGetSemesterTimetablePeriods as usePeriods } from "../../../../hooks/semesterTimetable/useSemesterTimetablePeriodDuration";
import {
  useGeneratedSlots,
  useRecommendedSlots,
} from "../../../../hooks/semesterTimetableHelper/useSlotSuggestions";
import {
  addRequestSlot,
  clearRequestDay,
  removeRequestSlot,
  updateRequestSlot,
} from "../../../../Slices/SemesterTimetable/semesterTimetableSlice";
import {
  FIELD_LABELS,
  allRequests,
  isRequestComplete,
  operatingWindowFor,
  periodMinutesFor,
  requestEntryOf,
  requestsForDay,
  timeOf,
} from "../../../../utils/semesterTimetable/requestedSlots";
import {
  dayLabel,
  sortDays,
  dayShortLabel,
} from "../../../../utils/semesterTimetable/timeUtils";
import RequestSuggestions from "./RequestSuggestions";
import { useRequestOptions } from "./useRequestOptions";

const DEFAULT_WINDOW = { start_time: "08:00", end_time: "17:00" };

function RequestConfigureStep({ config, nextStep, previousStep }) {
  const dispatch = useDispatch();
  const { soft_constraints: soft, hard_constraints: hard } = useSelector(
    (state) => state.semesterTimetable,
  );
  const entry = requestEntryOf(soft, config.key);
  const days = sortDays(entry.days);
  const [activeDay, setActiveDay] = useState(days[0] ?? "");
  const day = days.includes(activeDay) ? activeDay : (days[0] ?? "");
  const requests = requestsForDay(entry, day);
  const everything = allRequests(entry);
  const incomplete = everything.filter(
    (request) => !isRequestComplete(request, config),
  );
  const options = useRequestOptions(config);

  const add = () => dispatch(addRequestSlot({ constraint: config.key, day }));

  return (
    <WizardStep
      title={`Set the ${config.noun.many}`}
      description={config.configureHint}
      footer={
        <WizardFooter
          onBack={previousStep}
          onNext={nextStep}
          nextLabel={`Review ${config.noun.many}`}
          nextDisabled={everything.length === 0 || incomplete.length > 0}
          hint={
            everything.length === 0
              ? `Add at least one ${config.noun.one}`
              : `${incomplete.length} ${incomplete.length === 1 ? "request is" : "requests are"} incomplete`
          }
        />
      }
    >
      {days.length === 0 ? (
        <EmptyState
          title="No days selected"
          text="Go back and choose the days these requests apply to."
        />
      ) : (
        <>
          <div className="cw-tabs" role="tablist">
            {days.map((tabDay) => {
              const count = requestsForDay(entry, tabDay).length;
              return (
                <button
                  key={tabDay}
                  type="button"
                  role="tab"
                  aria-selected={tabDay === day}
                  className={`cw-tab ${tabDay === day ? "is-active" : ""}`}
                  onClick={() => setActiveDay(tabDay)}
                  aria-label={dayLabel(tabDay)}
                  title={dayLabel(tabDay)}
                >
                  {dayShortLabel(tabDay)}
                  <span className="cw-tab__count">{count}</span>
                </button>
              );
            })}
          </div>

          <Section
            label={`${dayLabel(day)}`}
            hint={
              requests.length
                ? `${requests.length} ${requests.length === 1 ? config.noun.one : config.noun.many}`
                : null
            }
            action={
              requests.length > 0 && (
                <>
                  <TextButton
                    icon="lucide:trash-2"
                    tone="muted"
                    onClick={() =>
                      dispatch(clearRequestDay({ constraint: config.key, day }))
                    }
                  >
                    Clear day
                  </TextButton>
                  <TextButton icon="lucide:plus" onClick={add}>
                    Add {config.noun.one}
                  </TextButton>
                </>
              )
            }
          >
            {requests.length === 0 ? (
              <EmptyState
                icon="lucide:clock-plus"
                title={`No ${config.noun.many} on ${dayLabel(day)}`}
                text={config.configureHint}
                action={
                  <button
                    type="button"
                    className="cw-btn cw-btn--outline"
                    onClick={add}
                  >
                    Add {config.noun.one}
                  </button>
                }
              />
            ) : (
              <div className="d-flex flex-column gap-2">
                {requests.map((request, index) => (
                  <RequestCard
                    key={request.id}
                    config={config}
                    day={day}
                    index={index}
                    request={request}
                    options={options}
                    hard={hard}
                  />
                ))}
              </div>
            )}
          </Section>

          <Section label="All days">
            <Stats
              items={[
                { label: "Days", value: days.length },
                {
                  label:
                    config.noun.many[0].toUpperCase() +
                    config.noun.many.slice(1),
                  value: everything.length,
                },
                {
                  label: "Ready",
                  value: everything.length - incomplete.length,
                },
              ]}
            />
          </Section>
        </>
      )}
    </WizardStep>
  );
}

/* -------------------------------------------------------------------------- */
/* One request                                                                */
/* -------------------------------------------------------------------------- */

function RequestCard({ config, day, index, request, options, hard }) {
  const dispatch = useDispatch();
  // Bumped when a suggestion is picked so the time inputs pick up the value.
  const [pickCount, setPickCount] = useState(0);
  const update = (changes) =>
    dispatch(
      updateRequestSlot({
        constraint: config.key,
        day,
        slotId: request.id,
        changes,
      }),
    );

  const periods = usePeriods();
  const minutes = periodMinutesFor(hard.schedule_period_duration_minutes, day);
  const periodId = useMemo(() => {
    const list = periods.data?.data ?? [];
    return (
      (list.find((period) => period.minutes === minutes) ?? list[0])?.id ?? null
    );
  }, [periods.data, minutes]);
  const dayWindow = operatingWindowFor(hard.operational_period, day);
  const semesterId = options.schoolSemester?.id;

  const recommendedPayload =
    config.suggest === "recommended" &&
    (request.teacher_id || request.course_id)
      ? {
          day,
          period_duration_id: periodId,
          school_semester_id: semesterId,
          ...(request.teacher_id ? { teacher_id: request.teacher_id } : {}),
          ...(request.course_id ? { course_id: request.course_id } : {}),
          ...(request.hall_id ? { hall_id: request.hall_id } : {}),
          ...(dayWindow ?? {}),
        }
      : null;
  const periodPayload =
    config.suggest === "periods" && request.hall_id
      ? { day, period_duration_id: periodId, ...(dayWindow ?? DEFAULT_WINDOW) }
      : null;

  const recommended = useRecommendedSlots(recommendedPayload, {
    enabled: Boolean(recommendedPayload),
  });
  const generated = useGeneratedSlots(periodPayload, {
    enabled: Boolean(periodPayload),
  });
  const query = recommendedPayload
    ? recommended
    : periodPayload
      ? generated
      : null;

  // For assignments, a chosen course narrows the teacher list to its teachers.
  const courseTeachers = recommended.data?.data?.teachers;
  const optionsFor = (field) =>
    field === "teacher_id" && request.course_id && courseTeachers?.length
      ? courseTeachers.map((teacher) => ({
          value: teacher.id,
          label: teacher.name,
        }))
      : options.options[field];

  const start = timeOf(request.start_time);
  const end = timeOf(request.end_time);
  const complete = isRequestComplete(request, config);

  const pick = (slot) => {
    const changes = { start_time: slot.start_time, end_time: slot.end_time };
    if (
      config.fields.includes("teacher_id") &&
      !request.teacher_id &&
      slot.teachers?.length
    ) {
      changes.teacher_id = slot.teachers[0].id;
    }
    update(changes);
    setPickCount((value) => value + 1);
  };

  const subjectSummary = config.fields
    .map((field) => options.labels[field]?.[request[field]])
    .filter(Boolean)
    .join(" · ");

  return (
    <div className="cw-slot pb-3">
      <div className="cw-slot__head">
        <span className="cw-slot__title">
          <span className="cw-slot__index">#{index + 1}</span>
          <span className="text-truncate">
            {subjectSummary || "New request"}
          </span>
          {start && end && <TimeSpan start={start} end={end} />}
        </span>
        <div className="d-flex flex-row align-items-center gap-2">
          {complete && <span className="cw-badge cw-badge--accent">Ready</span>}
          <IconButton
            icon="lucide:x"
            label="Remove request"
            tone="danger"
            onClick={() =>
              dispatch(
                removeRequestSlot({
                  constraint: config.key,
                  day,
                  slotId: request.id,
                }),
              )
            }
          />
        </div>
      </div>

      <div className="row g-2 mb-3">
        {config.fields.map((field) => (
          <div className={`col-${12 / config.fields.length}`} key={field}>
            <label
              className="form-label font-size-sm fw-medium mb-1"
              htmlFor={`${request.id}-${field}`}
            >
              {FIELD_LABELS[field]}
            </label>
            <select
              id={`${request.id}-${field}`}
              className="form-select form-select-sm font-size-sm"
              value={request[field] ?? ""}
              disabled={options.loading[field]}
              onChange={(event) => {
                const value = event.target.value || null;
                // A different course may not be taught by the chosen teacher.
                const reset =
                  field === "course_id" && config.fields.includes("teacher_id")
                    ? { teacher_id: null }
                    : {};
                update({ [field]: value, ...reset });
              }}
            >
              <option value="">
                {options.loading[field]
                  ? "Loading…"
                  : options.errors[field]
                    ? `Could not load ${FIELD_LABELS[field].toLowerCase()}s`
                    : `Choose a ${FIELD_LABELS[field].toLowerCase()}`}
              </option>
              {optionsFor(field).map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                  {option.meta ? ` (${option.meta})` : ""}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      <div className="d-flex flex-column gap-2 mb-3">
        <span className="font-size-sm fw-medium">
          {config.suggest === "periods" ? "Periods" : "Suggested times"}
        </span>
        <RequestSuggestions
          mode={config.suggest}
          query={query}
          waitingHint={config.configureHint}
          selected={{ start_time: start, end_time: end }}
          onPick={pick}
        />
      </div>

      <span className="font-size-sm fw-medium">Or enter a time</span>
      <TimeField>
        <TimeRangeInput
          key={`${request.id}-${pickCount}`}
          startValue={start ?? ""}
          endValue={end ?? ""}
          onStartTimeChange={(value) => update({ start_time: value })}
          onEndTimeChange={(value) => update({ end_time: value })}
          validationSchema={timeRangeSchema({ optional: false })}
        />
      </TimeField>
    </div>
  );
}

export default RequestConfigureStep;
