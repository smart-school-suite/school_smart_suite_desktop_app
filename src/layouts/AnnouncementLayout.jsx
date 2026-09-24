import { Outlet, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import CreateAnnouncement from "../ModalContent/Announcement/CreateAnnouncement";
import { ModalButton } from "../components/DataTableComponents/ActionComponent";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Megaphone } from "lucide-react";
import JobPopOver from "../components/Popover/JobPopover";
function AnnouncementLayout() {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const navigate = useNavigate();
  const sideBarData = [
    {
      title: "All",
      icon: "f7:speaker-2-fill",
      path: "/all-announcement",
    },
    {
      title: "Scheduled",
      icon: "material-symbols:schedule-send-rounded",
      path: "/scheduled-announcement",
    },
    {
      title: "Active",
      icon: "ion:archive",
      path: "/active-announcement",
    },
    {
      title: "Draft",
      icon: "pajamas:expire",
      path: "/draft-announcement",
    },
    {
      title: "Category",
      icon: "stash:engagement",
      path: "/announcement-category",
    },
  ];

  return (
    <>
      <main className="main-container gap-2">
        <div className="card border rounded-3 p-2 d-flex flex-column gap-2">
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
                <Megaphone size={16} />
              </div>
              <span className="font-size-sm fw-semibold">
                Manage Announcements
              </span>
            </div>
            <div className="d-flex flex-row align-item-center gap-2">
              <JobPopOver category={"Hall"} />
              <ModalButton
                classname={
                  "border-none border rounded-3 font-size-sm p-2 d-flex flex-row align-items-center gap-1 white-bg"
                }
              >
                <span style={{ lineHeight: "16px" }}>Import</span>
                <span>
                  <Icon icon="tabler:arrow-down" width={14} height={14} />
                </span>
              </ModalButton>
              <ModalButton
                classname={
                  "border-none border rounded-3 font-size-sm p-2 d-flex flex-row align-items-center gap-1 white-bg"
                }
              >
                <span style={{ lineHeight: "16px" }}>Actions</span>
                <span>
                  <Icon
                    icon="majesticons:chevron-down"
                    width={16}
                    height={16}
                  />
                </span>
              </ModalButton>
              <ModalButton
                action={{ modalContent: CreateAnnouncement }}
                size={"lg"}
                classname={
                  "border-none border rounded-3 font-size-sm p-2 primary-background text-white text-capitalize"
                }
              >
                <span>Create Announcement</span>
              </ModalButton>
            </div>
          </div>
          <hr />
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
export default AnnouncementLayout;
