import Pageloaderspinner from "../../components/Spinners/Spinners";
import { Icon } from "@iconify/react";
import { useGetGradeConfigDetails } from "../../hooks/schoolGradeCategory/useGetGradeConfigDetails";
function ViewGradesConfig({ handleClose, rowData }) {
  const { id:configId } = rowData;
  const { data:gradeConfigDetails, isLoading } = useGetGradeConfigDetails(configId);
  if (isLoading) {
    return <Pageloaderspinner />;
  }
  return (
    <>
      <div className="d-flex flex-row align-items-center">
        <div className="block w-100">
          <div className="d-flex flex-row align-items-center justify-content-between mb-3 w-100">
            <span className="m-0">Exam Grades Configuration</span>
            <span
              className="m-0"
              onClick={() => {
                handleClose();
              }}
            >
              <Icon icon="charm:cross" width="22" height="22" />
            </span>
          </div>
        </div>
      </div>
     <div className="modal-content-container">
     {
         gradeConfigDetails.data.map((items) => (
            <div className="d-flex align-items-center justify-content-between my-1 w-100">
            <div className="py-2">
              <p className="my-0 font-size-sm text-capitalize">{items.grade_status}</p>
              <p className="my-0 font-size-sm fw-semibold">{items.minimum_score} - {items.maximum_score}</p>
            </div>
            
          </div>
         ))
     }
     </div>
    </>
  );
}
export default ViewGradesConfig;
