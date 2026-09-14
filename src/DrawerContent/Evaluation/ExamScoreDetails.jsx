import { useGetExamScores } from "../../hooks/examScore/useGetExamScores";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { NotFoundError } from "../../components/errors/Error";
const ExamScoreDetails = ({ handleClose, drawerData }) => {
  const { id: candidateId } = drawerData;
  const { data: examScores, isLoading, error } = useGetExamScores(candidateId);
    return (
        <div>
            
        </div>
    );
}

export default ExamScoreDetails;
