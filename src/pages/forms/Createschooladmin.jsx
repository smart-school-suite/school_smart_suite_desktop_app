import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import {
  EmailInput,
  FullNamesInput,
  SalaryInput,
} from "../../components/formComponents";
import { useState } from "react";
import { useAddSchoolAdminMutation } from "../../Slices/Asynslices/postSlice";
import toast from "react-hot-toast";
function Createschooladmin() {
  const navigate = useNavigate();
  const [isValid, setIsValid] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    employment_status: "",
    hire_date: "",
    work_location: "",
    position: "",
    salary: "",
  });

  const [addSchoolAdmin] = useAddSchoolAdminMutation();
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const handleValidation = (isInputValid) => {
    setIsValid(isInputValid);
  };
  const handleSubmit = async () => {
    if (!isValid) return;
    try {
      await addSchoolAdmin(formData).unwrap();
      toast.success("School Admin  created successfully!");
      navigate("/school-admins")
    } catch (error) {
      toast.error("Failed to create School Admin. Try again.");
    }
  };
  return (
    <>
      <div className="w-100 d-flex flex-column align-items-center justify-content-center height-100 pt-1 pb-2">
        <div className="d-flex flex-row justify-content-between w-100  align-items-center mb-4">
          <div className="d-flex flex-row align-items-center gap-2">
            <div className="badge-input d-flex flex-row align-items-center justify-content-center">
              <Icon
                icon="clarity:administrator-line"
                className="fs-3 color-primary"
              />
            </div>
            <p className="my-0 fs-6 fw-semibold">Create New Admin</p>
          </div>
          <div>
            <button
              className="border-none rounded-2 px-4 font-size-sm p-2 d-flex flex-row gap-4 primary-background text-white"
              onClick={() => {
                navigate("/school-admins");
              }}
            >
              <span>Back</span>
            </button>
          </div>
        </div>
        <div className="card w-100 rounded-4 py-2 px-3 ">
          <div className="d-flex flex-row gap-2 w-100">
            <div className="my-1 w-50">
              <EmailInput 
                 value={formData.email}
                onValidationChange={handleValidation}
                 onChange={(value) => handleInputChange("email", value)}
              />
            </div>
            <div className="my-1 w-50">
              <FullNamesInput 
                value={formData.name}
                onValidationChange={handleValidation}
                onChange={(value) => handleInputChange("name", value)}
              />
            </div>
          </div>
          <div className="my-1 w-100">
            <span>Password</span>
            <input
              type="password"
              className="form-control"
              name="password"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              placeholder="Enter Strong Password"
            />
          </div>
          <div className="my-1 w-100">
            <span>Role</span>
            <input
              type="text"
              className="form-control"
              value={formData.role}
              name="role"
              onChange={(e) => handleInputChange("role", e.target.value)}
              placeholder="Vice Principal Principal Director"
            />
          </div>
          <div className="my-1">
            <span>Hire Date</span>
            <input type="date" 
             className="form-control"
             name="hire_date"
             value={formData.hire_date}
             onChange={(e) => handleInputChange("hire_date", e.target.value)}
            />
          </div>
          <div className="my-1 w-100">
            <SalaryInput 
              onValidationChange={handleValidation}
              value={formData.salary}
               onChange={(value) => handleInputChange("salary", value)}
            />
          </div>
          <div className="my-1 w-100">
            <span>Work Location</span>
            <input
              type="text"
              className="form-control"
              name="work_location"
              value={formData.work_location}
              onChange={(e) => handleInputChange("work_location", e.target.value)}
              placeholder="Home, Main Office, Branch Location"
            />
          </div>
          <div className="my-1 w-100">
            <span>Position</span>
            <input
              type="text"
              className="form-control"
              name="position"
              value={formData.position}
              onChange={(e) => handleInputChange("position", e.target.value)}
              placeholder="Manager, Developer, Coordinator"
            />
          </div>
          <div className="my-1 w-100">
            <span>Employment Status</span>
            <input
              type="text"
              className="form-control"
              name="employment_status"
              value={formData.employment_status}
              onChange={(e) => handleInputChange("employment_status", e.target.value)}
              placeholder="Full-time, Part-time, Contractor"
            />
          </div>
          <div className="my-2">
            <button 
             className="border-none rounded-3 w-100 fs-6 text-white p-2 primary-background"
             onClick={() => {
               handleSubmit();
             }}
             disabled={!isValid}
            >
              Create School Admin
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default Createschooladmin;
