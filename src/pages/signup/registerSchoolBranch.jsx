import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/authContext";
import { useSelector } from "react-redux";
function RegisterSchoolBranch(){
     const schoolId = useSelector((state) => state.auth.schoolId);
      const [schoolCredentials, setSchoolCredentials] = useState({
        school_id: schoolId,
        branch_name: "",
        address: "",
        city: "",
        state: "",
        resit_fee: "",
        email: "",
        website: "",
        semester_count:0,
        max_gpa: 0,
        phone_one: "",
        phone_two: "",
        postal_code: "",
      });
    
      const navigate = useNavigate();
      const { handleSchoolBranchRegistration, loading, createError } = useAuth(); 
    
      const handleCreateSchool = async (e) => {
        e.preventDefault();
        await handleSchoolBranchRegistration(navigate, schoolCredentials); 
      };
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setSchoolCredentials((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      };
    return(
        <>
            <div className="container w-100 height-100 d-flex flex-column justify-content-center">
      <div className="d-flex flex-row align-items-center justify-content-around w-100">
        <div className="w-50 bg-white rounded-4 px-2 border shadow-sm py-4">
          <form onSubmit={handleCreateSchool}>
            <h4 className="text-center">Create School Branch</h4>
            {createError.createSchoolBranch && (
              <div className="alert alert-danger">{createError.createSchoolBranch}</div>
            )}
            <div className="my-1">
              <span>School Name</span>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Branch Name"
                name="branch_name"
                value={schoolCredentials.branch_name}
                onChange={handleChange}
              />
            </div>
            <div className="d-flex flex-row gap-2 w-100">
              <div className="my-1 w-50">
                <span>City</span>
                <input
                  type="text"
                  className="form-control w-100"
                  placeholder="Bamenda, Yaoundé"
                  name="city"
                  value={schoolCredentials.city}
                  onChange={handleChange}
                />
              </div>
              <div className="my-1 w-50">
                <span>State</span>
                <input
                  type="text"
                  className="form-control w-100"
                  placeholder="Northwest, Southwest, North, South"
                  name="state"
                  value={schoolCredentials.state}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="d-flex flex-row w-100 gap-2">
              <div className="my-1 w-50">
                <span>Semesters</span>
                <input
                  type="number"
                  className="form-control w-100"
                  placeholder="2 semesters, 3 semesters"
                  name="semester_count"
                  value={schoolCredentials.semester_count}
                  onChange={handleChange}
                />
              </div>
              <div className="my-1 w-50">
                <span>Max GPA</span>
                <input
                  type="number"
                  className="form-control w-100"
                  placeholder="2.00, 4.00 etc"
                  name="max_gpa"
                  value={schoolCredentials.max_gpa}
                  onChange={handleChange}
                  step="0.01"
                />
              </div>
            </div>
            <div className="d-flex flex-row w-100 gap-2">
              <div className="my-1 w-50">
                <span>Postal Code</span>
                <input
                  type="number"
                  className="form-control"
                  placeholder="XXXXX"
                  name="postal_code"
                  value={schoolCredentials.postal_code}
                  onChange={handleChange}
                />
              </div>
              <div className="my-1 w-50">
                <span>Address</span>
                <input type="text" 
                 className="form-control"
                 placeholder="Enter address"
                 name="address"
                 value={schoolCredentials.address}
                 onChange={handleChange}
                />
              </div>
            </div>
            <div className="my-1">
                <span>Email</span>
                <input type="email" 
                 className="form-control"
                 name="email"
                 placeholder="example@gmail.com"
                 value={schoolCredentials.email}
                 onChange={handleChange}
                />
            </div>
            <div className="my-1">
                <span>Website</span>
                <input type="url" 
                 className="form-control" 
                  name="website"
                  placeholder="https://exhist"
                  value={schoolCredentials.website}
                  onChange={handleChange}
                />
            </div>
            <div className="my-1">
              <span>Abbreviation</span>
              <input 
              type="text" 
              className="form-control"
              placeholder="Enter Abbreviation"
              value={schoolCredentials.abbrevaition}
              name="abbrevaition"
              onChange={handleChange}
               />
            </div>
            <div className="my-1">
                <span>Resit Fee</span>
                <input 
                 type="number" 
                 className="form-control"
                 name="resit_fee"
                 placeholder="3000, 200"
                 value={schoolCredentials.resit_fee}
                 onChange={handleChange}
                />
            </div>
            <div className="d-flex flex-row align-items-center gap-2">
            <div className="my-1 w-50">
              <span>Phone Number One</span>
              <input
                type="tel"
                placeholder="6-XXX-XXX"
                className="form-control"
                name="phone_one"
                value={schoolCredentials.phone_one}
                onChange={handleChange}
              />
            </div>
            <div className="my-1 w-50">
              <span>Phone Number Two</span>
              <input
                type="tel"
                className="form-control"
                name="phone_two"
                value={schoolCredentials.phone_two}
                onChange={handleChange}
              />
            </div>
            </div>

            <div className="mt-2">
              <button
                className="primary-background text-white border-none p-2 rounded-3 w-100"
                type="submit"
                disabled={loading.createSchoolBranch}
              >
                {loading.createSchoolBranch ? "Submitting ....." : "Create School Branch"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
        </>
    )
}
export default RegisterSchoolBranch