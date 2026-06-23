import { useRef, useState } from "react";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { Icon } from "@iconify/react";
import CustomDropdown from "../../components/Dropdowns/Dropdowns";
import { useCreateCourse } from "../../hooks/course/useCreateCourse";
import { useGetSemester } from "../../hooks/semester/useGetSemesters";
import { useGetSpecialties } from "../../hooks/specialty/useGetSpecialties";
import { useCreateJointCourse } from "../../hooks/jointCourse/useCreateJointCourse";
import {
  NumberInput,
  TextAreaInput,
  TextInput,
} from "../../components/FormComponents/InputComponents";
import {
  courseCodeSchema,
  nameSchema,
  numberSchema,
  textareaSchema,
} from "../../ComponentConfig/YupValidationSchema";
import { allFieldsValid } from "../../utils/functions";
import toast from "react-hot-toast";
import ToastWarning from "../../components/Toast/ToastWarning";
import { MultiSelectDropdown } from "../../components/Dropdowns/Dropdowns";
import { useGetCourseTypes } from "../../hooks/course/useGetCourseTypes";
function CreateJointCourse({ handleClose }) {
  const courseCodeRef = useRef();
  const courseTitleRef = useRef();
  const courseCreditRef = useRef();
  const specialtyRef = useRef();
  const semesterRef = useRef();
  const descriptionRef = useRef();
  const typeRef = useRef();
  const { data: courseTypes, isLoading: isCourseTypeLoading } =
    useGetCourseTypes();
  const [formData, setFormData] = useState({
    course_code: "",
    course_title: "",
    credit: "",
    specialties: [],
    semester_id: "",
    description: "",
    type: [],
  });
  const [isFieldValid, setFieldValid] = useState({
    course_code: null,
    course_title: null,
    credit: null,
    description: null,
  });
  const [errors, setErrors] = useState({
    specialties: null,
    semester_id: "",
    type: null,
  });
  const { mutate: createCourseMutation, isPending } =
    useCreateJointCourse(handleClose);
  const { data: specialty, isFetching: isSpecailtyLoading } =
    useGetSpecialties();
  const { data: semesters, isLoading: isSemesterLoading } = useGetSemester();

  const handlePrevalidation = async () => {
    const courseCode = await courseCodeRef.current.triggerValidation();
    const courseTitle = await courseTitleRef.current.triggerValidation();
    const courseCredit = await courseCreditRef.current.triggerValidation();
    const specialty = await specialtyRef.current.triggerValidation();
    const semester = await semesterRef.current.triggerValidation();
    const description = await descriptionRef.current.triggerValidation();
    const type = await typeRef.current.triggerValidation();
    return {
      courseCode,
      courseTitle,
      courseCredit,
      specialty,
      semester,
      description,
      type,
    };
  };
  const handleStateChange = (field, value, stateFn) => {
    stateFn((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    const prevalidation = await handlePrevalidation();
    if (!allFieldsValid(prevalidation)) {
      toast.custom(
        <ToastWarning
          title={"Invalid Fields"}
          description={
            "Some Fields Seem To Be Invalid Please Go Through the form and try again"
          }
        />,
      );
      return;
    }
    if (!allFieldsValid(isFieldValid)) {
      toast.custom(
        <ToastWarning
          title={"Invalid Fields"}
          description={
            "Some Fields Seem To Be Invalid Please Go Through the form and try again"
          }
        />,
      );
      return;
    }
    createCourseMutation({
      ...formData,
      semester_id: formData.semester_id.id,
      typeIds: formData.type.map((items) => ({
        type_id: items.id,
      })),
      specialtyIds: formData.specialties.map((specialty) => specialty.id)
    });
  };
  return (
    <>
      <div className="w-100">
        <div className="d-flex flex-row align-items-center justify-content-between mb-3 w-100">
          <span className="m-0">Create Joint Course</span>
          <span
            className="m-0"
            onClick={() => {
              handleClose();
            }}
          >
            <Icon icon="charm:cross" width="22" height="22" />
          </span>
        </div>
        <div>
          <div>
            <label htmlFor="courseTitle" className="font-size-sm">
              Course Title
            </label>
            <TextInput
              placeholder={"e.g Engineering Mathematics"}
              onChange={(value) =>
                handleStateChange("course_title", value, setFormData)
              }
              onValidationChange={(value) =>
                handleStateChange("course_title", value, setFieldValid)
              }
              validationSchema={nameSchema({
                min: 3,
                max: 150,
                required: true,
                messages: {
                  required: "Course Title Required",
                  min: "Course Title Must Be Atleast 3 Characters Long",
                  max: "Course Title Must Not Exceed 150 Characters",
                },
              })}
              ref={courseTitleRef}
              value={formData.course_title}
            />
          </div>
          <div className="d-flex flex-row align-items-center gap-2 w-100">
            <div className="w-50">
              <label htmlFor="courseCode" className="font-size-sm">
                Course Code
              </label>
              <TextInput
                placeholder={"e.g SWE005"}
                onChange={(value) =>
                  handleStateChange("course_code", value, setFormData)
                }
                onValidationChange={(value) =>
                  handleStateChange("course_code", value, setFieldValid)
                }
                validationSchema={courseCodeSchema({
                  min: 3,
                  max: 10,
                  required: true,
                  messages: {
                    required: "Course Code Required",
                    min: "Course Code Must Be Atleast 3 Characters Long",
                    max: "Course Code Must Not Exceed 10 Characters",
                  },
                })}
                ref={courseCodeRef}
                value={formData.course_code}
              />
            </div>
            <div className="w-50">
              <label htmlFor="courseCredit" className="font-size-sm">
                Course Credit
              </label>
              <NumberInput
                placeholder={"e.g 2 Credit"}
                onChange={(value) =>
                  handleStateChange("credit", value, setFormData)
                }
                onValidationChange={(value) =>
                  handleStateChange("credit", value, setFieldValid)
                }
                validationSchema={numberSchema({
                  min: 1,
                  max: 100,
                  required: true,
                  integerOnly: true,
                  messages: {
                    required: "Course Credit Required",
                    min: "Course Credit Must Be Atleast 1",
                    max: "Course Credit Must Not Exceed 100",
                  },
                })}
                ref={courseCreditRef}
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
              onError={(error) => handleStateChange("type", error, setErrors)}
              error={errors.type}
              optional={false}
              ref={typeRef}
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
              onSelect={(value) =>
                handleStateChange("semester_id", value, setFormData)
              }
              isLoading={isSemesterLoading}
              error={errors.semester_id}
              errorMessage="Semester Required"
              onError={(msg) =>
                handleStateChange("semester_id", msg, setErrors)
              }
              placeholder="Select Semester"
              optional={false}
              ref={semesterRef}
              value={formData.semester_id}
            />
          </div>
          <div>
            <label htmlFor="specialty" className="font-size-sm">
              Specialty
            </label>
            <MultiSelectDropdown
              data={specialty?.data || []}
              value={formData.specialties}
              displayKey={["specialty_name", "level_name"]}
              valueKey={["id"]}
              direction="up"
              isLoading={isSpecailtyLoading}
              placeholder={"Select Specialties"}
              errorMessage={"Specialty Required"}
              onSelect={(value) =>
                handleStateChange("specialties", value, setFormData)
              }
              onError={(error) => handleStateChange("specialties", error, setErrors)}
              error={errors.specialties}
              optional={false}
              ref={specialtyRef}
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
                messages: {
                  required: "Course Description Required",
                  min: "Course Description Must Be Atleast 10 Characters Long",
                  max: "Course Description Must Not Exceed 1000 Characters",
                },
              })}
              onValidationChange={(value) =>
                handleStateChange("description", value, setFieldValid)
              }
              placeholder={
                formData.course_title
                  ? `Enter A Short Description For ${formData.course_title}`
                  : "Enter A Short Description Of The Course"
              }
              ref={descriptionRef}
              value={formData.description}
            />
          </div>
        </div>
        <div className="mt-4">
          <div className="d-flex flex-row align-items-center justify-content-end gap-2 w-100">
            <button
              className="border-none px-3 py-2 rounded-3 font-size-sm primary-background text-white w-100"
              onClick={() => {
                handleSubmit();
              }}
            >
              {isPending ? <SingleSpinner /> : "Create Course"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default CreateJointCourse;
