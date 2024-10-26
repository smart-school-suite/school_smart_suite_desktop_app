import { Icon } from "@iconify/react";
import { Navbarsettings } from "../../components/Navbar";
function Help(){
    return(
        <>
        <Navbarsettings />
        <div>
            <h5 className="my-2 fw-bold fs-6">Help And Support</h5>
            <div className="card border-none shadow-sm rounded-4 py-2 px-3">
              <div className="d-flex flex-row align-items-center justify-content-between border-bottom pb-2 my-2">
              <div className="d-flex align-items-center flex-row gap-2">
                <div className="security-badge">
                <Icon icon="wpf:faq" className="color-primary"/>
                </div>
                <div className="d-block">
                    <p className="fs-6 fw-bold my-0">FAQs</p>
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
                <Icon icon="streamline:customer-support-1" className="color-primary"/>
                </div>
                <div className="d-block">
                    <p className="fs-6 fw-bold my-0">Customer Support</p>
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
            <h5 className="mt-3 mb-2 fw-bold fs-6">Language And Region</h5>
            <div className="card border-none shadow-sm rounded-4  py-2 px-3">
              <div className="d-flex flex-row align-items-center justify-content-between border-bottom pb-2 my-2">
              <div className="d-flex align-items-center flex-row gap-2">
                <div className="security-badge">
                <Icon icon="clarity:language-line" className="color-primary"/>
                </div>
                <div className="d-block">
                    <p className="fs-6 fw-bold my-0">Select Language</p>
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
                <Icon icon="carbon:cics-region" className="color-primary"/>
                </div>
                <div className="d-block">
                    <p className="fs-6 fw-bold my-0">Timezone And Region</p>
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
export default Help;