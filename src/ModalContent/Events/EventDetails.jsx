import { useGetSchoolEventDetails } from "../../hooks/schoolEvent/useGetSchoolEventDetails";
import { Icon } from "@iconify/react";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { formatISODate } from "../../utils/functions";
function EventDetails({ handleClose, rowData }) {
  const { id: schoolEventId } = rowData;
  const {
    data: eventDetails,
    isLoading,
    error,
  } = useGetSchoolEventDetails(schoolEventId);
  return (
    <>
      <div
        className="d-flex flex-row align-items-center justify-content-between w-100"
        style={{ height: "5%" }}
      >
        <span className="m-0">Event Details</span>
        <span
          className="m-0"
          onClick={() => {
            handleClose();
          }}
        >
          <Icon icon="charm:cross" width="22" height="22" />
        </span>
      </div>
      <div className="modal-content-container py-2">
        {isLoading ? (
          <div className="d-flex flex-column w-100 gap-3">
            <div>
              <RectangleSkeleton width="100%" height="30dvh" />
            </div>
            <div>
              <RectangleSkeleton width="50%" height="2dvh" />
            </div>
            <div>
              <RectangleSkeleton width="100%" height="20dvh" />
            </div>
            <div className="d-flex flex-row gap-2">
              <RectangleSkeleton width="100%" height="4dvh" />
              <RectangleSkeleton width="100%" height="4dvh" />
              <RectangleSkeleton width="100%" height="4dvh" />
            </div>
          </div>
        ) : (
          <div className="d-flex flex-column w-100 gap-3 px-2">
            <div className="w-100" style={{ height: "35dvh" }}>
              <img
                src="./images/event-img-one.jpg"
                className="object-fit-cover w-100 rounded-3 h-100"
              />
            </div>
            <div>
              <span className="fw-semibold">{eventDetails.data.title}</span>
            </div>
            <div>
              <span className="font-size-sm">
                {eventDetails.data.description}
              </span>
            </div>
            <div className="d-flex flex-row flex-wrap gap-2">
              {JSON.parse(eventDetails.data.tags).map((tag) => (
                <div
                  className="primary-background-50 px-3 py-2 rounded-pill color-primary"
                  key={tag.id}
                  style={{ fontSize: "0.65rem" }}
                >
                  <span>{tag.name || "N/A"}</span>
                </div>
              ))}
            </div>
            <div className="d-flex flex-column gap-1 font-size-sm">
              <span className="font-size-xs gainsboro-color">
                location & orgainizer info
              </span>
              <div className="d-flex flex-row align-items-center gap-2">
                <Icon icon="ion:location-outline" />
                <span>{eventDetails.data.organizer}</span>
              </div>
              <div className="d-flex flex-row align-items-center gap-2">
                <Icon icon="material-symbols:next-plan-outline-rounded" />
                <span>{eventDetails.data.location}</span>
              </div>
            </div>
            <div>
              <span className="font-size-xs gainsboro-color">
                location & orgainizer info
              </span>
                <div className="d-flex flex-row gap-2 align-items-center font-size-sm">
              <Icon icon="solar:calendar-linear" />
              <span>{formatISODate(eventDetails.data.start_date)}</span>
              <Icon icon="radix-icons:dash" />
              <span>{formatISODate(eventDetails.data.end_date)}</span>
            </div>
            </div>
            <div>
            <span className="font-size-xs gainsboro-color">system info</span>
              <div className="d-flex flex-column gap-1">
                <span className="font-size-sm">Created At</span>
                <span className="font-size-sm">
                  {formatISODate(eventDetails.data.created_at)}
                </span>
              </div>
              <hr />
              <div className="d-flex flex-column gap-1">
                <span className="font-size-sm">Updated At</span>
                <span className="font-size-sm">
                  {formatISODate(eventDetails.data.updated_at)}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
export default EventDetails;
