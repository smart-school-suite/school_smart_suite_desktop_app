import Navbar from "../components/Navbar";
import Table from "../components/Tables";
import { useState } from "react";
import DataComponent from "../components/dataComponent";
import { Icon } from "@iconify/react";
import Pageloaderspinner from "../components/Spinners";
import { useFetchSpecialtiesQuery } from "../Slices/Asynslices/fetchSlice";
import { ExamTimeTableNavbarOptions } from "../componentConfigurations/navBarConfig";
import { useFetchSemestersQuery } from "../Slices/Asynslices/fetchSlice";
import { useNavigate } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import  CleanArrayData, { renameKeys } from "../utils/functions";

function SpecialtyTimetable(){
    const [colDefs, setColDefs] = useState([
        {
          field: "id",
          hide: true,
        },
        {
          field: "Specialty Name",
          filter: true,
          floatingFilter: true,
          cellRenderer: DataComponent,
          cellStyle: {
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            height: "100%",
            zIndex: "-1",
          },
        },
        {
          field: "Registration Fee",
          filter: true,
          floatingFilter: true,
          cellRenderer: DataComponent,
          cellStyle: {
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            height: "100%",
            zIndex: "-1",
          },
        },
        {
          field: "School Fee",
          filter: true,
          floatingFilter: true,
          cellRenderer: DataComponent,
          cellStyle: {
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            height: "100%",
            zIndex: "-1",
          },
        },
        {
          field: "Level Name",
          filter: true,
          floatingFilter: true,
          cellRenderer: DataComponent,
          cellStyle: {
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            height: "100%",
            zIndex: "-1",
          },
        },
        {
          field: "Level",
          filter: true,
          floatingFilter: true,
          cellRenderer: DataComponent,
          cellStyle: {
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            height: "100%",
            zIndex: "-1",
          },
        },
        { field: "Action", cellRenderer: DropdownComponent },
      ]);
      const { data: specialty, error, isLoading } = useFetchSpecialtiesQuery();
      const filter_array_keys = [
        "id",
        "specialty_name",
        "registration_fee",
        "level.name",
        "level.level",
        "school_fee",
      ];
      const renameMapping = {
        id: "id",
        specialty_name: "Specialty Name",
        registration_fee: "Registration Fee",
        "level.name": "Level Name",
        "level.level": "Level",
        school_fee: "School Fee",
      };
    
      if (isLoading) {
        return <Pageloaderspinner />;
      }
     return(
        <>
              <Navbar options={ExamTimeTableNavbarOptions} />
      <div>
        <div className="d-flex flex-row align-items-center mt-4 w-100">
          <div className="d-block">
            <p className="font-size-xs my-0">Total Number specialties</p>
            <h1 className="fw-bold my-0">{specialty.specialty.length}</h1>
          </div>
        </div>
        <Table
          colDefs={colDefs}
          rowData={renameKeys(
            CleanArrayData(specialty.specialty, filter_array_keys),
            renameMapping
          )}
        />
      </div>
        </>
     )
}
export default SpecialtyTimetable;

export function DropdownComponent(props) {
    const { id } = props.data;
    const {
      data: semester_data,
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
                {
                   isSemesterLoading ? <span>Loading....</span> : 
                    semester_data.semester_data.map((items) => {
                        return(
                           <>
                            <span key={items.id}
                              onClick={() => {
                                 navigate(`/create-timetable/${items.id}/${id}`)
                              }}
                            >{items.name}</span>
                           </>
                        )
                    })
                }
              </div>
            </div>
          </CSSTransition>
        </div>
      </>
    );
  }