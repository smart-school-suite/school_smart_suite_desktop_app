import { Badge } from "@/components/Renderer/badges";
import { motion } from "framer-motion";
import { ArrowRight, BookOpenCheck, CalendarRange, CircleCheck, Dot, Lock, Sparkles, X } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import HorizontalDashedLine from "../../../components/DashedLine/HorizonetalDashedLine";
import EmptyState from "../../../components/errors/EmptyState";
import FormErrorBanner from "../../../components/errors/FormErrorBanner";
import { resetCreateExamState, setCreateExamValue } from "../../../Slices/exam/examSlice";
import { formatScheduleDate } from "../../../utils/feeSchedule/scheduleRules";
import { IssueNote } from "./SelectSchoolSemester";

const TYPE_LABEL = { ca: "Continuous Assessment", exam: "Semester Exam" };

/** The semester chosen in step 1, as a header for the next steps. */
export function SelectedSemester({ semester, currentStep, fullStep }) {
  const year = semester?.academic_year ?? {};
  return (
    <div className="d-flex flex-row align-items-center justify-content-between gap-2">
      <div className="d-flex flex-row align-items-center gap-2" style={{ minWidth: 0 }}>
        <div
          className="d-flex align-items-center justify-content-center rounded-3 primary-background-100 color-primary flex-shrink-0"
          style={{ height: "2.5rem", width: "2.5rem" }}
        >
          <CalendarRange size={16} />
        </div>
        <div className="d-flex flex-column" style={{ minWidth: 0 }}>
          <small className="text-muted">Selected semester</small>
          <span className="fw-semibold text-truncate">
            {semester?.name} · {year.name}
          </span>
          <span className="font-size-xs text-iron-400 text-truncate">
            {[year.specialty, year.level].filter(Boolean).join(" · ")} · {formatScheduleDate(semester?.start_date)} –{" "}
            {formatScheduleDate(semester?.end_date)}
          </span>
        </div>
      </div>
      <span className="text-end fw-medium text-capitalize text-nowrap">{`step ${currentStep} of ${fullStep}`}</span>
    </div>
  );
}

function ExamTypeCard({ type, selected, onSelect, onAction, onPickCa }) {
  const disabled = !type.available;
  const select = () => !disabled && onSelect(type);
  return (
    <motion.div
      // An unavailable card is not a control: it holds its own action button.
      role={disabled ? undefined : "button"}
      tabIndex={disabled ? undefined : 0}
      aria-pressed={disabled ? undefined : selected}
      data-unavailable={disabled || undefined}
      whileHover={disabled ? undefined : { scale: 1.01 }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      onClick={select}
      onKeyDown={(event) => {
        if (event.target === event.currentTarget && (event.key === "Enter" || event.key === " ")) {
          event.preventDefault();
          select();
        }
      }}
      className={`card p-2 d-flex flex-column gap-2 ${disabled ? "" : "pointer-cursor"} ${
        selected ? "shadow-fern-100-lg border-fern-300" : "border-none border shadow-sm"
      }`}
      style={{ borderRadius: "0.85rem" }}
    >
      <div className="d-flex flex-row align-items-center justify-content-between gap-2">
        <div className="d-flex flex-row align-items-center gap-2">
          <div
            className={`d-flex align-items-center justify-content-center rounded-3 flex-shrink-0 ${
              disabled ? "bg-iron-100 text-iron-700" : "primary-background-50 color-primary"
            }`}
            style={{ height: "2.5rem", width: "2.5rem" }}
          >
            {disabled ? <Lock size={15} /> : <BookOpenCheck size={16} />}
          </div>
          <div className="d-flex flex-column">
            <div className="d-flex flex-row align-items-center gap-2 flex-wrap">
              <span className={`fw-semibold ${disabled ? "text-iron-500" : ""}`}>{type.name}</span>
              {type.created ? (
                <Badge variant="success">Created</Badge>
              ) : type.recommended ? (
                <Badge variant="primary">
                  <span className="d-inline-flex align-items-center gap-1">
                    <Sparkles size={11} /> Recommended
                  </span>
                </Badge>
              ) : null}
            </div>
            <span className="font-size-xs text-iron-400">{TYPE_LABEL[type.type] ?? type.type}</span>
          </div>
        </div>
        {selected && <CircleCheck size={16} className="green-color flex-shrink-0" />}
      </div>
      {type.created && type.exam ? (
        <span className="font-size-xs text-iron-500">
          {formatScheduleDate(type.exam.start_date)} – {formatScheduleDate(type.exam.end_date)}
          <Dot size={12} />
          Out of {type.exam.max_score}
        </span>
      ) : null}
      {disabled && !type.created && (
        <>
          <IssueNote issue={type.issue} onAction={onAction} />
          {type.issue?.action === "create_ca" && type.issue?.data?.exam_type_id && (
            <button
              type="button"
              className="border-none bg-none p-0 d-inline-flex align-items-center gap-1 fw-semibold text-primary-600 font-size-xs align-self-start"
              onClick={() => onPickCa(type.issue.data.exam_type_id)}
            >
              Create the CA instead <ArrowRight size={12} />
            </button>
          )}
        </>
      )}
      {!disabled && type.type === "exam" && type.ca_max_score != null ? (
        <span className="font-size-xs text-iron-500">Its max score adds the CA's {type.ca_max_score} points.</span>
      ) : null}
    </motion.div>
  );
}

function SelectExamType({ handleClose, nextStep, previousStep, fullStep, currentStep }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const moduleState = useSelector((state) => state.exam.createExam);
  const semester = moduleState?.schoolSemester;
  const types = Array.isArray(semester?.exam_types) ? semester.exam_types : [];
  const selectedId = moduleState?.examType?.id;
  const [stepError, setStepError] = useState(null);

  const handleSelect = (type) => {
    setStepError(null);
    dispatch(setCreateExamValue({ value: type, field: "examType" }));
  };

  const goTo = (path) => {
    dispatch(resetCreateExamState());
    handleClose();
    navigate(path);
  };
  const pickCa = (examTypeId) => {
    const ca = types.find((type) => type.id === examTypeId && type.available);
    if (ca) handleSelect(ca);
  };

  const handleNext = () => {
    if (!types.find((type) => type.id === selectedId)?.available) {
      setStepError({ title: "No exam type selected.", messages: ["Pick the exam to create to continue."] });
      return;
    }
    nextStep();
  };

  return (
    <>
      <div className="d-flex flex-row align-items-center justify-content-between border-bottom p-2 font-size-sm">
        <span className="fw-medium">Create Exam</span>
        <button
          className="bg-none border-none border rounded-circle"
          aria-label="Close drawer"
          onClick={() => {
            dispatch(resetCreateExamState());
            handleClose();
          }}
          style={{ width: "2rem", height: "2rem", display: "grid", placeItems: "center", cursor: "pointer" }}
        >
          <X size={16} />
        </button>
      </div>
      <div className="drawer-content px-2 font-size-sm pt-2 pb-5">
        <FormErrorBanner error={stepError} onDismiss={() => setStepError(null)} />
        <div className="d-flex flex-column gap-3">
          <SelectedSemester semester={semester} currentStep={currentStep} fullStep={fullStep} />
          <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.2} />
          <div className="d-flex flex-column">
            <span className="fw-semibold">Which exam do you want to create?</span>
            <span className="font-size-xs text-iron-400">
              Each is created once for the academic year. The semester exam needs its CA first.
            </span>
          </div>
          {types.length === 0 ? (
            <EmptyState
              mascot="sad"
              title="No exam types for this semester"
              description="No CA or exam types are set up for this semester. Go back and pick another semester."
              height="40dvh"
              mascotHeight="6rem"
            />
          ) : (
            types.map((type) => (
              <ExamTypeCard
                key={type.id}
                type={type}
                selected={type.id === selectedId}
                onSelect={handleSelect}
                onAction={goTo}
                onPickCa={pickCa}
              />
            ))
          )}
        </div>
      </div>
      <div className="drawer-footer font-size-sm">
        <div className="d-flex flex-column w-100">
          <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.5} />
          <div className="d-flex flex-row align-items-center justify-content-between p-2">
            <button type="button" className="border-none bg-none p-2" onClick={previousStep}>
              Back (select semester)
            </button>
            <button
              type="button"
              className={`primary-background text-white border-none px-3 py-2 rounded-3 ${!selectedId ? "opacity-50" : ""}`}
              onClick={handleNext}
              disabled={!selectedId}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SelectExamType;
