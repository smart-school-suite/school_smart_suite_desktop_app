import { Icon } from "@iconify/react";
import {
  useFetchExamAssociateTimetableCoursesQuery,
  useFetchExamDetailsQuery,
} from "../../Slices/Asynslices/fetchSlice";
import {SingleSpinner} from "../../components/Spinners/Spinners";
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
import { useGetExamTimetableHelperData } from "../../hooks/examTimetable/useGetExamTimetableHelperData";
import { useCreateExamTimetable } from "../../hooks/examTimetable/useCreateExamTimetable";
function CreateTimetable({ handleClose, rowData }) {
  const { id } = rowData;
  const dispatch = useDispatch();
  const { mutate:createTimetable, isPending } = useCreateExamTimetable(handleClose);
  const formData = useSelector((state) => state.examtimetable.formData);
  const { data:helperData, isFetching } = useGetExamTimetableHelperData(id);
  if(isFetching){
    return <SingleSpinner />
  }
 
  return (
    <>
      <div className="d-flex flex-row align-items-center justify-content-between mb-4 ">
        <h5>Create Exam Timetable</h5>
        {console.table(helperData)}
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
          
        >
          Create Timetable
        </button>
      </div>
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
            
          </tbody>
        </table>
      </div>
    </>
  );
}
export default CreateTimetable;
