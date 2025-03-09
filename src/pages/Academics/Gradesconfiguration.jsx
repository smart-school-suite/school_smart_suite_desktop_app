import Navbar from "../components/Navbar";
import { GradesConfigurationNavbarOptions } from "../../ComponentConfig/navBarConfig";
import {  useFetchExamsQuery } from "../Slices/Asynslices/fetchSlice";
import Pageloaderspinner from "../components/Spinners";
import CleanArrayData, { renameKeys } from "../utils/functions";
import { useNavigate } from "react-router-dom";
import Table from "../components/Tables";
import { GradesConfigTableConfig } from "../../ComponentConfig/AgGridTableConfig";
function Gradesconfiguration(){
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
            colDefs={GradesConfigTableConfig({ ActionButton })}
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