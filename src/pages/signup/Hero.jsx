import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
function Hero() {
  const navigate = useNavigate();
  const darkMode = useSelector((state) => state.theme.darkMode);
   return (
    <>
      <div className={`${darkMode ? 'dark-bg text-white': 'white-bg'} w-100 height-100  pb-5 d-flex flex-column`}>
        <div className=" login-container-logo-box d-flex flex-row align-items-center justify-content-between px-4">
          <img src="./logo/blue_logo.png" className="login-logo" />
          <button className={`${darkMode ? 'dark-bg-light dark-mode-text border-none' : 'transparent-bg'} rounded-pill px-3 py-2 font-size-sm`}>
            Customer Support
          </button>
        </div>
        <div className="d-flex flex-row align-items-center justify-content-center w-100 gap-4 mt-5">
          <div className="width-80">
            <div className="d-flex flex-column align-items-center gap-4">
              <h1
                className="fw-bolder hero-large-text"
              >
                School Smart Suite
              </h1>
              <div className=" hero-caption-text-container">
                <p className="hero-caption-text p-0 m-0">
                  Revolutionizing Education Management with <span className="fw-bold">Innovation</span>,
                  Simplicity, and <span className="fw-bold">Seamless Connectivity</span>.
                </p>
              </div>
              <div className="flex-wrap d-flex w-100 justify-content-center gap-2 feat-pill-container">
                <div
                  className="rounded-pill px-2 font-size-sm  border-none py-2 hero-feat-pill"
                  style={{ background: "#d5f8f8", color: "#21b0b9" }}
                >
                  <span className="mx-2">Tuition Fee Management</span>
                  <span className="mx-2">
                    <Icon
                      icon="healthicons:money-bag-outline"
                    />
                  </span>
                </div>
                <div
                  className="rounded-pill px-2 font-size-sm  border-none py-2 hero-feat-pill"
                  style={{ background: "#f8ebf1", color: "#d3719d" }}
                >
                  <span className="mx-2">Resit Management</span>
                  <span className="mx-2">
                    <Icon icon="ic:round-repeat" />
                  </span>
                </div>
                <div
                  className="rounded-pill px-2 font-size-sm  border-none py-2 hero-feat-pill"
                  style={{ background: "#e7ebff", color: "#4a4bff" }}
                >
                  <span className="mx-2">Report Card Generation</span>
                  <span className="mx-2">
                    <Icon icon="ph:exam-light" />
                  </span>
                </div>
                <div
                  className="rounded-pill px-2 font-size-sm  border-none py-2 hero-feat-pill"
                  style={{ background: "#eff7d0", color: "#92ba28" }}
                >
                  <span className="mx-2">Event Management</span>
                  <span className="mx-2">
                    <Icon icon="carbon:event" />
                  </span>
                </div>
                
                <div className="flex-wrap d-flex justify-content-center gap-2 feat-pill-child-container-two">
                  <div
                    className="rounded-pill px-2 font-size-sm  border-none py-2 hero-feat-pill"
                    style={{ background: "#d9f2ff", color: "#32acff" }}
                  >
                    <span>Automatic Exam Timetable Creation</span>
                    <span className="mx-2">
                      <Icon icon="mdi:timetable" />
                    </span>
                  </div>
                  <div
                    className="rounded-pill px-2 font-size-sm  border-none py-2 hero-feat-pill"
                    style={{ backgroundColor: "#fae8ff", color: "#d84aeb" }}
                  >
                    <span>Course Resource Management</span>
                    <span className="mx-2">
                      <Icon icon="hugeicons:course" />
                    </span>
                  </div>
                  <div
                  className="rounded-pill px-2 font-size-sm  border-none py-2 hero-feat-pill"
                  style={{ background: "#e2ebea", color: "#5b7f7b" }}
                >
                  <span className="mx-2">Automatic Timetable Creation</span>
                  <span className="mx-2">
                    <Icon
                      icon="ant-design:schedule-outlined"
                    />
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
          <div className={`${darkMode ? 'dark-bg-light gainsboro-color' : 'white-bg'} card d-flex rotate-5  border-none p-2 rounded-3 shadow-sm hero-footer-card`}>
            <div className="d-flex flex-row align-items-center gap-2">
              <div
                className="hero-footer-icon-box"
                style={{ background: "#e5eff9", color: "#55a6db" }}
              >
                <Icon
                  icon="material-symbols-light:event-available-outline-rounded"
                />
              </div>
              <span className="font-size-sm hero-footer-card-caption">
               Reliable. Every Time
              </span>
            </div>
          </div>
          <div className={`${darkMode ? 'dark-bg-light gainsboro-color': 'white-bg'} card d-flex rotate-reverse-5  border-none p-2 rounded-3 shadow-sm hero-footer-card`}>
            <div className="d-flex flex-row align-items-center gap-2">
              <div
                className="hero-footer-icon-box"
                style={{ background: "#defae8", color: "#28b463" }}
              >
                <Icon
                  icon="material-symbols-light:speed-outline"
                />
              </div>
              <span className="font-size-sm hero-footer-card-caption">
                Instant Access, Rapid Results
              </span>
            </div>
          </div>
          <div className={`${darkMode ? 'dark-bg-light gainsboro-color' : 'white-bg'} card d-flex rotate-5  border-none p-2 rounded-3 shadow-sm hero-footer-card`}>
            <div className="d-flex flex-row align-items-center gap-2">
              <div
                className="hero-footer-icon-box"
                style={{ background: "#f7ecfb", color: "#c67cdf" }}
              >
                <Icon
                  icon="fluent:design-ideas-24-regular"
                />
              </div>
              <span className="font-size-sm hero-footer-card-caption">
                User-Friendly by Design
              </span>
            </div>
          </div>
          <div className={`${darkMode ? 'dark-bg-light gainsboro-color': 'white-bg'} card d-flex rotate-reverse-5  border-none p-2 rounded-3 shadow-sm hero-footer-card`}>
            <div className="d-flex flex-row align-items-center gap-2 w-100">
              <div
                className="hero-footer-icon-box"
                style={{ background: "#fff2d2", color: "#ff8b07" }}
              >
                <Icon icon="hugeicons:security-check"  />
              </div>
              <span className="font-size-sm hero-footer-card-caption">
                Protected & Secured Data
              </span>
            </div>
          </div>
          <div className={`${darkMode ? 'dark-bg-light gainsboro-color' : 'white-bg'} card d-flex rotate-5  border-none p-2 rounded-3 shadow-sm hero-footer-card`}>
            <div className="d-flex flex-row align-items-center gap-2">
              <div
                className="hero-footer-icon-box"
                style={{ background: "#e3ebfc", color: "#727be2" }}
              >
                <Icon
                  icon="material-symbols-light:rocket-outline"
                />
              </div>
              <span className="font-size-sm hero-footer-card-caption">
                Smarter Work, Less Efforts
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Hero;
