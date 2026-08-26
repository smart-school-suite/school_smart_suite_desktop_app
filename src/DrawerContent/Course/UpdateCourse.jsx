import {
  NumberInput,
  TextAreaInput,
  TextInput,
} from "../../components/FormComponents/InputComponents";
import CustomDropdown from "../../components/Dropdowns/Dropdowns";
import { useGetSemester } from "../../hooks/semester/useGetSemesters";
import { useGetSpecialties } from "../../hooks/specialty/useGetSpecialties";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useUpdateCourse } from "../../hooks/course/useUpdateCourse";
import {
  courseCodeSchema,
  nameSchema,
  numberSchema,
  textareaSchema,
} from "../../ComponentConfig/YupValidationSchema";
import {
  optionalValidateObject,
  hasNonEmptyValue,
} from "../../utils/functions";
import toast from "react-hot-toast";
import ToastWarning from "../../components/Toast/ToastWarning";
import { useGetCourseDetails } from "../../hooks/course/useGetCourseDetails";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { NotFoundError } from "../../components/errors/Error";
import { useGetCourseTypes } from "../../hooks/course/useGetCourseTypes";
import { MultiSelectDropdown } from "../../components/Dropdowns/Dropdowns";
import HorizontalDashedLine from "../../components/DashedLine/HorizonetalDashedLine";
function UpdateCourse({ handleClose, drawerData }) {
  const { id: courseId } = drawerData;
  const {
    data: courseDetails,
    isLoading: isCourseDetailsLoading,
    error: courseDetailError,
  } = useGetCourseDetails(courseId);
  const { data: courseTypes, isLoading: isCourseTypeLoading } =
    useGetCourseTypes();
  const {
    data: specialty,
    isFetching: isSpecailtyLoading,
    error: specialtyError,
  } = useGetSpecialties();
  const {
    data: semesters,
    isLoading: isSemesterLoading,
    error: semesterError,
  } = useGetSemester();
  const [formData, setFormData] = useState({
    course_code: "",
    course_title: "",
    credit: "",
    specialty_id: "",
    semester_id: "",
    description: "",
    type: [],
  });
  const [isValid, setIsValid] = useState({
    course_code: "",
    course_title: "",
    credit: "",
    description: "",
  });
  const [errors, setErrors] = useState({
    specialty_id: "",
    semester_id: "",
    type: "",
  });
  const { mutate: updateCourse, isPending } = useUpdateCourse(
    handleClose,
    courseId,
  );

  useEffect(() => {
    if (courseDetails?.data) {
      setFormData((prev) => ({
        ...prev,
        course_code: courseDetails.data.course_code,
        course_title: courseDetails.data.course_title,
        credit: courseDetails.data.credit,
        specialty_id: courseDetails.data.specialty_id,
        semester_id: courseDetails.data.semester_id,
        description: courseDetails.data.description,
        type: courseDetails.data.types.map((type) => ({
          id: type.id,
        })),
      }));
    }
  }, [setFormData, isCourseDetailsLoading]);

  const handleStateChange = (field, value, stateFn) => {
    stateFn((prev) => ({ ...prev, [field]: value }));
  };
  const handleSubmit = async () => {
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
    updateCourse({
      courseId,
      updateData: {
        ...formData,
        typeIds: formData.type.map((items) => ({
          type_id: items.id,
        })),
      },
    });
  };
  return (
    <>
      <div
        className="font-size-sm d-flex flex-column gap-4 pt-2"
        style={{ flex: 1, minHeight: 0 }}
      >
        {isCourseDetailsLoading || isSpecailtyLoading || isSemesterLoading ? (
          <div className="d-flex flex-column w-100 gap-3">
            {[...Array(6)].map((_, index) => (
              <div className="d-flex flex-column gap-2 w-100" key={index}>
                <RectangleSkeleton width="25%" height="1dvh" />
                <RectangleSkeleton width="100%" height="5dvh" />
              </div>
            ))}
          </div>
        ) : courseDetailError || specialtyError || semesterError ? (
          <NotFoundError
            title={
              specialtyError?.response?.data?.errors?.title ||
              semesterError?.response?.data?.errors?.title ||
              courseDetailError?.response?.data?.errors?.title
            }
            description={
              specialtyError?.response?.data?.errors?.description ||
              semesterError?.response?.data?.errors?.description ||
              courseDetailError?.response?.data?.errors?.description
            }
          ></NotFoundError>
        ) : (
          <>
            <div className="drawer-content px-2">
              <div>
                <label htmlFor="courseTitle" className="font-size-sm">
                  Course Title
                </label>
                <TextInput
                  onChange={(value) =>
                    handleStateChange("course_title", value, setFormData)
                  }
                  onValidationChange={(value) =>
                    handleStateChange("course_title", value, setIsValid)
                  }
                  validationSchema={nameSchema({
                    min: 3,
                    max: 150,
                    required: false,
                    messages: {
                      min: "Course Title Must Be Atleast 3 Characters Long",
                      max: "Course Title Must Not Exceed 150 Characters",
                    },
                  })}
                  value={formData.course_title}
                />
              </div>
              <div className="d-flex flex-row align-items-center gap-2">
                <div className="w-50">
                  <label htmlFor="courseCode" className="font-size-sm">
                    Course Code
                  </label>
                  <TextInput
                    onChange={(value) =>
                      handleStateChange("course_code", value, setFormData)
                    }
                    onValidationChange={(value) =>
                      handleStateChange("course_code", value, setIsValid)
                    }
                    validationSchema={courseCodeSchema({
                      required: false,
                      min: 3,
                      max: 10,
                      messages: {
                        min: "Course Code Must Be Atleast 3 Characters Long",
                        max: "Course Code Must Not Exceed 10 Characters",
                      },
                    })}
                    value={formData.course_code}
                  />
                </div>
                <div className="w-50">
                  <label htmlFor="courseCredit" className="font-size-sm">
                    Course Credit
                  </label>
                  <NumberInput
                    onChange={(value) =>
                      handleStateChange("credit", value, setFormData)
                    }
                    onValidationChange={(value) =>
                      handleStateChange("credit", value, setIsValid)
                    }
                    validationSchema={numberSchema({
                      min: 1,
                      max: 10,
                      required: false,
                      integerOnly: true,
                      messages: {
                        min: "Course Credit Must Be Atleast 1",
                        max: "Course Code Must Not Exceed 10",
                      },
                    })}
                    value={formData.credit}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="hallType" className="font-size-sm">
                  Course Type
                </label>
                <MultiSelectDropdown
                  data={courseTypes?.data || []}
                  value={formData.type}
                  displayKey={["name", "description"]}
                  valueKey={["id"]}
                  direction="up"
                  isLoading={isCourseTypeLoading}
                  placeholder={"Select Course Type"}
                  errorMessage={"Course Type Required"}
                  onSelect={(value) =>
                    handleStateChange("type", value, setFormData)
                  }
                  onError={(error) =>
                    handleStateChange("type", error, setErrors)
                  }
                  error={errors.type}
                  optional={false}
                />
              </div>
              <div>
                <label htmlFor="semester" className="font-size-sm">
                  Semester
                </label>
                <CustomDropdown
                  data={semesters.data}
                  displayKey={["name"]}
                  valueKey={["id"]}
                  filter_array_keys={["id", "name"]}
                  renameMapping={{ id: "id", name: "name" }}
                  isLoading={isSemesterLoading}
                  direction="up"
                  onSelect={(value) =>
                    handleStateChange("semester_id", value, setFormData)
                  }
                  error={errors.semester_id}
                  onError={(value) =>
                    handleStateChange("semester_id", value, setErrors)
                  }
                  placeholder="Select Semester"
                  value={formData.semester_id}
                />
              </div>
              <div>
                <label htmlFor="specialty" className="font-size-sm">
                  Specialty
                </label>
                <CustomDropdown
                  data={specialty.data}
                  displayKey={["specialty_name", "level_name"]}
                  valueKey={["id"]}
                  isLoading={isSpecailtyLoading}
                  direction="up"
                  onSelect={(value) =>
                    handleStateChange("specialty_id", value, setFormData)
                  }
                  error={errors.specialty_id}
                  onError={(value) =>
                    handleStateChange("specialty_id", value, setErrors)
                  }
                  placeholder="Select Specailty"
                  value={formData.specialty_id}
                />
              </div>
              <div>
                <label htmlFor="courseDescription" className="font-size-sm">
                  Course Description
                </label>
                <TextAreaInput
                  onChange={(value) =>
                    handleStateChange("description", value, setFormData)
                  }
                  validationSchema={textareaSchema({
                    min: 10,
                    max: 1000,
                    required: false,
                    messages: {
                      min: "Description Must Be Atleast 10 Characters Long",
                      max: "Description Must Not Exceed 1000 Characters",
                    },
                  })}
                  onValidationChange={(value) =>
                    handleStateChange("description", value, setIsValid)
                  }
                  value={formData.description}
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
                    onClick={() => handleSubmit()}
                    disabled={isPending}
                  >
                    {isPending ? <SingleSpinner /> : "Update Course"}
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
export default UpdateCourse;
