import { SingleSpinner } from "../../components/Spinners/Spinners";
import { useBulkCreateGradesByTargetCategory } from "../../hooks/schoolGradeCategory/useBulkCreateGradesByTargetCategory";
import { useState } from "react";
import { Icon } from "@iconify/react";
import CustomDropdown from "../../components/Dropdowns/Dropdowns";
import { useGetSchoolGradeCategories } from "../../hooks/schoolGradeCategory/useGetSchoolGradeCategory";
function BulkCreateGradesByTargetCategory({ handleClose, bulkData, resetAll }) {
  const { data: schoolGrades, isFetching } = useGetSchoolGradeCategories();
  const [formData, setFormData] = useState({
    targetConfigId: "",
  });
  const handleSelect = (selectedValues) => {
    setFormData((prevalue) => ({
      ...prevalue,
      targetConfigId: selectedValues.id,
    }));
  };
  const { mutate: createGrades, isPending } =
    useBulkCreateGradesByTargetCategory(handleClose, resetAll);
  const formattedData = bulkData.map((items) => ({
    grade_config_id: items.id,
  }));
  const handleCreateGrades = () => {
    createGrades({ target_config_id: formData.targetConfigId, configIds: formattedData });
  };
  return (
    <>
      <div className="w-100">
        <div className="d-flex flex-row align-items-center">
          <div className="block w-100">
            <div className="d-flex flex-row align-items-center justify-content-between mb-3">
              <span className="m-0">Configure Exam Grades</span>
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
        <div className="my-1">
           <label htmlFor="gradeCategory" className="font-size-sm">Grade Category</label>
            <CustomDropdown
              data={schoolGrades.data ? schoolGrades?.data : [] }
              displayKey={["grade_title", "max_score"]}
              valueKey={["id"]}
              filter_array_keys={["id", "grade_title", "max_score"]}
              renameMapping={{
                id: "id",
                grade_title: "grade_title",
                max_score: "max_score",
              }}
              isLoading={isFetching}
              direction="up"
              onSelect={handleSelect}
            />
        </div>
        <div className="d-flex flex-row align-items-center justify-content-end gap-2 w-100">
          <button
            disabled={isPending}
            className="border-none px-3 py-2 rounded-3 font-size-sm primary-background text-white w-100"
            onClick={() => {
              handleCreateGrades();
            }}
          >
            {isPending ? <SingleSpinner /> : "Configure Grade"}
          </button>
        </div>
      </div>
    </>
  );
}
export default BulkCreateGradesByTargetCategory;
