import { Icon } from "@iconify/react";
import { CircleX } from "lucide-react";
import TeacherAvatar from "../../components/Card/TeacherAvatar";
import { useEscapeKey } from "../../hooks/common/useEscapeKey";
import { isLastElement } from "../../utils/functions";

/**
 * Full teacher profile opened from TeacherCard's "View details".
 * Uses the teacher object already loaded for the card, so it opens instantly.
 * rowData: the teacher (qualifications with pivot, levels, assignment counts).
 */
function TeacherQuickView({ handleClose, rowData: teacher }) {
  // Close only this dialog on Escape, not a drawer it was opened from.
  useEscapeKey(handleClose);

  const qualifications = teacher?.qualifications ?? [];
  const levels = teacher?.levels ?? [];
  const stats = [
    { icon: "ion:book-outline", label: "Courses", value: teacher?.num_assigned_courses },
    {
      icon: "material-symbols:grid-on-outline",
      label: "Specialties",
      value: teacher?.num_assigned_specialties,
    },
  ].filter((stat) => stat.value !== undefined && stat.value !== null);

  return (
    <div className="w-100 font-size-sm">
      <div
        className="border-bottom rounded-top-4 p-2 d-flex flex-row align-items-center justify-content-between"
        style={{ background: "#f9f9f9" }}
      >
        <span className="fw-semibold">Teacher details</span>
        <button
          type="button"
          onClick={handleClose}
          className="border-none bg-transparent p-0"
          style={{ width: "2rem", height: "2rem", display: "grid", placeItems: "center" }}
          aria-label="Close"
        >
          <CircleX size={16} />
        </button>
      </div>

      <div
        className="d-flex flex-column gap-3 p-3 scroll-bar-sm over-flow-y-auto"
        style={{ maxHeight: "min(70vh, 36rem)" }}
      >
        <div className="d-flex flex-row align-items-center gap-2">
          <TeacherAvatar teacher={teacher} size="3rem" />
          <div className="d-flex flex-column flex-grow-1" style={{ minWidth: 0 }}>
            <span className="fw-semibold text-truncate" style={{ fontSize: "1rem" }}>
              {teacher?.name ?? "Unnamed teacher"}
            </span>
            {teacher?.username && (
              <span className="text-iron-500 font-size-xs">@{teacher.username}</span>
            )}
          </div>
        </div>

        {stats.length > 0 && (
          <div className="d-flex flex-row gap-2">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="d-flex flex-row align-items-center gap-2 rounded-3 bg-iron-50 px-3 py-2 flex-grow-1"
              >
                <Icon icon={stat.icon} width={16} height={16} className="text-iron-500" />
                <span className="fw-semibold">{stat.value}</span>
                <span className="text-iron-500">{stat.label} assigned</span>
              </div>
            ))}
          </div>
        )}

        <div className="d-flex flex-column gap-2">
          <span className="teacher-card__label">
            Qualifications{qualifications.length > 0 && ` · ${qualifications.length}`}
          </span>
          {qualifications.length > 0 ? (
            <div className="d-flex flex-column rounded-3 border">
              {qualifications.map((item, index) => {
                const details = [item?.pivot?.institution, item?.pivot?.year].filter(Boolean);
                return (
                  <div
                    key={item?.pivot?.id ?? item?.id ?? index}
                    className={`d-flex flex-row align-items-start gap-2 p-2 ${
                      isLastElement(index, qualifications) ? "" : "border-bottom"
                    }`}
                  >
                    <span className="teacher-card__chip teacher-card__chip--primary teacher-card__chip--full flex-shrink-0">
                      {item?.abbreviation || item?.name}
                    </span>
                    <div className="d-flex flex-column" style={{ minWidth: 0 }}>
                      <span className="fw-medium">
                        {item?.pivot?.field_of_study || item?.name || "Field of study not recorded"}
                      </span>
                      <span className="font-size-xs text-iron-500">
                        {[item?.abbreviation && item?.name, ...details]
                          .filter(Boolean)
                          .join(" · ") || "No institution recorded"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <span className="font-size-xs text-iron-400">No qualifications recorded</span>
          )}
        </div>

        <div className="d-flex flex-column gap-2">
          <span className="teacher-card__label">
            Teaching levels{levels.length > 0 && ` · ${levels.length}`}
          </span>
          {levels.length > 0 ? (
            <div className="d-flex flex-row flex-wrap gap-1">
              {levels.map((level) => (
                <span
                  key={level?.id ?? level?.name}
                  className="teacher-card__chip teacher-card__chip--neutral teacher-card__chip--full"
                >
                  {level?.name}
                </span>
              ))}
            </div>
          ) : (
            <span className="font-size-xs text-iron-400">No teaching levels set</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default TeacherQuickView;
