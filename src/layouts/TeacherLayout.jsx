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
import CreateTeacher from "../ModalContent/Teacher/CreateTeacher";
import AssignTeacherSpecialty from "../ModalContent/TeacherSpecialty/AssignTeacherSpecialty";
import React, { Fragment, useEffect, useMemo, useState } from "react";
import TeacherImportWizzard from "../ModalContent/Teacher/Import/TeacherImportWizzard";
import ProgressBar from "react-bootstrap/ProgressBar";
import { isLastElement } from "../utils/functions";
import HorizontalDashedLine from "../components/DashedLine/HorizonetalDashedLine";
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
  FloatingPortal,
} from "@floating-ui/react";
import { useChannel } from "ably/react";
import { useGetJobs } from "../hooks/job/useGetJobs";
import { jobProgressMap } from "../utils/maps/jobProgressMap";
import RectangleSkeleton from "../components/SkeletonPageLoader/RectangularSkeleton";

export const sideBarData = [
  { title: "Teacher", path: "/teacher" },
  { title: "Teacher Course", path: "/teacher-course" },
  { title: "Teacher Specialty", path: "/teacher-specialty" },
  { title: "Teacher Availability", path: "/teacher-availability" },
];

const importMap = {
  "/teacher": {
    component: TeacherImportWizzard,
    size: "xl",
    title: "Import Teacher",
  },
  // "/teacher-course": {
  //   component: ImportTeacherCourse,
  //   size: "lg",
  //   title: "Import Teacher Course",
  // },
  // "/teacher-specialty": {
  //   component: ImportTeacherSpecialty,
  //   size: "lg",
  //   title: "Import Teacher Specialty",
  // }
};

function TeacherLayout() {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const location = useLocation();
  const navigate = useNavigate();
  const currentImportConfig = useMemo(() => {
    const path = location.pathname;
    return importMap[path] || importMap["/teacher"];
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
              <JobPopOver />
              <ModalButton
                action={{ modalContent: currentImportConfig.component }}
                size={currentImportConfig.size || "lg"}
                classname={
                  "border-none border rounded-3 font-size-sm p-2 d-flex flex-row align-items-center gap-1 white-bg"
                }
              >
                <span style={{ lineHeight: "16px" }}>Import</span>
                <span>
                  <Icon icon="tabler:arrow-down" width={14} height={14} />
                </span>
              </ModalButton>
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
                <ModalButton
                  action={{ modalContent: CreateTeacher }}
                  size={"lg"}
                  classname={
                    "border-none border rounded-3 font-size-sm p-2 primary-background text-white text-capitalize"
                  }
                >
                  <span>create teacher</span>
                </ModalButton>
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

export function JobPopOver() {
  const [isOpen, setIsOpen] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [activeTab, setActiveTab] = useState("all");

  // Search & Debounce State
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const { mutate, isLoading, isError, data, error } = useGetJobs();
  const schoolAdmin = useSelector((state) => state.auth?.user?.authSchoolAdmin);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    whileElementsMounted: autoUpdate,
    placement: "bottom-start",
    middleware: [offset(8), flip(), shift()],
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const popoverVariants = {
    hidden: { opacity: 0, scale: 0.95, y: -4 },
    visible: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95, y: -4 },
  };

  const fetchJobs = () => {
    mutate({
      category: "teacher",
      group_by: "status",
      ...(activeTab !== "all" && { status: activeTab }),
    });
  };

  useEffect(() => {
    if (data?.data) {
      setJobs(data.data);
    }
  }, [data]);

  useEffect(() => {
    fetchJobs();
  }, [activeTab]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const eventName = "job.update";
  const channelName = `private:schoolBranch.${schoolAdmin?.school_branch_id}.schoolAdmin.${schoolAdmin?.id}.jobs`;

  useChannel(channelName, eventName, (message) => {
    const payload = message?.data?.payload || message?.payload || message;
    if (!payload || !payload.job_id) return;

    setJobs((prevJobs) => {
      let jobFound = false;

      const updatedJobs = prevJobs.map((group) => {
        const hasJob = group.jobs?.some((j) => j.id === payload.job_id);
        if (hasJob) {
          jobFound = true;
          return {
            ...group,
            jobs: group.jobs.map((j) =>
              j.id === payload.job_id
                ? {
                    ...j,
                    progress_percentage:
                      payload.progress ?? j.progress_percentage,
                    status: payload.status ?? j.status,
                    stage: payload.stage ?? j.stage,
                  }
                : j,
            ),
          };
        }
        return group;
      });

      if (!jobFound) {
        fetchJobs();
        return prevJobs;
      }

      return updatedJobs;
    });
  });

  const activeJobsCount = useMemo(() => {
    if (!jobs || !Array.isArray(jobs)) return 0;
    const activeStatuses = ["processing", "queued", "pending", "in_progress"];

    return jobs.reduce((total, group) => {
      const activeInGroup = (group.jobs || []).filter((j) =>
        activeStatuses.includes(j.status?.toLowerCase()),
      ).length;
      return total + activeInGroup;
    }, 0);
  }, [jobs]);

  const filteredJobs = useMemo(() => {
    if (!debouncedSearch.trim()) return jobs;

    const query = debouncedSearch.toLowerCase();
    return jobs
      .map((group) => {
        const matchingJobs = (group.jobs || []).filter(
          (j) =>
            j.title?.toLowerCase().includes(query) ||
            j.module?.toLowerCase().includes(query) ||
            j.category_name?.toLowerCase().includes(query),
        );

        return {
          ...group,
          jobs: matchingJobs,
        };
      })
      .filter((group) => group.jobs.length > 0);
  }, [jobs, debouncedSearch]);

  return (
    <>
      <button
        ref={refs.setReference}
        {...getReferenceProps()}
        className="border-none border rounded-3 font-size-sm p-2 d-flex flex-row align-items-center gap-2 white-bg"
      >
        <span style={{ lineHeight: "16px" }}>Jobs</span>
        {activeJobsCount > 0 && (
          <span
            className="d-inline-flex align-items-center justify-content-center rounded-circle bg-danger text-white fw-semibold"
            style={{ width: "1.2rem", height: "1.2rem", fontSize: "0.75rem" }}
          >
            {activeJobsCount}
          </span>
        )}
      </button>

      <FloatingPortal>
        <AnimatePresence>
          {isOpen && (
            <div
              ref={refs.setFloating}
              style={floatingStyles}
              {...getFloatingProps()}
              className="z-index-master"
            >
              <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={popoverVariants}
                transition={{ duration: 0.15, ease: "easeInOut" }}
                className="card shadow-sm white-bg rounded-4"
                style={{
                  width: "40vw",
                  minWidth: "220px",
                }}
              >
                <div
                  className="font-size-sm rounded-top-4 border-bottom p-2"
                  style={{ background: "#f9f9f9" }}
                >
                  <div className="d-flex flex-column">
                    <span className="fw-semibold">Jobs</span>
                    <span>Background activity for Teacher Management</span>
                  </div>
                </div>
                <div className=" d-flex flex-column gap-2">
                  <div className="d-flex flex-column">
                    <div className="p-2">
                      <input
                        type="search"
                        className="form-control font-size-sm"
                        placeholder="Search Job"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <StatusTabs
                      activeTab={activeTab}
                      onTabChange={handleTabChange}
                    />
                  </div>
                  <div
                    className="d-flex flex-column gap-4 scroll-bar-sm over-flow-x-hidden over-flow-y-auto height-auto me-1"
                    style={{ maxHeight: "50dvh", paddingBottom: "2rem" }}
                  >
                    {isLoading ? (
                      <>
                        {[...Array(3)].map((_, index) => (
                          <Fragment key={index}>
                            <div className="d-flex flex-column gap-3 ps-2">
                              <RectangleSkeleton width="35%" height="1dvh" />
                              <div className="d-flex flex-column gap-2">
                                {[...Array(3)].map((_, indexOne) => (
                                  <Fragment key={indexOne}>
                                    <div className="d-flex flex-column gap-2">
                                      <div className="d-flex flex-row align-items-center gap-2">
                                        <RectangleSkeleton
                                          width="3rem"
                                          height="3rem"
                                        />
                                        <div className="d-flex flex-column gap-2">
                                          <RectangleSkeleton
                                            width="40%"
                                            height="1rem"
                                          />
                                          <RectangleSkeleton
                                            width="60%"
                                            height="1rem"
                                          />
                                        </div>
                                      </div>
                                      <div className="d-flex flex-row align-items-center gap-2">
                                        <RectangleSkeleton
                                          width="20%"
                                          height="1dvh"
                                        />
                                        <RectangleSkeleton
                                          width="20%"
                                          height="1dvh"
                                        />
                                      </div>
                                    </div>
                                  </Fragment>
                                ))}
                              </div>
                            </div>
                            <div className="d-flex flex-column gap-3 ps-2">
                              <RectangleSkeleton width="35%" height="1dvh" />
                              <div>
                                {[...Array(3)].map((_, indexTwo) => (
                                  <Fragment key={indexTwo}>
                                    <div className="d-flex flex-column gap-2">
                                      <div className="d-flex flex-row align-items-center justify-content-between">
                                        <div className="d-flex flex-row align-items-center gap-2">
                                          <RectangleSkeleton
                                            width="3rem"
                                            height="3rem"
                                          />
                                          <div className="d-flex flex-column gap-2">
                                            <RectangleSkeleton
                                              width="40%"
                                              height="1rem"
                                            />
                                            <RectangleSkeleton
                                              width="60%"
                                              height="1rem"
                                            />
                                          </div>
                                        </div>
                                        <RectangleSkeleton
                                          width="5rem"
                                          height="1rem"
                                        />
                                      </div>
                                      <RectangleSkeleton
                                        width="100%"
                                        height="1dvh"
                                      />
                                    </div>
                                  </Fragment>
                                ))}
                              </div>
                            </div>
                          </Fragment>
                        ))}
                      </>
                    ) : isError ? (
                      <div className="p-2">
                        Error occurred while fetching jobs.
                      </div>
                    ) : filteredJobs?.length > 0 ? (
                      filteredJobs.map((job, index) => (
                        <Fragment key={index}>
                          <div className="d-flex flex-column gap-2  px-2">
                            <div className="d-flex flex-row align-items-center gap-1 font-size-sm">
                              <span className="fw-semibold">
                                {job?.group?.name}
                              </span>
                              <span>
                                <Icon
                                  icon="icon-park-outline:dot"
                                  width={8}
                                  height={8}
                                />
                              </span>
                              <span>{job?.jobs?.length}</span>
                            </div>
                            <div className="d-flex flex-column gap-3">
                              {job?.jobs?.map((jobItem, jobItemIndex) => {
                                const Component = jobProgressMap.find(
                                  (items) => items.status === jobItem?.status,
                                )?.component;
                                return (
                                  <Fragment key={jobItem?.id}>
                                    {Component && (
                                      <Component
                                        title={jobItem.title}
                                        module={jobItem.module}
                                        type={jobItem.type}
                                        processed={jobItem?.successful_items}
                                        issuesCount={jobItem?.failed_items}
                                        total={jobItem?.total_items}
                                        failedItems={jobItem?.failed_items}
                                        startedAt={jobItem?.started_at}
                                        unit={jobItem?.unit}
                                        processedUnit={jobItem?.processed_unit}
                                        progress={jobItem?.progress_percentage}
                                      />
                                    )}
                                    {!isLastElement(
                                      jobItemIndex,
                                      job?.jobs,
                                    ) && (
                                      <HorizontalDashedLine
                                        dashed={false}
                                        color="#ddd"
                                        thickness={0.5}
                                      />
                                    )}
                                  </Fragment>
                                );
                              })}
                            </div>
                          </div>
                        </Fragment>
                      ))
                    ) : (
                      <div className="p-2">No jobs found.</div>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </>
  );
}

function StatusTabs({ activeTab, onTabChange }) {
  const tabs = [
    { id: "all", label: "All", count: 100 },
    { id: "active", label: "Active", count: 100 },
    { id: "failed", label: "Failed", count: 100 },
    { id: "completed", label: "Completed", count: 20 },
  ];

  return (
    <div className="border-bottom d-flex flex-row gap-4 font-size-sm px-2">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className="border-none bg-transparent text-decoration-none p-0 pb-2 position-relative border-0 rounded-0 font-size-sm"
            style={{
              color: isActive ? "#0ea7e9" : "#000",
              transition: "color 0.2s ease",
            }}
          >
            <span>
              {tab.label} <span className="opacity-75">{tab.count}</span>
            </span>

            {isActive && (
              <motion.span
                layoutId="activeTabUnderline"
                className="position-absolute start-0 w-100 primary-background"
                style={{ height: "2px", bottom: "-1px" }}
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
