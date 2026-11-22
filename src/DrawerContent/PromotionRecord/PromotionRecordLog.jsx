import { Badge, BADGE_CONTEXT } from "@/components/Renderer/badges";
import { ArrowRight, CircleAlert, CircleCheck, CircleX } from "lucide-react";
import HorizontalDashedLine from "../../components/DashedLine/HorizonetalDashedLine";
import EmptyState from "../../components/errors/EmptyState";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { useGetPromotionRecordLogs } from "../../hooks/promotionRecord/useGetPromotionLog";
import { isEmptyListError } from "../../utils/teacher/teacherFilters";


const RESULT = {
  failed: { icon: CircleX, className: "text-red-500", label: "Not met" },
  needs_review: { icon: CircleAlert, className: "text-old-lace-600", label: "Needs review" },
  passed: { icon: CircleCheck, className: "text-fern-600", label: "Met" },
};

const COUNTS = [
  { key: "failed", label: "Not met" },
  { key: "needs_review", label: "Need review" },
  { key: "passed", label: "Met" },
];

const levelLabel = (name, level) => [name, level].filter(Boolean).join(" · ");

function RecordHeader({ record }) {
  return (
    <div className="d-flex flex-column gap-2 font-size-sm">
      <div className="d-flex flex-row align-items-center justify-content-between gap-2">
        <div className="d-flex flex-row align-items-center gap-2" style={{ minWidth: 0 }}>
          <img
            src={record?.s_profile_picture || "/images/user.png"}
            alt=""
            className="rounded-circle object-fit-cover flex-shrink-0"
            style={{ width: "2.5rem", height: "2.5rem" }}
            onError={(e) => { e.currentTarget.src = "/images/user.png"; }}
          />
          <div className="d-flex flex-column" style={{ minWidth: 0 }}>
            <span className="fw-semibold text-truncate">{record?.s_full_name ?? "Student"}</span>
            <span className="text-iron-400 fw-light text-truncate">
              {record?.s_username ? `@${record.s_username}` : ""}{record?.academic_year ? ` · ${record.academic_year}` : ""}
            </span>
          </div>
        </div>
        {record?.outcome && <Badge status={record.outcome} context={BADGE_CONTEXT.PROMOTION_OUTCOME} />}
      </div>
      <div className="d-flex flex-row align-items-center gap-2 text-iron-500 font-size-xs">
        <span className="text-truncate">{levelLabel(record?.from_spec_name, record?.from_level_name) || "-"}</span>
        <ArrowRight size={14} className="flex-shrink-0" />
        <span className="text-truncate">{levelLabel(record?.to_spec_name, record?.to_level_name) || "Not decided yet"}</span>
      </div>
    </div>
  );
}

function RuleRow({ rule }) {
  const result = RESULT[rule.result] ?? RESULT.failed;
  const ResultIcon = result.icon;
  return (
    <div className="d-flex flex-row align-items-start gap-2 py-2">
      <ResultIcon size={15} className={`flex-shrink-0 ${result.className}`} style={{ marginTop: "0.15rem" }} />
      <div className="d-flex flex-column" style={{ minWidth: 0 }}>
        <div className="d-flex flex-row align-items-center gap-2">
          <span className="fw-semibold">{rule.title}</span>
          <span className={`font-size-xs ${result.className}`}>{result.label}</span>
        </div>
        {rule.reasons.map((reason) => (
          <span key={reason} className="text-iron-600" style={{ lineHeight: 1.5 }}>{reason}</span>
        ))}
      </div>
    </div>
  );
}

function LogBody({ log, note }) {
  return (
    <div className="d-flex flex-column gap-4 font-size-sm">
      <div className="d-flex flex-column gap-2">
        <span className="text-iron-700" style={{ lineHeight: 1.5 }}>{log.summary}</span>
        {log.rules.length > 0 && (
          <div className="d-flex flex-row flex-wrap gap-4">
            {COUNTS.map((count) => (
              <div key={count.key} className="d-flex flex-column">
                <span className="fw-semibold" style={{ fontSize: "1.1rem" }}>{log.counts?.[count.key] ?? 0}</span>
                <span className="font-size-xs text-iron-500">{count.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {log.rules.length > 0 && (
        <div className="d-flex flex-column">
          <span className="font-size-xs fw-semibold text-iron-500 text-uppercase" style={{ letterSpacing: "0.04em" }}>
            Promotion rules · {log.rules.length}
          </span>
          {log.rules.map((rule) => (
            <div key={rule.rule} className="border-top"><RuleRow rule={rule} /></div>
          ))}
        </div>
      )}

      {note && (
        <div className="d-flex flex-column gap-1">
          <span className="font-size-xs fw-semibold text-iron-500 text-uppercase" style={{ letterSpacing: "0.04em" }}>
            Admin note
          </span>
          <span className="text-iron-700" style={{ lineHeight: 1.5, whiteSpace: "pre-wrap" }}>{note}</span>
        </div>
      )}
    </div>
  );
}

/**
 * How a student was evaluated in their promotion run: the decision, and
 * each promotion rule with whether it was met and why. Built from
 * GET student-promotion-record/{id}/log.
 */
function PromotionRecordLog({ drawerData, handleClose }) {
  const { data, isLoading, error } = useGetPromotionRecordLogs(drawerData?.id);
  const log = data?.data;
  const apiError = error?.response?.data?.errors;

  return (
    <>
      <div className="pt-2 px-2 pb-2 flex-shrink-0">
        <RecordHeader record={drawerData} />
      </div>

      <div className="drawer-content px-2 pb-3">
        <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.5} />
        <div className="pt-3">
          {isLoading ? (
            <div className="d-flex flex-column gap-2">
              <RectangleSkeleton height="2.5rem" />
              <RectangleSkeleton height="3.5rem" />
              <RectangleSkeleton height="3.5rem" />
              <RectangleSkeleton height="3.5rem" />
            </div>
          ) : error ? (
            <EmptyState
              mascot={isEmptyListError(error) ? "empty" : "error"}
              height="16rem"
              mascotHeight="6rem"
              title={apiError?.title ?? (isEmptyListError(error) ? "No log yet" : "The log could not be loaded")}
              description={apiError?.description ?? (isEmptyListError(error) ? "This student has not been evaluated yet." : "Check your connection and try again.")}
            />
          ) : (
            log && <LogBody log={log} note={drawerData?.admin_note} />
          )}
        </div>
      </div>

      <div className="drawer-footer font-size-sm">
        <div className="d-flex flex-column w-100">
          <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.5} />
          <div className="d-flex flex-row align-items-center p-2">
            <button type="button" className="border-none bg-none" onClick={() => handleClose?.()}>
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default PromotionRecordLog;
