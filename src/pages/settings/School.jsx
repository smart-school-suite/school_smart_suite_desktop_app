import { Icon } from "@iconify/react";
import SettingSideBar from "../../components/SideBars/SetttingSideBar";
import { useSelector } from "react-redux";
function School() {
  const userData = useSelector((state) => state.auth.user);
  const schoolData = userData.schoolDetails.school;
  return (
    <>
        <div
            className="d-flex flex-column justify-content-start gap-2 w-100"
          >
            <div className="w-100 d-flex flex-row align-items-center justify-content-end">
             <button className="border-none p-3 rounded-3 font-size-sm d-flex flex-row gap-3 primary-background-100 color-primary">
               <span className="m-0">
                <Icon icon="lucide:plus" width="20" height="20" />
               </span>
               <span
                className="m-0"
               >Create New School Branch</span>
             </button>
            </div>
            <div>
              <span
                className="my-1 fw-semibold"
                style={{ fontSize: "0.87rem" }}
              >
                School Details
              </span>
              <div
                className="card p-2 border-none rounded-4 w-100 d-flex flex-column gap-1"
                style={{ fontSize: "0.87rem" }}
              >
                <div className="d-flex flex-row align-items-center justify-content-between pointer-cursor">
                  <div className="d-flex flex-column">
                    <span className="fw-semibold">School Name</span>
                    <span className="gainsboro-color fw-light">
                      {schoolData.name}
                    </span>
                  </div>
                  <div>
                    <Icon icon="iconamoon:edit-thin" width="24" height="24" />
                  </div>
                </div>
                <hr />
                <div className="d-flex flex-row align-items-center justify-content-between pointer-cursor">
                  <div className="d-flex flex-column">
                    <span className="fw-semibold">Established Year</span>
                    <span className="gainsboro-color fw-light">
                      {schoolData.established_year === null
                        ? "Add Established Year"
                        : schoolData.established_year}
                    </span>
                  </div>
                  <div>
                    <Icon icon="iconamoon:edit-thin" width="24" height="24" />
                  </div>
                </div>
                <hr />
                <div className="d-flex flex-row align-items-center justify-content-between pointer-cursor">
                  <div className="d-flex flex-column">
                    <span className="fw-semibold">School Type</span>
                    <span className="gainsboro-color fw-light">
                      {schoolData.type === null
                        ? "Specify School Type"
                        : schoolData.type}
                    </span>
                  </div>
                  <div>
                    <Icon icon="iconamoon:edit-thin" width="24" height="24" />
                  </div>
                </div>
                <hr />
                <div className="d-flex flex-row align-items-center justify-content-between pointer-cursor">
                  <div className="d-flex flex-column">
                    <span className="fw-semibold">Motor</span>
                    <span className="gainsboro-color fw-light">
                      {schoolData.motor === null
                        ? "Add School Motor"
                        : schoolData.motor}
                    </span>
                  </div>
                  <div>
                    <Icon icon="iconamoon:edit-thin" width="24" height="24" />
                  </div>
                </div>
                <hr />
                <div className="d-flex flex-row align-items-center justify-content-between pointer-cursor">
                  <div className="d-flex flex-row align-item-center">
                    <div className="d-flex flex-column">
                      <span className="fw-semibold">School Logo</span>
                      <span className="gainsboro-color fw-light">
                        {schoolData.school_logo === null
                          ? "Add School Logo"
                          : schoolData.school_logo}
                      </span>
                    </div>
                  </div>
                  <div
                    style={{
                      width: "3.5rem",
                      height: "3.5rem",
                      fontSize: "1rem",
                    }}
                    className="primary-background-50 rounded-1 color-primary d-flex flex-row align-items-center justify-content-center"
                  >
                    SL
                  </div>
                </div>
              </div>
            </div>
            <div>
              <span
                className="my-1 fw-semibold"
                style={{ fontSize: "0.87rem" }}
              >
                School Branches Registered Under this school
              </span>
              <div
                className="card p-2 border-none rounded-4 w-100 d-flex flex-column gap-1"
                style={{ fontSize: "0.87rem" }}
              >
                <div className="d-flex flex-row align-items-center justify-content-between pointer-cursor">
                  <div className="d-flex flex-column">
                    <span className="fw-semibold">School Branch Name</span>
                    <span className="gainsboro-color fw-light">
                      {schoolData.name}
                    </span>
                  </div>
                </div>
                <hr />
                <div className="d-flex flex-row align-items-center justify-content-between pointer-cursor">
                  <div className="d-flex flex-column">
                    <span className="fw-semibold">Location</span>
                    <span className="gainsboro-color fw-light">
                      {schoolData.name}
                    </span>
                  </div>
                </div>
                <hr />
                <div className="d-flex flex-row align-items-center justify-content-between pointer-cursor">
                  <div className="d-flex flex-column">
                    <span className="fw-semibold">State</span>
                    <span className="gainsboro-color fw-light">
                      {schoolData.name}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <span
                className="my-1 text-danger fw-semibold"
                style={{ fontSize: "0.87rem" }}
              >
                Danger Zone
              </span>
              <div
                className="card p-2 border-danger rounded-4 w-100 d-flex flex-column gap-1"
                style={{ fontSize: "0.87rem" }}
              >
                <div className="d-flex flex-row align-items-center justify-content-between pointer-cursor">
                  <div className="d-flex flex-row align-items-center justify-content-between w-100">
                    <div className="d-flex flex-column text-danger">
                    <span className="fw-semibold">Delete School</span>
                    <span className="fw-light">
                      {schoolData.name}
                    </span>
                   </div>
                  <div>
                    <button className="border-none rounded-3 bg-danger text-white p-2 font-size-sm">
                      Delete School
                    </button>
                  </div>
                  </div>
                </div>
                <hr />
                <div className="d-flex flex-row align-items-center justify-content-between pointer-cursor">
                  <div className="d-flex flex-row align-items-center w-100 justify-content-between">
                    <div className="d-flex flex-column">
                    <span className="fw-semibold">Suspend School</span>
                    <span className="gainsboro-color fw-light">
                      {schoolData.name}
                    </span>
                  </div>
                  <div>
                    <button className="border-none rounded-3 bg-danger text-white p-2 font-size-sm">
                      Suspend School
                    </button>
                  </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
    </>
  );
}
export default School;
