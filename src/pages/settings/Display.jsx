import { Icon } from "@iconify/react";
import { Navbarsettings } from "../../components/Navbar";
function Display(){
    return(
        <>
        <Navbarsettings />
        <div>
            <h5 className="my-2 fw-bold fs-6">Theme Selection</h5>
            <div className="card border-none shadow-sm rounded-4 py-2 px-3">
              <div className="d-flex flex-row align-items-center justify-content-between border-bottom pb-2 my-2">
              <div className="d-flex align-items-center flex-row gap-2">
                <div className="security-badge">
                <Icon icon="lets-icons:color-mode-light" className="color-primary"/>
                </div>
                <div className="d-block">
                    <p className="fs-6 fw-bold my-0">Light/Dark Mode</p>
                    <p className="gainsboro-color font-size-sm my-0">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil explicabo soluta harum vitae incidunt,
                         eum repudiandae
                    </p>
                </div>
              </div>
              <div>
              <Icon icon="weui:arrow-filled" className="fs-4 gainsboro-color"/>
              </div>
              </div>
              <div className="d-flex flex-row align-items-end justify-content-between  pb-3 my-2">
              <div className="d-flex align-items-center flex-row gap-2">
                <div className="security-badge">
                <Icon icon="fluent:dark-theme-20-filled" className="color-primary"/>
                </div>
                <div className="d-block">
                    <p className="fs-6 fw-bold my-0">Custom Themes</p>
                    <p className="gainsboro-color font-size-sm my-0">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil explicabo soluta harum vitae incidunt,
                         eum repudiandae
                    </p>
                </div>
              </div>
              <div>
              <Icon icon="weui:arrow-filled" className="fs-4 gainsboro-color"/>
              </div>
              </div>

              
            </div>
            <h5 className="mt-3 mb-2 fw-bold fs-6">Font Size And Style</h5>
            <div className="card border-none shadow-sm rounded-4  py-2 px-3">
              <div className="d-flex flex-row align-items-center justify-content-between border-bottom pb-2 my-2">
              <div className="d-flex align-items-center flex-row gap-2">
                <div className="security-badge">
                <Icon icon="gravity-ui:font-case" className="color-primary"/>
                </div>
                <div className="d-block">
                    <p className="fs-6 fw-bold my-0">Ajust Font Size</p>
                    <p className="gainsboro-color font-size-sm my-0">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil explicabo soluta harum vitae incidunt,
                         eum repudiandae
                    </p>
                </div>
              </div>
              <div>
              <Icon icon="weui:arrow-filled" className="fs-4 gainsboro-color"/>
              </div>
              </div>
              <div className="d-flex flex-row align-items-center justify-content-between border-bottom pb-2 my-2">
              <div className="d-flex align-items-center flex-row gap-2">
                <div className="security-badge">
                <Icon icon="radix-icons:font-style" className="color-primary"/>
                </div>
                <div className="d-block">
                    <p className="fs-6 fw-bold my-0">Choose Font Style</p>
                    <p className="gainsboro-color font-size-sm my-0">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil explicabo soluta harum vitae incidunt,
                         eum repudiandae
                    </p>
                </div>
              </div>
              <div>
              <Icon icon="weui:arrow-filled" className="fs-4 gainsboro-color"/>
              </div>
              </div>
            </div>

            <h5 className="mt-3 mb-2 fw-bold fs-6">Notification Display</h5>
            <div className="card border-none shadow-sm rounded-4  py-2 px-3">
              <div className="d-flex flex-row align-items-center justify-content-between border-bottom pb-2 my-2">
              <div className="d-flex align-items-center flex-row gap-2">
                <div className="security-badge">
                <Icon icon="clarity:language-line" className="color-primary"/>
                </div>
                <div className="d-block">
                    <p className="fs-6 fw-bold my-0">Show/hide Notifications</p>
                    <p className="gainsboro-color font-size-sm my-0">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil explicabo soluta harum vitae incidunt,
                         eum repudiandae
                    </p>
                </div>
              </div>
              <div>
              <Icon icon="ep:notification" className="fs-4 gainsboro-color"/>
              </div>
              </div>
              <div className="d-flex flex-row align-items-center justify-content-between border-bottom pb-2 my-2">
              <div className="d-flex align-items-center flex-row gap-2">
                <div className="security-badge">
                <Icon icon="fluent:position-to-back-20-filled" className="color-primary"/>
                </div>
                <div className="d-block">
                    <p className="fs-6 fw-bold my-0">Notification Position</p>
                    <p className="gainsboro-color font-size-sm my-0">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil explicabo soluta harum vitae incidunt,
                         eum repudiandae
                    </p>
                </div>
              </div>
              <div>
              <Icon icon="weui:arrow-filled" className="fs-4 gainsboro-color"/>
              </div>
              </div>
            </div>
        </div>
        </>
    )
}
export default Display;