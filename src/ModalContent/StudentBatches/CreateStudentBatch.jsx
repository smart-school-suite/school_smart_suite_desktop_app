function CreateStudentBatch({ handleClose }) {
    const [formData, setFormData] = useState({
      name: "",
      graduation_date: "",
    });
  
    const [addStudentBatch] = useAddStudentBatchMutation();
  
    const handleInputChange = (field, value) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    };
    const handleSubmit = async () => {
      try {
        await addStudentBatch(formData).unwrap();
        toast.success("Student Batch  created successfully!");
        handleClose();
      } catch (error) {
        toast.error("Failed to create Student Batch. Try again.");
      }
    };
    return (
      <div className="w-100">
        <div className="d-flex flex-row">
          <div>
            <h5>Create Student Batch</h5>
            <span className="font-size-sm gainsboro-color">
              Lorem reprehenderit eligendi iure animi ea odit quis voluptatum fuga{" "}
            </span>
          </div>
        </div>
        <div className="my-1">
          <span>Batch Title</span>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            placeholder="Great Archievement, Humility"
          />
        </div>
        <div className="my-1">
          <span>Graduation Date</span>
          <input
            type="date"
            className="form-control"
            name="graduation_date"
            value={formData.graduation_date}
            onChange={(e) => handleInputChange("graduation_date", e.target.value)}
          />
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
              onClick={() => {
                handleSubmit();
              }}
            >
              Create Batch
            </button>
          </div>
        </div>
      </div>
    );
  }
  export default CreateStudentBatch;