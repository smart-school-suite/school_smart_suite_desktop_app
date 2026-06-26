import { Icon } from "@iconify/react";
import { useSelector, useDispatch } from "react-redux";
import { Fragment } from "react";
import { daysOfWeek } from "../../../../../data/data";
import { useState } from "react";
import VerticalDashedLine from "../../../../../components/DashedLine/VerticalDashedLine";
import {
  addRequestedAssigmentSlot,
  removeAllRequestedAssignmentSlotsByDay,
  removeRequestedAssignmentSlot,
  setRequestedAssignmentSlot,
  setRequestedAssignmentValidation,
} from "../../../../../Slices/Asynslices/semesterTimetableSlice";
import { useGetCoursesSchoolSemesterId } from "../../../../../hooks/semesterTimetableHelper/useGetCoursesSchoolSemesterId";
import RectangleSkeleton from "../../../../../components/SkeletonPageLoader/RectangularSkeleton";
import { TimeRangeInput } from "../../../../../components/FormComponents/InputComponents";
import { timeRangeSchema } from "../../../../../ComponentConfig/YupValidationSchema";
import CustomDropdown from "../../../../../components/Dropdowns/Dropdowns";
import { useGetTeachersSemesterId } from "../../../../../hooks/semesterTimetableHelper/useGetTeachersSemesterId";
function AssignmentListStep({
  handleClose,
  nextStep,
  previousStep,
  fullStep,
  currentStep,
}) {
  const dispatch = useDispatch();
  const opDays = useSelector(
    (state) =>
      state.semesterTimetable.hard_constraints.operational_period
        .operational_days,
  );
  const rAState = useSelector(
    (state) => state.semesterTimetable.soft_constraints.requested_assignments,
  );
  const rADays = rAState.days;
  const rASlots = rAState.slots;
  const [day, setDay] = useState(rADays[0] || "");
  const currentDayData = rASlots.find((slot) => slot.day === day);
  const hasSlots =
    currentDayData && currentDayData.slots && currentDayData.slots.length >= 1;

  const formatTimeToAmPm = (timeString) => {
    if (!timeString) return "N/A";
    try {
      const parsedDate = parse(timeString, "HH:mm", new Date());
      return format(parsedDate, "h:mm a");
    } catch (error) {
      return timeString;
    }
  };

  const calculateSlotDurationText = (start, end) => {
    if (!start || !end) return "0 h";
    try {
      const referenceDate = new Date();
      const startTime = parse(start, "HH:mm", referenceDate);
      const endTime = parse(end, "HH:mm", referenceDate);

      const totalMinutes = differenceInMinutes(endTime, startTime);
      if (totalMinutes <= 0 || isNaN(totalMinutes)) return "0 h";

      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;

      if (hours > 0 && minutes > 0) return `${hours}h ${minutes}m`;
      if (hours > 0) return `${hours}h`;
      return `${minutes}m`;
    } catch (error) {
      return "0 h";
    }
  };

  const calculateTotalHours = () => {
    if (!hasSlots) return 0;

    const totalMinutes = currentDayData.slots.reduce((accumulator, slot) => {
      const start = slot?.start_time?.value;
      const end = slot?.end_time?.value;
      if (!start || !end) return accumulator;

      try {
        const referenceDate = new Date();
        const startTime = parse(start, "HH:mm", referenceDate);
        const endTime = parse(end, "HH:mm", referenceDate);
        const diff = differenceInMinutes(endTime, startTime);

        return diff > 0 ? accumulator + diff : accumulator;
      } catch (e) {
        return accumulator;
      }
    }, 0);

    return parseFloat((totalMinutes / 60).toFixed(2));
  };
  return (
    <>
      <div className="d-flex flex-column gap-4">
        <div className="d-flex flex-row align-items-center justify-content-between">
          <span className="fw-semibold">
            Requested Assignments Configuration
          </span>
          <span
            onClick={() => {
              handleClose();
            }}
          >
            <Icon icon="charm:cross" width="22" height="22" />
          </span>
        </div>
        <div>
          <div className="font-size-sm d-flex flex-row align-items-center justify-content-end">
            <p className="text-capitalize">
              step {currentStep} of {fullStep} completed
            </p>
          </div>
          <div className="d-flex flex-row justify-content-between align-items-center">
            {rADays.map((dayofWeek, index) => (
              <Fragment key={index}>
                <div className="d-flex flex-column gap-1">
                  <button
                    className={`rounded-pill border-none text-capitalize font-size-sm px-2 bg-transparent transition-all  ${day === dayofWeek ? "color-primary fw-medium" : ""}`}
                    onClick={() => {
                      setDay(dayofWeek);
                    }}
                  >
                    {dayofWeek}
                  </button>
                  <div
                    className={
                      day === dayofWeek
                        ? "primary-background"
                        : "bg-transparent"
                    }
                    style={{
                      width: "6vw",
                      height: "0.2rem",
                      borderRadius: "2rem",
                    }}
                  ></div>
                </div>
              </Fragment>
            ))}
          </div>
        </div>
        <div className="d-flex flex-column gap-4">
          {hasSlots ? (
            <>
              <div className="d-flex flex-column gap-4">
                <div className="d-flex flex-row justify-content-end gap-2">
                  <button
                    className="d-flex flex-row font-size-sm gap-1 align-items-center border transparent-bg px-3 py-2 rounded-pill"
                    onClick={() => {
                      dispatch(
                        addRequestedAssigmentSlot({
                          day: day,
                        }),
                      );
                    }}
                  >
                    <Icon icon="material-symbols:add" width="16" height="16" />
                    <span>Add Requested Assignment</span>
                  </button>
                  <button
                    className="d-flex flex-row font-size-sm gap-1 align-items-center border transparent-bg px-3 py-2 rounded-pill"
                    onClick={() => {
                      dispatch(
                        removeAllRequestedAssignmentSlotsByDay({
                          day: day,
                        }),
                      );
                    }}
                  >
                    <Icon icon="mynaui:trash" width="16" height="16" />
                    <span>Remove All</span>
                  </button>
                </div>
                <div
                  className="scroll-bar-sm px-1 height-auto overflow-x-hidden overflow-y-scroll overflow-y-auto d-flex flex-column gap-2"
                  style={{ maxHeight: "52dvh" }}
                >
                  {currentDayData.slots.map((slot, index) => (
                    <Fragment key={slot.id}>
                      <Wizzard day={day} slotId={slot.id} count={index} />
                    </Fragment>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="d-flex font-size-sm text-capitalize flex-column">
                <span className="fw-semibold">Configure {day}</span>
                <p className="text-muted">
                  Define the times that should remain unassigned on {day}.
                </p>
              </div>
              <div>
                <div className="font-size-sm d-flex flex-column  align-items-center">
                  <span>No requested assignment configured.</span>
                  <p className="text-muted">
                    Add Requested Assignment for {day} by clicking the time
                    slots below.
                  </p>
                  <button
                    className="d-flex flex-row gap-1 align-items-center border-none primary-background text-white px-3 py-2 rounded-pill"
                    onClick={() => {
                      dispatch(
                        addRequestedAssigmentSlot({
                          day: day,
                        }),
                      );
                    }}
                  >
                    <Icon icon="material-symbols:add" width="16" height="16" />
                    <span>Add Requested Assignment</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="w-100 d-flex flex-row align-items-center justify-content-between">
          <div className="d-flex flex-column gap-1">
            <button
              className="font-size-sm d-flex flex-row border-none gap-2 bg-transparent px-0"
              onClick={previousStep}
            >
              <span>
                <Icon icon="material-symbols:arrow-back-rounded" />
              </span>
              <span>Back</span>
            </button>
          </div>
          <div>
            <button
              className="font-size-sm p-2 rounded-2 border-none primary-background text-white px-3"
              onClick={nextStep}
            >
              Review Weekly Schedule
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default AssignmentListStep;

function SelectTeacherStep({
  nextStep,
  previousStep,
  currentStep,
  fullStep,
  slotId,
  day,
  count,
}) {
  const dispatch = useDispatch();
  const schoolSemester = useSelector(
    (state) => state.semesterTimetable.schoolSemester,
  );
  const {
    data: teachers,
    isLoading,
    error,
  } = useGetCoursesSchoolSemesterId(schoolSemester?.id);
  const rAState = useSelector(
    (state) => state.semesterTimetable.soft_constraints.requested_assignments,
  );
  const rASlots = rAState.slots.find((rA) => rA.day === day).slots;
  const slot = rASlots.find((slot) => slot.id === slotId);
  return (
    <>
      <div className="card font-size-sm rounded-4 p-2 d-flex flex-column gap-4 text-capitalize pointer-cursor">
        <div className="d-flex flex-row justify-content-between">
          <span> Requested Time Slot #{count + 1}</span>
          <div className="d-flex flex-row align-items-center gap-2">
            <span>
              Step {currentStep} of {fullStep} completed
            </span>
            <button
              className="border-none transparent-bg d-flex flex-row align-items-center justify-content-center"
              onClick={() => {
                dispatch(
                  removeRequestedAssignmentSlot({
                    day: day,
                    slotId: slotId,
                  }),
                );
              }}
            >
              <Icon
                icon="material-symbols:cancel-outline-rounded"
                width={20}
                height={20}
              />
            </button>
          </div>
        </div>
        <div className="d-flex flex-column gap-2">
          <span className="fw-semibold">Who Should Teach This Session?</span>
          <CustomDropdown
            data={teachers?.data || []}
            displayKey={["teacher_name", "courses_count"]}
            valueKey={["teacher_id"]}
            direction="up"
            isLoading={isLoading}
            onSelect={(value) =>
              dispatch(
                setRequestedAssignmentSlot({
                  field: "teacher_id",
                  value: value.teacher_id,
                  day,
                  slotId,
                }),
              )
            }
            error={error}
            errorMessage="Semester Required"
            onError={(msg) => handleStateChange("semester_id", msg, setErrors)}
            value={slot?.teacher_id}
            optional={true}
          />
        </div>
        <div className="d-flex flex-row justify-content-end">
          <button
            style={{ width: "2rem", height: "2rem" }}
            className="d-flex align-items-center border-none rounded-circle bg-transparent border justify-content-center"
            onClick={() => nextStep()}
          >
            <Icon
              icon="material-symbols:arrow-forward-rounded"
              width={16}
              height={16}
            />
          </button>
        </div>
      </div>
    </>
  );
}
function SelectCourseStep({
  nextStep,
  previousStep,
  currentStep,
  fullStep,
  slotId,
  day,
  count,
}) {
  const schoolSemester = useSelector(
    (state) => state.semesterTimetable.schoolSemester,
  );
  const {
    data: courses,
    isLoading,
    error,
  } = useGetCoursesSchoolSemesterId(schoolSemester?.id);
  const dipatch = useDispatch();
  return (
    <>
      <div className="card font-size-sm rounded-4 p-2 d-flex flex-column gap-2 text-capitalize pointer-cursor">
        <div className="d-flex flex-row justify-content-between">
          <span> Requested Time Slot #{count + 1}</span>
          <div className="d-flex flex-row align-items-center gap-2">
            <span>
              Step {currentStep} of {fullStep} completed
            </span>
            <button
              className="border-none transparent-bg d-flex flex-row align-items-center justify-content-center"
              onClick={() => {
                dispatch(
                  removeRequestedAssignmentSlot({
                    day: day,
                    slotId: slotId,
                  }),
                );
              }}
            >
              <Icon
                icon="material-symbols:cancel-outline-rounded"
                width={20}
                height={20}
              />
            </button>
          </div>
        </div>
        <div className="d-flex flex-column gap-2">
          <span className="fw-semibold">Which Course should Be assigned</span>
          <div
            className="scroll-bar-sm pe-1 height-auto overflow-x-hidden overflow-y-scroll overflow-y-auto d-flex flex-column gap-2 pb-4"
            style={{ maxHeight: "34dvh" }}
          >
            <div className="d-flex flex-row flex-wrap gap-2">
              {isLoading ? (
                [...Array(4)].map((_, index) => (
                  <Fragment key={index}>
                    <RectangleSkeleton width={"32%"} height={"16dvh"} />
                  </Fragment>
                ))
              ) : courses?.data ? (
                courses?.data?.map((course) => (
                  <Fragment key={course?.id}>
                    <div
                      className="card p-2 d-flex flex-column"
                      style={{
                        width: "32%",
                        height: "16dvh",
                        borderRadius: "0.85rem",
                      }}
                    >
                      <div className="d-flex flex-row align-items-center justify-content-between">
                        <span
                          className="fw-semibold"
                          style={{ width: "200px" }}
                        >
                          {course?.course_title ?? "N/A"}
                        </span>
                        <span style={{ lineHeight: 0 }}>
                          <Icon
                            icon="material-symbols:check-circle-rounded"
                            width={18}
                            height={18}
                            className="green-color"
                          />
                        </span>
                      </div>
                      <div className="d-flex flex-row align-items-center">
                        <div className="d-flex flex-row gap-1 align-items-center">
                          <span style={{ lineHeight: 0 }}>
                            <Icon
                              icon="mynaui:graduation-cap"
                              width={16}
                              height={16}
                            />
                          </span>
                          <span style={{ fontSize: "0.7rem" }}>
                            {course?.credit ?? "N/A"} Credit
                          </span>
                        </div>
                        <span style={{ lineHeight: 0 }}>
                          <Icon
                            icon="radix-icons:dot-filled"
                            width={16}
                            height={16}
                          />
                        </span>
                        <div className="d-flex flex-row gap-1 align-items-center">
                          <span style={{ lineHeight: 0 }}>
                            <Icon icon="tabler:hash" width={16} height={16} />
                          </span>
                          <span style={{ fontSize: "0.7rem" }}>
                            {course?.course_code || "N/A"}
                          </span>
                        </div>
                      </div>
                      <div className="mt-auto">
                        <div className="d-flex flex-row align-items-center gap-2">
                          {course.types.map((type) => (
                            <Fragment key={type?.id}>
                              <button
                                className="border-none rounded-pill px-2"
                                style={{
                                  fontSize: "0.7rem",
                                  background: type.background_color,
                                  color: type.text_color,
                                }}
                              >
                                {type?.name}
                              </button>
                            </Fragment>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Fragment>
                ))
              ) : (
                <div className="d-flex flex-grow-1 align-items-center justify-content-center">
                  <div className="d-flex flex-column align-items-center gap-2 text-center">
                    <img
                      src="./sss-maskot/timetable.png"
                      alt="sss-timetable-maskot"
                      style={{
                        height: "200px",
                        width: "200px",
                        objectFit: "contain",
                      }}
                    />
                    <span className="fw-semibold font-size-sm">
                      {error?.response?.data?.errors?.title}
                    </span>
                    <p className="text-muted font-size-sm mb-0">
                      {error?.response?.data?.errors?.description}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="d-flex flex-row justify-content-end">
          <div className="d-flex flex-row align-items-center gap-2">
            <button
              style={{ width: "2rem", height: "2rem" }}
              className="d-flex align-items-center border-none rounded-circle bg-transparent border justify-content-center"
              onClick={() => previousStep()}
            >
              <Icon
                icon="material-symbols:arrow-back-rounded"
                width={20}
                height={20}
              />
            </button>
            <button
              style={{ width: "2rem", height: "2rem" }}
              className="d-flex align-items-center border-none rounded-circle bg-transparent border justify-content-center"
              onClick={() => nextStep()}
            >
              <Icon
                icon="material-symbols:arrow-forward-rounded"
                width={20}
                height={20}
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
function SelectTimeStep({
  nextStep,
  previousStep,
  currentStep,
  fullStep,
  slotId,
  day,
  count,
}) {
  const dispatch = useDispatch();
  const rAState = useSelector(
    (state) => state.semesterTimetable.soft_constraints.requested_assignments,
  );
  const rASlots = rAState.slots.find((rA) => rA.day === day).slots;
  const slot = rASlots.find((slot) => slot.id === slotId);
  return (
    <>
      <div className="card font-size-sm rounded-4 p-2 d-flex flex-column gap-2 text-capitalize pointer-cursor">
        <div className="d-flex flex-row justify-content-between">
          <span> Requested Time Slot #{count + 1}</span>
          <div className="d-flex flex-row align-items-center gap-2">
            <span>
              Step {currentStep} of {fullStep} completed
            </span>
            <button
              className="border-none transparent-bg d-flex flex-row align-items-center justify-content-center"
              onClick={() => {
                dispatch(
                  removeRequestedAssignmentSlot({
                    day: day,
                    slotId: slotId,
                  }),
                );
              }}
            >
              <Icon
                icon="material-symbols:cancel-outline-rounded"
                width={20}
                height={20}
              />
            </button>
          </div>
        </div>
        <div className="d-flex flex-column gap-4">
          <span className="fw-semibold">Choose a preferred time</span>
          <div className="d-flex flex-column gap-2">
            <div className="d-flex flex-row align-items-center justify-content-between">
              <span>Recommended Slots</span>
              <button className="d-flex flex-row align-items-center gap-2 font-size-sm border-none border rounded-pill px-2 py-1 bg-transparent">
                <span>Duration</span>
                <span style={{ lineHeight: 0 }}>
                  <Icon icon="line-md:chevron-down" />
                </span>
              </button>
            </div>
            <div className="d-flex flex-row flex-wrap gap-2">
              {[...Array(7)].map((_, index) => (
                <Fragment key={index}>
                  <button className="border-none border transparent-bg rounded-pill d-flex flex-row align-items-center gap-2 p-2">
                    <span>08:00 PM</span>
                    <span>-</span>
                    <span>09:00 PM</span>
                  </button>
                </Fragment>
              ))}
            </div>
          </div>
          <div className="d-flex flex-column gap-2">
            <span>Custom Time</span>
            <TimeRangeInput
              startValue={slot?.start_time?.value ?? ""}
              endValue={slot?.end_time?.value ?? ""}
              onStartTimeChange={(value) =>
                dispatch(
                  setRequestedAssignmentSlot({
                    field: "start_time",
                    value,
                    day,
                    slotId,
                  }),
                )
              }
              onEndTimeChange={(value) =>
                dispatch(
                  setRequestedAssignmentSlot({
                    field: "end_time",
                    value,
                    day,
                    slotId,
                  }),
                )
              }
              validationSchema={timeRangeSchema({
                optional: false,
              })}
              onStartTimeValidationChange={(value) =>
                dispatch(
                  setRequestedAssignmentValidation({
                    field: "start_time",
                    value,
                    day,
                    slotId,
                  }),
                )
              }
              onEndTimeValidationChange={(value) =>
                dispatch(
                  setRequestedAssignmentValidation({
                    field: "end_time",
                    value,
                    day,
                    slotId,
                  }),
                )
              }
            />
          </div>
          <div className="d-flex flex-row justify-content-end">
            <div className="d-flex flex-row align-items-center gap-2">
              <button
                style={{ width: "2rem", height: "2rem" }}
                className="d-flex align-items-center border-none rounded-circle bg-transparent border justify-content-center"
                onClick={() => previousStep()}
              >
                <Icon
                  icon="material-symbols:arrow-back-rounded"
                  width={20}
                  height={20}
                />
              </button>
              <button
                style={{ width: "2rem", height: "2rem" }}
                className="d-flex align-items-center border-none rounded-circle bg-transparent border justify-content-center"
                onClick={() => nextStep()}
              >
                <Icon
                  icon="material-symbols:arrow-forward-rounded"
                  width={20}
                  height={20}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
function SelectHallStep({
  nextStep,
  previousStep,
  currentStep,
  fullStep,
  slotId,
  day,
  count,
}) {
  return (
    <>
      <div className="card font-size-sm rounded-4 p-2 d-flex flex-column gap-2 text-capitalize pointer-cursor">
        <div className="d-flex flex-row justify-content-between">
          <span> Requested Time Slot #{count + 1}</span>
          <div className="d-flex flex-row align-items-center gap-2">
            <span>
              Step {currentStep} of {fullStep} completed
            </span>
            <button
              className="border-none transparent-bg d-flex flex-row align-items-center justify-content-center"
              onClick={() => {
                dispatch(
                  removeRequestedAssignmentSlot({
                    day: day,
                    slotId: slotId,
                  }),
                );
              }}
            >
              <Icon
                icon="material-symbols:cancel-outline-rounded"
                width={20}
                height={20}
              />
            </button>
          </div>
        </div>
        <div className="d-flex flex-column gap-2">
          <span className="fw-semibold">Which Hall Should Use this slot ?</span>
          <div className="d-flex flex-column gap-1">
            <span>Recommended Halls</span>
            <div className="d-flex flex-row flex-wrap gap-2">
              {[...Array(4)].map((_, index) => (
                <Fragment key={index}>
                  <div
                    className="card p-2 d-flex flex-column"
                    style={{
                      width: "32%",
                      height: "14dvh",
                      borderRadius: "0.85rem",
                    }}
                  >
                    <div className="d-flex flex-column gap-1">
                      <div className="d-flex flex-row align-items-center justify-content-between">
                        <span className="fw-semibold">Biochemistry Lab</span>
                        <span style={{ lineHeight: 0 }}>
                          <Icon
                            icon="material-symbols:check-circle-rounded"
                            width={18}
                            height={18}
                          />
                        </span>
                      </div>
                      <div className="d-flex flex-row align-items-center">
                        <div className="d-flex flex-row gap-1 align-items-center">
                          <span style={{ lineHeight: 0 }}>
                            <Icon
                              icon="solar:chair-linear"
                              width={16}
                              height={16}
                            />
                          </span>
                          <span style={{ fontSize: "0.7rem" }}>40 Seats</span>
                        </div>
                        <span style={{ lineHeight: 0 }}>
                          <Icon
                            icon="radix-icons:dot-filled"
                            width={16}
                            height={16}
                          />
                        </span>
                        <div className="d-flex flex-row gap-1 align-items-center">
                          <span style={{ lineHeight: 0 }}>
                            <Icon
                              icon="iconamoon:location-light"
                              width={16}
                              height={16}
                            />
                          </span>
                          <span style={{ fontSize: "0.7rem" }}>
                            Engineering Block
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-auto">
                      <span>Practicals</span>
                    </div>
                  </div>
                </Fragment>
              ))}
            </div>
          </div>
          <div className="d-flex flex-column gap-1">
            <span>Custom Hall</span>
            <div
              className="border w-100 p-2 rounded-3 d-flex flex-row align-items-center justify-content-between gap-2"
              style={{ height: "2rem" }}
            >
              <span>Select Hall</span>
              <span style={{ lineHeight: 0 }}>
                <Icon icon="line-md:chevron-down" width={16} height={16} />
              </span>
            </div>
          </div>
          <div className="d-flex flex-row justify-content-end">
            <div className="d-flex flex-row align-items-center gap-2">
              <button
                style={{ width: "2rem", height: "2rem" }}
                className="d-flex align-items-center border-none rounded-circle bg-transparent border justify-content-center"
                onClick={() => previousStep()}
              >
                <Icon
                  icon="material-symbols:arrow-back-rounded"
                  width={20}
                  height={20}
                />
              </button>
              <button
                style={{ width: "2rem", height: "2rem" }}
                className="d-flex align-items-center border-none rounded-circle bg-transparent border justify-content-center"
                onClick={() => nextStep()}
              >
                <Icon
                  icon="material-symbols:arrow-forward-rounded"
                  width={20}
                  height={20}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
function ReviewStep({
  nextStep,
  previousStep,
  currentStep,
  fullStep,
  slotId,
  day,
  count,
}) {
  const dispatch = useDispatch();
  return (
    <>
      <div className="card font-size-sm rounded-4 p-2 d-flex flex-column gap-2 text-capitalize pointer-cursor">
        <div className="d-flex flex-row justify-content-between">
          <span> Requested Time Slot #{count + 1}</span>
          <div className="d-flex flex-row align-items-center gap-2">
            <span>
              Step {currentStep} of {fullStep} completed
            </span>
            <button
              className="border-none transparent-bg d-flex flex-row align-items-center justify-content-center"
              onClick={() => {
                dispatch(
                  removeRequestedAssignmentSlot({
                    day: day,
                    slotId: slotId,
                  }),
                );
              }}
            >
              <Icon
                icon="material-symbols:cancel-outline-rounded"
                width={20}
                height={20}
              />
            </button>
          </div>
        </div>
        
      </div>
    </>
  );
}
function Wizzard({ day, slotId, count }) {
  const steps = [
    {
      title: "Select Teacher",
      step_number: 1,
      component: SelectTeacherStep,
    },
    {
      title: "Select Course",
      step_number: 2,
      component: SelectCourseStep,
    },
    {
      title: "Select Time",
      step_number: 3,
      component: SelectTimeStep,
    },
    {
      title: "Select Hall Step",
      step_number: 4,
      component: SelectHallStep,
    },
    {
      title: "Requested Assignment Preview",
      step_number: 5,
      component: ReviewStep,
    },
  ];
  const rAState = useSelector(
    (state) => state.semesterTimetable.soft_constraints.requested_assignments,
  );
  const rASlots = rAState.slots.find((rA) => rA.day === day).slots;
  const resolveStep = () => {
    const slot = rASlots.find((slot) => slot.id === slotId);
    if (slot.teacher_id === null) {
      return 0;
    }
    if (slot.course_id === null) {
      return 1;
    }
    if (slot.start_time.value === null || slot.end_time.value === null) {
      return 2;
    }
    if (slot.hall_id === null) {
      return 3;
    }
  };
  const [stepIndex, setStepIndex] = useState(resolveStep() || 0);

  const currentStep = steps[stepIndex];

  const CurrentComponent = currentStep.component;
  const nextStep = () => {
    setStepIndex((prev) => prev + 1);
  };

  const previousStep = () => {
    setStepIndex((prev) => prev - 1);
  };
  return (
    <CurrentComponent
      nextStep={nextStep}
      previousStep={previousStep}
      currentStep={stepIndex + 1}
      fullStep={steps.length}
      day={day}
      slotId={slotId}
      count={count}
    />
  );
}
