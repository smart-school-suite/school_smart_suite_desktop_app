import { useGetElectionStats } from "../../hooks/election/useGetElectionStats";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { NotFoundError } from "../../components/errors/Error";
import { Icon } from "@iconify/react";
import { formatISODate } from "../../utils/functions";
import TextDisplay from "../../components/TextComponents/TextDisplay";
function ElectionOverview() {
  const year = new Date().getFullYear();
  const { data: electionStats, isLoading, error } = useGetElectionStats(year);
  return (
    <>
      {isLoading ? (
        <RectangleSkeleton />
      ) : error ? (
        <NotFoundError
          title={error?.response?.data?.errors?.title}
          description={error?.response?.data?.errors?.description}
        ></NotFoundError>
      ) : (
        <section className="w-100 h-100 d-flex flex-column gap-2">
          <div className="d-flex flex-row gap-2 font-size-sm">
            <span>
              <Icon icon="octicon:info-24" width="20" height="20" />
            </span>
            <span>Overview</span>
          </div>
          <div
            style={{ height: "18%" }}
            className="d-flex flex-row gap-2 align-items-center w-100"
          >
            <div
              className="card border-none rounded-4 p-2 d-flex flex-column annoucement-stat-card h-100"
              style={{
                background: "#d0e0b6",
                color: "#344225",
                width: "33%",
              }}
            >
              <div>
                <span className="font-size-sm fw-light">Total Elections</span>
              </div>
              <div className="mt-auto fw-semibold">
                <span style={{ fontSize: "2rem" }}>
                  {electionStats.data.total_election_count_current_year}
                </span>
              </div>
            </div>
            <div
              className="card border-none rounded-4 p-2 d-flex flex-column annoucement-stat-card h-100"
              style={{
                background: "#e4e9fb",
                width: "33%",
                color: "#232145",
              }}
            >
              <div>
                <span className="font-size-sm fw-light">Active Elections</span>
              </div>
              <div className="mt-auto fw-semibold">
                <span style={{ fontSize: "2rem" }}>0</span>
              </div>
            </div>
            <div
              className="card border-none rounded-4 p-2 d-flex flex-column annoucement-stat-card h-100"
              style={{
                background: "#f3ecf2",
                color: "#36212f",
                width: "33%",
              }}
            >
              <div>
                <span className="font-size-sm fw-light">
                  Total Election Roles
                </span>
              </div>
              <div className="mt-auto fw-semibold">
                <span style={{ fontSize: "2rem" }}>
                  {electionStats.data.total_election_roles_count}
                </span>
              </div>
            </div>
          </div>
          <div style={{ height: "67%" }}>
            <div className="d-flex flex-row align-items-center gap-2 w-100 h-100">
              <div className="w-50 d-flex flex-column h-100 gap-2">
                <span className="font-size-sm">Upcoming Elections</span>
                <div className="announcement-dashboard-content d-flex flex-column gap-2 px-1">
                  {electionStats.data.upcoming_elections.map((items) => (
                    <div className="card border-none shadow-sm font-size-sm bg-white rounded-4 p-2 d-flex flex-column gap-3">
                      <div className="d-flex flex-row align-items-center">
                        <div className="text-wrap" style={{ width: "75%" }}>
                          <span className="font-size-sm fw-semibold">
                            {items.election_type.election_title}
                          </span>
                        </div>
                        <div className="d-flex flex-row justify-content-end" style={{ width:"25%" }}>
                            <div className="primary-background-50 px-2 rounded-pill color-primary text-center">
                          <span className="font-size-xs">application open</span>
                        </div>
                        </div>
                      </div>
                      <TextDisplay
                        content={items.election_type.description}
                        maxLength={300}
                        textStyle={"gainsboro-color fw-light"}
                        readMeStyle={"fw-semibold text-dark"}
                      />
                      <div className="d-flex flex-column gap-1">
                        <span className="font-size-xs">Application window</span>
                        <div className="d-flex flex-row align-items-center gap-2 font-size-sm fw-medium">
                        <Icon icon="solar:calendar-linear" />
                        <span>{formatISODate(items.application_start)}</span>
                        <Icon icon="radix-icons:dash" width="15" height="15" />
                        <span>{formatISODate(items.application_end)}</span>
                      </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-50 d-flex flex-column h-100 gap-2">
                <span className="font-size-sm">Live Elections</span>
                <div className="announcement-dashboard-content d-flex flex-column gap-2 px-1">
                  {electionStats.data.upcoming_elections.map((items) => (
                    <div className="card border-none shadow-sm font-size-sm bg-white rounded-4 p-2 d-flex flex-column gap-3">
                      <div className="d-flex flex-row align-items-center">
                        <div className="text-wrap" style={{ width: "75%" }}>
                          <span className="font-size-sm fw-semibold">
                            {items.election_type.election_title}
                          </span>
                        </div>
                        <div className="d-flex flex-row justify-content-end" style={{ width:"25%" }}>
                            <div className="px-2 rounded-pill text-center"
                            style={{
                                 background:"#fff0f0",
                                 color:"#ff2323"
                            }}
                            >
                          <span className="font-size-xs fw-medium">vote ongoing</span>
                        </div>
                        </div>
                      </div>
                      <TextDisplay
                        content={items.election_type.description}
                        maxLength={300}
                        textStyle={"gainsboro-color fw-light"}
                        readMeStyle={"fw-semibold text-dark"}
                      />
                      <div className="d-flex flex-column gap-1">
                        <span className="font-size-xs">voting window</span>
                        <div className="d-flex flex-row align-items-center gap-2 font-size-sm fw-medium">
                        <Icon icon="solar:calendar-linear" />
                        <span>{formatISODate(items.voting_start)}</span>
                        <Icon icon="radix-icons:dash" width="15" height="15" />
                        <span>{formatISODate(items.voting_end)}</span>
                      </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
export default ElectionOverview;
