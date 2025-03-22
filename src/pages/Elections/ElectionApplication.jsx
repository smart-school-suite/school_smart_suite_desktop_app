import SchoolElectionSideBar from "../../components/SideBar/SchoolElection";
import { useFetchElectionApplicationsQuery } from "../../Slices/Asynslices/fetchSlice";
import Pageloaderspinner from "../../components/Spinners";
import Table from "../../components/Tables";
import CleanArrayData, { renameKeys } from "../../utils/functions";
import { electionApplicationTableConfig } from "../../ComponentConfig/AgGridTableConfig";
import ActionButtonDropdown from "../../components/DataTableComponents/ActionComponent";
function ElectionApplication() {
  const {
    data: application,
    isLoading,
    error,
  } = useFetchElectionApplicationsQuery();
  const filter_array_keys = [
    "id",
    "student.name",
    "election.title",
    "election_role.name",
    "isApproved",
    "personal_vision",
    "commitment_statement",
  ];
  const renameMapping = {
    id: "id",
    "student.name": "student_name",
    "election.title": "election_title",
    "election_role.name": "election_role",
    isApproved: "status",
    personal_vision: "personal_vision",
    commitment_statement: "commitment_statement",
  };
  return (
    <>
      <div className="container pt-2">
        <div className="row">
          <SchoolElectionSideBar />
          <div className="col-lg-9 pt-4">
            <div className="d-flex flex-row justify-content-between w-100 mt-5">
              <span>Election Applications</span>
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
                colDefs={electionApplicationTableConfig({
                  DropdownComponent,
                })}
                rowData={renameKeys(
                  CleanArrayData(application.data, filter_array_keys),
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
export default ElectionApplication;

export function DropdownComponent(props) {
  const { id } = props.data;
  const actions = [
    {
      actionTitle: "Approve",
      modalContent: Approve,
    },
    {
      actionTitle: "Disapprove",
      modalContent: Disapprove,
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

function Approve() {
  return <></>;
}
function Disapprove() {
  return <></>;
}
