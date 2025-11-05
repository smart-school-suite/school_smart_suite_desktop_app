import { useUpdateGradeSettings } from "../../../hooks/schoolBranchSetting/useUpdateGradeSetting";
import { MultiSelectDropdown } from "../../../components/Dropdowns/Dropdowns";
import RectangleSkeleton from "../../../components/SkeletonPageLoader/RectangularSkeleton";
import { useGetSchoolBranchSettingDetails } from "../../../hooks/schoolBranchSetting/useGetSchoolBranchSettingDetail";
import { useGetLetterGrades } from "../../../hooks/letterGrade/useGetLetterGrades";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import ToastWarning from "../../../components/Toast/ToastWarning";
import toast from "react-hot-toast";
import { SingleSpinner } from "../../../components/Spinners/Spinners";
import { NotFoundError } from "../../../components/errors/Error";
function UpdateAllowedGrades({ handleClose, rowData }) {
  const { id: schoolBranchSettingId } = rowData;
  const [formData, setFormData] = useState({
    school_branch_setting_id: rowData.id,
    value: "",
  });
  const [errors, setErrors] = useState({
    value: "",
  });
  const {
    data: settingDetails,
    isLoading: isSettingDetailsLoading,
    error: settingDetailsError,
  } = useGetSchoolBranchSettingDetails(schoolBranchSettingId);
  const {
    data: letterGrades,
    isLoading: isLetterGradesLoading,
    error: letterGradesError,
  } = useGetLetterGrades();
  const { mutate: updateGradeSetting, isPending } = useUpdateGradeSettings(
    handleClose,
    schoolBranchSettingId
  );
  useEffect(() => {
    if(settingDetails?.data){
         setFormData((prev) => ({...prev, 
             value:settingDetails.data.value.map((items) => ({
                 id:items.id,
                 letter_grade:items.letter_grade
             }))
         }))
    }
  }, [setFormData, isSettingDetailsLoading])
  const handleStateChange = (field, value, stateFn) => {
    stateFn((prev) => ({ ...prev, [field]: value }));
  };

  const handleUpdate = async () => {
     if(formData.value.length <= 0) {
         toast.custom(
         <ToastWarning 
            title={"No Grades Selected"} 
            description={"You Must Select Alteast 1 Letter Grade"}        
         />
     )
     return 
     }
     const payload = {
         value:JSON.stringify(formData.value.map((items) => ({letter_grade_id:items.id}))),
         school_branch_setting_id:formData.school_branch_setting_id
     }
     updateGradeSetting(payload);
  }
  return (
    <>
      <div className="d-flex flex-row align-items-center justify-content-between mb-3 w-100">
        <span>Update Allowed Letter Grades</span>
        <span
          className="m-0"
          onClick={() => {
            handleClose();
          }}
        >
          <Icon icon="charm:cross" width="22" height="22" />
        </span>
      </div>
      {isSettingDetailsLoading || isLetterGradesLoading ? (
        <div className="d-flex flex-column w-100 gap-3">
          {[...Array(1)].map((_, index) => (
            <div className="d-flex flex-column gap-2 w-100" key={index}>
              <RectangleSkeleton width="25%" height="1dvh" />
              <RectangleSkeleton width="100%" height="5dvh" />
            </div>
          ))}
        </div>
      ) : settingDetailsError || letterGradesError ? (
        <NotFoundError
          title={
            letterGradesError?.response?.data?.errors?.title ||
            settingDetailsError?.response?.data?.errors?.title
          }
          description={
            letterGradesError?.response?.data?.errors?.description ||
            settingDetailsError?.response?.data?.errors?.description
          }
        ></NotFoundError>
      ) : (
        <>
          <div>
            <label htmlFor="teacher" className="font-size-sm">
              Letter Grades
            </label>
            <MultiSelectDropdown
              data={
                letterGrades?.data.map((items) => ({
                  name: `Grade ${items.letter_grade}`,
                  id: items.id,
                })) || []
              }
              displayKey={["name"]}
              valueKey={["id"]}
              direction="up"
              isLoading={isLetterGradesLoading}
              placeholder={"Select Letter Grades"}
              errorMessage={"Teacher Reciepient Required"}
              onSelect={(value) =>
                handleStateChange("value", value, setFormData)
              }
              onError={(error) => handleStateChange("value", error, setErrors)}
              error={errors.value}
              optional={true}
              value={formData.value}
            />
          </div>
          <button
            className="border-none px-3 mt-2 py-2 rounded-3 font-size-sm primary-background text-white w-100"
            onClick={() => {
                handleUpdate();
            }}
            disabled={isPending}
          >
            {isPending ? <SingleSpinner /> : "Update Letter Grades"}
          </button>
        </>
      )}
    </>
  );
}
export default UpdateAllowedGrades;
