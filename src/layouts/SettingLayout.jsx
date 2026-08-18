import { Outlet, useLocation, useNavigate } from "react-router-dom";
import SettingSideBar from "../components/SideBars/SetttingSideBar";
import { Icon } from "@iconify/react";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
function SetttingLayout() {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const location = useLocation();
  const navigate = useNavigate();
  const sideBarData = [
    {
      id: 1,
      title: "General Settings",
      path: "/settings/general-settings",
    },
    {
      id: 2,
      title: "Display",
      path: "/settings/display",
    },
    {
      id: 3,
      title: "Profile",
      path: "/settings/profile",
    },
    {
      id: 4,
      title: "Security",
      path: "/settings/security",
    },
    {
      id: 5,
      title: "School",
      path: "/settings/school",
    },
    {
      id: 6,
      title: "Subscriptions",
      path: "/settings/subscription",
    },
    {
      id: 7,
      title: "School Branch",
      path: "/settings/school-branch",
    },
    {
      id: 8,
      title: "App Configurations",
      path: "/settings/app-settings",
    },
  ];
  return (
    <>
      <main className="main-container gap-2">
        <div className="card rounded-4 d-flex flex-column gap-1 pb-2" style={{ borderRadius:"0.75rem" }}>
          <div className="p-2">
            <div className="d-flex flex-row align-items-center gap-2">
              <div
                style={{
                  width: "2rem",
                  height: "2rem",
                  borderRadius: "0.5rem",
                }}
                className={`${darkMode ? "dark-mode-active" : "light-mode-active"} d-flex flex-row align-items-center justify-content-center`}
              >
                <Icon icon="lsicon:setting-outline" />
              </div>
              <div className="d-flex flex-column">
                <span className="fw-semibold font-size-sm">Settings</span>
                <span className="font-size-sm text-muted">
                  Manage your school's configuration, preferences, and system
                  behavior.
                </span>
              </div>
            </div>
          </div>
          <hr />
          <div className="d-flex flex-row align-items-center gap-4 font-size-sm px-2">
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
        <div className="w-100 h-100">
          <Outlet />
        </div>
      </main>
    </>
  );
}
export default SetttingLayout;
