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
  teacherRoutes,
  hallRoutes,
  activationCodeRoutes,
  courseRoutes,
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
import {
  LayoutDashboard,
  UserRoundCog,
  BookOpenCheck,
  FileSpreadsheet,
  RotateCcw,
  Users,
  Activity,
  Wallet,
  UserPlus,
  Settings,
  LogOut,
  UnfoldHorizontal,
  PanelLeftClose,
  ShieldCheck,
  Building2,
  Boxes,
  GraduationCap,
  Award,
  Calendar,
  BookOpen,
  Clock,
  FileCheck2,
  BarChart2,
  UserX,
  Megaphone,
  Vote,
  CalendarDays,
  Receipt,
  CircleDollarSign,
  PlusCircle,
  Eye,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useCallback } from "react";
import useScreenSize from "../../hooks/ui/useScreenSize";
import HorizontalDashedLine from "../DashedLine/HorizonetalDashedLine";
function Sidebar() {
  const { is } = useScreenSize();
  return <>{is.sm || is.md ? <SideBarSm /> : <SideBarLg />}</>;
}
export default Sidebar;

function SideBarSm() {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const navigate = useNavigate();
  return (
    <>
      <div
        className={`d-flex flex-column w-100 ${
          darkMode ? "dark-mode" : "white-bg"
        } py-2 h-100 align-items-center`}
      >
        <div className="d-flex flex-column gap-5">
          <div className="app-logo">
            <img
              src="./logo/logo-transparent.png"
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
            <div
              className={`sidebar-sm menu-tab  ${
                IsPathInRoutes(settingRoutes) ? "active" : "inactive"
              }`}
              onClick={() => {
                navigate("/settings/general-settings");
              }}
            >
              <Settings size={16} strokeWidth={1.75} />
            </div>
            <ModalButton
              action={{ modalContent: Logout }}
              classname="sidebar-sm menu-tab inactive hover-danger"
            >
              <LogOut size={16} strokeWidth={1.75} />
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
              ? "dark-bg d-flex flex-column "
              : "white-bg  d-flex flex-column"
          }`}
        >
          <div className="logo-area mb-1 ps-2  pt-2 pb-2">
            <div className="d-flex justify-content-between flex-row gap-2 px-2  align-items-center">
              <div className="d-flex flex-row align-items-center gap-2">
                <div className="app-logo">
                  <img
                    src="./logo/logo-transparent.png"
                    alt=""
                    className="app-logo"
                  />
                </div>
              </div>
              <button className="border-none bg-none mb-1">
                <PanelLeftClose size={16} className="text-iron-500" />
              </button>
            </div>
          </div>
          <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.3} />
          <div className="nav-container mt-1 ps-2  pt-2 pb-2">
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
                    <span style={{ lineHeight: 0 }}>
                      <LayoutDashboard size={16} />
                    </span>
                    <span style={{ fontSize: "0.75rem" }}>Dashboard</span>
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
                      <span style={{ lineHeight: 0 }}>
                        <UserRoundCog size={16} />
                      </span>
                      <p style={{ fontSize: "0.75rem" }}>Administrator</p>
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
                                ? "text-decoration-none  color-primary"
                                : "text-decoration-none text-dark "
                            }
                          >
                            <p style={{ fontSize: "0.75rem" }}>School Admins</p>
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
                                ? "text-decoration-none  color-primary"
                                : "text-decoration-none text-dark "
                            }
                          >
                            <p style={{ fontSize: "0.75rem" }}>Departments</p>
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
                                ? "text-decoration-none  color-primary"
                                : "text-decoration-none text-dark "
                            }
                          >
                            <p style={{ fontSize: "0.75rem" }}>Specialties</p>
                          </NavLink>
                        </div>
                      </div>
                      <div
                        className={`${darkMode ? "box-nav-dark" : "box-nav"}`}
                      >
                        <div className="subbox-nav">
                          <div
                            onClick={() => {
                              navigate("/teacher");
                            }}
                            className={
                              IsPathInRoutes(teacherRoutes)
                                ? "text-decoration-none  color-primary pointer-cursor"
                                : "text-decoration-none text-dark  pointer-cursor"
                            }
                          >
                            <p style={{ fontSize: "0.75rem" }}>Teacher</p>
                          </div>
                        </div>
                      </div>
                      <div
                        className={`${darkMode ? "box-nav-dark" : "box-nav"}`}
                      >
                        <div className="subbox-nav">
                          <div
                            onClick={() => {
                              navigate("/hall");
                            }}
                            className={
                              IsPathInRoutes(hallRoutes)
                                ? "text-decoration-none  color-primary pointer-cursor"
                                : "text-decoration-none text-dark  pointer-cursor"
                            }
                          >
                            <p style={{ fontSize: "0.75rem" }}>Halls</p>
                          </div>
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
                      <span style={{ lineHeight: 0 }}>
                        <BookOpenCheck size={16} />
                      </span>
                      <p style={{ fontSize: "0.75rem" }}>Academics</p>
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
                                ? "text-decoration-none  color-primary pointer-cursor"
                                : "text-decoration-none text-dark  pointer-cursor"
                            }
                            style={{ fontSize: "0.75rem" }}
                          >
                            Grades Scale
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
                                ? "text-decoration-none  color-primary"
                                : "text-decoration-none text-dark "
                            }
                          >
                            <p style={{ fontSize: "0.75rem" }}>Semester</p>
                          </NavLink>
                        </div>
                      </div>
                      <div
                        className={`${darkMode ? "box-nav-dark" : "box-nav"}`}
                      >
                        <div className="subbox-nav">
                          <NavLink
                            to="/academic-year"
                            className={({ isActive }) =>
                              isActive
                                ? "text-decoration-none  color-primary"
                                : "text-decoration-none text-dark "
                            }
                          >
                            <p style={{ fontSize: "0.75rem" }}>Academic Year</p>
                          </NavLink>
                        </div>
                      </div>
                      <div
                        className={`${darkMode ? "box-nav-dark" : "box-nav"}`}
                      >
                        <div className="subbox-nav">
                          <div
                            onClick={() => {
                              navigate("/courses");
                            }}
                            className={
                              IsPathInRoutes(courseRoutes)
                                ? "text-decoration-none  color-primary pointer-cursor"
                                : "text-decoration-none text-dark  pointer-cursor"
                            }
                          >
                            <p style={{ fontSize: "0.75rem" }}>Courses</p>
                          </div>
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
                                ? "text-decoration-none  color-primary"
                                : "text-decoration-none text-dark "
                            }
                          >
                            <p style={{ fontSize: "0.75rem" }}>Time-table</p>
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
                      <span style={{ lineHeight: 0 }}>
                        <FileSpreadsheet size={16} />
                      </span>
                      <p style={{ fontSize: "0.75rem" }}>Manage Exams</p>
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
                                ? "text-decoration-none  color-primary"
                                : "text-decoration-none text-dark "
                            }
                          >
                            <p style={{ fontSize: "0.75rem" }}>Exam</p>
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
                                ? "text-decoration-none  color-primary"
                                : "text-decoration-none text-dark "
                            }
                          >
                            <p style={{ fontSize: "0.75rem" }}>
                              Exam Candidate
                            </p>
                          </NavLink>
                        </div>
                      </div>
                      <div
                        className={`${darkMode ? "box-nav-dark" : "box-nav"}`}
                      >
                        <div className="subbox-nav">
                          <NavLink
                            to="/exam-invigilator"
                            className={({ isActive }) =>
                              isActive
                                ? "text-decoration-none  color-primary"
                                : "text-decoration-none text-dark "
                            }
                          >
                            <p style={{ fontSize: "0.75rem" }}>
                              Exam Invigilator
                            </p>
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
                                ? "text-decoration-none  color-primary"
                                : "text-decoration-none text-dark "
                            }
                          >
                            <p style={{ fontSize: "0.75rem" }}>
                              Exam Timetable
                            </p>
                          </NavLink>
                        </div>
                      </div>
                      <div
                        className={`${darkMode ? "box-nav-dark" : "box-nav"}`}
                      >
                        <div className="subbox-nav">
                          <NavLink
                            to="/exam-result"
                            className={({ isActive }) =>
                              isActive
                                ? "text-decoration-none  color-primary"
                                : "text-decoration-none text-dark "
                            }
                          >
                            <p style={{ fontSize: "0.75rem" }}>Exam Result</p>
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
                      <span style={{ lineHeight: 0 }}>
                        <RotateCcw size={16} />
                      </span>
                      <p style={{ fontSize: "0.75rem" }}>Manage Resit</p>
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
                                ? "text-decoration-none  color-primary"
                                : "text-decoration-none text-dark "
                            }
                          >
                            <p style={{ fontSize: "0.75rem" }}>Resit Exam</p>
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
                                ? "text-decoration-none  color-primary"
                                : "text-decoration-none text-dark "
                            }
                          >
                            <p style={{ fontSize: "0.75rem" }}>
                              Resit Candidate
                            </p>
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
                                ? "text-decoration-none  color-primary"
                                : "text-decoration-none text-dark "
                            }
                          >
                            <p style={{ fontSize: "0.75rem" }}>
                              Resit Timetable
                            </p>
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
                                ? "text-decoration-none  color-primary"
                                : "text-decoration-none text-dark "
                            }
                          >
                            <p style={{ fontSize: "0.75rem" }}>Student Resit</p>
                          </NavLink>
                        </div>
                      </div>
                      <div
                        className={`${darkMode ? "box-nav-dark" : "box-nav"}`}
                      >
                        <div className="subbox-nav">
                          <NavLink
                            to="/resit-invigilator"
                            className={({ isActive }) =>
                              isActive
                                ? "text-decoration-none  color-primary"
                                : "text-decoration-none text-dark "
                            }
                          >
                            <p style={{ fontSize: "0.75rem" }}>
                              Resit Invigilator
                            </p>
                          </NavLink>
                        </div>
                      </div>
                      <div
                        className={`${darkMode ? "box-nav-dark" : "box-nav"}`}
                      >
                        <div className="subbox-nav">
                          <NavLink
                            to="/resit-result"
                            className={({ isActive }) =>
                              isActive
                                ? "text-decoration-none  color-primary"
                                : "text-decoration-none text-dark "
                            }
                          >
                            <p style={{ fontSize: "0.75rem" }}>Resit Result</p>
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
                      <span style={{ lineHeight: 0 }}>
                        <Users size={16} />
                      </span>
                      <p style={{ fontSize: "0.75rem" }}>Manage Students</p>
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
                                ? "text-decoration-none  color-primary"
                                : "text-decoration-none text-dark "
                            }
                          >
                            <p style={{ fontSize: "0.75rem" }}>Students</p>
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
                                ? "text-decoration-none  color-primary"
                                : "text-decoration-none text-dark "
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
                                ? "text-decoration-none  color-primary"
                                : "text-decoration-none text-dark "
                            }
                          >
                            <p style={{ fontSize: "0.75rem" }}>Guardian</p>
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
                                ? "text-decoration-none  color-primary"
                                : "text-decoration-none text-dark "
                            }
                          >
                            <p style={{ fontSize: "0.75rem" }}>
                              Student Batches
                            </p>
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
                      navigate("/all-announcement");
                    }}
                  >
                    <div className="nav-item w-100 d-flex flex-row gap-2">
                      <span style={{ lineHeight: 0 }}>
                        <Activity size={16} />
                      </span>
                      <p style={{ fontSize: "0.75rem" }}>School Activities</p>
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
                              navigate("/all-announcement");
                            }}
                            className={
                              IsPathInRoutes(announcementRoutes)
                                ? "text-decoration-none  color-primary pointer-cursor"
                                : "text-decoration-none text-dark  pointer-cursor"
                            }
                          >
                            <p style={{ fontSize: "0.75rem" }}>Announcements</p>
                          </div>
                        </div>
                      </div>
                      <div
                        className={`${darkMode ? "box-nav-dark" : "box-nav"}`}
                      >
                        <div className="subbox-nav">
                          <div
                            onClick={() => {
                              navigate("/elections");
                            }}
                            className={
                              IsPathInRoutes(electionRoutes)
                                ? "text-decoration-none  color-primary pointer-cursor"
                                : "text-decoration-none text-dark  pointer-cursor"
                            }
                          >
                            <p style={{ fontSize: "0.75rem" }}>
                              School Elections
                            </p>
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
                                ? "text-decoration-none  color-primary pointer-cursor"
                                : "text-decoration-none text-dark  pointer-cursor"
                            }
                          >
                            <p style={{ fontSize: "0.75rem" }}>School Events</p>
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
                      <span style={{ lineHeight: 0 }}>
                        <Wallet size={16} />
                      </span>
                      <p style={{ fontSize: "0.75rem" }}>Finances</p>
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
                                ? "text-decoration-none  color-primary pointer-cursor"
                                : "text-decoration-none text-dark  pointer-cursor"
                            }
                          >
                            <p style={{ fontSize: "0.75rem" }}>
                              School Expenses
                            </p>
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
                                ? "text-decoration-none  color-primary pointer-cursor"
                                : "text-decoration-none text-dark  pointer-cursor"
                            }
                          >
                            <p style={{ fontSize: "0.75rem" }}>Resit Fees</p>
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
                                ? "text-decoration-none  color-primary pointer-cursor"
                                : "text-decoration-none text-dark  pointer-cursor"
                            }
                          >
                            <p style={{ fontSize: "0.75rem" }}>Tuition Fees</p>
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
                                ? "text-decoration-none  color-primary pointer-cursor"
                                : "text-decoration-none text-dark  pointer-cursor"
                            }
                          >
                            <p style={{ fontSize: "0.75rem" }}>
                              Registration Fees
                            </p>
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
                                ? "text-decoration-none  color-primary pointer-cursor"
                                : "text-decoration-none text-dark  pointer-cursor"
                            }
                          >
                            <p style={{ fontSize: "0.75rem" }}>
                              Additional Fees
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/*School Expenses*/}
                <div
                  className={
                    IsPathInRoutes(activationCodeRoutes)
                      ? `${
                          darkMode
                            ? "nav-items-box-active-dark"
                            : "nav-item-box-active"
                        }`
                      : "nav-item-box-inactive"
                  }
                  onClick={() => navigate("/activation-code")}
                >
                  <div className="nav-item font-size-sm w-100 d-flex flex-row gap-2">
                    <span style={{ lineHeight: 0 }}>
                      <UserPlus size={16} />
                    </span>
                    <span style={{ fontSize: "0.75rem" }}>
                      Account Activation
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-auto ">
            <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.3} />
            <div className="d-flex flex-column gap-2 justify-content-center align-items-center w-100 d-flex pt-2 pb-1 flex-column  px-2">
              <div
                className={`${
                  IsPathInRoutes(settingRoutes)
                    ? `${darkMode ? "sidebar-active-dark" : "sidebar-active"}`
                    : ""
                } sidebar-item  text-dark`}
                onClick={() => {
                  navigate("/settings/general-settings");
                }}
              >
                <span style={{ fontSize: "0.75rem" }}>Setting</span>
                <span style={{ lineHeight: 0 }}>
                  <Settings size={16} />
                </span>
              </div>
              <div className="w-100">
                <ModalButton
                  action={{ modalContent: Logout }}
                  classname="sidebar-item transparent-bg  text-dark"
                >
                  <span style={{ fontSize: "0.75rem" }}>Logout</span>
                  <span style={{ lineHeight: 0 }}>
                    <LogOut size={16} />
                  </span>
                </ModalButton>
              </div>
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

  const routeMap = {
    dashboard: dashboardRoutes,
    administrator: adminRoutes,
    academics: academicRoutes,
    exams: examRoutes,
    resit: resitRoutes,
    student: StudentRoutes,
    schoolActivities: schoolActivities,
    finances: financialRoutes,
    activationCode: activationCodeRoutes,
  };

  const isActive = IsPathInRoutes(routeMap[items.key]);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: "right-start", // Recommended for sidebar popovers
    middleware: [offset(10), flip(), shift()],
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
      if (!items.menu && items.path) {
        navigate(items.path);
      }
    },
    [getReferenceProps, items.menu, items.path, navigate],
  );

  // Dynamic Icon Component references from Lucide
  const MainIcon = items.icon;

  return (
    <div className="position-relative inline-block">
      <button
        ref={refs.setReference}
        {...getReferenceProps()}
        className={`sidebar-sm menu-tab ${isActive ? "active" : "inactive"}`}
        aria-expanded={isOpen}
        onClick={handleTriggerClick}
      >
        {MainIcon && (
          <MainIcon
            size={16}
            strokeWidth={isActive ? 2.5 : 1.75}
            className="sidebar-icon"
          />
        )}
      </button>

      {items.menu && items.menuItems && (
        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={refs.setFloating}
              style={{
                ...floatingStyles,
                zIndex: 9999,
              }}
              {...getFloatingProps()}
              className={`sidebar-sm menu border p-2 ${
                darkMode ? "dark-bg" : "bg-white"
              } rounded shadow-lg`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
            >
              {items.menuItems.map((item, index) => {
                const isLastElement = index === items.menuItems.length - 1;
                const SubMenuIcon = item.icon;

                return (
                  <React.Fragment key={item.path || index}>
                    <div
                      className="d-flex flex-row align-items-center justify-content-between px-2 pointer-cursor sidebar-sm menu-item gap-3 py-1"
                      onClick={() => {
                        navigate(item.path);
                        setIsOpen(false);
                      }}
                    >
                      <span>{item.title}</span>
                      {SubMenuIcon && (
                        <SubMenuIcon size={16} strokeWidth={1.75} />
                      )}
                    </div>
                    {!isLastElement && <hr className="my-1 opacity-25" />}
                  </React.Fragment>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}

export const sideBarData = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    menu: false,
    path: "/",
    key: "dashboard",
  },
  {
    title: "Administrator",
    icon: ShieldCheck,
    menu: true,
    path: "/school-admins",
    key: "administrator",
    menuItems: [
      {
        title: "School Admins",
        icon: ShieldCheck,
        path: "/school-admins",
      },
      {
        title: "Departments",
        icon: Building2,
        path: "/departments",
      },
      {
        title: "Specialties",
        icon: Boxes,
        path: "/specialties",
      },
      {
        title: "Teachers",
        icon: GraduationCap,
        path: "/teacher",
      },
    ],
  },
  {
    title: "Academics",
    icon: GraduationCap,
    path: "/grades-configuration",
    menu: true,
    key: "academics",
    menuItems: [
      {
        title: "Grades Scale",
        icon: Award,
        path: "/grades-configuration",
      },
      {
        title: "Semester",
        icon: Calendar,
        path: "/semesters",
      },
      {
        title: "Course",
        icon: BookOpen,
        path: "/courses",
      },
      {
        title: "Timetable",
        icon: Clock,
        path: "/time-table",
      },
      {
        title: "Academic Year",
        icon: CalendarDays,
        path: "/academic-year",
      },
    ],
  },
  {
    title: "Manage Exams",
    icon: FileCheck2,
    path: "/exam",
    menu: true,
    key: "exams",
    menuItems: [
      {
        title: "Exam",
        icon: FileCheck2,
        path: "/exam",
      },
      {
        title: "Exam Candidate",
        icon: FileSpreadsheet,
        path: "/exam-candidate",
      },
      {
         title:"Exam Invigilator",
         icon: Eye,
         path:"/exam-invigilator"
      },
      {
        title: "Exam Timetable",
        icon: Clock,
        path: "/exam-timetable",
      },
      {
        title: "Exam Results",
        icon: BarChart2,
        path: "/exam-result",
      },
    ],
  },
  {
    title: "Manage Resit",
    icon: RotateCcw,
    path: "/resit-exams",
    menu: true,
    key: "resit",
    menuItems: [
      {
        title: "Resit Exam",
        icon: FileCheck2,
        path: "/resit-exams",
      },
      {
        title: "Resit Candidate",
        icon: FileSpreadsheet,
        path: "/resit-candidate",
      },
      {
        title: "Resit Timetable",
        icon: Clock,
        path: "/resit-timetable",
      },
      {
        title: "Student Resit",
        icon: RotateCcw,
        path: "/student-resit",
      },
      {
        title: "Resit Invigilator",
        icon: Eye,
        path: "/resit-invigilator",
      },
      {
        title: "Resit Result",
        icon: BarChart2,
        path: "/resit-result",
      },
    ],
  },
  {
    title: "Manage Student",
    icon: Users,
    path: "/students",
    menu: true,
    key: "student",
    menuItems: [
      {
        title: "Students",
        icon: Users,
        path: "/students",
      },
      {
        title: "Student Dropouts",
        icon: UserX,
        path: "/studentDropout",
      },
      {
        title: "Parents",
        icon: Users,
        path: "/parents",
      },
      {
        title: "Student Batches",
        icon: Boxes,
        path: "/student-batches",
      },
    ],
  },
  {
    title: "School Activities",
    icon: CalendarDays,
    path: "/all-announcement",
    menu: true,
    key: "schoolActivities",
    menuItems: [
      {
        title: "Announcements",
        icon: Megaphone,
        path: "/all-announcement",
      },
      {
        title: "School Elections",
        icon: Vote,
        path: "/elections",
      },
      {
        title: "Events",
        icon: CalendarDays,
        path: "/events",
      },
    ],
  },
  {
    title: "Finances",
    icon: Wallet,
    menu: true,
    path: "/school-expenses",
    key: "finances",
    menuItems: [
      {
        title: "School Expenses",
        icon: Receipt,
        path: "/school-expenses",
      },
      {
        title: "Resit Fees",
        icon: RotateCcw,
        path: "/resit-payments",
      },
      {
        title: "Tuition Fees",
        icon: CircleDollarSign,
        path: "/fee-payments",
      },
      {
        title: "Registration Fees",
        icon: UserPlus,
        path: "/registration-fees",
      },
      {
        title: "Additional Fees",
        icon: PlusCircle,
        path: "/additional-fees",
      },
    ],
  },
  {
    title: "Activation Code",
    icon: UserPlus,
    menu: false,
    path: "/activation-code",
    key: "activationCode",
  },
];
