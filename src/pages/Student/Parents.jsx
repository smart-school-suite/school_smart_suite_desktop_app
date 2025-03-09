import { useFetchParentsQuery } from "../../Slices/Asynslices/fetchSlice";
import CleanArrayData, { renameKeys } from "../../utils/functions";
import Pageloaderspinner from "../../components/Spinners";
import Greenbutton from "../../components/Buttons";
import Table from "../../components/Tables";
import ActionButtonDropdown from "../actionButton";
import { Icon } from "@iconify/react";
import { ParentsTableConfig } from "../../ComponentConfig/AgGridTableConfig";
import DeleteParent from "../../ModalContent/Parent/DeleteParent";
import ParentDetails from "../../ModalContent/Parent/ParentDetails";
import UpdateParent from "../../ModalContent/Parent/UpdateParent";
function Parents() {
  const { data: data, error, isLoading } = useFetchParentsQuery();
  const filter_array_keys = [
    "id",
    "name",
    "address",
    "language_preference",
    "occupation",
    "relationship_to_student",
    "preferred_contact_method",
    "marital_status",
    "cultural_background",
    "religion",
  ];
  const renameMapping = {
    id: "id",
    name: "Name",
    address: "Address",
    language_preference: "Language Preference",
    occupation: "Occupation",
    relationship_to_student: "Relationship To Student",
    preferred_contact_method: "Contact Method",
    marital_status: "Marital Status",
    cultural_background: "Cultural Background",
    religion: "Religion",
  };

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
            <h4 className="fw-bold my-0">Parents/Guardians</h4>
          </div>
        </div>
        <div className="d-flex flex-row align-items-center mb-1 w-100">
          <div className="d-block">
            <p className="font-size-xs my-0">Total Number of Parents</p>
            <h1 className="fw-bold my-0">{data.data.length}</h1>
          </div>
          <div className="end-block d-flex flex-row ms-auto w-75 justify-content-end gap-3">
            <Greenbutton
              lable="Add Parent"
              bg="green-bg"
              route="/create-parent"
            />
          </div>
        </div>
      </div>
      <div className="pt-4">
        <Table
          colDefs={ParentsTableConfig({ DropdownComponent })}
          rowData={renameKeys(
            CleanArrayData(data.data, filter_array_keys),
            renameMapping
          )}
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
      <ActionButtonDropdown actions={actions} row_id={id} />
    </>
  );
}
