import { Icon } from "@iconify/react";
import TextDisplay from "../../components/TextComponents/TextDisplay";
import { useGetAnnouncementStatus } from "../../hooks/announcement/useGetAnnouncementStats";
import { NotFoundError } from "../../components/errors/Error";
import AnnouncementDashboardLoader from "../../components/PageLoaders/AnnouncementLoader";
import { formatISODate } from "../../utils/functions";
function Annoucements() {
  const currentYear = new Date().getFullYear();
  const {
    data: announcementStats,
    isLoading,
    error,
  } = useGetAnnouncementStatus(currentYear);
  return (
    <>
      {isLoading ? (
        <AnnouncementDashboardLoader />
      ) : error ? (
        <NotFoundError
          title={error?.response?.data?.errors?.title}
          description={error?.response?.data?.errors?.description}
        ></NotFoundError>
      ) : (
        <section className="w-100 h-100 d-flex flex-column gap-1">
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
                background: "#ffe4d5",
                color:"#430707",
                width: "33%",
              }}
            >
              <div>
                <span className="font-size-sm fw-light">
                  Total Announcements
                </span>
              </div>
              <div className="mt-auto fw-semibold">
                <span style={{ fontSize: "2rem" }}>{announcementStats.data.total_announcement_numbers.total_announcement_count}</span>
              </div>
            </div>
            <div
              className="card border-none rounded-4 p-2 d-flex flex-column annoucement-stat-card h-100"
              style={{
                background: "#e4e9fb",
                width: "33%",
                color:"#232145"
              }}
            >
              <div>
                <span className="font-size-sm fw-light">
                  Active Announcements
                </span>
              </div>
              <div className="mt-auto fw-semibold">
                <span style={{ fontSize: "2rem" }}>{announcementStats.data.total_announcement_numbers.total_announcement_active}</span>
              </div>
            </div>
            <div
              className="card border-none rounded-4 p-2 d-flex flex-column annoucement-stat-card h-100"
              style={{
                background: "#f3ecf2",
                color:"#36212f",
                width: "33%",
              }}
            >
              <div>
                <span className="font-size-sm fw-light">
                  Scheduled Announcements
                </span>
              </div>
              <div className="mt-auto fw-semibold">
                <span style={{ fontSize: "2rem" }}>{announcementStats.data.total_announcement_numbers.total_announcement_scheduled}</span>
              </div>
            </div>
          </div>
          <div style={{ height: "67%" }}>
            <div className="d-flex flex-row align-items-center gap-2 w-100 h-100">
              <div className="w-50 d-flex flex-column gap-2 h-100">
                <span className="font-size-sm">Active Announcements</span>
               <div className="announcement-dashboard-content d-flex flex-column gap-2 px-1">
                 {
                  announcementStats.data.recent_announcements_by_status.active_announcement.map((items) => (
                    <div className="card border-none shadow-sm font-size-sm bg-white rounded-4 p-2 d-flex flex-column gap-2"
                     key={items.id}
                    >
                  <span className="fw-semibold">{items.title}</span>
                  <TextDisplay
                    content={items.content}
                    maxLength={150}
                    textStyle={"gainsboro-color fw-light"}
                    readMeStyle={"fw-semibold text-dark"}
                  />
                  <div className="d-flex flex-wrap gap-2">
                    {JSON.parse(items.tags).map((items) => (
                       <div className="p-2 rounded-pill  primary-background-50 color-primary"
                        key={items.id}
                        style={{ fontSize:"0.7rem" }}
                       > 
                      {items.name}
                    </div>
                    ))}
                  </div>
                  
                 <div className="d-flex flex-column">
                    <span className="font-size-xs">Expires At</span>
                    <div className="d-flex align-items-center gap-1 ">
                      <Icon icon="solar:calendar-outline"  />
                    <span className="font-size-sm">{formatISODate(items.expires_at)}</span>
                  </div>
                  </div>
                </div>
                  ))
                }
               </div>
              </div>
              <div className="w-50 d-flex flex-column gap-2 h-100">
                <span className="font-size-sm">Scheduled Announcement</span>
               <div className="announcement-dashboard-content d-flex flex-column gap-2 px-1">
                 {
                  announcementStats.data.recent_announcements_by_status.scheduled_announcement.map((items) => (
                    <div className="card border-none shadow-sm font-size-sm bg-white rounded-4 p-2 d-flex flex-column gap-2"
                     key={items.id}
                    >
                  <span className="fw-semibold">{items.title}</span>
                  <TextDisplay
                    content={items.content}
                    maxLength={150}
                    textStyle={"gainsboro-color fw-light"}
                    readMeStyle={"fw-semibold text-dark"}
                  />
                  <div className="d-flex flex-wrap gap-2">
                    {JSON.parse(items.tags).map((items) => (
                       <div className="p-2 rounded-pill  primary-background-50 color-primary"
                        key={items.id}
                        style={{ fontSize:"0.7rem" }}
                       > 
                      {items.name}
                    </div>
                    ))}
                  </div>
                  
                  <div className="d-flex flex-column">
                    <span className="font-size-xs">To Be Published At</span>
                    <div className="d-flex align-items-center gap-1 ">
                      <Icon icon="solar:calendar-outline"  />
                    <span className="font-size-sm">{formatISODate(items.published_at)}</span>
                  </div>
                  </div>
                </div>
                  ))
                }
               </div>
              </div>
            </div>
          </div>
          <section style={{ height: "15%" }}>
            <span className="font-size-sm fw-semibold">
              Announcement Stats By Type
            </span>
            <div className="d-flex flex-row align-items-center gap-2">
              <div className="card border-none d-flex flex-row font-size-sm p-2 rounded-2 w-25">
                <div className="d-flex flex-row gap-2">
                  <div
                    style={{ width: "3rem", height: "3rem" }}
                    className="primary-background-50 rounded-1 d-flex flex-row align-items-center justify-content-center"
                  >
                    <Icon
                      icon="fluent:important-20-regular"
                      width="24"
                      height="20"
                    />
                  </div>
                  <div className="d-flex flex-column">
                    <span>Important</span>
                    <span className="fs-6 fw-semibold">100</span>
                  </div>
                </div>
              </div>
              <div className="card border-none d-flex flex-row font-size-sm p-2 rounded-2 w-25">
                <div className="d-flex flex-row gap-2">
                  <div
                    style={{
                      width: "3rem",
                      height: "3rem",
                      background: "#ffdddd",
                      color:"#430707"
                    }}
                    className=" rounded-1 d-flex flex-row align-items-center justify-content-center"
                  >
                    <Icon
                      icon="fluent:alert-urgent-16-regular"
                      width="24"
                      height="24"
                    />
                  </div>
                  <div className="d-flex flex-column">
                    <span>Urgent</span>
                    <span className="fs-6 fw-semibold">100</span>
                  </div>
                </div>
              </div>
              <div className="card border-none d-flex flex-row font-size-sm p-2 rounded-2 w-25">
                <div className="d-flex flex-row gap-2">
                  <div
                    style={{
                      width: "3rem",
                      height: "3rem",
                      background: "#d4ebff",
                      color:"#152b56"
                    }}
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
              <div className="card border-none d-flex flex-row font-size-sm p-2 rounded-2 w-25">
                <div className="d-flex flex-row gap-2">
                  <div
                    style={{
                      width: "3rem",
                      height: "3rem",
                      background: "#f4f3f4",
                      color:"#373437"
                    }}
                    className=" rounded-1 d-flex flex-row align-items-center justify-content-center"
                  >
                    <Icon
                      icon="material-symbols:draft-orders"
                      width="24"
                      height="24"
                    />
                  </div>
                  <div className="d-flex flex-column">
                    <span>Draft</span>
                    <span className="fs-6 fw-semibold">100</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </section>
      )}
    </>
  );
}
export default Annoucements;
