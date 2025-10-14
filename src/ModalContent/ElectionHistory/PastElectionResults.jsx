import { useGetPastElectionResults } from "../../hooks/election/useGetPastElectionResult";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { NotFoundError } from "../../components/errors/Error";
import { Icon } from "@iconify/react";
function PastElectionResults({ rowData, handleClose }) {
  const { id: electionId } = rowData;
  const {
    data: pastResults,
    isLoading,
    error,
  } = useGetPastElectionResults(electionId);
  return (
    <>
      <div className="d-flex flex-row align-items-center justify-content-between mb-3 w-100">
        <span className="m-0">Election Winners</span>
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
        {
           isLoading ? (
             <div className="row">
              {
                [...Array(5)].map((items) => (
                   <div className="col-lg-4">
                <div className="my-2">
                  <RectangleSkeleton  speed={1} height="50dvh" width="100%"/>
                </div>
              </div>
                ))
              }
             </div>
           ) : error ? (
            <NotFoundError
                          title={error?.response?.data?.errors?.title}
                          description={error?.response?.data?.errors?.description}
                        ></NotFoundError>

           ) : (
             <div className="row">
             {
               pastResults.data.election_results.map((items) => (
                 <div className="col-lg-4" key={items.id}>
              <div className="card rounded-4 border shadow-sm d-flex flex-column gap-4 my-1">
                <div className="position-relative">
                  <img
                    src="./images/user.png"
                    alt=""
                    className="rounded-top-3"
                    style={{
                      width: "100%",
                      height: "22dvh",
                      objectFit: "contain",
                    }}
                  />
                  <div style={{
                     position:"absolute",
                     top:0,
                     left:0,
                     zIndex:999,
                     width:"100%",
                     marginTop:"0.2rem"
                  }}>
                    <div className="d-flex flex-row align-items-center justify-content-between px-2">
                      <div className="d-flex flex-row align-items-center gap-1 rounded-pill px-1"
                       style={{
                          color:"#45a245",
                          background:"#f4faf3"
                       }}
                      >
                        <Icon icon="streamline-ultimate:gaming-ribbon-first-bold"  className="font-size-sm"/>
                        <span className="font-size-sm">winner</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-2  d-flex flex-column gap-3">
                  <div>
                    <span className="font-size-sm fw-semibold">{items.election_role}</span>
                  </div>
                  <div className="d-flex flex-column gainsboro-color">
                    <span className="font-size-sm">
                      {items.student_name}
                    </span>
                    <span className="gainsboro-color font-size-sm">
                      {items.specialty_name}, Level {items.level}
                    </span>
                  </div>
                  <div className="d-flex flex-row align-items-center w-100 justify-content-between">
                    <div className="d-flex flex-row align-items-center gap-1">
                      <h3 className="fw-semibold m-0 p-0">{items.vote_count}</h3>
                      <span className="m-0 p-0 font-size-sm">votes</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
               ))
             }
          </div>
           )
        }
      </div>
    </>
  );
}
export default PastElectionResults;
