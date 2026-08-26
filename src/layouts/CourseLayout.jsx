import ResitFeeSideBar from "../components/SideBars/ResitFeeSideBar";
import { Outlet, useNavigate } from "react-router-dom";
import { CourseIcon } from "../icons/Icons";
import { useSelector } from "react-redux";
import CourseSideBar from "../components/SideBars/CourseSideBar";
import JobPopOver from "../components/Popover/JobPopover";
import { motion, AnimatePresence } from "framer-motion";
import { ModalButton } from "../components/DataTableComponents/ActionComponent";
import { Icon } from "@iconify/react";
import {
  resetAllCustomFilters,
  addCustomFilter,
  toggleGeneralFilter,
  removeCustomFilter,
  setCustomFilter,
  setImportStatus,
  setImportSelectedFile,
  setImportReset,
  setColumnMapping,
  removeRepeatableGroup,
  addRepeatableGroup,
  setRepeatableGroupValue,
  setStandardGroupValue,
} from "../Slices/administrator/courseSlice";
import { COURSE_COLUMNS } from "../utils/course/courseColumns";
import { courseImportColDefs } from "../utils/table/colDefs/course/courseImportColDefs";
import ImportWizzard from "../ModalContent/Import/ImportWizzard";
import { courseInstanceMap } from "../utils/maps/course/courseInstanceMap";
import DrawerTrigger from "../components/drawer/DrawerTrigger";
import CreateCourse from "../DrawerContent/Course/CreateCourse";
import { COURSE_IMPORT_TRIGGER_MAP } from "../utils/maps/course/courseImportTriggerMap";
import { useMemo } from "react";
import CreateJointCourse from "../DrawerContent/JointCourse/CreateJointCourse";
function CourseLayout() {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const navigate = useNavigate();
  const sideBarData = [
    {
      title: "Course",
      path: "/courses",
    },
    {
      title: "Joint Course",
      path: "/joint-course",
    },
    {
      title: "Joint Course Timetable",
      path: "/joint-course-timetable",
    },
  ];
  const ImportTrigger = useMemo(() => {
    const path = location.pathname;
    return COURSE_IMPORT_TRIGGER_MAP[path]?.component || null;
  }, [location.pathname]);
  return (
    <>
      <main className="main-container gap-2">
        <div className="card border rounded-3 p-2 d-flex flex-column gap-2">
          <div className="d-flex flex-row align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-2">
              <div
                className={`${
                  darkMode ? "dark-mode-active" : "light-mode-active"
                } d-flex justify-content-center align-items-center`}
                style={{
                  width: "2rem",
                  height: "2rem",
                  borderRadius: "0.5rem",
                }}
              >
                <CourseIcon />
              </div>
              <span className="font-size-sm fw-semibold">Manage Courses</span>
            </div>
            <div className="w-50">
              <input
                type="search"
                className="form-control font-size-sm w-100"
                placeholder="Search For Anything"
              />
            </div>
            <div className="d-flex flex-row align-item-center gap-2">
              <JobPopOver category={"Course"} />
              {ImportTrigger && <ImportTrigger />}
              <ModalButton
                classname={
                  "border-none border rounded-3 font-size-sm p-2 d-flex flex-row align-items-center gap-1 white-bg"
                }
              >
                <span style={{ lineHeight: "16px" }}>Actions</span>
                <span>
                  <Icon
                    icon="majesticons:chevron-down"
                    width={16}
                    height={16}
                  />
                </span>
              </ModalButton>
              {location.pathname === sideBarData[0].path ? (
                <DrawerTrigger
                  title="Create Course"
                  placement="right"
                  drawerChildren={CreateCourse}
                >
                  <button className="border-none border rounded-3 font-size-sm p-2 primary-background text-white text-capitalize">
                    <span>create course</span>
                  </button>
                </DrawerTrigger>
              ) : location.pathname === sideBarData[1].path ? (
                <DrawerTrigger
                  title="Create Joint Course"
                  placement="right"
                  drawerChildren={CreateJointCourse}
                >
                  <button className="border-none border rounded-3 font-size-sm p-2 primary-background text-white text-capitalize">
                    <span>Create Joint Course</span>
                  </button>
                </DrawerTrigger>
              ) : null}
            </div>
          </div>
          <hr />
          <div className="d-flex flex-row align-items-center gap-4 font-size-sm">
            {sideBarData.map((tab) => {
              const isActive = location.pathname === tab.path;
              return (
                <div
                  key={tab.path}
                  className="d-flex flex-column gap-1 position-relative"
                >
                  <button
                    onClick={() => navigate(tab.path)}
                    className={`border-none transparent-bg transition-four-sec ${
                      isActive ? "color-primary fw-medium" : "text-muted"
                    }`}
                  >
                    <div className="d-flex flex-row align-items-center gap-1">
                      <span>{tab.title}</span>
                    </div>
                  </button>
                  <div
                    style={{
                      height: "0.1rem",
                      width: "100%",
                      position: "relative",
                    }}
                  >
                    {isActive ? (
                      <motion.div
                        layoutId="activeUnderline"
                        className="position-absolute start-0 end-0 bottom-0"
                        style={{
                          height: "0.1rem",
                          background: "#0ea7e9",
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="h-100">
          <Outlet />
        </div>
      </main>
    </>
  );
}
export default CourseLayout;
