import { Icon } from "@iconify/react";
import { SchoolYearSelector } from "../FormComponents/YearPicker";
import { useState, useEffect } from "react";
import DatePicker from "../FormComponents/DatePicker";
import { generateMonthlyWeeks, generateYearlyMonthData } from "../../utils/functions";
function TimeTableGrid() {
  const [isSelected, setIselected] = useState("day");
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth()); // 0-11 (January = 0)
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [weeks, setWeeks] = useState([]);
  const [selectedWeek, setSelectedWeek] = useState(0);
  const [daysInSelectedWeek, setDaysInSelectedWeek] = useState([]);
  useEffect(() => {
    calculateWeeksInMonth(currentMonth, currentYear);
  }, [currentMonth, currentYear]);

  const calculateWeeksInMonth = (month, year) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // Get last date in the month
    const weeks = [];

    for (let i = 1; i <= daysInMonth; i += 7) {
      weeks.push(`${Math.ceil(i / 7)}`);
    }

    setWeeks(weeks);
    setSelectedWeek(0); // Reset to the first week
    setDaysInSelectedWeek(getDaysInWeek(0, month, year));
  };

  const getDaysInWeek = (weekIndex, month, year) => {
    const startDay = weekIndex * 7 + 1; // Calculate the start day for the week
    const days = [];

    for (let i = 0; i < 7; i++) {
      const day = startDay + i;
      if (day <= new Date(year, month + 1, 0).getDate()) {
        days.push(
          `Day ${day} (${new Date(year, month, day).toLocaleDateString()})`
        );
      } else {
        break; // Stop if day exceeds the days in the month
      }
    }

    return days;
  };
  const handleWeekChange = (index) => {
    setSelectedWeek(index);
    setDaysInSelectedWeek(getDaysInWeek(index, currentMonth, currentYear));
  };
  const handle_selection = (lable) => {
    setIselected((prevalue) => prevalue = lable);
  };
  return (
    <>
      <div className="card py-2 rounded-4 w-100">
        <div className="d-flex flex-row justify-content-between mx-2">
          <div className="d-flex flex-row gap-2">
            <div>
              <SchoolYearSelector />
            </div>
            <div className=" d-flex flex-row gap-2 px-1 py-1 rounded-3 primary-background">
              <button
                className={`border-none rounded-3 px-3 font-size-sm ${
                  isSelected === "day"
                    ? "bg-white color-primary transition-3s"
                    : "primary-background transition-3s text-white"
                } fw-semibold`}
                onClick={() => {
                  handle_selection("day");
                }}
              >
                Day
              </button>
              <button
                className={`border-none rounded-3 px-3 font-size-sm ${
                  isSelected === "week"
                    ? "bg-white color-primary transition-3s"
                    : "primary-background transition-3s text-white"
                } fw-semibold`}
                onClick={() => {
                  handle_selection("week");
                }}
              >
                Week
              </button>
              <button
                className={`border-none rounded-3 px-3 font-size-sm ${
                  isSelected === "month"
                    ? "bg-white color-primary transition-3s"
                    : "primary-background transition-3s text-white"
                } fw-semibold`}
                onClick={() => {
                  handle_selection("month");
                }}
              >
                Month
              </button>
            </div>

            <div>
              <DatePicker />
            </div>
          </div>
          <div className="d-flex flex-row align-items-center gap-3">
            <button
              className="border-none d-flex justify-content-center align-items-center"
              style={{
                width: "2.5rem",
                height: "2.5rem",
                borderRadius: "2.5rem",
              }}
            >
              <Icon icon="material-symbols:download" />
            </button>
            <button
              className="border-none p-2 rounded-3 font-size-sm color-primary bg-white fill-hover"
              style={{ outline: "1px solid #0285C6" }}
            >
              Update Calendar
            </button>
          </div>
        </div>
        <div className="table-container w-100">
        <table className="mt-1 custom-table">
             {
                 isSelected === "day" ?
                  <DayGrid /> : 
                  isSelected === "week" ?
                  <WeekGrid /> :
                  isSelected === "month"
                  ? <MonthGrid /> : null
             }
        </table>
        </div>
      </div>
    </>
  );
}
export default TimeTableGrid;

export const WeekGrid = () => {
  const currentDate = new Date();
  const [year, setYear] = useState(currentDate.getFullYear());
  const [month, setMonth] = useState(currentDate.getMonth());

  const weeks = generateMonthlyWeeks(year, month);
  const [selectedWeekIndex, setSelectedWeekIndex] = useState(0);

  const handlePreviousMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
    setSelectedWeekIndex(0);
  };

  const handleNextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
    setSelectedWeekIndex(0);
  };
  return (
    <>
      <thead>
      <tr>
        <td className="first-column border-top">
          <p className="rotate-90 text-center my-0">CAT</p>
        </td>
        <td className="border-top">
          <div className="d-flex flex-row justify-content-between w-100">
            <div className="d-flex flex-row align-items-center gap-2">
               {
                 weeks.map((week, index) => (
                    <button className={`border-none d-flex py-2 px-2 ${selectedWeekIndex === index ? "primary-background text-white transition-3s" : "gainsboro-color transition-3s"} 
                    flex-row align-items-center justify-content-center gap-4 rounded-3 align-items-center`}
                      key={week.week + 11}
                      onClick={() => {
                        setSelectedWeekIndex(index)
                      }}
                    >
                <div className="d-block text-start">
                  <p className="my-0">Week</p>
                  <p className="my-0 font-size-sm text-capitalize">{week.abbreviation}</p>
                </div>
                <h1 className="my-0 fw-bold">{week.week}</h1>
              </button>
                 ))
               }
            </div>
            <div className="d-flex flex-column align-items-center justify-content-between">
              <button className="border-none transparent-bg fs-5 color-primary"
               onClick={() => {
                 handlePreviousMonth();
               }}
              >
              <Icon icon="akar-icons:circle-chevron-up-fill" />
              </button>
              <button className="border-none transparent-bg fs-5 color-primary"
               onClick={() => {
                 handleNextMonth();
               }}
              >
              <Icon icon="akar-icons:circle-chevron-down-fill" />
              </button>
            </div>
          </div>
        </td>
      </tr>
      </thead>
      <tbody className="scrollable-table">
      {
         weeks[selectedWeekIndex].days.map((items, index) => (
            <tr key={index + 10}>
            <td className="first-column">
              <div
                className="d-flex flex-column justify-content-center"
                style={{ height: "4rem" }}
              >
                <p className="my-0 text-end font-size-sm">{`${items.date}, ${items.abbreviation}`}</p>
              </div>
            </td>
            <td>
              <div className="d-flex flex-row align-items-center gap-2">
                <div
                  className=" p-2 primary-background-50 rounded-3 d-flex flex-column"
                  style={{ height: "4rem" }}
                >
                  <div className="d-flex align-items-center justify-content-between">
                    <p className=" my-0 font-size-sm">Activity Title</p>
                    <p className=" my-0 font-size-sm">IC</p>
                  </div>
                  <div>
                    <p className="my-1 font-size-sm text-wrap">
                      faskljdjlaksjdlkasjdlkasj
                    </p>
                  </div>
                  <div className="mt-auto d-flex flex-row justify-content-between font-size-sm">
                    <span>10:00</span>
                    <span>10:30</span>
                  </div>
                </div>
                <div
                  className=" p-2 primary-background-50 rounded-3 d-flex flex-column"
                  style={{ height: "8rem" }}
                >
                  <div className="d-flex align-items-center justify-content-between">
                    <p className=" my-0 font-size-sm">Activity Title</p>
                    <p className=" my-0 font-size-sm">IC</p>
                  </div>
                  <div>
                    <p className="my-0 font-size-sm text-wrap">
                      faskljdjlaksjdlkasjdlkasj
                    </p>
                  </div>
                  <div className="mt-auto d-flex flex-row justify-content-between font-size-sm">
                    <span>10:00</span>
                    <span>10:30</span>
                  </div>
                </div>
                <div
                  className=" p-2 primary-background-50 rounded-3 d-flex flex-column"
                  style={{ height: "8rem" }}
                >
                  <div className="d-flex align-items-center justify-content-between">
                    <p className=" my-0 font-size-sm">Activity Title</p>
                    <p className=" my-0 font-size-sm">IC</p>
                  </div>
                  <div>
                    <p className="my-0 font-size-sm text-wrap">
                      faskljdjlaksjdlkasjdlkasj
                    </p>
                  </div>
                  <div className="mt-auto d-flex flex-row justify-content-between font-size-sm">
                    <span>10:00</span>
                    <span>10:30</span>
                  </div>
                </div>
              </div>
            </td>
          </tr>
         ))
     }
      </tbody>
    </>
  );
};
export const MonthGrid = () => {
    const [yearlyData, setYearlyData] = useState({});
    const [selectedMonth, setSelectedMonth] = useState(null);
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [isLastFiveMonths, setIsLastFiveMonths] = useState(false);

    useEffect(() => {
        const data = generateYearlyMonthData(currentYear);
        setYearlyData(data);
        // Always select January upon initialization (or the first month of the last five months if they were being displayed)
        setSelectedMonth(isLastFiveMonths ? Object.keys(data)[7] : Object.keys(data)[0]);
    }, [currentYear, isLastFiveMonths]);

    const handleNext = () => {
        if (!isLastFiveMonths) {
            setIsLastFiveMonths(true);
            const nextMonths = Object.keys(yearlyData).slice(7, 12);
            setSelectedMonth(nextMonths[0]); // Select the first month of the last five months
        } else {
            const nextYear = currentYear + 1;
            setCurrentYear(nextYear);
            const nextYearData = generateYearlyMonthData(nextYear);
            setYearlyData(nextYearData);
            setSelectedMonth(Object.keys(nextYearData)[0]); // Select the first month of the next year
            setIsLastFiveMonths(false);
        }
    };

    const handlePrevious = () => {
        if (isLastFiveMonths) {
            const initialMonths = Object.keys(yearlyData).slice(0, 7);
            setSelectedMonth(initialMonths[0]); // Select the first month of the first seven months
            setIsLastFiveMonths(false);
        } else {
            const previousYear = currentYear - 1;
            const previousYearData = generateYearlyMonthData(previousYear);
            setYearlyData(previousYearData);
            const lastMonths = Object.keys(previousYearData).slice(7, 12);
            setSelectedMonth(lastMonths[0]); // Select the first month of the last five months of the previous year
            setCurrentYear(previousYear);
            setIsLastFiveMonths(true);
        }
    };

    const months = isLastFiveMonths ? Object.keys(yearlyData).slice(7, 12) : Object.keys(yearlyData).slice(0, 7);
     return(
        <>
              <thead>
      <tr>
        <td className="first-column border-top">
          <p className="rotate-90 text-center my-0">CAT</p>
        </td>
        <td className="border-top">
          <div className="d-flex flex-row justify-content-between w-100">
            <div className="d-flex flex-row align-items-center gap-2">
               {
                 months.map((month, index) => (
                    <button className={`border-none d-flex py-2 px-2 ${ selectedMonth === month  ? "primary-background text-white transition-3s" : "gainsboro-color transition-3s"} 
                    flex-row align-items-center justify-content-center gap-3 rounded-3 align-items-center`}
                      key={index * 99}
                      onClick={() => {
                        setSelectedMonth(month)
                      }}
                    >
                <div className="d-block text-start">
                  <p className="my-0">{currentYear}</p>
                </div>
                <h1 className="my-0 fw-bold">{yearlyData[month].abbreviation}</h1>
              </button>
                 ))
               }
            </div>
            <div className="d-flex flex-column align-items-center justify-content-between">
              <button className="border-none transparent-bg fs-5 color-primary"
               onClick={() => {
                handlePrevious();
               }}
              >
              <Icon icon="akar-icons:circle-chevron-up-fill" />
              </button>
              <button className="border-none transparent-bg fs-5 color-primary"
               onClick={() => {
                handleNext();
               }}
              >
              <Icon icon="akar-icons:circle-chevron-down-fill" />
              </button>
            </div>
          </div>
        </td>
      </tr>
      </thead>
      <tbody className="scrollable-table">
      {
         selectedMonth && yearlyData[selectedMonth].weeks.map((week, index) => (
            <tr key={index + 10}>
            <td className="first-column">
              <div
                className="d-flex flex-column justify-content-center"
                style={{ height: "4rem" }}
              >
                <p className="my-0 text-end font-size-sm">{week}</p>
              </div>
            </td>
            <td>
              <div className="d-flex flex-row align-items-center gap-2">
                <div
                  className=" p-2 primary-background-50 rounded-3 d-flex flex-column"
                  style={{ height: "4rem" }}
                >
                  <div className="d-flex align-items-center justify-content-between">
                    <p className=" my-0 font-size-sm">Activity Title</p>
                    <p className=" my-0 font-size-sm">IC</p>
                  </div>
                  <div>
                    <p className="my-1 font-size-sm text-wrap">
                      faskljdjlaksjdlkasjdlkasj
                    </p>
                  </div>
                  <div className="mt-auto d-flex flex-row justify-content-between font-size-sm">
                    <span>10:00</span>
                    <span>10:30</span>
                  </div>
                </div>
                <div
                  className=" p-2 primary-background-50 rounded-3 d-flex flex-column"
                  style={{ height: "8rem" }}
                >
                  <div className="d-flex align-items-center justify-content-between">
                    <p className=" my-0 font-size-sm">Activity Title</p>
                    <p className=" my-0 font-size-sm">IC</p>
                  </div>
                  <div>
                    <p className="my-0 font-size-sm text-wrap">
                      faskljdjlaksjdlkasjdlkasj
                    </p>
                  </div>
                  <div className="mt-auto d-flex flex-row justify-content-between font-size-sm">
                    <span>10:00</span>
                    <span>10:30</span>
                  </div>
                </div>
                <div
                  className=" p-2 primary-background-50 rounded-3 d-flex flex-column"
                  style={{ height: "8rem" }}
                >
                  <div className="d-flex align-items-center justify-content-between">
                    <p className=" my-0 font-size-sm">Activity Title</p>
                    <p className=" my-0 font-size-sm">IC</p>
                  </div>
                  <div>
                    <p className="my-0 font-size-sm text-wrap">
                      faskljdjlaksjdlkasjdlkasj
                    </p>
                  </div>
                  <div className="mt-auto d-flex flex-row justify-content-between font-size-sm">
                    <span>10:00</span>
                    <span>10:30</span>
                  </div>
                </div>
              </div>
            </td>
          </tr>
         ))
     }
      </tbody>
        </>
     )
}

export function DayGrid(){
    return(
        <>
        </>
    )
}