import { useDispatch, useSelector } from "react-redux";
import ScoreEntryDialog from "../../components/Evaluation/ScoreEntryDialog";
import { useGetExamEvaluationHelperData } from "../../hooks/evaluationHelper/useGetExamEvaluationHelperData";
import { useCreateExamMarks } from "../../hooks/evaluateStudent/useCreateExamMarks";
import { useFormError } from "../../hooks/form/useFormError";
import { submitScores, useScoreEntry } from "../../hooks/evaluation/useScoreEntry";
import { examScoreLimits } from "../../utils/evaluation/scoreEntry";
import {
  resetExamScoreState,
  setInitialData,
  updateScore,
} from "../../Slices/examEvaluation/examEvaluationSlice";

function AddExamScores({ handleClose, rowData }) {
  const dispatch = useDispatch();
  const state = useSelector((store) => store.examEvaluation);
  const candidateId = rowData?.id;

  const helperQuery = useGetExamEvaluationHelperData(candidateId);
  const { mutate: createExamScores, isPending } = useCreateExamMarks(handleClose);
  const form = useFormError("Failed To Add Exam Scores");
  const { totalMax, caMax, inputMax } = examScoreLimits(state.maxScore, state.caMaxScore);

  const entry = useScoreEntry({
    helperQuery,
    scores: state.scores,
    maxScore: inputMax,
    initialise: (data) =>
      dispatch(
        setInitialData({
          courses: data.ca_scores,
          gradeScale: data.grade_scale,
          maxGpa: data.max_gpa,
          maxScore: data.exam?.max_score,
          caMaxScore: data.ca_exam?.max_score,
        }),
      ),
    reset: () => dispatch(resetExamScoreState()),
  });

  const save = () =>
    submitScores({
      entry,
      form,
      scores: state.scores,
      send: (onError) =>
        createExamScores(
          {
            candidate_id: candidateId,
            scores: state.scores.map((course) => ({
              course_id: course.course_id,
              score: course.score,
            })),
          },
          { onError },
        ),
    });

  return (
    <ScoreEntryDialog
      title="Evaluate Exam Candidate"
      rowData={rowData}
      isLoading={entry.isLoading}
      error={entry.error}
      onRetry={entry.retry}
      isRetrying={entry.isRetrying}
      scores={state.scores}
      hasGradeScale={state.gradeScale.length > 0}
      summary={state.resultSummary}
      maxGpa={state.maxGpa}
      showCa
      caMaxScore={caMax}
      inputMax={inputMax}
      totalMax={totalMax}
      onScoreChange={(course, score) => dispatch(updateScore({ key: course.key, score }))}
      entry={entry}
      form={form}
      onSave={save}
      isSaving={isPending}
      onClose={handleClose}
      emptyTitle="No CA scores to build on"
      emptyDescription="Exam scores are added to the candidate's CA scores, and none were found. Add the CA scores first."
    />
  );
}

export default AddExamScores;
