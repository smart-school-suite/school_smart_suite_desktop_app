import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { useSelector } from "react-redux";
function AuthHero() {
  const darkMode = useSelector((state) => state.theme.darkMode);
  return (
    <>
      <div
        style={{
          height: "100dvh",
          width: "60%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          className="position-relative bg-primary-50 d-flex align-items-center justify-content-center overflow-hidden flex-grow-1"
          style={{
            width: "100%",
            minHeight: 0,
          }}
        >
          <div
            className="position-absolute top-50 start-50 translate-middle rounded-circle"
            style={{
              width: "70%",
              height: "70%",
              background:
                "radial-gradient(circle, rgba(14, 167, 233, 0.14) 0%, rgba(14, 167, 233, 0) 70%)",
              pointerEvents: "none",
            }}
          />
          <div
            className="position-absolute top-0 start-0 w-100 h-100"
            style={{
              opacity: 0.035,
              pointerEvents: "none",
              backgroundImage: `
                  linear-gradient(rgba(8,48,73,1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(8,48,73,1) 1px, transparent 1px)
                `,
              backgroundSize: "40px 40px",
            }}
          />
          <div
            className="position-relative d-flex flex-column align-items-center"
            style={{
              width: "100%",
              maxWidth: "1050px",
              zIndex: 2,
            }}
          >
            <motion.div
              initial={{
                opacity: 0,
                x: 50,
                y: 20,
                scale: 0.96,
              }}
              animate={{
                opacity: 1,
                x: 0,
                y: 0,
                scale: 1,
              }}
              transition={{
                duration: 0.9,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="position-relative w-100 d-flex justify-content-center"
            >
              <motion.img
                src="/images/test-img.png"
                alt="Smart School Suite dashboard"
                className="d-block"
                style={{
                  width: "94%",
                  maxWidth: "1000px",
                  height: "auto",
                  maxHeight: "60vh",
                  objectFit: "contain",
                  filter: "drop-shadow(0 35px 45px rgba(8, 48, 73, 0.20))",
                }}
                animate={{
                  y: [0, -6, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
            <motion.div
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
                delay: 0.45,
                ease: "easeOut",
              }}
              className="text-center mt-3"
            >
              <div
                className="fw-semibold"
                style={{
                  color: "#083049",
                  fontSize: "15px",
                  letterSpacing: "-0.1px",
                }}
              >
                Everything connected. Nothing scattered.
              </div>

              <div
                className="mt-1"
                style={{
                  color: "rgba(8, 48, 73, 0.55)",
                  fontSize: "12px",
                }}
              >
                Smart School Suite
              </div>
            </motion.div>
          </div>
          <motion.div
            initial={{
              opacity: 0,
              x: -25,
              y: 15,
            }}
            animate={{
              opacity: 1,
              x: 0,
              y: 0,
            }}
            transition={{
              duration: 0.7,
              delay: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="position-absolute bg-white rounded-3 shadow-sm p-3"
            style={{
              left: "5%",
              top: "28%",
              width: "150px",
              zIndex: 4,
              boxShadow: "0 15px 35px rgba(8, 48, 73, 0.10)",
            }}
          >
            <div
              className="text-uppercase fw-semibold"
              style={{
                fontSize: "9px",
                letterSpacing: "0.7px",
                color: "rgba(8, 48, 73, 0.5)",
              }}
            >
              Attendance
            </div>

            <div
              className="fw-bold mt-1"
              style={{
                color: "#083049",
                fontSize: "24px",
                lineHeight: 1,
              }}
            >
              94.8%
            </div>

            <div
              className="mt-2"
              style={{
                fontSize: "10px",
                color: "#16a34a",
              }}
            >
              ↑ 3.2% this month
            </div>
          </motion.div>
          <motion.div
            initial={{
              opacity: 0,
              x: 25,
              y: 15,
            }}
            animate={{
              opacity: 1,
              x: 0,
              y: 0,
            }}
            transition={{
              duration: 0.7,
              delay: 0.85,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="position-absolute bg-white rounded-3 shadow-sm p-3"
            style={{
              right: "5%",
              bottom: "25%",
              width: "150px",
              zIndex: 4,
              boxShadow: "0 15px 35px rgba(8, 48, 73, 0.10)",
            }}
          >
            <div
              className="text-uppercase fw-semibold"
              style={{
                fontSize: "9px",
                letterSpacing: "0.7px",
                color: "rgba(8, 48, 73, 0.5)",
              }}
            >
              Students
            </div>

            <div
              className="fw-bold mt-1"
              style={{
                color: "#083049",
                fontSize: "24px",
                lineHeight: 1,
              }}
            >
              2,486
            </div>

            <div
              className="mt-2"
              style={{
                fontSize: "10px",
                color: "rgba(8, 48, 73, 0.5)",
              }}
            >
              Active students
            </div>
          </motion.div>
        </div>
        <div
          className="w-100 flex-shrink-0 py-2 overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          }}
        >
          <motion.div
            className="d-flex flex-row align-items-center gap-3"
            style={{ width: "max-content" }}
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              ease: "linear",
              duration: 50,
              repeat: Infinity,
            }}
          >
            {[
              {
                bg: "#e5eff9",
                color: "#55a6db",
                icon: "material-symbols-light:event-available-outline-rounded",
                text: "Reliable. Every Time",
              },
              {
                bg: "#defae8",
                color: "#28b463",
                icon: "material-symbols-light:speed-outline",
                text: "Instant Access, Rapid Results",
              },
              {
                bg: "#f7ecfb",
                color: "#c67cdf",
                icon: "fluent:design-ideas-24-regular",
                text: "User-Friendly by Design",
              },
              {
                bg: "#fff2d2",
                color: "#ff8b07",
                icon: "hugeicons:security-check",
                text: "Protected & Secured Data",
              },
              {
                bg: "#e3ebfc",
                color: "#727be2",
                icon: "material-symbols-light:rocket-outline",
                text: "Smarter Work, Less Efforts",
              },
            ]
              .concat([
                {
                  bg: "#e5eff9",
                  color: "#55a6db",
                  icon: "material-symbols-light:event-available-outline-rounded",
                  text: "Reliable. Every Time",
                },
                {
                  bg: "#defae8",
                  color: "#28b463",
                  icon: "material-symbols-light:speed-outline",
                  text: "Instant Access, Rapid Results",
                },
                {
                  bg: "#f7ecfb",
                  color: "#c67cdf",
                  icon: "fluent:design-ideas-24-regular",
                  text: "User-Friendly by Design",
                },
                {
                  bg: "#fff2d2",
                  color: "#ff8b07",
                  icon: "hugeicons:security-check",
                  text: "Protected & Secured Data",
                },
                {
                  bg: "#e3ebfc",
                  color: "#727be2",
                  icon: "material-symbols-light:rocket-outline",
                  text: "Smarter Work, Less Efforts",
                },
              ])
              .map((item, index) => (
                <div
                  key={index}
                  className={`${
                    darkMode ? "dark-bg-light gainsboro-color" : "white-bg"
                  } card d-flex border-none p-2 rounded-3 shadow-sm flex-shrink-0`}
                >
                  <div className="d-flex flex-row align-items-center gap-2">
                    <div
                      className="hero-footer-icon-box"
                      style={{ background: item.bg, color: item.color }}
                    >
                      <Icon icon={item.icon} />
                    </div>
                    <span className="font-size-sm hero-footer-card-caption">
                      {item.text}
                    </span>
                  </div>
                </div>
              ))}
          </motion.div>
        </div>
      </div>
    </>
  );
}
export default AuthHero;
