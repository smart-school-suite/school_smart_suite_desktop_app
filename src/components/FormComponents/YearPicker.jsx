import { useState, useRef, useEffect  } from 'react';
import { Icon } from '@iconify/react';
import { CSSTransition } from 'react-transition-group';
function YearPicker({ 
    minYear = 1900, 
    maxYear = new Date().getFullYear() + 50, 
    disabledYears = [] 
}){
    const [selectedYear, setSelectedYear] = useState(null);
    const [isShowing, setIshowing] = useState(false);
    const yearRef = useRef(null);
    const generateSchoolYears = () => {
        const years = [];
        for (let year = minYear; year <= maxYear; year++) {
            years.push(year);
        }
        return years;
    };
    const toggle = () => {
         setIshowing((prevalue) => !prevalue);
    }
    const schoolYears = generateSchoolYears();
    const isYearDisabled = (year) => {
        return disabledYears.includes(year);
    };
    const handleYearSelect = (year) => {
        if (!isYearDisabled(year)) {
            setSelectedYear(year);
        }
    };
    const handleClickOutside = (event) => {
        if (yearRef.current && !yearRef.current.contains(event.target)) {
          setIshowing(false);
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
          <div className="position-relative" ref={yearRef}>
          <div className="w-100 border p-2 bg-white d-flex flex-row align-items-center justify-content-between rounded-3 z-0 pointer-cursor"
              onClick={() => {
                 toggle();
              }}
            >
                <div className="d-flex flex-row align-items-center gap-3">
                    <span><Icon icon="solar:calendar-linear" /></span>
                    <span>{selectedYear === null ? "2024" : selectedYear}</span>
                </div>
                <div>
                    <span><Icon icon="heroicons:chevron-down-20-solid" className={isShowing ? " transition-3s" : "transition-3s rotate-180"}/></span>
                </div>
            </div>
            <CSSTransition
             in={isShowing}
             timeout={300}
             classNames="dropdown"
             unmountOnExit
            >
            <div className="p-2 bg-white w-100 d-flex flex-column gap-1 mt-1 rounded-3 scrollable-dropdown z-3 position-absolute">
                {schoolYears.map((year, index) => (
                    <button
                        key={index}
                        className={`border-none m-1 rounded-1 p-1 transparent-bg text-start ${ year === selectedYear ? 'selected-school-year' : '' }
                        ${isYearDisabled(year) ? 'disabled' : ''}
                        `}
                        onClick={() => handleYearSelect(year)}
                        disabled={isYearDisabled(year)}
                    >
                        {year}
                    </button>
                ))}
            </div>
            </CSSTransition>
          </div>
        </>
    )
}
export default YearPicker;

export function SchoolYearSelector({ minYear = 2000, maxYear = new Date().getFullYear() + 10,  disabledYears = [], onSelect  }) {
    const [selectedYear, setSelectedYear] = useState(null);
    const [isShowing, setIshowing] = useState(false);
    const schoolYearRef = useRef(null);
    const handle_toggle = () => {
         setIshowing((prevalue) => !prevalue);
    }
    const generateSchoolYears = () => {
        const years = [];
        for (let year = minYear; year <= maxYear; year++) {
            years.push(`${year}-${year + 1}`);
        }
        return years;
    };

    const schoolYears = generateSchoolYears();

    const isYearDisabled = (year) => {
        return disabledYears.includes(year);
    };

    const handleYearSelect = (year) => {
        if (!isYearDisabled(year)) {
            setSelectedYear(year);
            onSelect(year)
             setIshowing(false);
        }
    };
    const handleClickOutside = (event) => {
        if (schoolYearRef.current && !schoolYearRef.current.contains(event.target)) {
          setIshowing(false);
        }
      };
    
      useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, []);
    return (
        <div className='position-relative' ref={schoolYearRef}>
            <div className="p-2 bg-white d-flex border flex-row align-items-center justify-content-between rounded-3 z-0 pointer-cursor" 
              onClick={() => {
                 handle_toggle();
              }}
            >
                <div className="d-flex flex-row align-items-center gap-3" style={{ fontSize:"0.95rem"}}>
                    <span><Icon icon="solar:calendar-linear" /></span>
                    <span>{selectedYear === null ? "Select School Year" : selectedYear}</span>
                </div>
                <div>
                    <span><Icon icon="heroicons:chevron-down-20-solid" className={isShowing ? " transition-3s" : "rotate-180 transition-3s"}/></span>
                </div>
            </div>
            <CSSTransition
              in={isShowing}
              timeout={300}
              classNames="dropdown"
              unmountOnExit
            >
            <div className="p-2 bg-white d-flex flex-column border gap-1 mt-1 rounded-3 position-absolute w-100 z-3">
               <div className="scrollable-dropdown d-flex flex-column gap-1">
                 {schoolYears.map((year, index) => (
                    <button
                        key={index}
                        className={`border-none m-1 year-dropdown-item rounded-1 font-size-sm p-1 transparent-bg text-start ${ year === selectedYear ? 'selected-school-year' : '' }
                        ${isYearDisabled(year) ? 'disabled' : ''}
                        `}
                        onClick={() => handleYearSelect(year)}
                        disabled={isYearDisabled(year)}
                    >
                        {year}
                    </button>
                ))}
               </div>
            </div>
            </CSSTransition>
        </div>
    );
}