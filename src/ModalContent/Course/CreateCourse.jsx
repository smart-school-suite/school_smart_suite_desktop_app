function CreateCourse({ handleClose }) {
    const [isValid, setIsValid] = useState(false);
    const [formData, setFormData] = useState({
      course_code: "",
      course_title: "",
      credit: "",
      specialty_id: "",
      department_id: "",
      level_id: "",
      semester_id: "",
    });
    const [addCourse] = useAddCourseMutation();
    const {
      data: specialty,
      isLoading: isSpecailtyLoading,
      error: SpecailtyError,
    } = useFetchSpecialtiesQuery();
    const {
      data: department,
      isLoading: isDepartmentLoading,
      error: departmentError,
    } = useFetchDepartmentsQuery();
    const {
      data: education_level,
      isLoading: isLevelLoading,
      error: levelError,
    } = useFetchEducationLevelsQuery();
    const {
      data: semester_data,
      isLoading: isSemesterLoading,
      error: semesterError,
    } = useFetchSemestersQuery();
  
    const handleInputChange = (field, value) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    };
  
    const handleValidation = (isInputValid) => {
      setIsValid(isInputValid);
    };
  
    const handleEducationSelect = (selectedValues) => {
      setFormData((prevalue) => ({ ...prevalue, level_id: selectedValues.id }));
    };
  
    const handleDepartmentSelect = (selectedValues) => {
      setFormData((prevalue) => ({
        ...prevalue,
        department_id: selectedValues.id,
      }));
    };
  
    const handleSemesterSelect = (selectedValues) => {
      setFormData((prevalue) => ({
        ...prevalue,
        semester_id: selectedValues.id,
      }));
    };
  
    const handleSpecialtySelect = (selectedValues) => {
      setFormData((prevalue) => ({
        ...prevalue,
        specialty_id: selectedValues.id,
      }));
    };
    const handleSubmit = async () => {
      if (!isValid) return;
      try {
        await addCourse(formData).unwrap();
        toast.success("Course  created successfully!");
        handleClose();
      } catch (error) {
        toast.error("Failed to create Course. Try again.");
      }
    };
    return (
      <div className="w-100">
        <div className="d-flex flex-row">
          <div>
            <h5>Create Course</h5>
            <p className="gainsboro-color font-size-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.{" "}
            </p>
          </div>
        </div>
        <div className="my-1">
          <CourseTitleInput
            onValidationChange={handleValidation}
            value={formData.course_title}
            onChange={(value) => handleInputChange("course_title", value)}
          />
        </div>
        <div className="my-1">
          <CourseCreditInput
            onValidationChange={handleValidation}
            value={formData.course_code}
            onChange={(value) => handleInputChange("credit", value)}
          />
        </div>
        <div className="my-1">
          <CourseCodeInput
            onValidationChange={handleValidation}
            value={formData.course_code}
            onChange={(value) => handleInputChange("course_code", value)}
          />
        </div>
        <div className="my-1">
          <span>Semester</span>
          {isSemesterLoading ? (
            <select name="" className="form-select">
              <option value="">loading</option>
            </select>
          ) : (
            <CustomDropdown
              data={semester_data.semester_data}
              displayKey={["name"]}
              valueKey={["id"]}
              filter_array_keys={["id", "name"]}
              renameMapping={{ id: "id", name: "name" }}
              isLoading={isSemesterLoading}
              direction="up"
              onSelect={handleSemesterSelect}
            />
          )}
        </div>
        <div className="my-1">
          <span>Level</span>
          {isLevelLoading ? (
            <select name="" className="form-select">
              <option value="">loading</option>
            </select>
          ) : (
            <CustomDropdown
              data={education_level.education_level}
              displayKey={["name"]}
              valueKey={["id"]}
              filter_array_keys={["id", "name"]}
              renameMapping={{ id: "id", name: "name" }}
              isLoading={isLevelLoading}
              direction="up"
              onSelect={handleEducationSelect}
            />
          )}
        </div>
        <div className="my-1">
          <span>Department</span>
          {isDepartmentLoading ? (
            <select name="" className="form-select">
              <option value="">loading</option>
            </select>
          ) : (
            <CustomDropdown
              data={department.department}
              displayKey={["department_name"]}
              valueKey={["id"]}
              filter_array_keys={["id", "department_name"]}
              renameMapping={{ id: "id", department_name: "department_name" }}
              isLoading={isDepartmentLoading}
              direction="up"
              onSelect={handleDepartmentSelect}
            />
          )}
        </div>
        <div className="my-1">
          <span>Specialty</span>
          {isSemesterLoading ? (
            <select name="" className="form-select">
              <option value="">loading</option>
            </select>
          ) : (
            <CustomDropdown
              data={specialty.specialty}
              displayKey={["specialty_name"]}
              valueKey={["id"]}
              filter_array_keys={["id", "specialty_name"]}
              renameMapping={{ id: "id", specialty_name: "specialty_name" }}
              isLoading={isSpecailtyLoading}
              direction="up"
              onSelect={handleSpecialtySelect}
            />
          )}
        </div>
        <div className="mt-4">
          <div className="d-flex flex-row align-items-center justify-content-end gap-2 w-100">
            <button
              className="border-none px-3 py-2 text-primary rounded-3 font-size-sm w-50"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              className="border-none px-3 py-2 rounded-3 font-size-sm primary-background text-white w-50"
              disabled={!isValid}
              onClick={() => {
                handleSubmit();
              }}
            >
              Create Course
            </button>
          </div>
        </div>
      </div>
    );
  }
  export default CreateCourse;