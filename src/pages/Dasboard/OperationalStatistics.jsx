import { useFetchOperationalStatsQuery } from "../../Slices/Asynslices/fetchSlice";
import DashboardPageLoader from "../../components/PageLoaders/DashboardPageLoader";
import { Icon } from "@iconify/react";
import CustomTooltip from "../../components/Tooltips/Tooltip";
import { formatDateWithSuffix } from "../../utils/functions";
import PieChart from "../../components/ChartComponents/PieChart";
import { useSelector } from "react-redux";
import NumberFlow from "@number-flow/react";
function OperationalStatistics() {
  const currentYear = new Date().getFullYear();
  const { isLoading, error } = useFetchOperationalStatsQuery({
    year: currentYear,
  });
  const schoolData = useSelector((state) => state.auth.user);
  const currency = schoolData.schoolDetails.school.country.currency;
  if (isLoading) {
    return (
      <>
        <DashboardPageLoader />
      </>
    );
  }
  return (
    <>
      <div className="container pb-3 pt-2">
        <div className="d-flex flex-row justify-content-between align-items-end my-3">
          <div className="d-block">
            <div>
              <p className="my-0">Salary Paid Out</p>
            </div>
            <div className="d-flex flex-row align-items-center gap-2">
              <div>
                <h2 className="fw-bold my-0 primary-color-dark">
                  {currency}
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
          <div className="d-flex flex-row gap-2 align-items-center">
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
        <section>
          
        </section>
        <section className="mt-2">
          <div className="d-flex flex-row gap-3 w-100 justify-content-between">
            <div
              style={{ width: "35%", height: "52dvh" }}
              className="bg-white border  rounded-4 p-2 pt-2"
            >
              <div className="d-flex font-size-sm flex-row justify-content-between  pt-2">
                <div className="text-start mb-1">
                  <span className="fw-semibold">Upcoming Announcements</span>
                </div>
              </div>
              <div className="my-2 font-size-sm">
                <span className="fw-semibold">Announcement Title</span>
                <p className="m-0 fw-light gainsboro-color my-1">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Dolorem sapiente laudantium obcaecati similique cumque modi
                </p>
                <div className="d-flex align-items-center gap-2">
                  <span>
                    <Icon icon="circum:calendar" width="24" height="24" />
                  </span>
                  <span>20 Jan 2024 8:30 pm</span>
                </div>
              </div>
              <div className="my-2 font-size-sm">
                <span className="fw-semibold">Announcement Title</span>
                <p className="m-0 fw-light gainsboro-color my-1">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Dolorem sapiente laudantium obcaecati similique cumque modi
                </p>
                <div className="d-flex align-items-center gap-2">
                  <span>
                    <Icon icon="circum:calendar" width="24" height="24" />
                  </span>
                  <span>20 Jan 2024 8:30 pm</span>
                </div>
              </div>
              <div className="my-2 font-size-sm">
                <span className="fw-semibold">Announcement Title</span>
                <p className="m-0 fw-light gainsboro-color my-1">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Dolorem sapiente laudantium obcaecati similique cumque modi
                </p>
                <div className="d-flex align-items-center gap-2">
                  <span>
                    <Icon icon="circum:calendar" width="24" height="24" />
                  </span>
                  <span>20 Jan 2024 8:30 pm</span>
                </div>
              </div>
            </div>
            <div
              style={{ width: "35%", height: "52dvh" }}
              className="bg-white border  rounded-4 p-2 pt-2"
            >
              <div className="d-flex font-size-sm flex-row justify-content-between  pt-2">
                <div className="text-start mb-1">
                  <span className="fw-semibold">Active Announcements</span>
                </div>
              </div>
              <div className="my-2 font-size-sm">
                <span className="fw-semibold">Announcement Title</span>
                <p className="m-0 fw-light gainsboro-color my-1">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Dolorem sapiente laudantium obcaecati similique cumque modi
                </p>
                <div className="d-flex align-items-center gap-2">
                  <span>
                    <Icon icon="circum:calendar" width="24" height="24" />
                  </span>
                  <span>20 Jan 2024 8:30 pm - 20 Jan 2024 8:30 pm</span>
                </div>
              </div>
              <div className="my-2 font-size-sm">
                <span className="fw-semibold">Announcement Title</span>
                <p className="m-0 fw-light gainsboro-color my-1">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Dolorem sapiente laudantium obcaecati similique cumque modi
                </p>
                <div className="d-flex align-items-center gap-2">
                  <span>
                    <Icon icon="circum:calendar" width="24" height="24" />
                  </span>
                  <span>20 Jan 2024 8:30 pm - 20 Jan 2024 8:30 pm</span>
                </div>
              </div>
              <div className="my-2 font-size-sm">
                <span className="fw-semibold">Announcement Title</span>
                <p className="m-0 fw-light gainsboro-color my-1">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Dolorem sapiente laudantium obcaecati similique cumque modi
                </p>
                <div className="d-flex align-items-center gap-2">
                  <span>
                    <Icon icon="circum:calendar" width="24" height="24" />
                  </span>
                  <span>20 Jan 2024 8:30 pm - 20 Jan 2024 8:30 pm</span>
                </div>
              </div>
            </div>
            <div
              style={{ width: "30%", height: "40dvh" }}
              className="py-2 px-2 d-flex flex-column gap-2"
            >
              <div className="d-flex font-size-sm flex-row justify-content-between ">
                <div className="text-start  d-flex flex-column">
                  <span className="fw-semibold">Announcement Stats</span>
                </div>
              </div>
              <div className="d-flex flex-column align-items-center justify-content-between gap-2 w-100">
                <div className="card w-100 gap-2 d-flex flex-row align-items-center font-size-sm justify-content-start p-1 rounded-3">
                  <div className="card py-3 px-4">
                    <span>
                      <Icon
                        icon="streamline-plump:announcement-megaphone"
                        width="25"
                        height="25"
                      />
                    </span>
                  </div>
                  <div className="d-flex flex-column">
                    <span className="fw-light">Total Announcement</span>
                    <span className="fw-semibold font-size-md">100</span>
                  </div>
                </div>
                <div className="card w-100 gap-2 d-flex flex-row align-items-center font-size-sm justify-content-start p-1 rounded-3">
                  <div className="card py-3 px-4">
                    <span>
                      <Icon
                        icon="arcticons:home-network"
                        width="25"
                        height="25"
                      />
                    </span>
                  </div>
                  <div className="d-flex flex-column">
                    <span className="fw-light">Active Announcement</span>
                    <span className="fw-semibold font-size-md">100</span>
                  </div>
                </div>
                <div className="card w-100 gap-2 d-flex flex-row align-items-center font-size-sm justify-content-start p-1 rounded-3">
                  <div className="card py-3 px-4">
                    <span>
                      <Icon
                        icon="solar:calendar-linear"
                        width="25"
                        height="25"
                      />
                    </span>
                  </div>
                  <div className="d-flex flex-column">
                    <span className="fw-light">Schedule Announcement</span>
                    <span className="fw-semibold font-size-md">100</span>
                  </div>
                </div>
                <div className="card w-100 gap-2 d-flex flex-row align-items-center font-size-sm justify-content-start p-1 rounded-3">
                  <div className="card py-3 px-4">
                    <span>
                      <Icon
                        icon="fluent:alert-urgent-20-regular"
                        width="25"
                        height="25"
                      />
                    </span>
                  </div>
                  <div className="d-flex flex-column">
                    <span className="fw-light">Urgent Announcements</span>
                    <span className="fw-semibold font-size-md">100</span>
                  </div>
                </div>
                <div className="card w-100 gap-2 d-flex flex-row align-items-center font-size-sm justify-content-start p-1 rounded-3">
                  <div className="card py-3 px-4">
                    <span>
                      <Icon
                        icon="fluent:important-20-regular"
                        width="25"
                        height="25"
                      />
                    </span>
                  </div>
                  <div className="d-flex flex-column">
                    <span className="fw-light">Important Announcements</span>
                    <span className="fw-semibold font-size-md">100</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="mt-2">
          <div className="d-flex flex-row align-items-center gap-2">
            <div
              style={{ width: "33%", height: "50dvh" }}
              className="d-flex flex-column gap-2"
            >
              <div className="card bg-white border  rounded-4 p-2">
                <div className="w-100 d-flex flex-row align-items-center font-size-sm">
                  <div className="w-75">
                    <p
                      className="m-0 text-wrap fw-semibold"
                      style={{ fontSize: "0.85rem" }}
                    >
                      Student Union Goverment 2025 Election
                    </p>
                  </div>
                  <div
                    className="d-flex flex-row fw-semibold justify-content-end gap-2 w-25"
                    style={{ color: "#ff0000" }}
                  >
                    <span>
                      <Icon
                        icon="radix-icons:dot-filled"
                        width="15"
                        height="15"
                      />
                    </span>
                    <span>Live</span>
                  </div>
                </div>
                <div className="my-2">
                  <p className="m-0 font-size-sm fw-light gainsboro-color">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Nulla laudantium eaque laborum accusantium saepe sapiente
                    mollitia inventore beatae doloremque est magni rem illum
                  </p>
                </div>
                <div className="d-flex align-items-center gap-2 font-size-sm">
                  <span>
                    <Icon icon="circum:calendar" width="20" height="20" />
                  </span>
                  <span>20 Jan 2024 8:30 pm - 20 Jan 2024 8:30 pm</span>
                </div>
              </div>
              <div className="card w-100 gap-2 d-flex flex-row align-items-center font-size-sm justify-content-start p-1 rounded-3">
                <div className="card py-3 px-4">
                  <span>
                    <Icon
                      icon="fluent:alert-urgent-20-regular"
                      width="25"
                      height="25"
                    />
                  </span>
                </div>
                <div className="d-flex flex-column">
                  <span className="fw-light">Vote Count</span>
                  <span className="fw-semibold font-size-md">100</span>
                </div>
              </div>
              <div className="card w-100 gap-2 d-flex flex-row align-items-center font-size-sm justify-content-start p-1 rounded-3">
                <div className="card py-3 px-4">
                  <span>
                    <Icon
                      icon="fluent:alert-urgent-20-regular"
                      width="25"
                      height="25"
                    />
                  </span>
                </div>
                <div className="d-flex flex-column">
                  <span className="fw-light">Number Of Candidates</span>
                  <span className="fw-semibold font-size-md">100</span>
                </div>
              </div>
              <div className="card w-100 gap-2 d-flex flex-row align-items-center font-size-sm justify-content-start p-1 rounded-3">
                <div className="card py-3 px-4">
                  <span>
                    <Icon
                      icon="fluent:alert-urgent-20-regular"
                      width="25"
                      height="25"
                    />
                  </span>
                </div>
                <div className="d-flex flex-column">
                  <span className="fw-light">Number Of Positions</span>
                  <span className="fw-semibold font-size-md">100</span>
                </div>
              </div>
            </div>
            <div
              style={{ width: "33%", height: "50dvh" }}
              className="d-flex flex-column gap-1"
            >
              <div>
                <p className="text-start font-size-sm my-0 fw-bold">
                  Elections Open For Applications
                </p>
              </div>
              <div className="card bg-white border  rounded-4 p-2">
                <div className="w-100 d-flex flex-row align-items-center font-size-sm">
                  <div className="w-75">
                    <p
                      className="m-0 text-wrap fw-semibold"
                      style={{ fontSize: "0.85rem" }}
                    >
                      Student Union Goverment 2025 Election
                    </p>
                  </div>
                </div>
                <div className="my-2">
                  <p className="m-0 font-size-sm fw-light gainsboro-color">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Nulla laudantium eaque laborum accusantium saepe sapiente
                    mollitia inventore beatae doloremque est magni rem illum
                  </p>
                </div>
                <div className="d-flex align-items-center gap-2 font-size-sm">
                  <span>
                    <Icon icon="circum:calendar" width="20" height="20" />
                  </span>
                  <span>20 Jan 2024 8:30 pm - 20 Jan 2024 8:30 pm</span>
                </div>
                <div className="d-flex align-items-center gap-2 my-1 font-size-sm">
                  <span>
                    <Icon icon="circum:calendar" width="20" height="20" />
                  </span>
                  <span>212 Applications</span>
                </div>
              </div>
              <div className="card bg-white border  rounded-4 p-2">
                <div className="w-100 d-flex flex-row align-items-center font-size-sm">
                  <div className="w-75">
                    <p
                      className="m-0 text-wrap fw-semibold"
                      style={{ fontSize: "0.85rem" }}
                    >
                      Student Union Goverment 2025 Election
                    </p>
                  </div>
                </div>
                <div className="my-2">
                  <p className="m-0 font-size-sm fw-light gainsboro-color">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Nulla laudantium eaque laborum accusantium saepe sapiente
                    mollitia inventore beatae doloremque est magni rem illum
                  </p>
                </div>
                <div className="d-flex align-items-center gap-2 font-size-sm">
                  <span>
                    <Icon icon="circum:calendar" width="20" height="20" />
                  </span>
                  <span>20 Jan 2024 8:30 pm - 20 Jan 2024 8:30 pm</span>
                </div>
                <div className="d-flex align-items-center gap-2 my-1 font-size-sm">
                  <span>
                    <Icon icon="circum:calendar" width="20" height="20" />
                  </span>
                  <span>212 Applications</span>
                </div>
              </div>
            </div>
            <div
              style={{ width: "33%", height: "50dvh" }}
              className="bg-white border  rounded-4 p-2 pt-2"
            >
              <div>
                <p className="text-start font-size-sm my-0 fw-bold">
                  Staff Distribution
                </p>
                <p className="text-wrap font-size-sm gainsboro-color m-0">
                  A chart illustrating the total tuition fees collected each
                  month over the past year.
                </p>
                <div className="d-flex flex-row align-items-center justify-content-center mt-4">
                  <div
                    className="d-flex flex-row align-items-center justify-content-center"
                    style={{ height: "70%", width: "70%" }}
                  >
                    <PieChart
                      resitFees={100}
                      tuitionFee={150}
                      registrationFee={200}
                      additionalFees={250}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
export default OperationalStatistics;

export function CardOne({ data }) {
  return (
    <>
      <div className="rounded-box d-flex flex-row align-items-center justify-content-center light-skyblue-bg">
        <Icon icon="stash:arrow-up-duotone" className="increase-icon fs-5" />
      </div>
      <img
        src="./images/card-one.png"
        alt=""
        className="background-image z-0"
      />
      <div className="overlay-content z-3 ps-2">
        <div className="z-3 position-absolute d-flex flex-column h-100 pb-2 pt-1">
          <div className="d-flex flex-row align-items-center gap-3 mt-1">
            <button
              className="border-none rounded-circle"
              style={{
                width: "2rem",
                height: "2rem",
                borderRadius: "2rem",
                backgroundColor: "#C6E3F1",
              }}
            >
              <Icon
                icon="game-icons:receive-money"
                className="dark-slate-gray-color"
              />
            </button>
            <span>Tuition Fees Paid</span>
          </div>
          <div className="mt-auto">
            <div>
              <h4 className="fw-semibold ms-1 dark-slate-gray-color">
                 <span>{data.currency}</span> <NumberFlow value={data.tuitionFeePaid} />
              </h4>
            </div>
            <div className="d-flex flex-row align-items-center gap-2">
              <button
                className="rounded-pill px-2 py-1 d-flex gap-2 border-none font-size-sm fw-semibold"
                style={{ backgroundColor: "#e5f2f9", color:"#66BB6A" }}
              >
                <span>
                  <Icon
                    icon="material-symbols:keyboard-double-arrow-up"
                    className="increase-icon fs-6"
                  />
                </span>
                <span>5.5%</span>
              </button>
              <span className="font-size-sm">Than Last Year</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function CardTwo({data}) {
  return (
    <>
      <div className="rounded-box d-flex flex-row align-items-center justify-content-center light-peach-bg">
        <Icon icon="stash:arrow-up-duotone" className="increase-icon fs-5" />
      </div>
      <img
        src="./images/card-two.png"
        alt=""
        className="background-image z-0"
      />
      <div className="overlay-content z-3 ps-2">
        <div className="z-3 position-absolute d-flex flex-column h-100 pb-2 pt-1">
          <div className="d-flex flex-row align-items-center gap-3 mt-1">
            <button
              className="border-none rounded-circle"
              style={{
                width: "2rem",
                height: "2rem",
                borderRadius: "2rem",
                backgroundColor: "#FFE4D5",
              }}
            >
              <Icon
                icon="game-icons:receive-money"
                className="dark-slate-gray-color"
              />
            </button>
            <span>Total Expenses</span>
          </div>
          <div className="mt-auto">
            <div>
              <h4 className="fw-semibold ms-1 dark-slate-gray-color">
               <span>{data.currency}</span> <NumberFlow value={data.totalExpenses} />
              </h4>
            </div>
            <div className="d-flex flex-row align-items-center gap-2">
              <button
                className="rounded-pill px-2 py-1 d-flex gap-2 border-none font-size-sm fw-semibold"
                style={{ backgroundColor: "#ffe4d5",  color:"#28a745" }}
              >
                <span>
                  <Icon
                    icon="material-symbols:keyboard-double-arrow-up"
                    className="increase-icon fs-6"
                  />
                </span>
                <span>100.5%</span>
              </button>
              <span className="font-size-sm">Than Last Year</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function CardThree({data}) {
  return (
    <>
      <div className="rounded-box d-flex flex-row align-items-center justify-content-center cornflower-blue-bg">
        <Icon icon="stash:arrow-up-duotone" className="increase-icon fs-5" />
      </div>
      <img
        src="./images/card-three.png"
        alt=""
        className="background-image z-0"
      />
      <div className="overlay-content z-3 ps-2">
        <div className="z-3 position-absolute d-flex flex-column h-100 pb-2 pt-1">
          <div className="d-flex flex-row align-items-center gap-3 mt-1">
            <button
              className="border-none rounded-circle"
              style={{
                width: "2rem",
                height: "2rem",
                borderRadius: "2rem",
                backgroundColor: "#9DBFDC",
              }}
            >
              <Icon
                icon="game-icons:receive-money"
                className="dark-slate-gray-color"
              />
            </button>
            <span>Total Additional Fee Paid</span>
          </div>
          <div className="mt-auto">
            <div>
              <h4 className="fw-semibold ms-1 dark-slate-gray-color">
               <span>{data.currency}</span> <NumberFlow value={data.additionalFeePaid} />
              </h4>
            </div>
            <div className="d-flex flex-row align-items-center gap-2">
              <button
                className="rounded-pill px-2 py-1 d-flex gap-2 border-none font-size-sm fw-semibold"
                style={{ backgroundColor: "#cadced", color:"#ff2323" }}
              >
                <span>
                  <Icon
                    icon="material-symbols:keyboard-double-arrow-up"
                    className="decrease-icon fs-6"
                  
                  />
                </span>
                <span>5.5%</span>
              </button>
              <span className="font-size-sm">Than Last Year</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
