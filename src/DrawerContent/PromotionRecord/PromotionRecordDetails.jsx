import { useGetRecordDetails } from "../../hooks/promotionRecord/useGetPromotionRecordDetails";
function PromotionRecordDetails({ drawerData, handleClose }){
 const { id: recordId } = drawerData;
 const { data: details, isLoading, error } = useGetRecordDetails(handleClose);
     return (
        <>
        </>
     )
}
export default PromotionRecordDetails;