import { useSelector, useDispatch } from "react-redux";
import { useGetSemesterTimetableVersions } from "../../hooks/semesterTimetable/useGetSemesterTimetableVersion";
import { useState, Fragment, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "@iconify/react";
import {
  setTimetableVersion,
  setTimetableVersionStatus,
} from "../../Slices/Asynslices/semesterTimetableSlice";
import { useCreateSemesterTimetableVersion } from "../../hooks/semesterTimetable/useCreateSemesterTimetableVersion";
import toast from "react-hot-toast";
import ToastWarning from "../Toast/ToastWarning";
import { useGetSemesterTimetableConstraints } from "../../hooks/semesterTimetable/useGetSemesterTimetableConstraint";
import { ModalButton } from "../DataTableComponents/ActionComponent";
import { constraintMap } from "../../constants/constraintMap";
import RectangleSkeleton from "../SkeletonPageLoader/RectangularSkeleton";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { useGetTimetableStatus } from "../../hooks/semesterTimetable/useGetTimetableStatus";

function ConstraintVersionWrapper() {
  const semesterTimetable = useSelector((state) => state.semesterTimetable);
  return (
    <>
      <div
        className="bg-white rounded-4 px-2 py-3 d-flex flex-column gap-1"
        style={{ width: "20%", height: "100%" }}
      >
        <div style={{ height: "5%" }} className="w-100">
          <CreateVersion semesterTimetable={semesterTimetable} />
        </div>
        <div className="d-flex flex-column gap-4" style={{ height: "95%" }}>
          <div
            className="d-flex flex-column align-items-start w-100 gap-2 scroll-bar-sm"
            style={{ height: "40%" }}
          >
            <span className="font-size-sm gainsboro-color ms-1">Versions</span>
            <VersionDropdown semesterTimetable={semesterTimetable} />
          </div>
          <div
            className="d-flex flex-column align-items-start w-100 gap-2 scroll-bar-sm"
            style={{
              maxheight: "60%",
              height: "auto",
              overflowY: "auto",
              overflowX: "hidden",
            }}
          >
            <span className="font-size-sm gainsboro-color ms-1">
              Constraints
            </span>
            <div className="d-flex flex-column gap-2 constraint-dd-container w-100">
              <ConstraintDropdown />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default ConstraintVersionWrapper;

function VersionDropdown({ semesterTimetable }) {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);

  const selectedVersion = useSelector(
    (state) => state.semesterTimetable.timetableVersion,
  );

  const {
    data: versions,
    isLoading,
    error: versionsError,
  } = useGetSemesterTimetableVersions(semesterTimetable?.schoolSemester?.id);

  useEffect(() => {
    if (versions?.data?.length > 0 && !isLoading) {
      const latestVersion = versions.data.find((version) => version.is_latest);
      if (latestVersion) {
        dispatch(setTimetableVersion(latestVersion));
        dispatch(setTimetableVersionStatus(latestVersion.scheduler_status));
      }
    }
  }, [versions?.data, isLoading, dispatch]);

  return (
    <>
      <div className="d-flex flex-column gap-2 w-100 h-100">
        <button
          type="button"
          className="w-100 d-flex flex-row align-items-center justify-content-between border-none transparent-bg"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
        >
          <span className="font-size-sm fw-medium">Timetable Versions</span>
          <span>
            <motion.span
              style={{ display: "inline-block" }}
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.18, ease: "easeInOut" }}
            >
              <Icon icon="mi:chevron-down" width="16" height="16" />
            </motion.span>
          </span>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              className="d-flex flex-column gap-3 font-size-sm justify-content-start align-items-start scroll-bar-sm pb-5"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              style={{
                maxHeight: "100%",
                height: "auto",
                overflowY: "auto",
                overflowX: "hidden",
              }}
            >
              {isLoading ? (
                [...Array(6)].map((_, index) => (
                  <RectangleSkeleton
                    key={index}
                    width={"100%"}
                    height={"2rem"}
                    borderRadius={6}
                  />
                ))
              ) : versionsError ? (
                <span className="font-size-sm text-danger">
                  Error loading versions
                </span>
              ) : (
                versions?.data?.map((version) => (
                  <Fragment key={version.id}>
                    <button
                      type="button"
                      className="border-none transparent-bg w-100 d-flex flex-row align-items-center justify-content-between"
                      onClick={() => {
                        dispatch(setTimetableVersion(version));
                        dispatch(
                          setTimetableVersionStatus(version.scheduler_status),
                        );
                        queryClient.invalidateQueries({
                          queryKey: [
                            "parsed-semester-timetable-daignostics",
                            "timetable-slots",
                          ],
                        });
                      }}
                    >
                      <span>{version?.label}</span>
                      {version.is_latest ? (
                        <div className="d-flex flex-row gap-2">
                          <span className="pill-sm-success">latest</span>
                          {selectedVersion?.id === version.id && (
                            <span style={{ lineHeight: 0 }}>
                              <Icon
                                icon="iconamoon:check-bold"
                                width="16"
                                height="16"
                              />
                            </span>
                          )}
                        </div>
                      ) : selectedVersion?.id === version.id ? (
                        <div>
                          <span style={{ lineHeight: 0 }}>
                            <Icon
                              icon="iconamoon:check-bold"
                              width="16"
                              height="16"
                            />
                          </span>
                        </div>
                      ) : null}
                    </button>
                  </Fragment>
                ))
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

function CreateVersion({ semesterTimetable }) {
  const { mutate: createTimetableVersion, isPending } =
    useCreateSemesterTimetableVersion();
  const schoolSemester = semesterTimetable?.schoolSemester;
  function handleCreateVersion() {
    if(!schoolSemester){
       toast.custom(
         <ToastWarning 
           title={"Semester Required"}
           description={"You Must Select A semester before you can create timetable versions"}
         />
       )
       return;
    }
    if (isPending) {
      toast.custom(
        <ToastWarning
          title={"Version Currently Created"}
          description={
            "A Timetable Version Is Currently Being Created Please try again later"
          }
        />,
      );
      return;
    }
    createTimetableVersion({
      school_semester_id: semesterTimetable?.schoolSemester?.id,
    });
  }
  return (
    <button
      className="d-flex flex-row align-items-center justify-content-between border-none transparent-bg w-100"
      disabled={isPending}
      onClick={handleCreateVersion}
    >
      <div className="d-flex flex-row align-items-center gap-2">
        <span style={{ lineHeight: 0 }}>
          <Icon icon="system-uicons:versions" width="20" height="20" />
        </span>
        <span className="font-size-sm fw-semibold">New Version</span>
      </div>
      <span style={{ lineHeight: 0 }}>
        <Icon icon="ic:round-plus" width="20" height="20" />
      </span>
    </button>
  );
}

function ConstraintDropdown() {
  const [openId, setOpenId] = useState(null);
  const {
    data: constraints,
    isLoading,
    error,
  } = useGetSemesterTimetableConstraints();
  const schoolSemester = useSelector((state) =>
      state.semesterTimetable.schoolSemester);

  return (
    <>
      {isLoading ? (
        <span className="font-size-sm">Loading...</span>
      ) : error ? (
        <span className="font-size-sm text-danger">
          Error loading constraints
        </span>
      ) : (
        constraints?.data?.map((constraintCategory) => {
          const isOpen = openId === constraintCategory.id;

          return (
            <div
              className="d-flex flex-column gap-2 w-100"
              key={constraintCategory.id}
            >
              <button
                type="button"
                className="w-100 d-flex flex-row align-items-center justify-content-between border-none transparent-bg"
                disabled={!schoolSemester}
                onClick={() =>
                  setOpenId((prev) =>
                    prev === constraintCategory.id
                      ? null
                      : constraintCategory.id,
                  )
                }
                aria-expanded={isOpen}
              >
                <span className="font-size-sm fw-medium">
                  {constraintCategory.category}
                </span>

                <motion.span
                  style={{ display: "inline-block" }}
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.18, ease: "easeInOut" }}
                >
                  <Icon icon="mi:chevron-down" width="16" height="16" />
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    className="d-flex flex-column gap-3 font-size-sm justify-content-start align-items-start px-2"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    style={{ overflow: "hidden" }}
                  >
                    {constraintCategory.constraints.map((constraint) => (
                      <Fragment key={constraint.id}>
                        <ModalButton
                          className="border-none transparent-bg"
                          action={{
                            modalContent: constraintMap.find(
                              (c) => c.key === constraint.key,
                            )?.modal,
                          }}
                          size={"lg"}
                        >
                          <span>{constraint.name}</span>
                        </ModalButton>
                      </Fragment>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })
      )}
    </>
  );
}
