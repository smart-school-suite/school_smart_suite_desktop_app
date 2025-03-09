import Navbar from "../../components/Navbar";
import { Icon } from "@iconify/react";
import { useState } from "react";
import Pageloaderspinner from "../../components/Spinners";
import { CSSTransition } from "react-transition-group";
import {
  useFetchExamsQuery,
  useFetchSemestersQuery,
} from "../../Slices/Asynslices/fetchSlice";
import CleanArrayData, {
  renameKeys,
} from "../../utils/functions";
import Table from "../../components/Tables";
import { useNavigate } from "react-router-dom";
import { ExamTimetableConfig } from "../../ComponentConfig/AgGridTableConfig";
import { ExamTimeTableNavbarOptions } from "../../ComponentConfig/navBarConfig";
function ExamTimetable() {
  const { data: exam_data, error:examError, isLoading:isExamLoading } = useFetchExamsQuery();
  const filter_array_keys = [
    "id",
    "examtype.exam_name",
    "semester.name",
    "specialty.specialty_name",
    "specialty.level.name",
    "start_date",
    "end_date",
    "school_year",
    "weighted_mark",
  ];
  const renameMapping = {
    id: "id",
    "examtype.exam_name": "Exam Name",
    "semester.name": "Semeseter",
    "specialty.specialty_name": "Specialty",
    "specialty.level.name": "Level",
    start_date: "Start Date",
    end_date: "End Date",
    school_year: "School Year",
    weighted_mark: "Weighted Mark",
  };
  if (isExamLoading) {
    return <Pageloaderspinner />;
  }
  return (
    <>
      <Navbar options={ExamTimeTableNavbarOptions} />
      <div>
        <div className="d-flex flex-row align-items-center mt-4 w-100">
          <div className="d-block">
            <p className="font-size-xs my-0">Total Number of Exams</p>
            <h1 className="fw-bold my-0">{exam_data.exam_data.length}</h1>
          </div>
        </div>
        {exam_data?.exam_data?.length > 0 ? (
          <Table
            colDefs={ExamTimetableConfig({ DropdownComponent })}
            rowData={renameKeys(
              CleanArrayData(exam_data.exam_data, filter_array_keys),
              renameMapping
            )}
          />
        ) : (
          <div className="alert alert-warning">
            Oops, looks like you don't have any teachers.
          </div>
        )}
      </div>
    </>
  );
}
export default ExamTimetable;

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
              width: "8.2vw",
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
                               navigate(`/create-examtimtable/${items.id}/${id}`)
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
