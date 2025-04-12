import PieChart from "../../components/chartcomponents/pieChart";
import BarChart from "../../components/chartcomponents/barChart";
import LineChart from "../../components/chartcomponents/Linecharts";
import { Icon } from "@iconify/react";
import CustomTooltip from "../../components/Tooltip";
import ProgressGuage from "../../components/ProgressGuage";
import HeatMap from "../../components/chartcomponents/heatMap";
import { DashboardNavabarOptions } from "../../ComponentConfig/navBarConfig";
import { useFetchFinancialStatsQuery } from "../../Slices/Asynslices/fetchSlice";
import { formatNumber } from "../../utils/functions";
import CardGroup from "../../components/Cardgroup";
import Navbar from "../../components/Navbar";
import DashboardPageLoader from "../../components/PageLoaders/DashboardPageLoader";
import { formatDateWithSuffix } from "../../utils/functions";
function Dashboard() {
  const { data: data, error, isLoading } = useFetchFinancialStatsQuery();
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
      <div className="container">
        <div className="d-flex flex-row justify-content-between align-items-end mt-2">
          <div className="d-block">
            <div>
              <p className="my-0">Revenue</p>
            </div>
            <div className="d-flex flex-row align-items-center gap-2">
              <div>
                <h3 className="fw-bold my-0 primary-color-dark">
                  $ {formatNumber(data.data.total_expenses)}
                  <span className="light-skyblue-color">.89</span>
                </h3>
              </div>
              <div className="d-flex flex-row gap-2">
                <button className="d-flex flex-row border-none align-items-center rounded-pill primary-background-400 gap-2 primary-color-dark fw-medium px-2 my-0 font-size-sm py-1">
                  <span>
                    <Icon
                      icon="material-symbols:keyboard-double-arrow-up"
                      className="card-icon fs-6"
                    />
                  </span>
                  <span>+20%</span>
                </button>
                <button className="d-flex flex-row border-none align-items-center rounded-pill primary-background-400 gap-2 primary-color-dark fw-medium px-2 my-0 font-size-sm py-1">
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
            totalExpenses={data.data.total_expenses}
            studentNumber={data.data.total_students}
            tuitionFeesPaid={data.data.expected_fees}
          />
        </section>

        <section className="mt-2">
          <div className="d-flex flex-row gap-3 w-100 justify-content-between">
            <div
              style={{ width: "65.5%", height: "31dvh" }}
              className="bg-white card rounded-4 p-2"
            >
              <div className="d-flex font-size-sm flex-row justify-content-between px-3 pt-1">
                <div>
                  <p className="my-0">Expected Fees Vs Paid Fees</p>
                </div>
                <div className="d-flex flex-row gap-3 align-items-center">
                  <div
                    style={{ width: "8px", height: "8px", borderRadius: "8px" }}
                    className="light-skyblue-bg"
                  ></div>
                  <span>Paid Fees</span>
                  <div
                    style={{ width: "8px", height: "8px", borderRadius: "8px" }}
                    className="light-peach-bg"
                  ></div>
                  <span>Expected Fees</span>
                </div>
              </div>
              <BarChart />
            </div>
            <div
              style={{ width: "31.5%", height: "31dvh" }}
              className="bg-white  rounded-4 p-2"
            >
              <p className="text-center font-size-sm">
                Percentage of Fees Paid
              </p>
              <div
                className="d-flex flex-row justify-content-center pb-5"
                style={{ overflow: "hidden" }}
              >
                <ProgressGuage
                  progress={Number(data.data.percentage_fees_paid)}
                />
              </div>
            </div>
          </div>
        </section>
        <section className="mt-2">
          <div className="d-flex flex-row gap-3 w-100 justify-content-between">
            <div
              style={{ width: "31.5%", height: "31dvh" }}
              className="bg-white  rounded-4 p-2"
            >
              <p className="text-start font-size-sm my-1">
                School Revenue Source
              </p>
              <div className="w-100 d-flex flex-row justify-content-center h-75 mt-3">
                <PieChart
                  resitFees={data.data.school_revenue_source.student_resit}
                  tuitionFee={data.data.school_revenue_source.tuition_fees}
                  registrationFee={
                    data.data.school_revenue_source.registration_fees
                  }
                  additionalFees={
                    data.data.school_revenue_source.additional_fees
                  }
                />
              </div>
            </div>
            <div
              style={{ width: "31.5%", height: "31dvh" }}
              className="bg-white  rounded-4 p-2"
            >
              <p className="text-start font-size-sm my-0">
                Cost of runing services
              </p>
              <p className="text-wrap font-size-xs my-0">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptatibus
              </p>
              <HeatMap />
            </div>
            <div
              style={{ width: "31.5%", height: "31dvh" }}
              className="bg-white  rounded-4 p-1"
            >
              <p className="text-start font-size-sm my-0">
                Enrollment Numbers over time
              </p>
              <LineChart />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
export default Dashboard;
