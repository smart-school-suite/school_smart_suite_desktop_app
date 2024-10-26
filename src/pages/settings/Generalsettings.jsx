import { Icon } from "@iconify/react";
import { Navbarsettings } from "../../components/Navbar";
function Generalsettings(){
    return(
        <>
        <Navbarsettings />
        <div>
            <h5 className="my-2 fw-bold fs-6">Application Settings</h5>
            <div className="card border-none shadow-sm rounded-4 py-2 px-3">
              <div className="d-flex flex-row align-items-center justify-content-between border-bottom pb-2 my-2">
              <div className="d-flex align-items-center flex-row gap-2">
                <div className="security-badge">
                <Icon icon="octicon:versions-24" className="color-primary"/>
                </div>
                <div className="d-block">
                    <p className="fs-6 fw-bold my-0">App Version</p>
                    <p className="gainsboro-color font-size-sm my-0">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil explicabo soluta harum vitae incidunt,
                         eum repudiandae
                    </p>
                </div>
              </div>
              <div>
              <p className="font-size-sm fw-bold my-0">V 15.5.1</p>
              </div>
              </div>
              <div className="d-flex flex-row align-items-end justify-content-between  pb-3 my-2">
              <div className="d-flex align-items-center flex-row gap-2">
                <div className="security-badge">
                <Icon icon="ic:sharp-update" className="color-primary"/>
                </div>
                <div className="d-block">
                    <p className="fs-6 fw-bold my-0">Updates</p>
                    <p className="gainsboro-color font-size-sm my-0">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil explicabo soluta harum vitae incidunt,
                         eum repudiandae
                    </p>
                </div>
              </div>
              <div>
              <button className="font-size-sm border-none px-3 py-2 rounded-3 search-btn-color">
                Update Avialable
              </button>
              </div>
              </div>

              
            </div>
            <h5 className="mt-3 mb-2 fw-bold fs-6">Subcription Plan</h5>
            <div className="card border-none shadow-sm rounded-4  py-2 px-3">
              <div className="d-flex flex-row align-items-center justify-content-between border-bottom pb-2 my-2">
              <div className="d-flex align-items-center flex-row gap-2">
                <div className="security-badge">
                <Icon icon="eos-icons:subscriptions-created-outlined" className="color-primary"/>
                </div>
                <div className="d-block">
                    <p className="fs-6 fw-bold my-0">Ultimate Plan</p>
                    <div className="gainsboro-color font-size-sm my-0 d-flex flex-row gap-3 align-items-center mt-1">
                        <span>Max-students - 500</span>
                        <div className="divider-pill"></div>
                        <span>Expire Date - 12 January 2025</span>
                        <div className="divider-pill"></div>
                        <span>Price - 200$ monthly</span>
                    </div>
                </div>
              </div>
              <div>
              <button className="font-size-sm border-none  px-3 py-2 rounded-3 green-bg text-white">
                Upgrade Plan
              </button>
              </div>
              </div>
            </div>
        </div>
        </>
    )
}
export default Generalsettings;