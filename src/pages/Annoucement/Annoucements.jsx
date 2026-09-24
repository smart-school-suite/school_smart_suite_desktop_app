import { useGetAnnouncementByStatus } from "../../hooks/announcement/useGetAnnouncementByStatus";
function Annoucements() {
    const {
      data: announcement,
      isLoading,
      error,
    } = useGetAnnouncementByStatus("all");
  return (
    <>

    </>
  );
}
export default Annoucements;
