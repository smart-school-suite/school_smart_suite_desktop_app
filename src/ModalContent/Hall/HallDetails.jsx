import { useGetHallDetail } from "../../hooks/hall/useGetHallDetail";
import { Icon } from "@iconify/react";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { Fragment } from "react";
import { format, parseISO } from 'date-fns';
function HallDetails({ handleClose, rowData }) {
  const { data: hallDetails, isLoading, error } = useGetHallDetail(rowData.id);
  return (
    <>
      <div className="d-flex flex-column gap-3">
        <div className="d-flex flex-row align-items-center justify-content-between w-100">
          <span className="m-0">Hall Details</span>
          <span
            className="m-0"
            onClick={() => {
              handleClose();
            }}
          >
            <Icon icon="charm:cross" width="22" height="22" />
          </span>
        </div>
        <div className="modal-content-container">
          {isLoading ? (
            <div className="d-flex flex-column gap-2">
              {[...Array(4)].map((_, index) => (
                <Fragment key={index}>
                  <RectangleSkeleton width="30%" height="1dvh" />
                  <RectangleSkeleton width="100%" height="4dvh" />
                </Fragment>
              ))}
            </div>
          ) : error ? (
            <NotFoundError
              title={error?.response?.data?.errors?.title}
              description={error?.response?.data?.errors?.description}
            ></NotFoundError>
          ) : (
            <>
              <div className="d-flex flex-column gap-1">
                <div className="d-flex flex-column gap-1">
                  <span className="font-size-sm">Hall Name</span>
                  <span className="font-size-sm fw-medium">
                    {hallDetails?.data?.name}
                  </span>
                </div>
                <hr />
                <div className="d-flex flex-column gap-1">
                  <span className="font-size-sm">Hall Capacity</span>
                  <span className="font-size-sm fw-medium">
                    {hallDetails?.data?.capacity}
                  </span>
                </div>
                <hr />
                <div className="d-flex flex-column gap-1">
                  <span className="font-size-sm">Hall Location</span>
                  <span className="font-size-sm fw-medium">
                    {hallDetails?.data?.location}
                  </span>
                </div>
                <hr />
                <div className="d-flex flex-column gap-3">
                  <div className="d-flex flex-column gap-1">
                    <span className="font-size-sm">Hall Type</span>
                    <div className="d-flex flex-row align-items-center flex-wrap gap-2">
                      {hallDetails?.data?.types?.map((items) => (
                        <Fragment key={items.id}>
                          <span
                            className="pill-hall-state"
                            style={{
                              background: `${items.background_color}`,
                              color: `${items.text_color}`,
                            }}
                          >
                            {items.name}
                          </span>
                        </Fragment>
                      ))}
                    </div>
                  </div>
                  <span className="font-size-sm gainsboro-color">
                    System Info
                  </span>
                  <div className="d-flex flex-column gap-1">
                    <span className="font-size-sm">Created At</span>
                    <span className="font-size-sm fw-medium">
                       {hallDetails?.data?.created_at
                      ? format(
                          parseISO(hallDetails.data.updated_at),
                          "d MMM yyyy, h:mm a"
                        )
                      : "N/A"}
                    </span>
                  </div>
                </div>
                <hr />
                <div className="d-flex flex-column gap-1">
                  <span className="font-size-sm">Updated At</span>
                  <span className="font-size-sm fw-medium">
                    {hallDetails?.data?.updated_at
                      ? format(
                          parseISO(hallDetails.data.updated_at),
                          "d MMM yyyy, h:mm a"
                        )
                      : "N/A"}
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
export default HallDetails;
