import { Icon } from "@iconify/react";
import { useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
function Navbar(props) {
  const location = useLocation();
  const navigate = useNavigate();
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
              <p className="my-0 fw-semibold">EXHIST</p>
              <p className="my-0  fw-semibod">Yaounde</p>
            </div>
          </div>
          <div
            className="d-flex flex-row align-items-center justify-content-between  rounded-pill bg-white"
            style={{ width: "68%", gap: "4rem", padding: "0.35rem" }}
          >
            {props.options.route_data.map((items, index) => {
              return (
                <>
                  <button
                    className={`d-flex fw-medium flex-row justify-content-between border-none align-items-center ${
                      location.pathname === items.route
                        ? "primary-background text-white"
                        : "transparent-bg gainsboro-color"
                    }  gap-1 rounded-pill`}
                    style={{
                      width: "32%",
                      padding: "0.65rem",
                      fontSize: "0.92rem",
                    }}
                    onClick={() => {
                      navigate(items.route);
                    }}
                    key={index}
                  >
                    <span>
                      {items.icon === null ? (
                        <>IC</>
                      ) : (
                        <>
                          {" "}
                          <Icon icon={items.icon} className="fs-4" />{" "}
                        </>
                      )}
                    </span>
                    <span>{items.lable}</span>
                  </button>
                </>
              );
            })}
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
            <div
              className="bg-white gainsboro-color fs-4 z-0 d-flex position-relative flex-row justify-content-center align-items-center"
              style={{
                width: "3.0rem",
                height: "3.0rem",
                borderRadius: "3.0rem",
              }}
            >
              <Icon icon="solar:bell-linear" className="z-1" />
              <button
                className="z-3 border-none rounded-circle font-size-xs position-absolute fw-semibold bg-danger text-white px-1"
                style={{ top: "0px", right: "0px", padding: "0.2rem" }}
              >
                32
              </button>
            </div>
            <div
              className="bg-white gainsboro-color fs-5 d-flex flex-row justify-content-center align-items-center"
              style={{
                width: "3.0rem",
                height: "3.0rem",
                borderRadius: "3.0rem",
              }}
            >
              <img
                src="./images/portrait-five.jpg"
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

export function Navbarsettings() {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <>
      <div>
        <div className="mt-2 d-flex gap-3  flex-row align-items-center">
          <div className="badge-settings">
            <Icon
              icon="iconamoon:settings-light"
              className="color-primary fs-4"
            />
          </div>
          <div>
            <p className="my-0 fs-6 fw-bold">Settings</p>
          </div>
        </div>
        <div className="setting-nav-top d-flex gap-4 w-100 my-3 bg-white py-1 px-1 rounded-3">
          <button
            className={
              location.pathname === "/settings/account"
                ? "border-none py-2 px-4 font-size-sm rounded-3 primary-background text-white transition-four-sec"
                : "gainsboro-color border-none font-size-sm transparent-bg transition-four-sec"
            }
            onClick={() => {
              navigate("/settings/account");
            }}
          >
            Account
          </button>
          <button
            className={
              location.pathname === "/settings/general-settings"
                ? "border-none py-2 px-4 font-size-sm rounded-3 primary-background text-white transition-four-sec"
                : "gainsboro-color border-none font-size-sm transparent-bg transition-four-sec"
            }
            onClick={() => {
              navigate("/settings/general-settings");
            }}
          >
            General Settings
          </button>
          <button
            className={
              location.pathname === "/settings/display"
                ? "border-none py-2 px-4 font-size-sm rounded-3 primary-background text-white transition-four-sec"
                : "gainsboro-color border-none font-size-sm transparent-bg transition-four-sec"
            }
            onClick={() => {
              navigate("/settings/display");
            }}
          >
            Display
          </button>
          <button
            className={
              location.pathname === "/settings/profile"
                ? "border-none py-2 px-4 font-size-sm rounded-3 primary-background text-white transition-four-sec"
                : "gainsboro-color border-none font-size-sm transparent-bg transition-four-sec"
            }
            onClick={() => {
              navigate("/settings/profile");
            }}
          >
            Profile
          </button>
          <button
            className={
              location.pathname === "/settings/security"
                ? "border-none py-2 px-4 font-size-sm rounded-3 primary-background text-white transition-four-sec"
                : "gainsboro-color border-none font-size-sm transparent-bg transition-four-sec"
            }
            onClick={() => {
              navigate("/settings/security");
            }}
          >
            Security
          </button>
          <button
            className={
              location.pathname === "/settings/help"
                ? "border-none py-2 px-4 font-size-sm rounded-3 primary-background text-white transition-four-sec"
                : "gainsboro-color border-none font-size-sm transparent-bg transition-four-sec"
            }
            onClick={() => {
              navigate("/settings/help");
            }}
          >
            Help and Support
          </button>
          <button
            className={
              location.pathname === "/settings/updates"
                ? "border-none py-2 px-4 font-size-sm rounded-3 primary-background text-white transition-four-sec d-flex align-items-center gap-3"
                : "gainsboro-color border-none font-size-sm transparent-bg d-flex align-items-center gap-3 transition-four-sec"
            }
            onClick={() => {
              navigate("/settings/updates");
            }}
          >
            <div className="green-bg  settings-green-pill"></div>
            <span>Whats New</span>
          </button>
        </div>
      </div>
    </>
  );
}
