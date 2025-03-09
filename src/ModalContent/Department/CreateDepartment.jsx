function CreateDepartment({ handleClose }){
    const [isValid, setIsValid] = useState(false); 
    const [formData, setFormData] = useState({ department_name: "", date: "" }); 
    const [addDepartment, { isLoading }] = useAddDepartmentMutation();
  
    const handleInputChange = (field, value) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    };
  
    const handleValidation = (isInputValid) => {
      setIsValid(isInputValid);
    };
  
    const handleSubmit = async () => {
      if (!isValid) return;
      try {
        await addDepartment(formData).unwrap(); 
        toast.success("Department created successfully!");
        handleClose(); 
      } catch (error) {
        toast.error("Failed to create department. Try again.");
      }
    };
    return(
      <div>
       <div className="d-flex flex-row align-items-center">
          <div className="block">
            <h5>Create Department</h5>
            <span className="gainsboro-color font-size-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem harum nesciunt sunt
            </span>
          </div>
        </div>
        <div className="my-1">
          <DepartmentNameInput 
           onValidationChange={handleValidation}
           value={formData.department_name}
           onChange={(value) => handleInputChange("department_name", value)}
          />
        </div>
        <div className="my-1">
          <span>Date of Creation</span>
          <input 
          type="date" 
          className="form-control"
           
          />
        </div>
        <div className="mt-4">
            <div className="d-flex flex-row align-items-center justify-content-end gap-2 w-100">
              <button className="border-none px-3 py-2 text-primary rounded-3 font-size-sm w-50"
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
                Continue
              </button>
            </div>
          </div>
      </div>
    )
  }
  export default CreateDepartment;