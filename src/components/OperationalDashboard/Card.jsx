import { useGetCardStats } from "../../hooks/operationalAnalytics/useGetCardStats";
import RectangleSkeleton from "../SkeletonPageLoader/RectangularSkeleton";
import { Icon } from "@iconify/react";
import NumberFlow from "@number-flow/react";
import {
  SpecialtyIcon,
  DepartmentIcon,
  HallIcon
} from "../../icons/Icons";
function OperationalDashboardCard() {
  const { data: cardStats, isLoading, error } = useGetCardStats();
  return (
    <>
      {isLoading ? (
        <div className="d-flex flex-row justify-content-between gap-3">
          <RectangleSkeleton width="33%" height="18dvh" speed={1} />
          <RectangleSkeleton width="33%" height="18dvh" speed={1} />
          <RectangleSkeleton width="33%" height="18dvh" speed={1} />
        </div>
      ) : error ? (
        <h1>Hello World</h1>
      ) : (
        <div className="d-flex flex-row w-100 justify-content-between gap-3 align-items-center me-4">
          <div className="image-container">
            <div className="rounded-box d-flex flex-row align-items-center justify-content-center light-skyblue-bg">
              <Icon
                icon="stash:arrow-up-duotone"
                className="rotate-45 fs-5"
                style={{ color: "#142e3d" }}
              />
            </div>
            <img
              src="./images/card-one.png"
              alt=""
              className="background-image z-0"
            />
            <div className="overlay-content z-3 ps-2">
              <div className="z-3 position-absolute d-flex flex-column h-100 pb-2 pt-1">
                <div className="d-flex flex-row align-items-center gap-3 mt-1">
                  <button
                    className="border-none rounded-circle d-flex flex-row align-items-center justify-content-center"
                    style={{
                      width: "2.5rem",
                      height: "2.5rem",
                      borderRadius: "2rem",
                      backgroundColor: "#C6E3F1",
                      color: "#257ca4",
                    }}
                  >
                    <DepartmentIcon />
                  </button>
                  <span style={{ color: "#142e3d" }}>Total Department</span>
                </div>
                <div className="mt-auto">
                  <div>
                    <h4
                      className="fw-semibold ms-1"
                      style={{ color: "#142e3d" }}
                    >
                      <NumberFlow
                        value={cardStats?.data?.total_department || 0}
                      />
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="image-container">
            <div className="rounded-box d-flex flex-row align-items-center justify-content-center light-peach-bg">
              <Icon
                icon="stash:arrow-up-duotone"
                className="rotate-45 fs-5"
                style={{ color: "#430707" }}
              />
            </div>
            <img
              src="./images/card-two.png"
              alt=""
              className="background-image z-0"
            />
            <div className="overlay-content z-3 ps-2">
              <div className="z-3 position-absolute d-flex flex-column h-100 pb-2 pt-1">
                <div className="d-flex flex-row align-items-center gap-3 mt-1">
                  <button
                    className="border-none rounded-circle d-flex flex-row align-items-center justify-content-center"
                    style={{
                      width: "2.5rem",
                      height: "2.5rem",
                      borderRadius: "2rem",
                      backgroundColor: "#FFE4D5",
                      color: "#fd9d74",
                    }}
                  >
                    <SpecialtyIcon />
                  </button>
                  <span style={{ color: "#430707" }}>Total Specialty</span>
                </div>
                <div className="mt-auto">
                  <div>
                    <h4
                      className="fw-semibold ms-1"
                      style={{ color: "#430707" }}
                    >
                      <NumberFlow
                        value={cardStats?.data?.total_specialty || 0}
                      />
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="image-container ">
            <div className="rounded-box d-flex flex-row align-items-center justify-content-center cornflower-blue-bg">
              <Icon
                icon="stash:arrow-up-duotone"
                className="rotate-45 fs-5"
                style={{ color: "#272f44" }}
              />
            </div>
            <img
              src="./images/card-three.png"
              alt=""
              className="background-image z-0"
            />
            <div className="overlay-content z-3 ps-2">
              <div className="z-3 position-absolute d-flex flex-column h-100 pb-2 pt-1">
                <div className="d-flex flex-row align-items-center gap-3 mt-1">
                  <button
                    className="border-none rounded-circle d-flex flex-row align-items-center justify-content-center"
                    style={{
                      width: "2.5rem",
                      height: "2.5rem",
                      borderRadius: "2rem",
                      backgroundColor: "#9DBFDC",
                      color: "#4d6ba8",
                    }}
                  >
                    <HallIcon />
                  </button>
                  <span style={{ color: "#272f44" }}>Total Halls</span>
                </div>
                <div className="mt-auto">
                  <div>
                    <h4
                      className="fw-semibold ms-1 dark-slate-gray-color"
                      style={{ color: "#272f44" }}
                    >
                      <NumberFlow value={cardStats?.data?.total_hall || 0} />
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default OperationalDashboardCard;
