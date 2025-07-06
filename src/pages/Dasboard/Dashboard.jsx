import PieChart from "../../components/ChartComponents/PieChart";
import BarChart from "../../components/ChartComponents/BarChart";
import LineChart from "../../components/chartcomponents/Linecharts";
import { Icon } from "@iconify/react";
import CustomTooltip from "../../components/Tooltips/Tooltip";
import { DashboardNavabarOptions } from "../../ComponentConfig/navBarConfig";
import { useFetchFinancialStatsQuery } from "../../Slices/Asynslices/fetchSlice";
import { formatNumber } from "../../utils/functions";
import CardGroup from "../../components/Cardgroup";
import Navbar from "../../components/NavBars/Navbar";
import DashboardPageLoader from "../../components/PageLoaders/DashboardPageLoader";
import { formatDateWithSuffix } from "../../utils/functions";
import DoughnutChart from "../../components/ChartComponents/DoughnutChart";
function Dashboard() {
  const { data: data, isLoading } = useFetchFinancialStatsQuery({
    year: 2024,
  });
  const labelsConfig = {
     months:["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"],
     schoolYears:['2021-2022', '2022-2023', '2023-2024', '2024-2025', '2025-2026']
  }
  if (isLoading) {
    return (
      <>
        <Navbar options={DashboardNavabarOptions} />
        <DashboardPageLoader />
      </>
    );
  }
  return (
    <>
      <Navbar options={DashboardNavabarOptions} />
      <div className="container pb-3">
        <div className="d-flex flex-row justify-content-between align-items-end mt-2">
          <div className="d-block">
            <div>
              <p className="my-0">Revenue</p>
            </div>
            <div className="d-flex flex-row align-items-center gap-2">
              <div>
                <h2 className="fw-bold my-0 primary-color-dark">
                  XAF {formatNumber(data.data.revenue_progress.total_revenue)}
                  <span className="light-skyblue-color">.00</span>
                </h2>
              </div>
              <div className="d-flex flex-row gap-2">
                <button
                  className="d-flex flex-row border-none align-items-center rounded-pill primary-background-400 primary-color-dark fw-medium px-2 my-0 font-size-sm py-1"
                  style={{
                    background: "#c8eac8",
                    color: "#2c692d",
                  }}
                >
                  <Icon
                    icon="material-symbols:keyboard-double-arrow-up"
                    className="card-icon fs-6"
                  />
                  <span>+20%</span>
                </button>
                <button
                  className="d-flex flex-row border-none align-items-center rounded-pill gap-1 primary-color-dark fw-medium my-0 font-size-sm"
                  style={{
                    background: "#c8eac8",
                    color: "#2c692d",
                  }}
                >
                  <Icon icon="ic:round-plus" />
                  <span>500,000 XAF</span>
                </button>
              </div>
            </div>
          </div>
          <div className="d-flex flex-row gap-2 align-items-end">
            <CustomTooltip tooltipText="Download Monthly Report">
              <button className="border-none rounded-circle px-2 py-1 light-skyblue-bg">
                <Icon icon="line-md:download-loop" className="fs-6" />
              </button>
            </CustomTooltip>
            <CustomTooltip tooltipText=" Date of today Tuesday 3rd January 2024">
              <button className="border-none rounded-circle px-2 py-1 light-skyblue-bg ">
                <Icon icon="mynaui:calendar" className="fs-6" />
              </button>
            </CustomTooltip>
            <span>{formatDateWithSuffix(new Date())}</span>
          </div>
        </div>
        <section className="mt-2">
          <CardGroup
            totalExpenses={data.data.total_school_expenses}
            studentNumber={data.data.total_tuition_fees_paid}
            tuitionFeesPaid={data.data.total_registration_fee}
          />
        </section>
        <section className="mt-2">
          <div className="d-flex flex-row gap-3 w-100 justify-content-between">
            <div
              style={{ width: "65%", height: "40dvh" }}
              className="bg-white card rounded-4 p-2"
            >
              <div className="d-flex font-size-sm flex-row justify-content-between px-2 pt-2">
                <div className="text-start mb-1">
                  <span className="fw-semibold">School Expenses Over Months</span>
                  <p className="gainsboro-color">Shows monthly distribution of school-related costs over the year.</p>
                </div>
                <div className="d-flex flex-row gap-3 align-items-center">
                  <div
                    style={{ width: "8px", height: "8px", borderRadius: "8px" }}
                    className="light-skyblue-bg"
                  ></div>
                  <span className="fw-semibold">School Expenses</span>
                </div>
              </div>
              <BarChart 
                config={{ 
                   backgroundColor:"#A0D3E8",
                   borderColor:"#A0D3E8",
                   labels:labelsConfig.months,
                   data:[100, 300, 400, 500, 600, 200, 400, 599, 389, 309, 209, 176]
                }}
              />
            </div>
            <div
              style={{ width: "35%", height: "30dvh" }}
              className="bg-white border  rounded-4 p-2 pt-2"
            >
              <div className="mb-3">
                <p className="text-start font-size-sm m-0 fw-semibold">
                School Expenses By Category
              </p>
               <p className="text-start font-size-sm gainsboro-color m-0">
                A visual breakdown of spending across different categories.
              </p>
              </div>
              <DoughnutChart />
            </div>
          </div>
        </section>
        <section className="mt-2">
          <div className="d-flex flex-row gap-3 w-100 justify-content-between">
            <div
              style={{ width: "31.5%", height: "40dvh" }}
              className="bg-white  rounded-4 p-2"
            >
              <div>
                <p className="text-start font-size-sm fw-semibold m-0">
                School Revenue Source
              </p>
              <p className="text-start font-size-sm m-0 gainsboro-color">
                Displays the different sources of income for the school.
              </p>
              </div>
              <div className="w-100 d-flex flex-row justify-content-center h-75 mt-3">
                <PieChart
                  resitFees={100}
                  tuitionFee={150}
                  registrationFee={200}
                  additionalFees={250}
                />
              </div>
            </div>
            <div
              style={{ width: "75%", height: "40dvh" }}
              className="bg-white  rounded-4 p-2"
            >
              <p className="text-start font-size-sm my-0 fw-bold">
                Tuition Fees Paid Over the Last 12 Months
              </p>
              <p className="text-wrap font-size-sm gainsboro-color m-0">
                A chart illustrating the total tuition fees collected each month over the past year.
              </p>
              <div className="w-100" style={{ height:"98%" }}>
                <LineChart
                config={{
                  label: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"],
                  data: [1000, 950, 450, 550, 590, 849, 483, 389, 324, 103, 400, 394, 490],
                }}
              />
              </div>
            </div>
          </div>
        </section>
        <section className="mt-2">
          <div className="d-flex flex-row gap-3 w-100 justify-content-between">
            <div
              className="card p-2 rounded-4"
              style={{ width: "50%", height: "40dvh" }}
            >
              <div>
                <p className="text-start font-size-sm m-0 fw-semibold">
                Registration Fees Collected Over a 5-Year Period
              </p>
              <p className="text-start font-size-sm m-0 gainsboro-color">
               A graph showing the annual registration fees received by the school over the past five years.
              </p>
              </div>
              <BarChart 
                 config={{ 
                   backgroundColor:"#ffe3e1",
                   borderColor:"#ffa7a1",
                   labels:labelsConfig.schoolYears,
                   data:[100, 300, 400, 500, 150]
                }}
              />
            </div>
            <div
              className="card p-2 rounded-4"
              style={{ width: "50%", height: "40dvh" }}
            >
              <p className="text-start font-size-sm my-0">
                Enrollment Numbers over Past Five Years
              </p>
              <h5 className="fw-bold">5000</h5>
              <LineChart
                config={{
                  label: ["2021", "2022", "2023", "2024", "2025"],
                  data: [100, 20, 323, 40, 50],
                }}
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
export default Dashboard;
