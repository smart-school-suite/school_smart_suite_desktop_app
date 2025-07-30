import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { IsPathInRoutes } from "../../utils/functions";
import {
  academicRoutes,
  adminRoutes,
  announcementRoutes,
  dashboardRoutes,
  electionRoutes,
  eventRoutes,
  examRoutes,
  financialRoutes,
  resitRoutes,
  schoolActivities,
  settingRoutes,
  StudentRoutes,
} from "../../utils/paths";
import { ModalButton } from "../DataTableComponents/ActionComponent";
import Logout from "../../ModalContent/Auth/Logout";
function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <>
      <div className="col-lg-2 col-sm-2 col-md-2 pe-0 gx-lg-0">
        <aside className=" white-bg d-flex flex-column ps-2  pt-2 pb-2">
          <div className="logo-area">
            <div className="d-flex justify-content-start flex-row gap-3">
              <div className="app-logo">
                <img src="./logo/blue_logo.png" alt="" className="app-logo" />
              </div>
            </div>
          </div>
          <div className="nav-container mt-1">
            <div className="nav-items">
              <div className="d-flex flex-column gap-1 px-2">
                {/*Dashoard*/}
                <div
                  className={
                    IsPathInRoutes(dashboardRoutes)
                      ? "nav-item-box-active fw-medium text-decoration-none pointer-cursor"
                      : "nav-item-box-inactive text-decoration-none pointer-cursor"
                  }
                  onClick={() => navigate("/")}
                >
                  <div className="nav-item font-size-sm w-100 d-flex flex-row gap-2">
                    <span>
                      <Icon icon="radix-icons:dashboard" />
                    </span>
                    <span>Dashboard</span>
                  </div>
                </div>
                {/*Dashoard*/}

                {/*Administrator*/}
                 <div>
                  <div
                  className={
                    IsPathInRoutes(adminRoutes)
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
                        IsPathInRoutes(adminRoutes)
                          ? "rotate-icon nav-dropdown-icon"
                          : "nav-dropdown-icon"
                      }
                    />
                  </span>
                </div>
                <div
                  className={
                    IsPathInRoutes(adminRoutes)
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
                 </div>
                {/*Administrator*/}

                {/*Academic*/}
                  <div>
                    <div
                  className={
                    IsPathInRoutes(academicRoutes)
                      ? "nav-item-box-active fw-medium"
                      : "nav-item-box-inactive"
                  }
                  onClick={() => {
                    navigate("/grades-configuration");
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
                        IsPathInRoutes(academicRoutes)
                          ? "rotate-icon nav-dropdown-icon"
                          : "nav-dropdown-icon"
                      }
                    />
                  </span>
                </div>
                <div
                  className={
                    IsPathInRoutes(academicRoutes)
                      ? "subbox-container-nav ps-3"
                      : "subbox-container-nav-inactive"
                  }
                >
                  <div className="drop-down-container">
                    <div className="box-nav">
                      <div className="subbox-nav">
                        <p
                          onClick={() => {
                            navigate("/grades-configuration");
                          }}
                          className={
                            location.pathname === "/grades-configuration"
                              ? "text-decoration-none fw-medium color-primary pointer-cursor"
                              : "text-decoration-none gainsboro-color pointer-cursor"
                          }
                        >
                          Grades Configuration
                        </p>
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
                    <div className="box-nav">
                      <div className="subbox-nav">
                        <NavLink
                          to="/time-table"
                          className={({ isActive }) =>
                            isActive
                              ? "text-decoration-none fw-medium color-primary"
                              : "text-decoration-none gainsboro-color"
                          }
                        >
                          <p>Time-table</p>
                        </NavLink>
                      </div>
                    </div>
                  </div>
                </div>
                  </div>
                {/*Administrator*/}

                {/*Exam*/}
                 <div>
                  <div
                  className={
                    IsPathInRoutes(examRoutes)
                      ? "nav-item-box-active fw-medium"
                      : "nav-item-box-inactive"
                  }
                  onClick={() => {
                    navigate("/exam");
                  }}
                >
                  <div className="nav-item w-100 d-flex flex-row gap-2">
                    <span>
                      <Icon icon="healthicons:i-exam-multiple-choice-outline" />
                    </span>
                    <p>Manage Exams</p>
                  </div>
                  <span>
                    <Icon
                      icon="octicon:chevron-down-24"
                      className={
                        IsPathInRoutes(examRoutes)
                          ? "rotate-icon nav-dropdown-icon"
                          : "nav-dropdown-icon"
                      }
                    />
                  </span>
                </div>
                <div
                  className={
                    IsPathInRoutes(examRoutes)
                      ? "subbox-container-nav ps-3"
                      : "subbox-container-nav-inactive"
                  }
                >
                  <div className="drop-down-container">
                    <div className="box-nav">
                      <div className="subbox-nav">
                        <NavLink
                          to="/exam"
                          className={({ isActive }) =>
                            isActive
                              ? "text-decoration-none fw-medium color-primary"
                              : "text-decoration-none gainsboro-color"
                          }
                        >
                          <p>Exam</p>
                        </NavLink>
                      </div>
                    </div>
                    <div className="box-nav">
                      <div className="subbox-nav">
                        <NavLink
                          to="/exam-candidate"
                          className={({ isActive }) =>
                            isActive
                              ? "text-decoration-none fw-medium color-primary"
                              : "text-decoration-none gainsboro-color"
                          }
                        >
                          <p>Exam Candidate</p>
                        </NavLink>
                      </div>
                    </div>
                    <div className="box-nav">
                      <div className="subbox-nav">
                        <NavLink
                          to="/exam-timetable"
                          className={({ isActive }) =>
                            isActive
                              ? "text-decoration-none fw-medium color-primary"
                              : "text-decoration-none gainsboro-color"
                          }
                        >
                          <p>Exam Timetable</p>
                        </NavLink>
                      </div>
                    </div>
                  </div>
                </div>
                 </div>
                {/*Exam*/}

                {/*Resit*/}
                <div>
                  <div
                  className={
                    IsPathInRoutes(resitRoutes)
                      ? "nav-item-box-active fw-medium"
                      : "nav-item-box-inactive"
                  }
                  onClick={() => {
                    navigate("/resit-exams");
                  }}
                >
                  <div className="nav-item w-100 d-flex flex-row gap-2">
                    <span>
                      <Icon icon="material-symbols:repeat-rounded" />
                    </span>
                    <p>Manage Resit</p>
                  </div>
                  <span>
                    <Icon
                      icon="octicon:chevron-down-24"
                      className={
                        IsPathInRoutes(resitRoutes)
                          ? "rotate-icon nav-dropdown-icon"
                          : "nav-dropdown-icon"
                      }
                    />
                  </span>
                </div>
                <div
                  className={
                    IsPathInRoutes(resitRoutes)
                      ? "subbox-container-nav ps-3"
                      : "subbox-container-nav-inactive"
                  }
                >
                  <div className="drop-down-container">
                    <div className="box-nav">
                      <div className="subbox-nav">
                        <NavLink
                          to="/resit-exams"
                          className={({ isActive }) =>
                            isActive
                              ? "text-decoration-none fw-medium color-primary"
                              : "text-decoration-none gainsboro-color"
                          }
                        >
                          <p>Resit Exam</p>
                        </NavLink>
                      </div>
                    </div>
                    <div className="box-nav">
                      <div className="subbox-nav">
                        <NavLink
                          to="/resit-candidate"
                          className={({ isActive }) =>
                            isActive
                              ? "text-decoration-none fw-medium color-primary"
                              : "text-decoration-none gainsboro-color"
                          }
                        >
                          <p>Resit Candidate</p>
                        </NavLink>
                      </div>
                    </div>
                    <div className="box-nav">
                      <div className="subbox-nav">
                        <NavLink
                          to="/resit-timetable"
                          className={({ isActive }) =>
                            isActive
                              ? "text-decoration-none fw-medium color-primary"
                              : "text-decoration-none gainsboro-color"
                          }
                        >
                          <p>Resit Timetable</p>
                        </NavLink>
                      </div>
                    </div>
                    <div className="box-nav">
                      <div className="subbox-nav">
                        <NavLink
                          to="/student-resit"
                          className={({ isActive }) =>
                            isActive
                              ? "text-decoration-none fw-medium color-primary"
                              : "text-decoration-none gainsboro-color"
                          }
                        >
                          <p>Student Resit</p>
                        </NavLink>
                      </div>
                    </div>
                  </div>
                </div>
                </div>
                {/*Resit*/}

                {/*student*/}
                <div>
                  <div
                  className={
                    IsPathInRoutes(StudentRoutes)
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
                    <p>Manage Students</p>
                  </div>
                  <span>
                    <Icon
                      icon="octicon:chevron-down-24"
                      className={
                        IsPathInRoutes(StudentRoutes)
                          ? "rotate-icon nav-dropdown-icon"
                          : "nav-dropdown-icon"
                      }
                    />
                  </span>
                </div>
                <div
                  className={
                    IsPathInRoutes(StudentRoutes)
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
                </div>
                {/*student*/}

                {/*School Expenses*/}
                <div>
                  <div
                  className={
                    IsPathInRoutes(financialRoutes)
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
                        IsPathInRoutes(financialRoutes)
                          ? "rotate-icon nav-dropdown-icon"
                          : "nav-dropdown-icon"
                      }
                    />
                  </span>
                </div>
                <div
                  className={
                    IsPathInRoutes(financialRoutes)
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
                          to="/registration-fees"
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
                </div>
                {/*School Expenses*/}

              </div>
            </div>
          </div>
          <div className="mt-auto d-flex gap-2 flex-column justify-content-center align-items-center w-100 px-2">
            {/*Settings*/}
            <div
              className={`${IsPathInRoutes(settingRoutes) ? "sidebar-active" : ""} sidebar-item`}
              onClick={() => {
                navigate("/settings/general-settings");
              }}
            >
              <span>Setting</span>
              <span>
                <Icon icon="uil:setting" />
              </span>
            </div>
            {/*Settings*/}
            <div className="w-100">
              <ModalButton
                action={{ modalContent: Logout }}
                classname="sidebar-item transparent-bg"
              >
                <span>Logout</span>
                <span>
                  <Icon icon="mynaui:logout" />
                </span>
              </ModalButton>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
export default Sidebar;
