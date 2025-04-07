import { useFetchParentsQuery } from "../../Slices/Asynslices/fetchSlice";
import Pageloaderspinner from "../../components/Spinners";
import Table from "../../components/Tables";
import ActionButtonDropdown, {
  ModalButton,
} from "../../components/DataTableComponents/ActionComponent";
import { Icon } from "@iconify/react";
import { ParentsTableConfig } from "../../ComponentConfig/AgGridTableConfig";
import DeleteParent from "../../ModalContent/Parent/DeleteParent";
import ParentDetails from "../../ModalContent/Parent/ParentDetails";
import UpdateParent from "../../ModalContent/Parent/UpdateParent";
import CreateParent from "../../ModalContent/Parent/CreateParent";
function Parents() {
  const { data: guardians, isLoading } = useFetchParentsQuery();
  if (isLoading) {
    return <Pageloaderspinner />;
  }
  return (
    <>
      <div>
        <div className="my-2">
          <div className="d-flex align-items-center gap-2">
            <div
              className="d-flex justify-content-center align-items-center"
              style={{
                width: "3rem",
                height: "3rem",
                borderRadius: "3rem",
                background: "#fff",
              }}
            >
              <Icon icon="ri:parent-line" className="fs-5 text-primary" />
            </div>
            <h5 className="fw-bold my-0">Guardians</h5>
          </div>
        </div>
        <div className="d-flex flex-row align-items-center mb-1 w-100">
          <div className="d-block">
            <p className="font-size-xs my-0">Total Number of Parents</p>
            <h1 className="fw-bold my-0">{guardians.data.length}</h1>
          </div>
          <div className="end-block d-flex flex-row ms-auto w-75 justify-content-end gap-3">
            <ModalButton 
              action={{ modalContent:CreateParent}}
              classname="border-none rounded-3 green-bg font-size-sm text-white px-3 py-2">
              <span className="font-size-sm">Create Parent</span>
            </ModalButton>
          </div>
        </div>
      </div>
      <div className="pt-2">
        <Table
          colDefs={ParentsTableConfig({ DropdownComponent })}
          rowData={guardians.data}
        />
      </div>
    </>
  );
}
export default Parents;

export function DropdownComponent(props) {
  const { id } = props.data;
  const actions = [
    {
      modalTitle: "Update Parent",
      actionTitle: "Update",
      modalContent: UpdateParent,
    },
    {
      modalTitle: "Parent Details",
      actionTitle: "Details",
      modalContent: ParentDetails,
    },
    {
      modalTitle: "Delete Parent",
      actionTitle: "Delete",
      modalContent: DeleteParent,
    },
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
