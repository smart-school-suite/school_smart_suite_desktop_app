import { useNavigate, Link } from "react-router-dom";
import { useFetchCountrysQuery } from "../../Slices/Asynslices/fetchSlice";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "@iconify/react";
import { setSchoolAuthData } from "../../Slices/Asynslices/AuthSlice";
function RegisterSchool() {
  const { data: country, isLoading } = useFetchCountrysQuery();
  const schoolCredentials = useSelector((state) => state.auth.schoolAuthData);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (field, event) => {
  const value = event.target.value;
  dispatch(setSchoolAuthData({ field, value }));
  };

  return (
     <div className="container w-100 height-100 pt-3 d-flex flex-column pb-5">
         <div className="d-flex flex-row align-items-center w-100 justify-content-between px-3">
            <div className="signup-app-logo">
              <img
              src="/logo/blue_logo.png"
              alt=""
              className="signup-app-logo"
            />
            </div>
            <div className="d-flex flex-row gap-4">
            <button className="border-none rounded-pill px-3 py-2 border bg-white font-size-sm">
              Save And Exit
            </button>
            <button className="border-none rounded-pill px-3 py-2 border bg-white  font-size-sm">
              Questions?
            </button>
          </div>
         </div>
         <div className="w-100 d-flex flex-row align-items-center justify-content-center mt-3">
          <div className="form-box">
             <div className="text-center mb-5">
              <h1 className="fw-bold">Launch A New School Adventure</h1>
             </div>
             <div className="mt-5">
              <label htmlFor="school name">School Name</label>
              <input 
                type="text"
                 placeholder="Enter School Name"
                  className="form-control p-2"
                  name="school_name"
                  onChange={(value) => handleChange("school_name", value)} 
              />
             </div>
             <div className="d-flex flex-row gap-2 w-100">
              {isLoading ? (
                <div className="my-1 w-50">
                  <span>Country</span>
                  <select name="country_id" className="form-select w-100" disabled>
                    <option value="">Loading...</option>
                  </select>
                </div>
              ) : (
                <div className="my-1 w-100">
                  <span>Country</span>
                  <select
                    name="country_id"
                    className="form-select w-100"
                    value={schoolCredentials.country_id}
                    onChange={(value) => handleChange("country_id", value)}
                  >
                    {country?.data?.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.country}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              </div>
             <div className="my-3">
              <label htmlFor="school type">School Type</label>
              <select 
                 name="type"
                 className="form-select p-2"
                 value={schoolCredentials.type}
                 onChange={(value) => handleChange("type", value)}
                 >
                <option value="private">Private School</option>
                <option value="government">Government School</option>
              </select>
             </div>
         </div>
         </div>
         <div className="mt-auto px-3 w-100">
          <div className="mb-2">
            <span className="font-size-sm ">Step 1 of 4 Completed</span>
          </div>
          <div className="row w-100 d-flex flex-row align-items-center gap-1 justify-content-between">
            <div className="auth-progress">
              <div className="auth-progress-bar active"></div>
            </div>
             <div className="auth-progress">
              <div className="auth-progress-bar"></div>
            </div>
             <div className="auth-progress">
              <div className="auth-progress-bar"></div>
            </div>
             <div className="auth-progress">
              <div className="auth-progress-bar"></div>
            </div>
          </div>
          <div className="d-flex flex-row align-items-center w-100 justify-content-between pe-2 mt-3">
            <div className="d-flex flex-row align-items-center gap-1">
              <span><Icon icon="material-symbols:arrow-back-rounded" className="color-primary"/></span>
              <Link className="p-0 m-0 color-primary" to="/">Back</Link>
            </div>
            <div>
              <button className="border-none p-2 rounded-2 font-size-sm px-4 primary-background text-white fw-medium"
                onClick={() => {
                  navigate("/create-schoolbranch")
                }}
              >
                Next
              </button>
            </div>
          </div>
         </div>
     </div>
  );
}

export default RegisterSchool;
