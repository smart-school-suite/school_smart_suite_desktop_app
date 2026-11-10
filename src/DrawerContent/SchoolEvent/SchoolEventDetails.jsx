import { Fragment } from "react";
import { format, parseISO } from "date-fns";
import { CalendarDays, Heart, MapPin, UserRound, Users } from "lucide-react";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { NotFoundError } from "../../components/errors/Error";
import HorizontalDashedLine from "../../components/DashedLine/HorizonetalDashedLine";
import AnnouncementStatusRenderer from "../../components/Badges/AnnouncementStatusRenderer";
import { useGetSchoolEventDetails } from "../../hooks/schoolEvent/useGetSchoolEventDetails";
import { EventIcon } from "../../icons/Icons";
import { eventImageUrl } from "./CreateSchoolEvent/EventContent";

// Show the time as it was entered (the API's wall-clock time), not shifted to
// the viewer's timezone: drop any timezone suffix before parsing.
const formatDateTime = (value, pattern = "MMM d, yyyy h:mm a") => {
  const wallClock = value?.match(/^\d{4}-\d{2}-\d{2}[ T]\d{2}:\d{2}(:\d{2})?/)?.[0];
  return wallClock ? format(parseISO(wallClock.replace(" ", "T")), pattern) : "-";
};

const parseTags = (tags) => {
  if (!tags) return [];
  if (Array.isArray(tags)) return tags;
  try {
    return JSON.parse(tags);
  } catch {
    return [];
  }
};

function DetailRow({ label, children }) {
  return (
    <>
      <div className="d-flex flex-column gap-1">
        <span className="text-iron-400">{label}</span>
        <span className="fw-medium">{children}</span>
      </div>
      <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.2} />
    </>
  );
}

function SchoolEventDetails({ handleClose, drawerData }) {
  const { id: schoolEventId } = drawerData;
  const {
    data: eventDetails,
    isLoading,
    error,
  } = useGetSchoolEventDetails(schoolEventId);
  const event = eventDetails?.data;
  const author = event?.event_author?.autorable;

  return (
    <>
      <div className="drawer-content pt-3 px-2 font-size-sm">
        {isLoading ? (
          <div className="d-flex flex-column gap-2">
            <RectangleSkeleton height="20dvh" width="100%" />
            {[...Array(8)].map((_, index) => (
              <Fragment key={index}>
                <div className="d-flex flex-column gap-2">
                  <RectangleSkeleton height="1dvh" width="25%" />
                  <RectangleSkeleton height="3dvh" width="100%" />
                </div>
              </Fragment>
            ))}
          </div>
        ) : error ? (
          <NotFoundError
            title={error?.response?.data?.errors?.title}
            description={error?.response?.data?.errors?.description}
          />
        ) : (
          <div className="d-flex flex-column gap-3">
            {event?.current_images?.length > 0 && (
              <div className="d-flex flex-row gap-2 overflow-auto">
                {event.current_images.map((image) => (
                  <img
                    key={image.id}
                    src={eventImageUrl(image.object_key)}
                    alt={event?.title}
                    className="object-fit-cover rounded-3"
                    style={{
                      width: event.current_images.length === 1 ? "100%" : "12rem",
                      height: "10rem",
                      flexShrink: 0,
                    }}
                  />
                ))}
              </div>
            )}
            <div className="d-flex flex-row align-items-center justify-content-between">
              <div className="d-flex flex-row align-items-center gap-2">
                <div
                  style={{
                    width: "2.5rem",
                    height: "2.5rem",
                    display: "grid",
                    placeItems: "center",
                  }}
                  className="primary-background-50 rounded-2 text-primary-600"
                >
                  <EventIcon />
                </div>
                <div className="d-flex flex-column gap-1">
                  <span className="text-iron-400">
                    {event?.event_category?.name}
                  </span>
                  <span className="fw-semibold">{event?.title}</span>
                </div>
              </div>
              <AnnouncementStatusRenderer value={event?.status} />
            </div>
            <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.2} />
            <div className="d-flex flex-column gap-1">
              <span className="text-iron-400">Description</span>
              <span className="fw-light">{event?.description}</span>
              <div className="d-flex flex-row align-items-center gap-1 flex-wrap">
                {parseTags(event?.tags).map((tag) => (
                  <span
                    key={tag?.id}
                    className="primary-background-100 color-primary rounded-pill px-2"
                    style={{ fontSize: "0.7rem" }}
                  >
                    {tag?.name}
                  </span>
                ))}
              </div>
            </div>
            <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.2} />
            <div className="d-flex flex-row align-items-center gap-3 flex-wrap">
              <div className="d-flex flex-row align-items-center gap-1">
                <Users size={14} />
                <span>{event?.invitee_count ?? 0} Invitees</span>
              </div>
              <div className="d-flex flex-row align-items-center gap-1">
                <Heart size={14} />
                <span>{event?.likes_count ?? 0} Likes</span>
              </div>
            </div>
            <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.2} />
            <DetailRow label="Schedule">
              <span className="d-flex flex-row align-items-center gap-2">
                <CalendarDays size={14} />
                {formatDateTime(event?.start_date)} —{" "}
                {formatDateTime(event?.end_date)}
              </span>
            </DetailRow>
            <DetailRow label="Location">
              <span className="d-flex flex-row align-items-center gap-2">
                <MapPin size={14} />
                {event?.location}
              </span>
            </DetailRow>
            <DetailRow label="Organizer">
              <span className="d-flex flex-row align-items-center gap-2">
                <UserRound size={14} />
                {event?.organizer}
              </span>
            </DetailRow>
            <DetailRow label="Event Category">
              {event?.event_category?.name ?? "-"}
            </DetailRow>
            <DetailRow label="Publish Date">
              {formatDateTime(event?.published_at)}
            </DetailRow>
            <DetailRow label="Expiration Date">
              {formatDateTime(event?.expires_at)}
            </DetailRow>
            <span className="text-iron-400">System Info</span>
            {author && (
              <DetailRow label="Created By">
                {author?.name} {author?.username ? `(@${author.username})` : ""}
              </DetailRow>
            )}
            <DetailRow label="Created At">
              {formatDateTime(event?.created_at, "MMM d, yyyy")}
            </DetailRow>
            <div className="d-flex flex-column gap-1">
              <span className="text-iron-400">Updated At</span>
              <span className="fw-medium">
                {formatDateTime(event?.updated_at, "MMM d, yyyy")}
              </span>
            </div>
          </div>
        )}
      </div>
      <div className="drawer-footer font-size-sm">
        <div className="d-flex flex-column w-100">
          <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.5} />
          <div className="d-flex flex-row align-items-center justify-content-between p-2">
            <button
              className="border-none rounded-3 primary-background text-white font-size-sm px-3 py-2"
              onClick={() => handleClose()}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default SchoolEventDetails;
