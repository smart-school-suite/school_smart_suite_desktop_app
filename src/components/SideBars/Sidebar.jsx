import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { IsPathInRoutes } from "../../utils/functions";
import {
  academicRoutes,
  additionalFeeRoutes,
  adminRoutes,
  announcementRoutes,
  dashboardRoutes,
  electionRoutes,
  eventRoutes,
  examRoutes,
  financialRoutes,
  registrationFeeRoutes,
  resitFeeRoutes,
  resitRoutes,
  schoolActivities,
  schoolExpenseRoutes,
  settingRoutes,
  StudentRoutes,
  tuitionFeeRoutes,
} from "../../utils/paths";
import { ModalButton } from "../DataTableComponents/ActionComponent";
import Logout from "../../ModalContent/Auth/Logout";
import { useSelector } from "react-redux";
import {
  useFloating,
  offset,
  flip,
  shift,
  autoUpdate,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
} from "@floating-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback } from "react";
function Sidebar() {
  return (
    <>
      <SideBarLg />
    </>
  );
}
export default Sidebar;

function SideBarSm() {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const navigate = useNavigate();
  return (
    <>
      <div className={`d-flex flex-column w-100 ${darkMode ? 'dark-mode' : 'white-bg'} py-2 h-100 align-items-center`}>
        <div className="d-flex flex-column gap-5">
          <div className="app-logo">
            <img
              src="./logo/sss-logo-rounded.png"
              style={{
                width: "2rem",
                height: "2rem",
                objectFit: "contain",
                borderRadius: "0.4rem",
              }}
            />
          </div>
          <div className="d-flex flex-column gap-3">
            {sideBarData.map((items, index) => (
              <SideBarSmTab items={items} key={index} />
            ))}
          </div>
        </div>
        <div className="mt-auto">
          <div className="d-flex flex-column gap-3">
            <div className={`sidebar-sm menu-tab  ${IsPathInRoutes(settingRoutes) ? 'active' : 'inactive'}`}
             onClick={() => {
                 navigate('/settings/general-settings')
             }}
            >
              <Icon icon="uil:setting" />
            </div>
            <ModalButton
                action={{ modalContent: Logout }}
                classname="sidebar-sm menu-tab inactive hover-danger"
              >
                  <Icon icon="mynaui:logout" />
              </ModalButton>
          </div>
        </div>
      </div>
    </>
  );
}
function SideBarLg() {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <>
      <div className="w-100">
        <aside
          className={`${
            darkMode
              ? "dark-bg d-flex flex-column ps-2  pt-2 pb-2"
              : "white-bg  d-flex flex-column ps-2  pt-2 pb-2"
          }`}
        >
          <div className="logo-area mb-3">
            <div className="d-flex justify-content-start flex-row gap-2 ps-2 align-items-center">
              <div className="app-logo">
                <img
                  src="./logo/sss-logo-rounded.png"
                  alt=""
                  className="app-logo"
                />
              </div>
              <span className="font-size-sm fw-semibold color-primary">
                SMART SCHOOL SUITE
              </span>
            </div>
          </div>
          <div className="nav-container mt-1">
            <div className="nav-items">
              <div className="d-flex flex-column gap-1 px-2">
                {/*Dashoard*/}
                <div
                  className={
                    IsPathInRoutes(dashboardRoutes)
                      ? `${
                          darkMode
                            ? "nav-items-box-active-dark"
                            : "nav-item-box-active"
                        }`
                      : "nav-item-box-inactive"
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
                        ? `${
                            darkMode
                              ? "nav-items-box-active-dark"
                              : "nav-item-box-active"
                          }`
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
                    <div
                      className={`${
                        darkMode
                          ? "drop-down-container-dark"
                          : "drop-down-container"
                      }`}
                    >
                      <div
                        className={`${darkMode ? "box-nav-dark" : "box-nav"}`}
                      >
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
                      <div
                        className={`${darkMode ? "box-nav-dark" : "box-nav"}`}
                      >
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
                      <div
                        className={`${darkMode ? "box-nav-dark" : "box-nav"}`}
                      >
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
                      <div
                        className={`${darkMode ? "box-nav-dark" : "box-nav"}`}
                      >
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
                        ? `${
                            darkMode
                              ? "nav-items-box-active-dark"
                              : "nav-item-box-active"
                          }`
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
                    <div
                      className={`${
                        darkMode
                          ? "drop-down-container-dark"
                          : "drop-down-container"
                      }`}
                    >
                      <div
                        className={`${darkMode ? "box-nav-dark" : "box-nav"}`}
                      >
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
                      <div
                        className={`${darkMode ? "box-nav-dark" : "box-nav"}`}
                      >
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
                      <div
                        className={`${darkMode ? "box-nav-dark" : "box-nav"}`}
                      >
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
                      <div
                        className={`${darkMode ? "box-nav-dark" : "box-nav"}`}
                      >
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
                        ? `${
                            darkMode
                              ? "nav-items-box-active-dark"
                              : "nav-item-box-active"
                          }`
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
                    <div
                      className={`${
                        darkMode
                          ? "drop-down-container-dark"
                          : "drop-down-container"
                      }`}
                    >
                      <div
                        className={`${darkMode ? "box-nav-dark" : "box-nav"}`}
                      >
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
                      <div
                        className={`${darkMode ? "box-nav-dark" : "box-nav"}`}
                      >
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
                      <div
                        className={`${darkMode ? "box-nav-dark" : "box-nav"}`}
                      >
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
                      <div
                        className={`${darkMode ? "box-nav-dark" : "box-nav"}`}
                      >
                        <div className="subbox-nav">
                          <NavLink
                            to="/exam-results"
                            className={({ isActive }) =>
                              isActive
                                ? "text-decoration-none fw-medium color-primary"
                                : "text-decoration-none gainsboro-color"
                            }
                          >
                            <p>Exam Results</p>
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
                        ? `${
                            darkMode
                              ? "nav-items-box-active-dark"
                              : "nav-item-box-active"
                          }`
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
                    <div
                      className={`${
                        darkMode
                          ? "drop-down-container-dark"
                          : "drop-down-container"
                      }`}
                    >
                      <div
                        className={`${darkMode ? "box-nav-dark" : "box-nav"}`}
                      >
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
                      <div
                        className={`${darkMode ? "box-nav-dark" : "box-nav"}`}
                      >
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
                      <div
                        className={`${darkMode ? "box-nav-dark" : "box-nav"}`}
                      >
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
                      <div
                        className={`${darkMode ? "box-nav-dark" : "box-nav"}`}
                      >
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
                        ? `${
                            darkMode
                              ? "nav-items-box-active-dark"
                              : "nav-item-box-active"
                          }`
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
                    <div
                      className={`${
                        darkMode
                          ? "drop-down-container-dark"
                          : "drop-down-container"
                      }`}
                    >
                      <div
                        className={`${darkMode ? "box-nav-dark" : "box-nav"}`}
                      >
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
                      <div
                        className={`${darkMode ? "box-nav-dark" : "box-nav"}`}
                      >
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
                      <div
                        className={`${darkMode ? "box-nav-dark" : "box-nav"}`}
                      >
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
                      <div
                        className={`${darkMode ? "box-nav-dark" : "box-nav"}`}
                      >
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

                {/*media*/}
                <div>
                  <div
                    className={
                      IsPathInRoutes(schoolActivities)
                        ? `${
                            darkMode
                              ? "nav-items-box-active-dark"
                              : "nav-item-box-active"
                          }`
                        : "nav-item-box-inactive"
                    }
                    onClick={() => {
                      navigate("/announcement-overview");
                    }}
                  >
                    <div className="nav-item w-100 d-flex flex-row gap-2">
                      <span>
                        <Icon icon="healthicons:money-bag-outline" />
                      </span>
                      <p>School Activities</p>
                    </div>
                    <span>
                      <Icon
                        icon="octicon:chevron-down-24"
                        className={
                          IsPathInRoutes(schoolActivities)
                            ? "rotate-icon nav-dropdown-icon"
                            : "nav-dropdown-icon"
                        }
                      />
                    </span>
                  </div>
                  <div
                    className={
                      IsPathInRoutes(schoolActivities)
                        ? "subbox-container-nav ps-3"
                        : "subbox-container-nav-inactive"
                    }
                  >
                    <div
                      className={`${
                        darkMode
                          ? "drop-down-container-dark"
                          : "drop-down-container"
                      }`}
                    >
                      <div
                        className={`${darkMode ? "box-nav-dark" : "box-nav"}`}
                      >
                        <div className="subbox-nav">
                          <div
                            onClick={() => {
                              navigate("/announcement-overview");
                            }}
                            className={
                              IsPathInRoutes(announcementRoutes)
                                ? "text-decoration-none fw-medium color-primary pointer-cursor"
                                : "text-decoration-none gainsboro-color pointer-cursor"
                            }
                          >
                            <p>Announcements</p>
                          </div>
                        </div>
                      </div>
                      <div
                        className={`${darkMode ? "box-nav-dark" : "box-nav"}`}
                      >
                        <div className="subbox-nav">
                          <div
                            onClick={() => {
                              navigate("/election-overview");
                            }}
                            className={
                              IsPathInRoutes(electionRoutes)
                                ? "text-decoration-none fw-medium color-primary pointer-cursor"
                                : "text-decoration-none gainsboro-color pointer-cursor"
                            }
                          >
                            <p>School Elections</p>
                          </div>
                        </div>
                      </div>
                      <div
                        className={`${darkMode ? "box-nav-dark" : "box-nav"}`}
                      >
                        <div className="subbox-nav">
                          <div
                            onClick={() => {
                              navigate("/events");
                            }}
                            className={
                              IsPathInRoutes(eventRoutes)
                                ? "text-decoration-none fw-medium color-primary pointer-cursor"
                                : "text-decoration-none gainsboro-color pointer-cursor"
                            }
                          >
                            <p>School Events</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/*media*/}

                {/*School Expenses*/}
                <div>
                  <div
                    className={
                      IsPathInRoutes(financialRoutes)
                        ? `${
                            darkMode
                              ? "nav-items-box-active-dark"
                              : "nav-item-box-active"
                          }`
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
                    <div
                      className={`${
                        darkMode
                          ? "drop-down-container-dark"
                          : "drop-down-container"
                      }`}
                    >
                      <div
                        className={`${darkMode ? "box-nav-dark" : "box-nav"}`}
                      >
                        <div className="subbox-nav">
                          <div
                            onClick={() => {
                              navigate("/school-expenses");
                            }}
                            className={
                              IsPathInRoutes(schoolExpenseRoutes)
                                ? "text-decoration-none fw-medium color-primary pointer-cursor"
                                : "text-decoration-none gainsboro-color pointer-cursor"
                            }
                          >
                            <p>School Expenses</p>
                          </div>
                        </div>
                      </div>
                      <div
                        className={`${darkMode ? "box-nav-dark" : "box-nav"}`}
                      >
                        <div className="subbox-nav">
                          <div
                            onClick={() => {
                              navigate("/resit-payments");
                            }}
                            className={
                              IsPathInRoutes(resitFeeRoutes)
                                ? "text-decoration-none fw-medium color-primary pointer-cursor"
                                : "text-decoration-none gainsboro-color pointer-cursor"
                            }
                          >
                            <p>Resit Fees</p>
                          </div>
                        </div>
                      </div>
                      <div
                        className={`${darkMode ? "box-nav-dark" : "box-nav"}`}
                      >
                        <div className="subbox-nav">
                          <div
                            onClick={() => {
                              navigate("/fee-payments");
                            }}
                            className={
                              IsPathInRoutes(tuitionFeeRoutes)
                                ? "text-decoration-none fw-medium color-primary pointer-cursor"
                                : "text-decoration-none gainsboro-color pointer-cursor"
                            }
                          >
                            <p>Tuition Fees</p>
                          </div>
                        </div>
                      </div>
                      <div
                        className={`${darkMode ? "box-nav-dark" : "box-nav"}`}
                      >
                        <div className="subbox-nav">
                          <div
                            onClick={() => {
                              navigate("/registration-fees");
                            }}
                            className={
                              IsPathInRoutes(registrationFeeRoutes)
                                ? "text-decoration-none fw-medium color-primary pointer-cursor"
                                : "text-decoration-none gainsboro-color pointer-cursor"
                            }
                          >
                            <p>Registration Fees</p>
                          </div>
                        </div>
                      </div>
                      <div
                        className={`${darkMode ? "box-nav-dark" : "box-nav"}`}
                      >
                        <div className="subbox-nav">
                          <div
                            onClick={() => {
                              navigate("/additional-fees");
                            }}
                            className={
                              IsPathInRoutes(additionalFeeRoutes)
                                ? "text-decoration-none fw-medium color-primary pointer-cursor"
                                : "text-decoration-none gainsboro-color pointer-cursor"
                            }
                          >
                            <p>Additional Fees</p>
                          </div>
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
              className={`${
                IsPathInRoutes(settingRoutes)
                  ? `${darkMode ? "sidebar-active-dark" : "sidebar-active"}`
                  : ""
              } sidebar-item`}
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

function SideBarSmTab({ items }) {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: "left-center",
    middleware: [offset(100), flip(), shift()],
    whileElementsMounted: autoUpdate,
  });

 const click = useClick(context, { toggle: true });
  const dismiss = useDismiss(context);
  const role = useRole(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

  const handleTriggerClick = useCallback(
    (e) => {
      const floatingOnClick = getReferenceProps().onClick;
      if (floatingOnClick) floatingOnClick(e);
      if(!items.menu){
         navigate(items.path)
      }
    },
    [getReferenceProps]
  );
  const routeMap = {
      dashboard:dashboardRoutes,
      administrator:adminRoutes,
      academics:academicRoutes,
      exams:examRoutes,
      resit:resitRoutes,
      student:StudentRoutes,
      schoolActivities:schoolActivities,
      finances:financialRoutes
  }
  return (
    <div className="position-relative inline-block">
      <button
        ref={refs.setReference}
        {...getReferenceProps()}
        className={`sidebar-sm menu-tab ${IsPathInRoutes(routeMap[items.key]) ? 'active' : 'inactive'}`}
        aria-expanded={isOpen}
        onClick={handleTriggerClick}
      >
        <Icon icon={`${IsPathInRoutes(routeMap[items.key]) ? items.iconFilled : items.iconOutlined}`} />
      </button>
      {items.menu && (
        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={refs.setFloating}
              style={{
                ...floatingStyles,
                position: "absolute",
                zIndex: 9999,
              }}
              {...getFloatingProps()}
              className={`sidebar-sm  menu border p-2 ${darkMode ? 'dark-bg' : 'bg-white'} rounded shadow-lg`}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 12 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
            >
              {items.menuItems.map((item, index) => {
                const isLastElement = index === items.menuItems.length - 1;
                return (
                  <>
                    <div
                      className="d-flex flex-row align-items-center justify-content-between px-2  pointer-cursor sidebar-sm menu-item"
                      key={index}
                      onClick={() => {
                         navigate(item.path)
                         setIsOpen(false)
                      }}
                    >
                      <span>{item.title}</span>
                      <Icon icon={item.iconOutlined} className="fs-6"/>
                    </div>
                    {!isLastElement && <hr />}
                  </>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
const sideBarData = [
  {
    title: "Dasboard",
    iconFilled: "mage:dashboard-fill",
    iconOutlined: "mage:dashboard",
    menu: false,
    path: "/",
    key:"dashboard"
  },
  {
    title: "Administrator",
    iconFilled: "clarity:administrator-solid",
    iconOutlined: "clarity:administrator-line",
    menu: true,
    path: "/school-admins",
    key:"administrator",
    menuItems: [
      {
        title: "School Admins",
        iconFilled: "clarity:administrator-solid",
        iconOutlined: "clarity:administrator-line",
        path: "/school-admins",
      },
      {
        title: "Departments",
        iconFilled: "mingcute:department-fill",
        iconOutlined: "mingcute:department-line",
        path: "/departments",
      },
      {
        title: "Specialties",
        iconFilled: "pepicons-pop:ruler-circle-filled",
        iconOutlined: "pepicons-pop:ruler-circle",
        path: "/specialties",
      },
      {
        title: "Teachers",
        iconFilled: "ph:chalkboard-teacher-fill",
        iconOutlined: "ph:chalkboard-teacher-light",
        path: "/teachers",
      },
    ],
  },
  {
    title: "Academics",
    iconFilled: "heroicons:academic-cap-16-solid",
    iconOutlined: "heroicons:academic-cap",
    path: "/grades-configuration",
    menu: true,
    key:"academics",
    menuItems: [
      {
        title: "Grades Configuration",
        iconFilled: "healthicons:i-exam-qualification",
        iconOutlined: "healthicons:i-exam-qualification-outline",
        path: "/grades-configuration",
      },
      {
        title: "Semester",
        iconFilled: "ph:calendar-fill",
        iconOutlined: "ph:calendar-light",
        path: "/semesters",
      },
      {
        title: "Course",
        iconFilled: "si:book-fill",
        iconOutlined: "si:book-line",
        path: "/courses",
      },
      {
        title: "Timetable",
        iconFilled: "ant-design:schedule-filled",
        iconOutlined: "ant-design:schedule-outlined",
        path: "/time-table",
      },
    ],
  },
  {
    title: "Manage Exams",
    iconFilled: "healthicons:i-exam-multiple-choice",
    iconOutlined: "healthicons:i-exam-multiple-choice-outline",
    path: "/exam",
    menu: true,
    key:"exams",
    menuItems: [
      {
        title: "Exam",
        iconFilled: "healthicons:i-exam-multiple-choice",
        iconOutlined: "healthicons:i-exam-multiple-choice-outline",
        path: "/exam",
      },
      {
        title: "Exam Candidate",
        iconFilled: "fluent:document-person-16-filled",
        iconOutlined: "fluent:document-person-16-regular",
        path: "/exam-candidate",
      },
      {
        title: "Exam Timetable",
        iconFilled: "ant-design:schedule-filled",
        iconOutlined: "ant-design:schedule-outlined",
        path: "/exam-timetable",
      },
      {
        title: "Exam Results",
        iconFilled: "lets-icons:chart",
        iconOutlined: "lets-icons:chart-fill",
        path: "/exam-results",
      },
    ],
  },
  {
    title: "Manage Resit",
    iconFilled: "pepicons-pop:repeat-circle-filled",
    iconOutlined: "pepicons-pop:repeat-circle",
    path: "/resit-exams",
    menu: true,
    key:"resit",
    menuItems: [
      {
        title: "Resit Exam",
        iconFilled: "healthicons:i-exam-multiple-choice",
        iconOutlined: "healthicons:i-exam-multiple-choice-outline",
        path: "/resit-exams",
      },
      {
        title: "Resit Candidate",
        iconFilled: "fluent:document-person-16-filled",
        iconOutlined: "fluent:document-person-16-regular",
        path: "/resit-candidate",
      },
      {
        title: "Resit Timetable",
        iconFilled: "ant-design:schedule-filled",
        iconOutlined: "ant-design:schedule-outlined",
        path: "/resit-timetable",
      },
      {
        title: "Student Resit",
        iconFilled: "pepicons-pop:repeat-circle-filled",
        iconOutlined: "pepicons-pop:repeat-circle",
        path: "/student-resit",
      },
    ],
  },
  {
    title: "Manage Student",
    iconOutlined: "mdi:account-student-outline",
    iconFilled: "mdi:account-student",
    path: "/students",
    menu: true,
    key:"student",
    menuItems: [
      {
        title: "Students",
        iconOutlined: "mdi:account-student-outline",
        iconFilled: "mdi:account-student",
        path: "/students",
      },
      {
        title: "Student Dropouts",
        iconFilled: "clarity:sign-out-solid",
        iconOutlined: "clarity:sign-out-line",
        path: "/studentDropout",
      },
      {
        title: "Parents",
        iconFilled: "ri:parent-fill",
        iconOutlined: "ri:parent-line",
        path: "/parents",
      },
      {
        title: "Student Batches",
        iconFilled: "typcn:group",
        iconOutlined: "typcn:group-outline",
        path: "/student-batches",
      },
    ],
  },
  {
    title: "School Activities",
    iconFilled: "mynaui:activity-square-solid",
    iconOutlined: "mynaui:activity-square",
    path: "/announcement-overview",
    menu: true,
    key:"schoolActivities",
    menuItems: [
      {
        title: "Announcements",
        iconFilled: "streamline-plump:announcement-megaphone-solid",
        iconOutlined: "streamline-plump:announcement-megaphone",
        path: "/announcement-overview",
      },
      {
        title: "School Elections",
        iconFilled: "streamline-flex:politics-vote-2-solid",
        iconOutlined: "streamline-flex:politics-vote-2-remix",
        path: "/election-overview",
      },
      {
        title: "Events",
        iconFilled: "clarity:event-solid",
        iconOutlined: "clarity:event-line",
        path: "/events",
      },
    ],
  },
  {
    title: "Finances",
    iconFilled: "healthicons:money-bag",
    iconOutlined: "healthicons:money-bag-outline",
    menu: true,
    path: "/school-expenses",
    key:"finances",
    menuItems: [
      {
        title: "School Expenses",
        iconFilled: "fluent:money-hand-20-filled",
        iconOutlined: "fluent:money-hand-16-regular",
        path: "/school-expenses",
      },
      {
        title: "Resit Fees",
        iconFilled: "pepicons-pop:repeat-circle-filled",
        iconOutlined: "pepicons-pop:repeat-circle",
        path: "/resit-payments",
      },
      {
        title: "Tuition Fees",
        iconFilled: "solar:money-bag-bold",
        iconOutlined: "solar:money-bag-linear",
        path: "/fee-payments",
      },
      {
        title: "Registration Fees",
        iconFilled: "mdi:register",
        iconOutlined: "mdi:register-outline",
        path: "/registration-fees",
      },
      {
        title: "Additional Fees",
        iconFilled: "teenyicons:bag-plus-solid",
        iconOutlined: "teenyicons:bag-plus-outline",
        path: "/additional-fees",
      },
    ],
  },
];
