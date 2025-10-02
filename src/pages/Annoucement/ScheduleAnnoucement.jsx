import { useGetAnnouncementByStatus } from "../../hooks/announcement/useGetAnnouncementByStatus";
import Table from "../../components/Tables/Tables";
import { AnnouncementTableConfig } from "../../ComponentConfig/AgGridTableConfig";
import ActionButtonDropdown from "../../components/DataTableComponents/ActionComponent";
import { useMemo } from "react";
import AnnouncementDetails from "../../ModalContent/Announcement/AnnouncementDetails";
import DeleteAnnouncement from "../../ModalContent/Announcement/DeleteAnnouncement";
import UpdateAnnouncementContent from "../../ModalContent/Announcement/UpdateAnnouncementContent";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { NotFoundError } from "../../components/errors/Error";
function ScheduleAnnoucement(){
  const {
    data: announcement,
    isLoading,
    error,
  } = useGetAnnouncementByStatus("active");
  const memoizedColDefs = useMemo(() => {
    return AnnouncementTableConfig({
      DropdownComponent,
    });
  }, []);

  const memoizedRowData = useMemo(() => {
    return announcement?.data ?? [];
  }, [announcement]);
    return(
        <>
              <div className="d-flex flex-column gap-2 h-100">
        <div style={{ height: "5%" }}>
          <span className="fw-semibold">Sheduled Announcements</span>
        </div>
        <div style={{ height: "95%" }}>
          {isLoading ? (
            <RectangleSkeleton width="100%" height="100%" speed={0.5} />
          ) : error ? (
            <NotFoundError
              title={error?.response?.data?.errors?.title}
              description={error?.response?.data?.errors?.description}
            ></NotFoundError>
          ) : (
            <Table colDefs={memoizedColDefs} rowData={memoizedRowData} />
          )}
        </div>
      </div>
        </>
    )
}
export default ScheduleAnnoucement;

export function DropdownComponent(props) {
  const { id } = props.data;
  const actions = [
    {
      actionTitle: "Update Content",
      icon: "mynaui:edit-solid",
      modalContent: UpdateAnnouncementContent,
    },
    {
      actionTitle: "Delete annoucement",
      icon: "fluent:delete-16-filled",
      modalContent: DeleteAnnouncement,
    },
    {
      actionTitle: "Announcement Details",
      icon: "",
      modalContent: AnnouncementDetails,
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
        <span>Edit</span>
      </ActionButtonDropdown>
    </>
  );
}