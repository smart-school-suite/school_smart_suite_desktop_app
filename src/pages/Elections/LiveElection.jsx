import { NotFoundError } from "../../components/errors/Error";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { useCastVote } from "../../hooks/election/useCastVote";
import { Icon } from "@iconify/react";
import { useSelector } from "react-redux";
import { useEffect, useState, useMemo } from "react";
import createEcho from "../../echo/echo";
import NumberFlow from "@number-flow/react";
import { useGetLiveElectionResults } from "../../hooks/election/useGetLiveElectionResult";
import toast from "react-hot-toast";
import ToastWarning from "../../components/Toast/ToastWarning";
function LiveElection({ liveElection }) {
  const { mutate: castVote } = useCastVote(liveElection.election_id);
  const [results, setResults] = useState([]);
  const {
    data: electionResults,
    error,
    isLoading,
  } = useGetLiveElectionResults(liveElection.election_id);
  const userData = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const echo = useMemo(() => createEcho(token), [token]);
  useEffect(() => {
    if (electionResults?.data?.election_result) {
      setResults(electionResults?.data?.election_result);
    }
    const channel = echo.private(
      `election.results.${userData?.schoolDetails?.id}.${liveElection?.election_id}`
    );
    channel.listen("VoteCastEvent", (vote) => {
      setResults((prev) => {
        const prevResults = [...prev];
        const categories = prevResults.find((candidates) => candidates.role_id == vote.position_id)
        categories.has_user_voted = true
        const candidates = categories.candidates.find(
            (items) =>
              items.candidate_id == vote.candidate_id &&
              items.position_id == vote.position_id
          );
        candidates.vote_count = vote.vote_count;
        candidates.user_voted_for_candidate = true;
        return prevResults;
      });
    });
    return () => {
      echo.leave(
        `election.results.${userData.school_branch_id}.${liveElection.election_id}`
      );
    };
  }, [liveElection.election_id, echo, electionResults]);
  const handleCastVote = (data) => {
    castVote(data);
  };
  return (
    <>
      {isLoading ? (
        <div className="container">
          <div className="row">
            <div className="col-4 my-1">
              <RectangleSkeleton height="40dvh" width="100%" speed={0.5} />
            </div>
            <div className="col-4 my-1">
              <RectangleSkeleton height="40dvh" width="100%" speed={0.5} />
            </div>
            <div className="col-4 my-1">
              <RectangleSkeleton height="40dvh" width="100%" speed={0.5} />
            </div>
          </div>
          <div className="row">
            <div className="col-4 my-1">
              <RectangleSkeleton height="40dvh" width="100%" speed={0.5} />
            </div>
            <div className="col-4 my-1">
              <RectangleSkeleton height="40dvh" width="100%" speed={0.5} />
            </div>
            <div className="col-4 my-1">
              <RectangleSkeleton height="40dvh" width="100%" speed={0.5} />
            </div>
          </div>
        </div>
      ) : error ? (
        <NotFoundError
          title={error?.response?.data?.errors?.title}
          description={error?.response?.data?.errors?.description}
        ></NotFoundError>
      ) : (
        <div className="container h-100 w-100">
          <h5 className="text-uppercase fw-bold">
            {electionResults?.data?.election?.election_type?.election_title}
          </h5>
          <div className="candidate-container">
            {results?.map((categories) => (
              <div className="row" key={categories.role_id}>
                <span className="fw-medium my-1">{categories.role_name}</span>
                {sortCandidatesByVotes(categories?.candidates).map((candidate) => (
                  <div className="col-lg-4" key={candidate.candidate_id}>
                    <div className="card rounded-4 border-none shadow-sm d-flex flex-column gap-4 my-1">
                      <div className="position-relative">
                        <img
                          src={
                            candidate.student_profile_picture
                              ? ``
                              : "./images/user.png"
                          }
                          alt=""
                          className="rounded-top-3"
                          style={{
                            width: "100%",
                            height: "25dvh",
                            objectFit: "contain",
                          }}
                        />
                      </div>
                      <div className="p-2  d-flex flex-column gap-3">
                        <div className="d-flex flex-column">
                          <span className="font-size-sm fw-semibold">
                            {candidate.student_name}
                          </span>
                          <span className="gainsboro-color font-size-sm">
                            {candidate?.specialty_name || "N/A"}, Level{" "}
                            {candidate.level}
                          </span>
                        </div>
                        <div className="d-flex flex-row align-items-center w-100 justify-content-between">
                          <div className="d-flex flex-row align-items-center gap-1">
                            <h3 className="fw-semibold m-0 p-0">
                              {<NumberFlow value={candidate.vote_count} />}
                            </h3>
                            <span className="m-0 p-0 font-size-sm">votes</span>
                          </div>
                          <div>
                            <button
                              style={{
                                border: "none",
                                background: "transparent",
                                outline: "none",
                              }}
                              onClick={() => {
                                 if(categories.has_user_voted){
                                     toast.custom(
                                       <ToastWarning 
                                         title={"Vote Limit Reached"}
                                         description={"You’ve already cast your vote for this position. Please choose a different position to keep the voting fair and transparent. Thank you!"}
                                       />
                                     )
                                     return 
                                 }
                                 handleCastVote({
                                  candidate_id: candidate.candidate_id,
                                  position_id: candidate.position_id,
                                  election_id: liveElection.election_id,
                                });
                              }}
                            >
                             {
                              candidate.user_voted_for_candidate ? (
                                 <Icon icon="mynaui:heart-solid" width="24" height="24" 
                                   style={{ color:"#ff9494" }}
                                 />
                              ) : (
                                 <Icon icon="mynaui:heart" width="24" height="24" />
                              )
                             }
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
export default LiveElection;

const sortCandidatesByVotes = (candidates) => {
    if (!candidates) return []; 
    return candidates.slice().sort((a, b) => {
        return b.vote_count - a.vote_count;
    });
};
