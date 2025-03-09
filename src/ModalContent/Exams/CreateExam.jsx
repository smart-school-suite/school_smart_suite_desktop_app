function CreateExam({ handleClose }) {
    const [isValid, setIsValid] = useState(false);
    const [formData, setFormData ] = useState({
       start_date:"",
       end_date:"",
       exam_type_id:"",
       level_id:"",
       weighted_mark:"",
       semester_id:"",
       specialty_id:"",
       school_year:"",
    });
  
    const { data:education_level, isLoading:isEducationLevelLoading, error:educationLevelError } = useFetchEducationLevelsQuery();
    const { data:semester_data, isLoading:isSemesterLoading, error:semesterError } = useFetchSemestersQuery();
    const { data:exam_data, isLoading:isExamTypeLoading, error:examTypeError } = useFetchExamTypesQuery();
    const { data:specialty, isLoading:isSpecailtyLoading, error:specailtyError } = useFetchSpecialtiesQuery();
     const [addExam] = useAddExamMutation();
    const handleEducationLevelSelect = (selectedValues) => {
      setFormData((prevalue) => ({
        ...prevalue,
        level_id: selectedValues.id,
      }));
    };
  
    const handleExamTypeSelect = (selectedValues) => {
       setFormData((prevalue) => ({
         ...prevalue,
         exam_type_id:selectedValues.id
       }))
    }
  
    const handleSemesterSelect = (selectedValues) => {
        setFormData((prevalue) => ({
            ...prevalue,
            semester_id:selectedValues.id
        }))
    }
  
    const handleSpecialtySelect = (selectedValues) => {
       setFormData((prevalue) => ({
           ...prevalue,
           specialty_id:selectedValues.id
       }))
    }
    
    const handleSchoolYearSelect = (selectedValues) => {
       setFormData((prevalue) => ({
          ...prevalue,
          school_year:selectedValues
       }))
    }
    const handleInputChange = (field, value) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    };
  
    const handleValidation = (isInputValid) => {
      setIsValid(isInputValid);
    };
    
    const handleSubmit = async () => {
      if (!isValid) return;
      try {
        await addExam(formData).unwrap();
        toast.success("Exam created successfully!");
        handleClose();
      } catch (error) {
        toast.error("Failed to exam. Try again.");
      }
    };
    return (
      <>
        <div className="d-flex flex-row align-items-center">
          <div className="block">
            <h5>Create Exam</h5>
            <span className="gainsboro-color font-size-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem harum
              nesciunt sunt
            </span>
          </div>
        </div>
        <div className="my-1">
          <span>Start Date</span>
          <input 
           type="date" 
           className="form-control"
           name="start_date"
           value={formData.start_date}
           onChange={(e) => handleInputChange("start_date", e.target.value)}
           />
        </div>
        <div className="my-1">
          <span>End Date</span>
          <input 
            type="date" 
           className="form-control" 
            name="end_date"
            value={formData.end_date}
            onChange={(e) => handleInputChange("end_date", e.target.value)}
          />
        </div>
        <div className="my-1">
          <WeigtedMarkInput 
            onChange={(value) => handleInputChange("weighted_mark", value)}
            value={formData.weighted_mark}
            onValidationChange={handleValidation}
          />
        </div>
        <div className="my-1">
          <span>School Year</span>
          <SchoolYearSelector 
            onSelect={handleSchoolYearSelect}
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
          {isEducationLevelLoading ? (
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
              isLoading={isEducationLevelLoading}
              direction="up"
              onSelect={handleEducationLevelSelect}
            />
          )}
        </div>
        <div className="my-1">
          <span>Exam Type</span>
          {isExamTypeLoading ? (
            <select name="" className="form-select">
              <option value="">loading</option>
            </select>
          ) : (
            <CustomDropdown
              data={exam_data.exam_data}
              displayKey={["exam_name"]}
              valueKey={["id"]}
              filter_array_keys={["id", "exam_name"]}
              renameMapping={{ id: "id", exam_name: "exam_name" }}
              isLoading={isExamTypeLoading}
              direction="up"
              onSelect={handleExamTypeSelect}
            />
          )}
        </div>
        <div className="my-1">
          <span>Specialty</span>
          {isSpecailtyLoading ? (
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
              disabled={!isValid}
              className="border-none px-3 py-2 rounded-3 font-size-sm primary-background text-white w-50"
              onClick={() => {
                 handleSubmit();
              }}
              >
              Continue
            </button>
          </div>
        </div>
      </>
    );
  }
  export default CreateExam;