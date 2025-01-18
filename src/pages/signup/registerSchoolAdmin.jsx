import { useState } from "react";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
function RegisterSchoolAdmin() {
         const school_branch_id = localStorage.getItem("SCHOOL_BRANCH_KEY");
         console.log(school_branch_id);
          const [adminCredentials, setAdminCredentails] = useState({
            school_branch_id: "ef2ced43e2834d48895aa6716",
            name: "",
            email: "",
            password: "",
            role: "",
            date_of_birth: "",
            address: "",
            city: "",
            employment_status: "",
            hire_date: "",
            emergency_contact_name: "",
            emergency_contact_phone: "",
            last_performance_review: "",
            work_location: "",
            position: "",
            highest_qualification:"",
            field_of_study:"",
            cultural_background:"",
            religion:"",
            years_experience:"",
            salary:""
          });
        
          const navigate = useNavigate();
          const { handleCreateSuperAdmin, loading, createError } = useAuth(); 
        
          const handleCreateSchoolAdmin = async (e) => {
            e.preventDefault();
            await handleCreateSuperAdmin(navigate, adminCredentials); 
          };
        
          const handleChange = (e) => {
            const { name, value } = e.target;
            setAdminCredentails((prevState) => ({
              ...prevState,
              [name]: value,
            }));
          };
  return (
    <>
      <div className="container w-100 height-100 d-flex flex-column justify-content-center">
        <div className="d-flex flex-row align-items-center justify-content-around w-100 mt-5">
          <div className="w-50 bg-white rounded-4 px-2 border shadow-sm py-4">
            <form onSubmit={handleCreateSchoolAdmin}>
              <h4 className="text-center">Create School</h4>
              {createError.admin && (
                <div className="alert alert-danger">{createError.admin}</div>
              )}
              <div className="d-flex flex-row align-items-center gap-2">
              <div className="my-1 w-50">
                <span>Full Names</span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Full Name"
                  name="name"
                  value={adminCredentials.name}
                  onChange={handleChange}
                />
              </div>
              <div className="my-1 w-50">
                <span>email</span>
                <input
                  type="email"
                  className="form-control"
                  placeholder="@example.com"
                  name="email"
                  value={adminCredentials.email}
                  onChange={handleChange}
                />
              </div>
              </div>
              <div className="d-flex flex-row align-items-center gap-2">
              <div className="my-1 w-50">
                <span>Password</span>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                  name="password"
                  value={adminCredentials.password}
                  onChange={handleChange}
                />
              </div>
              <div className="my-1 w-50">
                <span>role</span>
                <input
                  type="text"
                  className="form-control"
                  name="role"
                  placeholder="School Admin"
                  value={adminCredentials.role}
                  onChange={handleChange}
                />
              </div>
              </div>
              <div className="d-flex flex-row align-items-center gap-2">
                <div className="my-1 w-50">
                  <span>Address</span>
                  <input
                    type="address"
                    className="form-control"
                    name="address"
                    placeholder="Enter Address"
                    value={adminCredentials.address}
                    onChange={handleChange}
                  />
                </div>
                <div className="my-1 w-50">
                  <span>City</span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Bamenda, Yaoundé"
                    name="city"
                    value={adminCredentials.city}
                    onChange={handleChange}
                  />
                </div>
              </div>
               <div className="d-flex flex-row align-items-center gap-2">
               <div className="my-1 w-50">
                <span>Employment Status</span>
                <input
                  type="text"
                  name="employment_status"
                  className="form-control"
                  value={adminCredentials.employment_status}
                  onChange={handleChange}
                  placeholder="Enter Employment Status"
                />
              </div>
              <div className="my-1 w-50">
                <span>Hire Date</span>
                <input
                  type="date"
                  className="form-control"
                  name="hire_date"
                  value={adminCredentials.hire_date}
                  onChange={handleChange}
                />
              </div>
               </div>
              <div className="d-flex flex-row align-items-center gap-2">
                <div className="my-1 w-50">
                  <span>Emergency Contact Name</span>
                  <input
                    type="text"
                    placeholder="Emergency Contact name"
                    name="emergency_contact_name"
                    className="form-control"
                    value={adminCredentials.emergency_contact_name}
                    onChange={handleChange}
                  />
                </div>
                <div className="my-1 w-50">
                  <span>Emergency Contact Phone</span>
                  <input
                    type="tel"
                    className="form-control"
                    placeholder="Emergency contact phone number"
                    name="emergency_contact_phone"
                    value={adminCredentials.emergency_contact_phone}
                    onChange={handleChange}
                  />
                </div>
              </div>
             <div className="d-flex flex-row align-items-center gap-2">
             <div className="my-1 w-50">
                <span>Last Perfomance Review</span>
                <input
                  type="date"
                  className="form-control"
                  name="last_performance_review"
                  value={adminCredentials.last_performance_review}
                  onChange={handleChange}
                />
              </div>
              <div className="my-1 w-50">
                <span>Date of Birth</span>
                <input
                  type="date"
                  name="date_of_birth"
                  className="form-control"
                  value={adminCredentials.date_of_birth}
                  onChange={handleChange}
                />
              </div>
             </div>
              <div className="d-flex flex-row align-items-center gap-2">
                <div className="my-1 w-50">
                  <span>Work Location</span>
                  <input
                    type="text"
                    className="form-control"
                    name="work_location"
                    value={adminCredentials.work_location}
                    onChange={handleChange}
                  />
                </div>
                <div className="my-1 w-50">
                  <span>Position</span>
                  <input
                    type="text"
                    className="form-control"
                    name="position"
                    placeholder="Enter Position"
                    value={adminCredentials.position}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="d-flex flex-row align-items-center gap-2">
                <div className="my-1 w-50">
                  <span>Highest Qualification</span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter qualification"
                    name="highest_qualification"
                    value={adminCredentials.highest_qualification}
                    onChange={handleChange}
                  />
                </div>
                <div className="my-1 w-50">
                  <span>Field of study</span>
                  <input
                    type="text"
                    className="form-control"
                    name="field_of_study"
                    placeholder="Enter field of study"
                    value={adminCredentials.field_of_study}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="d-flex flex-row align-items-center gap-2">
                <div className="my-1 w-50">
                  <span>Cultural Background</span>
                  <input
                    type="text"
                    className="form-control"
                    value={adminCredentials.cultural_background}
                    onChange={handleChange}
                    placeholder="Enter cultural Background"
                    name="cultural_background"
                  />
                </div>
                <div className="my-1 w-50">
                  <span>Religion</span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Religion"
                    name="religion"
                    value={adminCredentials.religion}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="d-flex flex-row align-items-center gap-2">
                <div className="my-1 w-50">
                  <span>Years of experience</span>
                  <input
                    type="number"
                    className="form-control"
                    name="years_experience"
                    value={adminCredentials.years_experience}
                    onChange={handleChange}
                    placeholder="Years of Experience"
                  />
                </div>
                <div className="my-1 w-50">
                  <span>Salary</span>
                  <input
                    type="number"
                    className="form-control"
                    name="salary"
                    value={adminCredentials.salary}
                    onChange={handleChange}
                    placeholder="20,000, 40,0000"
                  />
                </div>
              </div>
              <div className="mt-2">
                <button
                  className="primary-background text-white border-none p-2 rounded-3 w-100"
                  type="submit"
                  disabled={loading.admin}
                >
                  {loading.admin ? "Submitting ....." : "Create School"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default RegisterSchoolAdmin;
