import Pageloaderspinner, { SingleSpinner } from "../../components/Spinners";
import { useFetchSchoolGradesConfigQuery } from "../../Slices/Asynslices/fetchSlice";
import { Icon } from "@iconify/react";
import { useState } from "react";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import { useConfigureByOtherGradeMutation } from "../../Slices/Asynslices/postSlice";
function ConfigureByOtherGrades({ handleClose, row_id: configId }) {
    const [gradeConfig, setGradeConfig] = useState(null);
    const [isCreating, setIsCreating] = useState(false);
    const [configureByOtherGrade] = useConfigureByOtherGradeMutation();
  const { data: schoolGradesConfig, isLoading: SchoolGradesConfigLoading } = useFetchSchoolGradesConfigQuery();
  const handleSelectGradeConfig = (gradeConfigId) => {
    setGradeConfig((prevId) =>
      prevId === gradeConfigId ? null : gradeConfigId
    );
  };
  const handleSaveChanges = async () => {
     if (gradeConfig === null) {
          toast.custom(
            <ToastWarning
              title={"No Grade Configured Selected ❌"}
              description={"⚠️ Please select a configuration."}
            />
          );
          return;
        }
        setIsCreating(true);
      try{
        await configureByOtherGrade({ configId:gradeConfig, targetConfigId:configId }).unwrap();
        setIsCreating(false);
        handleClose();
        toast.custom(
        <ToastSuccess
          title={"Added Successfully"}
          description={"Exam Grades Added Successfully"}
        />
      );
      }
      catch(e){
        setIsCreating(false)
        toast.custom(
            <ToastDanger
              title={"Failed to add exam grading ❌"}
              description={
                "❌ Something went wrong! Add Exam Grading failed due to an error. Please try again later."
              }
            />
          );
      }
  }
  if (SchoolGradesConfigLoading) {
    return <Pageloaderspinner />;
  }
  return (
    <>
      <div className="d-flex flex-row align-items-center justify-content-between mb-3">
        <h5 className="m-0">Add Exam Grading</h5>
        <span className="m-0" onClick={handleClose}>
          <Icon icon="charm:cross" width="22" height="22" />
        </span>
      </div>
      <span className="font-size-sm gainsboro-color">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum
        sint reprehenderit tempora. Aliquid
      </span>
      <div className="modalContainer">
        {schoolGradesConfig.data.filter((items) => items.isgrades_configured !== 0).map((item) => {
          const isChecked = gradeConfig === item.id;
          return (
            <div
              className="d-flex flex-row align-items-center gap-4 py-1"
              key={item.id}
            >
              <div className="w-100 border-bottom">
                <div className="d-block">
                  {item.isgrades_configured === 0 ? (
                    <span
                      className=" rounded-1 font-size-sm fw-light"
                      style={{
                        background: "#ffe3e1",
                        color: "#e22d20",
                        width: "auto",
                        maxWidth: "5rem",
                        padding: "0.2rem",
                      }}
                    >
                      <span>Grades UnConfigured</span>
                    </span>
                  ) : item.isgrades_configured === 1 ? (
                    <span
                      className=" rounded-1 font-size-sm fw-light mb-1"
                      style={{
                        background: "#e3f5e3",
                        color: "#2d6830",
                        width: "auto",
                        maxWidth: "5rem",
                        padding: "0.2rem",
                      }}
                    >
                      <span>Grades Configured</span>
                    </span>
                  ) : null}
                  <p className="my-0 fw-light">{item.grade_title}</p>
                  <span className="fw-semibold">
                    {item.max_score === null ? 0.0 : item.max_score}
                  </span>
                </div>
              </div>
              <input
                type="checkbox"
                className="form-check-input"
                checked={isChecked}
                onChange={() => handleSelectGradeConfig(item.id)}
              />
            </div>
          );
        })}
      </div>
      <button
        className=" w-100 p-2 font-size-sm px-3 primary-background border-none rounded-3 text-white"
        onClick={handleSaveChanges}
      >
        {
            isCreating ? <SingleSpinner /> : "Save Changes"
        }
      </button>
    </>
  );
}
export default ConfigureByOtherGrades;
