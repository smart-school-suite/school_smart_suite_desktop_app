import { Icon } from "@iconify/react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import NotificationDropdown from "../Dropdowns/NotificationDropdown";
import createEcho from "../../echo/echo";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useGetSchoolBranchDetails } from "../../hooks/schoolBranch/useGetSchoolBranchDetail";
function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { data: schoolBranchDetails, isLoading } = useGetSchoolBranchDetails();
  const userData = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const queryClient = useQueryClient();
  const userId = userData.id;
  const echo = createEcho(token);

  useEffect(() => {
    const channel = echo.private(
      `App.Models.Schooladmin.${userData.authSchoolAdmin.id}`
    );
    channel.notification((notification) => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    });

    return () => {
      echo.leave(`App.Models.Schooladmin.${userId}`);
    };
  }, [userId, echo]);
  return (
    <>
      <div>
        <div className="w-100 d-flex flex-row mt-2 justify-content-between gap-4">
          <div className="d-flex align-items-center gap-2">
            <div className="dashboard-nav circle-action primary-background-100 color-primary">
              EY
            </div>
            <div className="d-block font-size-sm gainsboro-color d-flex flex-column">
              <span className="fw-semibold">
                {isLoading
                  ? "N/A"
                  : schoolBranchDetails.data.abbreviation || "N/A"}
              </span>
              <span className="fw-semibod">
                {isLoading ? "N/A" : schoolBranchDetails.data.city || "N/A"}
              </span>
            </div>
          </div>
          <div
            className={`${ darkMode ? "dark-bg" : "bg-white" } dashboard-nav pill-tab-container`}>
            <button
              className={`dashboard-nav pill-tab rounded-pill fw-medium  ${
                location.pathname === "/" ? `${darkMode ? "dark-mode-active" : "light-mode-active"}`
                  : "transparent-bg gainsboro-color"
              } `}
              onClick={() => {
                navigate("/");
              }}
            >
              <Icon icon="healthicons:money-bag-outline" className="fs-5"/>
              <span>Financial Analysis</span>
            </button>
            <button
              className={`dashboard-nav pill-tab rounded-pill disable-cursor ${
                location.pathname === "/operational-analysis"
                  ? `${darkMode ? "dark-mode-active" : "light-mode-active"}`
                  : "transparent-bg gainsboro-color"
              }`}
              // onClick={() => {
              //navigate("/operational-analysis");
              // }}
            >
                <Icon icon="ep:operation"  className="fs-5"/>
              <span>Operational Analysis</span>
            </button>
            <button
              className={`dashboard-nav pill-tab rounded-pill disable-cursor ${
                location.pathname === "/academic-analysis"
                  ? `${darkMode ? "dark-mode-active" : "light-mode-active"}`
                  : "transparent-bg gainsboro-color"
              }`}
              // onClick={() => {
              //navigate("/academic-analysis");
              // }}
            >
                <Icon icon="heroicons:academic-cap" className="fs-5"/>
              <span>Academic Analysis</span>
            </button>
          </div>
          <div className="d-flex flex-row align-items-center gap-2">
            <div
              className={`${
                darkMode ? "dark-bg" : "bg-white"
              } gainsboro-color dashboard-nav circle-action pointer-cursor`}
            >
              <Icon icon="ic:outline-search" />
            </div>
            <NotificationDropdown />
            <div
              className={`${
                darkMode ? "dark-bg" : "bg-white"
              } gainsboro-color dashboard-nav circle-action pointer-cursor`}
            >
              <img
                src={`http://127.0.0.1:8000/storage/SchoolAdminAvatars/${userData.authSchoolAdmin.profile_picture}`}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Navbar;
