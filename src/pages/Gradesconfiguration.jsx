import Navbar from "../components/Navbar";
import Greenbutton from "../components/Buttons";
import { GradesConfigurationNavbarOptions } from "../componentConfigurations/navBarConfig";
import { useFetchLetterGradesQuery, useFetchExamsQuery } from "../Slices/Asynslices/fetchSlice";
import Pageloaderspinner from "../components/Spinners";
import DataComponent from "../components/dataComponent";
import { useState } from "react";
import CleanArrayData, {
  renameKeys,
  convertToReadableDate,
} from "../utils/functions";
import { useNavigate } from "react-router-dom";
import Table from "../components/Tables";
function Gradesconfiguration(){
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
      field: "Exam Name",
      filter: true,
      floatingFilter: true,
      cellStyle: cellStyle,
      cellRenderer: DataComponent,
    },
    {
      field: "Semeseter",
      filter: true,
      floatingFilter: true,
      cellStyle: cellStyle,
      cellRenderer: DataComponent,
    },
    {
      field: "Specialty",
      filter: true,
      floatingFilter: true,
      cellStyle: cellStyle,
      cellRenderer: DataComponent,
    },
    {
      field: "Level",
      filter: true,
      floatingFilter: true,
      cellStyle: cellStyle,
      cellRenderer: DataComponent,
    },
    {
      field: "Start Date",
      filter: true,
      floatingFilter: true,
      cellStyle: cellStyle,
      cellRenderer: DataComponent,
    },
    {
      field: "End Date",
      filter: true,
      floatingFilter: true,
      cellStyle: cellStyle,
      cellRenderer: DataComponent,
    },
    {
      field: "School Year",
      filter: true,
      floatingFilter: true,
      cellStyle: cellStyle,
      cellRenderer: DataComponent,
    },
    {
      field: "Weighted Mark",
      filter: true,
      floatingFilter: true,
      cellStyle: cellStyle,
      cellRenderer: DataComponent,
    },
    { field: "Action", cellRenderer: ActionButton },
  ]);
  const { data: exam_data, error, isLoading } = useFetchExamsQuery();
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
  if (isLoading) {
    return <Pageloaderspinner />;
  }
  return (
    <>
      <Navbar options={GradesConfigurationNavbarOptions} />
      <div>
        <div className="d-flex flex-row align-items-center mt-4 w-100">
          <div className="d-block">
            <p className="font-size-xs my-0">Total Number of Exams</p>
            <h1 className="fw-bold my-0">{exam_data.exam_data.length}</h1>
          </div>
        </div>
        {exam_data?.exam_data?.length > 0 ? (
          <Table
            colDefs={colDefs}
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
export default Gradesconfiguration;

function ActionButton(props){
  const { id } = props.data
  const navigate = useNavigate();
   return(
    <>
     <button 
      className="border-none rounded-2 px-1 font-size-sm primary-background text-white text-center"
      style={{ width:"12vw"}}
      onClick={() => {
         navigate(`/configure-exam-grades/${id}`);
      }}
     >
      Configure Grades
     </button>
    </>
   )
}