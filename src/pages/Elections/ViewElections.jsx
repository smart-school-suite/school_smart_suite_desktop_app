import Table from "../../components/Tables/Tables";
import Pageloaderspinner from "../../components/Spinners/Spinners";
import { electionTableConfig } from "../../ComponentConfig/AgGridTableConfig";
import CleanArrayData, { renameKeys } from "../../utils/functions";
import ActionButtonDropdown from "../../components/DataTableComponents/ActionComponent";
import { useGetElections } from "../../hooks/election/useGetElections";
function ViewElections() {
  const { data: elections, isLoading, error } = useGetElections();
  const filter_array_keys = [
    "id",
    "title",
    "election_start_date",
    "election_end_date",
    "ending_time",
    "starting_time",
    "description",
    "status",
  ];
  const renameMapping = {
    id: "id",
    title: "title",
    election_start_date: "start_date",
    election_end_date: "end_date",
    ending_time: "end_time",
    starting_time: "start_time",
    description: "description",
    status: "status",
  };

  return (
    <>
      <div className="container pt-2">
        <div className="row">
          <div className="col-lg-9 pt-4">
            <div className="d-flex flex-row justify-content-between w-100 mt-5">
              <span>View Elections</span>
              <input
                type="search"
                placeholder="Search for anything"
                className="form-control w-25"
              />
            </div>
            {isLoading ? (
              <Pageloaderspinner />
            ) : (
              <div className="mt-2">
                <Table
                colDefs={electionTableConfig({
                  DropdownComponent,
                })}
                rowData={renameKeys(
                  CleanArrayData(elections.data, filter_array_keys),
                  renameMapping
                )}
              />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default ViewElections;

export function DropdownComponent(props) {
  const { id } = props.data;
  const actions = [
    {
      actionTitle: "Update",
      modalContent: UpdateElection,
    },
    {
      actionTitle: "Delete",
      modalContent: DeleteElection,
    },
    {
      actionTitle: "Details",
      modalContent: ElectionDetails,
    },
    {
      actionTitle: "Publish Election",
      modalContent: PublishElection,
    },
  ];
  return (
    <>
      <ActionButtonDropdown actions={actions} row_id={id} 
       style={'tableActionButton primary-background text-white font-size-sm px-2'}
      >
      <span>Edit Election</span>
      </ActionButtonDropdown>
    </>
  );
}

function UpdateElection() {
  return <></>;
}
function DeleteElection() {
  return <></>;
}
function ElectionDetails() {
  return <></>;
}
function PublishElection() {
  return <></>;
}
