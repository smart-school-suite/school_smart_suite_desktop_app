import { useBulkUpdateSchoolSemester } from "../../hooks/schoolSemester/useBulkUpdateSchoolSemesters";
import { useGetSemester } from "../../hooks/semester/useGetSemesters";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { Icon } from "@iconify/react";
import { DateRangeInput } from "../../components/FormComponents/InputComponents";
import { dateRangeValidationSchema } from "../../ComponentConfig/YupValidationSchema";
import { SchoolYearSelector } from "../../components/FormComponents/YearPicker";
import CustomDropdown from "../../components/Dropdowns/Dropdowns";
import {
  hasNonEmptyValue,
  optionalValidateObject,
} from "../../utils/functions";
import toast from "react-hot-toast";
import ToastWarning from "../../components/Toast/ToastWarning";
import { useState } from "react";
function BulkUpdateSemester({ handleClose, resetAll, bulkData }) {
      const { data: semesters, isLoading: isFetchingSemesters } =
        useGetSemester();
      const { mutate:updateSchoolSemester, isPending } = useBulkUpdateSchoolSemester(handleClose, resetAll);
      const [formData, setFormData] = useState({
        start_date: "",
        end_date: "",
        school_year: "",
        semester_id: "",
      });
      const [isValid, setIsValid] = useState({
        start_date: null,
        end_date: null,
      })
      const [errors, setErrors] = useState({
        student_batch_id: "",
        school_year: "",
      });
        const handleStateChange = (field, value, stateFn) => {
        stateFn((prev) => ({ ...prev, [field]: value }));
      };
      const handleUpdateSchoolSemester = () => {
        if(optionalValidateObject(isValid) == false){
              toast.custom(
                <ToastWarning 
                   title={"Invalid Fields"}
                   description={"Please Ensure All Fields Are Valid Before Submitting"}
                />
              )
              return;
            }
            if(hasNonEmptyValue(formData) == false){
              toast.custom(
                 <ToastWarning 
                   title={"Nothing To Update"}
                  description={"Please Ensure Atleast One Field Is Updated Before Submitting"}
                 />
              )
              return;
            }
          const formattedData = bulkData.map((items) => ({ 
              school_semester_id:items.id,
              start_date:formData.start_date,
              end_date:formData.end_date,
              school_year:formData.school_year,
              semester_id:formData.semester_id,
          }))
          updateSchoolSemester({ school_semester:formattedData })
      };
  return (
    <>
      <div>
        <div className="d-flex flex-row align-items-center justify-content-between mb-3">
          <span className="m-0">Bulk Update Semester</span>
          <span
            className="m-0"
            onClick={() => {
              handleClose();
            }}
          >
            <Icon icon="charm:cross" width="22" height="22" />
          </span>
        </div>
        <DateRangeInput
          onEndDateChange={(value) =>
            handleStateChange("end_date", value, setFormData)
          }
          onStartDateChange={(value) =>
            handleStateChange("start_date", value, setFormData)
          }
          onStartDateValidationChange={(value) =>
            handleStateChange("start_date", value, setIsValid)
          }
          onEndDateValidationChange={(value) =>
            handleStateChange("end_date", value, setIsValid)
          }
          validationSchema={dateRangeValidationSchema({
            optional: true,
            futureOnly: true,
          })}
          startValue={formData.start_date}
          endValue={formData.end_date}
        />
        <div>
          <label htmlFor="schoolYear" className="font-size-sm">
            School Year
          </label>
          <SchoolYearSelector
            onSelect={(value) =>
              handleStateChange("school_year", value, setFormData)
            }
            onError={(value) =>
              handleFieldError("school_year", value, setErrors)
            }
            error={errors.school_year}
          />
        </div>
        <div>
          <label htmlFor="semester" className="font-size-sm">
            Semester
          </label>
          <CustomDropdown
            data={semesters?.data || []}
            displayKey={["name"]}
            valueKey={["id"]}
            direction="up"
            isLoading={isFetchingSemesters}
            onSelect={(value) =>
              handleStateChange("semester_id", value.id, setFormData)
            }
            error={errors.semester_id}
            errorMessage="Semester Required"
            onError={(msg) => handleStateChange("semester_id", msg, setErrors)}
            optional={true}
            placeholder="Select Semester"
          />
        </div>
      </div>
      <div className="d-flex mt-3 flex-row align-items-center justify-content-end gap-2 w-100">
        <button
          className="border-none px-3 py-2 rounded-3 font-size-sm primary-background text-white w-100"
          disabled={isPending}
          onClick={() => {
            handleUpdateSchoolSemester();
          }}
        >
          {isPending ? <SingleSpinner /> : "Update Semester"}
        </button>
      </div>
    </>
  );
}
export default BulkUpdateSemester;
