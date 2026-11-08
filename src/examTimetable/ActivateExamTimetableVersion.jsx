import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Building2, CalendarCheck, CircleAlert, CircleCheckBig, CircleX, Clock, User, Users } from "lucide-react";
import FormErrorBanner from "../components/errors/FormErrorBanner";
import RectangleSkeleton from "../components/SkeletonPageLoader/RectangularSkeleton";
import { SingleSpinner } from "../components/Spinners/Spinners";
import { useFormError } from "../hooks/form/useFormError";
import { useActivateExamTimetable } from "../hooks/examTimetableGeneration/mutations";
import { useGetExamTimetableActivationCheck } from "../hooks/examTimetableGeneration/queries";
import { parseServerError } from "../utils/functions";

const CLASH = {
  invigilator: { icon: User, label: "Invigilator clash" },
  hall: { icon: Building2, label: "Hall clash" },
  students: { icon: Users, label: "Student clash" },
};
const AGAINST = {
  this_timetable: "Within this timetable",
  active_timetable: "With another exam's active timetable",
};

/**
 * Confirms activation of an exam timetable version, like the semester one:
 * GET .../activation-check first shows what is replaced and any clashes,
 * then POST .../activate.
 */
function ActivateExamTimetableVersion({ handleClose, version }) {
  const check = useGetExamTimetableActivationCheck(version?.id);
  const activate = useActivateExamTimetable();
  const { formError, errorBannerRef, handleServerError, clearFormError } = useFormError("Failed To Activate Exam Timetable");

  const result = check.data?.data;
  const conflicts = activate.error?.response?.data?.errors?.conflicts ?? result?.conflicts ?? [];
  const checkError = check.isError ? parseServerError(check.error, "Can't Activate This Version") : null;
  const canActivate = !!result?.can_activate && conflicts.length === 0;

  const handleActivate = () => {
    clearFormError();
    activate.mutate({ versionId: version.id }, { onSuccess: () => handleClose(), onError: handleServerError });
  };

  return (
    <div className="w-100 font-size-sm">
      <div className="d-flex flex-row align-items-center justify-content-between border-bottom px-3 py-2 bg-iron-50 rounded-top-4">
        <div className="d-flex align-items-center gap-2">
          <CalendarCheck size={16} />
          <span className="fw-semibold">Activate {version?.label ?? "version"}</span>
        </div>
        <button onClick={handleClose} className="border-none bg-transparent p-0 d-grid" style={{ width: "2rem", height: "2rem", placeItems: "center" }} aria-label="Close">
          <CircleX size={16} />
        </button>
      </div>

      <div className="d-flex flex-column gap-2 px-3 py-3" style={{ maxHeight: "60dvh", overflowY: "auto" }}>
        <FormErrorBanner ref={errorBannerRef} error={formError} onDismiss={clearFormError} className="mb-0" />

        {check.isLoading ? (
          <div className="d-flex flex-column gap-2">
            <RectangleSkeleton width="100%" height="2.5rem" />
            <RectangleSkeleton width="100%" height="3.5rem" />
          </div>
        ) : checkError ? (
          <div className="d-flex align-items-start gap-2 bg-old-lace-50 text-old-lace-700 rounded-3 p-2">
            <CircleAlert size={14} className="flex-shrink-0 mt-1" />
            <div className="d-flex flex-column">
              <span className="fw-medium">{checkError.title}</span>
              {checkError.messages.map((message) => (
                <span key={message} className="font-size-xs">{message}</span>
              ))}
            </div>
          </div>
        ) : (
          <>
            <span className="text-iron-600">
              Students, invigilators and admins will see this version as the exam timetable. Its halls and invigilators become busy for other exams.
            </span>
            <div className="d-flex align-items-center gap-2 border rounded-3 bg-iron-50 px-2 py-2">
              <VersionBox label={result?.replaces?.label ?? "None"} caption={result?.replaces ? "Currently active" : "Nothing active yet"} muted />
              <ArrowRight size={14} className="text-iron-400 flex-shrink-0" />
              <VersionBox label={version?.label} caption={`${result?.session_count ?? 0} exams`} />
            </div>
            {conflicts.length === 0 ? (
              <div className="d-flex align-items-center gap-2 bg-fern-50 text-fern-700 rounded-3 px-2 py-1">
                <CircleCheckBig size={14} />
                <span>No clashes with other exam timetables. Ready to activate.</span>
              </div>
            ) : (
              <ConflictList conflicts={conflicts} />
            )}
          </>
        )}
      </div>

      <div className="d-flex flex-row align-items-center justify-content-end gap-2 border-top px-3 py-2">
        <button className="border rounded-3 bg-none px-3 py-1 font-size-sm" onClick={handleClose}>Cancel</button>
        <button
          className={`border-none rounded-3 primary-background text-white px-3 py-1 font-size-sm ${canActivate ? "" : "opacity-50"}`}
          disabled={!canActivate || activate.isPending}
          onClick={handleActivate}
        >
          {activate.isPending ? <SingleSpinner /> : "Activate timetable"}
        </button>
      </div>
    </div>
  );
}

export default ActivateExamTimetableVersion;

function VersionBox({ label, caption, muted }) {
  return (
    <div className={`d-flex flex-column flex-fill rounded-3 px-2 py-1 ${muted ? "" : "bg-white border"}`}>
      <span className={`fw-medium ${muted ? "text-iron-600" : ""}`}>{label ?? "—"}</span>
      <span className="font-size-xs text-iron-500">{caption}</span>
    </div>
  );
}

function ConflictList({ conflicts }) {
  return (
    <div className="d-flex flex-column gap-2">
      <div className="d-flex align-items-start gap-2 bg-red-50 text-red-700 rounded-3 px-2 py-1">
        <CircleAlert size={14} className="flex-shrink-0 mt-1" />
        <span>
          {conflicts.length} {conflicts.length === 1 ? "exam clashes" : "exams clash"} with exam timetables already in use. Generate again so the
          scheduler works around them, then activate.
        </span>
      </div>
      <div className="border rounded-3">
        <AnimatePresence initial={false}>
          {conflicts.map((conflict, index) => {
            const clash = CLASH[conflict.type] ?? CLASH.hall;
            const Icon = clash.icon;
            return (
              <motion.div
                key={`${conflict.type}-${conflict.date}-${conflict.time}-${index}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`d-flex flex-column gap-1 px-2 py-2 ${index ? "border-top" : ""}`}
              >
                <div className="d-flex align-items-center gap-2 font-size-xs text-iron-500">
                  <span className="d-inline-flex align-items-center gap-1 text-red-700 fw-medium">
                    <Icon size={11} /> {clash.label}
                  </span>
                  <span>·</span>
                  <span className="d-inline-flex align-items-center gap-1">
                    <Clock size={11} /> {conflict.date_label} {conflict.time}
                  </span>
                  <span>·</span>
                  <span>{AGAINST[conflict.against] ?? conflict.against}</span>
                </div>
                <span>{conflict.message}</span>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
