import HorizontalDashedLine from "../../../components/DashedLine/HorizonetalDashedLine";
import { motion } from "framer-motion";
import {
  School,
  GraduationCap,
  Users,
  ShieldCheck,
  ChevronRight,
  Check,
} from "lucide-react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setAudienceType,
  setTargetingContext,
  resetTargetingContext,
} from "../../../Slices/announcement/announcementSlice";
import { ANNOUNCEMENT_TARGET_MAP } from "../../../utils/maps/announcement/announcementTargetMap";

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
      })
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
        transition: "background 140ms ease, border-color 140ms ease, box-shadow 140ms ease",
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
  drawerData,
}) {
  const dispatch = useDispatch();
  const moduleState = useSelector(
    (state) => state.announcement.createAnnouncement.audience,
  );

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

  return (
    <>
      {isTargetingActive ? (
        <>
          <div className="d-flex flex-column px-2 pt-2 font-size-sm">
            <span className="fw-medium">Audience Targeting</span>
            <p className="text-iron-400">
              Choose the group of people this announcement should be visible to.
            </p>
          </div>
          <div className="drawer-content px-2 pt-3">
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
          <div className="d-flex flex-row align-items-center justify-content-between font-size-sm px-2 pt-2">
            <div className="d-flex flex-column">
              <span className="fw-medium">Announcement Audience</span>
              <p className="text-iron-400">
                Choose the group of people this announcement should be visible to.
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
                {audiences.map((a) => (
                  <AudienceCard
                    key={a.key}
                    cardKey={a.key}
                    icon={a.icon}
                    title={a.title}
                    description={a.description}
                    count={a.count}
                    countLabel={a.countLabel}
                    footer={a.footer}
                    selected={moduleState?.types?.includes(a.key)}
                    onSelect={() =>
                      dispatch(
                        setAudienceType({
                          audienceType: a.key,
                        })
                      )
                    }
                  />
                ))}
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
                  onClick={() => nextStep()}
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