import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import HorizontalDashedLine from "../../../components/DashedLine/HorizonetalDashedLine";
import FormErrorBanner from "../../../components/errors/FormErrorBanner";
import RectangleSkeleton from "../../../components/SkeletonPageLoader/RectangularSkeleton";
import { SingleSpinner } from "../../../components/Spinners/Spinners";
import { useFormError } from "../../../hooks/form/useFormError";
import { useGetJointCourseAssignment } from "../../../hooks/jointCourse/useGetJointCourseAssignment";
import { useSaveJointCourseAssignment } from "../../../hooks/jointCourse/useSaveJointCourseAssignment";
import CourseAssignmentSummary from "./CourseAssignmentSummary";
import CurrentAssignment from "./CurrentAssignment";
import TeacherAvatar from "./TeacherAvatar";
import TeacherPicker from "./TeacherPicker";

const VIEW = { OVERVIEW: "overview", SELECT: "select" };

const slide = (direction) => ({
  initial: { opacity: 0, x: direction * 16 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: direction * -16 },
  transition: { duration: 0.18, ease: "easeOut" },
});

function ManageJointCourseAssignment({ handleClose, drawerData }) {
  const courseId = drawerData?.id;
  const { data, isLoading, error, refetch, isFetching } =
    useGetJointCourseAssignment(courseId);
  const save = useSaveJointCourseAssignment(courseId);
  const { formError, errorBannerRef, handleServerError, clearFormError } =
    useFormError("Couldn't update the assignment");

  const [view, setView] = useState(VIEW.OVERVIEW);
  const [replacingId, setReplacingId] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [justUpdatedId, setJustUpdatedId] = useState(null);

  const assignment = data?.data;
  const teachers = assignment?.teachers ?? [];
  const current = assignment?.current_teachers ?? [];
  const replacing =
    current.find((teacher) => teacher.id === replacingId) ?? null;
  const selected =
    teachers.find((teacher) => teacher.id === selectedId) ?? null;
  const canConfirm =
    Boolean(selected?.eligible && !selected.is_current) && !save.isPending;

  const openPicker = (teacherId = null) => {
    clearFormError();
    setReplacingId(teacherId);
    setSelectedId(null);
    setView(VIEW.SELECT);
  };

  const backToOverview = () => {
    clearFormError();
    setSelectedId(null);
    setView(VIEW.OVERVIEW);
  };

  const confirm = () => {
    if (!canConfirm) return;
    clearFormError();
    save.mutate(
      {
        teacherId: selected.id,
        replacingTeacherId: replacing?.id ?? null,
        teacherName: selected.name,
      },
      {
        onSuccess: () => {
          setJustUpdatedId(selected.id);
          setSelectedId(null);
          setView(VIEW.OVERVIEW);
        },
        onError: handleServerError,
      },
    );
  };

  return (
    <>
      <div className="drawer-content ps-2 pt-3 font-size-sm">
        <div className="d-flex flex-column gap-3">
          {isLoading ? (
            <div className="d-flex flex-column gap-3">
              <RectangleSkeleton
                width="100%"
                height="6.5rem"
                borderRadius={10}
              />
              <RectangleSkeleton width="100%" height="7rem" borderRadius={10} />
            </div>
          ) : error ? (
            <div>
              <span>
                <Icon icon="lucide:circle-alert" width={22} height={22} />
              </span>
              <span className="fw-semibold">
                {error?.response?.data?.errors?.title ??
                  "Couldn't load this course's assignment"}
              </span>
              <p className="jca-muted mb-0">
                {error?.response?.data?.errors?.description ??
                  "Check your connection and try again."}
              </p>
              <button type="button" onClick={() => refetch()}>
                {isFetching ? <SingleSpinner /> : "Try again"}
              </button>
            </div>
          ) : (
            <>
              {view === VIEW.OVERVIEW && (
                <CourseAssignmentSummary course={assignment.course} />
              )}
              <FormErrorBanner
                ref={errorBannerRef}
                error={formError}
                onDismiss={clearFormError}
                className="mb-0"
              />
              <AnimatePresence mode="wait" initial={false}>
                {view === VIEW.OVERVIEW ? (
                  <motion.section
                    key="overview"
                    className="d-flex flex-column gap-1"
                    {...slide(-1)}
                  >
                    <span>Assigned teacher</span>
                    <CurrentAssignment
                      teachers={current}
                      justUpdatedId={justUpdatedId}
                      onAssign={() => openPicker(null)}
                      onChange={(teacherId) => openPicker(teacherId)}
                    />
                  </motion.section>
                ) : (
                  <motion.div key="select" {...slide(1)}>
                    <button
                      type="button"
                      onClick={backToOverview}
                      className="btn btn-link p-0 mb-3 d-flex align-items-center gap-1 text-decoration-none fw-medium text-primary-500 font-size-sm"
                    >
                      <Icon icon="lucide:arrow-left" width={14} height={14} />
                      <span>
                        {current.length ? "Back to current assignment" : "Back"}
                      </span>
                    </button>
                    <TeacherPicker
                      teachers={teachers}
                      selectedId={selectedId}
                      onSelect={setSelectedId}
                      replacing={replacing}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}
        </div>

        <AnimatePresence initial={false}>
          {view === VIEW.SELECT && assignment && (
            <motion.footer
              className="jca-footer"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.16 }}
            >
              <div className="jca-footer__summary">
                {selected ? (
                  <>
                    {replacing && (
                      <>
                        <TeacherAvatar teacher={replacing} size="sm" />
                        <span className="text-truncate">{replacing.name}</span>
                        <Icon
                          icon="lucide:arrow-right"
                          width={14}
                          height={14}
                          className=" flex-shrink-0"
                        />
                      </>
                    )}
                    <TeacherAvatar teacher={selected} size="sm" />
                    <span className="fw-medium text-truncate">
                      {selected.name}
                    </span>
                  </>
                ) : (
                  <span>
                    {replacing
                      ? `Select a teacher to replace ${replacing.name}`
                      : "Select a teacher"}
                  </span>
                )}
              </div>
              <div className="d-flex flex-row align-items-center gap-2 flex-shrink-0">
                <button
                  type="button"
                  className="jca-btn jca-btn--ghost"
                  onClick={backToOverview}
                  disabled={save.isPending}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="jca-btn jca-btn--primary"
                  onClick={confirm}
                  disabled={!canConfirm}
                >
                  {save.isPending ? (
                    <SingleSpinner />
                  ) : replacing ? (
                    "Save Changes"
                  ) : (
                    "Assign Teacher"
                  )}
                </button>
              </div>
            </motion.footer>
          )}
        </AnimatePresence>
      </div>
      <div className="drawer-footer font-size-sm">
        <div className="d-flex flex-column w-100">
          <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.5} />
          <div className="d-flex flex-row align-items-center justify-content-between p-2">
            <button
              type="button"
              className="border-none bg-none p-2"
              onClick={() => handleClose()}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ManageJointCourseAssignment;