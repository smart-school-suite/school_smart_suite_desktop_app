import { Icon } from "@iconify/react";
import BarChart from "../../components/ChartComponents/barChart";
import DoughnutChart from "../../components/ChartComponents/DoughnutChart";
import { useState } from "react";
import { useGetAnnouncementEngagementStats } from "../../hooks/announcement/useGetAnnouncementEngagementStats";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { NotFoundError } from "../../components/errors/Error";
import { useGetAnnouncementReadUnreadList } from "../../hooks/announcement/useGetAnnouncementReadUnreadList";
import { formatISODate } from "../../utils/functions";
import { useSelector } from "react-redux";
function AnnouncementEngagementStats({ handleClose, rowData }) {
  const { id: announcementId } = rowData;
  const [tab, setTab] = useState("overview");
   const darkMode = useSelector((state) => state.theme.darkMode);
  return (
    <>
      <div className="d-flex flex-row align-items-center justify-content-between mb-3 w-100">
        <span>Announcement Engagement Stats</span>
        <span
          className="m-0"
          onClick={() => {
            handleClose();
          }}
        >
          <Icon icon="charm:cross" width="22" height="22" />
        </span>
      </div>
      <div className={`d-flex flex-row ${darkMode ? 'dark-bg-light' : 'primary-background-50'} rounded-2 w-100 p-1 gap-2`}>
        <button
          className={`border-none rounded-2 
           ${
             tab == "overview"
               ? "primary-background-300 text-white transition-all"
               : "transparent-bg color-primary transition-all"
           }
           w-50 p-2 font-size-sm`}
          onClick={() => setTab("overview")}
        >
          Engagement Overview
        </button>
        <button
          className={`border-none rounded-2 
           ${
             tab == "viewstatus"
               ? "primary-background-300 text-white transition-all"
               : "transparent-bg color-primary transition-all"
           }
           w-50 p-2 font-size-sm`}
          onClick={() => setTab("viewstatus")}
        >
          Read/Unread List
        </button>
      </div>
      {tab == "viewstatus" ? (
        <ViewersSummary announcementId={announcementId} />
      ) : (
        <Overview announcementId={announcementId} />
      )}
    </>
  );
}
export default AnnouncementEngagementStats;

function Overview({ announcementId }) {
  const {
    data: stats,
    isLoading,
    error,
  } = useGetAnnouncementEngagementStats(announcementId);
     const darkMode = useSelector((state) => state.theme.darkMode);
  return (
    <>
      {isLoading ? (
        <div className="d-flex flex-column gap-2 w-100 mt-3">
          <RectangleSkeleton width="100%" height="15dvh" speed={0.5} />
          <div className="d-flex flex-row align-items-center gap-2">
            <div className="w-50">
              <RectangleSkeleton width="100%" height="25dvh" speed={0.5} />
            </div>
            <div className="w-50">
              <RectangleSkeleton width="100%" height="25dvh" speed={0.5} />
            </div>
          </div>
        </div>
      ) : error ? (
        <NotFoundError
          title={error?.response?.data?.errors?.title}
          description={error?.response?.data?.errors?.description}
        ></NotFoundError>
      ) : (
        <div className="container">
          <div className="d-flex flex-column gap-3 pt-2">
            <div className="d-flex flex-row align-items-center font-size-sm">
              <span>Engagement Overview</span>
            </div>
            <div className="d-flex flex-row gap-2">
              <div className="col">
                <div
                  className="card rounded-3 p-2 border-none font-size-sm d-flex flex-column gap-4 w-100"
                  style={{
                    background: "#eee6ff",
                    color: "#390570",
                  }}
                >
                  <span>Total Teachers</span>
                  <span className="font-size-lg fw-semibold">{stats.data.total_teacher}</span>
                </div>
              </div>
              <div className="col">
                <div
                  className="card rounded-3 p-2 border-none font-size-sm d-flex flex-column gap-4 w-100"
                  style={{
                    background: "#d7f1f6",
                    color: "#122c3a",
                  }}
                >
                  <span>Total Students</span>
                  <span className="font-size-lg fw-semibold">{stats.data.total_student}</span>
                </div>
              </div>
              <div className="col">
                <div
                  className="card rounded-3 p-2 border-none font-size-sm d-flex flex-column gap-4 w-100"
                  style={{
                    background: "#f0eef9",
                    color: "#342550",
                  }}
                >
                  <span>Total Admin</span>
                  <span className="font-size-lg fw-semibold">{stats.data.total_school_admin}</span>
                </div>
              </div>
            </div>
            <div className="d-flex flex-row gap-2">
              <div className="col-6">
                <div
                  className={`${darkMode ? 'dark-bg dark-mode-text dark-mode-border' : "white-bg border"} card rounded-4  p-2 d-flex flex-column gap-2`}
                  style={{ height: "33dvh" }}
                >
                  <div className="d-flex flex-column">
                    <span className="font-size-xs">Total Reciepients</span>
                    <span className="fw-bold font-size-lg">{stats.data.total_reciepient}</span>
                  </div>
                  <BarChart
                    config={{
                      backgroundColor: "#ffe4d5",
                      borderColor: "#fd9d74",
                      labels: ["school Admins", "Teachers", "Students"],
                      data: [stats.data.total_school_admin, stats.data.total_teacher, stats.data.total_student],
                    }}
                  />
                </div>
              </div>
              <div className="col">
                <div
                  className={`${darkMode ? 'dark-bg dark-mode-text dark-mode-border' : "white-bg border"} card rounded-4  p-2 d-flex flex-column gap-2`}
                  style={{ height: "33dvh" }}
                >
                  <div className="d-flex flex-column">
                    <span className="fw-bold font-size-sm">Read/Unread</span>
                    <span className="gainsboro-color font-size-sm fw-light">
                      The chart below shows the distribution of read and unread
                      announcements.
                    </span>
                  </div>
                  <DoughnutChart
                    compData={[stats.data.total_seen, stats.data.total_unseen]}
                    labels={["read", "unread"]}
                    label={"Read/Unread"}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function ViewersSummary({ announcementId }) {
  const { data:engagement, isLoading, error } = useGetAnnouncementReadUnreadList(announcementId);

  return (
    <>
      {
        isLoading ? (
           <div className="d-flex flex-column gap-2 pt-2">
              <RectangleSkeleton width="100%" height="10dvh" speed={0.5} />
              <RectangleSkeleton width="100%" height="10dvh" speed={0.5} />
              <RectangleSkeleton width="100%" height="10dvh" speed={0.5} />
              <RectangleSkeleton width="100%" height="10dvh" speed={0.5} />
           </div>
        ) : error ?  (
           <NotFoundError
          title={error?.response?.data?.errors?.title}
          description={error?.response?.data?.errors?.description}
        ></NotFoundError>
        ) : (
           <div className="modal-content-container">
            <div className="d-flex flex-column gap-2 p-2">
        {
           engagement.data.student_announcement.length > 0 && (
             <div className="d-flex flex-column gap-2">
          <span className="font-size-sm gainsboro-color">Student Reciepients</span>
           {
             engagement?.data?.student_announcement.map((items) => (
               <div className="d-flex flex-column gap-1">
            <div className="d-flex flex-row align-items-center w-100 justify-content-between">
              <div className="d-flex flex-column">
                <span className="font-size-sm fw-semibold">{items.student.name}</span>
                <span className="font-size-sm">seen at { items?.seen_at ? formatISODate(items?.seen_at ) : 'N/A'}</span>
              </div>
              <div>
                <div className={`d-flex flex-row align-items-center gap-1 ${items?.seen_at ? 'color-green' : 'gainsboro-color'}`}>
                  <span>
                    <Icon icon="line-md:check-all" className="font-size-sm" />
                  </span>
                  <span className="font-size-sm">{items?.status}</span>
                </div>
              </div>
            </div>
            <hr />
          </div>
             ))
           }
        </div>
           )
        }
        {
          engagement.data.teacher_announcement.length > 0 && (
              <div className="d-flex flex-column gap-2">
          <span className="font-size-sm gainsboro-color">Teacher Reciepients</span>
           {
             engagement?.data?.teacher_announcement.map((items) => (
               <div className="d-flex flex-column gap-1">
            <div className="d-flex flex-row align-items-center w-100 justify-content-between">
              <div className="d-flex flex-column">
                <span className="font-size-sm fw-semibold">{items.teacher.name}</span>
                <span className="font-size-sm">seen at { items?.seen_at ? formatISODate(items?.seen_at ) : 'N/A'}</span>
              </div>
              <div>
                <div className={`d-flex flex-row align-items-center gap-1 ${items?.seen_at ? 'color-green' : 'gainsboro-color'}`}>
                  <span>
                    <Icon icon="line-md:check-all" className="font-size-sm" />
                  </span>
                  <span className="font-size-sm">{items?.status}</span>
                </div>
              </div>
            </div>
            <hr />
          </div>
             ))
           }
        </div>
          )
        }
        {
          engagement.data.school_admin_announcement.length > 0 && (
              <div className="d-flex flex-column gap-2">
          <span className="font-size-sm gainsboro-color">School Reciepients</span>
           {
             engagement?.data?.school_admin_announcement.map((items) => (
               <div className="d-flex flex-column gap-1">
            <div className="d-flex flex-row align-items-center w-100 justify-content-between">
              <div className="d-flex flex-column">
                <span className="font-size-sm fw-semibold">{items.school_admin.name}</span>
                <span className="font-size-sm">seen at { items?.seen_at ? formatISODate(items?.seen_at ) : 'N/A'}</span>
              </div>
              <div>
                <div className={`d-flex flex-row align-items-center gap-1 ${items?.seen_at ? 'color-green' : 'gainsboro-color'}`}>
                  <span>
                    <Icon icon="line-md:check-all" className="font-size-sm" />
                  </span>
                  <span className="font-size-sm">{items?.status}</span>
                </div>
              </div>
            </div>
            <hr />
          </div>
             ))
           }
        </div>
          )
        }
      </div>
           </div>
        )
      }
    </>
  );
}
