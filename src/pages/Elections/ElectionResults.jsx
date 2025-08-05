import { Icon } from "@iconify/react";
function ElectionResults() {
  return (
    <>
      <div className="container pt-2">
        <div className="row">
          <div className="col-lg-9 pt-4">
            <div className="d-flex flex-row justify-content-between w-100 mt-5 align-items-center">
              <div className="d-flex gap-2 flex-row align-items-center">
                <div
                  style={{
                    width: "2.5rem",
                    height: "2.5rem",
                    borderRadius: "0.5rem",
                  }}
                  className="d-flex align-items-center justify-content-center primary-background text-white"
                >
                  <span>
                    <Icon icon="game-icons:podium-winner" />
                  </span>
                </div>
                <span className="font-size-lg fw-bold">Election Results</span>
              </div>
              <input
                type="search"
                placeholder="Search for anything"
                className="form-control w-25"
              />
            </div>
            <div className="candidate-box">
              <div className="my-1">
                <div className="d-flex flex-row align-items-center">
                  <span className="fw-semibold">
                    Student Union President Candidates
                  </span>
                </div>
                <div className="row mt-2">
                  <div className="col-lg-4">
                    <div className="position-relative ">
                      <div className="card p-2 rounded-3 my-2 z-0">
                        <div className="w-100">
                          <img
                            src="protrait.jpg"
                            alt=""
                            className="w-100 object-fit-cover rounded-3"
                            style={{
                              height: "25dvh",
                            }}
                          />
                        </div>
                        <div>
                          <p className="my-0 fw-semibold mt-2">Daniel Russel</p>
                          <p className="my-1 font-size-sm">
                            Software Engineering
                          </p>
                          <p className="my-1 font-size-sm">
                            Level 400, Bachelor's Degree
                          </p>
                          <div className="font-size-sm gainsboro-color my-1">
                            <p className="text-wrap">
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. Repellendus, dolore suscipit animi
                              molestias....
                            </p>
                          </div>
                        </div>
                        <div className="d-flex flex-row justify-content-between mt-2">
                          <h2 className="fw-bold">
                            13.4K{" "}
                            <span className="font-size-sm fw-medium">
                              votes
                            </span>
                          </h2>
                        </div>
                      </div>
                      <div
                        className="d-flex ribbon gap-1 text-center green-bg  text-white font-size-sm py-2 px-3 z-3 position-absolute"
                        style={{
                          top: 0,
                          right: "-0.45rem",
                        }}
                      >
                        <span>
                          <Icon
                            icon="hugeicons:medal-first-place"
                            width="18"
                            height="18"
                          />
                        </span>
                        <span className="mb-1 mx-1">Curren Winner</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="position-relative ">
                      <div className="card p-2 rounded-3 my-2 z-0">
                        <div className="w-100">
                          <img
                            src="protrait.jpg"
                            alt=""
                            className="w-100 object-fit-cover rounded-3"
                            style={{
                              height: "25dvh",
                            }}
                          />
                        </div>
                        <div>
                          <p className="my-0 fw-semibold mt-2">Daniel Russel</p>
                          <p className="my-1 font-size-sm">
                            Software Engineering
                          </p>
                          <p className="my-1 font-size-sm">
                            Level 400, Bachelor's Degree
                          </p>
                          <div className="font-size-sm gainsboro-color my-1">
                            <p className="text-wrap">
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. Repellendus, dolore suscipit animi
                              molestias....
                            </p>
                          </div>
                        </div>
                        <div className="d-flex flex-row justify-content-between mt-2">
                          <h2 className="fw-bold">
                            10.4K{" "}
                            <span className="font-size-sm fw-medium">
                              votes
                            </span>
                          </h2>
                        </div>
                      </div>
                      <div
                        className="d-flex ribbon gap-1 text-center primary-background  text-white font-size-sm py-2 px-3 z-3 position-absolute"
                        style={{
                          top: 0,
                          right: "-0.45rem",
                        }}
                      >
                        <span>
                          <Icon
                            icon="hugeicons:medal-second-place"
                            width="18"
                            height="18"
                          />
                        </span>
                        <span className="mb-1 mx-1">Runner Up</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default ElectionResults;
