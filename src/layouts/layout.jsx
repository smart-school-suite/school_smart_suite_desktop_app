import { getCurrentWindow } from "@tauri-apps/api/window";
import { useRef } from "react";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import ErrorBoundary from "../components/errors/ErrorBoundary";
import Sidebar from "../components/SideBars/Sidebar";
import useNetworkStatus from "../hooks/network/useNetworkStatus";
import useScreenSize from "../hooks/ui/useScreenSize";
const appWindow = getCurrentWindow();

function Layout() {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const { width, is, breakpoint } = useScreenSize();
  const isOnline = useNetworkStatus();
  const isFirstRender = useRef(true);
  const { pathname } = useLocation();
  return (
    <>
      <Toaster position="bottom-right" reverseOrder={false}></Toaster>
      
      <div className={`${darkMode && "dark-bg-light"}`}>
        <div className="d-flex flex-row w-100">
          {/* The sidebar sets its own width (expanded or icon rail). */}
          <div className="flex-shrink-0">
            <Sidebar />
          </div>
          <div className="flex-grow-1" style={{ minWidth: 0 }}>
            <main className={`${darkMode ? "text-white" : ""} app-content w-100`}>
              {/* A page that fails to render shows an error here; the sidebar keeps working. */}
              <ErrorBoundary
                resetKeys={[pathname]}
                height="80dvh"
                mascotHeight="10rem"
                description="This page ran into a problem. Try again, or open another page from the sidebar."
              >
                <Outlet />
              </ErrorBoundary>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
export default Layout;
