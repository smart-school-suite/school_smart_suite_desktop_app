import Navbar from "../components/Navbar";
import PieChart from "../components/chartcomponents/pieChart";
import LineChart from "../components/chartcomponents/Linecharts";
import BarChart from "../components/chartcomponents/barChart";
import { Icon } from "@iconify/react";
import CustomTooltip from "../components/Tooltip";
import ProgressGuage from "../components/ProgressGuage";
import CardGroup from "../components/Cardgroup";
import HeatMap from "../components/chartcomponents/heatMap";
import { DashboardNavabarOptions } from "../componentConfigurations/navBarConfig";
import { useNavigate } from "react-router-dom";
function Dashboard(){
    const navigate = useNavigate();
    return(
        <>
        <Navbar 
          options={DashboardNavabarOptions}
        />
                    <div className="container">
         <div className="d-flex flex-row justify-content-between align-items-end mt-2">
            <div className="d-block">
                <div>
                    <p className="my-0">Revenue</p>
                </div>
                <div className="d-flex flex-row align-items-center gap-2">
                    <div>
                    <h3 className="fw-bold my-0 primary-color-dark">$ 23,656,998<span className="light-skyblue-color">.89</span></h3>
                    </div>
                    <div className="d-flex flex-row gap-2">
                        <button className="d-flex flex-row border-none align-items-center rounded-pill primary-background-400 gap-2 primary-color-dark fw-medium px-2 my-0 font-size-sm py-1">
                            <span>
                            <Icon icon="material-symbols:keyboard-double-arrow-up" className="card-icon fs-6"/>
                            </span>
                            <span>+20%</span>
                        </button>
                        <button 
                        className="d-flex flex-row border-none align-items-center rounded-pill primary-background-400 gap-2 primary-color-dark fw-medium px-2 my-0 font-size-sm py-1"
                         onClick={() => {
                             navigate("/register-school")
                         }}
                        >
                            <span>
                            <Icon icon="ic:round-plus" />
                            </span>
                            <span>$5,665,445</span>
                        </button>
                    </div>
                </div>
            </div>
            <div className="d-flex flex-row gap-2 align-items-end">
                <CustomTooltip tooltipText="Download Monthly Report">
                <button className="border-none rounded-circle px-2 py-1 light-skyblue-bg">
                <Icon icon="line-md:download-loop" className="fs-6"/>
                </button>
                </CustomTooltip>
                <CustomTooltip tooltipText=" Date of today Tuesday 3rd January 2024">
                <button className="border-none rounded-circle px-2 py-1 light-skyblue-bg ">
                <Icon icon="mynaui:calendar" className="fs-6"/>
                </button>
                </CustomTooltip>
                <span>Tuesday 3rd January 2024</span>
            </div>
         </div>
         <section className="mt-2">
         <CardGroup />    
         </section>
         
         <section className="mt-2">
            <div className="d-flex flex-row gap-3 w-100 justify-content-between">
                <div style={{ width:"65.5%", height:"31dvh" }} className="bg-white card rounded-4 p-2">
                      <div className="d-flex font-size-sm flex-row justify-content-between px-3 pt-1">
                        <div>
                        <p className="my-0">Expected Fees Vs Paid Fees</p>
                        </div>
                        <div className="d-flex flex-row gap-3 align-items-center">
                            <div style={{ width:"8px", height:"8px", borderRadius:"8px" }} className="light-skyblue-bg"></div>
                            <span>Paid Fees</span>
                            <div style={{ width:"8px", height:"8px", borderRadius:"8px" }} className="light-peach-bg"></div>
                            <span>Expected Fees</span>
                        </div>
                      </div>
                      <BarChart />
                </div>
                <div style={{ width:"31.5%", height:"31dvh" }} className="bg-white  rounded-4 p-2">
                     <p className="text-center font-size-sm">Percentage of Fees Paid</p>
                     <div className="d-flex flex-row justify-content-center pb-5" style={{ overflow:"hidden" }}>
                     <ProgressGuage />
                     </div>
                </div>
            </div>
         </section>
         <section className="mt-2">
            <div className="d-flex flex-row gap-3 w-100 justify-content-between">
                <div style={{ width:"31.5%", height:"31dvh" }} className="bg-white  rounded-4 p-2">
                <p className="text-start font-size-sm my-1">School Revenue Source</p>
                 <div className="w-100 d-flex flex-row justify-content-center h-75 mt-3">
                 <PieChart />
                 </div>
                </div>
                <div style={{ width:"31.5%", height:"31dvh" }} className="bg-white  rounded-4 p-2">
                <p className="text-start font-size-sm my-0">Cost of runing services</p>
                <p className="text-wrap font-size-xs my-0">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus</p>
                <HeatMap /> 
                </div>
                <div style={{ width:"31.5%", height:"31dvh" }} className="bg-white  rounded-4 p-1">
                <p className="text-start font-size-sm my-0">Enrollment Numbers over time</p>
                <LineChart  />
                </div>
            </div>
         </section>
       </div>
        </>
    )
}
export default Dashboard