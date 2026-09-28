import { Dot } from "lucide-react";
import HorizontalDashedLine from "../../../components/DashedLine/HorizonetalDashedLine";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { DateTimeInput } from "../../../components/FormComponents/InputComponents";
import { dateTimeValidationSchema } from "../../../ComponentConfig/YupValidationSchema";
function AnnouncementReview({
  handleClose,
  currentStep,
  nextStep,
  previousStep,
  fullStep,
  drawerData,
}) {
  const moduleState = useSelector((state) => state.announcement);
  console.log(moduleState);
  return (
    <>
      <div className="d-flex flex-column px-2 pt-2 font-size-sm">
        <span className="fw-medium text-capitalize">
          Review Your Announcement
        </span>
        <p className="text-iron-400">
          Everything looks ready. Review the details below before publishing.
        </p>
      </div>
      <div
        className="drawer-content"
        style={{ background: "#f9f9f9", paddingBottom: "10rem" }}
      >
        <div className="d-flex flex-column gap-3 pt-2 px-2 font-size-sm">
          <div className="d-flex flex-column gap-1">
            <span>Announcement Preview</span>
            <div
              className="card border-none border p-2 d-flex flex-column gap-3"
              style={{ borderRadius: "0.85rem" }}
            >
              <div className="d-flex flex-row align-items-center justify-content-between">
                <div className="d-flex flex-row align-items-center gap-1">
                  <div
                    style={{
                      width: "2.5rem",
                      height: "2.5rem",
                      display: "grid",
                      placeItems: "center",
                    }}
                    className="primary-background-100 rounded-2"
                  >
                    <span>IC</span>
                  </div>
                  <div className="d-flex flex-column">
                    <span className="fw-light text-iron-500"> Academic </span>
                    <span className="font-size-sm fw-semibold">
                      Examination timetable released
                    </span>
                  </div>
                </div>
                <div className="d-flex flex-row align-items-center">
                  <Dot />
                  <span>Important</span>
                </div>
              </div>
              <HorizontalDashedLine
                dashed={false}
                color="#ccc"
                thickness={0.2}
              />
              <div className="d-flex flex-column">
                <p className="text-iron-400 fw-light">
                  The examination timetable for the upcoming semester is now
                  available. Students should review their respective schedules
                  before the examination period.
                </p>
                <div className="d-flex flex-row align-items-center flex-wrap gap-2">
                  {[...Array(4)].map((_, index) => (
                    <Fragment key={index}>
                      <span
                        className="primary-background-100 color-primary rounded-pill px-2"
                        style={{ fontSize: "0.7rem" }}
                      >
                        example pill
                      </span>
                    </Fragment>
                  ))}
                </div>
              </div>
              <HorizontalDashedLine
                dashed={false}
                color="#ccc"
                thickness={0.2}
              />
              <div className="d-flex flex-row align-items-center justify-content-end">
                <button className="rounded-3 py-2 px-3 bg-none border-none border">
                  Edit
                </button>
              </div>
            </div>
          </div>

          <div className="d-flex flex-column gap-1">
            <span>Publication</span>
            <div className="d-flex flex-row align-items-center gap-2">
              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="card border-none border p-2 d-flex flex-column gap-4 w-50"
                style={{
                  borderRadius: "0.75rem",
                  height: "14dvh",
                  cursor: "pointer",
                }}
              >
                <span>Publish Immediately</span>
                <p className="text-iron-400 p-0 m-0 mt-auto">
                  The Announcement Will Become Visible As Soon As it is
                  published
                </p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="card border-none border p-2 d-flex flex-column gap-4 w-50"
                style={{
                  borderRadius: "0.75rem",
                  height: "14dvh",
                  cursor: "pointer",
                }}
              >
                <span>Shedule For Later</span>
                <p className="text-iron-400 p-0 m-0 mt-auto">
                  Choose A Date and time for the publication
                </p>
              </motion.div>
            </div>
          </div>
          <div className="d-flex flex-column gap-1">
            <span>Publication Date & Time</span>
            <DateTimeInput
              // onChange={(value) =>
              //   handleStateChange("published_at", value, setFormData)
              // }
              // onValidationChange={(value) =>
              //   handleStateChange("published_at", value, setIsValid)
              // }
              //value={formData.value}
              validationSchema={dateTimeValidationSchema({
                required: true,
                futureOrToday: true,
                messages: {
                  required: "Published Date and Time Required For Scheduled Announcements",
                },
              })}
              //ref={publishedAtRef}
            />
          </div>
        </div>
      </div>
      <div className="drawer-footer font-size-sm">
        <div className="d-flex flex-column w-100">
          <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.5} />
          <div className="d-flex flex-row align-items-center justify-content-between p-2">
            <button
              className="border-none bg-none cursor-pointer"
              onClick={() => previousStep()}
            >
              <div className="d-flex flex-row align-items-center gap-1">
                <span>Back To Audience</span>
              </div>
            </button>
            <button
              className="border-none rounded-3 primary-background text-white font-size-sm px-3 py-2 cursor-pointer"
              onClick={() => nextStep()}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default AnnouncementReview;
