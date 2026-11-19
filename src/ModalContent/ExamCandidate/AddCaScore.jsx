import { useDispatch, useSelector } from "react-redux";
import ScoreEntryDialog from "../../components/Evaluation/ScoreEntryDialog";
import { useGetCaEvaluationHelperData } from "../../hooks/evaluationHelper/useGetCaEvaluationHelperData";
import { useCreateCaMark } from "../../hooks/evaluateStudent/useCreateCaMarks";
import { useFormError } from "../../hooks/form/useFormError";
import { submitScores, useScoreEntry } from "../../hooks/evaluation/useScoreEntry";
import {
  resetCaScoreState,
  setInitialData,
  updateScore,
} from "../../Slices/examEvaluation/caEvaluationSlice";

function AddCaScore({ handleClose, rowData }) {
  const dispatch = useDispatch();
  const state = useSelector((store) => store.caEvaluation);
  const candidateId = rowData?.id;

  const helperQuery = useGetCaEvaluationHelperData(candidateId);
  const { mutate: createCaScores, isPending } = useCreateCaMark(handleClose);
  const form = useFormError("Failed To Add Ca Score");

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
          maxScore: data.exam?.max_score,
        }),
      ),
    reset: () => dispatch(resetCaScoreState()),
  });

  const save = () =>
    submitScores({
      entry,
      form,
      scores: state.scores,
      send: (onError) =>
        createCaScores(
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
      title="Evaluate CA Candidate"
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
      emptyTitle="No courses this semester"
      emptyDescription="No courses are assigned to this specialty for the CA's semester. Assign courses to the specialty, then try again."
    />
  );
}

export default AddCaScore;
