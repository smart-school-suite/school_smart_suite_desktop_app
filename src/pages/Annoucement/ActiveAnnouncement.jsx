import { useFetchAnnouncementByStatusQuery } from "../../Slices/Asynslices/fetchSlice";
import Pageloaderspinner from "../../components/Spinners/Spinners";
import Table from "../../components/Tables/Tables";
import { AnnouncementTableConfig } from "../../ComponentConfig/AgGridTableConfig";
import ActionButtonDropdown from "../../components/DataTableComponents/ActionComponent";
import { useMemo } from "react";
import AnnouncementDetails from "../../ModalContent/Announcement/AnnouncementDetails";
import DeleteAnnouncement from "../../ModalContent/Announcement/DeleteAnnouncement";
import UpdateAnnouncementContent from "../../ModalContent/Announcement/UpdateAnnouncementContent";
function ViewAnnoucements() {
  const { data:announcement, isLoading } = useFetchAnnouncementByStatusQuery({
     status:"active"
  })
  const memoizedColDefs = useMemo(() => {
        return AnnouncementTableConfig({
          DropdownComponent
        });
      }, []);
    
      const memoizedRowData = useMemo(() => {
        return announcement?.data ?? [];
      }, [announcement]);
  
  if(isLoading) {
     return <Pageloaderspinner />
  }
  return (
    <>
     <div className="container">
        <div>
          <span className="font-size-sm">Active Announcements</span>
        </div>
        <div className="table">
          <Table 
             colDefs={memoizedColDefs}
             rowData={memoizedRowData}  
          />
        </div>
     </div>
    </>
  );
}
export default ViewAnnoucements;

export function DropdownComponent(props) {
  const { id } = props.data;
  const actions = [
    {
      actionTitle: "Update Content",
      icon:"mynaui:edit-solid",
      modalContent: UpdateAnnouncementContent,
    },
    {
      actionTitle: "Delete annoucement",
      icon:"fluent:delete-16-filled",
      modalContent: DeleteAnnouncement,
    },
    {
      actionTitle:"Announcement Details",
      icon:"",
      modalContent: AnnouncementDetails,
    }
  ];
  const memoizedActions = useMemo(() => actions, []);
  return (
    <>
      <ActionButtonDropdown actions={memoizedActions} row_id={id}
       style={'tableActionButton primary-background text-white font-size-sm px-2'}
      > 
      <span>Edit</span>
      </ActionButtonDropdown>
    </>
  );
}
