import { Icon } from "@iconify/react";
import { useFetchAnnouncementStatsQuery } from "../../Slices/Asynslices/fetchSlice";
import Pageloaderspinner from "../../components/Spinners/Spinners";
function Annoucements() {
  const year = new Date().getFullYear();
  const { data, isLoading } = useFetchAnnouncementStatsQuery({
    year: year,
  });
  if (isLoading) {
    return <Pageloaderspinner />;
  }
  return (
    <>
      <div className="w-100 ">
        <div className="d-flex flex-row gap-2 font-size-sm my-2">
          <span><Icon icon="octicon:info-24" width="20" height="20" /></span>
          <span>Overview</span>
        </div>
        <div className="announcement-card">
          <div
            className="card border-none rounded-4 p-2 d-flex flex-column annoucement-stat-card"
            style={{
              background: "#ffe4d5",
            }}
          >
            <div>
              <span className="font-size-sm fw-light">Total Announcements</span>
            </div>
            <div className="mt-auto fw-semibold">
              <span style={{ fontSize: "2rem" }}>1000</span>
            </div>
          </div>
          <div
            className="card border-none rounded-4 p-2 d-flex flex-column annoucement-stat-card"
            style={{
              background: "#e4e9fb",
            }}
          >
            <div>
              <span className="font-size-sm fw-light">
                Active Announcements
              </span>
            </div>
            <div className="mt-auto fw-semibold">
              <span style={{ fontSize: "2rem" }}>1000</span>
            </div>
          </div>
          <div
            className="card border-none rounded-4 p-2 d-flex flex-column annoucement-stat-card"
            style={{
              background: "#f3ecf2",
            }}
          >
            <div>
              <span className="font-size-sm fw-light">
                Scheduled Announcements
              </span>
            </div>
            <div className="mt-auto fw-semibold">
              <span style={{ fontSize: "2rem" }}>1000</span>
            </div>
          </div>
        </div>
        <section className="mt-2">
          <div className="d-flex flex-row gap-3 w-100 justify-content-between">
            <div style={{ width: "50%", height: "52dvh" }}>
              <div className="d-flex font-size-sm flex-row justify-content-between">
                <div className="text-start mb-1">
                  <span className="fw-semibold">Upcoming Announcements</span>
                </div>
              </div>
              <div className="my-2 font-size-sm bg-white rounded-4 p-2 d-flex flex-column gap-2">
                <span className="fw-semibold">Announcement Title</span>
                <p className="m-0 fw-light gainsboro-color my-1">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Dolorem sapiente laudantium obcaecati similique cumque modi
                </p>
                <div className="d-flex align-items-center gap-2">
                  <span>
                    <Icon icon="circum:calendar" width="24" height="24" />
                  </span>
                  <span>20 Jan 2024 8:30 pm</span>
                </div>
              </div>
              <div className="my-2 font-size-sm bg-white rounded-4 p-2 d-flex flex-column gap-2">
                <span className="fw-semibold">Announcement Title</span>
                <p className="m-0 fw-light gainsboro-color my-1">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Dolorem sapiente laudantium obcaecati similique cumque modi
                </p>
                <div className="d-flex align-items-center gap-2">
                  <span>
                    <Icon icon="circum:calendar" width="24" height="24" />
                  </span>
                  <span>20 Jan 2024 8:30 pm</span>
                </div>
              </div>
              <div className="my-2 font-size-sm bg-white rounded-4 p-2 d-flex flex-column gap-2">
                <span className="fw-semibold">Announcement Title</span>
                <p className="m-0 fw-light gainsboro-color my-1">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Dolorem sapiente laudantium obcaecati similique cumque modi
                </p>
                <div className="d-flex align-items-center gap-2">
                  <span>
                    <Icon icon="circum:calendar" width="24" height="24" />
                  </span>
                  <span>20 Jan 2024 8:30 pm</span>
                </div>
              </div>
            </div>
            <div style={{ width: "50%", height: "52dvh" }}>
              <div className="d-flex font-size-sm flex-row justify-content-between">
                <div className="text-start mb-1">
                  <span className="fw-semibold">Active Announcements</span>
                </div>
              </div>
              <div className="my-2 font-size-sm bg-white rounded-4 p-2 d-flex flex-column gap-2">
                <span className="fw-semibold">Announcement Title</span>
                <p className="m-0 fw-light gainsboro-color my-1">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Dolorem sapiente laudantium obcaecati similique cumque modi
                </p>
                <div className="d-flex align-items-center gap-2">
                  <span>
                    <Icon icon="circum:calendar" width="24" height="24" />
                  </span>
                  <span>20 Jan 2024 8:30 pm</span>
                </div>
              </div>
              <div className="my-2 font-size-sm bg-white rounded-4 p-2 d-flex flex-column gap-2">
                <span className="fw-semibold">Announcement Title</span>
                <p className="m-0 fw-light gainsboro-color my-1">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Dolorem sapiente laudantium obcaecati similique cumque modi
                </p>
                <div className="d-flex align-items-center gap-2">
                  <span>
                    <Icon icon="circum:calendar" width="24" height="24" />
                  </span>
                  <span>20 Jan 2024 8:30 pm</span>
                </div>
              </div>
              <div className="my-2 font-size-sm bg-white rounded-4 p-2 d-flex flex-column gap-2">
                <span className="fw-semibold">Announcement Title</span>
                <p className="m-0 fw-light gainsboro-color my-1">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Dolorem sapiente laudantium obcaecati similique cumque modi
                </p>
                <div className="d-flex align-items-center gap-2">
                  <span>
                    <Icon icon="circum:calendar" width="24" height="24" />
                  </span>
                  <span>20 Jan 2024 8:30 pm</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="mt-2">
          <span className="font-size-sm fw-semibold">Announcement Stats By Type</span>
          <div className="announcement-grid-two mt-2">
              <div className="card border-none d-flex flex-row font-size-sm p-2 rounded-2">
                 <div className="d-flex flex-row gap-2">
                   <div style={{ width:"3rem", height:"3rem" }} 
                    className="primary-background-50 rounded-1 d-flex flex-row align-items-center justify-content-center"
                    >
                   <Icon icon="fluent:important-20-regular" width="24" height="20" />
                   </div>
                   <div className="d-flex flex-column">
                    <span>Important</span>
                    <span className="fs-6 fw-semibold">100</span>
                   </div>
                 </div>
              </div>
              <div className="card border-none d-flex flex-row font-size-sm p-2 rounded-2">
                 <div className="d-flex flex-row gap-2">
                   <div style={{ width:"3rem", height:"3rem", background:"#ffdddd" }} 
                    className=" rounded-1 d-flex flex-row align-items-center justify-content-center"
                    >
                    <Icon icon="fluent:alert-urgent-16-regular" width="24" height="24" />
                   </div>
                   <div className="d-flex flex-column">
                    <span>Urgent</span>
                    <span className="fs-6 fw-semibold">100</span>
                   </div>
                 </div>
              </div>
              <div className="card border-none d-flex flex-row font-size-sm p-2 rounded-2">
                 <div className="d-flex flex-row gap-2">
                   <div style={{ width:"3rem", height:"3rem", background:"#d4ebff" }} 
                    className="primary-background-50 rounded-1 d-flex flex-row align-items-center justify-content-center"
                    >
                    <Icon icon="akar-icons:info" width="24" height="24" />
                   </div>
                   <div className="d-flex flex-column">
                    <span>info</span>
                    <span className="fs-6 fw-semibold">100</span>
                   </div>
                 </div>
              </div>
              <div className="card border-none d-flex flex-row font-size-sm p-2 rounded-2">
                 <div className="d-flex flex-row gap-2">
                   <div style={{ width:"3rem", height:"3rem", background:"#f4f3f4" }} 
                    className=" rounded-1 d-flex flex-row align-items-center justify-content-center"
                    >
                    <Icon icon="material-symbols:draft-orders" width="24" height="24" />
                   </div>
                   <div className="d-flex flex-column">
                    <span>Draft</span>
                    <span className="fs-6 fw-semibold">100</span>
                   </div>
                 </div>
              </div>
          </div>
        </section>
      </div>
    </>
  );
}
export default Annoucements;
