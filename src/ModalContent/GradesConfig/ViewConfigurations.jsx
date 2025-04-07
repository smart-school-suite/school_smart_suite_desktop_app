import Pageloaderspinner from "../../components/Spinners";
import { useFetchGradesByExamQuery } from "../../Slices/Asynslices/fetchSlice";
import { Icon } from "@iconify/react";
function ViewGradesConfig({ handleClose, row_id: examId }) {
  const { data: grades, isLoading } = useFetchGradesByExamQuery({
    examId: examId,
  });
  if (isLoading) {
    return <Pageloaderspinner />;
  }
  return (
    <>
      <div className="d-flex flex-row align-items-center">
        <div className="block w-100">
          <div className="d-flex flex-row align-items-center justify-content-between mb-3 w-100">
            <h5 className="m-0">Exam Grades Configuration</h5>
            <span
              className="m-0"
              onClick={() => {
                handleClose();
              }}
            >
              <Icon icon="charm:cross" width="22" height="22" />
            </span>
          </div>
          <span className="gainsboro-color font-size-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem harum
            nesciunt sunt
          </span>
        </div>
      </div>
     <div className="modalContainer">
     {
         grades.data.map((items) => (
            <div className="d-flex align-items-center justify-content-between my-1 w-100 border-bottom">
            <div className="py-2">
              <p className="my-0 font-size-sm">{items.grade_status}</p>
              <p className="my-0 font-size-sm fw-light">{items.determinant}</p>
              <p className="my-0 font-size-sm fw-semibold">{items.minimum_score} - {items.maximum_score}</p>
            </div>
            <span className="fw-bold">
                {items.lettergrade.letter_grade}
            </span>
          </div>
         ))
     }
     </div>
    </>
  );
}
export default ViewGradesConfig;
