import { hosTableConfig } from "../../ComponentConfig/AgGridTableConfig";
import { Icon } from "@iconify/react";
import Table from "../../components/Tables/Tables";
import ActionButtonDropdown from "../../components/DataTableComponents/ActionComponent";
import HosDetails from "../../ModalContent/Hos/HosDetails";
import RemoveHos from "../../ModalContent/Hos/RemoveHos";
import SendMessage from "../../ModalContent/Hos/SendMessage";
import DataTablePageLoader from "../../components/PageLoaders/DataTablesPageLoader";
import { useMemo } from "react";
import { useGetAllHos } from "../../hooks/hos/useGetAllHods";
function HeadOfSpecialty() {
  const { data: hos, isLoading } = useGetAllHos();
    const memoizedColDefs = useMemo(() => {
      return hosTableConfig({
        ActionButtonGroup
      });
    }, []);
  
    const memoizedRowData = useMemo(() => {
      return hos?.data ?? [];
    }, [hos]);
  if (isLoading) {
    return <DataTablePageLoader button={false} />;
  }
  return (
    <div className="container pt-2">
      <div className="my-2">
        <div className="d-flex align-items-center gap-2">
          <div
            className="d-flex justify-content-center align-items-center primary-background-100"
            style={{
              width: "2.5rem",
              height: "2.5rem",
              borderRadius: "0.5rem",
            }}
          >
            <Icon
              icon="grommet-icons:user-admin"
              className="fs-5 text-primary"
            />
          </div>
          <span className="fw-semibold my-0">Manage Head Of Specialty (HOS)</span>
        </div>
      </div>
      <div className="d-flex flex-row align-items-end gap-2 mt-3">
        <div className="d-block">
          <p className="font-size-xs my-0">Total Number Hos</p>
          <h1 className="fw-bold my-0">{memoizedRowData.length}</h1>
        </div>
      </div>
      <div>
        <div>
          <Table
            rowData={memoizedRowData}
            colDefs={memoizedColDefs}
            rowHeight={45}
          />
        </div>
      </div>
    </div>
  );
}
export default HeadOfSpecialty;
function ActionButtonGroup(props) {
  const { id } = props.data;
  const actions = [
    {
      actionTitle: "Update",
      icon: "mynaui:edit-solid",
      modalContent:HosDetails
    },
    {
      actionTitle: "Remove Hos",
      icon: "fluent:delete-16-filled",
      modalContent:RemoveHos
    },
    {
      actionTitle: "Details",
      icon: "bxs:detail",
      modalContent:HosDetails
    },
    {
      actionTitle: "Send Message",
      icon: "ic:round-message",
      modalContent:SendMessage
    },
  ];
   const memoizedActions = useMemo(() => actions, []);
  return (
    <>
      <ActionButtonDropdown
        actions={memoizedActions}
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
