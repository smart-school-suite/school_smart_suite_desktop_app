import { useNavigate } from "react-router-dom";
function AdditionalFeeSideBar() {
  return (
    <>
      <div className="card border-none width-20 p-2 rounded-3 d-flex flex-column gap-3">
        {sideBarData.map((item) => (
          <SideBarComponent title={item.title} path={item.path} />
        ))}
      </div>
    </>
  );
}
export default AdditionalFeeSideBar;

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
    title: "Fee Payment",
    path: "/additional-fees",
  },
  {
    title: "Transactions",
    path: "/additionalfee-transactions",
  },
  {
    title: "Bill Student",
    path: "/additional-fee/student-billing",
  },
  {
    title:"Category",
    path:"/additional-fee/category"
  }
];
