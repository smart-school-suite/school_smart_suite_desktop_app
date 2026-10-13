import {
  ArrowLeft,
  ChartLine,
  Clock,
  Dot,
  UserRoundGroup,
  Vote,
} from "lucide-react";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import HorizontalDashedLine from "../../components/DashedLine/HorizonetalDashedLine";
import SearchInput from "../../components/input/search";
import { resetVoteContext } from "../../Slices/election/electionSlice";
function LiveElection() {
  const moduleState = useSelector((state) => state?.election?.voting);
  const dispatch = useDispatch();
  const context = moduleState.context;
  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
  };
  // const userData = useSelector((state) => state.auth.user);
  // const token = useSelector((state) => state.auth.token);
  // const echo = useMemo(() => createEcho(token), [token]);
  // useEffect(() => {
  //   if (electionResults?.data?.election_result) {
  //     setResults(electionResults?.data?.election_result);
  //   }
  //   const channel = echo.private(
  //     `election.results.${userData?.schoolDetails?.id}.${liveElection?.election_id}`
  //   );
  //   channel.listen("VoteCastEvent", (vote) => {
  //     setResults((prev) => {
  //       const prevResults = [...prev];
  //       const categories = prevResults.find((candidates) => candidates.role_id == vote.position_id)
  //       categories.has_user_voted = true
  //       const candidates = categories.candidates.find(
  //           (items) =>
  //             items.candidate_id == vote.candidate_id &&
  //             items.position_id == vote.position_id
  //         );
  //       candidates.vote_count = vote.vote_count;
  //       candidates.user_voted_for_candidate = true;
  //       return prevResults;
  //     });
  //   });
  //   return () => {
  //     echo.leave(
  //       `election.results.${userData.school_branch_id}.${liveElection.election_id}`
  //     );
  //   };
  // }, [liveElection.election_id, echo, electionResults]);
  return (
    <>
      <main className="font-size-sm d-flex flex-column gap-2">
        <div className="card border-none border p-2 rounded-3 d-flex flex-column gap-4">
          <div
            className="d-flex flex-row align-items-center text-iron-500 pointer-cursor gap-2 border-bottom"
            style={{ width: "fit-content" }}
            onClick={() => {
              dispatch(resetVoteContext());
            }}
          >
            <ArrowLeft size={16} />
            <span>Election Management</span>
          </div>
          <div className="d-flex flex-row align-items-start justify-content-between">
            <div className="d-flex flex-column gap-2">
              <div className="d-flex flex-row align-items-center gap-2 ">
                <div
                  style={{
                    width: "2.4rem",
                    height: "2.4rem",
                    display: "grid",
                    placeItems: "center",
                  }}
                  className="bg-primary-100 rounded-3 text-primary-500"
                >
                  <span>
                    <Vote size={16} />
                  </span>
                </div>
                <div className="d-flex flex-column">
                  <span className="fw-light text-iron-400">
                    ELECTIONS / LIVE MONITOR
                  </span>
                  <span className="fw-medium">
                    {context?.election_title} {context?.school_year}
                  </span>
                </div>
              </div>
            </div>
            <div className="d-flex flex-column align-items-end gap-1">
              <div className="d-flex flex-row align-items-center gap-2">
                <span
                  style={{ width: "fit-content", fontSize: "0.75rem" }}
                  className="bg-fern-100 pe-2 rounded-2 text-fern-700 fw-semibold d-flex flex-row align-items-center text-uppercase"
                >
                  <Dot size={16} />
                  Voting Open
                </span>
              </div>
            </div>
          </div>
        </div>
        <div style={gridStyle} className="gap-2">
          <div
            className="card border-none border p-2 d-flex flex-column gap-4"
            style={{ borderRadius: "0.75rem" }}
          >
            <div className="d-flex flex-row align-items-center justify-content-between">
              <span className="text-iron-500">Eligible Voters</span>
              <span
                style={{
                  width: "2rem",
                  height: "2rem",
                  display: "grid",
                  placeItems: "center",
                }}
                className="bg-iron-100 rounded-circle text-iron-500"
              >
                <UserRoundGroup size={16} strokeWidth={1.5} />
              </span>
            </div>
            <span className="font-size-lg mt-auto fw-semibold">1,400</span>
          </div>
          <div
            className="card border-none border p-2 d-flex flex-column gap-4"
            style={{ borderRadius: "0.75rem" }}
          >
            <div className="d-flex flex-row align-items-center justify-content-between">
              <span className="text-iron-500">Vote Cast</span>
              <span
                style={{
                  width: "2rem",
                  height: "2rem",
                  display: "grid",
                  placeItems: "center",
                }}
                className="bg-iron-100 rounded-circle text-iron-500"
              >
                <Vote size={16} />
              </span>
            </div>
            <span className="font-size-lg mt-auto fw-semibold">1,400</span>
          </div>
          <div
            className="card border-none border p-2 d-flex flex-column gap-4"
            style={{ borderRadius: "0.75rem" }}
          >
            <div className="d-flex flex-row align-items-center justify-content-between">
              <span className="text-iron-500">Voter Turn Out</span>
              <span
                style={{
                  width: "2rem",
                  height: "2rem",
                  display: "grid",
                  placeItems: "center",
                }}
                className="bg-iron-100 rounded-circle text-iron-500"
              >
                <ChartLine size={16} />
              </span>
            </div>
            <span className="font-size-lg mt-auto fw-semibold">69.1 %</span>
          </div>
          <div
            className="card border-none border p-2 d-flex flex-column gap-4"
            style={{ borderRadius: "0.75rem" }}
          >
            <div className="d-flex flex-row align-items-center justify-content-between">
              <span className="text-iron-500">Time Remaining</span>
              <span
                style={{
                  width: "2rem",
                  height: "2rem",
                  display: "grid",
                  placeItems: "center",
                }}
                className="bg-iron-100 rounded-circle text-iron-500"
              >
                <Clock size={16} />
              </span>
            </div>
            <span className="font-size-lg mt-auto fw-semibold">1,400</span>
          </div>
        </div>
        <div className="d-flex flex-column gap-4">
          <div className="d-flex flex-row align-items-center justify-content-between">
            <div className="d-flex flex-column">
              <span className="fw-medium font-size-sm">
                Election Candidates
              </span>
              <span className="text-iron-400">
                Votes are subject to constant changes
              </span>
            </div>
            <div className="w-50">
              <SearchInput
                placeholder={"Search, candidate name, level, specialty"}
              />
            </div>
          </div>
          <div className="d-flex flex-column gap-2">
            <span className="fw-semibold font-size-md">Student Union President</span>
            <div style={gridStyle} className="gap-2">
              {[...Array(4)].map((_, index) => (
                <Fragment key={index}>
                  <div className="card rounded-3 border-none border">
                    <div className="w-100" style={{ height: "250px" }}>
                      <div className="w-100 h-100 d-flex flex-column align-items-center bg-primary-50 text-primary-400 justify-content-center rounded-top-3 ">
                        <span style={{ fontSize: "4rem" }}>IC</span>
                      </div>
                    </div>
                    <div className="p-2 d-flex flex-column gap-2">
                      <div className="d-flex flex-column">
                        <span className="fw-semibold">Chongong Precious</span>
                        <div
                          className="d-flex flex-row align-items-center gap-1 text-iron-400 fw-light"
                          style={{ fontSize: "0.7rem" }}
                        >
                          <span>Software Engineering</span>
                          <Dot />
                          <span>Level 200 (400)</span>
                        </div>
                      </div>
                      <HorizontalDashedLine
                        dashed={false}
                        color="#ccc"
                        thickness={0.3}
                      />
                      <div className="d-flex flex-row align-items-center justify-content-between">
                        <div className="d-flex flex-row align-items-baseline gap-1">
                          <span className="fw-semibold font-size-lg">400</span>
                          <span className="font-size-sm text-iron-500">
                            Votes
                          </span>
                        </div>
                        <button
                          style={{ width: "2.5rem", height: "2.5rem" }}
                          className="border-none rounded-2"
                        ></button>
                      </div>
                    </div>
                  </div>
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
export default LiveElection;
