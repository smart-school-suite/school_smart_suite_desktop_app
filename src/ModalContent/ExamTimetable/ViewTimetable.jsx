import { Icon } from "@iconify/react";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { useGetExamTimetable } from "../../hooks/examTimetable/useGetExamTimetable";
import { formatDate } from "../../utils/functions";
function ViewTimetable({ handleClose, rowData }){
   const {id:examId} = rowData;
   const { data:timetableData, isFetching } = useGetExamTimetable(examId);
   if(isFetching){
    return <SingleSpinner />
   }
    return(
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
           <div className="card grades-box rounded-3">
          <table className="table table-responsive">
            <thead className="grades-thead">
              <tr>
                <th>Day</th>
                <th>Courses</th>
              </tr>
            </thead>
            <tbody>
              {timetableData &&
                Object.entries(timetableData.data).map(([date, courses]) => (
                  <tr key={date}>
                    <td className="font-size-sm text-capitalize">{formatDate(date)}</td>
                    <td style={{ width: "90%" }}>
                      <div className="d-flex flex-row align-items-center gap-1 w-100 flex-wrap gap-2">
                        {courses.length > 0 ? (
                          courses.map((course) => (
                            <TimetableCard
                              key={course.id}
                              courseTitle={course.course_title}
                              courseCode={course.course_code}
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
        </>
    )
}
export default ViewTimetable;

function TimetableCard({
  courseTitle,
  courseCode,
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
