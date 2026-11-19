import { useDispatch, useSelector } from "react-redux";
import ScoreEntryDialog from "../../components/Evaluation/ScoreEntryDialog";
import { useGetResitEvaluationHelperData } from "../../hooks/resitEvaluation/useGetEvaluationHelperData";
import { useCreateResitScore } from "../../hooks/resitEvaluation/useCreateResitScores";
import { useFormError } from "../../hooks/form/useFormError";
import { submitScores, useScoreEntry } from "../../hooks/evaluation/useScoreEntry";
import {
  resetResitScoreState,
  setInitialData,
  updateScore,
} from "../../Slices/resit/resitEvaluationSlice";

function AddResitScores({ handleClose, rowData }) {
  const dispatch = useDispatch();
  const state = useSelector((store) => store.resitEvaluation);
  const candidateId = rowData?.id;

  const helperQuery = useGetResitEvaluationHelperData(candidateId);
  const { mutate: createResitScores, isPending } = useCreateResitScore(handleClose, candidateId);
  const form = useFormError("Failed To Add Resit Scores");

  const entry = useScoreEntry({
    helperQuery,
    scores: state.scores,
    maxScore: state.maxScore,
    initialise: (data) =>
      dispatch(
        setInitialData({
          courses: data.courses,
          gradeScale: data.grade_scale,
          maxGpa: data.max_gpa,
          // the helper sends the resit exam as resit_exam
          maxScore: data.resit_exam?.max_score ?? data.exam?.max_score,
        }),
      ),
    reset: () => dispatch(resetResitScoreState()),
  });

  const save = () =>
    submitScores({
      entry,
      form,
      scores: state.scores,
      send: (onError) =>
        createResitScores(
          {
            candidate_id: candidateId,
            scores: state.scores.map((course) => ({
              resit_id: course.resit_id,
              score: course.score,
            })),
          },
          { onError },
        ),
    });

  return (
    <ScoreEntryDialog
      title="Evaluate Resit Candidate"
      rowData={rowData}
      isLoading={entry.isLoading}
      error={entry.error}
      onRetry={entry.retry}
      isRetrying={entry.isRetrying}
      scores={state.scores}
      hasGradeScale={state.gradeScale.length > 0}
      summary={state.resultSummary}
      maxGpa={state.maxGpa}
      inputMax={state.maxScore}
      onScoreChange={(course, score) => dispatch(updateScore({ key: course.key, score }))}
      entry={entry}
      form={form}
      onSave={save}
      isSaving={isPending}
      onClose={handleClose}
      emptyTitle="No resits to evaluate"
      emptyDescription="This candidate has no outstanding resits for the exams this resit covers."
    />
  );
}

export default AddResitScores;
