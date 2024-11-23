import { useState, useRef, useEffect } from "react"
import { Icon } from "@iconify/react";
import { CSSTransition } from 'react-transition-group';
function DayPicker({ onDaysChange, disabledDays = [] }){
    const daysOfWeek = [
        { name: 'Monday', value: 'monday' },
        { name: 'Tuesday', value: 'tuesday' },
        { name: 'Wednesday', value: 'wednesday' },
        { name: 'Thursday', value: 'thursday' },
        { name: 'Friday', value: 'friday' },
        { name: 'Saturday', value: 'saturday' },
        { name: 'Sunday', value: 'sunday' },
      ];
      const [selectedDay, setSelectedDay] = useState(null);
      const [isOpen, setIsOpen] = useState(false);
      const daysRef = useRef(null);
      const handleDayClick = (day) => {
        if (disabledDays.includes(day.value)) return; 
    
        const newSelectedDay = selectedDay === day.value ? null : day.value;
        setSelectedDay(newSelectedDay);
        onDaysChange(newSelectedDay); 
      };
      const handleClickOutside = (event) => {
        if (daysRef.current && !daysRef.current.contains(event.target)) {
          setIsOpen(false);
        }
      };
    
      useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, []);
    return(
        <>
          <div className="position-relative" ref={daysRef}>
          <div className="bg-white w-100 border p-2 rounded-2 d-flex flex-row align-items-center justify-content-between z-0 pointer-cursor"
            onClick={() => setIsOpen(!isOpen)}
          >
           <div className="d-flex flex-row align-items-center gap-4">
            <span>
            <Icon icon="solar:calendar-linear" />
            </span>
            <p className="my-0 text-capitalize">{ selectedDay === null ? <>Select Day</> : selectedDay } </p>
           </div>
           <div>
           <Icon icon="heroicons:chevron-down-20-solid" className={isOpen ? "rotate-180 transition-3s" : "transition-3s"}/>
           </div>
         </div>
         <CSSTransition
                in={isOpen}
                timeout={300}
                classNames="dropdown"
                unmountOnExit
            >
                <div className="bg-white z-3 w-100 mt-1 rounded-2 position-absolute d-flex flex-column justify-content-between align-items-start p-2 gap-3">
                    {daysOfWeek.map((day) => (
                        <button
                            key={day.value}
                            className={`border-none z-3 p-1 transparent-bg ${selectedDay === day.value ? 'selected' : ''} ${disabledDays.includes(day.value) ? 'disabled' : ''}`}
                            onClick={() => handleDayClick(day)}
                            disabled={disabledDays.includes(day.value)}
                        >
                            {day.name}
                        </button>
                    ))}
                </div>
            </CSSTransition>
          </div>
        </>
    )
}
export default DayPicker