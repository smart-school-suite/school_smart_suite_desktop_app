import  { useState, useRef, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { CSSTransition } from 'react-transition-group';
const DatePicker = ({ 
  disabledDays = [], 
  disabledMonths = [], 
  disabledYears = [], 
  lable, 
  position = "bottom"
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setShowCalendar(false);
  };

  const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const isDateDisabled = (day, month, year) =>
    disabledDays.includes(day) ||
    disabledMonths.includes(month) ||
    disabledYears.includes(year);

  const generateCalendarDays = () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const days = daysInMonth(month, year);
    const firstDay = new Date(year, month, 1).getDay();
    const calendarDays = [];

    for (let i = 0; i < firstDay; i++) {
      calendarDays.push(<div className="day empty" key={`empty-start-${i}`}></div>);
    }

    for (let day = 1; day <= days; day++) {
      const isDisabled = isDateDisabled(day, month, year);
      calendarDays.push(
        <div
          className={`day ${day === selectedDate.getDate() ? 'selected-date' : ''} ${isDisabled ? 'disabled' : ''} font-size-sm`}
          key={day}
          onClick={() => !isDisabled && handleDateChange(new Date(year, month, day))}
        >
          {day}
        </div>
      );
    }

    return calendarDays;
  };

  const toggleCalendar = () => setShowCalendar(!showCalendar);

  const handlePreviousMonth = () => {
    const newDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1);
    setSelectedDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1);
    setSelectedDate(newDate);
  };


  const positionStyles = {
    bottom: { bottom: '100%', left: '0', width:"8dvw !important" },
    top: { top: '100%', left: '0', width:"8dvw !important" },
    left: { top: '0', right: '100%', width:"8dvw !important" },
    right: { top: '0', left: '100%', width:"8dvw !important" },
  };

  return (
    <div className="position-relative" ref={calendarRef}>
      <span>{lable}</span>
      <div
        className="p-2 border bg-white d-flex flex-row justify-content-between rounded-3 w-100 align-items-center pointer-cursor z-0"
        onClick={toggleCalendar}
      >
        <div className="d-flex flex-row gap-3 align-items-center">
          <span>
            <Icon icon="solar:calendar-linear" />
          </span>
          <span>{`${monthNames[selectedDate.getMonth()]} ${selectedDate.getDate()}, ${selectedDate.getFullYear()}`}</span>
        </div>
        <div>
          <span>
            <Icon
              icon="heroicons:chevron-down-20-solid"
              className={showCalendar ? "rotate-180 transition-3s" : "transition-3s"}
            />
          </span>
        </div>
      </div>

      <CSSTransition
        in={showCalendar}
        timeout={300}
        classNames="dropdown"
        unmountOnExit
      >
        <div
          className="calendar position-absolute p-2 rounded-3 border mb-1 bg-white z-2000"
          style={positionStyles[position]}
        >
          <div className="header d-flex flex-row mt-1">
            <div className="p-1 primary-background-100 rounded-2 w-100 d-flex flex-row align-items-center justify-content-between">
              <button
                className="border-none font-size-sm bg-white color-primary"
                style={{ width: "1.8rem", height: "1.8rem", borderRadius: "1.8rem" }}
                onClick={handlePreviousMonth}
              >
                <Icon icon="ion:chevron-back" />
              </button>
              <div>
                <span style={{ fontSize: "0.9rem" }}>
                  {monthNames[selectedDate.getMonth()]}, {selectedDate.getFullYear()}
                </span>
              </div>
              <button
                className="border-none font-size-sm bg-white color-primary"
                style={{ width: "1.8rem", height: "1.8rem", borderRadius: "1.8rem" }}
                onClick={handleNextMonth}
              >
                <Icon icon="ion:chevron-forward" />
              </button>
            </div>
          </div>
          <div className="d-flex flex-row justify-content-center px-1 w-100">
            <div className="days w-100 mt-1">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
                <div className="day font-size-sm" key={index}>
                  {day}
                </div>
              ))}
              {generateCalendarDays()}
            </div>
          </div>
        </div>
      </CSSTransition>
    </div>
  );
};

export default DatePicker;

