import HorizontalDashedLine from "../../../components/DashedLine/HorizonetalDashedLine";
import { motion } from "framer-motion";
import {
  School,
  GraduationCap,
  Users,
  ShieldCheck,
  ChevronRight,
  Check,
  X,
} from "lucide-react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setAudienceType,
  setTargetingContext,
  resetTargetingContext,
} from "../../../Slices/announcement/announcementSlice";
import { ANNOUNCEMENT_TARGET_MAP } from "../../../utils/maps/announcement/announcementTargetMap";
import { useGetAudienceSummary } from "../../../hooks/Audience/useGetAudienceSummary";
import { NotFoundError } from "../../../components/errors/Error";
import RectangleSkeleton from "../../../components/SkeletonPageLoader/RectangularSkeleton";
import { ModalButton } from "../../../components/DataTableComponents/ActionComponent";
import AnnouncementDiscardWarning from "../../../ModalContent/Announcement/AnnouncementDiscardWarning";
const tokens = {
  blue: "#0EA7E9",
  blueTint: "#EAF7FD",
  ink: "#083049",
  inkSoft: "rgba(8,48,73,0.62)",
  inkFaint: "rgba(8,48,73,0.38)",
  surface: "#F9F9F9",
  border: "rgba(8,48,73,0.09)",
  borderStrong: "rgba(8,48,73,0.16)",
  green: "#1D9A6C",
  greenTint: "#E8F7F1",
};

function Checkbox({ selected }) {
  return (
    <div
      style={{
        width: 18,
        height: 18,
        borderRadius: 5,
        border: `1.5px solid ${selected ? tokens.blue : tokens.borderStrong}`,
        background: selected ? tokens.blue : "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        transition: "all 120ms ease",
      }}
    >
      {selected && <Check size={12} color="#fff" strokeWidth={3} />}
    </div>
  );
}

function AudienceCard({
  cardKey,
  icon: IconComp,
  title,
  description,
  count,
  countLabel,
  footer,
  selected,
  onSelect,
}) {
  const [hovered, setHovered] = useState(false);
  const dispatch = useDispatch();

  const handleConfigureClick = (e) => {
    e.stopPropagation();
    dispatch(
      setTargetingContext({
        targetContext: cardKey,
      }),
    );
  };

  return (
    <motion.div
      role="checkbox"
      aria-checked={selected}
      tabIndex={0}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onSelect}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onSelect()}
      style={{
        fontFamily: "'Poppins', sans-serif",
        background: selected ? tokens.blueTint : "#fff",
        border: `1.5px solid ${
          selected ? tokens.blue : hovered ? tokens.borderStrong : tokens.border
        }`,
        borderRadius: 16,
        padding: "18px 20px",
        cursor: "pointer",
        boxShadow:
          hovered && !selected ? "0 4px 16px rgba(8,48,73,0.07)" : "none",
        transition:
          "background 140ms ease, border-color 140ms ease, box-shadow 140ms ease",
        userSelect: "none",
      }}
      whileHover={{ scale: 1.005 }}
      whileTap={{ scale: 0.995 }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 14,
          marginBottom: 10,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            minWidth: 0,
          }}
        >
          <Checkbox selected={selected} />
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 10,
              background: selected ? "#fff" : tokens.surface,
              border: selected ? "none" : `1px solid ${tokens.border}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <IconComp size={17} color={tokens.blue} strokeWidth={2} />
          </div>
          <div style={{ fontSize: 15, fontWeight: 700, color: tokens.ink }}>
            {title}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "5px 11px",
            borderRadius: 999,
            background: selected ? "#fff" : tokens.surface,
            flexShrink: 0,
          }}
        >
          <Users size={12} color={tokens.inkSoft} strokeWidth={2} />
          <span style={{ fontSize: 12, fontWeight: 700, color: tokens.ink }}>
            {count.toLocaleString()}
          </span>
          <span
            style={{ fontSize: 11.5, color: tokens.inkFaint, fontWeight: 500 }}
          >
            {countLabel}
          </span>
        </div>
      </div>

      <div
        style={{
          fontSize: 12.5,
          color: tokens.inkSoft,
          lineHeight: 1.55,
          paddingLeft: 62,
          marginBottom: footer ? 12 : 0,
        }}
      >
        {description}
      </div>

      {footer && (
        <div
          style={{
            paddingLeft: 62,
            paddingTop: 12,
            borderTop: `1px solid ${
              selected ? "rgba(14,167,233,0.18)" : tokens.border
            }`,
          }}
        >
          {footer.type === "info" ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontSize: 12,
                color: tokens.green,
                fontWeight: 600,
              }}
            >
              <Check size={13} strokeWidth={3} />
              {footer.label}
            </div>
          ) : selected ? (
            <div
              role="button"
              tabIndex={0}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
                fontSize: 12.5,
                color: tokens.blue,
                fontWeight: 600,
                cursor: "pointer",
              }}
              onClick={handleConfigureClick}
              onKeyDown={(e) =>
                (e.key === "Enter" || e.key === " ") && handleConfigureClick(e)
              }
            >
              <span>{footer.label}</span>
              <ChevronRight size={14} strokeWidth={2.5} />
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                fontSize: 12.5,
                fontStyle: "italic",
                color: tokens.inkFaint,
              }}
            >
              <span>Select Audience Before Configuring Target</span>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}

function AnnouncementAudience({
  handleClose,
  currentStep,
  nextStep,
  previousStep,
  fullStep,
}) {
  const dispatch = useDispatch();
  const moduleState = useSelector(
    (state) => state.announcement.createAnnouncement.audience,
  );
  const isDirty = useSelector((state) => state.announcement.createAnnouncement.isDirty)
  const [error, setError] = useState(null);
  const {
    data: summary,
    isLoading: isSummaryLoading,
    error: summaryError,
  } = useGetAudienceSummary();
  const TargetComponent =
    ANNOUNCEMENT_TARGET_MAP[moduleState?.targetingContext]?.component;

  const audiences = [
    {
      key: "school_wide",
      icon: School,
      title: "School-wide",
      description:
        "Everyone in this school — students, teachers, and administrators — will be able to see this announcement.",
      count: 2480,
      countLabel: "recipients",
      footer: { type: "info", label: "Reaches everyone — no targeting needed" },
    },
    {
      key: "students",
      icon: GraduationCap,
      title: "Students",
      description:
        "Reach students across your academic structure. Target by department, specialty, level, or individual students.",
      count: 1842,
      countLabel: "students",
      footer: { type: "action", label: "Configure targeting" },
    },
    {
      key: "teachers",
      icon: Users,
      title: "Teachers",
      description:
        "Share information with teaching staff. Target by department or select individual teachers.",
      count: 126,
      countLabel: "teachers",
      footer: { type: "action", label: "Configure targeting" },
    },
    {
      key: "schoolAdmins",
      icon: ShieldCheck,
      title: "Administrators",
      description:
        "Reach school administrators responsible for managing and coordinating school operations.",
      count: 18,
      countLabel: "administrators",
      footer: { type: "action", label: "Select administrators" },
    },
  ];

  const isTargetingActive =
    audiences.some((a) => a.key !== "school_wide") &&
    Boolean(moduleState?.targetingContext);

  const handleNext = () => {
    if (moduleState.types.length == 0) {
      setError({
        title: "Student Audience Required",
        message:
          "Student Audience Required, to create announcement you must select atleast one group of people to create announcement",
      });
      return;
    }
    if (!moduleState.types.includes("school_wide")) {
      if (
        moduleState.targeting.students.individualIds.length == 0 &&
        Object.values(moduleState.targeting.students.criteria).every(
          (g) => g.length === 0,
        ) &&
        moduleState.types.includes("students")
      ) {
        setError({
          title: "Audience Target Required",
          message:
            "Student Audience Target Not Configured Configure Student Target Audience Before Continueing",
        });
        return;
      }
      if (
        moduleState.targeting.teachers.individualIds.length == 0 &&
        Object.values(moduleState.targeting.teachers.criteria).every(
          (g) => g.length === 0,
        ) &&
        moduleState.types.includes("teachers")
      ) {
        setError({
          title: "Teacher Audience Target Required",
          message:
            "Teacher Audience Target Not Configured Configure Teacher Target Audience Before Continueing",
        });
        return;
      }
      if (
        moduleState.targeting.administrators.individualIds.length == 0 &&
        moduleState.types.includes("schoolAdmins")
      ) {
        setError({
          title: "Administrator Target Required",
          message:
            "Administrator Audience Target Not Configured Configure Administrator Target Audience Before Continueing",
        });
        return;
      }
    }
    nextStep();
  };
  return (
    <>
      {isTargetingActive ? (
        <>
          <div className="d-flex flex-row align-items-center justify-content-between border-bottom p-2 font-size-sm">
            <span className="fw-medium">Create Announcement</span>
            {isDirty ? (
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
          <div className="d-flex flex-column px-2 pt-2 font-size-sm">
            <span className="fw-medium">Audience Targeting</span>
            <p className="text-iron-400">
              Choose the group of people this announcement should be visible to.
            </p>
          </div>
          <div
            className="drawer-content"
            style={{ background: "#f9f9f9", paddingBottom: "10rem" }}
          >
            {TargetComponent && <TargetComponent />}
          </div>
          <div className="drawer-footer font-size-sm ">
            <div className="d-flex flex-column w-100">
              <HorizontalDashedLine
                dashed={false}
                color="#ccc"
                thickness={0.5}
              />
              <div className="d-flex flex-row align-items-center justify-content-between p-3">
                <button
                  className="border-none bg-none cursor-pointer"
                  onClick={() => {
                    dispatch(resetTargetingContext());
                  }}
                >
                  <div className="d-flex flex-row align-items-center gap-1">
                    <span>Back To Audience</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="d-flex flex-row align-items-center justify-content-between border-bottom p-2 font-size-sm">
            <span className="fw-medium">Create Announcement</span>
            {isDirty ? (
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
          {error && (
            <div className="p-2">
              <div className="bg-red-50 text-red-800 font-size-sm rounded-2 px-2 py-1">
                <div className="d-flex flex-row align-items-center justify-content-between">
                  <span className="fw-semibold">{error?.title}</span>
                  <button
                    className="bg-none border-none rounded-circle"
                    aria-label="Close drawer"
                    onClick={() => {
                      setError(null);
                    }}
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
                </div>
                <ul>
                  <li>
                    <p>{error?.message}</p>
                  </li>
                </ul>
              </div>
            </div>
          )}
          <div className="d-flex flex-row align-items-center justify-content-between font-size-sm px-2 pt-2">
            <div className="d-flex flex-column">
              <span className="fw-medium">Announcement Audience</span>
              <p className="text-iron-400">
                Choose the group of people this announcement should be visible
                to.
              </p>
            </div>
            <div className="d-flex flex-row align-items-center gap-1 fw-semibold text-capitalize">
              <span>step</span>
              <span>{currentStep}</span>
              <span>of</span>
              <span>{fullStep}</span>
              <span>Completed</span>
            </div>
          </div>

          <div className="drawer-content font-size-sm">
            <div
              style={{
                background: tokens.surface,
                display: "flex",
                justifyContent: "center",
                paddingBottom: "24px",
              }}
              className="px-2 pt-3"
            >
              <div
                role="group"
                aria-label="Select Target Audiences"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  width: "100%",
                }}
              >
                {isSummaryLoading ? (
                  [...Array(4)].map((_, index) => (
                    <RectangleSkeleton
                      height="16dvh"
                      width="100%"
                      key={index}
                    />
                  ))
                ) : summaryError ? (
                  <NotFoundError
                    title={summaryError?.response?.data?.errors?.title}
                    description={
                      summaryError?.response?.data?.errors?.description
                    }
                  ></NotFoundError>
                ) : (
                  audiences.map((a) => (
                    <AudienceCard
                      key={a.key}
                      cardKey={a.key}
                      icon={a.icon}
                      title={a.title}
                      description={a.description}
                      count={summary?.data[a.key] ?? a?.count}
                      countLabel={a.countLabel}
                      footer={a.footer}
                      selected={moduleState?.types?.includes(a.key)}
                      onSelect={() =>
                        dispatch(
                          setAudienceType({
                            audienceType: a.key,
                          }),
                        )
                      }
                    />
                  ))
                )}
              </div>
            </div>
          </div>
          <div className="drawer-footer font-size-sm">
            <div className="d-flex flex-column w-100">
              <HorizontalDashedLine
                dashed={false}
                color="#ccc"
                thickness={0.5}
              />
              <div className="d-flex flex-row align-items-center justify-content-between p-2">
                <button
                  className="border-none bg-none cursor-pointer"
                  onClick={() => previousStep()}
                >
                  <div className="d-flex flex-row align-items-center gap-1">
                    <span>Back To Content</span>
                  </div>
                </button>
                <button
                  className="border-none rounded-3 primary-background text-white font-size-sm px-3 py-2 cursor-pointer"
                  onClick={() => handleNext()}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default AnnouncementAudience;
