import { AnnouncementCategoryTableConfig } from "../../ComponentConfig/AgGridTableConfig";
import ActionButtonDropdown from "../../components/DataTableComponents/ActionComponent";
import DeleteAnnouncementCategory from "../../ModalContent/AnnouncementCategory/DeleteAnnouncementCategory";
import UpdateAnnouncementCategory from "../../ModalContent/AnnouncementCategory/UpdateAnnouncementCategory";
import CreateAnnouncementCategory from "../../ModalContent/AnnouncementCategory/CreateAnnouncementCategory";
import { useMemo } from "react";
import { useFetchAnnouncementCategoryQuery } from "../../Slices/Asynslices/fetchSlice";
import Pageloaderspinner from "../../components/Spinners/Spinners";
import Table from "../../components/Tables/Tables";
import { ModalButton } from "../../components/DataTableComponents/ActionComponent";
import { Icon } from "@iconify/react";
function AnnouncementCategory() {
  const { data: category, isLoading } = useFetchAnnouncementCategoryQuery();
  const memoizedColDefs = useMemo(() => {
    return AnnouncementCategoryTableConfig({
      DropdownComponent,
    });
  }, []);

  const memoizedRowData = useMemo(() => {
    return category?.data ?? [];
  }, [category]);
  if (isLoading) {
    return <Pageloaderspinner />;
  }
  return (
    <>
      <div className="pt-3">
        <div className="d-flex flex-row align-items-center w-100 justify-content-between">
          <span className="font-size-sm">Announcement Category</span>
          <ModalButton
            action={{ modalContent: CreateAnnouncementCategory }}
            classname={"border-none rounded-3 px-2 d-flex align-items-center gap-2 py-2 font-size-sm primary-background-100"}
          >
            <Icon icon="icons8:plus" className="font-size-md" />
            <span>Create Category</span>
          </ModalButton>
        </div>
        <div className="mt-3">
            <Table 
              colDefs={memoizedColDefs}
              rowData={memoizedRowData}
            />
        </div>
      </div>
    </>
  );
}
export default AnnouncementCategory;

export function DropdownComponent(props) {
  const { id } = props.data;
  const actions = [
    {
      actionTitle: "Update Category",
      icon: "mynaui:edit-solid",
      modalContent: UpdateAnnouncementCategory,
    },
    {
      actionTitle: "Delete Category",
      icon: "fluent:delete-16-filled",
      modalContent: DeleteAnnouncementCategory,
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
        <span>Edit Category</span>
      </ActionButtonDropdown>
    </>
  );
}
