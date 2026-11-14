import { ArrowDown, ChevronDown, ClipboardList, UserCheck, UserPlus } from "lucide-react";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InvigilatorCard from "../../components/Card/InvigilatorCard";
import { ModalButton } from "../../components/DataTableComponents/ActionComponent";
import DrawerTrigger from "../../components/drawer/DrawerTrigger";
import EmptyState, { EmptyStateButton } from "../../components/errors/EmptyState";
import SearchInput from "../../components/input/search";
import JobPopOver from "../../components/Popover/JobPopover";
import ExamNavigator, { ExamStatusTag } from "../../components/SideBars/ExamNavigator";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import AssignInvigilator from "../../DrawerContent/Invigilator/AssignInvigilator";
import { useDebounce } from "../../hooks/common/useDebounce";
import { useGetAssignedInvigilators } from "../../hooks/invigilator/useGetAssignedInvigilators";
import { useRemoveInvigilator } from "../../hooks/invigilator/useRemoveInvigilator";
import { setSelectedExam } from "../../Slices/exam/examInvigilatorSlice";
import "../../styles/invigilator.css";
import {
  formatExamDate,
  groupInvigilators,
} from "../../utils/invigilator/invigilatorFilters";
import { isEmptyListError } from "../../utils/teacher/teacherFilters";

const MASCOT_HEIGHT = "7rem";

function AssignButton({ exam, variant = "header" }) {
  return (
    <DrawerTrigger
      title="Assign Invigilator"
      placement="right"
      drawerChildren={AssignInvigilator}
      drawerData={{ selectedExam: exam }}
      showHeader={false}
    >
      {variant === "empty" ? (
        <EmptyStateButton icon={UserPlus}>Assign Invigilators</EmptyStateButton>
      ) : (
        <button className="border-none border rounded-3 font-size-sm p-2 primary-background text-white d-flex flex-row align-items-center gap-2 text-nowrap">
          <UserPlus size={16} />
          <span>Assign Invigilators</span>
        </button>
      )}
    </DrawerTrigger>
  );
}

function ExamSummary({ exam, groups, isLoading }) {
  const start = formatExamDate(exam?.start_date);
  const end = formatExamDate(exam?.end_date);
  const countOf = (key) => groups.find((group) => group.key === key)?.total ?? 0;
  const teachers = countOf("teachers");
  const admins = countOf("school_admins");
  const stats = [
    { label: "Invigilators", value: teachers + admins },
    { label: "Teachers", value: teachers },
    { label: "School admins", value: admins },
  ];
  return (
    <div className="invigilator-exam flex-shrink-0">
      <div className="d-flex flex-row align-items-center gap-2" style={{ minWidth: 0 }}>
        <div className="invigilator-exam__icon">
          <ClipboardList size={18} />
        </div>
        <div className="d-flex flex-column" style={{ minWidth: 0 }}>
          <div className="d-flex flex-row align-items-center gap-2" style={{ minWidth: 0 }}>
            <span className="fw-semibold text-truncate text-capitalize">
              {exam?.specialty_name ?? "Exam"}
            </span>
            <ExamStatusTag status={exam?.status} />
          </div>
          <span className="font-size-xs text-iron-500 text-truncate text-capitalize">
            {[
              exam?.exam_name,
              exam?.level_name,
              exam?.semester_name,
              exam?.school_year,
              start && end ? `${start} – ${end}` : null,
            ]
              .filter(Boolean)
              .join(" · ")}
          </span>
        </div>
      </div>
      <div className="invigilator-exam__stats">
        {stats.map((stat) => (
          <div key={stat.label} className="invigilator-exam__stat">
            {isLoading ? (
              <RectangleSkeleton width="1.5rem" height="1rem" />
            ) : (
              <span className="invigilator-exam__stat-value">{stat.value}</span>
            )}
            <span className="font-size-xs text-iron-500 text-nowrap">{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ExamInvigilator() {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);
  const selectedExam = useSelector((state) => state.examInvigilator.selectedExam);
  const examId = selectedExam?.id;
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 250);

  const { data: invigilators, isLoading, error } = useGetAssignedInvigilators(examId);
  const {
    mutate: removeInvigilator,
    isPending: isRemoving,
    variables: removing,
  } = useRemoveInvigilator(examId);

  const allGroups = useMemo(() => groupInvigilators(invigilators?.data), [invigilators]);
  const visibleGroups = useMemo(
    () => groupInvigilators(invigilators?.data, debouncedSearch),
    [invigilators, debouncedSearch],
  );
  const total = allGroups.reduce((sum, group) => sum + group.total, 0);
  const visibleTotal = visibleGroups.reduce((sum, group) => sum + group.items.length, 0);
  const isEmpty = error ? isEmptyListError(error) : total === 0;

  const handleSelectExam = (exam) => {
    dispatch(setSelectedExam({ exam }));
    setSearch("");
  };

  const handleRemove = (invigilatorId) =>
    removeInvigilator({ exam_id: examId, invigilator_ids: [invigilatorId] });

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="d-flex flex-column gap-2">
          <RectangleSkeleton width="15%" height="1rem" />
          <div className="teacher-card-grid">
            {[...Array(6)].map((_, index) => (
              <RectangleSkeleton key={index} height="10rem" />
            ))}
          </div>
        </div>
      );
    }

    if (error && !isEmptyListError(error)) {
      return (
        <EmptyState
          mascot="error"
          height="100%"
          mascotHeight={MASCOT_HEIGHT}
          title={error?.response?.data?.errors?.title || "Unable to load invigilators"}
          description={
            error?.response?.data?.errors?.description ||
            "Something went wrong while loading the invigilators for this exam."
          }
        />
      );
    }

    if (isEmpty) {
      return (
        <EmptyState
          mascot="sad"
          height="100%"
          mascotHeight={MASCOT_HEIGHT}
          title="No invigilators assigned yet"
          description="Assign teachers or school admins to supervise this exam. They can then be scheduled onto exam sessions."
          actions={<AssignButton exam={selectedExam} variant="empty" />}
        />
      );
    }

    if (visibleTotal === 0) {
      return (
        <EmptyState
          mascot="notFound"
          height="100%"
          mascotHeight={MASCOT_HEIGHT}
          title="No matching invigilators"
          description={`Nobody assigned to this exam matches "${debouncedSearch}". Try a name, username, email or phone number.`}
          actions={
            <EmptyStateButton variant="secondary" onClick={() => setSearch("")}>
              Clear search
            </EmptyStateButton>
          }
        />
      );
    }

    return (
      <div className="d-flex flex-column gap-3">
        {visibleGroups
          .filter((group) => group.items.length > 0)
          .map((group) => (
            <section key={group.key} className="d-flex flex-column gap-2">
              <div className="d-flex flex-row align-items-baseline gap-2">
                <span className="font-size-sm fw-semibold text-capitalize">{group.label}</span>
                <span className="font-size-xs text-iron-500">
                  {debouncedSearch
                    ? `${group.items.length} of ${group.total}`
                    : `${group.total} assigned`}
                </span>
              </div>
              <div className="teacher-card-grid">
                {group.items.map((invigilator) => {
                  const pending =
                    isRemoving && removing?.invigilator_ids?.includes(invigilator?.id);
                  return (
                    <InvigilatorCard key={invigilator?.id} invigilator={invigilator}>
                      <button
                        type="button"
                        className="teacher-card__details-btn invigilator-card__remove"
                        disabled={isRemoving}
                        onClick={() => handleRemove(invigilator?.id)}
                      >
                        {pending ? <SingleSpinner /> : "Remove from exam"}
                      </button>
                    </InvigilatorCard>
                  );
                })}
              </div>
            </section>
          ))}
      </div>
    );
  };

  return (
    <main className="main-container gap-2">
      <div className="page-head page-head--bar">
        <div className="d-flex align-items-center gap-2">
          <div
            className={`${
              darkMode ? "dark-mode-active" : "light-mode-active"
            } d-flex justify-content-center align-items-center`}
            style={{ width: "2rem", height: "2rem", borderRadius: "0.5rem" }}
          >
            <UserCheck size={16} />
          </div>
          <span className="fw-semibold font-size-sm">Manage Exam Invigilators</span>
        </div>
        <div className="d-flex flex-row align-item-center gap-2">
          <JobPopOver />
          <ModalButton
            classname={
              "border-none border rounded-3 font-size-sm p-2 d-flex flex-row align-items-center gap-2 white-bg"
            }
          >
            <span style={{ lineHeight: "16px" }}>Actions</span>
            <ChevronDown size={16} />
          </ModalButton>
        </div>
      </div>

      {/* min-height: 0 lets the row shrink to the space under the header so
          the sidebar and the card list scroll on their own */}
      <div className="d-flex flex-row gap-2 flex-grow-1 w-100" style={{ minHeight: 0 }}>
        <ExamNavigator
          title="Exam invigilators"
          description="Select an exam to see and assign who supervises it."
          selectedExam={selectedExam}
          onSelect={handleSelectExam}
        />

        <div className="d-flex flex-column gap-2 h-100" style={{ width: "75%", minHeight: 0 }}>
          {!selectedExam ? (
            <EmptyState
              mascot="empty"
              height="100%"
              mascotHeight={MASCOT_HEIGHT}
              title="Ready to manage exam invigilators?"
              description="Select an exam on the left to see who supervises it and assign teachers or school admins."
            />
          ) : (
            <>
              <ExamSummary exam={selectedExam} groups={allGroups} isLoading={isLoading} />
              <div className="d-flex flex-row align-items-center justify-content-between gap-2 flex-shrink-0">
                <div className="w-50">
                  <SearchInput
                    placeholder="Search by name, username, email or phone"
                    hotkey="Ctrl+K"
                    value={search}
                    onChange={(value) => setSearch(value ?? "")}
                    disabled={isLoading || isEmpty}
                  />
                </div>
                <div className="d-flex flex-row align-items-center gap-2">
                  {!isLoading && total > 0 && (
                    <span className="font-size-xs text-iron-500 text-nowrap">
                      {debouncedSearch
                        ? `${visibleTotal} of ${total} invigilators`
                        : `${total} invigilator${total === 1 ? "" : "s"}`}
                    </span>
                  )}
                  <button className="font-size-sm bg-white border-none border rounded-3 p-2 d-flex flex-row align-items-center gap-2">
                    <span>Export</span>
                    <ArrowDown size={16} />
                  </button>
                  <AssignButton exam={selectedExam} />
                </div>
              </div>
              {/* the only scrolling region; fills the space under the toolbar */}
              <div
                className="flex-grow-1 scroll-bar-sm over-flow-y-auto over-flow-x-hidden pe-1 pb-2"
                style={{ minHeight: 0 }}
              >
                {renderContent()}
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}

export default ExamInvigilator;
