import { useEffect, useState } from "react";
import { useGenerateTimetable } from "../../hooks/timetable/useGenerateTimetable";
import toast from "react-hot-toast";
import ToastWarning from "../../components/Toast/ToastWarning";
import { Icon } from "@iconify/react";
import { SingleSpinner } from "../../components/Spinners/Spinners";

function ViewTimetable({ handleClose, rowData }) {
  const { specialty_id, level_id, id, student_batch_id } = rowData;
  const { mutateAsync: generate, isPending } = useGenerateTimetable();
  const [timetable, setTimetable] = useState(null);

  const handleGenerate = async () => {
    generate(
      { specialty_id, level_id, semester_id: id, student_batch_id },
      {
        onSuccess: (data) => {
          setTimetable(data.data);
          console.table("Timetable generated successfully:", data);
        },
        onError: (error) => {
          toast.custom(
            <ToastWarning
              title={"Error Generating Timetable"}
              message={
                error?.response?.data?.message ||
                "An error occurred while generating the timetable."
              }
            />
          );
        },
      }
    );
  };

  useEffect(() => {
    if (rowData) {
      handleGenerate();
    }
  }, [rowData]);
  return (
    <>
      <div className="d-flex flex-row align-items-center justify-content-between mb-4">
        <h5>Generate Timetable</h5>
        <span
          onClick={() => {
            handleClose();
          }}
        >
          <Icon icon="charm:cross" width="22" height="22" />
        </span>
      </div>
      {isPending ? (
        <div className="d-flex justify-content-center my-4">
          <SingleSpinner />
        </div>
      ) : (
        <div className="card grades-box rounded-3">
          <table className="table table-responsive">
            <thead className="grades-thead">
              <tr>
                <th>Day</th>
                <th>Courses</th>
              </tr>
            </thead>
            <tbody>
              {timetable &&
                Object.entries(timetable).map(([day, courses]) => (
                  <tr key={day}>
                    <td className="font-size-sm text-capitalize">{day}</td>
                    <td style={{ width: "90%" }}>
                      <div className="d-flex flex-row align-items-center gap-1 w-100 flex-wrap gap-2">
                        {courses.length > 0 ? (
                          courses.map((course) => (
                            <TimetableCard
                              key={course.id}
                              courseTitle={course.course}
                              courseCode={course.course_code}
                              teacherName={course.teacher}
                              startTime={course.start_time}
                              endTime={course.end_time}
                            />
                          ))
                        ) : (
                          <span>No courses scheduled</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default ViewTimetable;

function TimetableCard({
  courseTitle,
  courseCode,
  teacherName,
  startTime,
  endTime,
}) {
  return (
    <div className="card rounded-3 p-2 d-flex gap-3" style={{ width: "25%" }}>
      <div className="d-flex flex-column">
        <span className="fw-semibold" style={{ fontSize: "0.7rem" }}>
          {courseTitle}
        </span>
        <span className="fw-light" style={{ fontSize: "0.75rem" }}>
          {courseCode}
        </span>
      </div>
      <div className="d-flex flex-column font-size-sm">
        <span className="fw-light">{teacherName}</span>
      </div>
      <div
        className="d-flex flex-row align-items-center fw-semibold gap-1"
        style={{ fontSize: "0.65rem" }}
      >
        <span>{startTime}</span>
        <span>
          <Icon icon="pajamas:dash" />
        </span>
        <span>{endTime}</span>
      </div>
    </div>
  );
}
