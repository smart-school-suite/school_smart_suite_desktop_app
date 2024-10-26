import { Icon } from "@iconify/react";
import { Navbarsettings } from "../../components/Navbar";
function Security(){
    return(
        <>
        <Navbarsettings />
        <div>
            <h5 className="my-2">Password Management</h5>
            <div className="card border-none shadow-sm rounded-4 py-2 px-3">
              <div className="d-flex flex-row align-items-center justify-content-between border-bottom pb-2 my-2">
              <div className="d-flex align-items-center flex-row gap-2">
                <div className="security-badge">
                <Icon icon="material-symbols:lock-outline" className="color-primary"/>
                </div>
                <div className="d-block">
                    <p className="fs-6 fw-bold my-0">Change Password</p>
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
              <div className="d-flex flex-row align-items-center justify-content-between border-bottom  pb-3 my-2">
              <div className="d-flex align-items-center flex-row gap-2">
                <div className="security-badge">
                <Icon icon="material-symbols:tv-options-input-settings-outline" className="color-primary"/>
                </div>
                <div className="d-block">
                    <p className="fs-6 fw-bold my-0">Password Reset Options</p>
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
              <div className="d-flex flex-row align-items-center justify-content-between  pb-2 my-2">
              <div className="d-flex align-items-center flex-row gap-2">
                <div className="security-badge">
                <Icon icon="material-symbols:lock-outline" className="color-primary"/>
                </div>
                <div className="d-block">
                    <p className="fs-6 fw-bold my-0">Password Strength Indicator</p>
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
            <h5 className="my-2">Security Questions</h5>
            <div className="card border-none shadow-sm rounded-4 py-2 px-3">
              <div className="d-flex flex-row align-items-center justify-content-between border-bottom pb-2 my-2">
              <div className="d-flex align-items-center flex-row gap-2">
                <div className="security-badge">
                <Icon icon="fluent-mdl2:survey-questions" className="color-primary" />
                </div>
                <div className="d-block">
                    <p className="fs-6 fw-bold my-0">View Security Questions</p>
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
              <div className="d-flex flex-row align-items-center justify-content-between  pb-2 my-2">
              <div className="d-flex align-items-center flex-row gap-2">
                <div className="security-badge">
                <Icon icon="mingcute:question-line" className="color-primary" />
                </div>
                <div className="d-block">
                    <p className="fs-6 fw-bold my-0">Set/ Change Security Questions</p>
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
export default Security;