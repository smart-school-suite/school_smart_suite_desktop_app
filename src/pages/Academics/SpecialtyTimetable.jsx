import Navbar from "../../components/Navbar";
import Table from "../../components/Tables";
import { useState } from "react";
import { Icon } from "@iconify/react";
import Pageloaderspinner from "../../components/Spinners";
import { ExamTimeTableNavbarOptions } from "../../ComponentConfig/navBarConfig";
import { useFetchSemestersQuery } from "../../Slices/Asynslices/fetchSlice";
import { useFetchSchoolSemestersQuery } from "../../Slices/Asynslices/fetchSlice";
import { useNavigate } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import CleanArrayData, { renameKeys } from "../../utils/functions";
import { SpecialtyTimetableTableConfig } from "../../ComponentConfig/AgGridTableConfig";
import { ModalButton } from "../../components/DataTableComponents/ActionComponent";
function SpecialtyTimetable() {
 const { data, isLoading, error } = useFetchSchoolSemestersQuery();
  const filter_array_keys = [
    "id",
    "start_date",
    "end_date",
    "school_year_start",
    "specailty.specialty_name",
    "semester.name",
  ];
  const renameMapping = {
    "id": "id",
    "start_date": "start_date",
    "school_year_start": "school_year",
    "end_date": "end_date",
    "specailty.specialty_name": "specialty_name",
    "semester.name": "semester_name",
  };

  if (isLoading) {
    return <Pageloaderspinner />;
  }
  return (
    <>
      <Navbar options={ExamTimeTableNavbarOptions} />
      <div>
        <div className="d-flex flex-row align-items-center mt-4 w-100">
          <div className="d-block">
            <p className="font-size-xs my-0">Number of semesters</p>
            <h1 className="fw-bold my-0">{data.data.length}</h1>
          </div>
        </div>
        <Table
          colDefs={SpecialtyTimetableTableConfig({
            ActionButton
          })}
          rowData={renameKeys(
            CleanArrayData(data.data, filter_array_keys),
            renameMapping
          )}
          rowHeight={55}
        />
      </div>
    </>
  );
}
export default SpecialtyTimetable;

function ActionButton(){
   return(
    <ModalButton
    classname={
      "border-none green-bg font-size-sm rounded-3 px-3 gap-3 d-flex flex-row align-items-center d-flex text-white"
    }
    >
    <span className="font-size-sm">Create Timetable</span>
    </ModalButton>
   )
}

export function DropdownComponent(props) {
  const { id } = props.data;
  const {
    data: data,
    error: semesterError,
    isLoading: isSemesterLoading,
  } = useFetchSemestersQuery();
  const [isToggled, setIsToggeled] = useState(false);
  const toggleDropdown = () => {
    setIsToggeled((prevalue) => !prevalue);
  };
  const navigate = useNavigate();
  return (
    <>
      <div className="dropdown-box z-1 position-relative">
        <div
          className="selected-box"
          onClick={toggleDropdown}
          aria-haspopup="true"
          aria-expanded={isToggled}
        >
          <div
            className="d-flex flex-row justify-content-between primary-background align-items-center px-2 text-white rounded-3 pointer-cursor"
            style={{
              width: "9vw",
              height: "2.2rem",
            }}
          >
            <span className="font-size-sm">Create Timetable</span>
            <span>
              <Icon
                icon="heroicons:chevron-down-20-solid"
                className={
                  isToggled ? "rotate-180 transition-3s" : "transition-3s"
                }
              />
            </span>
          </div>
        </div>
        <CSSTransition
          in={isToggled}
          timeout={200}
          classNames="dropdown"
          unmountOnExit
        >
          <div className="d-flex flex-column bg-white p-2 rounded-3 w-100 border mt-1 z-3 position-absolute">
            <div className=" d-flex flex-column z-3">
              {isSemesterLoading ? (
                <span>Loading....</span>
              ) : (
                data.data.map((items) => {
                  return (
                    <>
                      <span
                        key={items.id}
                        onClick={() => {
                          navigate(`/create-timetable/${items.id}/${id}`);
                        }}
                      >
                        {items.name}
                      </span>
                    </>
                  );
                })
              )}
            </div>
          </div>
        </CSSTransition>
      </div>
    </>
  );
}
