import { Icon } from "@iconify/react";
import { TriangleAlert, Dot, ArrowRight } from "lucide-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { ModalButton } from "../../DataTableComponents/ActionComponent";
import JobError from "../../../ModalContent/Job/JobError";

dayjs.extend(relativeTime);

function JobIssueCard({
  jobId,
  title,
  module,
  type,
  icon,
  processed = 0,
  issuesCount = 0,
  processedUnit = "imported",
  issuesUnit = "need attention",
  timestamp,
  onViewIssues,
  onClick,
  onMore,
}) {
  const formattedTimestamp = timestamp
    ? `${dayjs(timestamp).fromNow(true)} ago`
    : null;

  const handleViewIssuesClick = (event) => {
    event.stopPropagation();
    onViewIssues?.();
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
              background: "#fff2c5",
              flexShrink: 0,
            }}
            className="primary-background-100 rounded-2 d-flex flex-row align-items-center justify-content-center"
          >
            {icon ?? <TriangleAlert size={16} color="#ff9800" />}
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

        {formattedTimestamp && (
          <span className="text-muted">{formattedTimestamp}</span>
        )}
      </div>

      <div className="d-flex flex-row justify-content-between align-items-center font-size-sm">
        <div className="d-flex flex-row align-items-center fw-semibold gap-2">
          <span>
            {processed.toLocaleString()} {processedUnit}
          </span>
          <span>
            <Dot size={12} />
          </span>
          <span>
            {issuesCount.toLocaleString()} {issuesUnit}
          </span>
        </div>

        <ModalButton
          action={{ modalContent: JobError }}
          rowData={{ jobId }}
          size={"lg"}
          classname={
            "border-none bg-transparent p-0 m-0 d-flex flex-row align-items-center gap-2 border-bottom"
          }
        >
          <span>View Issues</span>
          <span style={{ lineHeight: 0 }}>
            <ArrowRight size={12} />
          </span>
        </ModalButton>
      </div>
    </div>
  );
}

export default JobIssueCard;
