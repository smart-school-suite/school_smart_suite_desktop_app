import { Icon } from "@iconify/react";
import {
  useFetchInstructorAvailabilityBySemesterQuery,
  useFetchCoursesBySchoolSemesterQuery
} from "../../Slices/Asynslices/fetchSlice";
import Pageloaderspinner, {SingleSpinner} from "../../components/Spinners/Spinners";
import TimeInput from "../../components/FormComponents/TimeInput";
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setFormData,
  addRow,
  removeRow,
  updateField,
  setCourseData,
} from "../../Slices/Asynslices/TimetableSlice";
import { useCreateTimetableByAvialabilityMutation } from "../../Slices/Asynslices/postSlice";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import { convertTo24HourFormat } from "../../utils/functions";
function CreateTimetable({
  handleClose,
  row_id: semesterId,
  specialtyId,
  batchId,
}) {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.timetable.formData);
  const [isCreating, setIsCreating] = useState(false);
  const [isShowing, setIsShowing] = useState(true);
  const [createTimetableByAvialability] =
    useCreateTimetableByAvialabilityMutation();
  const { data: specialtyCourses, isLoading: coursesLoading } =
  useFetchCoursesBySchoolSemesterQuery({
    semesterId: semesterId,
    specialtyId: specialtyId,
    });
  const { data: instructorAvailability, isLoading: availabilityLoading } =
    useFetchInstructorAvailabilityBySemesterQuery({
      semester_id: semesterId,
      specialty_id: specialtyId,
    });
  useEffect(() => {
    if (instructorAvailability?.data) {
      const initialAvailability = instructorAvailability.data.map((item) => ({
        teacher_id: item.teacher_id,
        teacher_name: item.teacher_name,
        available_start_time: item.available_start_time,
        available_end_time: item.available_end_time,
        start_time: "",
        end_time: "",
        level_id: item.level_id,
        day: item.day,
        course_id: "",
        course_title: "",
        semester_id: semesterId,
        specialty_id: specialtyId,
      }));
      dispatch(setFormData(initialAvailability));
      if (specialtyCourses?.data) {
        dispatch(setCourseData(specialtyCourses.data));
      }
    }
  }, [instructorAvailability, semesterId, specialtyId, dispatch]);
  const handleCourseChange = (index, value) => {
    dispatch(updateField({ index, field: "course_id", value }));
  };

  const handleCreateTimeTable = async () => {
    const timeTableData = formData
      .filter(
        (item) =>
          item.start_time !== "" ||
          item.end_time !== "" ||
          item.course_title !== ""
      )
      .map((item) => ({
        teacher_id: item.teacher_id,
        day_of_week: item.day,
        end_time: convertTo24HourFormat(item.end_time),
        start_time: convertTo24HourFormat(item.start_time),
        level_id: item.level_id,
        course_id: item.course_id,
        semester_id: semesterId,
        specialty_id: specialtyId,
        student_batch_id: batchId,
      }));

    const formattedData = {
      scheduleEntries: timeTableData,
    };
    setIsCreating(true);
    try {
      await createTimetableByAvialability({
        scheduleEntries: formattedData,
        semesterId: semesterId,
      }).unwrap();
      setIsCreating(false);
      handleClose();
    } catch (e) {
      setIsCreating(false);
      toast.custom(
        <ToastDanger
          title={"An Error Occured"}
          description={"Something went wrong trying to create time table"}
        />
      );
    }
  };
  const handleTimeChange = useCallback((time, index, field) => {
    dispatch(updateField({ index, field, value: time }));
  }, []);

  if (coursesLoading || availabilityLoading) {
    return <Pageloaderspinner />;
  }
  return (
    <>
      <div className="d-flex flex-row align-items-center justify-content-between mb-4 ">
        <h5>Create Specialty Time Table</h5>
        <span
          onClick={() => {
            handleClose();
          }}
        >
          <Icon icon="charm:cross" width="22" height="22" />
        </span>
      </div>
      <div className="d-flex flex-row align-items-center justify-content-end gap-2 ">
        <button
          className="px-2 py-1 border-none  rounded-2 text-center"
          onClick={() => {
            setIsShowing((prevalue) => !prevalue);
          }}
        >
          <span>
            <Icon
              icon="charm:menu-kebab"
              width="16"
              height="16"
              className="color-primary"
            />
          </span>
        </button>
        <button
          className="p-2 font-size-sm px-3 text-white border-none rounded-3 p-2 primary-background"
          onClick={() => {
            handleCreateTimeTable();
          }}
        >
          {isCreating ? <SingleSpinner /> : <span>Create Timetable</span>}
        </button>
      </div>
      {isShowing ? (
        <>
          <div className="w-100 border rounded-3 mt-3 timetable-container">
            <table className="table table-responsive ">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col">Course Title</th>
                  <th scope="col">Instructor</th>
                  <th scope="col">Avialable Time</th>
                  <th scope="col">Avialable Day</th>
                  <th scope="col">Start Time</th>
                  <th scope="col">End Time</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {formData.map((items, index) => {
                  return (
                    <tr className="align-middle">
                      <td className="border text-center">
                        <Icon
                          icon="uil:plus"
                          width="20"
                          height="20"
                          onClick={() =>
                            dispatch(addRow({ index, row: items }))
                          }
                        />
                      </td>
                      <td className="text-start">
                        <span
                          className={`${
                            items.validation.clash === null
                              ? null
                              : "text-warning"
                          } font-size-sm`}
                          style={{
                            opacity: `${
                              items.validation.clash === null ? "0" : "1"
                            }`,
                          }}
                        >
                          {items.validation.clash === null
                            ? "testing"
                            : items.validation.clash}
                        </span>
                        <select
                          name="course_id"
                          value={
                            formData[index] ? formData[index].course_id : ""
                          }
                          onChange={(e) =>
                            handleCourseChange(index, e.target.value)
                          }
                          className="form-select"
                        >
                          <option selected>Open to select</option>
                          {specialtyCourses.data.map((items) => {
                            return (
                              <option value={items.id}>
                                {items.course_title}
                              </option>
                            );
                          })}
                        </select>
                        <span
                          className="font-size-sm"
                          style={{
                            opacity: "0",
                          }}
                        >
                          hello
                        </span>
                      </td>
                      <td>{items.teacher_name}</td>
                      <td>
                        {items.available_start_time} -{" "}
                        {items.available_end_time}
                      </td>
                      <td>{items.day}</td>
                      <td>
                        <span
                          className="font-size-sm"
                          style={{
                            opacity: "0",
                          }}
                        >
                          hello
                        </span>
                        <TimeInput
                          onTimeChange={(time) =>
                            handleTimeChange(time, index, "start_time")
                          }
                          value={
                            formData[index] ? formData[index].start_time : ""
                          }
                        />
                        <span
                          className={`${
                            items.validation.start_time
                              ? "text-danger"
                              : items.validation.valid
                              ? "text-success"
                              : null
                          } font-size-sm`}
                          style={{
                            opacity: `${
                              items.validation.start_time ||
                              items.validation.valid
                                ? "1"
                                : "0"
                            } `,
                            transition: "all 0.2s",
                          }}
                        >
                          {items.validation.start_time}
                          {items.validation.valid}
                          {(items.validation.valid === null) &
                          (items.validation.start_time === null)
                            ? "testing"
                            : null}
                        </span>
                      </td>
                      <td>
                        <span
                          className="font-size-sm"
                          style={{
                            opacity: "0",
                          }}
                        >
                          hello
                        </span>
                        <TimeInput
                          onTimeChange={(time) =>
                            handleTimeChange(time, index, "end_time")
                          }
                          value={
                            formData[index] ? formData[index].end_time : ""
                          }
                        />
                        <span
                          className={`${
                            items.validation.end_time
                              ? "text-danger"
                              : items.validation.valid
                              ? "text-success"
                              : null
                          } font-size-sm`}
                          style={{
                            opacity: `${
                              items.validation.end_time ||
                              items.validation.valid
                                ? "1"
                                : "0"
                            } `,
                            transition: "all 0.2s",
                          }}
                        >
                          {items.validation.end_time}
                          {items.validation.valid}
                          {(items.validation.valid === null) &
                          (items.validation.end_time === null)
                            ? "testing"
                            : null}
                        </span>
                      </td>
                      <td className="border text-center">
                        <Icon
                          icon="ion:trash-outline"
                          width="20"
                          height="20"
                          onClick={() => dispatch(removeRow({ index }))}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <TimetablePreview />
      )}
    </>
  );
}
export default CreateTimetable;

function TimetablePreview() {
  const previewData = useSelector((state) => state.timetable.formData);
  const groupedData = {};
  const filteredPreviewData = previewData.filter(
    (items) =>
      items.start_time !== "" ||
      items.end_time !== "" ||
      items.course_title !== ""
  );
  filteredPreviewData.forEach((entry) => {
    const { day } = entry;

    if (!groupedData[day]) {
      groupedData[day] = [];
    }

    groupedData[day].push(entry);
  });
  return (
    <>
      <span className="mb-2 fw-medium">Time Table Preview</span>
      <div className="w-100 border rounded-3  timetable-container">
        <table className="table table-responsive ">
          <thead>
            <tr>
              <td className="first-column border-top">
                <p className="rotate-90 text-center my-0">Day</p>
              </td>
              <td>Courses</td>
            </tr>
          </thead>
          <tbody>
            {Object.keys(groupedData).map((day) => (
              <tr>
                <td className="border text-center">
                  <span className="rotate-90 ">{day}</span>
                </td>
                <td>
                  <div className="d-flex flex-row align-items-center gap-2 flex-wrap">
                    {groupedData[day].map((entry, index) => (
                      <div
                        className="rounded-3 primary-background-50 p-2 d-flex flex-column"
                        style={{
                          height: "15dvh",
                          width: "18%",
                        }}
                        key={index}
                      >
                        <div className="d-block">
                          <p className="m-0 fw-medium">{entry.teacher_name}</p>
                          <p className="m-0 font-size-sm fw-light">
                            {entry.course_title}
                          </p>
                        </div>
                        <div className="mt-auto font-size-sm fw-semibold d-flex flex-row align-items-center justify-content-between">
                          <div>
                            <span>{entry.start_time}</span> -{" "}
                            <span>{entry.end_time}</span>
                          </div>
                          <div>
                            <span>{entry.time_difference}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
