import { Icon } from "@iconify/react";
import {
  InputGroup,
  NumberInput,
  TimeRangeInput,
} from "../../components/FormComponents/InputComponents";
import { GenerateIcon } from "../../icons/ActionIcons";
import { useEffect, useRef, useState } from "react";
import {
  numberSchema,
  timeRangeSchema,
} from "../../ComponentConfig/YupValidationSchema";
import { allFieldsValid, convertToMySQLTimeHHMM } from "../../utils/functions";
import toast from "react-hot-toast";
import ToastWarning from "../../components/Toast/ToastWarning";
import { useAutoGenExamTimetable } from "../../hooks/examTimetable/useAutoGenExamTimetable";
import { useCreateExamTimetable } from "../../hooks/examTimetable/useCreateExamTimetable";
import { motion } from "framer-motion";
import { SingleSpinner } from "../../components/Spinners/Spinners";
function AutoGenerateTimetable({ handleClose, rowData }) {
  const [isActive, setIsActive] = useState("timetableConfig");
  const [formData, setFormData] = useState({
    start_time: {
      value: null,
      isValid: null,
    },
    end_time: {
      value: null,
      isValid: null,
    },
    max_course_per_day: {
      value: null,
      isValid: null,
    },
    min_course_per_day: {
      value: null,
      isValid: null,
    },
    course_duration: {
      value: null,
      isValid: null,
    },
  });
  const handleToggleActive = (value) => {
    setIsActive(value);
  };
  const handleSetFormData = (field, value, state) => {
    setFormData((prev) => ({
      ...prev,
      [state]: {
        ...prev[state],
        [field]: value,
      },
    }));
  };
  return (
    <>
      {isActive == "timetableConfig" ? (
        <TimetableConfig
          handleClose={handleClose}
          handleToggleActive={handleToggleActive}
          formData={formData}
          handleSetFormData={handleSetFormData}
        />
      ) : isActive == "timetablePreview" ? (
        <TimetablePreview
          handleClose={handleClose}
          handleToggleActive={handleToggleActive}
          formData={formData}
          rowData={rowData}
        />
      ) : null}
    </>
  );
}
export default AutoGenerateTimetable;

function TimetableConfig({
  handleClose,
  handleToggleActive,
  formData,
  handleSetFormData,
}) {
  const timeRangeRef = useRef();
  const minDailyCourseRef = useRef();
  const maxDailyCourseRef = useRef();
  const courseLengthRef = useRef();
  const handlePrevalidation = async () => {
    const startTime = await timeRangeRef.current.preValidateStart();
    const endTime = await timeRangeRef.current.preValidateEnd();
    const minDailyCourse = await minDailyCourseRef.current.triggerValidation();
    const maxDailyCourse = await maxDailyCourseRef.current.triggerValidation();
    const courseLength = await courseLengthRef.current.triggerValidation();
    return {
      startTime,
      endTime,
      minDailyCourse,
      maxDailyCourse,
      courseLength,
    };
  };
  return (
    <>
      <div className="d-flex flex-row align-items-center justify-content-between mb-3">
        <span className="m-0">Timetable Configuration</span>
        <span
          className="m-0"
          onClick={() => {
            handleClose();
          }}
        >
          <Icon icon="charm:cross" width="22" height="22" />
        </span>
      </div>
      <div>
        <TimeRangeInput
          startValue={formData.start_time.value}
          endValue={formData.end_time.value}
          onStartTimeChange={(value) =>
            handleSetFormData("value", value, "start_time")
          }
          onEndTimeChange={(value) =>
            handleSetFormData("value", value, "end_time")
          }
          validationSchema={timeRangeSchema({
            optional: false,
          })}
          onStartTimeValidationChange={(value) =>
            handleSetFormData("isValid", value, "start_time")
          }
          onEndTimeValidationChange={(value) =>
            handleSetFormData("isValid", value, "end_time")
          }
          ref={timeRangeRef}
        />
      </div>
      <div className="d-flex flex-row align-items-center gap-2">
        <div className="w-50">
          <label htmlFor="minDailyCourseRefs" className="font-size-sm">
            Min Daily Courses
          </label>
          <NumberInput
            placeholder={"Enter Minimum Daily Courses"}
            onChange={(value) =>
              handleSetFormData("value", value, "min_course_per_day")
            }
            onValidationChange={(value) =>
              handleSetFormData("isValid", value, "min_course_per_day")
            }
            value={formData.min_course_per_day.value}
            validationSchema={numberSchema({
              min: 1,
              max: 10,
              required: true,
              integerOnly: true,
              messages: {
                required: "Min Courses Per Day Required",
                min: "Min Courses Per Day Must Be Atleast 1",
                max: "Min Courses Per Day Must Not Exceed 10",
              },
            })}
            ref={minDailyCourseRef}
          />
        </div>
        <div className="w-50">
          <label htmlFor="maxDailyCourseRefs" className="font-size-sm">
            Max Daily Courses
          </label>
          <NumberInput
            placeholder={"Enter Maximum Daily Courses"}
            onChange={(value) =>
              handleSetFormData("value", value, "max_course_per_day")
            }
            onValidationChange={(value) =>
              handleSetFormData("isValid", value, "max_course_per_day")
            }
            value={formData.max_course_per_day.value}
            validationSchema={numberSchema({
              min: 1,
              max: 10,
              required: true,
              integerOnly: true,
              messages: {
                required: "Max Courses Per Day Required",
                min: "Max Courses Per Day Must Be Atleast 1",
                max: "Max Courses Per Day Must Not Exceed 10",
              },
            })}
            ref={maxDailyCourseRef}
          />
        </div>
      </div>
      <div>
        <label htmlFor="courseLengthRef" className="font-size-sm">
          Course Length
        </label>
        <InputGroup
          InputGroupText="min"
          placeholder={"Enter Course Length In Minutes"}
          onChange={(value) =>
            handleSetFormData("value", value, "course_duration")
          }
          onValidationChange={(value) =>
            handleSetFormData("isValud", value, "course_duration")
          }
          value={formData.course_duration.value}
          validationSchema={numberSchema({
            min: 30,
            max: 1440,
            required: true,
            messages: {
              min: "Course Length Must Be Atleast 30 Minutes Long",
              max: "Course Length Must Not Exceed 1440 Minutes Long (24 Hours Long",
              required: "Course Length Required",
            },
          })}
          ref={courseLengthRef}
        />
      </div>
      <div>
        <button
          className="p-2 font-size-sm border-none rounded-2 primary-background w-100"
          onClick={async () => {
            const prevalidation = await handlePrevalidation();
            if (!allFieldsValid(prevalidation)) {
              toast.custom(
                <ToastWarning
                  title={"Invalid Fields"}
                  description={
                    "Please ensure all fields are valid before Generating Timetable"
                  }
                />
              );
            }
            handleToggleActive("timetablePreview");
          }}
        >
          <div className="d-flex gap-2 w-100 align-items-center justify-content-center text-white">
            <span>Generate Timetable</span>
            <GenerateIcon />
          </div>
        </button>
      </div>
    </>
  );
}
function TimetablePreview({
  handleClose,
  handleToggleActive,
  formData,
  rowData,
}) {
  const { mutateAsync: autoGenTimetable, isPending: isGenerating } =
    useAutoGenExamTimetable();
  const { mutate: createTimetable, isPending: isCreating } =
    useCreateExamTimetable(handleClose);
  const [genTimetable, setGenTimetable] = useState([]);
  const handleGenerateTimetable = async () => {
    const genTimetable = await autoGenTimetable({
      exam_id: rowData.id,
      start_time: formData.start_time.value,
      end_time: formData.end_time.value,
      min_course_per_day: formData.min_course_per_day.value,
      max_course_per_day: formData.max_course_per_day.value,
      course_duration: formData.course_duration.value,
    });
    setGenTimetable(genTimetable?.data);
  };
  useEffect(() => {
    handleGenerateTimetable();
  }, []);
  function flattenCourseData(scheduleData) {
    return Object.values(scheduleData).flat();
  }
  return (
    <>
      <div className="d-flex flex-row align-items-center justify-content-between mb-3">
        <span className="m-0">Timetable Preview</span>
        <span
          className="m-0"
          onClick={() => {
            handleClose();
          }}
        >
          <Icon icon="charm:cross" width="22" height="22" />
        </span>
      </div>
      <div className="d-flex flex-row align-items-center justify-content-end my-2 gap-2">
        <button
          className="border-none rounded-3 px-3 py-2 font-size-sm d-flex gap-2 align-items-center"
          onClick={() => handleGenerateTimetable()}
          disabled={isGenerating || isCreating}
        >
          <div className="d-flex flex-row align-items-center w-100 gap-2 justify-content-center">
            <GenerateIcon />
            <span> Regenerate</span>
          </div>
        </button>
        <button
          className="font-size-sm border-none rounded-2 px-3 py-2 primary-background text-white"
          disabled={isCreating || isGenerating}
          onClick={() => {
            const slots = flattenCourseData(genTimetable);
            const payload = slots.map((items) => ({
              date: items.exam_date,
              course_id: items.course_id,
              start_time: convertToMySQLTimeHHMM(items.start_time),
              end_time: convertToMySQLTimeHHMM(items.end_time),
              exam_id: rowData.id,
              level_id: rowData.level_id,
              student_batch_id: rowData.batchId,
              school_year: rowData.school_year,
              specialty_id: rowData.specialty_id,
            }));
            createTimetable({
              examId: rowData.id,
              timetableData: { entries: payload },
            });
          }}
        >
          {isCreating ? <SingleSpinner /> : <span>Create Timetable</span>}
        </button>
      </div>
      <div className="card grades-box rounded-3">
        {isGenerating ? (
          <SingleSpinner />
        ) : (
          <table className="table table-responsive">
            <thead>
              <tr>
                <th className="font-size-sm">Day</th>
                <th className="font-size-sm">Courses</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(genTimetable).map(([date, courses], index) => (
                <motion.tr
                  key={date}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <td className="font-size-sm" style={{ width: "10%" }}>
                    {date}
                  </td>
                  <td style={{ width: "90%" }}>
                    <div className="d-flex flex-row align-items-center gap-2 w-100 flex-wrap">
                      {courses.map((course, courseIndex) => (
                        <motion.div
                          key={course.course_code}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{
                            duration: 0.4,
                            delay: index * 0.1 + courseIndex * 0.05,
                          }}
                          style={{ width: "32%" }}
                        >
                          <SlotCard
                            courseTitle={course.course_name}
                            courseCode={course.course_code}
                            startTime={course.start_time}
                            endTime={course.end_time}
                            duration={course.duration}
                            courseCredit={course.course_credit}
                          />
                        </motion.div>
                      ))}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div className="d-flex flex-row justify-content-start mt-3">
        <button
          className="d-flex flex-row align-items-center gap-2 font-size-sm border-none transparent-bg color-primary"
          onClick={() => {
            handleToggleActive("timetableConfig");
          }}
          disabled={isGenerating || isCreating}
        >
          <span>
            <Icon icon="ion:arrow-back" />
          </span>
          <span>Back</span>
        </button>
      </div>
    </>
  );
}

function SlotCard({
  courseTitle,
  courseCode,
  startTime,
  endTime,
  duration,
  courseCredit,
}) {
  return (
    <>
      <div className="card p-2 w-100 rounded-3 d-flex flex-column gap-5 primary-background-50 primary-color-dark border-none ">
        <div className="font-size-sm d-flex flex-column gap-1">
          <div className="d-flex flex-row align-items-center w-100 justify-content-between">
            <span className="fw-semibold">{courseTitle}</span>
            <span className="pointer-cursor">
              <Icon
                icon="qlementine-icons:menu-dots-16"
                width="16"
                height="16"
              />
            </span>
          </div>
          <span className="fw-medium">{courseCode}</span>
          <span className="fw-medium">{courseCredit} Credit</span>
        </div>
        <div className="d-flex flex-row align-items-center justify-content-between font-size-sm fw-medium">
          <div className="d-flex flex-row align-items-center gap-2">
            <span>{startTime}</span>
            <span>
              <Icon icon="octicon:dash-16" />
            </span>
            <span>{endTime}</span>
          </div>
          <span>{duration}</span>
        </div>
      </div>
    </>
  );
}
