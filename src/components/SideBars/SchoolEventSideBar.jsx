import { useNavigate } from "react-router-dom";
function SchoolEventSideBar(){
    return(
        <>
         <div className="card border-none width-20 p-2 rounded-4 d-flex flex-column gap-3 height-90">
                {sideBarData.map((item) => (
                  <SideBarComponent title={item.title} path={item.path} />
                ))}
        </div>
        </>
    )
}
export default SchoolEventSideBar;

function SideBarComponent({ title, path }) {
  const navigate = useNavigate();
  return (
    <>
      <div
        className={
          location.pathname === path
            ? " border-none  font-size-sm rounded-3 schoolexpenses-active  transition-four-sec pointer-cursor  d-flex align-items-center gap-3"
            : "gainsboro-color border-none font-size-sm transparent-bg d-flex align-items-center gap-3 transition-four-sec pointer-cursor schoolexpenses-inactive"
        }
        onClick={() => {
          navigate(path);
        }}
      >
        {title}
      </div>
    </>
  );
}

export const sideBarData = [
  {
    title: "Ongoing Events",
    path: "/events",
  },
  {
    title: "Expired Events",
    path: "/expired-event",
  },
  {
    title: "Event Tags",
    path: "/event-tags",
  },
  {
    title: "Draft Events",
    path: "/draft-event",
  },
  {
    title: "Scheduled Events",
    path: "/schedule-event",
  },
  {
    title: "Event Category",
    path: "/event-categories",
  },
];
