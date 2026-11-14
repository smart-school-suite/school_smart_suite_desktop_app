import { Mail, Phone } from "lucide-react";
import "../../styles/invigilator.css";
import TeacherAvatar from "./TeacherAvatar";

const ROLE_LABEL = {
  teacher: "Teacher",
  school_admin: "School admin",
};

function ContactRow({ icon: IconComponent, value, href, empty }) {
  return (
    <div className="invigilator-card__contact">
      <IconComponent size={14} className="flex-shrink-0 text-iron-500" />
      {value ? (
        <a href={href} className="text-truncate" title={value}>
          {value}
        </a>
      ) : (
        <span className="text-iron-400">{empty}</span>
      )}
    </div>
  );
}

/**
 * Fixed-size summary of an assigned invigilator: who they are, their role and
 * how to reach them. Put actions in `children`; they sit at the bottom so
 * footers line up across a grid.
 */
export default function InvigilatorCard({ invigilator, children }) {
  const role =
    ROLE_LABEL[invigilator?.actorable_type] ??
    invigilator?.actorable_type?.replaceAll("_", " ");
  return (
    <div className="teacher-card invigilator-card">
      <div className="d-flex flex-row align-items-center gap-2">
        <TeacherAvatar teacher={invigilator} />
        <div className="d-flex flex-column flex-grow-1" style={{ minWidth: 0 }}>
          <span className="fw-semibold text-truncate" title={invigilator?.name}>
            {invigilator?.name ?? "Unnamed invigilator"}
          </span>
          {invigilator?.username && (
            <span className="text-iron-500 font-size-xs text-truncate">
              @{invigilator.username}
            </span>
          )}
        </div>
        {role && (
          <span
            className={`teacher-card__chip flex-shrink-0 text-capitalize ${
              invigilator?.actorable_type === "school_admin"
                ? "teacher-card__chip--neutral"
                : "teacher-card__chip--primary"
            }`}
          >
            {role}
          </span>
        )}
      </div>

      <div className="teacher-card__divider" />

      <div className="d-flex flex-column gap-2">
        <ContactRow
          icon={Mail}
          value={invigilator?.email}
          href={`mailto:${invigilator?.email}`}
          empty="No email recorded"
        />
        <ContactRow
          icon={Phone}
          value={invigilator?.phone}
          href={`tel:${invigilator?.phone}`}
          empty="No phone recorded"
        />
      </div>

      {children && <div className="teacher-card__footer">{children}</div>}
    </div>
  );
}
