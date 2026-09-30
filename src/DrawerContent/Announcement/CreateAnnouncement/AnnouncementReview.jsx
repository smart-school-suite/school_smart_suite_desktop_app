import { Dot, X } from "lucide-react";
import HorizontalDashedLine from "../../../components/DashedLine/HorizonetalDashedLine";
import { Fragment, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { DateTimeInput } from "../../../components/FormComponents/InputComponents";
import { dateTimeValidationSchema } from "../../../ComponentConfig/YupValidationSchema";
import {
  setPublicationType,
  setPublicationValue,
} from "../../../Slices/announcement/announcementSlice";
import { ModalButton } from "../../../components/DataTableComponents/ActionComponent";
import { useCreateAnnouncement } from "../../../hooks/announcement/useCreateAnnouncement";
import { SingleSpinner } from "../../../components/Spinners/Spinners";
import AnnouncementDiscardWarning from "../../../ModalContent/Announcement/AnnouncementDiscardWarning";
function AnnouncementReview({
  handleClose,
  currentStep,
  previousStep,
  fullStep,
  handleNavigate,
}) {
  const { mutate: createAnnouncement, isPending } =
    useCreateAnnouncement(handleClose);
  const dispatch = useDispatch();
  const moduleState = useSelector(
    (state) => state.announcement.createAnnouncement,
  );
  const publishedAtRef = useRef();
  const content = moduleState?.content;

  const handleCreate = () => {
    const payload = {
      title: content?.title?.value,
      content: content?.content?.value,
      status: moduleState?.publication?.type,
      published_at: moduleState?.publication?.schedule?.value,
      category_id: content?.category?.value?.id,
      label_id: content?.label?.value?.id,
      tag_ids: content?.tags?.value?.map((t) => t.id),
      admin_audience: [
        {
          individual_ids:
            moduleState?.audience?.targeting?.administrators?.individualIds,
        },
      ],
      student_audience: [
        {
          individual_ids:
            moduleState?.audience?.targeting?.students?.individualIds,
          department_ids:
            moduleState?.audience?.targeting?.students?.criteria.departmentIds,
          specialty_ids:
            moduleState?.audience?.targeting?.students?.criteria.specialtyIds,
          level_ids:
            moduleState?.audience?.targeting?.students?.criteria.levelIds,
        },
      ],
      teacher_audience: [
        {
          individual_ids:
            moduleState?.audience?.targeting?.teachers?.individualIds,
          department_ids:
            moduleState?.audience?.targeting?.teachers?.criteria.departmentIds,
          specialty_ids:
            moduleState?.audience?.targeting?.teachers?.criteria.specialtyIds,
          level_ids:
            moduleState?.audience?.targeting?.teachers?.criteria.levelIds,
        },
      ],
    };

    createAnnouncement(payload);
  };
  return (
    <>
      <div className="d-flex flex-row align-items-center justify-content-between border-bottom p-2 font-size-sm">
        <span className="fw-medium">Create Announcement</span>
        {moduleState.isDirty ? (
          <ModalButton
            action={{
              modalContent: AnnouncementDiscardWarning,
            }}
            size={"md"}
            rowData={{ handleCloseDrawer: handleClose }}
            closeOnOutsideClick={false}
            closeOnEscape={false}
          >
            <button
              className="bg-none border-none border rounded-circle"
              style={{
                width: "2rem",
                height: "2rem",
                display: "grid",
                placeItems: "center",
                cursor: "pointer",
              }}
              disabled={isPending}
            >
              <X size={16} />
            </button>
          </ModalButton>
        ) : (
          <button
            className="bg-none border-none border rounded-circle"
            aria-label="Close drawer"
            onClick={() => {
              handleClose();
            }}
            disabled={isPending}
            style={{
              width: "2rem",
              height: "2rem",
              display: "grid",
              placeItems: "center",
              cursor: "pointer",
            }}
          >
            <X size={16} />
          </button>
        )}
      </div>
      <div className="d-flex flex-row justify-content-between px-2 pt-2 ">
        <div className="d-flex flex-column font-size-sm">
          <span className="fw-medium text-capitalize">
            Review Your Announcement
          </span>
          <p className="text-iron-400">
            Everything looks ready. Review the details below before publishing.
          </p>
        </div>
        <div className="d-flex flex-row align-items-center gap-1 fw-semibold text-capitalize font-size-sm">
          <span>step</span>
          <span>{currentStep}</span>
          <span>of</span>
          <span>{fullStep}</span>
          <span>Completed</span>
        </div>
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
                    <span className="fw-light text-iron-500">
                      {" "}
                      {content?.category?.value?.name}{" "}
                    </span>
                    <span className="font-size-sm fw-semibold">
                      {content?.title?.value}
                    </span>
                  </div>
                </div>
                <div
                  className="d-flex flex-row align-items-center px-2 rounded-pill "
                  style={{
                    background: JSON.parse(content?.label?.value?.color)
                      .color_light,
                    color: JSON.parse(content?.label?.value?.color).color_thick,
                  }}
                >
                  <span>{content?.label?.value?.name}</span>
                </div>
              </div>
              <HorizontalDashedLine
                dashed={false}
                color="#ccc"
                thickness={0.2}
              />
              <div className="d-flex flex-column">
                <p className="text-iron-400 fw-light">
                  {content?.content?.value}
                </p>
                <div className="d-flex flex-row align-items-center flex-wrap gap-2">
                  {content?.tags?.value?.map((tag, index) => (
                    <Fragment key={tag?.id}>
                      <span
                        className="primary-background-100 color-primary rounded-pill px-2"
                        style={{ fontSize: "0.7rem" }}
                      >
                        {tag?.name}
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
                <button
                  className="rounded-3 py-2 px-3 bg-none border-none border"
                  onClick={() => handleNavigate(0)}
                >
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
                className={`card shadow-sm p-2 d-flex flex-column gap-4 w-50  transition-all hover-bg-primary-50 hover-text-primary-500
                   ${moduleState?.publication?.type === "published" ? "bg-primary-100 text-primary-500 border-primary-500" : "border border-none "}
                  `}
                style={{
                  borderRadius: "0.75rem",
                  height: "14dvh",
                  cursor: "pointer",
                }}
                onClick={() =>
                  dispatch(
                    setPublicationType({
                      type: "published",
                    }),
                  )
                }
              >
                <span>Publish Immediately</span>
                <p
                  className={`p-0 m-0 mt-auto transition-all hover-text-primary-500
                     ${
                       moduleState?.publication?.type === "published"
                         ? "text-primary-500 "
                         : "text-iron-400"
                     }`}
                >
                  The Announcement Will Become Visible As Soon As it is
                  published
                </p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className={`card  shadow-sm p-2 d-flex flex-column gap-4 w-50  transition-all hover-bg-primary-50 hover-text-primary-500
                   ${moduleState?.publication?.type === "scheduled" ? "bg-primary-100 text-primary-500 border-primary-500 border-1" : "border border-none"}
                  `}
                style={{
                  borderRadius: "0.75rem",
                  height: "14dvh",
                  cursor: "pointer",
                }}
                onClick={() =>
                  dispatch(
                    setPublicationType({
                      type: "scheduled",
                    }),
                  )
                }
              >
                <span>Shedule For Later</span>
                <p
                  className={`p-0 m-0 mt-auto transition-all hover-text-primary-500
                     ${
                       moduleState?.publication?.type === "scheduled"
                         ? "text-primary-500 "
                         : "text-iron-400"
                     }`}
                >
                  Choose A Date and time for the publication
                </p>
              </motion.div>
            </div>
          </div>
          {moduleState?.publication?.type === "scheduled" && (
            <div className="d-flex flex-column gap-1">
              <span>Publication Date & Time</span>
              <DateTimeInput
                onChange={(value) =>
                  dispatch(
                    setPublicationValue({
                      field: "value",
                      value,
                    }),
                  )
                }
                onValidationChange={(value) =>
                  dispatch(
                    setPublicationValue({
                      field: "isValid",
                      value,
                    }),
                  )
                }
                value={moduleState?.publication?.schedule?.value}
                validationSchema={dateTimeValidationSchema({
                  required: true,
                  futureOrToday: true,
                  messages: {
                    required:
                      "Published Date and Time Required For Scheduled Announcements",
                  },
                })}
                ref={publishedAtRef}
              />
            </div>
          )}
        </div>
      </div>
      <div className="drawer-footer font-size-sm">
        <div className="d-flex flex-column w-100">
          <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.5} />
          <div className="d-flex flex-row align-items-center justify-content-between p-2">
            <button
              className="border-none bg-none cursor-pointer"
              onClick={() => previousStep()}
              disabled={isPending}
            >
              <div className="d-flex flex-row align-items-center gap-1">
                <span>Back To Audience</span>
              </div>
            </button>
            <button
              className="border-none rounded-3 primary-background text-white font-size-sm px-3 py-2 cursor-pointer"
              onClick={() => handleCreate()}
              disabled={isPending}
            >
              {isPending ? <SingleSpinner /> : <>Create Announcement</>}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default AnnouncementReview;
