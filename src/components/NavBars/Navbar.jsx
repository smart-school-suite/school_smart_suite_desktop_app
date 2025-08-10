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
  const { data:schoolBranchDetails, isLoading } = useGetSchoolBranchDetails();
  const userData = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const queryClient = useQueryClient();
  const userId = userData.id;
  const echo = createEcho(token);

  useEffect(() => {
    const channel = echo.private(
      `App.Models.Schooladmin.${userData.authSchoolAdmin.id}`
    );
    channel.notification((notification) => {
       queryClient.invalidateQueries({ queryKey:['notifications'] })
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
            <div
              className="color-primary d-flex fs-5 primary-background-100  fw-bold flex-row justify-content-center align-items-center"
              style={{
                width: "3.0rem",
                height: "3.0rem",
                borderRadius: "3.0rem",
              }}
            >
              EY
            </div>
            <div className="d-block font-size-sm">
              <p className="my-0 fw-semibold">
                {
                  isLoading ? "N/A" : schoolBranchDetails.data.abbreviation || "N/A"
                }
              </p>
              <p className="my-0  fw-semibod">
                {
                  isLoading ? "N/A" : schoolBranchDetails.data.city || "N/A"
                }
              </p>
            </div>
          </div>
          <div
            className="d-flex flex-row align-items-center justify-content-between  rounded-pill bg-white"
            style={{ width: "68%", gap: "4rem", padding: "0.35rem" }}
          >
            <button
              className={`d-flex fw-medium flex-row justify-content-between border-none align-items-center ${
                location.pathname === "/"
                  ? "primary-background-100 color-primary"
                  : "transparent-bg gainsboro-color"
              }  gap-1 rounded-pill`}
              style={{
                width: "32%",
                padding: "0.65rem",
                fontSize: "0.92rem",
              }}
              onClick={() => {
                navigate("/");
              }}
            >
              <span>
                <Icon icon="healthicons:money-bag-outline" className="fs-4" />{" "}
              </span>
              <span>Financial Analysis</span>
            </button>
            <button
              className={`d-flex fw-medium flex-row justify-content-between border-none align-items-center disable-cursor ${
                location.pathname === "/operational-analysis"
                  ? "primary-background-100 color-primary"
                  : "transparent-bg gainsboro-color"
              }  gap-1 rounded-pill`}
              style={{
                width: "32%",
                padding: "0.65rem",
                fontSize: "0.92rem",
              }}
             // onClick={() => {
                //navigate("/operational-analysis");
             // }}
            >
              <span>
                <Icon icon="ep:operation" className="fs-4" />{" "}
              </span>
              <span>Operational Analysis</span>
            </button>
            <button
              className={`d-flex fw-medium flex-row justify-content-between border-none align-items-center disable-cursor ${
                location.pathname === "/academic-analysis"
                  ? "primary-background-100 color-primary"
                  : "transparent-bg gainsboro-color"
              }  gap-1 rounded-pill`}
              style={{
                width: "32%",
                padding: "0.65rem",
                fontSize: "0.92rem",
              }}
             // onClick={() => {
                //navigate("/academic-analysis");
             // }}
            >
              <span>
                <Icon icon="heroicons:academic-cap" className="fs-4" />{" "}
              </span>
              <span>Academic Analysis</span>
            </button>
          </div>
          <div className="d-flex flex-row align-items-center gap-2">
            <div
              className="bg-white gainsboro-color fs-4 d-flex flex-row justify-content-center align-items-center"
              style={{
                width: "3.0rem",
                height: "3.0rem",
                borderRadius: "3.0rem",
              }}
            >
              <Icon icon="ic:outline-search" />
            </div>
            <NotificationDropdown />
            <div
              className="bg-white gainsboro-color fs-5 d-flex flex-row justify-content-center align-items-center"
              style={{
                width: "3.0rem",
                height: "3.0rem",
                borderRadius: "3.0rem",
              }}
            >
              <img
              
                src={`http://127.0.0.1:8000/storage/SchoolAdminAvatars/${userData.authSchoolAdmin.profile_picture}`}
                alt=""
                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: "3.0rem",
                  borderRadius: "3.0rem",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Navbar;
