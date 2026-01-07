import Sidebar from "../components/Sidebars/Sidebar";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import useScreenSize from "../hooks/ui/useScreenSize";
function Layout() {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const { width, is, breakpoint } = useScreenSize();
  return (
    <>

         <Toaster position="bottom-right" reverseOrder={false}></Toaster>
        <div className={`${darkMode && "dark-bg-light"}`}>
          <div className="d-flex flex-row w-100 gap-2 ">
            <div style={{ width: is.md || is.sm ? "5%" : "18%" }}>
              <Sidebar />
            </div>
            <div style={{ width: is.md || is.sm ? "95%" : "82%" }}>
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
