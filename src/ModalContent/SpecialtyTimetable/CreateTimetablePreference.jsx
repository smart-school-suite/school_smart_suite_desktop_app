import { Icon } from "@iconify/react";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import TimeInput from "../../components/FormComponents/TimeInput";
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setFormData,
  addRow,
  removeRow,
  updateField,
} from "../../Slices/Asynslices/TimetableSlice";
import { useCreateTimetableByPreference } from "../../hooks/timetable/useCreateTimetableByAvailability";
import { useGetAllInstructorAvailabilitiesBySemester } from "../../hooks/timetable/useGetAllInstructorsAvailabilityBySemeter";
import { useGetCoursesBySpecialtySemester } from "../../hooks/course/useGetCoursesBySpecialtyAndSemester";
function CreateTimetableByPreference({ handleClose, rowData }) {
  const {
    specialty_id,
    semester_id,
    student_batch_id,
    level_id,
    id: schoolSemesterId,
  } = rowData;
  const { data: availability, isFetching: isFetchingAvailability } =
    useGetAllInstructorAvailabilitiesBySemester(schoolSemesterId, specialty_id);
  const { data: courses, isFetching: isCourseFetching } =
    useGetCoursesBySpecialtySemester(specialty_id, semester_id);
  const formData = useSelector((state) => state.timetable.formData);
  const { mutate: createTimetable, isPending } =
    useCreateTimetableByPreference(handleClose);
  const dispatch = useDispatch();
  useEffect(() => {
    if (availability && availability.data) {
      const groupedData = availability.data.reduce((acc, currentItem) => {
        const teacherId = currentItem.teacher_id;

        if (!acc[teacherId]) {
          acc[teacherId] = {
            teacher_id: teacherId,
            teacher_name: currentItem.teacher_name,
            course_id: "",
            day: "",
            start_time: "",
            end_time: "",
            duration: "",
            availableDays: [],
            availableTime: [],
            semesterId: schoolSemesterId,
            specialtyId: specialty_id,
            studentBatchId: student_batch_id,
            levelId: level_id,
          };
        }

        if (!acc[teacherId].availableDays.includes(currentItem.day)) {
          acc[teacherId].availableDays.push(currentItem.day);
        }

        acc[teacherId].availableTime.push({
          day: currentItem.day,
          start_time: currentItem.available_start_time,
          end_time: currentItem.available_end_time,
        });

        return acc;
      }, {});

      const finalFormattedData = Object.values(groupedData);

      dispatch(setFormData(finalFormattedData));
    }
  }, [availability]);

  const handleChange = (index, field, value) => {
    dispatch(updateField({ index, field, value }));
  };

  const handleAddRow = (index, rowData) => {
    const teacherInfoForNewRow = formData[index];
    dispatch(
      addRow({
        index,
        row: {
          teacher_id: teacherInfoForNewRow.teacher_id,
          teacher_name: teacherInfoForNewRow.teacher_name,
          availableDays: teacherInfoForNewRow.availableDays,
          availableTime: teacherInfoForNewRow.availableTime,
          semesterId: teacherInfoForNewRow.semesterId,
          specialtyId: teacherInfoForNewRow.specialtyId,
          studentBatchId: teacherInfoForNewRow.studentBatchId,
          levelId: teacherInfoForNewRow.levelId,
        },
      })
    );
  };

  const handleRemoveRow = (index) => {
    dispatch(removeRow({ index }));
  };

  const handleCreateTimetable = () => {
    const isEmpty = (value) =>
      value === null || value === undefined || value.toString().trim() === "";

    const timeTableData = formData
      .filter(
        (item) =>
          !isEmpty(item.start_time) &&
          !isEmpty(item.end_time) &&
          !isEmpty(item.course_id) &&
          !isEmpty(item.teacher_id)
      )
      .map((item) => ({
        teacher_id: item.teacher_id,
        day_of_week: item.day.toLowerCase(),
        end_time: item.end_time,
        start_time: item.start_time,
        course_id: item.course_id,
        semester_id: item.semesterId,
        specialty_id: item.specialtyId,
        student_batch_id: item.studentBatchId,
        level_id: item.levelId,
      }));

    const formattedData = {
      scheduleEntries: timeTableData,
    };
    createTimetable(formattedData);
  };

  if (isFetchingAvailability) {
    return <SingleSpinner />;
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
      <div className="d-flex flex-row align-items-center justify-content-end mb-2">
        <button 
          className="p-2 font-size-sm px-3 text-white border-none rounded-3 p-2 primary-background"
           onClick={() => {
              handleCreateTimetable();
           }}
          >
          {isPending ? <SingleSpinner /> : "Create Timetable"}
        </button>
      </div>
      <div className="card grades-box rounded-3 border">
        <table className="table table-responsive font-size-sm">
          <thead className="grades-thead">
            <tr>
              <th>Action</th>
              <th className="text-center">Teacher</th>
              <th className="text-center">Course</th>
              <th className="text-center">Day</th>
              <th className="text-center">Available Time</th>
              <th className="text-center">Start Time</th>
              <th className="text-center">End Time</th>
              <th className="text-center">Duration</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {formData.map((items, index) => (
              <tr className="grades-tr">
                <td style={{ width: "1%" }}>
                  <div
                    className="w-100 h-100 d-flex flex-row align-items-center justify-content-center pointer-cursor"
                    style={{ fontSize: "0.85rem" }}
                    onClick={() => {
                      handleAddRow(index, items);
                    }}
                  >
                    <div className="d-flex flex-column">
                      <Icon icon="ic:round-plus" width="15" height="15" />
                      <span style={{ fontSize: "0.65rem", opacity: 0 }}>
                        IC
                      </span>
                    </div>
                  </div>
                </td>
                <td style={{ width: "14%" }}>
                  <div
                    className="w-100 h-100 d-flex flex-row align-items-center justify-content-start pointer-cursor"
                    style={{ fontSize: "0.85rem" }}
                  >
                    <span>{items.teacher_name}</span>
                  </div>
                </td>
                <td style={{ width: "14%" }}>
                  <div
                    className="w-100 h-100 d-flex flex-row align-items-center justify-content-center pointer-cursor"
                    style={{ fontSize: "0.85rem" }}
                  >
                    <select
                      className="form-select form-select-sm"
                      name="course_id"
                      value={items.course_id}
                      onChange={(e) =>
                        handleChange(index, "course_id", e.target.value)
                      }
                    >
                      <option selected>Select Course</option>
                      {isCourseFetching ? (
                        <SingleSpinner />
                      ) : (
                        courses.data.map((course) => (
                          <option value={course.id}>
                            {course.course_title}
                          </option>
                        ))
                      )}
                    </select>
                  </div>
                </td>
                <td style={{ width: "14%" }}>
                  <div
                    className="w-100 h-100 d-flex flex-row align-items-center justify-content-center pointer-cursor"
                    style={{ fontSize: "0.85rem" }}
                  >
                    <select
                      className="form-select form-select-sm"
                      name="day"
                      value={items.day}
                      onChange={(e) =>
                        handleChange(index, "day", e.target.value)
                      }
                    >
                      <option selected>Select Day</option>
                      {items.availableDays.map((item) => (
                        <option value={item}>{item}</option>
                      ))}
                    </select>
                  </div>
                </td>
                <td style={{ width: "14%" }}>
                  <div
                    className="w-100 h-100 d-flex flex-row align-items-center justify-content-center pointer-cursor"
                    style={{ fontSize: "0.85rem" }}
                  >
                    <select className="form-select form-select-sm">
                      <option selected>Available Time</option>
                      {items.availableTime.map((time) => (
                        <option>{`${time.start_time} - ${time.end_time}, ${time.day}`}</option>
                      ))}
                    </select>
                  </div>
                </td>
                <td style={{ width: "14%" }}>
                  <div className="w-100 h-100 d-flex flex-row align-items-center justify-content-center pointer-cursor">
                    <TimeInput
                      value={items.start_time}
                      onChange={(value) =>
                        handleChange(index, "start_time", value)
                      }
                    />
                  </div>
                </td>
                <td style={{ width: "14%" }}>
                  <div className="w-100 h-100 d-flex flex-row align-items-center justify-content-center pointer-cursor">
                    <TimeInput
                      value={items.end_time}
                      onChange={(value) =>
                        handleChange(index, "end_time", value)
                      }
                    />
                  </div>
                </td>
                <td style={{ width: "14%" }}>
                  <div
                    className="w-100 h-100 d-flex flex-row align-items-center justify-content-center"
                    style={{ fontSize: "0.85rem" }}
                  >
                    <div className="d-flex flex-column">
                      <span>{items.duration || "N/A"}</span>
                    </div>
                  </div>
                </td>
                <td style={{ width: "1%" }}>
                  <div
                    className="w-100 h-100 d-flex flex-row align-items-center justify-content-center pointer-cursor"
                    style={{ fontSize: "0.85rem" }}
                    onClick={() => {
                      handleRemoveRow(index);
                    }}
                  >
                    <div className="d-flex flex-column">
                      <Icon
                        icon="qlementine-icons:trash-16"
                        width="15"
                        height="15"
                      />
                      <span style={{ fontSize: "0.65rem", opacity: 0 }}>
                        IC
                      </span>
                    </div>
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
export default CreateTimetableByPreference;
