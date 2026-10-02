import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { useGetAnnouncementDetails } from "../../hooks/announcement/useGetAnnouncementDetails";
import { NotFoundError } from "../../components/errors/Error";
import { Fragment } from "react";
import HorizontalDashedLine from "../../components/DashedLine/HorizonetalDashedLine";
import { getDayWindow, getTimeRemaining } from "../../utils/time/date";
import { format, parseISO } from "date-fns";
import { Megaphone } from "lucide-react";
function AnnouncementDetails({ handleClose, drawerData }) {
  const { id: announcementId } = drawerData;
  const {
    data: announcementDetails,
    isLoading,
    error,
  } = useGetAnnouncementDetails(announcementId);
  return (
    <>
      <div className="drawer-content pt-3 px-2 font-size-sm">
        {isLoading ? (
          <div className="d-flex flex-column gap-2">
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
                  <Megaphone size={20} />
                </div>
                <div className="d-flex flex-column gap-1">
                  <span className="fw-medium">
                    {announcementDetails?.data?.announcement_category?.name}
                  </span>
                  <span
                    className="d-flex flex-row align-items-center px-2 rounded-pill "
                    style={{
                      background: announcementDetails?.data?.announcement_label
                        ?.color
                        ? JSON?.parse(
                            announcementDetails?.data?.announcement_label
                              ?.color,
                          ).color_light
                        : "",
                      color: announcementDetails?.data?.announcement_label
                        ?.color
                        ? JSON?.parse(
                            announcementDetails?.data?.announcement_label
                              ?.color,
                          ).color_thick
                        : "",
                      fontSize: "0.65rem",
                      width: "fit-content",
                    }}
                  >
                    {announcementDetails?.data?.announcement_label?.name}
                  </span>
                </div>
              </div>
              <span
                className="d-flex flex-row align-items-center px-2 rounded-pill primary-background-100 text-primary-500"
                style={{
                  fontSize: "0.65rem",
                  width: "fit-content",
                }}
              >
                {announcementDetails?.data?.status}
              </span>
            </div>
            <div className="d-flex flex-column gap-1">
              <span className="text-iron-400">Announcement Title</span>
              <span className="fw-medium">
                {announcementDetails?.data?.title}
              </span>
            </div>
            <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.2} />
            <div className="d-flex flex-column gap-1">
              <span className="text-iron-400">Announcement Content</span>
              <span className="fw-light">
                {announcementDetails?.data?.content}
              </span>
              <div className="d-flex flex-row align-items-center gap-1 flex-wrap">
                {announcementDetails?.data?.tags
                  ? JSON.parse(announcementDetails?.data?.tags).map((tag) => (
                      <Fragment key={tag?.id}>
                        <span
                          className="primary-background-100 color-primary rounded-pill px-2"
                          style={{ fontSize: "0.7rem" }}
                        >
                          {tag?.name}
                        </span>
                      </Fragment>
                    ))
                  : null}
              </div>
            </div>
            <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.2} />
            <div className="d-flex flex-column gap-1">
              <span className="text-iron-400">Announcement Category</span>
              <span className="fw-medium">
                {announcementDetails?.data?.announcement_category?.name}
              </span>
              <span className="text-iron-400 fw-light">
                {announcementDetails?.data?.announcement_category?.description}
              </span>
            </div>
            <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.2} />
            <div className="d-flex flex-column gap-1">
              <span className="text-iron-400">Expiration Date</span>
              <span className="fw-medium">
                {format(
                  parseISO(announcementDetails?.data?.expires_at),
                  "MMM d, yyyy",
                )}
              </span>
            </div>
            <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.2} />
            <div className="d-flex flex-column gap-1">
              <span className="text-iron-400">Publish Date</span>
              <span className="fw-medium">
                {format(
                  parseISO(announcementDetails?.data?.published_at),
                  "MMM d, yyyy",
                )}
              </span>
            </div>
            <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.2} />
            <span className="text-iron-400">System Info</span>
            <div className="d-flex flex-column gap-1">
              <span className="text-iron-400">Created At</span>
              <span className="fw-medium">
                {format(
                  parseISO(announcementDetails?.data?.created_at),
                  "MMM d, yyyy",
                )}
              </span>
            </div>
            <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.2} />
            <div className="d-flex flex-column gap-1">
              <span className="text-iron-400">Updated At</span>
              <span className="fw-medium">
                {format(
                  parseISO(announcementDetails?.data?.updated_at),
                  "MMM d, yyyy",
                )}
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
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default AnnouncementDetails;
