import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  CloudUpload,
  ListEnd,
  Clock3,
  UserRoundX,
  Clock,
  CopyCheck,
  TriangleAlert,
  Dot,
  ArrowRight,
} from "lucide-react";
import { useSelector } from "react-redux";
import TeacherSideBar from "../components/SideBars/TeacherSideBar";
import { TeacherIcon } from "../icons/Icons";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import { ModalButton } from "../components/DataTableComponents/ActionComponent";
import AssignTeacherSpecialty from "../ModalContent/TeacherSpecialty/AssignTeacherSpecialty";
import React, { Fragment, useEffect, useMemo, useState } from "react";
import TeacherImportWizzard from "../ModalContent/Teacher/Import/TeacherImportWizzard";
import HorizontalDashedLine from "../components/DashedLine/HorizonetalDashedLine";
import RectangleSkeleton from "../components/SkeletonPageLoader/RectangularSkeleton";
import CreateTeacher from "../DrawerContent/Teacher/CreateTeacher";
import { Drawer } from "../components/drawer/Drawer";
import DrawerTrigger from "../components/drawer/DrawerTrigger";
import { TEACHER_COLUMNS } from "../utils/teacher/teacherColumns";
import JobPopOver from "../components/Popover/JobPopover";
import { teacherImportColDefs } from "../utils/table/colDefs/teachers/teacherImportColdefs";
import ImportWizzard from "../ModalContent/Import/ImportWizzard";
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
} from "../Slices/teacher/teacherSlice";
import { teacherInstanceMap } from "../utils/maps/teacher/teacherInstanceMap";
import { TEACHER_IMPORT_TRIGGER_MAP } from "../utils/maps/teacher/teacherImportMap";
export const sideBarData = [
  { title: "Teacher", path: "/teacher" },
  { title: "Teacher Course", path: "/teacher-course" },
  { title: "Teacher Specialty", path: "/teacher-specialty" },
  { title: "Teacher Availability", path: "/teacher-availability" },
];

function TeacherLayout() {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const handleClose = () => setIsOpen(false);
  const ImportTrigger = useMemo(() => {
    const path = location.pathname;
    return TEACHER_IMPORT_TRIGGER_MAP[path].component || TEACHER_IMPORT_TRIGGER_MAP["/teacher"].component;
  }, [location.pathname]);
  return (
    <>
      <main className="main-container gap-2">
        <div
          className="card border d-flex flex-column gap-2 p-2"
          style={{ borderRadius: "0.75rem" }}
        >
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
                <TeacherIcon />
              </div>
              <span className="font-size-sm fw-semibold">Manage Teachers</span>
            </div>
            <div className="w-50">
              <input
                type="search"
                className="form-control font-size-sm w-100"
                placeholder="Search For Anything"
              />
            </div>
            <div className="d-flex flex-row align-item-center gap-2">
              <JobPopOver category="Teacher" />
              <ImportTrigger />
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
              {location.pathname === sideBarData[0].path && (
                <DrawerTrigger
                  title="Create Teacher"
                  placement="right"
                  drawerChildren={CreateTeacher}
                >
                  <button className="border-none border rounded-3 font-size-sm p-2 primary-background text-white text-capitalize">
                    <span>create teacher</span>
                  </button>
                </DrawerTrigger>
              )}
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

export default TeacherLayout;
