import { Icon } from "@iconify/react";
import SettingSideBar from "../../components/SideBars/SetttingSideBar";
import { useSelector } from "react-redux";
import Pageloaderspinner from "../../components/Spinners/Spinners";
import { useGetSchoolDetails } from "../../hooks/school/useGetSchoolDetails";
import { ModalButton } from "../../components/DataTableComponents/ActionComponent";
import UpdateSchoolName from "../../ModalContent/School/updateSchoolName";
import UpdateSchoolMotor from "../../ModalContent/School/UpdateSchoolMotor";
import UploadSchoolLogo from "../../ModalContent/School/UploadSchoolLogo";
import { formatDate, timeSince } from "../../utils/functions";
import UpdateEstablishedDate from "../../ModalContent/School/UpdateEstablishedDate";
function School() {
  const userData = useSelector((state) => state.auth.user);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const { data:schoolDetails, isLoading } = useGetSchoolDetails();
  if(isLoading){
    return <Pageloaderspinner />
  }
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
                className={`${darkMode ? 'dark-bg' : 'white-bg'} card p-2 border-none rounded-4 w-100 d-flex flex-column gap-1`}
                style={{ fontSize: "0.87rem" }}
              >
               <ModalButton
                   classname={`${darkMode ? 'gainsboro-color' : null} d-flex flex-row align-items-center justify-content-between pointer-cursor w-100 remove-button-style`}
                   action={{ modalContent:UpdateSchoolName }}
               >
                <div className={`${darkMode ? 'gainsboro-color' : null} d-flex flex-column`}>
                    <span className="fw-semibold text-start">School Name</span>
                    <span className="fw-light">
                      {schoolDetails.data.name}
                    </span>
                  </div>
                  <div>
                    <Icon icon="iconamoon:edit-thin" width="24" height="24" />
                  </div>
               </ModalButton>
                <hr />
                <ModalButton
                  classname={`${darkMode ? 'gainsboro-color' : null} d-flex flex-row align-items-center justify-content-between pointer-cursor w-100 remove-button-style`}
                  action={{ modalContent:UpdateEstablishedDate }}
                >
                 <div className="d-flex flex-column text-start">
                    <span className="fw-semibold">Established Year</span>
                    <span className="gainsboro-color fw-light">
                      {schoolDetails.data.established_year === null
                        ? "Add Established Year"
                        : `${formatDate(schoolDetails.data.established_year)}`}
                    </span>
                  </div>
                  <div>
                    <Icon icon="iconamoon:edit-thin" width="24" height="24" />
                  </div>
                </ModalButton>
                <hr />
                <div className={`${darkMode ? 'gainsboro-color' : null} d-flex flex-row align-items-center justify-content-between pointer-cursor remove-button-style`}>
                  <div className={`${darkMode ? 'gainsboro-color' : null} d-flex flex-column`}>
                    <span className="fw-semibold">School Type</span>
                    <span className="gainsboro-color fw-light">
                      {schoolDetails.data.type === null
                        ? "Specify School Type"
                        : schoolDetails.data.type}
                    </span>
                  </div>
                  <div>
                    <Icon icon="iconamoon:edit-thin" width="24" height="24" />
                  </div>
                </div>
                <hr />
                <ModalButton
                  classname={`${darkMode ? 'gainsboro-color' : null} d-flex flex-row align-items-center justify-content-between pointer-cursor w-100 remove-button-style`}
                  action={{ modalContent:UpdateSchoolMotor }}
                >
                  <div className="d-flex flex-column text-start">
                    <span className="fw-semibold">Motor</span>
                    <span className="gainsboro-color fw-light">
                      {schoolDetails.data.motor === null
                        ? "Add School Motor"
                        : schoolDetails.data.motor}
                    </span>
                  </div>
                  <div>
                    <Icon icon="iconamoon:edit-thin" width="24" height="24" />
                  </div>
                </ModalButton>
                <hr />
                <ModalButton
                  classname={`${darkMode ? 'gainsboro-color' : null} d-flex flex-row align-items-center justify-content-between pointer-cursor w-100 remove-button-style`}
                  action={{ modalContent:UploadSchoolLogo }}
                >
                  <div className="d-flex flex-row align-item-center">
                    <div className="d-flex flex-column text-start">
                      <span className="fw-semibold">School Logo</span>
                      <span className="gainsboro-color fw-light">
                        {schoolDetails.data.school_logo === null
                          ? "Add School Logo"
                          : "Update School Logo"}
                      </span>
                    </div>
                  </div>
                  {
                    schoolDetails.data.school_logo === null ? 
                    <div
                    style={{
                      width: "3.5rem",
                      height: "3.5rem",
                      fontSize: "1rem",
                    }}
                    className="primary-background-50 rounded-1 color-primary d-flex flex-row align-items-center justify-content-center"
                  >
                    SL
                  </div> : 
                   <img 
                     className="school-logo"
                     alt="school-logo"
                     src={`http://127.0.0.1:8000/storage/SchoolLogo/${schoolDetails.data.school_logo}`}
                     />
                  }
                </ModalButton>
              </div>
            </div>
            <div>
              <span
                className="my-1 fw-semibold"
                style={{ fontSize: "0.87rem" }}
              >
                School Branches Registered Under this school
              </span>
              {
                schoolDetails.data.schoolbranches.map((items) => (
                  <div
                className={`${darkMode ? 'dark-bg' : 'white-bg'} card p-2 border-none rounded-4 w-100 d-flex flex-column gap-1`}
                style={{ fontSize: "0.87rem" }}
                key={items.id}
              >
                <div className="d-flex flex-row align-items-center justify-content-between pointer-cursor">
                  <div className={`${darkMode ? 'gainsboro-color' : null} d-flex flex-column`}>
                    <span className="fw-semibold">School Branch Name</span>
                    <span className="gainsboro-color fw-light">
                      {items.name == null ? "N/A" : items.name}
                    </span>
                  </div>
                </div>
                <hr />
                <div className="d-flex flex-row align-items-center justify-content-between pointer-cursor">
                  <div className={`${darkMode ? 'gainsboro-color' : null} d-flex flex-column`}>
                    <span className="fw-semibold">Abbrevaition</span>
                    <span className="gainsboro-color fw-light">
                      {items.abbreviation == null ? "N/A" : items.abbreviation}
                    </span>
                  </div>
                </div>
                <hr />
                <div className="d-flex flex-row align-items-center justify-content-between pointer-cursor">
                  <div className={`${darkMode ? 'gainsboro-color' : null} d-flex flex-column`}>
                    <span className="fw-semibold">State</span>
                    <span className="gainsboro-color fw-light">
                      {items.state == null ? "N/A" : items.state}
                    </span>
                  </div>
                </div>
              </div>
                ))
              }
            </div>
            <div>
              <span
                className="my-1 text-danger fw-semibold"
                style={{ fontSize: "0.87rem" }}
              >
                Danger Zone
              </span>
              <div
                className={`${darkMode ? 'dark-bg' : 'white-bg'} card p-2 border-none rounded-4 w-100 d-flex flex-column gap-1`}
                style={{ fontSize: "0.87rem" }}
              >
                <div className="d-flex flex-row align-items-center justify-content-between pointer-cursor">
                  <div className="d-flex flex-row align-items-center justify-content-between w-100">
                    <div className="d-flex flex-column text-danger">
                    <span className="fw-semibold">Delete School</span>
                    <span className="fw-light">
                      {schoolDetails.data.name}
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
                    <div className={`${darkMode ? 'gainsboro-color' : null} d-flex flex-column`}>
                    <span className="fw-semibold">Suspend School</span>
                    <span className="gainsboro-color fw-light">
                      {schoolDetails.data.name}
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
