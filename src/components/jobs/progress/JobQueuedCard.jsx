import { Icon } from "@iconify/react";
import { Clock, UserRoundX } from "lucide-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

function JobQueuedCard({
  jobId,
  title,
  module,
  type,
  icon,
  queuedAt,
  onClick,
  onMore,
}) {
  const formattedQueuedAt = queuedAt
    ? `Queued ${dayjs(queuedAt).fromNow(true)} ago`
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
              flexShrink: 0,
            }}
            className="primary-background-100 rounded-2 d-flex flex-row align-items-center justify-content-center"
          >
            {icon ?? <UserRoundX size={16} color="#0ea7e9" />}
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

      <div className="d-flex flex-row align-items-center justify-content-between gap-1 font-size-sm text-muted">
        <div className="d-flex flex-row align-items-center gap-1">
          <span style={{ lineHeight: 0 }}>
            <Clock size={16} />
          </span>
          <span>Waiting to start</span>
        </div>

        {formattedQueuedAt && <span>{formattedQueuedAt}</span>}
      </div>
    </div>
  );
}

export default JobQueuedCard;
