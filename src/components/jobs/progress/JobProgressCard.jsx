import { ProgressBar } from "react-bootstrap";
import { Icon } from "@iconify/react";
import { CloudUpload, MoreHorizontal } from "lucide-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

function JobProgressCard({
  jobId,
  title,
  module,
  type,
  icon,
  progress = 0,
  processed = 0,
  total = 0,
  unit = "records",
  startedAt,
  onClick,
  onMore,
}) {
  const safeProgress = Math.min(Math.max(progress, 0), 100);

  const formattedStartedAt = startedAt
    ? `Started ${dayjs(startedAt).fromNow(true)} ago`
    : null;

  const handleMoreClick = (event) => {
    event.stopPropagation();
    onMore?.();
  };

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
              flexShrink: 0,
            }}
            className="primary-background-100 rounded-2 d-flex align-items-center justify-content-center"
          >
            {icon ?? <CloudUpload size={16} color="#0ea7e9" />}
          </div>

          <div className="d-flex flex-column">
            <span className="fw-semibold">{title}</span>

            <div className="d-flex flex-row align-items-center gap-1 text-muted">
              <small>{module}</small>

              <Icon icon="icon-park-outline:dot" width={8} height={8} />

              <small>{type}</small>
            </div>
          </div>
        </div>

        <span className="fw-semibold">{safeProgress}%</span>
      </div>

      <div className="d-flex flex-column gap-2">
        <ProgressBar
          now={safeProgress}
          className="custom-progress-track"
          style={{ height: "2px" }}
        />

        <div className="d-flex flex-row justify-content-between align-items-center font-size-sm">
          <div className="d-flex flex-row align-items-center gap-1">
            <span>
              {processed.toLocaleString()} of {total.toLocaleString()}
            </span>

            <span className="text-muted">{unit}</span>
          </div>

          {formattedStartedAt && (
            <span className="text-muted">{formattedStartedAt}</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default JobProgressCard;
