import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <>
      <div className="col-lg-2 pe-0">
        <aside className=" white-bg d-flex flex-column ps-3  pt-2">
          <div className="logo-area">
            <div className="d-flex align-items-center flex-row gap-3">
              <span>
                <Icon
                  icon="basil:book-open-solid"
                  className="color-primary fs-5"
                />
              </span>
              <h4 className="my-0 fs-6 fw-bold color-primary">Edumanage</h4>
            </div>
          </div>
          <div className="nav-container mt-3">
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
                      : location.pathname === "/courses"
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
                          : location.pathname === "/courses"
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
                      : location.pathname === "/courses"
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
                    location.pathname === "/exams"
                      ? "nav-item-box-active fw-medium"
                      : location.pathname === "/scores"
                      ? "nav-item-box-active fw-medium"
                      : location.pathname === "/time-table"
                      ? "nav-item-box-active fw-medium"
                      : location.pathname === "/exam-resits"
                      ? "nav-item-box-active fw-medium"
                      : "nav-item-box-inactive"
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
                        location.pathname === "/exams"
                          ? "rotate-icon nav-dropdown-icon"
                          : location.pathname === "/scores"
                          ? "rotate-icon nav-dropdown-icon"
                          : location.pathname === "/time-table"
                          ? "rotate-icon nav-dropdown-icon"
                          : location.pathname === "/exam-resits"
                          ? "rotate-icon nav-dropdown-icon"
                          : "nav-dropdown-icon"
                      }
                    />
                  </span>
                </div>

                <div
                  className={
                    location.pathname === "/exams"
                      ? "subbox-container-nav ps-3"
                      : location.pathname === "/scores"
                      ? "subbox-container-nav ps-3"
                      : location.pathname === "/time-table"
                      ? "subbox-container-nav ps-3"
                      : location.pathname === "/exam-resits"
                      ? "subbox-container-nav ps-3"
                      : "subbox-container-nav-inactive"
                  }
                >
                  <div className="drop-down-container">
                    <div className="box-nav">
                      <div className="subbox-nav">
                        <NavLink
                          to="/exams"
                          className={({ isActive }) =>
                            isActive
                              ? "text-decoration-none fw-medium color-primary"
                              : "text-decoration-none gainsboro-color"
                          }
                        >
                          <p>Exams</p>
                        </NavLink>
                      </div>
                    </div>
                    <div className="box-nav">
                      <div className="subbox-nav">
                        <NavLink
                          to="/scores"
                          className={({ isActive }) =>
                            isActive
                              ? "text-decoration-none fw-medium color-primary"
                              : "text-decoration-none gainsboro-color"
                          }
                        >
                          <p>Student Scores</p>
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
                          <p>Timet Table</p>
                        </NavLink>
                      </div>
                    </div>
                    <div className="box-nav">
                      <div className="subbox-nav">
                        <NavLink
                          to="/exam-resits"
                          className={({ isActive }) =>
                            isActive
                              ? "text-decoration-none fw-medium color-primary"
                              : "text-decoration-none gainsboro-color"
                          }
                        >
                          <p>Exam Resits</p>
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
                          <p>Resit Payments</p>
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
                          <p>Fee Payments</p>
                        </NavLink>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className={
                    location.pathname === "/transferred-students" ? "nav-item-box-active fw-medium"
                      : location.pathname === "/transfer-request"
                      ? "nav-item-box-active fw-medium"
                      : "nav-item-box-inactive"
                  }
                  onClick={() => {
                    navigate("/transferred-students");
                  }}
                >
                  <div className="nav-item w-100 d-flex flex-row gap-2">
                    <span>
                      <Icon icon="tabler:transfer" />
                    </span>
                    <p>Transfers</p>
                  </div>
                  <span>
                    <Icon
                      icon="octicon:chevron-down-24"
                      className={
                        location.pathname === "/transferred-students"
                          ? "rotate-icon nav-dropdown-icon"
                          : location.pathname === "/transfer-request"
                          ? "rotate-icon nav-dropdown-icon"
                          : "nav-dropdown-icon"
                      }
                    />
                  </span>
                </div>

                <div
                  className={
                    location.pathname === "/transferred-students"
                      ? "subbox-container-nav ps-3"
                      : location.pathname === "/transfer-request"
                      ? "subbox-container-nav ps-3"
                      : "subbox-container-nav-inactive"
                  }
                >
                  <div className="drop-down-container">
                    <div className="box-nav">
                      <div className="subbox-nav">
                        <NavLink
                          to="/transferred-students"
                          className={({ isActive }) =>
                            isActive
                              ? "text-decoration-none fw-medium color-primary"
                              : "text-decoration-none gainsboro-color"
                          }
                        >
                          <p>Transfered Students</p>
                        </NavLink>
                      </div>
                    </div>
                    <div className="box-nav">
                      <div className="subbox-nav">
                        <NavLink
                          to="/transfer-request"
                          className={({ isActive }) =>
                            isActive
                              ? "text-decoration-none fw-medium color-primary"
                              : "text-decoration-none gainsboro-color"
                          }
                        >
                          <p>Student Request</p>
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
                  className={
                    location.pathname === "/messages"
                      ? "nav-item-box-active fw-medium"
                      : location.pathname === "/emails"
                      ? "nav-item-box-active fw-medium"
                      : location.pathname === "/annoucements"
                      ? "nav-item-box-active fw-medium"
                      : "nav-item-box-inactive"
                  }
                  onClick={() => {
                    navigate("/messages");
                  }}
                >
                  <div className="nav-item w-100 d-flex flex-row gap-2">
                    <span>
                      <Icon icon="uil:message" />
                    </span>
                    <p>Media</p>
                  </div>
                  <div className="d-flex flex-row align-items-center gap-2">
                    <span className="media-pill font-size-xs bg-danger text-white rounded-pill px-2">
                      100
                    </span>
                    <span>
                      <Icon
                        icon="octicon:chevron-down-24"
                        className={
                          location.pathname === "/messages"
                            ? "rotate-icon nav-dropdown-icon"
                            : location.pathname === "/emails"
                            ? "rotate-icon nav-dropdown-icon"
                            : location.pathname === "/annoucements"
                            ? "rotate-icon nav-dropdown-icon"
                            : "nav-dropdown-icon"
                        }
                      />
                    </span>
                  </div>
                </div>
                <div
                  className={
                    location.pathname === "/messages"
                      ? "subbox-container-nav ps-3"
                      : location.pathname === "/emails"
                      ? "subbox-container-nav ps-3"
                      : location.pathname === "/annoucements"
                      ? "subbox-container-nav ps-3"
                      : "subbox-container-nav-inactive"
                  }
                >
                  <div className="drop-down-container">
                    <div className="box-nav">
                      <div className="subbox-nav">
                        <NavLink
                          to="/messages"
                          className={({ isActive }) =>
                            isActive
                              ? "text-decoration-none fw-medium color-primary"
                              : "text-decoration-none gainsboro-color"
                          }
                        >
                          <p>Messages</p>
                        </NavLink>
                      </div>
                    </div>
                    <div className="box-nav">
                      <div className="subbox-nav">
                        <NavLink
                          to="/emails"
                          className={({ isActive }) =>
                            isActive
                              ? "text-decoration-none fw-medium color-primary"
                              : "text-decoration-none gainsboro-color"
                          }
                        >
                          <p>Emails</p>
                        </NavLink>
                      </div>
                    </div>
                    <div className="box-nav">
                      <div className="subbox-nav">
                        <NavLink
                          to="/annoucements"
                          className={({ isActive }) =>
                            isActive
                              ? "text-decoration-none fw-medium color-primary"
                              : "text-decoration-none gainsboro-color"
                          }
                        >
                          <p>Annoucements</p>
                        </NavLink>
                      </div>
                    </div>
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
                    location.pathname === "/settings/account"
                      ? "nav-item-box-active fw-medium text-decoration-none"
                      : location.pathname === "/settings/general-settings"
                      ? "nav-item-box-active fw-medium text-decoration-none"
                      : location.pathname === "/settings/display"
                      ? "nav-item-box-active fw-medium text-decoration-none"
                      : location.pathname === "/settings/updates"
                      ? "nav-item-box-active fw-medium text-decoration-none"
                      : location.pathname === "/settings/profile"
                      ? "nav-item-box-active fw-medium text-decoration-none"
                      : location.pathname === "/settings/security"
                      ? "nav-item-box-active fw-medium text-decoration-none"
                      : location.pathname === "/settings/help"
                      ? "nav-item-box-active fw-medium text-decoration-none"
                      : "nav-item-box-inactive text-decoration-none"
                  }
                  onClick={() => {
                    navigate("/settings/account");
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
          <div className="bottom-section mt-auto d-flex flex-column justify-content-center align-items-center pe-3">
            <div className="card border-none primary-background-100 w-100 py-2 rounded-4">
              <div className="d-flex flex-row align-items-center gap-2 font-size-sm my-2 px-1  ms-2">
                <p className="my-0">
                  <Icon
                    icon="material-symbols:next-plan"
                    className="fs-6  color-primary "
                  />
                </p>
                <span>Ultimate Plan</span>
              </div>
              <div className="d-flex flex-row align-items-center gap-3 font-size-sm my-2 px-2  ms-2">
                <span>Payment Type</span>
                <p className="my-0 color-primary fw-medium">Yearly</p>
              </div>
              <div className="d-flex flex-row align-items-center gap-3 font-size-sm my-2 px-2  ms-2">
                <span>Expires At</span>
                <p className="my-0 color-primary fw-medium">12 Jan 2025</p>
              </div>
              <div className="d-flex flex-row justify-content-center px-3">
                <button className="border-none primary-background rounded-2 text-white font-size-sm fw-medium py-2 w-100 ">
                  upgrade plan
                </button>
              </div>
            </div>
            <div>
              <hr className="bg-primary w-100" />
              <span className="font-size-sm gainsboro-color mb-5">
                @2024 Edumanage Company
              </span>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
export default Sidebar;
