import { Icon } from "@iconify/react";
import TimeInput from "../../components/FormComponents/TimeInput";
import { useEffect } from "react";
import { useGetCoursesBySpecialtySemester } from "../../hooks/course/useGetCoursesBySpecialtyAndSemester";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { useGetTeacherBySpecialty } from "../../hooks/teacher/useGetTeacherBySpecialty";
import { useDispatch, useSelector } from "react-redux";
import {
  setFormData,
  addRow,
  removeRow,
  updateFormRow,
} from "../../Slices/Asynslices/SpecialtyTimetableSlice";
import { useCreateTimetable } from "../../hooks/timetable/useCreateTimetable";
function CreateTimetable({ handleClose, rowData }) {
  const { specialty_id, semester_id, student_batch_id, level_id, id:schoolSemesterId } = rowData;
  const dispatch = useDispatch();
  const { data: courses, isFetching} = useGetCoursesBySpecialtySemester(
    specialty_id,
    semester_id
  );
  const { data: teachers, isFetching: teacherFetching } =
    useGetTeacherBySpecialty(specialty_id);
  const formData = useSelector((state) => state.specialtyTimetable.formData);
  const { mutate: createTimetable, isPending } = useCreateTimetable(handleClose);
  useEffect(() => {
    if (teachers?.data) {
      const initialFormData = teachers.data.map(() => ({
        teacher_id: "",
        course_id: "",
        day: "",
        start_time: "",
        end_time: "",
        duration: "",
        semesterId: schoolSemesterId,
        specialtyId: specialty_id,
        studentBatchId: student_batch_id,
        levelId:level_id,
        validation: {
          start_time: null,
          end_time: null,
          clash: null,
          valid: null,
          conflictWith: [],
        },
      }));
      dispatch(setFormData(initialFormData));
    }
  }, [teachers?.data, dispatch]);

  const handleChange = (index, key, value) => {
    dispatch(updateFormRow({ index, key, value }));
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
    day_of_week: item.day,
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
      <div className="mb-3 d-flex flex-row w-100 align-items-center justify-content-end">
        <button className="border-none rounded-3 primary-background text-white font-size-sm px-3 py-2"
          onClick={() => {
             handleCreateTimetable();
          }}
        >
            {
                 isPending ? <SingleSpinner /> : "Create Timetable"
            }
        </button>
      </div>
      <div className="card grades-box rounded-3 border">
        <table className="table table-responsive font-size-sm">
          <thead className="grades-thead">
            <tr>
              <th>Action</th>
              <th className="text-center">Instructor</th>
              <th className="text-center">Course</th>
              <th className="text-center">Day</th>
              <th className="text-center">Start Time</th>
              <th className="text-center">End Time</th>
              <th className="text-center">Duration</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {formData?.map((items, index) => (
              <tr className="grades-tr" key={index}>
                <td style={{ width: "5%" }}>
                  <div
                    className="w-100 h-100 d-flex flex-row align-items-center justify-content-center pointer-cursor"
                    style={{ fontSize: "0.85rem" }}
                    onClick={() => dispatch(addRow({ index, row: items }))}
                  >
                    <div className="d-flex flex-column">
                      <Icon
                        icon="ic:round-plus"
                        width="15"
                        height="15"
                      />
                      <span style={{ fontSize: "0.65rem", opacity: 0 }}>
                        IC
                      </span>
                    </div>
                  </div>
                </td>
                <td style={{ width: "15%" }}>
                  <div
                    className="w-100 h-100 d-flex flex-row align-items-center justify-content-center"
                    style={{ fontSize: "0.85rem" }}
                  >
                    <div className="d-flex flex-column">
                      <select
                        className={`form-select form-select-sm ${
                          items.validation.clash && "is-invalid"
                        }`}
                        name="teacher_id"
                        value={items.teacher_id}
                        onChange={(e) =>
                          handleChange(index, "teacher_id", e.target.value)
                        }
                      >
                        <option value="">Select Teacher</option>
                        {teacherFetching ? (
                          <SingleSpinner />
                        ) : (
                          teachers.data.map((teacher) => (
                            <option key={teacher.id} value={teacher.id}>
                              {teacher.name}
                            </option>
                          ))
                        )}
                      </select>
                      <span style={{ fontSize: "0.65rem", opacity: 0 }}>
                        Error
                      </span>
                    </div>
                  </div>
                </td>
                <td style={{ width: "15%" }}>
                  <div
                    className="w-100 h-100 d-flex flex-row align-items-center justify-content-center"
                    style={{ fontSize: "0.85rem" }}
                  >
                    <div className="d-flex flex-column">
                      <select
                        name="course_id"
                        className={`form-select form-select-sm ${
                          items.validation.clash && "is-invalid"
                        }`}
                        value={items.course_id}
                        onChange={(e) =>
                          handleChange(index, "course_id", e.target.value)
                        }
                      >
                        <option value="">Select Course</option>
                        {isFetching ? (
                          <SingleSpinner />
                        ) : (
                          courses.data.map((course) => (
                            <option key={course.id} value={course.id}>
                              {course.course_title}
                            </option>
                          ))
                        )}
                      </select>
                      <span style={{ fontSize: "0.65rem", opacity: 0 }}>
                        Error
                      </span>
                    </div>
                  </div>
                </td>
                <td style={{ width: "15%" }}>
                  <div
                    className="w-100 h-100 d-flex flex-row align-items-center justify-content-center"
                    style={{ fontSize: "0.85rem" }}
                  >
                    <div className="d-flex flex-column">
                      <select
                        className={`form-select form-select-sm ${
                          items.validation.clash && "is-invalid"
                        }`}
                        name="day"
                        value={items.day}
                        onChange={(e) =>
                          handleChange(index, "day", e.target.value)
                        }
                      >
                        <option value="">Select Day</option>
                        <option value="monday">Monday</option>
                        <option value="tuesday">Tuesday</option>
                        <option value="wednesday">Wednesday</option>
                        <option value="thursday">Thursday</option>
                        <option value="friday">Friday</option>
                        <option value="saturday">Saturday</option>
                        <option value="sunday">Sunday</option>
                      </select>
                      <span style={{ fontSize: "0.65rem", opacity: 0 }}>
                        Error
                      </span>
                    </div>
                  </div>
                </td>
                <td style={{ width: "15%" }}>
                  <div
                    className="w-100 h-100 d-flex flex-row align-items-center justify-content-center"
                    style={{ fontSize: "0.85rem" }}
                  >
                    <div className="d-flex flex-column">
                      <TimeInput
                        value={items.start_time}
                        onChange={(value) =>
                          handleChange(index, "start_time", value)
                        }
                      />
                      <span style={{ fontSize: "0.65rem", opacity: 0 }}>
                        Error
                      </span>
                    </div>
                  </div>
                </td>
                <td style={{ width: "15%" }}>
                  <div
                    className="w-100 h-100 d-flex flex-row align-items-center justify-content-center"
                    style={{ fontSize: "0.85rem" }}
                  >
                    <div className="d-flex flex-column">
                      <TimeInput
                        value={items.end_time}
                        onChange={(value) =>
                          handleChange(index, "end_time", value)
                        }
                      />
                      <span style={{ fontSize: "0.65rem", opacity: 0 }}>
                        Error
                      </span>
                    </div>
                  </div>
                </td>
                <td style={{ width: "15%" }}>
                  <div
                    className="w-100 h-100 d-flex flex-row align-items-center justify-content-center"
                    style={{ fontSize: "0.85rem" }}
                  >
                    <div className="d-flex flex-column">
                      <span
                        className={items.validation.clash ? "text-danger" : ""}
                      >
                        {items.duration || "N/A"}
                      </span>
                      <span style={{ fontSize: "0.65rem", opacity: 0 }}>
                        Error
                      </span>
                    </div>
                  </div>
                </td>
                <td style={{ width: "5%" }}>
                  <div
                    className="w-100 h-100 d-flex flex-row align-items-center justify-content-center pointer-cursor"
                    style={{ fontSize: "0.85rem" }}
                    onClick={() => dispatch(removeRow({ index }))}
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

export default CreateTimetable;
