import Sidebar from "../components/Sidebars/Sidebar";
import { Outlet } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import useScreenSize from "../hooks/ui/useScreenSize";
import { getCurrentWindow } from "@tauri-apps/api/window";
import useNetworkStatus from "../hooks/network/useNetworkStatus";
import ToastDanger from "../components/Toast/ToastDanger";
import ToastSuccess from "../components/Toast/ToastSuccess";
import NetworkStatusToast from "../components/Network/NetworkStatusToast";
const appWindow = getCurrentWindow();

function Layout() {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const { width, is, breakpoint } = useScreenSize();
  const isOnline = useNetworkStatus();
  const isFirstRender = useRef(true);
  return (
    <>
      <Toaster position="bottom-right" reverseOrder={false}></Toaster>
      
      <div className={`${darkMode && "dark-bg-light"}`}>
        <div className="d-flex flex-row w-100 gap-2 ">
          <div style={{ width: is.md || is.sm ? "5%" : "15%" }}>
            <Sidebar />
          </div>
          <div style={{ width: is.md || is.sm ? "95%" : "85%" }}>
            <main className={`${darkMode ? "text-white" : null} pt-1 w-100`}>
              <div className="pe-2">
                <Outlet />
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
export default Layout;
