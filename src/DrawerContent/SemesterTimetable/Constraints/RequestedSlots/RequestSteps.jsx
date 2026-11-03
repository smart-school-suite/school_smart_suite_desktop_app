import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  Badge,
  DayPicker,
  EmptyState,
  IconButton,
  Note,
  Outline,
  Panel,
  PointList,
  Section,
  Stats,
  TextButton,
  TimeSpan,
  WizardFooter,
  WizardStep,
} from "../../../../components/SemesterTimetable/ConstraintWizard/WizardPrimitives";
import ToastSuccess from "../../../../components/Toast/ToastSuccess";
import {
  addRequestDay,
  removeRequestDay,
  removeRequestSlot,
} from "../../../../Slices/SemesterTimetable/semesterTimetableSlice";
import {
  FIELD_LABELS,
  allRequests,
  requestEntryOf,
  requestsForDay,
  timeOf,
} from "../../../../utils/semesterTimetable/requestedSlots";
import {
  dayLabel,
  resolveScheduleDays,
  sortDays,
  toMinutes,
} from "../../../../utils/semesterTimetable/timeUtils";
import { useRequestOptions } from "./useRequestOptions";

const useEntry = (config) =>
  useSelector((state) =>
    requestEntryOf(state.semesterTimetable.soft_constraints, config.key),
  );

/* -------------------------------------------------------------------------- */
/* Introduction                                                               */
/* -------------------------------------------------------------------------- */

export function RequestIntroStep({ config, nextStep }) {
  return (
    <WizardStep
      title={config.title}
      description={config.description}
      footer={<WizardFooter onNext={nextStep} nextLabel="Get started" />}
    >
      <Section label="How it works">
        <Panel>
          <PointList items={config.points} />
        </Panel>
      </Section>

      <Section>
        <Note icon="lucide:calendar-search">
          <strong>Suggested times.</strong>{" "}
          {config.suggest === "periods"
            ? "Each day shows the periods that fit your operating hours and period length, so requests line up with the timetable grid."
            : "Times are checked against the published timetables and joint courses, so you only pick times that are actually free."}
        </Note>
      </Section>

      <Section label="What you will set up">
        <Outline
          items={[
            { title: "Days", text: "The days these requests apply to." },
            {
              title:
                config.noun.many[0].toUpperCase() + config.noun.many.slice(1),
              text: `Who or what, and when: ${config.fields
                .map((field) => FIELD_LABELS[field].toLowerCase())
                .join(", ")} and a time.`,
            },
            { title: "Review", text: "Check every request before saving." },
          ]}
        />
      </Section>
    </WizardStep>
  );
}

/* -------------------------------------------------------------------------- */
/* Days                                                                       */
/* -------------------------------------------------------------------------- */

export function RequestDaysStep({ config, nextStep, previousStep }) {
  const dispatch = useDispatch();
  const entry = useEntry(config);
  const opDays = useSelector(
    (state) =>
      state.semesterTimetable.hard_constraints.operational_period
        .operational_days,
  );
  const hasRequests = entry.slots.some((item) => item.slots?.length);

  const toggle = (day, isSelected) =>
    dispatch(
      isSelected
        ? removeRequestDay({ constraint: config.key, day })
        : addRequestDay({ constraint: config.key, day }),
    );

  return (
    <WizardStep
      title="Which days?"
      description={`Select the days you want to add ${config.noun.many} for.`}
      footer={
        <WizardFooter
          onBack={previousStep}
          onNext={nextStep}
          nextDisabled={entry.days.length === 0}
          hint="Select at least one day"
        />
      }
    >
      <Section
        label="Days"
        hint={
          entry.days.length
            ? `${entry.days.length} selected · ${sortDays(entry.days).map(dayLabel).join(", ")}`
            : "Only operating days can be selected"
        }
      >
        <DayPicker
          selected={entry.days}
          available={resolveScheduleDays(opDays)}
          onToggle={toggle}
        />
      </Section>
      {hasRequests && (
        <Section>
          <Note>
            Removing a day also removes the {config.noun.many} set for it.
          </Note>
        </Section>
      )}
    </WizardStep>
  );
}

/* -------------------------------------------------------------------------- */
/* Review                                                                     */
/* -------------------------------------------------------------------------- */

export function RequestReviewStep({
  config,
  handleClose,
  previousStep,
  goToStep,
}) {
  const dispatch = useDispatch();
  const entry = useEntry(config);
  const { labels } = useRequestOptions(config);
  const days = sortDays(entry.days);
  const everything = allRequests(entry);
  const subjects = new Set(
    everything.map((request) =>
      config.fields.map((field) => request[field]).join("|"),
    ),
  );

  const save = () => {
    handleClose();
    toast.custom(
      <ToastSuccess
        title={"Configuration Successful"}
        description={"Configuration has been successfully completed."}
      />,
    );
  };

  return (
    <WizardStep
      title={`Review ${config.noun.many}`}
      description="These requests are sent with the next timetable generation."
      footer={
        <WizardFooter
          onBack={previousStep}
          onNext={save}
          nextLabel={`Save ${config.noun.many}`}
          nextIcon="lucide:check"
        />
      }
    >
      <Section label="Summary">
        <Stats
          items={[
            { label: "Days", value: days.length },
            {
              label:
                config.noun.many[0].toUpperCase() + config.noun.many.slice(1),
              value: everything.length,
            },
            {
              label:
                config.fields.length > 1
                  ? "Distinct lessons"
                  : FIELD_LABELS[config.fields[0]] + "s",
              value: subjects.size,
            },
          ]}
        />
      </Section>

      <Section
        label="By day"
        action={
          <TextButton
            icon="lucide:pencil"
            onClick={() => goToStep(`${config.stepPrefix}_BUILDER_STEP`)}
          >
            Edit
          </TextButton>
        }
      >
        {days.length === 0 ? (
          <EmptyState
            title="Nothing to review"
            text="No days have been selected."
          />
        ) : (
          <ul className="cw-daylist">
            {days.map((day) => {
              const requests = [...requestsForDay(entry, day)].sort(
                (a, b) =>
                  (toMinutes(timeOf(a.start_time)) ?? 0) -
                  (toMinutes(timeOf(b.start_time)) ?? 0),
              );
              return (
                <li
                  key={day}
                  className={`cw-dayrow align-items-start ${requests.length ? "" : "is-muted"}`}
                >
                  <span className="cw-dayrow__day pt-1">{dayLabel(day)}</span>
                  <span className="cw-dayrow__value d-flex flex-column gap-2 py-1">
                    {requests.length ? (
                      requests.map((request) => (
                        <span
                          key={request.id}
                          className="d-flex flex-row align-items-center justify-content-between gap-2"
                        >
                          <span className="d-flex flex-column">
                            <TimeSpan
                              start={timeOf(request.start_time)}
                              end={timeOf(request.end_time)}
                            />
                            <span className="cw-muted font-size-sm">
                              {config.fields
                                .map(
                                  (field) =>
                                    labels[field]?.[request[field]] ??
                                    FIELD_LABELS[field],
                                )
                                .join(" · ")}
                            </span>
                          </span>
                          <IconButton
                            icon="lucide:x"
                            label="Remove request"
                            tone="danger"
                            onClick={() =>
                              dispatch(
                                removeRequestSlot({
                                  constraint: config.key,
                                  day,
                                  slotId: request.id,
                                }),
                              )
                            }
                          />
                        </span>
                      ))
                    ) : (
                      <span>No {config.noun.many}</span>
                    )}
                  </span>
                  <span className="cw-dayrow__meta pt-1">
                    {requests.length ? (
                      <Badge tone="accent">{requests.length}</Badge>
                    ) : (
                      <Badge tone="muted">Empty</Badge>
                    )}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </Section>
    </WizardStep>
  );
}
