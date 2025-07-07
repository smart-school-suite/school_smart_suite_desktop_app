import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { IsPathInRoutes } from "../../utils/functions";
import { Settingspaths, AcademicRoutes } from "../../utils/paths";
function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <>
      <div className="col-lg-2 col-sm-2 col-md-2 pe-0 gx-lg-0">
        <aside className=" white-bg d-flex flex-column ps-2  pt-2 pb-4">
          <div className="logo-area">
            <div className="d-flex justify-content-start flex-row gap-3">
               <div className="app-logo">
              <img
              src="./logo/blue_logo.png"
              alt=""
              className="app-logo"
             />
            </div>
            </div>
          </div>
          <div className="nav-container mt-1">
            <div className="nav-items">
              <div className="d-flex flex-column gap-1">
                <NavLink
                  to=""
                  className={({ isActive }) =>
                    isActive
                      ? "nav-item-box-active fw-medium text-decoration-none"
                      : "nav-item-box-inactive text-decoration-none"
                  }
                >
                  <div className="nav-item w-100 d-flex flex-row gap-2">
                    <span>
                      <Icon icon="radix-icons:dashboard" />
                    </span>
                    <p>Dashboard</p>
                  </div>
                </NavLink>
                <div
                  className={
                    location.pathname === "/school-admins"
                      ? "nav-item-box-active fw-medium"
                      : location.pathname === "/departments"
                      ? "nav-item-box-active fw-medium"
                      : location.pathname === "/specialties"
                      ? "nav-item-box-active fw-medium"
                      : location.pathname === "/teachers"
                      ? "nav-item-box-active fw-medium"
                      : location.pathname === "/hod"
                      ? "nav-item-box-active fw-medium"
                      : location.pathname === "/hos"
                      ? "nav-item-box-active fw-medium"
                      : "nav-item-box-inactive"
                  }
                  onClick={() => {
                    navigate("/school-admins");
                  }}
                >
                  <div className="nav-item w-100 d-flex flex-row gap-2">
                    <span>
                      <Icon icon="ri:admin-line" />
                    </span>
                    <p>Administrator</p>
                  </div>
                  <span>
                    <Icon
                      icon="octicon:chevron-down-24"
                      className={
                        location.pathname === "/school-admins"
                          ? "rotate-icon nav-dropdown-icon"
                          : location.pathname === "/departments"
                          ? "rotate-icon nav-dropdown-icon"
                          : location.pathname === "/specialties"
                          ? "rotate-icon nav-dropdown-icon"
                          : location.pathname === "/teachers"
                          ? "rotate-icon nav-dropdown-icon"
                          : location.pathname === "/hod"
                          ? "rotate-icon nav-dropdown-icon"
                          : location.pathname === "/hos"
                          ? "rotate-icon nav-dropdown-icon"
                          : "nav-dropdown-icon"
                      }
                    />
                  </span>
                </div>
                <div
                  className={
                    location.pathname === "/school-admins"
                      ? "subbox-container-nav ps-3"
                      : location.pathname === "/departments"
                      ? "subbox-container-nav ps-3"
                      : location.pathname === "/specialties"
                      ? "subbox-container-nav ps-3"
                      : location.pathname === "/teachers"
                      ? "subbox-container-nav ps-3"
                      : location.pathname === "/hod"
                      ? "subbox-container-nav ps-3"
                      : location.pathname === "/hos"
                      ? "subbox-container-nav ps-3"
                      : "subbox-container-nav-inactive"
                  }
                >
                  <div className="drop-down-container">
                    <div className="box-nav">
                      <div className="subbox-nav">
                        <NavLink
                          to="/school-admins"
                          className={({ isActive }) =>
                            isActive
                              ? "text-decoration-none fw-medium color-primary"
                              : "text-decoration-none gainsboro-color"
                          }
                        >
                          <p>School Admins</p>
                        </NavLink>
                      </div>
                    </div>
                    <div className="box-nav">
                      <div className="subbox-nav">
                        <NavLink
                          to="/departments"
                          className={({ isActive }) =>
                            isActive
                              ? "text-decoration-none fw-medium color-primary"
                              : "text-decoration-none gainsboro-color"
                          }
                        >
                          <p>Departments</p>
                        </NavLink>
                      </div>
                    </div>
                    <div className="box-nav">
                      <div className="subbox-nav">
                        <NavLink
                          to="/specialties"
                          className={({ isActive }) =>
                            isActive
                              ? "text-decoration-none fw-medium color-primary"
                              : "text-decoration-none gainsboro-color"
                          }
                        >
                          <p>Specialties</p>
                        </NavLink>
                      </div>
                    </div>
                    <div className="box-nav">
                      <div className="subbox-nav">
                        <NavLink
                          to="/hod"
                          className={({ isActive }) =>
                            isActive
                              ? "text-decoration-none fw-medium color-primary"
                              : "text-decoration-none gainsboro-color"
                          }
                        >
                          <p>Head of Department</p>
                        </NavLink>
                      </div>
                    </div>
                    <div className="box-nav">
                      <div className="subbox-nav">
                        <NavLink
                          to="/hos"
                          className={({ isActive }) =>
                            isActive
                              ? "text-decoration-none fw-medium color-primary"
                              : "text-decoration-none gainsboro-color"
                          }
                        >
                          <p>Head of Specialty</p>
                        </NavLink>
                      </div>
                    </div>
                    <div className="box-nav">
                      <div className="subbox-nav">
                        <NavLink
                          to="/teachers"
                          className={({ isActive }) =>
                            isActive
                              ? "text-decoration-none fw-medium color-primary"
                              : "text-decoration-none gainsboro-color"
                          }
                        >
                          <p>Teachers</p>
                        </NavLink>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className={
                    IsPathInRoutes(AcademicRoutes.general) ? 
                    "nav-item-box-active fw-medium" : "nav-item-box-inactive"
                  }
                  onClick={() => {
                    navigate("/exams");
                  }}
                >
                  <div className="nav-item w-100 d-flex flex-row gap-2">
                    <span>
                      <Icon
                        icon="mdi:book-edit-outline"
                        className="nav-dropdown-icon"
                      />
                    </span>
                    <p>Academics</p>
                  </div>
                  <span>
                    <Icon
                      icon="octicon:chevron-down-24"
                      className={
                        IsPathInRoutes(AcademicRoutes.general) ? 
                         "rotate-icon nav-dropdown-icon" :
                         "nav-dropdown-icon"
                      }
                    />
                  </span>
                </div>

                <div
                  className={
                    IsPathInRoutes(AcademicRoutes.general) ? 
                    "subbox-container-nav ps-3" :
                    "subbox-container-nav-inactive"
                  }
                >
                  <div className="drop-down-container">
                    <div className="box-nav">
                      <div className="subbox-nav">
                        <p
                          onClick={() => {
                             navigate("/exams")
                          }}
                          className={
                            IsPathInRoutes(AcademicRoutes.examRoutes) ? 
                             "text-decoration-none fw-medium color-primary pointer-cursor"
                             : "text-decoration-none gainsboro-color pointer-cursor"
                          }
                        >
                          Exams
                        </p>
                      </div>
                    </div>
                    <div className="box-nav">
                      <div className="subbox-nav">
                        <span
                          className={
                             IsPathInRoutes(AcademicRoutes.scoreRoutes) ? 
                             "text-decoration-none fw-medium color-primary pointer-cursor"
                             : "text-decoration-none gainsboro-color pointer-cursor"
                          }
                          onClick={() => {
                             navigate("/scores")
                          }}
                        >
                          Student Scores
                        </span>
                      </div>
                    </div>
                    <div className="box-nav">
                      <div className="subbox-nav">
                        <NavLink
                          to="/semesters"
                          className={({ isActive }) =>
                            isActive
                              ? "text-decoration-none fw-medium color-primary"
                              : "text-decoration-none gainsboro-color"
                          }
                        >
                          <p>Semester</p>
                        </NavLink>
                      </div>
                    </div>
                    <div className="box-nav">
                      <div className="subbox-nav">
                        <span
                          onClick={() => {
                             navigate("/time-table")
                          }}
                          className={
                            IsPathInRoutes(AcademicRoutes.timetableRoutes) ? 
                             "text-decoration-none fw-medium color-primary pointer-cursor"
                             : "text-decoration-none gainsboro-color pointer-cursor"
                          }
                        >Time Table</span>
                      </div>
                    </div>
                    <div className="box-nav">
                      <div className="subbox-nav">
                        <span
                          onClick={() => {
                             navigate("/accessed-resit-students")
                          }}
                          className={
                             IsPathInRoutes(AcademicRoutes.examResits) ? 
                             "text-decoration-none fw-medium color-primary pointer-cursor"
                             : "text-decoration-none gainsboro-color pointer-cursor"
                          }
                        >
                          Exam Resits
                        </span>
                      </div>
                    </div>
                    <div className="box-nav">
                      <div className="subbox-nav">
                        <NavLink
                          to="/courses"
                          className={({ isActive }) =>
                            isActive
                              ? "text-decoration-none fw-medium color-primary"
                              : "text-decoration-none gainsboro-color"
                          }
                        >
                          <p>Courses</p>
                        </NavLink>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className={
                    location.pathname === "/students"
                      ? "nav-item-box-active fw-medium"
                      : location.pathname === "/parents"
                      ? "nav-item-box-active fw-medium"
                      : location.pathname === "/student-batches"
                      ? "nav-item-box-active fw-medium"
                      : "nav-item-box-inactive"
                  }
                  onClick={() => {
                    navigate("/students");
                  }}
                >
                  <div className="nav-item w-100 d-flex flex-row gap-2">
                    <span>
                      <Icon icon="ph:student" />
                    </span>
                    <p>Student Management</p>
                  </div>
                  <span>
                    <Icon
                      icon="octicon:chevron-down-24"
                      className={
                        location.pathname === "/students"
                          ? "rotate-icon nav-dropdown-icon"
                          : location.pathname === "/parents"
                          ? "rotate-icon nav-dropdown-icon"
                          : location.pathname === "/student-batches"
                          ? "rotate-icon nav-dropdown-icon"
                          : "nav-dropdown-icon"
                      }
                    />
                  </span>
                </div>

                <div
                  className={
                    location.pathname === "/students"
                      ? "subbox-container-nav ps-3"
                      : location.pathname === "/parents"
                      ? "subbox-container-nav ps-3"
                      : location.pathname === "/student-batches" 
                      ? "subbox-container-nav ps-3"
                      : location.pathname === "/studentDropout"
                      ? "subbox-container-nav ps-3"
                      : "subbox-container-nav-inactive"
                  }
                >
                  <div className="drop-down-container">
                    <div className="box-nav">
                      <div className="subbox-nav">
                        <NavLink
                          to="/students"
                          className={({ isActive }) =>
                            isActive
                              ? "text-decoration-none fw-medium color-primary"
                              : "text-decoration-none gainsboro-color"
                          }
                        >
                          <p>Students</p>
                        </NavLink>
                      </div>
                    </div>
                    <div className="box-nav">
                      <div className="subbox-nav">
                        <NavLink
                          to="/studentDropout"
                          className={({ isActive }) =>
                            isActive
                              ? "text-decoration-none fw-medium color-primary"
                              : "text-decoration-none gainsboro-color"
                          }
                        >
                          <p>Student Dropouts</p>
                        </NavLink>
                      </div>
                    </div>
                    <div className="box-nav">
                      <div className="subbox-nav">
                        <NavLink
                          to="/parents"
                          className={({ isActive }) =>
                            isActive
                              ? "text-decoration-none fw-medium color-primary"
                              : "text-decoration-none gainsboro-color"
                          }
                        >
                          <p>Parents</p>
                        </NavLink>
                      </div>
                    </div>
                    <div className="box-nav">
                      <div className="subbox-nav">
                        <NavLink
                          to="/student-batches"
                          className={({ isActive }) =>
                            isActive
                              ? "text-decoration-none fw-medium color-primary"
                              : "text-decoration-none gainsboro-color"
                          }
                        >
                          <p>Student Batches</p>
                        </NavLink>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className={
                    location.pathname === "/school-expenses"
                      ? "nav-item-box-active fw-medium"
                      : location.pathname === "/resit-payments"
                      ? "nav-item-box-active fw-medium"
                      : location.pathname === "/fee-payments"
                      ? "nav-item-box-active fw-medium"
                      : location.pathname === "/registrationFees"
                      ? "nav-item-box-active fw-medium"
                      : location.pathname === "/additionalFees"
                      ? "nav-item-box-active fw-medium"
                      : location.pathname === "/additionalFeeTransactions"
                      ? "nav-item-box-active fw-medium"
                      : location.pathname === "/registrationFeesTransactions"
                      ? "nav-item-box-active fw-medium"
                      : location.pathname === "/fee-payment/transactions"
                      ? "nav-item-box-active fw-medium"
                      : location.pathname === "/resitFeeTransactions"
                      ? "nav-item-box-active fw-medium"
                      : "nav-item-box-inactive"
                  }
                  onClick={() => {
                    navigate("/school-expenses");
                  }}
                >
                  <div className="nav-item w-100 d-flex flex-row gap-2">
                    <span>
                      <Icon icon="healthicons:money-bag-outline" />
                    </span>
                    <p>Finances</p>
                  </div>
                  <span>
                    <Icon
                      icon="octicon:chevron-down-24"
                      className={
                        location.pathname === "/school-expenses"
                          ? "rotate-icon nav-dropdown-icon"
                          : location.pathname === "/resit-payments"
                          ? "rotate-icon nav-dropdown-icon"
                          : location.pathname === "/fee-payments"
                          ? "rotate-icon nav-dropdown-icon"
                          : location.pathname === "/registrationFees"
                          ? "rotate-icon nav-dropdown-icon"
                          : location.pathname === "/additionalFees"
                          ? "rotate-icon nav-dropdown-icon"
                          : location.pathname === "/additionalFeeTransactions"
                          ? "rotate-icon nav-dropdown-icon"
                          : location.pathname === "/registrationFeesTransactions"
                          ? "rotate-icon nav-dropdown-icon"
                          : location.pathname === "/fee-payment/transactions"
                          ? "rotate-icon nav-dropdown-icon"
                          : location.pathname === "/resitFeeTransactions"
                          ? "rotate-icon nav-dropdown-icon"
                          : "nav-dropdown-icon"
                      }
                    />
                  </span>
                </div>
                <div
                  className={
                    location.pathname === "/school-expenses"
                      ? "subbox-container-nav ps-3"
                      : location.pathname === "/resit-payments"
                      ? "subbox-container-nav ps-3"
                      : location.pathname === "/fee-payments"
                      ? "subbox-container-nav ps-3"
                      : location.pathname === "/registrationFees"
                      ? "subbox-container-nav ps-3"
                      : location.pathname === "/additionalFees"
                      ? "subbox-container-nav ps-3"
                      : location.pathname === "/additionalFeeTransactions"
                      ? "subbox-container-nav ps-3"
                      : location.pathname === "/registrationFeesTransactions"
                      ? "subbox-container-nav ps-3"
                      : location.pathname === "/fee-payment/transactions"
                      ? "subbox-container-nav ps-3"
                      : location.pathname === "/resitFeeTransactions"
                      ? "subbox-container-nav ps-3"
                      : "subbox-container-nav-inactive"
                  }
                >
                  <div className="drop-down-container">
                    <div className="box-nav">
                      <div className="subbox-nav">
                        <NavLink
                          to="/school-expenses"
                          className={({ isActive }) =>
                            isActive
                              ? "text-decoration-none fw-medium color-primary"
                              : "text-decoration-none gainsboro-color"
                          }
                        >
                          <p>School Expenses</p>
                        </NavLink>
                      </div>
                    </div>
                    <div className="box-nav">
                      <div className="subbox-nav">
                        <NavLink
                          to="/resit-payments"
                          className={({ isActive }) =>
                            isActive
                              ? "text-decoration-none fw-medium color-primary"
                              : "text-decoration-none gainsboro-color"
                          }
                        >
                          <p>Resit Fees</p>
                        </NavLink>
                      </div>
                    </div>
                    <div className="box-nav">
                      <div className="subbox-nav">
                        <NavLink
                          to="/fee-payments"
                          className={({ isActive }) =>
                            isActive
                              ? "text-decoration-none fw-medium color-primary"
                              : "text-decoration-none gainsboro-color"
                          }
                        >
                          <p>Tuition Fees</p>
                        </NavLink>
                      </div>
                    </div>
                    <div className="box-nav">
                      <div className="subbox-nav">
                        <NavLink
                          to="/registrationFees"
                          className={({ isActive }) =>
                            isActive
                              ? "text-decoration-none fw-medium color-primary"
                              : "text-decoration-none gainsboro-color"
                          }
                        >
                          <p>Registration Fees</p>
                        </NavLink>
                      </div>
                    </div>
                    <div className="box-nav">
                      <div className="subbox-nav">
                        <NavLink
                          to="/additionalFees"
                          className={({ isActive }) =>
                            isActive
                              ? "text-decoration-none fw-medium color-primary"
                              : "text-decoration-none gainsboro-color"
                          }
                        >
                          <p>Additional Fees</p>
                        </NavLink>
                      </div>
                    </div>
                  </div>
                </div>

                <NavLink
                  to="/events"
                  className={({ isActive }) =>
                    isActive
                      ? "nav-item-box-active fw-medium text-decoration-none"
                      : "nav-item-box-inactive text-decoration-none"
                  }
                >
                  <div className="nav-item w-100 d-flex flex-row gap-2">
                    <span>
                      <Icon icon="ic:outline-event-available" />
                    </span>
                    <p>Events</p>
                  </div>
                </NavLink>
                <div
                  to="/schoolElections"
                  className={
                     location.pathname === "/schoolElections"
                     ? "nav-item-box-active fw-medium"
                     : location.pathname === "/viewElections"
                     ? "nav-item-box-active fw-medium"
                     : location.pathname === "/passWinners"
                     ? "nav-item-box-active fw-medium"
                     : location.pathname === "/passElection"
                     ? "nav-item-box-active fw-medium"
                     : location.pathname === "/electionRoles"
                     ? "nav-item-box-active fw-medium"
                     : location.pathname === "/electionApplication"
                     ? "nav-item-box-active fw-medium"
                     : location.pathname === "/electionCandidates"
                     ? "nav-item-box-active fw-medium"
                     : location.pathname === "/activeElections"
                     ? "nav-item-box-active fw-medium"
                     : location.pathname === "/electionResults"
                     ? "nav-item-box-active fw-medium"
                     : location.pathname === "/electionSettings"
                     ? "nav-item-box-active fw-medium"
                     : "nav-item-box-inactive"
                  }
                  onClick={() => {
                     navigate("schoolElections");
                  }}
                >
                  <div className="nav-item w-100 d-flex flex-row gap-2">
                    <span>
                    <Icon icon="fluent:vote-20-regular" width="20" height="20"  />
                    </span>
                    <p>School Elections</p>
                  </div>
                </div>
                <div
                  className={
                      location.pathname === "/annoucements"
                      ? "nav-item-box-active fw-medium"
                      : location.pathname === "/archieveAnnoucement"
                      ? "nav-item-box-active fw-medium"
                      : location.pathname === "/engagementAnalytics"
                      ? "nav-item-box-active fw-medium"
                      : location.pathname === "/expiredAnnoucement"
                      ? "nav-item-box-active fw-medium"
                      : location.pathname === "/scheduledAnnoucement"
                      ? "nav-item-box-active fw-medium"
                      : location.pathname === "/annoucementSettings"
                      ? "nav-item-box-active fw-medium"
                      : location.pathname === "/viewAnnoucement"
                      ? "nav-item-box-active fw-medium"
                      : "nav-item-box-inactive"
                  }
                  onClick={() => {
                    navigate("/annoucements");
                  }}
                >
                  <div className="nav-item w-100 d-flex flex-row gap-2">
                    <span>
                    <Icon icon="fluent:speaker-0-32-regular" width="20" height="20" />
                    </span>
                    <p>Annoucements</p>
                  </div>
                </div>
                <NavLink
                  to="/customer-support"
                  className={({ isActive }) =>
                    isActive
                      ? "nav-item-box-active fw-medium text-decoration-none"
                      : "nav-item-box-inactive text-decoration-none"
                  }
                >
                  <div className="nav-item w-100 d-flex flex-row gap-2">
                    <span>
                      <Icon icon="streamline:customer-support-1" />
                    </span>
                    <p>Customer Support</p>
                  </div>
                </NavLink>
                <div
                  className={
                      IsPathInRoutes(Settingspaths)
                      ? "nav-item-box-active fw-medium text-decoration-none pointer-cursor"
                      : "nav-item-box-inactive text-decoration-none pointer-cursor"
                  }
                  onClick={() => {
                    navigate("/settings/general-settings");
                  }}
                >
                  <div className="nav-item w-100 d-flex flex-row gap-2">
                    <span>
                      <Icon icon="uil:setting" />
                    </span>
                    <p>Settings</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-auto d-flex flex-column justify-content-center align-items-center w-100">
           
          </div>
        </aside>
      </div>
    </>
  );
}
export default Sidebar;
