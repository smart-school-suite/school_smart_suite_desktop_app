import { useGetAnnouncementDetails } from "../../hooks/announcement/useGetAnnouncementDetails";
import { NotFoundError } from "../../components/errors/Error";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { Icon } from "@iconify/react";
import { formatISODate } from "../../utils/functions";
function AnnouncementDetails({ handleClose, rowData }) {
  const { id: announcementId } = rowData;
  const {
    data: announcementDetails,
    isLoading,
    error,
  } = useGetAnnouncementDetails(announcementId);
  return (
    <>
      <div className="d-flex flex-row align-items-center">
        <div className="d-flex flex-row align-items-center justify-content-between mb-3 w-100">
          <span className="m-0">Announcement Details</span>
          <span
            className="m-0"
            onClick={() => {
              handleClose();
            }}
          >
            <Icon icon="charm:cross" width="22" height="22" />
          </span>
        </div>
      </div>
      {isLoading ? (
        <div className="d-flex flex-column gap-2">
          <RectangleSkeleton width="100%" height="20dvh" speed={0.5} />
          <RectangleSkeleton width="100%" height="20dvh" speed={0.5} />
        </div>
      ) : error ? (
        <NotFoundError
          title={error?.response?.data?.errors?.title}
          description={error?.response?.data?.errors?.description}
        ></NotFoundError>
      ) : (
        <>
          <div className="w-100 d-flex flex-row justify-content-end">
            {announcementDetails.data.announcement_label && (
              <div
                className="py-1 px-2 d-flex align-items-center gap-1 font-size-xs rounded-pill"
                style={{
                  background: JSON.parse(
                    announcementDetails.data.announcement_label.color
                  ).color_light,
                  color: JSON.parse(
                    announcementDetails.data.announcement_label.color
                  ).color_thick,
                }}
              >
                <span>
                  {" "}
                  <Icon
                    icon={announcementDetails.data.announcement_label.icon}
                    className="font-size-sm"
                  />
                </span>
                <span>{announcementDetails.data.announcement_label.name}</span>
              </div>
            )}
          </div>
          <div className="d-flex flex-column gap-2">
            <div>
              <div className="d-flex flex-column gap-1 font-size-sm">
                <span>Title</span>
                <span className="fw-semibold">
                  {announcementDetails.data.title}
                </span>
              </div>
            </div>
            <hr />
            <div className="d-flex flex-column gap-1 font-size-sm">
              <span>Category</span>
              <span className="fw-semibold">
                {announcementDetails.data.announcement_category.name}
              </span>
            </div>
            <hr />
            <div>
              <div className="d-flex flex-column gap-1 font-size-sm">
                <span>Content</span>
                <span className="fw-semibold">
                  {announcementDetails.data.content}
                </span>
              </div>
            </div>
            <div className="d-flex flex-row flex-wrap gap-1">
              {JSON.parse(announcementDetails.data.tags).map((item) => {
                return (
                  <div
                    className="font-size-sm primary-background-50 px-4 py-2 my-1 rounded-pill color-primary"
                    key={item.id}
                  >
                    <span>{item.name || "N/A"}</span>
                  </div>
                );
              })}
            </div>
            <hr />
            <div>
              <div className="d-flex flex-column font-size-sm">
                <span>Published At</span>
                <span className="fw-semibold">
                  {formatISODate(announcementDetails.data.published_at)}
                </span>
              </div>
            </div>
            <hr />
            <div>
              <div className="d-flex flex-column font-size-sm">
                <span>Published At</span>
                <span className="fw-semibold">
                  {formatISODate(announcementDetails.data.expires_at)}
                </span>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
export default AnnouncementDetails;
