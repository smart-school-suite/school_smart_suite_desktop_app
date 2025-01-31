import Navbar from "../components/Navbar";
import { ScoresNavBarOptions } from "../componentConfigurations/navBarConfig";
import {
  useFetchStudentsQuery,
  useFetchExamTypesQuery,
  useFetchSpecialtyAccessedExamsQuery,
} from "../Slices/Asynslices/fetchSlice";
import { Icon } from "@iconify/react";
import { CSSTransition } from "react-transition-group";
import { useState } from "react";
import Table from "../components/Tables";
import { useNavigate } from "react-router-dom";
import DataComponent from "../components/dataComponent";
import Pageloaderspinner from "../components/Spinners";
import CleanArrayData, { renameKeys } from "../utils/functions";
function AccessedStudents() {
  const cellStyle = {
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
    height: "100%",
    zIndex: "-1",
  };
  const [colDefs, setColDefs] = useState([
    {
      field: "id",
      hide: true,
    },
    {
      field: "Student Name",
      filter: true,
      floatingFilter: true,
      cellRenderer: DataComponent,
      cellStyle: cellStyle,
    },
    {
      field: "Level",
      filter: true,
      floatingFilter: true,
      cellRenderer: DataComponent,
      cellStyle: cellStyle,
    },
    {
      field: "Specialty",
      filter: true,
      floatingFilter: true,
      cellRenderer: DataComponent,
      cellStyle: cellStyle,
    },
    {
      field: "Parent name",
      filter: true,
      floatingFilter: true,
      cellRenderer: DataComponent,
      cellStyle: cellStyle,
    },
    {
      field: "First Reachable Number",
      filter: true,
      floatingFilter: true,
      cellRenderer: DataComponent,
      cellStyle: cellStyle,
    },
    {
      field: "Gender",
      filter: true,
      floatingFilter: true,
      cellRenderer: DataComponent,
      cellStyle: cellStyle,
    },
    {
      field: "Student Batch",
      filter: true,
      floatingFilter: true,
      cellRenderer: DataComponent,
      cellStyle: cellStyle,
    },
    { field: "Actions", cellRenderer: DropdownComponent },
  ]);
  const { data: students, error, isLoading } = useFetchStudentsQuery();
  const filter_array_keys = [
    "id",
    "specialty.specialty_name",
    "guardian_one.name",
    "level.name",
    "name",
    "phone_one",
    "phone_two",
    "gender",
    "student_batch.name",
  ];
  const renameMapping = {
    id: "id",
    "specialty.specialty_name": "Specialty",
    "guardian_one.name": "Parent name",
    name: "Student Name",
    "level.name": "Level",
    phone_one: "First Reachable Number",
    phone_two: "Second Reachable Number",
    gender: "Gender",
    "student_batch.name": "Student Batch",
  };

  if (isLoading) {
    return <Pageloaderspinner />;
  }
  return (
    <>
      <Navbar options={ScoresNavBarOptions} />
      <div>
        <div className="d-flex flex-row align-items-center mt-4 w-100">
          <div className="d-block">
            <p className="font-size-xs my-0">Total Students</p>
            <h1 className="fw-bold my-0">{students.students.length}</h1>
          </div>
        </div>
      </div>
      <Table
        colDefs={colDefs}
        rowData={renameKeys(
          CleanArrayData(students.students, filter_array_keys),
          renameMapping
        )}
      />
    </>
  );
}
export default AccessedStudents;

function DropdownComponent(props) {
  const { id } = props.data;
  const {
    data: exam_data,
    isLoading: isExamTypeLoading,
    error: examTypeError,
  } = useFetchSpecialtyAccessedExamsQuery({
     student_id:id
  });
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
            <span className="font-size-sm">Add Scores</span>
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
              {isExamTypeLoading ? (
                <span>Loading....</span>
              ) : (
                exam_data.exam_data.map((items) => {
                  return (
                    <>
                      <span
                        key={items.id}
                        className="text-wrap lh-sm mb-1"
                        onClick={() => {
                          navigate(`/create-scores/${items.id}/${id}`);
                        }}
                      >
                        {items.exam_name}
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
