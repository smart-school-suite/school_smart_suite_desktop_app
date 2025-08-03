import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
function Hero() {
  const navigate = useNavigate();
  return (
    <>
      <div className="w-100 height-100  pb-5 d-flex flex-column">
        <div className=" login-container-logo-box d-flex flex-row align-items-center justify-content-between px-4">
          <img src="./logo/blue_logo.png" className="login-logo" />
          <button className="rounded-pill px-3 py-2 font-size-sm transparent-bg" style={{ border:"1px solid #ccc" }}>
            Customer Support
          </button>
        </div>
        <div className="d-flex flex-row align-items-center justify-content-center w-100 gap-4 mt-5">
          <div className="width-80">
            <div className="d-flex flex-column align-items-center gap-4">
              <h1
                className="fw-bolder hero-large-text"
                style={{ fontSize: "4.5rem", textTransform: "uppercase" }}
              >
                School Smart Suite
              </h1>
              <div className="w-50 text-center">
                <p style={{ fontSize: "1.4rem" }}>
                  Revolutionizing Education Management with <span className="fw-bold">Innovation</span>,
                  Simplicity, and <span className="fw-bold">Seamless Connectivity</span>.
                </p>
              </div>
              <div className="flex-wrap d-flex w-100 justify-content-center gap-2">
                <div
                  className="rounded-pill px-2 font-size-sm  border-none py-2"
                  style={{ background: "#d5f8f8", color: "#21b0b9" }}
                >
                  <span className="mx-2">Tuition Fee Management</span>
                  <span className="mx-2">
                    <Icon
                      icon="healthicons:money-bag-outline"
                      width="18"
                      height="18"
                    />
                  </span>
                </div>
                <div
                  className="rounded-pill px-2 font-size-sm  border-none py-2"
                  style={{ background: "#f8ebf1", color: "#d3719d" }}
                >
                  <span className="mx-2">Resit Management</span>
                  <span className="mx-2">
                    <Icon icon="ic:round-repeat" width="18" height="18" />
                  </span>
                </div>
                <div
                  className="rounded-pill px-2 font-size-sm  border-none py-2"
                  style={{ background: "#e7ebff", color: "#4a4bff" }}
                >
                  <span className="mx-2">Report Card Generation</span>
                  <span className="mx-2">
                    <Icon icon="ph:exam-light" width="18" height="18" />
                  </span>
                </div>
                <div
                  className="rounded-pill px-2 font-size-sm  border-none py-2"
                  style={{ background: "#eff7d0", color: "#92ba28" }}
                >
                  <span className="mx-2">Event Management</span>
                  <span className="mx-2">
                    <Icon icon="carbon:event" width="18" height="18" />
                  </span>
                </div>
                <div
                  className="rounded-pill px-2 font-size-sm  border-none py-2"
                  style={{ background: "#e2ebea", color: "#5b7f7b" }}
                >
                  <span className="mx-2">Automatic Timetable Creation</span>
                  <span className="mx-2">
                    <Icon
                      icon="ant-design:schedule-outlined"
                      width="18"
                      height="18"
                    />
                  </span>
                </div>
                <div className="flex-wrap d-flex w-50 justify-content-center gap-2">
                  <div
                    className="rounded-pill px-2 font-size-sm  border-none py-2"
                    style={{ background: "#d9f2ff", color: "#32acff" }}
                  >
                    <span>Automatic Exam Timetable Creation</span>
                    <span className="mx-2">
                      <Icon icon="mdi:timetable" width="18" height="18" />
                    </span>
                  </div>
                  <div
                    className="rounded-pill px-2 font-size-sm  border-none py-2"
                    style={{ backgroundColor: "#fae8ff", color: "#d84aeb" }}
                  >
                    <span>Course Resource Management</span>
                    <span className="mx-2">
                      <Icon icon="hugeicons:course" width="18" height="18" />
                    </span>
                  </div>
                </div>
              </div>

              <div className="d-flex flex-row align-items-center gap-2 w-50 d-flex flex-row justify-content-center">
                <button
                  className="px-5 font-size-sm py-3 rounded-3 border-none primary-background text-white"
                  onClick={() => {
                    navigate("/register-school");
                  }}
                >
                  Get Started
                </button>
                <button
                  className="px-5 font-size-sm py-3 rounded-3 rounded-3 border-none primary-background-100 color-primary"
                  onClick={() => {
                    navigate("/login-school-admin");
                  }}
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex flex-row align-items-center gap-3 mt-auto px-3">
          <div className="card d-flex rotate-5 width-20 border-none p-2 rounded-3 shadow-sm">
            <div className="d-flex flex-row align-items-center gap-2">
              <div
                className="hero-icon-box"
                style={{ background: "#e5eff9", color: "#55a6db" }}
              >
                <Icon
                  icon="material-symbols-light:event-available-outline-rounded"
                  width="24"
                  height="24"
                />
              </div>
              <span className="font-size-sm">
                Always Available, Always Trustworthy"
              </span>
            </div>
          </div>
          <div className="card d-flex rotate-reverse-5 width-20 border-none p-2 rounded-3 shadow-sm">
            <div className="d-flex flex-row align-items-center gap-2">
              <div
                className="hero-icon-box"
                style={{ background: "#defae8", color: "#28b463" }}
              >
                <Icon
                  icon="material-symbols-light:speed-outline"
                  width="24"
                  height="24"
                />
              </div>
              <span className="font-size-sm">
                Instant Access, Rapid Results
              </span>
            </div>
          </div>
          <div className="card d-flex rotate-5 width-20 border-none p-2 rounded-3 shadow-sm">
            <div className="d-flex flex-row align-items-center gap-2">
              <div
                className="hero-icon-box"
                style={{ background: "#f7ecfb", color: "#c67cdf" }}
              >
                <Icon
                  icon="fluent:design-ideas-24-regular"
                  width="24"
                  height="24"
                />
              </div>
              <span className="font-size-sm">
                Intuitive Design, Effortless Navigation
              </span>
            </div>
          </div>
          <div className="card d-flex rotate-reverse-5 width-20 border-none p-2 rounded-3 shadow-sm">
            <div className="d-flex flex-row align-items-center gap-2">
              <div
                className="hero-icon-box"
                style={{ background: "#fff2d2", color: "#ff8b07" }}
              >
                <Icon icon="hugeicons:security-check" width="24" height="24" />
              </div>
              <span className="font-size-sm">
                Protecting Your Information, Securing Your Future
              </span>
            </div>
          </div>
          <div className="card d-flex rotate-5 width-20 border-none p-2 rounded-3 shadow-sm">
            <div className="d-flex flex-row align-items-center gap-2">
              <div
                className="hero-icon-box"
                style={{ background: "#e3ebfc", color: "#727be2" }}
              >
                <Icon
                  icon="material-symbols-light:rocket-outline"
                  width="24"
                  height="24"
                />
              </div>
              <span className="font-size-sm">
                Streamlined Processes, Reduced Workload
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Hero;
