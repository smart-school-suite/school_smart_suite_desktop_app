import { useEffect, useState } from "react";
import { useGenerateTimetable } from "../../hooks/timetable/useGenerateTimetable";
import { Icon } from "@iconify/react";
import { SingleSpinner } from "../../components/Spinners/Spinners";

function ViewTimetable({ handleClose, rowData }) {
  const { specialty_id, level_id, id, student_batch_id } = rowData;
  const { mutateAsync: generate, isPending } = useGenerateTimetable();
  const [timetable, setTimetable] = useState(null);

  const handleGenerate = async () => {
      const timetable = await generate({ specialty_id, level_id, semester_id: id, student_batch_id });
      setTimetable(timetable.data);
  };

  useEffect(() => {
    if (rowData) {
      handleGenerate();
    }
  }, [rowData]);
  return (
    <>
      <div className="d-flex flex-row align-items-center justify-content-between mb-4">
        <span>Generate Timetable</span>
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
                            <div style={{ width:"32%" }}> 
                               <SlotCard
                              key={course.id}
                              courseTitle={course.course}
                              courseCode={course.course_code}
                              teacherName={course.teacher}
                              startTime={course.start_time}
                              endTime={course.end_time}
                              duration={course.duration}
                              courseCredit={course.credit}
                            />
                            </div>
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

