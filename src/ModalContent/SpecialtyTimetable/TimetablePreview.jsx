import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import { useAutoGenerateTimetable } from "../../hooks/timetable/useAutoGenerateTimetable";
import { useCreateTimetable } from "../../hooks/timetable/useCreateTimetable";
import { useEffect, useState } from "react";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { motion } from "framer-motion";
import { resetAll } from "../../Slices/Asynslices/AutoGenTimetableSlice";
function TimetablePreview({ handleStateChange, data, handleClose }) {
  const { id: schoolSemesterId } = data;
  const dispatch = useDispatch();
  const formDataState = useSelector((state) => state.autoGenTimetable);
  const [genTimetable, setGenTimetable] = useState([]);
  const { mutateAsync: autoGenerateTimetable, isPending } =
    useAutoGenerateTimetable();
  const { mutate:createTimetable, isPending:isCreating } = useCreateTimetable(); 
  const handleGenerateTimetable = async () => {
    try {
      const payload = {
        days: formDataState.days.value.map((items) => items.value),
        min_slot_length: Number(formDataState.min_slot_length.value),
        max_slot_length: Number(formDataState.max_slot_length.value),
        slot_increment: Number(formDataState.slot_increment.value),
        start: formDataState.start.value,
        end: formDataState.end.value,
        min_day_slots: Number(formDataState.min_day_slots.value),
        max_day_slots: Number(formDataState.max_day_slots.value),
        min_week_slots: Number(formDataState.min_week_slots.value),
        max_week_slots: Number(formDataState.max_week_slots.value),
        consecutive_limit: Number(formDataState.consecutive_limit.value),
        max_week_sessions: Number(formDataState.max_week_sessions.value),
        allow_doubles: false,
        min_gap: Number(formDataState.min_gap.value),
        max_courses_day: Number(formDataState.max_courses_day.value),
      };

      const data = await autoGenerateTimetable({ payload, schoolSemesterId });

      setGenTimetable(data.data);
    } catch (error) {
      console.error("Mutation failed:", error);
    }
  };
  useEffect(() => {
    if (schoolSemesterId) {
      handleGenerateTimetable();
    }
  }, [schoolSemesterId]);
  function flattenCourseData(scheduleData) {
  return Object.values(scheduleData).flat();
  }

  return (
    <>
      <div className="d-flex flex-row align-items-center justify-content-between w-100 mb-4">
        <span>Timetable Preview</span>
        <span
          onClick={() => {
            dispatch(resetAll())
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
          disabled={isCreating || isPending}
        >
          <Icon icon="oui:generate" width="16" height="16" />
          <span> Regenerate</span>
        </button>
        <button 
         className="font-size-sm border-none rounded-2 px-3 py-2 primary-background text-white"
         onClick={() => {
          const gentimetableData = flattenCourseData(genTimetable);
          const formattedData = gentimetableData.map((items) => ({
              specialty_id:data.specialty_id,
              level_id:data.level_id,
              semester_id:data.id,
              student_batch_id:data.student_batch_id,
              teacher_id:items.teacher_id,
              course_id:items.course_id,
              start_time:items.start_time,
              end_time:items.end_time,
              day_of_week:items.day
          }))
          createTimetable({ scheduleEntries:formattedData })
         }}
         disabled={isCreating || isPending}
        >
          Create Timetable
        </button>
      </div>
      <div className="card grades-box rounded-3">
        {isPending ? (
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
              {Object.entries(genTimetable).map(([day, courses], index) => (
                <motion.tr
                  key={day}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <td className="font-size-sm" style={{ width: "10%" }}>
                    {day}
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
                            courseTitle={course.course_title}
                            courseCode={course.course_code}
                            teacherName={course.teacher_name}
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
            handleStateChange("timetableConfig");
          }}
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
export default TimetablePreview;

function SlotCard({
  courseTitle,
  courseCode,
  teacherName,
  startTime,
  endTime,
  duration,
  courseCredit,
}) {
  return (
    <>
      <div className="card p-2 w-100 rounded-3 d-flex flex-column gap-3 primary-background-50 primary-color-dark border-none ">
        <div className="font-size-sm d-flex flex-column">
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
          <span className="fw-medium">{teacherName}</span>
        </div>
        <div className="font-size-sm d-flex flex-column fw-light">
          <span>{courseCredit} Credit</span>
          <span>{courseCode}</span>
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
