import HorizontalDashedLine from "../../components/DashedLine/HorizonetalDashedLine";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { NotFoundError } from "../../components/errors/Error";
import { useGetAnnouncementEngagementStats } from "../../hooks/announcement/useGetAnnouncementEngagementStats";
import { Megaphone, Eye, EyeOff, Users, Dot, Clock, Check } from "lucide-react";
import { ProgressBar } from "react-bootstrap";
import SearchInput from "../../components/input/search";
import { formatNumber, isLastElement } from "../../utils/functions";
import { Fragment } from "react";
function EngagementStats({ drawerData, handleClose }) {
  const { id: announcementId } = drawerData;
  const {
    data: stats,
    isLoading,
    error,
  } = useGetAnnouncementEngagementStats(announcementId);
  return (
    <>
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
        <>
          <div className="d-flex flex-row align-items-center justify-content-between font-size-sm px-2 py-2">
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
              <div className="d-flex flex-column">
                <span className="fw-medium">
                  {stats?.data?.announcement?.title}
                </span>
                <div className="d-flex flex-row align-items-center gap-2">
                  <span
                    className="d-flex flex-row align-items-center px-2 rounded-pill "
                    style={{
                      background: stats?.data?.announcement?.announcement_label
                        ?.color
                        ? JSON?.parse(
                            stats?.data?.announcement?.announcement_label
                              ?.color,
                          ).color_light
                        : "",
                      color: stats?.data?.announcement?.announcement_label
                        ?.color
                        ? JSON?.parse(
                            stats?.data?.announcement?.announcement_label
                              ?.color,
                          ).color_thick
                        : "",
                      fontSize: "0.65rem",
                      width: "fit-content",
                    }}
                  >
                    {stats?.data?.announcement?.announcement_label?.name}
                  </span>
                  <Dot size={12} />
                  <span className="fw-light text-iron-400">
                    {stats?.data?.announcement?.announcement_category?.name}
                  </span>
                </div>
              </div>
            </div>
            <span
              className="d-flex flex-row align-items-center px-2 rounded-pill primary-background-100 text-primary-500"
              style={{
                fontSize: "0.65rem",
                width: "fit-content",
              }}
            >
              active
            </span>
          </div>
          <HorizontalDashedLine dashed={false} color={"#ccc"} thickness={0.3} />
          <div className="drawer-content  font-size-sm pt-2">
            <div className="d-flex flex-column gap-3">
              <div
                className="d-grid gap-2 px-1 pt-2"
                style={{ gridTemplateColumns: "repeat(3, 1fr)" }}
              >
                <div
                  className="d-flex flex-column card p-2 border-none border"
                  style={{ height: "14dvh", borderRadius: "0.8rem" }}
                >
                  <div className="d-flex flex-row align-items-center justify-content-between fw-medium">
                    <span className="fw-light">Reached</span>
                    <span
                      style={{ width: " 1.8rem", height: "1.8rem" }}
                      className="d-flex flex-row align-items-center justify-content-center rounded-circle primary-background-100 text-primary-500"
                    >
                      <Users size={14} />
                    </span>
                  </div>
                  <div className="mt-auto">
                    <span className="font-size-lg fw-semibold">
                      {formatNumber(stats?.data?.total_recipients)}
                    </span>
                  </div>
                </div>

                <div
                  className="d-flex flex-column card p-2 border-none border"
                  style={{ height: "14dvh", borderRadius: "0.8rem" }}
                >
                  <div className="d-flex flex-row align-items-center justify-content-between fw-medium">
                    <span className="fw-light">Viewed</span>
                    <span
                      style={{ width: " 1.8rem", height: "1.8rem" }}
                      className="d-flex flex-row align-items-center justify-content-center rounded-circle primary-background-100 text-primary-500"
                    >
                      <Eye size={14} />
                    </span>
                  </div>
                  <div className="mt-auto">
                    <span className="font-size-lg fw-semibold">
                      {formatNumber(stats?.data?.seen_count)}
                    </span>
                  </div>
                </div>

                <div
                  className="d-flex flex-column card p-2 rounded-3 border-none border"
                  style={{ height: "14dvh", borderRadius: "0.8rem" }}
                >
                  <div className="d-flex flex-row align-items-center justify-content-between fw-medium">
                    <span className="fw-light">Not Viewed</span>
                    <span
                      className="d-flex flex-row align-items-center justify-content-center rounded-circle primary-background-100 text-primary-500"
                      style={{ width: " 1.8rem", height: "1.8rem" }}
                    >
                      <EyeOff size={14} />
                    </span>
                  </div>
                  <div className="mt-auto">
                    <span className="font-size-lg fw-semibold">
                      {formatNumber(stats?.data?.unseen_count)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="d-flex flex-column gap-2 px-2 mb-3">
                <span className="text-iron-400 fw-light">
                  Audience Breakdown
                </span>
                <div className="d-flex flex-column gap-3">
                  <div className="d-flex flex-column gap-1">
                    <div className="d-flex flex-row justify-content-between">
                      <div className="d-flex flex-row align-items-center gap-2">
                        <span className="fw-medium">Students</span>
                        <Dot size={12} />
                        <span className="fw-light">
                          {formatNumber(stats?.data?.student_stats?.total)}
                        </span>
                      </div>
                      <span
                        className="fw-semibold"
                        style={{ color: "#40769a" }}
                      >
                        {stats?.data?.student_stats?.seen_percentage} % Viewed
                      </span>
                    </div>
                    <ProgressBar style={{ height: "0.2rem" }}>
                      <ProgressBar
                        now={stats?.data?.student_stats?.seen_percentage}
                        style={{ backgroundColor: "#90b8d0" }}
                      />
                    </ProgressBar>
                  </div>

                  <div className="d-flex flex-column gap-1">
                    <div className="d-flex flex-row justify-content-between">
                      <div className="d-flex flex-row align-items-center gap-2">
                        <span className="fw-medium">Teachers</span>
                        <Dot size={12} />
                        <span className="fw-light">
                          {formatNumber(stats?.data?.teacher_stats?.total)}
                        </span>
                      </div>
                      <span
                        className="fw-semibold"
                        style={{ color: "#8480d4" }}
                      >
                        {stats?.data?.teacher_stats?.seen_percentage} % Viewed
                      </span>
                    </div>
                    <ProgressBar style={{ height: "0.2rem" }}>
                      <ProgressBar
                        now={stats?.data?.teacher_stats?.seen_percentage}
                        style={{ backgroundColor: "#b7bcea" }}
                      />
                    </ProgressBar>
                  </div>

                  <div className="d-flex flex-column gap-1">
                    <div className="d-flex flex-row justify-content-between">
                      <div className="d-flex flex-row align-items-center gap-2">
                        <span className="fw-medium">Admins</span>
                        <Dot size={12} />
                        <span className="fw-light">
                          {formatNumber(stats?.data?.admin_stats?.total)}
                        </span>
                      </div>
                      <span
                        className="fw-semibold"
                        style={{ color: "#5b8fff" }}
                      >
                        {stats?.data?.admin_stats?.seen_percentage} % Viewed
                      </span>
                    </div>
                    <ProgressBar style={{ height: "0.2rem" }}>
                      <ProgressBar
                        now={stats?.data?.admin_stats?.seen_percentage}
                        style={{ backgroundColor: "#8ab9ff" }}
                      />
                    </ProgressBar>
                  </div>
                </div>
              </div>

              <HorizontalDashedLine
                dashed={false}
                color={"#ccc"}
                thickness={0.3}
              />

              <div className="d-flex flex-column gap-2 px-2">
                <span className="text-iron-400 fw-light">Recipients</span>
                <div className="d-flex flex-column gap-3">
                  <SearchInput placeholder="Search recipients..." />
                  <div className="d-flex flex-column gap-3">
                    {stats?.data?.recipients?.map((r, index) => (
                      <Fragment>
                        <div className="d-flex flex-row align-items-center justify-content-between">
                          <div className="d-flex flex-row align-items-center gap-2">
                            <div
                              style={{
                                width: "2.5rem",
                                height: "2.5rem",
                                display: "grid",
                                placeItems: "center",
                                flexShrink: 0,
                              }}
                              className="rounded-circle primary-background-100 color-primary 
                         d-flex align-items-center justify-content-center fw-semibold
                          overflow-hidden"
                            >
                              <span>
                                {getInitials(r?.first_name, r?.last_name)}
                              </span>
                            </div>
                            <div className="d-flex flex-column">
                              <div className="d-flex flex-row align-items-center gap-2">
                                <span className="fw-medium">{r?.name}</span>
                                <span
                                  className="d-flex flex-row align-items-center px-2 rounded-pill bg-iron-100 text-iron-500"
                                  style={{
                                    fontSize: "0.65rem",
                                    width: "fit-content",
                                  }}
                                >
                                  {r?.actor_type}
                                </span>
                              </div>
                              <span className="fw-light text-iron-400">
                                @{r?.username}
                              </span>
                            </div>
                          </div>
                          {r?.seen_at ? (
                            <span
                              className="d-flex flex-row align-items-center px-1 py-1 gap-1 rounded-pill bg-fern-100 text-fern-600"
                              style={{
                                fontSize: "0.65rem",
                                width: "fit-content",
                              }}
                            >
                              <div className="d-flex flex-row align-items-center gap-1">
                                 <Check size={12} />
                                 <span>Viewed</span>
                              </div>
                              <Dot size={12} />
                              <span>2 Hours Ago</span>
                            </span>
                          ) : (
                            <span
                              className="d-flex flex-row align-items-center px-1 py-1 gap-1 rounded-pill bg-iron-100 text-iron-500"
                              style={{
                                fontSize: "0.65rem",
                                width: "fit-content",
                              }}
                            >
                              <span>
                                <Clock size={12} />
                              </span>
                              Not Viewed
                            </span>
                          )}
                        </div>
                        {!isLastElement(index, stats?.data?.recipients) && (
                          <HorizontalDashedLine
                            dashed={false}
                            color={"#ccc"}
                            thickness={0.3}
                          />
                        )}
                      </Fragment>
                    ))}
                  </div>
                </div>
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
              <div className="d-flex flex-row align-items-center justify-content-between p-2">
                <button
                  className="border-none rounded-3 bg-none font-size-sm px-3 py-2"
                  onClick={() => handleClose()}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
export default EngagementStats;

function getInitials(firstName, lastName) {
  if (!firstName || !lastName) {
    return "";
  }

  const firstInitial = firstName.charAt(0).toUpperCase();
  const lastInitial = lastName.charAt(0).toUpperCase();

  return firstInitial + lastInitial;
}
