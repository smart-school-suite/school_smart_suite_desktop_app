import { ChartLine, Clock, Dot, UserRoundGroup, Users, Vote } from "lucide-react";
import { useSelector } from "react-redux";
function LiveElection() {
  const moduleState = useSelector((state) => state?.election?.voting);
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
        <div className="card border-none border p-2 rounded-3 d-flex flex-column gap-2">
          <div className="d-flex flex-row align-items-center justify-content-between">
            <div className="d-flex flex-column gap-2">
              <div className="d-flex flex-column">
                <span className="fw-light text-iron-400">
                  ELECTIONS / LIVE MONITOR
                </span>
                <span className="fw-medium">{context?.election_title}</span>
              </div>
              <div className="d-flex flex-row align-items-center fw-light">
                <div className="d-flex flex-row align-items-center gap-2">
                  <Users size={16} strokeWidth={1.25} />
                  <span>Candidates</span>
                </div>
                <Dot size={16} />
                <span>45</span>
              </div>
            </div>
            <div className="d-flex flex-column align-items-end gap-1">
              <div className="d-flex flex-row align-items-center gap-2">
                <span
                  style={{ width: "fit-content", fontSize: "0.75rem" }}
                  className="bg-fern-100 pe-2 rounded-2 text-fern-700 fw-semibold d-flex flex-row align-items-center text-uppercase"
                >
                  <Dot size={16} />
                  Live
                </span>
                <span className="text-fern-500">Live Updates Connected</span>
              </div>
              <span className="text-iron-500">Last updated just now</span>
            </div>
          </div>
        </div>
        <div style={gridStyle} className="gap-2">
          <div
            className="card border-none border p-2 d-flex flex-column gap-5"
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
                <UserRoundGroup size={16} strokeWidth={1.50}/>
              </span>
            </div>
            <span className="font-size-lg mt-auto fw-semibold">1,400</span>
          </div>
          <div
            className="card border-none border p-2 d-flex flex-column gap-5"
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
                <Vote size={16}/>
              </span>
            </div>
            <span className="font-size-lg mt-auto fw-semibold">1,400</span>
          </div>
          <div
            className="card border-none border p-2 d-flex flex-column gap-5"
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
            className="card border-none border p-2 d-flex flex-column gap-5"
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
                <Clock size={16}/>
              </span>
            </div>
            <span className="font-size-lg mt-auto fw-semibold">1,400</span>
          </div>
        </div>
      </main>
    </>
  );
}
export default LiveElection;
