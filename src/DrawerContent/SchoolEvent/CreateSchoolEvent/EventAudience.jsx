import HorizontalDashedLine from "../../../components/DashedLine/HorizonetalDashedLine";
import { School, GraduationCap, Users, ShieldCheck } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import {
  setAudienceType,
  setTargetingContext,
  resetTargetingContext,
  setTargetIndividuals,
  setTargetSelection,
} from "../../../Slices/schoolEvent/schoolEventSlice";
import { ANNOUNCEMENT_TARGET_MAP } from "../../../utils/maps/announcement/announcementTargetMap";
import { useGetAudienceSummary } from "../../../hooks/Audience/useGetAudienceSummary";
import { NotFoundError } from "../../../components/errors/Error";
import RectangleSkeleton from "../../../components/SkeletonPageLoader/RectangularSkeleton";
import {
  AudienceCard,
  tokens,
} from "../../Announcement/CreateAnnouncement/AnnouncementAudience";
import FormErrorBanner from "../../../components/errors/FormErrorBanner";
import { useFormError } from "../../../hooks/form/useFormError";
import { EventWizardHeader } from "../../../ModalContent/Events/CreateEvent";

const selectEventTargeting = (state) =>
  state.schoolEvent.createEvent.audience.targeting;

const audiences = [
  {
    key: "school_wide",
    icon: School,
    title: "School-wide",
    description:
      "Everyone in this school — students, teachers, and administrators — will be invited to this event.",
    countLabel: "invitees",
    footer: { type: "info", label: "Invites everyone — no targeting needed" },
  },
  {
    key: "students",
    icon: GraduationCap,
    title: "Students",
    description:
      "Invite students across your academic structure. Target by department, specialty, level, or individual students.",
    countLabel: "students",
    footer: { type: "action", label: "Configure targeting" },
  },
  {
    key: "teachers",
    icon: Users,
    title: "Teachers",
    description:
      "Invite teaching staff. Target by department, specialty, level or select individual teachers.",
    countLabel: "teachers",
    footer: { type: "action", label: "Configure targeting" },
  },
  {
    key: "schoolAdmins",
    icon: ShieldCheck,
    title: "Administrators",
    description:
      "Invite school administrators responsible for managing and coordinating school operations.",
    countLabel: "administrators",
    footer: { type: "action", label: "Select administrators" },
  },
];

// Returns an error for the first selected audience that has no target configured.
export function validateEventAudience(audience) {
  if (!audience?.types?.length) {
    return {
      title: "Invitees Required",
      message:
        "Select at least one group of invitees (or make the event school-wide) before continuing.",
    };
  }
  if (audience.types.includes("school_wide")) return null;

  const { students, teachers, administrators } = audience.targeting;
  const noCriteria = (group) =>
    group.individualIds.length === 0 &&
    Object.values(group.criteria).every((g) => g.length === 0);

  if (audience.types.includes("students") && noCriteria(students)) {
    return {
      title: "Student Invitees Not Configured",
      message:
        "Configure which students are invited before continuing.",
    };
  }
  if (audience.types.includes("teachers") && noCriteria(teachers)) {
    return {
      title: "Teacher Invitees Not Configured",
      message:
        "Configure which teachers are invited before continuing.",
    };
  }
  if (
    audience.types.includes("schoolAdmins") &&
    administrators.individualIds.length === 0
  ) {
    return {
      title: "Administrator Invitees Not Configured",
      message:
        "Select the administrators who are invited before continuing.",
    };
  }
  return null;
}

function EventAudience({
  handleClose,
  currentStep,
  nextStep,
  previousStep,
  fullStep,
  images,
}) {
  const dispatch = useDispatch();
  const moduleState = useSelector(
    (state) => state.schoolEvent.createEvent.audience,
  );
  const { formError, errorBannerRef, setClientError, clearFormError } =
    useFormError();
  const {
    data: summary,
    isLoading: isSummaryLoading,
    error: summaryError,
  } = useGetAudienceSummary();
  const TargetComponent =
    ANNOUNCEMENT_TARGET_MAP[moduleState?.targetingContext]?.component;

  const handleNext = () => {
    clearFormError();
    const error = validateEventAudience(moduleState);
    if (error) {
      setClientError(error.title, error.message);
      return;
    }
    nextStep();
  };

  if (TargetComponent) {
    return (
      <>
        <EventWizardHeader handleClose={handleClose} images={images} />
        <div className="d-flex flex-column px-2 pt-2 font-size-sm">
          <span className="fw-medium">Invitee Targeting</span>
          <p className="text-iron-400">
            Choose exactly who in this group is invited to the event.
          </p>
        </div>
        <div
          className="drawer-content"
          style={{ background: "#f9f9f9", paddingBottom: "10rem" }}
        >
          <TargetComponent
            selectTargeting={selectEventTargeting}
            setTargetIndividuals={setTargetIndividuals}
            setTargetSelection={setTargetSelection}
          />
        </div>
        <div className="drawer-footer font-size-sm ">
          <div className="d-flex flex-column w-100">
            <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.5} />
            <div className="d-flex flex-row align-items-center justify-content-between p-3">
              <button
                className="border-none bg-none cursor-pointer"
                onClick={() => dispatch(resetTargetingContext())}
              >
                <span>Back To Invitees</span>
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <EventWizardHeader handleClose={handleClose} images={images} />
      <div className="d-flex flex-row align-items-center justify-content-between font-size-sm px-2 pt-2">
        <div className="d-flex flex-column">
          <span className="fw-medium">Event Invitees</span>
          <p className="text-iron-400">
            Choose the groups of people invited to this event.
          </p>
        </div>
        <div className="d-flex flex-row align-items-center gap-1 fw-semibold text-capitalize">
          <span>step</span>
          <span>{currentStep}</span>
          <span>of</span>
          <span>{fullStep}</span>
          <span>Completed</span>
        </div>
      </div>
      <div className="drawer-content font-size-sm">
        <FormErrorBanner
          ref={errorBannerRef}
          error={formError}
          onDismiss={clearFormError}
          className="mx-2 mb-2"
        />
        <div
          style={{
            background: tokens.surface,
            display: "flex",
            justifyContent: "center",
            paddingBottom: "24px",
          }}
          className="px-2 pt-3"
        >
          <div
            role="group"
            aria-label="Select Event Invitees"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              width: "100%",
            }}
          >
            {isSummaryLoading ? (
              [...Array(4)].map((_, index) => (
                <RectangleSkeleton height="16dvh" width="100%" key={index} />
              ))
            ) : summaryError ? (
              <NotFoundError
                title={summaryError?.response?.data?.errors?.title}
                description={summaryError?.response?.data?.errors?.description}
              ></NotFoundError>
            ) : (
              audiences.map((a) => (
                <AudienceCard
                  key={a.key}
                  cardKey={a.key}
                  icon={a.icon}
                  title={a.title}
                  description={a.description}
                  count={summary?.data?.[a.key] ?? 0}
                  countLabel={a.countLabel}
                  footer={a.footer}
                  selected={moduleState?.types?.includes(a.key)}
                  onSelect={() =>
                    dispatch(setAudienceType({ audienceType: a.key }))
                  }
                  onConfigure={(cardKey) =>
                    dispatch(setTargetingContext({ targetContext: cardKey }))
                  }
                />
              ))
            )}
          </div>
        </div>
      </div>
      <div className="drawer-footer font-size-sm">
        <div className="d-flex flex-column w-100">
          <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.5} />
          <div className="d-flex flex-row align-items-center justify-content-between p-2">
            <button
              className="border-none bg-none cursor-pointer"
              onClick={() => previousStep()}
            >
              <span>Back To Content</span>
            </button>
            <button
              className="border-none rounded-3 primary-background text-white font-size-sm px-3 py-2 cursor-pointer"
              onClick={() => handleNext()}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default EventAudience;
