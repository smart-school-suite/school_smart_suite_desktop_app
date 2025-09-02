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
                 <span>Generate Timetable</span>
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
                <th className="font-size-sm">Day</th>
                <th className="font-size-sm">Courses</th>
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
                            <div style={{ width:"32%" }}>
                               <SlotCard
                              key={course.id}
                              courseTitle={course.course_title}
                              courseCode={course.course_code}
                              courseCredit={course.credit}
                              startTime={course.start_time}
                              endTime={course.end_time}
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
        </>
    )
}
export default ViewTimetable;

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
