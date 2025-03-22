import AnnoucementSideBar from "../../../components/SideBar/Annoucement";
import { Icon } from "@iconify/react";
function ViewAnnoucements() {
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
          <div className="col-lg-9"></div>
        </div>
      </div>
    </>
  );
}
export default ViewAnnoucements;
