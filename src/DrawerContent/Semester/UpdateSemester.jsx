import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useUpdateSchoolSemester } from "../../hooks/schoolSemester/useUpdateSchoolSemester";
import { useGetSpecialties } from "../../hooks/specialty/useGetSpecialties";
import { useGetBatches } from "../../hooks/studentBatch/useGetBatches";
import { useGetSemester } from "../../hooks/semester/useGetSemesters";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { DateRangeInput } from "../../components/FormComponents/InputComponents";
import { dateRangeValidationSchema } from "../../ComponentConfig/YupValidationSchema";
import CustomDropdown from "../../components/Dropdowns/Dropdowns";
import {
  hasNonEmptyValue,
  optionalValidateObject,
} from "../../utils/functions";
import toast from "react-hot-toast";
import ToastWarning from "../../components/Toast/ToastWarning";
import { useGetSchoolSemesterDetails } from "../../hooks/schoolSemester/useGetSchoolSemesterDetails";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { NotFoundError } from "../../components/errors/Error";
import HorizontalDashedLine from "../../components/DashedLine/HorizonetalDashedLine";
import { useGetSchoolAcademicYears } from "../../hooks/academicYear/useGetSchoolAcademicYears";
function UpdateSemester({ handleClose, drawerData }) {
  const { id: semesterId } = drawerData;
  const {
    data: schoolSemesterDetails,
    isLoading: isSchoolSemeterDetailsLoading,
    error: schoolSemesterError,
  } = useGetSchoolSemesterDetails(semesterId);
  const {
    data: schoolAcademicYears,
    isLoading: isSchoolAcademicYearLoading,
    error: schoolAcademicYearError,
  } = useGetSchoolAcademicYears();
  const { data: semesters, isLoading: isFetchingSemesters } = useGetSemester();
  const { mutate: updateSchoolSemester, isPending } = useUpdateSchoolSemester(
    handleClose,
    semesterId,
  );
  const [formData, setFormData] = useState({
    start_date: "",
    end_date: "",
    school_year_id: "",
    semester_id: "",
  });
  const [isValid, setIsValid] = useState({
    start_date: null,
    end_date: null,
  });
  const [errors, setErrors] = useState({
    semester_id: "",
    school_year_id: "",
  });
  useEffect(() => {
    if (schoolSemesterDetails?.data) {
      setFormData((prev) => ({
        ...prev,
        start_date: schoolSemesterDetails.data.start_date,
        end_date: schoolSemesterDetails.data.end_date,
        school_year_id: { id: schoolSemesterDetails.data.school_year_id },
        semester_id: { id: schoolSemesterDetails.data.semester_id },
      }));
    }
  }, [isSchoolSemeterDetailsLoading, setFormData]);
  const handleStateChange = (field, value, stateFn) => {
    stateFn((prev) => ({ ...prev, [field]: value }));
  };
  const handleUpdateSchoolSemester = () => {
    if (optionalValidateObject(isValid) == false) {
      toast.custom(
        <ToastWarning
          title={"Invalid Fields"}
          description={"Please Ensure All Fields Are Valid Before Submitting"}
        />,
      );
      return;
    }
    if (hasNonEmptyValue(formData) == false) {
      toast.custom(
        <ToastWarning
          title={"Nothing To Update"}
          description={
            "Please Ensure Atleast One Field Is Updated Before Submitting"
          }
        />,
      );
      return;
    }
    updateSchoolSemester({
      schoolSemesterId: semesterId,
      updateData: {
        ...formData,
        semester_id: formData.semester_id.id,
        school_year_id: formData.school_year_id.id,
      },
    });
  };
  return (
    <>
      <div
        className="font-size-sm d-flex flex-column gap-4 pt-2"
        style={{ flex: 1, minHeight: 0 }}
      >
        {isSchoolSemeterDetailsLoading ||
        isSchoolAcademicYearLoading ? (
          <div className="d-flex flex-column w-100 gap-3">
            {[...Array(6)].map((_, index) => (
              <div className="d-flex flex-column gap-2 w-100" key={index}>
                <RectangleSkeleton width="25%" height="1dvh" />
                <RectangleSkeleton width="100%" height="5dvh" />
              </div>
            ))}
          </div>
        ) : schoolSemesterError || schoolAcademicYearError ? (
          <NotFoundError
            title={
              schoolSemesterError?.response?.data?.errors?.title ||
              schoolAcademicYearError?.response?.data?.errors?.title
            }
            description={
              schoolSemesterError?.response?.data?.errors?.description ||
              schoolAcademicYearError?.response?.data?.errors?.description
            }
          ></NotFoundError>
        ) : (
          <>
            <div className="drawer-content px-2 font-size-sm">
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
                <label htmlFor="schoolYear">School Year</label>
                <CustomDropdown
                  data={schoolAcademicYears?.data || []}
                  displayKey={["specialty_name", "school_year"]}
                  valueKey={["id"]}
                  direction="up"
                  isLoading={isSchoolAcademicYearLoading}
                  onSelect={(value) =>
                    handleStateChange("school_year_id", value, setFormData)
                  }
                  error={errors.school_year_id}
                  errorMessage="School Academic Year Required"
                  onError={(msg) =>
                    handleStateChange("school_year_id", msg, setErrors)
                  }
                  value={formData.school_year_id}
                />
              </div>
              <div>
                <label htmlFor="semester">Semester</label>
                <CustomDropdown
                  data={semesters?.data || []}
                  displayKey={["name"]}
                  valueKey={["id"]}
                  direction="up"
                  isLoading={isFetchingSemesters}
                  onSelect={(value) =>
                    handleStateChange("semester_id", value, setFormData)
                  }
                  error={errors.semester_id}
                  errorMessage="Semester Required"
                  onError={(msg) =>
                    handleStateChange("semester_id", msg, setErrors)
                  }
                  optional={true}
                  value={formData.semester_id}
                />
              </div>
            </div>
            <div className="drawer-footer font-size-sm">
              <div className="d-flex flex-column w-100">
                <HorizontalDashedLine
                  dashed={false}
                  color="#ccc"
                  thickness={0.5}
                />
                <div className="d-flex flex-row align-items-center justify-content-between p-2">
                  <button
                    className="border-none bg-none"
                    onClick={() => handleClose()}
                  >
                    Cancel
                  </button>
                  <button
                    className="border-none rounded-3 primary-background text-white font-size-sm px-3 py-2"
                    onClick={() => handleUpdateSchoolSemester()}
                    disabled={isPending}
                  >
                    {isPending ? <SingleSpinner /> : "Update Semester"}
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
export default UpdateSemester;
