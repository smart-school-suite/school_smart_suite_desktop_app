import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import {
  EmailInput,
  FieldOfStudyInput,
  YearsExperienceInput,
  FullNamesInput,
  PhoneNumberInput,
  SalaryInput,
} from "../../components/formComponents";
import { useState } from "react";
import { useAddTeacherMutation } from "../../Slices/Asynslices/postSlice";
import toast from "react-hot-toast";
function Createteacher() {
  const navigate = useNavigate();
  const [isValid, setIsValid] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone_one: "",
    employment_status: "",
    highest_qualification: "",
    field_of_study: "",
    years_experience: "",
    salary: "",
  });
  const [addTeacher] = useAddTeacherMutation();
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const handleValidation = (isInputValid) => {
    setIsValid(isInputValid);
  };
  const handleSubmit = async () => {
    if (!isValid) return;
    try {
      await addTeacher(formData).unwrap();
      toast.success("Teacher  created successfully!");
      navigate("/teachers");
    } catch (error) {
      toast.error("Failed to create Teacher. Try again.");
    }
  };
  return (
    <>
      <div className="d-flex flex-row justify-content-between w-100  align-items-center my-2">
        <div className="d-flex flex-row align-items-center gap-2">
          <div className="badge-input d-flex flex-row align-items-center justify-content-center">
            <Icon
              icon="clarity:administrator-line"
              className="fs-3 color-primary"
            />
          </div>
          <p className="my-0 fs-6 fw-semibold">Create New Teacher</p>
        </div>
        <div>
          <button
            className="border-none rounded-2 font-size-sm p-2 px-4 d-flex flex-row gap-4 primary-background text-white"
            onClick={() => {
              navigate("/teachers");
            }}
          >
            <span>Back</span>
          </button>
        </div>
      </div>
      <div className="w-100 d-flex flex-column align-items-center justify-content-center height-90 pt-1 pb-2">
        <div className="card w-100 rounded-4 py-2 px-3">
          <div className="my-1">
            <FullNamesInput
              value={formData.name}
              onValidationChange={handleValidation}
              onChange={(value) => handleInputChange("name", value)}
            />
          </div>
          <div className="d-flex flex-row gap-2">
            <div className="my-1 w-50">
              <EmailInput
                value={formData.email}
                onValidationChange={handleValidation}
                onChange={(value) => handleInputChange("email", value)}
              />
            </div>
            <div className="my-1 w-50">
              <PhoneNumberInput
                value={formData.phone_one}
                onValidationChange={handleValidation}
                onChange={(value) => handleInputChange("phone_one", value)}
              />
            </div>
          </div>
          <div className="my-1 w-100">
            <span>Employment Status</span>
            <input
              type="text"
              className="form-control"
              name="employment_status"
              value={formData.employment_status}
              onChange={(e) =>
                handleInputChange("employment_status", e.target.value)
              }
              placeholder="Full-time, Part-time, Contractor"
            />
          </div>
          <div className="my-1 w-100">
            <span>Highest Qualification</span>
            <input
              type="text"
              className="form-control"
              name="highest_qualification"
              value={formData.highest_qualification}
              onChange={(e) =>
                handleInputChange("highest_qualification", e.target.value)
              }
              placeholder="Masters Degree, Bachelor"
            />
          </div>
          <div className="my-1">
            <span>Password</span>
            <input
              type="password"
              className="form-control"
              name="password"
              value={formData.password}
              placeholder="Enter Password"
              onChange={(e) => handleInputChange("password", e.target.value)}
            />
          </div>
          <div className="d-flex flex-row gap-2">
            <div className="my-1 w-100">
              <FieldOfStudyInput
                value={formData.field_of_study}
                onValidationChange={handleValidation}
                onChange={(value) => handleInputChange("field_of_study", value)}
              />
            </div>
          </div>
          <div className="my-1">
            <div className="d-flex flex-row align-items-center gap-2">
              <div className="my-1 w-50">
                <SalaryInput
                  value={formData.salary}
                  onValidationChange={handleValidation}
                  onChange={(value) => handleInputChange("salary", value)}
                />
              </div>
              <div className="my-1 w-50">
                <YearsExperienceInput
                  value={formData.years_experience}
                  onValidationChange={handleValidation}
                  onChange={(value) =>
                    handleInputChange("years_experience", value)
                  }
                />
              </div>
            </div>
          </div>

          <div className="my-2">
            <button
              className="border-none rounded-3 w-100 fs-6 text-white p-2 primary-background"
              onClick={() => {
                handleSubmit();
              }}
              disabled={!isValid}
            >
              Create Teacher
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default Createteacher;
