import toast from "react-hot-toast";
import ToastWarning from "../../components/Toast/ToastWarning";
export function handleGenerateTimetable(
  hardConstraints,
  generateTimetable,
  schoolSemester,
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

  if (!periodDuration.duration_minutes.value) {
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
  generateTimetable(buildRequestBody(hardConstraints, schoolSemester));
}

const buildRequestBody = (hardConstraints, schoolSemester) => ({
  school_semester_id: schoolSemester.id,
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
      no_break_exceptions: hardConstraints.break_period.no_break_exceptions.map(
        (exception) => ({
          day: exception.day,
          start_time: exception.start_time.value,
          end_time: exception.end_time.value,
        }),
      ),
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
      hardConstraints.schedule_period_duration_minutes.duration_minutes.value,
    ...(hardConstraints.schedule_period_duration_minutes.day_exceptions.filter(
      (exception) => exception.duration_minutes.value,
    ).length > 0 && {
      day_exceptions:
        hardConstraints.schedule_period_duration_minutes.day_exceptions.map(
          (exception) => ({
            day: exception.day,
            duration_minutes: exception.duration_minutes.value,
          }),
        ),
    }),
  },
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
  if (!periodDuration.duration_minutes.value) {
    return false;
  }
  if (!breakPeriod.start_time.value || !breakPeriod.end_time.value) {
    return false;
  }
  return true;
}
