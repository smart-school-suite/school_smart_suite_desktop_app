import Navbar from "../../components/NavBars/Navbar";
import DashboardPageLoader from "../../components/PageLoaders/DashboardPageLoader";
import { DashboardNavabarOptions } from "../../ComponentConfig/navBarConfig";
import { useFetchAcademicStatsQuery } from "../../Slices/Asynslices/fetchSlice";
import CardGroup from "../../components/Cardgroup";
import { Icon } from "@iconify/react";
import BarChart from "../../components/ChartComponents/BarChart";
import LineChart from "../../components/chartcomponents/Linecharts";
function AcademicStatistics() {
  const { isLoading, error } = useFetchAcademicStatsQuery({
    year: 2025,
  });
  const labelsConfig = {
    months: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ],
    schoolYears: [
      "2021-2022",
      "2022-2023",
      "2023-2024",
      "2024-2025",
      "2025-2026",
    ],
  };
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
      <div className="mt-4">
        <CardGroup />
      </div>
      <div className="d-flex flex-row align-items-center w-100 gap-2 mt-2">
        <div style={{ width: "40%" }}>
          <div className="d-flex flex-row align-items-center gap-2 w-100">
            <div className="card w-50 p-1 rounded-3 d-flex flex-row align-items-center">
              <div className="w-50 font-size-sm">
                <span>CA Exam Pass Rate</span>
              </div>
            </div>
            <div className="card w-50">IC</div>
          </div>
          <div className="d-flex flex-row align-items-center my-2 gap-2 w-100">
            <div className="card w-50 p-1 rounded-3 d-flex flex-row align-items-center">
              <div className="w-50 font-size-sm">
                <span>CA Exam Pass Rate</span>
              </div>
            </div>
            <div className="card w-50">IC</div>
          </div>
        </div>
        <div style={{ width: "30%" }} className="d-flex flex-column gap-2">
          <span className="font-size-sm">Upcoming Exams</span>
          <div className="card p-2 rounded-4 gap-2 font-size-sm d-flex flex-column">
            <div className="d-flex flex-column">
              <span className="font-size-sm fw-semibold">
                First Semester CA
              </span>
              <span>Software Engineering, Level 100</span>
            </div>
            <p className="m-0 gainsboro-color fw-light">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Praesentium quas facilis delectus nobis ratione
            </p>
            <div className="d-flex flex-column">
              <span>30 Marks</span>
              <span>
                {" "}
                <Icon icon="circum:calendar" width="20" height="20" /> 10 Jan
                2025 - 20 Jan 2025
              </span>
            </div>
          </div>
          <div className="card p-2 rounded-4 gap-2 font-size-sm d-flex flex-column">
            <div className="d-flex flex-column">
              <span className="font-size-sm fw-semibold">
                First Semester CA
              </span>
              <span>Software Engineering, Level 100</span>
            </div>
            <p className="m-0 gainsboro-color fw-light">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Praesentium quas facilis delectus nobis ratione
            </p>
            <div className="d-flex flex-column">
              <span>30 Marks</span>
              <span>
                {" "}
                <Icon icon="circum:calendar" width="20" height="20" /> 10 Jan
                2025 - 20 Jan 2025
              </span>
            </div>
          </div>
        </div>
        <div style={{ width: "30%" }}></div>
      </div>
      <div className="d-flex flex-row align-items-center gap-2 mt-2">
        <div className="card w-50 rounded-4 p-2">
          <div className="font-size-sm d-flex flex-column mb-4">
            <span className="fw-semibold font-size-sm">
              Pass Rate Over 5 years
            </span>
            <span className="gainsboro-color">Number Of Resits Over Years</span>
          </div>
          <LineChart
            config={{
              label: labelsConfig.schoolYears,
              data: [80, 99, 71, 48, 78, 90],
              bgColor:"#d9ffe3",
              borderColor:"#3fee73"
            }}
          />
        </div>
         <div className="card w-50 rounded-4 p-2">
          <div className="font-size-sm d-flex flex-column mb-4">
            <span className="fw-semibold font-size-sm">
              Fail Rate Over 5 years
            </span>
            <span className="gainsboro-color">Number Of Resits Over Years</span>
          </div>
          <LineChart
            config={{
              label: labelsConfig.schoolYears,
              data: [80, 99, 71, 48, 78, 90],
              borderColor:"#c30d31",
              bgColor:"#ffccd0"
            }}
          />
        </div>
      </div>
      <div className="d-flex flex-row align-items-center justify-content-center mt-2 gap-2">
        <div className="card w-50 p-2 rounded-4" style={{ height: "40dvh" }}>
          <div className="font-size-sm d-flex flex-column mb-4">
            <span className="fw-semibold font-size-sm">Resit Numbers </span>
            <span className="gainsboro-color">Number Of Resits Over Years</span>
          </div>
          <BarChart
            config={{
              backgroundColor: "#A0D3E8",
              borderColor: "#A0D3E8",
              labels: labelsConfig.schoolYears,
              data: [
                100, 300, 400, 500, 600, 200, 400, 599, 389, 309, 209, 176,
              ],
            }}
          />
        </div>
        <div className="card w-50 p-2 rounded-4 border-none" style={{ height:"40dvh" }}>
             <div className="font-size-sm d-flex flex-column mb-4">
            <span className="fw-semibold font-size-sm">
              Average Gpa Over Time
            </span>
            <span className="gainsboro-color">Number Of Resits Over Years</span>
          </div>
          <LineChart
            config={{
              label: labelsConfig.schoolYears,
              data: [80, 99, 71, 48, 78, 90],
              borderColor:"#c30d31",
              bgColor:"#ffccd0"
            }}
          />
        </div>
      </div>
    </>
  );
}
export default AcademicStatistics;
