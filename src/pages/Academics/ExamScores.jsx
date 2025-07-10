import Navbar from "../../components/NavBars/Navbar";
import { ScoresNavBarOptions } from "../../ComponentConfig/navBarConfig";
import { useFetchStudentResultsQuery } from "../../Slices/Asynslices/fetchSlice";
import Pageloaderspinner from "../../components/Spinners/Spinners";
import Table from "../../components/Tables/Tables";
import { studentResultsTableConfig } from "../../ComponentConfig/AgGridTableConfig";
import ActionButtonDropdown from "../../components/DataTableComponents/ActionComponent";
function ExamScores() {
  const { data: examScores, isLoading } = useFetchStudentResultsQuery();
  if (isLoading) {
    return <Pageloaderspinner />;
  }
  return (
    <>
      <Navbar options={ScoresNavBarOptions} />
      <div className="d-flex flex-row align-items-center mt-4 w-100">
        <div className="d-block">
          <p className="font-size-xs my-0">Total Score Number</p>
          <h1 className="fw-bold my-0">{examScores.data.length}</h1>
        </div>
      </div>
       {examScores?.data?.length > 0 ? (
                <Table
                  colDefs={studentResultsTableConfig({ DropdownComponent })}
                  rowData={examScores.data}
                />
              ) : (
                <div className="alert alert-warning">
                  Oops, looks like you don't have any teachers.
                </div>
              )}
    </>
  );
}
export default ExamScores;

export function DropdownComponent(props) {
  const { id } = props.data;
  const actions = [
    {
      actionTitle: "Details",
    },
    {
      actionTitle: "Delete",
    },
  ];
  return (
    <>
      <ActionButtonDropdown
        actions={actions}
        row_id={id}
        style={
          "tableActionButton primary-background text-white font-size-sm px-2"
        }
      >
        <span>Edit Actions</span>
      </ActionButtonDropdown>
    </>
  );
}
