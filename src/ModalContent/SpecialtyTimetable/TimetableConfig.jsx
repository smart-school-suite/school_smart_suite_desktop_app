import { Icon } from "@iconify/react";
import {
  NumberInput,
  TimeRangeInput,
} from "../../components/FormComponents/InputComponents";
import { MultiSelectDropdown } from "../../components/Dropdowns/Dropdowns";
import { daysOfWeek } from "../../data/data";
import { useDispatch, useSelector } from "react-redux";
import {
  updateValue,
  resetAll,
} from "../../Slices/Asynslices/AutoGenTimetableSlice";
import { useRef } from "react";
import { numberSchema, timeRangeSchema } from "../../ComponentConfig/YupValidationSchema";
function TimetableConfig({ handleStateChange, handleClose }) {
  const inputRefs = useRef({
    days: null,
    minClassLength: null,
    maxClassLength: null,
    classLengthVariation: null,
    minClassPerDay: null,
    maxClassPerDay: null,
    minClassPerWeek: null,
    maxClassPerWeek: null,
    consecutiveLimit: null,
    maxWeekSessionPerCourse: null,
    courseGap: null,
    maxDailyCourse: null,
  });
  const handlePrevalidation = async () => {
    const day = await inputRefs.current.days.triggerValidation();
    const minClassLength =
      await inputRefs.current.minClassLength.triggerValidation();
    const maxClassLength =
      await inputRefs.current.maxClassLength.triggerValidation();
    const classLengthVariation =
      await inputRefs.current.classLengthVariation.triggerValidation();
    const minClassPerDay =
      await inputRefs.current.minClassPerDay.triggerValidation();
    const maxClassPerDay =
      await inputRefs.current.maxClassPerDay.triggerValidation();
    const minClassPerWeek =
      await inputRefs.current.minClassPerWeek.triggerValidation();
    const maxClassPerWeek =
      await inputRefs.current.maxClassPerWeek.triggerValidation();
    const consecutiveLimit =
      await inputRefs.current.consecutiveLimit.triggerValidation();
    const maxWeekSessionPerCourse =
      await inputRefs.current.maxWeekSessionPerCourse.triggerValidation();
    const courseGap = await inputRefs.current.courseGap.triggerValidation();
    const maxDailyCourse =
      await inputRefs.current.maxDailyCourse.triggerValidation();

    return {
      day,
      minClassLength,
      maxClassLength,
      classLengthVariation,
      minClassPerDay,
      maxClassPerDay,
      minClassPerWeek,
      maxClassPerWeek,
      consecutiveLimit,
      maxWeekSessionPerCourse,
      courseGap,
      maxDailyCourse,
    };
  };

  const assignRef = (name) => (el) => {
    inputRefs.current[name] = el;
  };
  const formDataState = useSelector((state) => state.autoGenTimetable);
  const dispatch = useDispatch();
  return (
    <>
      <div className="d-flex flex-row align-items-center justify-content-between w-100 mb-4">
        <span>Auto Create Timetable</span>
        <span
          onClick={() => {
            dispatch(resetAll());
            handleClose();
          }}
        >
          <Icon icon="charm:cross" width="22" height="22" />
        </span>
      </div>
      <div>
        <label htmlFor="slotIncrement" className="font-size-sm">
          Day
        </label>
        <MultiSelectDropdown
          data={daysOfWeek}
          displayKey={["label"]}
          valueKey={["value"]}
          placeholder={"Select Days"}
          errorMessage={"Days Must Be Selected"}
          ref={assignRef("days")}
          onSelect={(day) =>
            dispatch(updateValue({ key: "days", field: "value", value: day }))
          }
          onError={(error) =>
            dispatch(updateValue({ key: "days", field: "error", value: error }))
          }
          error={formDataState.days.error}
          value={formDataState.days.value}
        />
      </div>
      <div className="d-flex flex-row align-items-center gap-2 w-100">
        <div className="w-50">
          <label htmlFor="minCourseLength" className="font-size-sm">
            Min Class Length
          </label>
          <NumberInput
            placeholder="Enter Min Course Length"
            validationSchema={numberSchema({
              min: 30,
              max: 1440,
              required: true,
              messages: {
                min: "Course Length Must Be Atleast 30 Minutes Long",
                max: "Course Length Should Not Exceed 24hours Long (1440 Min)",
                required: "Minimum Course Length Required",
              },
            })}
            onChange={(value) =>
              dispatch(
                updateValue({ key: "min_slot_length", field: "value", value })
              )
            }
            onValidationChange={(value) =>
              dispatch(
                updateValue({ key: "min_slot_length", field: "isValid", value })
              )
            }
            value={formDataState.min_slot_length.value}
            ref={assignRef("minClassLength")}
          />
        </div>
        <div className="w-50">
          <label htmlFor="maxCourseLength" className="font-size-sm">
            Max Class Length
          </label>
          <NumberInput
            placeholder="Enter Max Course Length"
            validationSchema={numberSchema({
              min: formDataState.min_slot_length.value
                ? formDataState.min_slot_length.value
                : 30,
              max: 1440,
              required: true,
              messages: {
                min: "Max Course Length Must Be Atleast 30 Minutes Long",
                max: "Min Course Length Should Not Exceed 24hours Long (1440 Min)",
                required: "Max Course Length Required",
              },
            })}
            onChange={(value) =>
              dispatch(
                updateValue({ key: "max_slot_length", field: "value", value })
              )
            }
            onValidationChange={(value) =>
              dispatch(
                updateValue({ key: "max_slot_length", field: "isValid", value })
              )
            }
            value={formDataState.max_slot_length.value}
            ref={assignRef("maxClassLength")}
          />
        </div>
      </div>
      <div className="d-flex flex-row align-items-center gap-2 w-100">
        <div className="w-50">
          <label htmlFor="slotIncrement" className="font-size-sm">
            Class Length Variation
          </label>
          <NumberInput
            placeholder="Enter Class Length Variation"
            validationSchema={numberSchema({
              min: 0,
              max: 1440,
              required: true,
              messages: {
                min: "Class Length Variation Must Be Atleast 30 Minutes Long",
                max: "Class Length Variation Must Not Exceed 1440 Minutes Long",
                required: "Class Length Variation Required",
              },
            })}
            onChange={(value) =>
              dispatch(
                updateValue({ key: "slot_increment", field: "value", value })
              )
            }
            onValidationChange={(value) =>
              dispatch(
                updateValue({ key: "slot_increment", field: "isValid", value })
              )
            }
            value={formDataState.slot_increment.value}
            ref={assignRef("classLengthVariation")}
          />
        </div>
        <div className="w-50">
          <TimeRangeInput 
             onStartTimeChange={(value) => dispatch(updateValue({ key:'start', field:"value", value }))}
             onEndTimeChange={(value) => dispatch(updateValue({key:'end', field:"value", value}))}
             validationSchema={timeRangeSchema({ optional:false })}
             startValue={formDataState.start.value}
             endValue={formDataState.end.value}
          />
        </div>
      </div>
      <div className="d-flex flex-row align-items-center gap-2 w-100">
        <div className="w-50">
          <label htmlFor="minCourseLength" className="font-size-sm">
            Min Number of Classes Per Day
          </label>
          <NumberInput
            placeholder="Enter Min Number of Classes Per Day"
            validationSchema={numberSchema({
              min: 1,
              max: 10,
              required: true,
              messages: {
                min: "Min Number of Classes Per Day Be Atleast 1",
                max: "Max Number of Classes Per Day Not Exceed 10",
                required: "Minimum Number of Classes Per Day Required",
              },
            })}
            onChange={(value) =>
              dispatch(
                updateValue({ key: "min_day_slots", field: "value", value })
              )
            }
            onValidationChange={(value) =>
              dispatch(
                updateValue({ key: "min_day_slots", field: "isValid", value })
              )
            }
            value={formDataState.min_day_slots.value}
            ref={assignRef("minClassPerDay")}
          />
        </div>
        <div className="w-50">
          <label htmlFor="maxNumberOfClasses" className="font-size-sm">
            Max Number of Classes Per Day
          </label>
          <NumberInput
            placeholder="Enter Max Number of Classes Per Day"
            validationSchema={numberSchema({
              min: formDataState.min_day_slots.value
                ? formDataState.min_day_slots.value
                : 1,
              max: 100,
              required: true,
              messages: {
                min: "Min Number Of Classes Per Day Must Be Atleast 1",
                max: "Max Number Of Classes Per Day Must Not Exceed 100",
                required: "Maximum Number of Classes Per Day Required",
              },
            })}
            onChange={(value) =>
              dispatch(
                updateValue({ key: "max_day_slots", field: "value", value })
              )
            }
            onValidationChange={(value) =>
              dispatch(
                updateValue({ key: "max_day_slots", field: "isValid", value })
              )
            }
            value={formDataState.max_day_slots.value}
            ref={assignRef("maxClassPerDay")}
          />
        </div>
      </div>
      <div className="d-flex flex-row align-items-center gap-2 w-100">
        <div className="w-50">
          <label htmlFor="minCourseLength" className="font-size-sm">
            Min Weekly Classes
          </label>
          <NumberInput
            placeholder="Enter Min Number Of Classes Per Week"
            validationSchema={numberSchema({
              min: 1,
              max: 100,
              required: true,
              messages: {
                min: "Min Number Of Classes Per Week Must Be Atleast 1",
                max: "Max Number Of Classes Per Week Must Not Exceed 100",
                required: "Minimum Number Of Classes Per Week Required",
              },
            })}
            onChange={(value) =>
              dispatch(
                updateValue({ key: "min_week_slots", field: "value", value })
              )
            }
            onValidationChange={(value) =>
              dispatch(
                updateValue({ key: "min_week_slots", field: "isValid", value })
              )
            }
            value={formDataState.min_week_slots.value}
            ref={assignRef("minClassPerWeek")}
          />
        </div>
        <div className="w-50">
          <label htmlFor="maxNumberOfClasses" className="font-size-sm">
            Max Weekly Classes
          </label>
          <NumberInput
            placeholder="Enter Max Number of Classes Per Week"
            validationSchema={numberSchema({
              min:1,
              max: 100,
              required: true,
              messages: {
                min: "Max Number of Classes Per Week Must Be Atleast 1",
                max: "Max Number of Classes Per Week Must Not Exceed 100",
                required: "Maximum Number Of Classes Per Week Required",
              },
            })}
            onChange={(value) =>
              dispatch(
                updateValue({ key: "max_week_slots", field: "value", value })
              )
            }
            onValidationChange={(value) =>
              dispatch(
                updateValue({ key: "max_week_slots", field: "isValid", value })
              )
            }
            value={formDataState.max_week_slots.value}
            ref={assignRef("maxClassPerWeek")}
          />
        </div>
      </div>
      <div className="d-flex flex-row align-items-center gap-2 w-100">
        <div className="w-50">
          <label htmlFor="slotIncrement" className="font-size-sm">
            Consecutive Limit
          </label>
          <NumberInput
            placeholder="Consecutive Class Limit"
            validationSchema={numberSchema({
              min: 1,
              max: 10,
              required: true,
              messages: {
                min: "Daily Consecutive Classes For Teachers Must Be atleast 1",
                max: "DailY Consecutive Classes For Teachers Must Not Exceed 10",
                required: "Max Consecutive Teacher Classes Required",
              },
            })}
            onChange={(value) =>
              dispatch(
                updateValue({ key: "consecutive_limit", field: "value", value })
              )
            }
            onValidationChange={(value) =>
              dispatch(
                updateValue({
                  key: "consecutive_limit",
                  field: "isValid",
                  value,
                })
              )
            }
            value={formDataState.consecutive_limit.value}
            ref={assignRef("consecutiveLimit")}
          />
        </div>
        <div className="w-50">
          <label htmlFor="slotIncrement" className="font-size-sm">
            Max Week Session Per Course
          </label>
          <NumberInput
            placeholder="Enter Max Week Sessions Per Course"
            validationSchema={numberSchema({
              min: 1,
              max: 10,
              required: true,
              messages: {
                min: "Max Week Session Per Course Must Be Atleast 1",
                max: "Max Week Session Per Course Must Not Exceed 10",
                required: "Max WeeK Sessions Per Course Required",
              },
            })}
            onChange={(value) =>
              dispatch(
                updateValue({ key: "max_week_sessions", field: "value", value })
              )
            }
            onValidationChange={(value) =>
              dispatch(
                updateValue({
                  key: "max_week_sessions",
                  field: "isValid",
                  value,
                })
              )
            }
            value={formDataState.max_week_sessions.value}
            ref={assignRef("maxWeekSessionPerCourse")}
          />
        </div>
      </div>
      <div className="d-flex flex-row align-items-center gap-2 w-100">
        <div className="w-50">
          <label htmlFor="slotIncrement" className="font-size-sm">
            Course Gap
          </label>
          <NumberInput
            placeholder="Course Gap"
            validationSchema={numberSchema({
              min: 1,
              max: 10,
              required: true,
              messages: {
                min: "Course Gap Must Be Atleast 1",
                max: "Course Gap Must Not Exceed 10",
                required: "Course Gap Required",
              },
            })}
            onChange={(value) =>
              dispatch(updateValue({ key: "min_gap", field: "value", value }))
            }
            onValidationChange={(value) =>
              dispatch(updateValue({ key: "min_gap", field: "isValid", value }))
            }
            value={formDataState.min_gap.value}
            ref={assignRef("courseGap")}
          />
        </div>
        <div className="w-50">
          <label htmlFor="slotIncrement" className="font-size-sm">
            Max Daily Courses
          </label>
          <NumberInput
            placeholder="Max Daily Courses"
            validationSchema={numberSchema({
              min: 1,
              max: 10,
              required: true,
              messages: {
                min: "Min Daily Courses Must Be Atleast 1",
                max: "Min Daily Courses Must Not Exceed 10",
                required: "Max Daily Courses Required",
              },
            })}
            onChange={(value) =>
              dispatch(
                updateValue({ key: "max_courses_day", field: "value", value })
              )
            }
            onValidationChange={(value) =>
              dispatch(
                updateValue({ key: "max_courses_day", field: "isValid", value })
              )
            }
            value={formDataState.max_courses_day.value}
            ref={assignRef("maxDailyCourse")}
          />
        </div>
      </div>
      <div className="mt-2">
        <button
          className="rounded-3 p-2 text-white border-none primary-background font-size-sm w-100"
          onClick={() => {
           handlePrevalidation();
          handleStateChange("timetablePreview");
          
          }}
        >
          Generate Timetable
        </button>
      </div>
    </>
  );
}
export default TimetableConfig;
