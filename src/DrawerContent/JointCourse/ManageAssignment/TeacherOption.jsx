import { motion } from "framer-motion";
import {
  AlertCircle,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Circle,
  CircleCheck,
  GraduationCap
} from "lucide-react";
import { useState } from "react";
import { isHighWorkload } from "../../../utils/jointCourse/teacherAssignment";
import TeacherAvatar from "./TeacherAvatar";

function TeacherOption({ teacher, selected, onSelect }) {
  const [showAllQualifications, setShowAllQualifications] = useState(false);

  const qualifications = Array.isArray(teacher.qualification)
    ? teacher.qualification
    : [];

  const disabled = !teacher.eligible || teacher.is_current;
  const heavy = isHighWorkload(teacher.course_count);

  const visibleQualifications = showAllQualifications
    ? qualifications
    : qualifications.slice(0, 2);

  const status = teacher.is_current
    ? { label: "Current teacher", className: "text-primary bg-primary-subtle" }
    : !teacher.eligible
      ? {
          label: teacher.status === "active" ? "Not eligible" : "Deactivated",
          className: "text-secondary bg-light",
        }
      : {
          label: "Eligible",
          className: "text-fern-600 bg-fern-100",
        };

  const courseLabel = `${teacher.course_count} ${
    teacher.course_count === 1 ? "course" : "courses"
  } assigned`;

  const handleSelect = () => {
    if (!disabled) onSelect(teacher.id);
  };

  return (
    <motion.button
      type="button"
      layout
      whileHover={!disabled ? { scale: 1.0008 } : undefined}
      whileTap={!disabled ? { scale: 0.99 } : undefined}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className={`card  w-100 text-start rounded-4 p-3 ${
        selected ? "bg-primary-50 text-primary-500 border-solid border-1 border-primary-500" : "border-1 bg-white"
      } ${disabled ? "teacher-option-disabled" : ""}`}
      onClick={handleSelect}
      disabled={disabled}
      aria-pressed={selected}
    >
      {/* Teacher identity */}
      <div className="d-flex align-items-center gap-2">
        <TeacherAvatar teacher={teacher} />

        <div className="flex-grow-1 min-width-0">
          <div className="d-flex align-items-center justify-content-between gap-2">
            <span className={`fw-semibold ${selected ? "text-primary-500" : "text-iron-900"} text-truncate`}>
              {teacher.name}
            </span>

            {selected ? (
              <CircleCheck size={21} className="text-primary-500 flex-shrink-0" />
            ) : (
              <Circle
                size={21}
                strokeWidth={1.5}
                className="text-iron-400 flex-shrink-0"
              />
            )}
          </div>

          <div className={`d-flex align-items-center gap-1 font-size-xs ${selected ? "text-primary-500" : "text-iron-500"}`}>
            <span className="text-truncate">@{teacher?.username}</span>
          </div>
        </div>
      </div>

      <div className="mt-2">
        <div className="d-flex align-items-center gap-2 mb-2">
          <GraduationCap size={15} className={selected ? "text-primary-500" : "text-iron-500"} />
          <span className={`font-size-xs fw-medium ${selected ? "text-primary-500" : "text-iron-600"}`}>
            Academic qualifications
          </span>
        </div>

        {qualifications.length > 0 ? (
          <>
            <div className="d-flex flex-wrap align-items-center gap-2">
              {visibleQualifications.map((qualification) => (
                <span
                  key={qualification.id}
                  className={`teacher-qualification-chip ${selected ? "text-primary-500 border-primary-300 bg-primary-100" : ""}`}
                  title={qualification.name}
                >
                  {qualification.abbreviation || qualification.name}
                </span>
              ))}

              {!showAllQualifications && qualifications.length > 2 && (
                <span className={`teacher-qualification-more ${selected ? "text-primary-500" : ""}`}>
                  +{qualifications.length - 2} more
                </span>
              )}
            </div>

            {showAllQualifications && (
              <div className="mt-2 d-flex flex-column gap-2">
                {qualifications.map((qualification) => (
                  <div key={qualification.id} className="d-flex flex-column">
                    <span className={`font-size-xs fw-medium ${selected ? "text-primary-500" : "text-iron-700"}`}>
                      {qualification.name}
                    </span>

                    {qualification.pivot?.field_of_study && (
                      <span className={`font-size-xs ${selected ? "text-primary-500" : "text-iron-500"}`}>
                        {qualification.pivot.field_of_study}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}

            {qualifications.length > 2 && (
              <button
                type="button"
                className={`btn btn-link p-0 mt-2 font-size-xs text-decoration-none d-flex align-items-center gap-1 ${
                  selected ? "text-primary-500" : "text-primary"
                }`}
                onClick={(event) => {
                  event.stopPropagation();
                  setShowAllQualifications((previous) => !previous);
                }}
                disabled={disabled}
              >
                {showAllQualifications ? (
                  <>
                    Show less <ChevronUp size={14} />
                  </>
                ) : (
                  <>
                    View all qualifications <ChevronDown size={14} />
                  </>
                )}
              </button>
            )}
          </>
        ) : (
          <span className={`font-size-xs ${selected ? "text-primary-500" : "text-iron-400"}`}>
            No qualifications recorded
          </span>
        )}
      </div>

      <div className={`d-flex align-items-center justify-content-between flex-wrap gap-2 mt-3 pt-3 border-top ${selected ? "border-primary-200" : ""}`}>
        <span
          className={`d-flex align-items-center gap-2 font-size-xs ${selected ? "text-primary-500" : "text-iron-500"}`}
        >
          <BookOpen size={14} />
          {courseLabel}
        </span>

        <span
          className={`px-2 py-1 rounded-pill font-size-xs fw-medium ${status.className}`}
        >
          {status.label}
        </span>
      </div>

      {/* Ineligibility explanation */}
      {!teacher.eligible && teacher.ineligible_reason && (
        <div className="d-flex align-items-start gap-2 mt-3 p-2 rounded-3 bg-light text-iron-600">
          <AlertCircle size={15} className="flex-shrink-0 mt-1" />
          <span className="font-size-xs">{teacher.ineligible_reason}</span>
        </div>
      )}
    </motion.button>
  );
}

export default TeacherOption;
