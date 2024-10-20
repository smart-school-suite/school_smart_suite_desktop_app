import { Icon } from "@iconify/react";
function Sidebar(){
    return(
        <>
                    <div className="col-lg-2 pe-0">
            <aside className="height-100 white-bg d-flex flex-column ps-3 pt-2">
              <div className="logo-area">
                <div className="d-flex align-items-center flex-row gap-3">
                  <span>
                    <Icon icon="basil:book-open-solid" className="color-primary fs-5"/>
                  </span>
                  <h4 className="my-0 fs-6 fw-bold color-primary">Edumanage</h4>
                </div>
              </div>
              <div className="nav-container mt-3">
                <div className="nav-items">
                 <div className="d-flex flex-column gap-1">
                 <div className="nav-item-box-active fw-bold">
                    <div className="nav-item w-100 d-flex flex-row gap-2">
                      <span>
                        <Icon icon="radix-icons:dashboard" />
                      </span>
                      <p>Dashboard</p>
                    </div>
                  </div>
                 <div className="nav-item-box-inactive">
                    <div className="nav-item w-100 d-flex flex-row gap-2">
                      <span>
                        <Icon icon="ri:admin-line" />
                      </span>
                      <p>Administrator</p>
                    </div>
                    <span>
                      <Icon icon="octicon:chevron-down-24" className="nav-dropdown-icon" />
                    </span>
                  </div>
                  <div className="nav-item-box-inactive">
                    <div className="nav-item w-100 d-flex flex-row gap-2">
                      <span>
                        <Icon icon="mdi:book-edit-outline" />
                      </span>
                      <p>Academics</p>
                    </div>
                    <span>
                      <Icon icon="octicon:chevron-down-24" className="nav-dropdown-icon" />
                    </span>
                  </div>
                  <div className="nav-item-box-inactive">
                    <div className="nav-item w-100 d-flex flex-row gap-2">
                      <span>
                        <Icon icon="ph:student" />
                      </span>
                      <p>Student Management</p>
                    </div>
                    <span>
                      <Icon icon="octicon:chevron-down-24" className="nav-dropdown-icon" />
                    </span>
                  </div>
                  <div className="nav-item-box-inactive">
                    <div className="nav-item w-100 d-flex flex-row gap-2">
                      <span>
                        <Icon icon="healthicons:money-bag-outline" />
                      </span>
                      <p>Finances</p>
                    </div>
                    <span>
                      <Icon icon="octicon:chevron-down-24" className="nav-dropdown-icon" />
                    </span>
                  </div>
                  <div className="nav-item-box-inactive">
                    <div className="nav-item w-100 d-flex flex-row gap-2">
                      <span>
                        <Icon icon="tabler:transfer" />
                      </span>
                      <p>Transfers</p>
                    </div>
                    <span>
                      <Icon icon="octicon:chevron-down-24" className="nav-dropdown-icon" />
                    </span>
                  </div>
                  <div className="nav-item-box-inactive">
                    <div className="nav-item w-100 d-flex flex-row gap-2">
                      <span>
                        <Icon icon="ic:outline-event-available" />
                      </span>
                      <p>Events</p>
                    </div>
                  </div>
                  <div className="nav-item-box-inactive">
                    <div className="nav-item w-100 d-flex flex-row gap-2">
                      <span>
                        <Icon icon="uil:message" />
                      </span>
                      <p>Media</p>
                    </div>
                    <div className="d-flex flex-row align-items-center gap-2">
                      <span className="media-pill font-size-xs bg-danger text-white rounded-pill px-2">100</span>
                      <span>
                        <Icon icon="octicon:chevron-down-24" className="nav-dropdown-icon" />
                      </span>
                    </div>
                  </div>
                  <div className="nav-item-box-inactive">
                    <div className="nav-item w-100 d-flex flex-row gap-2">
                      <span>
                        <Icon icon="streamline:customer-support-1" />
                      </span>
                      <p>Customer Supportsss</p>
                    </div>
                  </div>
                  <div className="nav-item-box-inactive">
                    <div className="nav-item w-100 d-flex flex-row gap-2">
                      <span>
                        <Icon icon="uil:setting" />
                      </span>
                      <p>Settings</p>
                    </div>
                  </div>

                 </div>
                </div>
              </div>
                  <div className="bottom-section mt-auto d-flex flex-column justify-content-center align-items-center pe-3">
                    <div className="card border-none primary-background-100 w-100 py-2">
                      <div className="d-flex flex-row align-items-center gap-2 font-size-sm my-2 px-2  ms-2">
                        <p className="my-0">
                          <Icon
                            icon="material-symbols:next-plan"
                            className="fs-6  color-primary "
                          />
                        </p>
                        <span>Ultimate Plan</span>
                      </div>
                      <div className="d-flex flex-row align-items-center gap-3 font-size-sm my-2 px-2  ms-2">
                        <span>Payment Type</span>
                        <p className="my-0 color-primary fw-medium">Yearly</p>
                      </div>
                      <div className="d-flex flex-row align-items-center gap-3 font-size-sm my-2 px-2  ms-2">
                        <span>Expires At</span>
                        <p className="my-0 color-primary fw-medium">12 Jan 2025</p>
                      </div>
                      <div className="d-flex flex-row justify-content-center px-3">
                        <button className="border-none primary-background rounded-2 text-white font-size-xs fw-medium py-2 w-100 ">upgrade plan</button>
                      </div>
                    </div>
                    <div>
                    <hr className="bg-primary w-100"/>
                      <span className="font-size-sm gainsboro-color mb-5">
                        @2024 Edumanage Company
                      </span>
                    </div>
                  </div>
            </aside>
          </div>
        </>
    )
}
export default Sidebar;