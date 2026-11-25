import { JOB_STATUS, JOB_STATUS_LABEL } from "@/constants";
import {
  autoUpdate,
  flip,
  FloatingPortal,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from "@floating-ui/react";
import { Icon } from "@iconify/react";
import { useChannel } from "ably/react";
import { AnimatePresence, motion } from "framer-motion";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useGetJobs } from "../../hooks/job/useGetJobs";
import { isLastElement } from "../../utils/functions";
import { subscribeToJobs } from "../../utils/jobs/jobTracker";
import { jobProgressMap } from "../../utils/maps/jobProgressMap";
import HorizontalDashedLine from "../DashedLine/HorizonetalDashedLine";
import RectangleSkeleton from "../SkeletonPageLoader/RectangularSkeleton";
/** While a job of this list is running, refresh the list this often, live event or not. */
const ACTIVE_POLL_INTERVAL_MS = 5000;

export default function JobPopOver({ category }) {
  const [isOpen, setIsOpen] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [activeTab, setActiveTab] = useState("all");

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
      category: category,
      group_by: "status",
      ...(activeTab !== "all" && { status: activeTab }),
    });
  };
  // Polling and the job tracker call the latest fetchJobs (current tab).
  const fetchJobsRef = useRef(fetchJobs);
  fetchJobsRef.current = fetchJobs;

  // A job started, progressed or finished somewhere in the app: refresh.
  useEffect(
    () =>
      subscribeToJobs(({ type }) => {
        if (type === "started" || type === "finished") fetchJobsRef.current();
      }),
    [],
  );

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
      let jobCompleted = false;

      const updatedJobs = prevJobs.map((group) => {
        const hasJob = group.jobs?.some((j) => j.id === payload.job_id);
        if (hasJob) {
          jobFound = true;
          return {
            ...group,
            jobs: group.jobs.map((j) => {
              if (j.id === payload.job_id) {
                // Newer events carry the whole job; older ones only progress.
                const updatedJob = payload.job
                  ? { ...j, ...payload.job }
                  : {
                      ...j,
                      progress_percentage:
                        payload.progress ?? j.progress_percentage,
                      status: payload.status ?? j.status,
                      stage: payload.stage ?? j.stage,
                    };

                if (
                  payload.is_finished ||
                  [
                    JOB_STATUS.COMPLETED,
                    JOB_STATUS.COMPLETED_WITH_ISSUES,
                    JOB_STATUS.FAILED,
                  ].includes(payload.status)
                ) {
                  jobCompleted = true;
                }

                return updatedJob;
              }
              return j;
            }),
          };
        }
        return group;
      });

      if (!jobFound) {
        fetchJobs();
        return prevJobs;
      }

      if (jobCompleted) {
        setTimeout(() => {
          fetchJobs();
        }, 500);
      }

      return updatedJobs;
    });
  });

  const activeJobsCount = useMemo(() => {
    if (!jobs || !Array.isArray(jobs)) return 0;
    const activeStatuses = [JOB_STATUS.PROCESSING, JOB_STATUS.QUEUED];

    return jobs.reduce((total, group) => {
      const activeInGroup = (group.jobs || []).filter((j) =>
        activeStatuses.includes(j.status?.toLowerCase()),
      ).length;
      return total + activeInGroup;
    }, 0);
  }, [jobs]);

  // The live event can be missed (connection dropped, app asleep): while a
  // job is running, ask the API until it finishes.
  useEffect(() => {
    if (activeJobsCount === 0) return undefined;
    const timer = setInterval(
      () => fetchJobsRef.current(),
      ACTIVE_POLL_INTERVAL_MS,
    );
    return () => clearInterval(timer);
  }, [activeJobsCount]);

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
        style={{ height:36}}
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
                className="card shadow-sm white-bg"
                style={{
                  width: "42vw",
                  minWidth: "220px",
                  borderRadius: "0.7rem",
                }}
              >
                <div
                  className="font-size-sm rounded-top-4 border-bottom p-2"
                  style={{ background: "#f9f9f9" }}
                >
                  <div className="d-flex flex-column">
                    <span className="fw-semibold">Jobs</span>
                    <span className="text-muted">
                      {category
                        ? `Background activity for ${category}`
                        : "Background activity"}
                    </span>
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
                      jobs={jobs}
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
                      <div className="d-flex flex-grow-1 align-items-center justify-content-center">
                        <div className="d-flex flex-column align-items-center gap-2 text-center">
                          <img
                            src="./sss-maskot/error.png"
                            alt="sss-timetable-maskot"
                            style={{
                              height: "120px",
                              width: "120px",
                              objectFit: "contain",
                            }}
                          />
                          <span className="fw-semibold font-size-sm">
                            Jobs could not be loaded
                          </span>
                          <p className="text-muted font-size-sm mb-0">
                            Check your connection; the list refreshes on its
                            own while a job is running.
                          </p>
                        </div>
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
                                        jobId={jobItem.id}
                                        title={jobItem.title}
                                        module={jobItem.module}
                                        type={jobItem.type}
                                        processed={jobItem?.successful_items}
                                        issuesCount={jobItem?.failed_items}
                                        summary={jobItem?.summary}
                                        errorMessage={jobItem?.error_message}
                                        status={jobItem?.status}
                                        total={jobItem?.total_items}
                                        failedItems={jobItem?.failed_items}
                                        startedAt={jobItem?.started_at}
                                        queuedAt={jobItem?.started_at}
                                        timestamp={jobItem?.finished_at}
                                        unit={
                                          jobItem?.type === "Import"
                                            ? "records imported"
                                            : jobItem?.unit
                                        }
                                        completedAt={jobItem?.finished_at}
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
                      <div className="d-flex flex-grow-1 align-items-center justify-content-center">
                        <div className="d-flex flex-column align-items-center gap-2 text-center">
                          <img
                            src="./sss-maskot/404.png"
                            alt="sss-timetable-maskot"
                            style={{
                              height: "120px",
                              width: "120px",
                              objectFit: "contain",
                            }}
                          />
                          <span className="fw-semibold font-size-sm">
                            Jobs Not Found
                          </span>
                          <p className="text-muted font-size-sm mb-0">
                            You will need to create a job to see it here. Jobs
                            are created when you perform actions like importing
                            teachers, assigning specialties, or generating
                            timetables.
                          </p>
                        </div>
                      </div>
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

function StatusTabs({ activeTab, onTabChange, jobs }) {
  const getCounts = useMemo(() => {
    if (!jobs || !Array.isArray(jobs)) {
      return {
        all: 0,
        [JOB_STATUS.PROCESSING]: 0,
        [JOB_STATUS.FAILED]: 0,
        [JOB_STATUS.COMPLETED]: 0,
        [JOB_STATUS.COMPLETED_WITH_ISSUES]: 0,
      };
    }

    const allJobs = jobs.flatMap((group) => group.jobs || []);

    return {
      all: allJobs.length,
      [JOB_STATUS.PROCESSING]: allJobs.filter(
        (j) => j.status?.toLowerCase() === JOB_STATUS.PROCESSING,
      ).length,
      [JOB_STATUS.FAILED]: allJobs.filter(
        (j) => j.status?.toLowerCase() === JOB_STATUS.FAILED,
      ).length,
      [JOB_STATUS.COMPLETED]: allJobs.filter(
        (j) => j.status?.toLowerCase() === JOB_STATUS.COMPLETED,
      ).length,
      [JOB_STATUS.COMPLETED_WITH_ISSUES]: allJobs.filter(
        (j) => j.status?.toLowerCase() === JOB_STATUS.COMPLETED_WITH_ISSUES,
      ).length,
    };
  }, [jobs]);

  const tabs = [
    { id: "all", label: "All", count: getCounts.all },
    {
      id: JOB_STATUS.PROCESSING,
      label: JOB_STATUS_LABEL[JOB_STATUS.PROCESSING],
      count: getCounts[JOB_STATUS.PROCESSING],
    },
    {
      id: JOB_STATUS.FAILED,
      label: JOB_STATUS_LABEL[JOB_STATUS.FAILED],
      count: getCounts[JOB_STATUS.FAILED],
    },
    {
      id: JOB_STATUS.COMPLETED,
      label: JOB_STATUS_LABEL[JOB_STATUS.COMPLETED],
      count: getCounts[JOB_STATUS.COMPLETED],
    },
    {
      id: JOB_STATUS.COMPLETED_WITH_ISSUES,
      label: JOB_STATUS_LABEL[JOB_STATUS.COMPLETED_WITH_ISSUES],
      count: getCounts[JOB_STATUS.COMPLETED_WITH_ISSUES],
    },
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
