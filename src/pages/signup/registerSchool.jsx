import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useFetchCountrysQuery } from "../../Slices/Asynslices/fetchSlice";

function RegisterSchool() {
  const [schoolCredentials, setSchoolCredentials] = useState({
    country_id: "",
    name: "",
    address: "",
    city: "",
    state: "",
    semester: "",
    type: "",
    established_year: "",
    director_name: "",
    MAX_GPA: "",
    motor: "",
  });

  const navigate = useNavigate();
  const { handleSchoolRegistration, loading, createError } = useAuth(); 

  const handleCreateSchool = async (e) => {
    e.preventDefault();
    await handleSchoolRegistration(navigate, schoolCredentials); 
  };

  const { data: country, error, isLoading } = useFetchCountrysQuery();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSchoolCredentials((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="container w-100 height-100 d-flex flex-column justify-content-center">
      <div className="d-flex flex-row align-items-center justify-content-around w-100">
        <div className="w-50 bg-white rounded-4 px-2 border shadow-sm py-4">
          <form onSubmit={handleCreateSchool}>
            <h4 className="text-center">Create School</h4>
            {createError.createSchool && (
              <div className="alert alert-danger">{createError.createSchool}</div>
            )}
            <div className="my-1">
              <span>School Name</span>
              <input
                type="text"
                className="form-control"
                placeholder="Enter School Name"
                name="name"
                value={schoolCredentials.name}
                onChange={handleChange}
              />
            </div>
            <div className="my-1">
              <span>Director's Name</span>
              <input
                type="text"
                className="form-control"
                placeholder="John Doe"
                name="director_name"
                value={schoolCredentials.director_name}
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
            <div className="d-flex flex-row gap-2 w-100">
              {isLoading ? (
                <div className="my-1 w-50">
                  <span>Country</span>
                  <select name="country_id" className="form-select w-100" disabled>
                    <option value="">Loading...</option>
                  </select>
                </div>
              ) : (
                <div className="my-1 w-50">
                  <span>Country</span>
                  <select
                    name="country_id"
                    className="form-select w-100"
                    value={schoolCredentials.country_id}
                    onChange={handleChange}
                  >
                    {country?.countries?.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.country}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              <div className="my-1 w-50">
                <span>Address</span>
                <input
                  type="text"
                  className="form-control w-100"
                  placeholder="Enter school address"
                  name="address"
                  value={schoolCredentials.address}
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
                  name="semester"
                  value={schoolCredentials.semester}
                  onChange={handleChange}
                />
              </div>
              <div className="my-1 w-50">
                <span>Max GPA</span>
                <input
                  type="number"
                  className="form-control w-100"
                  placeholder="2.00, 4.00 etc"
                  name="MAX_GPA"
                  value={schoolCredentials.MAX_GPA}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="my-1">
              <span>Type</span>
              <input
                type="text"
                placeholder="Private or Government schools"
                className="form-control"
                name="type"
                value={schoolCredentials.type}
                onChange={handleChange}
              />
            </div>
            <div className="my-1">
              <span>Established Year</span>
              <input
                type="date"
                className="form-control"
                name="established_year"
                value={schoolCredentials.established_year}
                onChange={handleChange}
              />
            </div>
            <div className="my-1">
              <span>School Motto</span>
              <textarea
                className="form-control"
                placeholder="School Motto"
                name="motor"
                value={schoolCredentials.motor}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="mt-2">
              <button
                className="primary-background text-white border-none p-2 rounded-3 w-100"
                type="submit"
                disabled={loading.createSchool}
              >
                {loading.createSchool ? "Submitting ....." : "Create School"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterSchool;
