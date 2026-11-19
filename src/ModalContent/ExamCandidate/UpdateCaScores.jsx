import { useDispatch, useSelector } from "react-redux";
import ScoreEntryDialog from "../../components/Evaluation/ScoreEntryDialog";
import { useGetCaUpdateHelperData } from "../../hooks/evaluationHelper/useGetCaUpdateHelperData";
import { useUpdateCaMarks } from "../../hooks/evaluateStudent/useUpdateCaMarks";
import { useFormError } from "../../hooks/form/useFormError";
import { submitScores, useScoreEntry } from "../../hooks/evaluation/useScoreEntry";
import {
  resetUpdateState,
  setUpdateInitialData,
  updateDraftScore,
} from "../../Slices/examEvaluation/caEvaluationSlice";

function UpdateCaScores({ handleClose, rowData }) {
  const dispatch = useDispatch();
  const state = useSelector((store) => store.caEvaluation.update);
  const candidateId = rowData?.id;

  const helperQuery = useGetCaUpdateHelperData(candidateId);
  const { mutate: updateCaScores, isPending } = useUpdateCaMarks(handleClose, candidateId);
  const form = useFormError("Failed To Update Ca Scores");
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
          maxScore: data.exam?.max_score,
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
        updateCaScores(
          {
            candidate_id: candidateId,
            scores: scores.map((course) => ({ score_id: course.id, score: course.score })),
          },
          { onError },
        ),
    });

  return (
    <ScoreEntryDialog
      title="Update CA Candidate Scores"
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
      emptyTitle="No CA scores to update"
      emptyDescription="This candidate has no recorded CA scores. Add their CA scores instead."
    />
  );
}

export default UpdateCaScores;
