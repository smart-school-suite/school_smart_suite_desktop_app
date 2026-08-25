import { useGetHallDetail } from "../../hooks/hall/useGetHallDetail";
import { Icon } from "@iconify/react";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { Fragment } from "react";
import { format, parseISO } from "date-fns";
import HorizontalDashedLine from "../../components/DashedLine/HorizonetalDashedLine";
function HallDetails({ handleClose, drawerData }) {
  const {
    data: hallDetails,
    isLoading,
    error,
  } = useGetHallDetail(drawerData.id);
  return (
    <>
      <div
        className="font-size-sm d-flex flex-column gap-4 pt-2"
        style={{ flex: 1, minHeight: 0 }}
      >
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
            <div className="drawer-content px-2">
              <div className="d-flex flex-column gap-3">
                <div className="d-flex flex-column gap-1">
                  <span className="font-size-sm">Hall Name</span>
                  <span className="font-size-sm fw-medium">
                    {hallDetails?.data?.name}
                  </span>
                </div>
                <HorizontalDashedLine
                  dashed={false}
                  color="#ccc"
                  thickness={0.5}
                />
                <div className="d-flex flex-column gap-1">
                  <span className="font-size-sm">Hall Capacity</span>
                  <span className="font-size-sm fw-medium">
                    {hallDetails?.data?.capacity}
                  </span>
                </div>
                <HorizontalDashedLine
                  dashed={false}
                  color="#ccc"
                  thickness={0.5}
                />
                <div className="d-flex flex-column gap-1">
                  <span className="font-size-sm">Hall Location</span>
                  <span className="font-size-sm fw-medium">
                    {hallDetails?.data?.location}
                  </span>
                </div>
                <HorizontalDashedLine
                  dashed={false}
                  color="#ccc"
                  thickness={0.5}
                />
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
                            "d MMM yyyy, h:mm a",
                          )
                        : "N/A"}
                    </span>
                  </div>
                </div>
                <HorizontalDashedLine
                  dashed={false}
                  color="#ccc"
                  thickness={0.5}
                />
                <div className="d-flex flex-column gap-1">
                  <span className="font-size-sm">Updated At</span>
                  <span className="font-size-sm fw-medium">
                    {hallDetails?.data?.updated_at
                      ? format(
                          parseISO(hallDetails.data.updated_at),
                          "d MMM yyyy, h:mm a",
                        )
                      : "N/A"}
                  </span>
                </div>
              </div>
            </div>
            <div className="drawer-footer font-size-sm">
              <div className="d-flex flex-column w-100">
                <HorizontalDashedLine
                  dashed={false}
                  color="#ccc"
                  thickness={0.5}
                />
                <div className="d-flex flex-row align-items-center justify-content-between py-3 px-2">
                  <button
                    className="border-none bg-none"
                    onClick={() => handleClose()}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
export default HallDetails;
