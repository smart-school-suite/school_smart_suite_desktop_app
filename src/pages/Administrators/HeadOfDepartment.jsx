import { Icon } from "@iconify/react";
import Table from "../../components/Tables/Tables";
import { hodTableConfig } from "../../ComponentConfig/AgGridTableConfig";
import ActionButtonDropdown from "../../components/DataTableComponents/ActionComponent";
import RemoveHod from "../../ModalContent/Hod/RemoveHod";
import HodDetails from "../../ModalContent/Hod/HodDetails";
import SendMessage from "../../ModalContent/Hod/SendMessage";
import UpdateHos from "../../ModalContent/Hos/UpdateHos";
import DataTablePageLoader from "../../components/PageLoaders/DataTablesPageLoader";
import { useGetHods } from "../../hooks/hod/useGetHods";
import { useMemo } from "react";
function HeadOfDepartment() {
  const { data: hod, isFetching } = useGetHods();
  const memoizedColDefs = useMemo(() => {
    return hodTableConfig({
      ActionButtonGroup,
    });
  }, []);

  const memoizedRowData = useMemo(() => {
    return hod?.data ?? [];
  }, [hod]);

  if (isFetching) {
    return <DataTablePageLoader button={false} />;
  }
  return (
    <div className="container pt-2">
      <div className="my-2">
        <div className="d-flex align-items-center gap-2">
          <div
            className="d-flex justify-content-center align-items-center primay-background-100"
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
          <span className="fw-semibold my-0">Manage Head Of Department (HOD)</span>
        </div>
      </div>
      <div className="d-flex flex-row align-items-end gap-2 mt-3">
        <div className="d-block">
          <p className="font-size-xs my-0">Total Number Hods</p>
          <h1 className="fw-bold my-0">{memoizedRowData.length}</h1>
        </div>
      </div>
      <div>
        <Table
          rowData={memoizedRowData}
          colDefs={memoizedColDefs}
          rowHeight={45}
        />
      </div>
    </div>
  );
}
export default HeadOfDepartment;
function ActionButtonGroup(props) {
  const { id } = props.data;
  const actions = [
    {
      actionTitle: "Update",
      icon: "mynaui:edit-solid",
      modalContent: UpdateHos,
    },
    {
      actionTitle: "Details",
      icon: "bxs:detail",
      modalContent: HodDetails,
    },
    {
      actionTitle: "Remove Hod",
      icon: "fluent:delete-16-filled",
      modalContent: RemoveHod,
    },
    {
      actionTitle: "Send Message",
      icon: "ic:round-message",
      modalContent: SendMessage,
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
