import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import TeacherSideBar from "../components/SideBars/TeacherSideBar";
import { TeacherIcon } from "../icons/Icons";
import { Icon } from "@iconify/react";

export const sideBarData = [
  { title: "Teacher", path: "/teacher" },
  { title: "Teacher Course", path: "/teacher-course" },
  { title: "Teacher Specialty", path: "/teacher-specialty" },
  { title: "Teacher Availability", path: "/teacher-availability" },
];

function TeacherLayout() {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <main className="main-container gap-2">
        <div className="card border-none rounded-3 p-2 d-flex flex-column gap-3">
          <div className="d-flex flex-row align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-2">
              <div
                className={`${
                  darkMode ? "dark-mode-active" : "light-mode-active"
                } d-flex justify-content-center align-items-center`}
                style={{
                  width: "2rem",
                  height: "2rem",
                  borderRadius: "0.5rem",
                }}
              >
                <TeacherIcon />
              </div>
              <span className="font-size-sm fw-semibold">Manage Teachers</span>
            </div>
            <div className="w-50">
              <input
                type="search"
                className="form-control font-size-sm w-100"
                placeholder="Search For Anything"
              />
            </div>
            <div className="d-flex flex-row align-item-center gap-2">
              <button className="border-none border rounded-3 font-size-sm px-3 py-1 d-flex flex-row align-items-center gap-2 white-bg">
                <span>Export</span>
                <span>
                  <Icon
                    icon="material-symbols-light:download"
                    width={18}
                    height={18}
                  />
                </span>
              </button>
              <button className="border-none border rounded-3 font-size-sm px-3 py-1 d-flex flex-row align-items-center gap-2 white-bg">
                <span>Import</span>
                <span>
                  <Icon
                    icon="material-symbols-light:upload-rounded"
                    width={18}
                    height={18}
                  />
                </span>
              </button>
            </div>
          </div>
          <hr />

          {/* Dynamic Navigation Tabs with Framer Motion Underline */}
          <div className="d-flex flex-row align-items-center gap-4 font-size-sm">
            {sideBarData.map((tab) => {
              const isActive = location.pathname === tab.path;
              return (
                <div
                  key={tab.path}
                  className="d-flex flex-column gap-1 position-relative"
                >
                  <button
                    onClick={() => navigate(tab.path)}
                    className={`border-none transparent-bg transition-four-sec ${
                      isActive ? "color-primary fw-medium" : "text-muted"
                    }`}
                  >
                    <div className="d-flex flex-row align-items-center gap-1">
                      <span>{tab.title}</span>
                    </div>
                  </button>

                  {/* Underline Bar */}
                  <div
                    style={{
                      height: "0.1rem",
                      width: "100%",
                      position: "relative",
                    }}
                  >
                    {isActive ? (
                      <motion.div
                        layoutId="activeUnderline"
                        className="position-absolute start-0 end-0 bottom-0"
                        style={{
                          height: "0.1rem",
                          background: "#0ea7e9",
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="h-100">
          <Outlet />
        </div>
      </main>
    </>
  );
}

export default TeacherLayout;
