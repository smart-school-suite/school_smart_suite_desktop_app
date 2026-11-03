import toast from "react-hot-toast";
import ToastWarning from "../../components/Toast/ToastWarning";
import { buildRequestPayload, REQUEST_CONSTRAINTS } from "./requestedSlots";
export function handleGenerateTimetable(
  hardConstraints,
  generateTimetable,
  schoolSemester,
  timetableVersion,
  mutationOptions,
  softConstraints = {},
) {
  const breakPeriod = hardConstraints.break_period;
  const operationalPeriod = hardConstraints.operational_period;
  const periodDuration = hardConstraints.schedule_period_duration_minutes;
  if (
    !operationalPeriod.start_time.value ||
    !operationalPeriod.end_time.value
  ) {
    toast.custom(
      <ToastWarning
        title={"Operational Period Incomplete"}
        description={
          "Please ensure that both the start and end times for the operational period are set before generating the timetable."
        }
      />,
    );
    return;
  }

  if (!periodDuration.duration_minutes) {
    toast.custom(
      <ToastWarning
        title={"Period Duration Incomplete"}
        description={
          "Please ensure that the duration for the schedule period is set before generating the timetable."
        }
      />,
    );
    return;
  }
  if (!breakPeriod.start_time.value || !breakPeriod.end_time.value) {
    toast.custom(
      <ToastWarning
        title={"Break Period Incomplete"}
        description={
          "Please ensure that both the start and end times for the break period are set before generating the timetable."
        }
      />,
    );
    return;
  }
  generateTimetable(
    buildRequestBody(
      hardConstraints,
      schoolSemester,
      timetableVersion,
      softConstraints,
    ),
    mutationOptions,
  );
}

const timeValue = (field) =>
  field && typeof field === "object" ? field.value : field;

/** Requested free periods flattened to [{ day, start_time, end_time }]. */
const buildFreePeriods = (softConstraints) =>
  (softConstraints?.requested_free_periods?.slots ?? []).flatMap((dayEntry) =>
    (dayEntry.slots ?? [])
      .map((slot) => ({
        day: dayEntry.day,
        start_time: timeValue(slot.start_time),
        end_time: timeValue(slot.end_time),
      }))
      .filter((slot) => slot.start_time && slot.end_time),
  );

/** Soft constraints, each included only when it has at least one entry. */
const buildSoftConstraints = (softConstraints) => {
  const body = {};
  const freePeriods = buildFreePeriods(softConstraints);
  if (freePeriods.length) body.requested_free_periods = freePeriods;
  Object.values(REQUEST_CONSTRAINTS).forEach((config) => {
    const requests = buildRequestPayload(softConstraints, config);
    if (requests.length) body[config.key] = requests;
  });
  return body;
};

const buildRequestBody = (
  hardConstraints,
  schoolSemester,
  timetableVersion,
  softConstraints,
) => ({
  school_semester_id: schoolSemester.id,
  version_id: timetableVersion?.id || null,
  break_period: {
    start_time: hardConstraints.break_period.start_time.value,
    end_time: hardConstraints.break_period.end_time.value,
    ...(hardConstraints.break_period.day_exceptions.filter(
      (exception) => exception.start_time.value && exception.end_time.value,
    ).length > 0 && {
      day_exceptions: hardConstraints.break_period.day_exceptions.map(
        (exception) => ({
          day: exception.day,
          start_time: exception.start_time.value,
          end_time: exception.end_time.value,
        }),
      ),
    }),
    ...(hardConstraints.break_period.no_break_exceptions.length > 0 && {
      // Stored as day names, which is what the API validates.
      no_break_exceptions: hardConstraints.break_period.no_break_exceptions,
    }),
  },
  operational_period: {
    start_time: hardConstraints.operational_period.start_time.value,
    end_time: hardConstraints.operational_period.end_time.value,
    ...(hardConstraints.operational_period.day_exceptions.filter(
      (exception) => exception.start_time.value && exception.end_time.value,
    ).length > 0 && {
      day_exceptions: hardConstraints.operational_period.day_exceptions.map(
        (exception) => ({
          day: exception.day,
          start_time: exception.start_time.value,
          end_time: exception.end_time.value,
        }),
      ),
    }),
    ...(hardConstraints.operational_period.operational_days.length > 0 && {
      operational_days: hardConstraints.operational_period.operational_days,
    }),
  },
  schedule_period_duration_minutes: {
    duration_minutes:
      hardConstraints.schedule_period_duration_minutes.duration_minutes,
    // Custom durations are stored as plain minutes.
    ...(hardConstraints.schedule_period_duration_minutes.day_exceptions.filter(
      (exception) => timeValue(exception.duration_minutes),
    ).length > 0 && {
      day_exceptions:
        hardConstraints.schedule_period_duration_minutes.day_exceptions
          .filter((exception) => timeValue(exception.duration_minutes))
          .map((exception) => ({
            day: exception.day,
            duration_minutes: timeValue(exception.duration_minutes),
          })),
    }),
  },
  ...buildSoftConstraints(softConstraints),
});

export function checkConfiguration(hardConstraints) {
  const breakPeriod = hardConstraints.break_period;
  const operationalPeriod = hardConstraints.operational_period;
  const periodDuration = hardConstraints.schedule_period_duration_minutes;
  if (
    !operationalPeriod.start_time.value ||
    !operationalPeriod.end_time.value
  ) {
    return false;
  }
  if (!periodDuration.duration_minutes) {
    return false;
  }
  if (!breakPeriod.start_time.value || !breakPeriod.end_time.value) {
    return false;
  }
  return true;
}
