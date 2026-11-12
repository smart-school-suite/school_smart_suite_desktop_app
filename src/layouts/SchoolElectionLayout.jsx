import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import DrawerTrigger from "../components/drawer/DrawerTrigger";
import CreateElection from "../DrawerContent/Election/CreateElection";
import { ElectionIcon } from "../icons/Icons";

const TABS = [
  { title: "Elections", path: "/elections" },
  { title: "Types", path: "/election-type" },
  { title: "Positions", path: "/election-roles" },
  { title: "Applications", path: "/election-application" },
  { title: "Candidates", path: "/election-candidates" },
  { title: "Office Holders", path: "/election-office-holders" },
  { title: "History", path: "/election-history" },
];

function SchoolElectionLayout() {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  // An election's workspace (/elections/:id) has its own header.
  const isWorkspace = /^\/elections\/[^/]+/.test(pathname);

  return (
    <main className="main-container gap-2">
      {!isWorkspace && (
        <div className="page-head flex-shrink-0">
          <div className="d-flex flex-row align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-2">
              <div
                className={`${darkMode ? "dark-mode-active" : "light-mode-active"} d-flex justify-content-center align-items-center`}
                style={{ width: "2rem", height: "2rem", borderRadius: "0.5rem" }}
              >
                <ElectionIcon size={16} />
              </div>
              <span className="font-size-sm fw-semibold">Manage Elections</span>
            </div>
            <DrawerTrigger title="Create Election" placement="right" drawerChildren={CreateElection}>
              <button className="border-none rounded-3 font-size-sm px-3 py-2 primary-background text-white d-flex flex-row align-items-center gap-1">
                <Plus size={15} />
                <span>Create Election</span>
              </button>
            </DrawerTrigger>
          </div>
          <div className="page-head__tabs d-flex flex-row align-items-center gap-4 font-size-sm">
            {TABS.map((tab) => {
              const isActive = pathname === tab.path;
              return (
                <div key={tab.path} className="d-flex flex-column gap-1 position-relative">
                  <button
                    onClick={() => navigate(tab.path)}
                    className={`border-none transparent-bg transition-four-sec ${isActive ? "color-primary fw-medium" : "text-muted"}`}
                  >
                    {tab.title}
                  </button>
                  <div style={{ height: "0.1rem", width: "100%", position: "relative" }}>
                    {isActive ? (
                      <motion.div
                        layoutId="activeUnderline"
                        className="position-absolute start-0 end-0 bottom-0"
                        style={{ height: "0.1rem", background: "var(--primary-color-500)" }}
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {/* The page fills the space left under the header; table pages size
          their grid from this height. */}
      <div className="h-100" style={{ minHeight: 0 }}>
        <Outlet />
      </div>
    </main>
  );
}

export default SchoolElectionLayout;
