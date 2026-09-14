import { useGetCaScores } from "../../hooks/examScore/useGetCaScores";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
function CaScoreDetails({ handleClose, drawerData }){
  const { id: candidateId } = drawerData;
  const { data: caScores, isLoading, error } = useGetCaScores(candidateId);
     return (
        <>
        </>
     )
}
export default CaScoreDetails;