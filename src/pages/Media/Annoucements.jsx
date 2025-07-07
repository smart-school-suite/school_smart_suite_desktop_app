import { Icon } from "@iconify/react";
import AnnoucementSideBar from "../../components/SideBars/Sidebar/Annoucement";
function Annoucements() {
  return (
    <>
      <div className="container pt-3">
        <div className="d-flex flex-row align-items-center gap-2">
          <div
            className="icon-box d-flex align-items-center justify-content-center"
            style={{
              width: "2.5rem",
              height: "2.5rem",
              borderRadius: "0.2rem",
              background: "#ffff",
            }}
          >
            <Icon
              icon="fluent:speaker-0-32-regular"
              className="font-size-lg color-primary"
            />
          </div>
          <h5>Annoucements</h5>
        </div>
        <div className="row">
           <AnnoucementSideBar />
          <div className="col-lg-9">
            <div className="d-flex flex-row justify-content-between w-100 gap-3 mb-2">
              <div
                className="card pb-2 px-2 pt-2 d-flex flex-column justify-content-between cornflower-blue-bg"
                style={{
                  width: "33%",
                  height: "14dvh",
                  borderRadius: "0.75rem",
                  background:"#9DBFDC"
                }}
              >
                <div className="d-flex flex-row gap-2 align-items-center ">
                  <div
                    style={{
                      width: "2rem",
                      height: "2rem",
                      borderRadius: "2rem",
                      background: "#f9f9f9",
                    }}
                    className="d-flex align-items-center justify-content-center "
                  >
                    <span className="font-size-sm">
                    <Icon icon="fluent:speaker-0-20-regular"/>
                    </span>
                  </div>
                  <span
                    style={{
                      fontSize: "0.82rem",
                    }}
                  >
                    {" "}
                    Total Number Of Annoucements
                  </span>
                </div>
                <div>
                  <span className="font-size-xl fw-bold">4,550</span>
                </div>
              </div>
              <div
                className="card pb-2 px-2 pt-2 d-flex flex-column justify-content-between light-peach-bg"
                style={{
                  width: "33%",
                  height: "14dvh",
                  borderRadius: "0.75rem",
                }}
              >
                <div className="d-flex flex-row gap-2 align-items-center">
                  <div
                    style={{
                      width: "2rem",
                      height: "2rem",
                      borderRadius: "2rem",
                       backgroundColor:"#FFE4D5"
                    }}
                    className="d-flex align-items-center justify-content-center "
                  >
                    <span className="font-size-sm">
                    <Icon icon="material-symbols-light:online-prediction" />
                    </span>
                  </div>
                  <span
                    style={{
                      fontSize: "0.82rem",
                    }}
                  >
                    {" "}
                    Active Annoucements
                  </span>
                </div>
                <div>
                  <span className="font-size-xl fw-bold">1,002</span>
                </div>
              </div>
              <div
                className="card pb-2 px-2 pt-2 d-flex flex-column justify-content-between light-skyblue-bg"
                style={{
                  width: "33%",
                  height: "14dvh",
                  borderRadius: "0.75rem",
                }}
              >
                <div className="d-flex flex-row gap-2 align-items-center">
                  <div
                    style={{
                      width: "2rem",
                      height: "2rem",
                      borderRadius: "2rem",
                      background: "#f9f9f9",
                    }}
                    className="d-flex align-items-center justify-content-center "
                  >
                    <span className="font-size-sm">
                    <Icon icon="pajamas:expire"  />
                    </span>
                  </div>
                  <span
                    style={{
                      fontSize: "0.82rem",
                    }}
                  >
                    Expired Annoucements
                  </span>
                </div>
                <div>
                  <span className="font-size-xl fw-bold">2,500</span>
                </div>
              </div>
            </div>
            <div className="d-flex flex-row align-items-center w-100">
              <div className="d-flex flex-column w-100">
                <div className="card w-100 rounded-3 px-3 py-3 d-flex flex-column justify-content-between"
                 style={{
                     height:"38dvh"
                 }}
                >
                  <div className="d-flex flex-row justify-content-between mb-1">
                    <span>Top Performing Annoucements</span>
                    <span className="font-size-sm">Engagment Numbers</span>
                  </div>
                  <div className="d-flex flex-row align-items-center justify-content-between border-bottom pb-1">
                    <div className="d-block">
                      <span className="fw-semibold font-size-md">
                        Upcoming Cultural Wee
                      </span>
                      <p className="font-size-sm m-0 gainsboro-color">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum veniam, iste aliquid doloremque culpa laborum quidem eos cupiditate
                      </p>
                    </div>
                    <div className="block">
                      <h2 className="fw-bold font-size-lg">12.4K</h2>
                    </div>
                  </div>
                  <div className="d-flex flex-row align-items-center justify-content-between border-bottom">
                    <div className="d-block">
                      <span className="fw-semibold font-size-md">
                        Upcoming Cultural Wee
                      </span>
                      <p className="font-size-sm gainsboro-color m-0">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum veniam, iste aliquid doloremque culpa laborum quidem eos cupiditate
                      </p>
                    </div>
                    <div className="block">
                      <h2 className="fw-bold font-size-lg">12.4K</h2>
                    </div>
                  </div>
                  <div className="d-flex flex-row align-items-center justify-content-between">
                    <div className="d-block">
                      <span className="fw-semibold font-size-md">
                        Upcoming Cultural Wee
                      </span>
                      <p className="font-size-sm gainsboro-color m-0">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum veniam, iste aliquid doloremque culpa laborum quidem eos cupiditate
                      </p>
                    </div>
                    <div className="block">
                      <h2 className="fw-bold font-size-lg">12.4K</h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-7">
                <div className="d-flex flex-row justify-content-between align-item-end mt-1">
                  <span>Scheduled Annoucements</span>
                </div>
                <div
                  className="card w-100 my-1 p-2 rounded-3  gap-1 d-flex flex-column"
                  style={{
                    height: "17dvh",
                  }}
                >
                  <div className="d-block">
                    <p className="fw-bold m-0">Annoucement Tilte Goes Here</p>
                    <p
                      className="m-0 font-size-sm"
                      style={{
                        fontWeight: "400",
                      }}
                    >
                      Students, Teachers
                    </p>
                  </div>
                  <div>
                    <p className="gainsboro-color font-size-sm my-0">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      consectetur
                    </p>
                  </div>
                  <div className="d-flex flex-row justify-content-between mt-auto align-items-center">
                    <span className="fw-semibold">11:30 AM</span>
                    <button
                      style={{
                        width: "2.5rem",
                        height: "2.5rem",
                        borderRadius: "3rem",
                      }}
                      className="border-none"
                    >
                      IC
                    </button>
                  </div>
                </div>
                <div
                  className="card w-100 my-1 p-2 rounded-3  gap-1 d-flex flex-column"
                  style={{
                    height: "17dvh",
                  }}
                >
                  <div className="d-block">
                    <p className="fw-bold m-0">Annoucement Tilte Goes Here</p>
                    <p
                      className="m-0 font-size-sm"
                      style={{
                        fontWeight: "400",
                      }}
                    >
                      Students, Teachers
                    </p>
                  </div>
                  <div>
                    <p className="gainsboro-color font-size-sm my-0">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      consectetur
                    </p>
                  </div>
                  <div className="d-flex flex-row justify-content-between mt-auto align-items-center">
                    <span className="fw-semibold">11:30 AM</span>
                    <button
                      style={{
                        width: "2.5rem",
                        height: "2.5rem",
                        borderRadius: "3rem",
                      }}
                      className="border-none"
                    >
                      IC
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-lg-5">
                <div
                  className="card mt-4 p-2"
                  style={{
                    height: "35dvh",
                  }}
                >
                  <span className="font-size-sm">
                    Percentage Of Read vs Unread Annoucements
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Annoucements;

