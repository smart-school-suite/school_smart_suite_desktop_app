import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarClock, CalendarRange, Check, Dot } from "lucide-react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import {
  DayPicker,
  WizardFooter,
  WizardStep
} from "../../../../components/SemesterTimetable/ConstraintWizard/WizardPrimitives";
import CustomDropdown from "../../../../components/Dropdowns/Dropdowns";
import RectangleSkeleton from "../../../../components/SkeletonPageLoader/RectangularSkeleton";
import { useSchoolDayHours } from "../../../../hooks/jointCourseTimetable/useSchoolDayHours";
import { useGetSemesterTimetablePeriods } from "../../../../hooks/semesterTimetable/useSemesterTimetablePeriodDuration";
import { describeError } from "../../../../utils/jointCourseTimetable/recommendSlot";
import {
  dayLabel,
  formatTime,
  sortDays,
} from "../../../../utils/semesterTimetable/timeUtils";
const COURSE_ASSIGNMENT_PATH = "/joint-course";
// Dropdown option meaning "use the default duration chosen above".
const SAME_DURATION = "same";
const OVERRIDE_WIDTH = "240px";

function ChooseDaysStep({ nextStep, handleClose, drawerData }) {
  const { course, form, updateForm, proposal, generate, runGenerate } =
    drawerData;
  const periods = useGetSemesterTimetablePeriods();
  const schoolDay = useSchoolDayHours();
  const durations = periods.data?.data ?? [];
  const hasLecturer = (course.teachers ?? []).length > 0;
  const days = sortDays(form.days);
  const defaultDuration = durations.find((d) => d.id === form.durationId);
  const overrideOptions = [
    {
      id: SAME_DURATION,
      label: defaultDuration
        ? `Same as above (${defaultDuration.minutes} min)`
        : "Same as above",
    },
    ...durations
      .filter((duration) => duration.id !== form.durationId)
      .map((duration) => ({
        id: duration.id,
        label: `${duration.name} (${duration.minutes} min)`,
      })),
  ];

  const toggleDay = (day, isSelected) => {
    const nextDays = isSelected
      ? form.days.filter((item) => item !== day)
      : [...form.days, day];
    const overrides = { ...form.overrides };
    if (isSelected) delete overrides[day];
    updateForm({ days: nextDays, overrides });
  };

  const setOverride = (day, durationId) => {
    const overrides = { ...form.overrides };
    if (durationId) overrides[day] = durationId;
    else delete overrides[day];
    updateForm({ overrides });
  };

  // A day can't override with the default itself, so drop such overrides.
  const selectDuration = (durationId) => {
    const overrides = Object.fromEntries(
      Object.entries(form.overrides).filter(([, id]) => id !== durationId),
    );
    updateForm({ durationId, overrides });
  };

  const handleNext = () => (proposal ? nextStep() : runGenerate(nextStep));

  return (
    <WizardStep
      title="When is this course taught?"
      description="Choose the teaching days and how long one period lasts. We'll list every free slot on those days, and you pick the ones you want."
      footer={
        <WizardFooter
          onNext={handleNext}
          nextLabel={
            generate.isPending ? "Finding free slots…" : "Find free slots"
          }
          nextDisabled={
            !hasLecturer ||
            days.length === 0 ||
            !form.durationId ||
            generate.isPending
          }
          hint={
            !hasLecturer
              ? "Assign a lecturer first"
              : days.length === 0
                ? "Choose at least one day"
                : "Choose a period duration"
          }
        />
      }
    >
      <div className="d-flex flex-column gap-4">
        {!hasLecturer && (
          <LecturerRequired
            title={course.course?.title}
            onAssign={handleClose}
          />
        )}

        {generate.error && (
          <div className="jcs-alert jcs-alert--danger mb-3" role="alert">
            <Icon
              icon="lucide:circle-x"
              width={18}
              height={18}
              className="jcs-alert__icon"
            />
            <div className="d-flex flex-column gap-1">
              <span className="fw-semibold">
                {generate.error?.response?.data?.errors?.title ??
                  "Couldn't find free slots"}
              </span>
              <span>
                {describeError(
                  generate.error,
                  "Something went wrong. Try again.",
                )}
              </span>
            </div>
          </div>
        )}

        {schoolDay.start && schoolDay.end && (
          <div className="jcs-context">
            <span
              className="jcs-context__item"
              title="Source: App Configuration · Timetable Settings"
            >
              <Icon icon="lucide:clock" width={14} height={14} />
              School day {formatTime(schoolDay.start)} –{" "}
              {formatTime(schoolDay.end)}
              <span className="jcs-context__source">App Configuration</span>
            </span>
          </div>
        )}

        <div className="d-flex flex-column gap-2">
          <div>
            <div className="d-flex flex-row align-items-center gap-1 fw-semibold">
              <span>01</span>
              <Dot size={12} />
              <span>Teaching Days</span>
            </div>
            <span className="font-size-sm text-iron-500">
              How Long Should Each Teaching Session Last ?
            </span>
          </div>
          <DayPicker selected={form.days} onToggle={toggleDay} />
        </div>

        <div className="d-flex flex-column gap-2">
          <div>
            <div className="d-flex flex-row align-items-center gap-1 fw-semibold">
              <span>02</span>
              <Dot size={12} />
              <span>Period Duration</span>
            </div>
            <span className="font-size-sm text-iron-500">
              How Long Should Each Teaching Session Last ?
            </span>
          </div>
          <div
            className="d-grid gap-2"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            }}
          >
            {periods.isLoading ? (
              [...Array(4)].map((_, index) => (
                 <Fragment key={index}>
                  <RectangleSkeleton />
                 </Fragment>
              ))
            ) : (
              durations.map((d) => {
                const isSelected = form.durationId === d.id;
                return (
                  <motion.div
                    key={d.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    layout
                    className={`card p-2 rounded-3 text-capitalize d-flex flex-column gap-3 cursor-pointer ${
                      isSelected
                        ? "border-1 border-solid border-primary-500 text-primary-500 bg-primary-50"
                        : "border-1 border-solid border-iron-200 bg-white"
                    }`}
                    onClick={() => selectDuration(d.id)}
                  >
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="font-size-xs text-iron-500">
                        {d.name}
                      </span>

                      <AnimatePresence>
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="bg-primary-500 text-white rounded-circle p-1 d-flex align-items-center justify-content-center"
                            style={{ width: "18px", height: "18px" }}
                          >
                            <Check size={11} />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    <span className="font-size-md fw-medium">{`${d.minutes} min`}</span>
                  </motion.div>
                );
              })
            )}
          </div>
        </div>
        <div>
          <div className="d-flex flex-column gap-2">
            <div className="d-flex flex-column">
              <span className="fw-medium">
                How should durations be scheduled?
              </span>
              <span className="font-size-sm text-iron-500">
                Choose how teaching durations should apply across your selected
                days.
              </span>
            </div>
            <div
              className="d-grid gap-3"
              style={{ gridTemplateColumns: "repeat(2, minmax(0, 1fr))" }}
            >
              <motion.div
                onClick={() => updateForm({ schedulingMode: "same" })}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                layout
                className={`card p-2 cursor-pointer d-flex flex-column gap-3 position-relative ${
                  form.schedulingMode === "same"
                    ? "border-1 border-solid border-primary-500 text-primary-500 bg-primary-50"
                    : "border-1 border-solid border-iron-200 bg-white"
                }`}
                style={{ borderRadius: "0.75rem" }}
              >
                <div className="d-flex flex-row align-items-center justify-content-between">
                  <div
                    style={{
                      width: "2rem",
                      height: "2rem",
                      display: "grid",
                      placeItems: "center",
                    }}
                    className="border bg-iron-100 rounded-3 text-iron-700"
                  >
                    <CalendarClock strokeWidth={1.5} size={16} />
                  </div>
                  <AnimatePresence>
                    {form.schedulingMode === "same" && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="bg-primary-500 text-white rounded-circle p-1 d-flex align-items-center justify-content-center"
                        style={{ width: "18px", height: "18px" }}
                      >
                        <Check size={11} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div className="d-flex flex-column">
                  <span className="fw-semibold">Same duration</span>
                  <span className="font-size-sm text-iron-500">
                    All teaching days use one duration.
                  </span>
                </div>
              </motion.div>
              <motion.div
                onClick={() => updateForm({ schedulingMode: "different" })}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                layout
                className={`card p-2 cursor-pointer d-flex flex-column position-relative gap-4 ${
                  form.schedulingMode === "different"
                    ? "border-1 border-solid border-primary-500 text-primary-500 bg-primary-50"
                    : "border-1 border-solid border-iron-200 bg-white"
                }`}
                style={{ borderRadius: "0.75rem" }}
              >
                <div className="d-flex flex-row align-items-center justify-content-between">
                  <div
                    style={{
                      width: "2rem",
                      height: "2rem",
                      display: "grid",
                      placeItems: "center",
                    }}
                    className="border bg-iron-100 rounded-3 text-iron-700"
                  >
                    <CalendarRange strokeWidth={1.5} size={16} />
                  </div>
                  <AnimatePresence>
                    {form.schedulingMode === "different" && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="bg-primary-500 text-white rounded-circle p-1 d-flex align-items-center justify-content-center"
                        style={{ width: "18px", height: "18px" }}
                      >
                        <Check size={11} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div className="d-flex flex-column">
                  <span className="fw-semibold">Different durations</span>
                  <span className="font-size-sm text-iron-500">
                    Customize duration for individual days.
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
        {form.durationId && days.length > 0 &&  form.schedulingMode === "different" && (
          <div>
            {days.map((day) => (
                <li key={day} className="jcs-count">
                  <span className="fw-medium">{dayLabel(day)}</span>
                  {/* CustomDropdown reserves space for an error line; this
                      optional picker never shows one, so size it to the trigger. */}
                  <div style={{ width: OVERRIDE_WIDTH, height: 36 }}>
                    <CustomDropdown
                      data={overrideOptions}
                      displayKey={["label"]}
                      valueKey={["id"]}
                      value={form.overrides[day] ?? SAME_DURATION}
                      onSelect={({ id }) =>
                        setOverride(day, id === SAME_DURATION ? null : id)
                      }
                      isLoading={periods.isLoading}
                      placeholder="Same as above"
                      dropdownWidth={OVERRIDE_WIDTH}
                      optional
                      showFeedback={false}
                    />
                  </div>
                </li>
              ))}
          </div>
        )}
      </div>
    </WizardStep>
  );
}

function LecturerRequired({ title, onAssign }) {
  const navigate = useNavigate();
  return (
    <div className="jcs-alert jcs-alert--warn mb-3" role="alert">
      <Icon
        icon="lucide:user-round-x"
        width={18}
        height={18}
        className="jcs-alert__icon"
      />
      <div className="d-flex flex-column gap-1">
        <span className="fw-semibold">A lecturer must be assigned first</span>
        <span>
          {title ?? "This course"} has no lecturer yet. Slots are found around
          the lecturer's other classes, so assign one from the joint course's
          Manage Assignment, then come back.
        </span>
        <button
          type="button"
          className="cw-text-btn jcs-link"
          onClick={() => {
            onAssign();
            navigate(COURSE_ASSIGNMENT_PATH);
          }}
        >
          <span>Go to joint courses</span>
          <Icon icon="lucide:arrow-up-right" width={15} height={15} />
        </button>
      </div>
    </div>
  );
}

export default ChooseDaysStep;
