import { Icon } from "@iconify/react";
import {
  useFetchExamAssociateTimetableCoursesQuery,
  useFetchExamDetailsQuery,
} from "../../Slices/Asynslices/fetchSlice";
import Pageloaderspinner, {SingleSpinner} from "../../components/Spinners/Spinners";
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { convertTo24HourFormat } from "../../utils/functions";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastDanger from "../../components/Toast/ToastDanger";
import { useAddExamTimetableMutation } from "../../Slices/Asynslices/postSlice";
import {
  setExamDateRange,
  setData,
  updateField,
} from "../../Slices/Asynslices/ExamTimetableSlice";
import TimeInput from "../../components/FormComponents/TimeInput";
import { calculateExamDuration } from "../../utils/functions";
function CreateTimetable({ handleClose, row_id: examId }) {
  const dispatch = useDispatch();
  const [isCreating, setIsCreating] = useState(false);
  const [addExamTimetable] = useAddExamTimetableMutation();
  const formData = useSelector((state) => state.examtimetable.formData);
  const { data: examDetails, isLoading: isExamDetailsLoading } =
    useFetchExamDetailsQuery({
      exam_id: examId,
    });
  const { data: courses, isLoading: isCoursesLoading } =
    useFetchExamAssociateTimetableCoursesQuery({
      exam_id: examId,
    });
  useEffect(() => {
    if (courses?.data) {
      const initialData = courses.data.map((items) => ({
        course_id: items.course_id,
        examId: examId,
        start_time: "",
        end_time: "",
        date: "",
        course_name: items.course_name,
        specialty_id: examDetails.data.specialty_id,
        level_id: examDetails.data.level_id,
        student_batch_id: examDetails.data.student_batch_id,
        school_year: examDetails.data.school_year,
      }));
      dispatch(setData(initialData));
      dispatch(
        setExamDateRange({
          start_date: examDetails.data.start_date,
          end_date: examDetails.data.end_date,
        })
      );
    }
  }, [courses, examDetails, dispatch]);
  const handleCreateTimetable = async () => {
    const timeTableData = formData
      .filter(
        (item) =>
          item.start_time !== "" || item.end_time !== "" || item.date !== ""
      )
      .map((item) => ({
        school_year: item.school_year,
        date: item.date,
        end_time: convertTo24HourFormat(item.end_time),
        start_time: convertTo24HourFormat(item.start_time),
        duration: calculateExamDuration(item.start_time, item.end_time),
        level_id: item.level_id,
        course_id: item.course_id,
        exam_id: item.examId,
        specialty_id: item.specialty_id,
        student_batch_id: item.student_batch_id,
      }));

    const formattedData = {
      entries: timeTableData,
    };
    setIsCreating(true);
    try {
      await addExamTimetable({
        entries: formattedData,
        examId: examId,
      }).unwrap();
      setIsCreating(false);
      handleClose();
      toast.custom(
        <ToastSuccess
          title={"Time table Created✅"}
          description={"Exam Timetable Created Successfully"}
        />
      );
    } catch (e) {
      setIsCreating(false);
      toast.custom(
        <ToastDanger
          title={"Failed create time table ❌"}
          description={
            "Time table creation failed due to an error please try againg"
          }
        />
      );
    }
  };
  const handleTimeChange = useCallback((value, index, field) => {
    console.log(value, index, field);
    dispatch(updateField({ index, field, value: value }));
  }, []);
  if (isCoursesLoading || isExamDetailsLoading) {
    return <Pageloaderspinner />;
  }
  return (
    <>
      <div className="d-flex flex-row align-items-center justify-content-between mb-4 ">
        <h5>Create Exam Timetable {examId}</h5>
        <span
          onClick={() => {
            handleClose();
          }}
        >
          <Icon icon="charm:cross" width="22" height="22" />
        </span>
      </div>
      <div className="d-flex flex-row align-items-center justify-content-end gap-2 ">
        <button className="px-2 py-1 border-none  rounded-2 text-center">
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
            handleCreateTimetable();
          }}
        >
          {isCreating ? <SingleSpinner /> : "create Timetable"}
        </button>
      </div>
      <span>
        Exam Date Range <span>{examDetails.data.start_date}</span>{" "}
        {examDetails.data.end_date}{" "}
      </span>
      <div className="w-100 border rounded-3 mt-3 timetable-container">
        <table className="table table-responsive examtimetable-table">
          <thead>
            <tr>
              <th className="border-end">Course Title</th>
              <td>Date</td>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody className="examtimetable-body">
            {formData.map((items, index) => (
              <tr className="align-middle">
                <td className="border">{items.course_name}</td>
                <td>
                  <span
                    style={{
                      opacity: "0",
                    }}
                  >
                    {examDetails.data.start_date}
                  </span>
                  <input
                    type="date"
                    className="form-control"
                    name="date"
                    value={formData[index] ? formData[index].date : ""}
                    onChange={(e) =>
                      handleTimeChange(e.target.value, index, "date")
                    }
                  />
                  <span
                    className={`${
                      items.validation.date
                        ? "text-danger"
                        : items.validation.dateValid
                        ? "text-success"
                        : null
                    } font-size-sm`}
                    style={{
                      opacity: `${
                        items.validation.date || items.validation.dateValid
                          ? "1"
                          : "0"
                      } `,
                      transition: "all 0.2s",
                    }}
                  >
                    {items.validation.date}
                    {items.validation.dateValid}
                    {(items.validation.dateValid === null) &
                    (items.validation.date === null)
                      ? "testing"
                      : null}
                  </span>
                </td>
                <td>
                  <span
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
                    value={formData[index] ? formData[index].start_time : ""}
                  />
                  <span
                    className={`${
                      items.validation.start_time
                        ? "text-danger"
                        : items.validation.timeValid
                        ? "text-success"
                        : null
                    } font-size-sm`}
                    style={{
                      opacity: `${
                        items.validation.start_time ||
                        items.validation.timeValid
                          ? "1"
                          : "0"
                      } `,
                      transition: "all 0.2s",
                    }}
                  >
                    {items.validation.start_time}
                    {items.validation.timeValid}
                    {(items.validation.timeValid === null) &
                    (items.validation.start_time === null)
                      ? "testing"
                      : null}
                  </span>
                </td>
                <td>
                  <span
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
                    value={formData[index] ? formData[index].end_time : ""}
                  />
                  <span
                    className={`${
                      items.validation.end_time
                        ? "text-danger"
                        : items.validation.timeValid
                        ? "text-success"
                        : null
                    } font-size-sm`}
                    style={{
                      opacity: `${
                        items.validation.end_time || items.validation.timeValid
                          ? "1"
                          : "0"
                      } `,
                      transition: "all 0.2s",
                    }}
                  >
                    {items.validation.end_time}
                    {items.validation.timeValid}
                    {(items.validation.timeValid === null) &
                    (items.validation.end_time === null)
                      ? "testing"
                      : null}
                  </span>
                </td>
                <td>
                  {calculateExamDuration(
                    formData[index].start_time,
                    formData[index].end_time
                  )}
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
