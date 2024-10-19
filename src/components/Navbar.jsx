import { Icon } from "@iconify/react";
function Navbar(){
    return(
        <>
        <div className="container-fliud">
                <nav className="w-100 d-flex flex-row mt-2 gap-3">
                  <div className="section-one">
                    <div className="school-desc-group d-flex flex-row align-items-center gap-3">
                      <div className="nav-badge primary-background-100 fs-5 fw-bold color-primary rounded-circle d-flex flex-row align-items-center justify-content-center">
                        SY
                      </div>
                      <div className="d-block font-size-sm text-secondary fw-medium">
                        <p className="my-0">SIANTO</p>
                        <p className="my-0">Yaounde</p>
                      </div>
                    </div>
                    </div>
                    <div className="section-two white-background d-flex flex-row align-items-center justify-content-center gap-2 px-2 py-1 rounded-pill">
                      <button className="active">
                        <span>
                        <Icon icon="mdi:finance" className="fs-4"/>
                        </span>
                        <span>Financial Analysis</span>
                      </button>
                      <button className="inactive">
                        <span>
                        <Icon icon="ic:round-school" className="fs-4"/>
                        </span>
                        <span>Academic Analysis</span>
                      </button>
                      <button className="inactive">
                        <span>
                        <Icon icon="ep:operation" className="fs-4"/>
                        </span>
                        <span>Operational Analysis</span>
                      </button>
                    </div>
                    <div className="last-section d-flex flex-row justify-content-end d-flex justify-content-end">
                      <div className="last-section-items gap-2 d-flex flex-row">
                        <div className="nav-badge white-bg rounded-circle d-flex fs-4  flex-row justify-content-center align-items-center">
                         <Icon icon="material-symbols:search" style={{ color:"#D5D5D5" }}/>
                        </div>
                        <div className="nav-badge white-bg rounded-circle d-flex fs-4 flex-row justify-content-center align-items-center">
                         <Icon icon="solar:bell-linear" style={{ color:"#D5D5D5" }}/>
                        </div>
                        <div className="nav-badge white-bg rounded-circle ">
                          <img src="./protrait.jpg" alt="" className="nav-top-img"/>
                        </div>
                      </div>
                  </div>
                </nav>
              </div>
        </>
    )
}
export default Navbar;