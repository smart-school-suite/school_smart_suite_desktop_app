import { useGetTeacherSubscriptionDetail } from "../../hooks/activationCode/useGetTeacherSubscriptionDetail";
function TeacherActivationDetail({ rowData, handleClose }){
   const { data, isLoading, isError } = useGetTeacherSubscriptionDetail(rowData.teacherId);
     return(
        <>
        </>
     )
}
export default TeacherActivationDetail;