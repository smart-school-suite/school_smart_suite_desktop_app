import { useGetResitExamCourse } from "../../hooks/resitExamTimetable/useGetResitExamCourse";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { useEffect, useCallback } from "react";
import { useCreateResitTimetable } from "../../hooks/resitExamTimetable/useCreateResitTimetable";
import { setData, setExamDateRange, updateField } from "../../Slices/Asynslices/ResitExamTimetableSlice";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "@iconify/react";
import TimeInput from "../../components/FormComponents/TimeInput";
import { formatDate } from "../../utils/functions";
function CreateTimetable({ handleClose, rowData }) {
  const { id:resitExamId, start_date, end_date, exam_name, } = rowData;
  const dispatch = useDispatch();
  const { mutate, isPending } =
    useCreateResitTimetable(handleClose);
  const formData = useSelector((state) => state.resitExamTimetable.formData);
  const { data: helperData, isFetching } = useGetResitExamCourse(resitExamId);
  useEffect(() => {
    if (helperData?.data) {
      const formatData = helperData.data.resitable_courses.map((items) => ({
        course_id: items.id,
        course_name: items.course_title,
        date:"",
        start_time: "",
        end_time: "",
        duration: "",
        levelId: items.level_id,
        specialtyId: items.specialty_id,
        examId: resitExamId,
      }));
      dispatch(setData(formatData));
      dispatch(setExamDateRange({ start_date, end_date }));
    }
  }, [helperData?.data, dispatch]);

    const handleChange = useCallback(
    (index, field, value) => {
      dispatch(updateField({ index, field, value }));
    },
    [dispatch]
  );

  const handleCreateTimetable = () => {
        const isEmpty = (value) =>
  value === null || value === undefined || value.toString().trim() === "";

const timeTableData = formData
  .filter(
    (item) =>
      !isEmpty(item.start_time) &&
      !isEmpty(item.end_time) &&
      !isEmpty(item.course_id) 
  )
  .map((item) => ({
    date:item.date,
    end_time: item.end_time,
    start_time: item.start_time,
    course_id: item.course_id,
    specialty_id: item.specialtyId,
    level_id: item.levelId,
    resit_exam_id:item.examId
  }));

    const formattedData = {
      entries: timeTableData,
    };

    mutate({ resitExamId:resitExamId, createData:formattedData });
  }
  if (isFetching) {
    return <SingleSpinner />;
  }
  return (
    <>
          <div className="d-flex flex-row align-items-center justify-content-between mb-4 ">
            <span>Create Resit Exam Timetable</span>
            <span
              onClick={() => {
                handleClose();
              }}
            >

              <Icon icon="charm:cross" width="22" height="22" />
            </span>
          </div>
          <div className="d-flex flex-row align-items-center justify-content-end gap-2 mb-2">
            <button 
              className="p-2 font-size-sm px-3 text-white border-none rounded-3 p-2 primary-background"
              onClick={() => { handleCreateTimetable(); }}
              >
              {
                 isPending ? <SingleSpinner /> : "Create Timetable"
              }
            </button>
          </div>
          <div className="my-1">
            <div className="d-flex flex-column gap-2">
              <div className="d-flex flex-row gap-2 font-size-sm align-items-center">
              <span>{exam_name}</span>
            </div>
              <div className="d-flex flex-row gap-2 font-size-sm align-items-center">
              <Icon icon="solar:calendar-broken" width="18" height="18" />
              <span>{formatDate(start_date)}</span>
              <Icon icon="pajamas:dash" width="12" height="12" />
              <span>{formatDate(end_date)}</span>
            </div>
            
            </div>
          </div>
          <div className="card grades-box rounded-3 border">
            <table className="table table-responsive font-size-sm">
              <thead className="grades-thead">
                <tr>
                  <th className="text-center">Course</th>
                  <th className="text-center">Date</th>
                  <th className="text-center">Start Time</th>
                  <th className="text-center">End Time</th>
                  <th className="text-center">Duration</th>
                </tr>
              </thead>
              <tbody>
                {formData.map((items, index) => (
                  <tr className="grades-tr">
                    <td style={{ width: "20%" }}>
                      <div
                        className="w-100 h-100 d-flex flex-row align-items-center justify-content-center"
                        style={{ fontSize: "0.85rem" }}
                      >
                        <div className="d-flex flex-column w-100">
                          <span>{items.course_name}</span>
                          <span style={{ fontSize: "0.65rem", opacity: 0 }}>
                            Error
                          </span>
                        </div>
                      </div>
                    </td>
                    <td style={{ width: "20%" }}>
                      <div
                        className="w-100 h-100 d-flex flex-row align-items-center justify-content-center"
                        style={{ fontSize: "0.85rem" }}
                      >
                        <div className="d-flex flex-column">
                          <input
                            type="date"
                            className="form-control form-control-sm"
                            name="date"
                            onChange={(e) =>
                              handleChange(index, "date", e.target.value)
                            }
                          />
                          <span style={{ fontSize: "0.65rem", opacity: 0 }}>
                            Error
                          </span>
                        </div>
                      </div>
                    </td>
                    <td style={{ width: "20%" }}>
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
                    <td style={{ width: "20%" }}>
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
                    <td style={{ width: "20%" }}>
                      <div
                        className="w-100 h-100 d-flex flex-row align-items-center justify-content-center"
                        style={{ fontSize: "0.85rem" }}
                      >
                        <div className="d-flex flex-column">
                          <span>{items.duration || "N/A"}</span>
                          <span style={{ fontSize: "0.65rem", opacity: 0 }}>
                            Error
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
