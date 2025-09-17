import Pageloaderspinner from "../../components/Spinners/Spinners";
import { useGetElectionRoles } from "../../hooks/electionRole/useGetElectionRoles";
import { electionRolesTableConfig } from "../../ComponentConfig/AgGridTableConfig";
import ActionButtonDropdown, {ModalButton} from "../../components/DataTableComponents/ActionComponent";
import CleanArrayData, { renameKeys } from "../../utils/functions";
import Table from "../../components/Tables/Tables";
import CreateElectionRole from "../../ModalContent/ElectionRoles/CreateElectionRole";
import DeactivateRole from "../../ModalContent/ElectionRoles/DeactivateRole";
import DeleteElection from "../../ModalContent/ElectionRoles/DeleteElection";
import ElectionRoleDetails from "../../ModalContent/ElectionRoles/ElectionRoleDetails";
import UpdateElectionRole from "../../ModalContent/ElectionRoles/UpdateElectionRole";
function ElectionRoles() {
  const {
    data: electionRoles,
    isLoading,
    error,
  } = useGetElectionRoles();
  const filter_array_keys = [
    "id",
    "name",
    "status",
    "description",
    "election.title",
  ];
  const renameMapping = {
    id: "id",
    name: "name",
    status: "status",
    description: "description",
    "election.title": "election_title",
  };
  return (
    <>
      <div className="container pt-2">
        <div className="row">
          <div className="col-lg-9 pt-4">
            <div className="d-flex flex-row justify-content-between w-100 mt-5">
              <span>Election Roles</span>
              <div className="d-flex flex-row align-items-center gap-2 w-50 justify-content-end">
                <input
                  type="search"
                  placeholder="Search for anything"
                  className="form-control w-50"
                />
                <ModalButton
                  classname={
                    "border-none font-size-sm px-3  py-2 text-white rounded-2 green-bg"
                  }
                  action={{ modalContent: CreateElectionRole }}
                >
                  <span>Create Role</span>
                </ModalButton>
              </div>
            </div>
            <div className="mt-3">
              {isLoading ? (
                <Pageloaderspinner />
              ) : (
                <Table
                  colDefs={electionRolesTableConfig({
                    DropdownComponent,
                  })}
                  rowData={renameKeys(
                    CleanArrayData(electionRoles.data, filter_array_keys),
                    renameMapping
                  )}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default ElectionRoles;

export function DropdownComponent(props) {
  const { id } = props.data;
  const actions = [
    {
      actionTitle: "Update",
      modalContent: UpdateElectionRole,
    },
    {
      actionTitle: "Details",
      modalContent: ElectionRoleDetails,
    },
    {
      actionTitle: "Delete",
      modalContent: DeleteElection,
    },
    {
      actionTitle: "Deactivate",
      modalContent: DeactivateRole,
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

