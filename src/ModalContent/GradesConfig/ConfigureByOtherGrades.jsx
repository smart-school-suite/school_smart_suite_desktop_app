import {
  SingleSpinner,
} from "../../components/Spinners/Spinners";
import { Icon } from "@iconify/react";
import { useGetSchoolGradeCategories } from "../../hooks/schoolGradeCategory/useGetSchoolGradeCategory";
import { useCreateGradesByOtherGrades } from "../../hooks/examGrade/useCreateGradesByOtherGrades";
import CustomDropdown from "../../components/Dropdowns/Dropdowns";
import { useState } from "react";
function ConfigureByOtherGrades({ handleClose, rowData }) {
  const targetConfig = rowData.id;
  const [formData, setFormData] = useState({
    targetConfigId: "",
  });
  const { data: schoolGrades, isFetching } = useGetSchoolGradeCategories();
  const { mutate: createGrade, isPending } =
    useCreateGradesByOtherGrades(handleClose);
  const handleSaveChanges = () => {
    createGrade({ configId: formData.targetConfigId, targetConfigId:targetConfig  });
  };
  const handleSelect = (selectedValues) => {
    setFormData((prevalue) => ({
      ...prevalue,
      targetConfigId: selectedValues.id,
    }));
  };
  return (
    <>
      <div className="w-100">
        <div className="d-flex flex-row align-items-center">
          <div className="block w-100">
            <div className="d-flex flex-row align-items-center justify-content-between mb-3">
              <h5 className="m-0">Configure Exam Grades</h5>
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
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem
              harum nesciunt sunt
            </span>
          </div>
        </div>
        <div className="my-1">
          <span>Grade Category</span>
          {isFetching ? (
            <select name="" className="form-select">
              <option value="">loading</option>
            </select>
          ) : (
            <CustomDropdown
              data={schoolGrades.data}
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
          )}
        </div>
        <div className="d-flex flex-row align-items-center justify-content-end gap-2 w-100">
          <button
            disabled={isPending}
            className="border-none px-3 py-2 rounded-3 font-size-sm primary-background text-white w-100"
            onClick={() => {
              handleSaveChanges();
            }}
          >
            {isPending ? <SingleSpinner /> : "Configure Grade"}
          </button>
        </div>
      </div>
    </>
  );
}
export default ConfigureByOtherGrades;
