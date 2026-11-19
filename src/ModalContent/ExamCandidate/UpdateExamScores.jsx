import { useDispatch, useSelector } from "react-redux";
import ScoreEntryDialog from "../../components/Evaluation/ScoreEntryDialog";
import { useGetExamUpdateHelperData } from "../../hooks/evaluationHelper/useGetExamUpdateHelperData";
import { useUpdateExamMarks } from "../../hooks/evaluateStudent/useUpdateExamMarks";
import { useFormError } from "../../hooks/form/useFormError";
import { submitScores, useScoreEntry } from "../../hooks/evaluation/useScoreEntry";
import { examScoreLimits } from "../../utils/evaluation/scoreEntry";
import {
  resetUpdateState,
  setUpdateInitialData,
  updateDraftScore,
} from "../../Slices/examEvaluation/examEvaluationSlice";

function UpdateExamScores({ handleClose, rowData }) {
  const dispatch = useDispatch();
  const state = useSelector((store) => store.examEvaluation.update);
  const candidateId = rowData?.id;

  const helperQuery = useGetExamUpdateHelperData(candidateId);
  const { mutate: updateExamScores, isPending } = useUpdateExamMarks(handleClose, candidateId);
  const form = useFormError("Failed To Update Exam Scores");
  const { totalMax, caMax, inputMax } = examScoreLimits(state.maxScore, state.caMaxScore);
  const scores = state.draft.scores;

  const entry = useScoreEntry({
    helperQuery,
    scores,
    maxScore: inputMax,
    initialise: (data) =>
      dispatch(
        setUpdateInitialData({
          courses: data.scores,
          gradeScale: data.grade_scale,
          maxGpa: data.max_gpa,
          maxScore: data.exam?.max_score,
          caMaxScore: data.ca_exam?.max_score,
        }),
      ),
    reset: () => dispatch(resetUpdateState()),
  });

  const save = () =>
    submitScores({
      entry,
      form,
      scores,
      send: (onError) =>
        updateExamScores(
          {
            candidate_id: candidateId,
            scores: scores.map((course) => ({ score_id: course.id, score: course.score })),
          },
          { onError },
        ),
    });

  return (
    <ScoreEntryDialog
      title="Update Exam Candidate Scores"
      rowData={rowData}
      isLoading={entry.isLoading}
      error={entry.error}
      onRetry={entry.retry}
      isRetrying={entry.isRetrying}
      scores={scores}
      hasGradeScale={state.gradeScale.length > 0}
      summary={state.draft.resultSummary}
      maxGpa={state.maxGpa}
      showCa
      caMaxScore={caMax}
      inputMax={inputMax}
      totalMax={totalMax}
      onScoreChange={(course, score) => dispatch(updateDraftScore({ scoreId: course.id, score }))}
      entry={entry}
      form={form}
      onSave={save}
      isSaving={isPending}
      canSave={state.isDirty}
      saveLabel="Save Changes"
      onClose={handleClose}
      emptyTitle="No exam scores to update"
      emptyDescription="This candidate has no recorded exam scores. Add their exam scores instead."
    />
  );
}

export default UpdateExamScores;
