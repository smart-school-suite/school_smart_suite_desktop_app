import { Icon } from "@iconify/react";
import { CopyCheck } from "lucide-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

function JobCompletedCard({
  jobId,
  title,
  module,
  type,
  icon,
  processed = 0,
  unit = "records exported",
  completedAt,
  onClick,
  onMore,
}) {
  const formattedCompletedAt = completedAt
    ? `${dayjs(completedAt).fromNow(true)} ago`
    : null;

  return (
    <div
      className="d-flex flex-column gap-2"
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={(event) => {
        if (!onClick) return;

        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onClick();
        }
      }}
    >
      <div className="d-flex flex-row justify-content-between font-size-sm align-items-center">
        <div className="d-flex flex-row gap-2 align-items-center">
          <div
            style={{
              width: "2rem",
              height: "2rem",
              backgroundColor: "#e3f5e3",
              flexShrink: 0,
            }}
            className="primary-background-100 rounded-2 d-flex flex-row align-items-center justify-content-center"
          >
            {icon ?? <CopyCheck size={16} color="#5cb85c" />}
          </div>

          <div className="d-flex flex-column">
            <span className="fw-semibold">{title}</span>

            <div className="d-flex flex-row align-items-center gap-1 text-muted">
              <small>{module}</small>

              <span>
                <Icon icon="icon-park-outline:dot" width={8} height={8} />
              </span>

              <small>{type}</small>
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex flex-row justify-content-between align-items-center font-size-sm text-muted">
        <span>
          {processed.toLocaleString()} {unit}
        </span>

        {formattedCompletedAt && <span>{formattedCompletedAt}</span>}
      </div>
    </div>
  );
}

export default JobCompletedCard;
