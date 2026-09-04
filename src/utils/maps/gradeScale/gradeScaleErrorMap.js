import InvalidGradeRange from "../../../error/gradeList/InvalidGradeRange";
import DuplicatePerformance from "../../../error/gradeList/DuplicatePerformance";
import GradeRangeOverlap from "../../../error/gradeList/GradeRangeOverLap";
import NegativeScore from "../../../error/gradeList/NegativeScore";
import MaxScoreExceeded from "../../../error/gradeList/MaxScoreExceeded";

export const GRADE_SCALE_ERROR_MAP = {
     "invalid_grade_range": {
         component: InvalidGradeRange
     },
     "negative_score": {
         component: NegativeScore
     },
     "score_exceeds_maximum": {
         component: MaxScoreExceeded
     },
     "grade_range_overlap": {
         component: GradeRangeOverlap
     },
     "duplicate_performance": {
         component: DuplicatePerformance
     }
}