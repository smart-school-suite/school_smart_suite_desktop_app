import { useDispatch, useSelector } from "react-redux";
import ScoreEntryDialog from "../../components/Evaluation/ScoreEntryDialog";
import { useGetResitUpdateEvaluationHelper } from "../../hooks/resitEvaluation/useGetResitEvaluationUpdateHelper";
import { useUpdateResitScores } from "../../hooks/resitEvaluation/useUpdateResitScore";
import { useFormError } from "../../hooks/form/useFormError";
import { submitScores, useScoreEntry } from "../../hooks/evaluation/useScoreEntry";
import {
  resetUpdateState,
  setUpdateInitialData,
  updateDraftScore,
} from "../../Slices/resit/resitEvaluationSlice";

function UpdateResitScore({ handleClose, rowData }) {
  const dispatch = useDispatch();
  const state = useSelector((store) => store.resitEvaluation.update);
  const candidateId = rowData?.id;

  const helperQuery = useGetResitUpdateEvaluationHelper(candidateId);
  const { mutate: updateResitScores, isPending } = useUpdateResitScores(handleClose, candidateId);
  const form = useFormError("Failed To Update Resit Score");
  const scores = state.draft.scores;

  const entry = useScoreEntry({
    helperQuery,
    scores,
    maxScore: state.maxScore,
    initialise: (data) =>
      dispatch(
        setUpdateInitialData({
          courses: data.courses,
          gradeScale: data.grade_scale,
          maxGpa: data.max_gpa,
          // the helper sends the resit exam as resit_exam
          maxScore: data.resit_exam?.max_score ?? data.exam?.max_score,
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
        updateResitScores(
          {
            candidate_id: candidateId,
            scores: scores.map((course) => ({ score_id: course.id, score: course.score })),
          },
          { onError },
        ),
    });

  return (
    <ScoreEntryDialog
      title="Update Resit Candidate Scores"
      rowData={rowData}
      isLoading={entry.isLoading}
      error={entry.error}
      onRetry={entry.retry}
      isRetrying={entry.isRetrying}
      scores={scores}
      hasGradeScale={state.gradeScale.length > 0}
      summary={state.draft.resultSummary}
      maxGpa={state.maxGpa}
      inputMax={state.maxScore}
      onScoreChange={(course, score) => dispatch(updateDraftScore({ scoreId: course.id, score }))}
      entry={entry}
      form={form}
      onSave={save}
      isSaving={isPending}
      canSave={state.isDirty}
      saveLabel="Save Changes"
      onClose={handleClose}
      emptyTitle="No resit scores to update"
      emptyDescription="This candidate has no recorded resit scores. Add their resit scores instead."
    />
  );
}

export default UpdateResitScore;
