import Pageloaderspinner from "../../components/Spinners";
import Table from "../../components/Tables";
import { useFetchDropoutStudentListQuery } from "../../Slices/Asynslices/fetchSlice";
import { StudentDropOutTableConfig } from "../../ComponentConfig/AgGridTableConfig";
import ActionButtonDropdown from "../../components/DataTableComponents/ActionComponent";
function StudentDropOuts() {
  const { data: dropoutList, isLoading: isListLoading } =
    useFetchDropoutStudentListQuery();
  if (isListLoading) {
    return <Pageloaderspinner />;
  }
  return (
    <>
      <main className="pt-2">
        <div className="d-flex flex-row gap-2 align-items-center mt-2 mb-2">
          <div
            style={{
              width: "2.5rem",
              height: "2.5rem",
              border: "1rem",
              background: "#fff",
              alignContent: "center",
              textAlign: "center",
            }}
          >
            IC
          </div>
          <h5>Manage Student Dropout</h5>
        </div>
        <div className="d-block">
            <p className="font-size-xs my-0">Total Dropouts</p>
            <h1 className="fw-bold my-0">{dropoutList.data.length}</h1>
          </div>
        <div className="mt-2">
        <Table
          colDefs={StudentDropOutTableConfig({ DropdownComponent })}
          rowData={dropoutList.data}
        />
        </div>
      </main>
    </>
  );
}
export default StudentDropOuts;

export function DropdownComponent(props) {
  const { id } = props.data;
  const actions = [
    {
      actionTitle: "Reinstate Student",
      
    },
    {
      actionTitle: "Delete Student",

    },
    {
      actionTitle: "Details",

    }
  ];
  return (
    <>
       <ActionButtonDropdown actions={actions} row_id={id} 
       style={'tableActionButton primary-background text-white font-size-sm px-2'}
      >
      <span>Edit Actions</span>
      </ActionButtonDropdown>
    </>
  );
}
