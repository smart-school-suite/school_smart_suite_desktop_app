import { Icon } from "@iconify/react";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatDate } from "../../utils/functions";
import {
  setExamDateRange,
  setData,
  updateField,
} from "../../Slices/Asynslices/ExamTimetableSlice";
import TimeInput from "../../components/FormComponents/TimeInput";
import { useGetExamTimetableHelperData } from "../../hooks/examTimetable/useGetExamTimetableHelperData";
import { useCreateExamTimetable } from "../../hooks/examTimetable/useCreateExamTimetable";
import { useSelector } from "react-redux";
function CreateTimetable({ handleClose, rowData }) {
  const { id, start_date, end_date, exam_name, batchId, school_year } = rowData;
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);
  const { mutate, isPending } =
    useCreateExamTimetable(handleClose);
  const formData = useSelector((state) => state.examtimetable.formData);
  const { data: helperData, isFetching } = useGetExamTimetableHelperData(id);
  useEffect(() => {
    if (helperData?.data) {
      const formatData = helperData.data.map((items) => ({
        course_id: items.course_id,
        course_name: items.course_name,
        date:"",
        start_time: "",
        end_time: "",
        duration: "",
        schoolYear:school_year,
        batchId:batchId,
        levelId: items.level_id,
        specialtyId: items.specialty_id,
        examId: items.exam_id,
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
    exam_id: item.examId,
    student_batch_id:item.batchId,
    level_id: item.levelId,
    school_year:item.schoolYear
  }));

    const formattedData = {
      entries: timeTableData,
    };

    mutate({ examId:id, timetableData:formattedData });
  }
  if (isFetching) {
    return <SingleSpinner />;
  }

  return (
    <>
      <div className="d-flex flex-row align-items-center justify-content-between mb-4 ">
        <h5>Create Exam Timetable</h5>
        {console.table(formData)}
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
        <table className={`${darkMode ? 'table-dark' : null} table-responsive table`}>
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
