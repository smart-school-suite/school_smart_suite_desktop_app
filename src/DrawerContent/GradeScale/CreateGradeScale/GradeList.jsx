import { Fragment, useEffect } from "react";
import HorizontalDashedLine from "../../../components/DashedLine/HorizonetalDashedLine";
import { Dot, PenLine, Plus, X } from "lucide-react";
import RectangleSkeleton from "../../../components/SkeletonPageLoader/RectangularSkeleton";
import { NotFoundError } from "../../../components/errors/Error";
import { useDispatch, useSelector } from "react-redux";
import {
  updatedGradeContext,
  setGradeScaleLoadData,
  resetScaleState,
} from "../../../Slices/academics/gradeScaleSlice";
import {
  RESIT,
  RESIT_META,
  RESIT_LABEL,
  RESULT,
  RESULT_LABEL,
  RESULT_META,
  EXAM_TYPE,
} from "@/constants";
import { isConflicting } from "../../../utils/gradeScale/gradeScaleHelpers";
import { useGetGradeScaleCategoryId } from "../../../hooks/gradeScale/useGetGradeScaleCategoryId";
import { useCreateGradeScale } from "../../../hooks/gradeScale/useCreateGradeScale";
import { SingleSpinner } from "../../../components/Spinners/Spinners";
import { ModalButton } from "../../../components/DataTableComponents/ActionComponent";
import DiscardWarning from "../../../ModalContent/GradesConfig/DiscardWarning";
function GradeList({
  handleClose,
  nextStep,
  previousStep,
  fullStep,
  currentStep,
  drawerData,
}) {
  const dispatch = useDispatch();
  const {
    data: gradeScales,
    isLoading,
    error,
  } = useGetGradeScaleCategoryId(drawerData.id);
  const { mutate: createGradeScale, isPending } =
    useCreateGradeScale(handleClose);
  const moduleState = useSelector((state) => state.gradeScale.gradeScale);
  const gradeScaleList = moduleState?.draft?.grades;
  useEffect(() => {
    const hasExistingDraftData =
      gradeScaleList && Object.keys(gradeScaleList).length > 0;
    if (
      !isLoading &&
      gradeScales?.data?.grade_scales &&
      !hasExistingDraftData
    ) {
      const data = gradeScales?.data?.grade_scales.reduce((acc, item) => {
        acc[item.letter_grade_id] = {
          min_score: {
            value: item.configuration.minimum_score,
            isValid: null,
          },
          max_score: {
            value: item.configuration.maximum_score,
            isValid: null,
          },
          grade_point: {
            value: item.configuration.grade_points,
            isValid: null,
          },
          performance: {
            value: item.configuration.performance ?? null,
            isValid: null,
          },
          result: {
            value: item?.configuration?.result?.toLowerCase() ?? null,
            isValid: null,
          },
          is_configured: item.configuration.is_configured ?? null,
          letter_grade: item.letter_grade ?? null,
          letter_grade_id: item.letter_grade_id ?? null,
          resit_result: {
            value: item?.configuration?.resit_result?.toLowerCase() ?? null,
            isValid: null,
          },
        };
        return acc;
      }, {});

      dispatch(setGradeScaleLoadData({ value: data }));
    }
  }, [isLoading, gradeScales, gradeScaleList, drawerData.id]);

  const handleCreateGrades = async () => {
    const grades = moduleState.draft.grades;
    const formattedPayload = Object.keys(grades)
      .map((objKey) => ({
        letter_grade_id: grades[objKey].letter_grade_id,
        result: grades[objKey].result.value,
        resit_result: grades[objKey].resit_result.value,
        performance: grades[objKey].performance.value,
        maximum_score: grades[objKey].max_score.value,
        minimum_score: grades[objKey].min_score.value,
        grade_points: grades[objKey].grade_point.value,
      }))
      .filter(
        (grade) =>
          grade.performance !== null &&
          grade.performance !== undefined &&
          grade.performance !== "" &&
          grade.maximum_score !== null &&
          grade.maximum_score !== undefined &&
          grade.maximum_score !== "" &&
          grade.minimum_score !== null &&
          grade.minimum_score !== undefined &&
          grade.minimum_score !== "" &&
          grade.grade_points !== null &&
          grade.grade_points !== undefined &&
          grade.grade_points !== "",
      );

    createGradeScale({
      grade_scales: formattedPayload,
      grade_max_score: moduleState.draft.maximumScore,
      grades_category_id: moduleState.configContext.category.drawerData.id,
    });
  };
  return (
    <>
      <div className="d-flex flex-row align-items-center justify-content-between border-bottom p-2 font-size-sm">
        <span className="fw-medium">Grade Scale Configuration</span>
        {moduleState.isDirty ? (
          <ModalButton
            action={{ modalContent: DiscardWarning }}
            size={"md"}
            rowData={{ handleCloseDrawer: handleClose }}
            closeOnOutsideClick={false}
            closeOnEscape={false}
          >
            <button
              className="bg-none border-none border rounded-circle"
              aria-label="Close drawer"
              onClick={() => {
                handleClose();
                dispatch(resetScaleState());
              }}
              style={{
                width: "2rem",
                height: "2rem",
                display: "grid",
                placeItems: "center",
                cursor: "pointer",
              }}
            >
              <X size={16} />
            </button>
          </ModalButton>
        ) : (
          <button
            className="bg-none border-none border rounded-circle"
            aria-label="Close drawer"
            onClick={() => {
              handleClose();
              dispatch(resetScaleState());
            }}
            style={{
              width: "2rem",
              height: "2rem",
              display: "grid",
              placeItems: "center",
              cursor: "pointer",
            }}
          >
            <X size={16} />
          </button>
        )}
      </div>
      <div className="drawer-content px-2 font-size-sm pt-2">
        <div className="d-flex flex-column gap-3">
          <div className="d-flex flex-column gap-2">
            <div className="d-flex flex-row justify-content-between">
              <span className="fw-semibold">Configure Grade Scale</span>
              <span className="text-end muted text-capitalize">{`step ${currentStep} of ${fullStep} completed`}</span>
            </div>
            <div className="d-flex flex-column">
              <span>Configure the score range and meaning of each grade.</span>
              <div className="d-flex flex-row align-items-center gap-2">
                <span>
                  {isLoading ? 0 : gradeScales?.data?.grade_scales?.length}{" "}
                  grades
                </span>
                <Dot />
                <span>{moduleState?.draft?.maximumScore} Max Score</span>
              </div>
            </div>
          </div>
          <div
            className="d-flex flex-column gap-2"
            style={{ paddingBottom: "10rem" }}
          >
            {isLoading ? (
              <div className="d-flex flex-column gap-2 px-2">
                {[...Array(8)].map((_, index) => (
                  <Fragment key={index}>
                    <RectangleSkeleton height="20dvh" width="100%" />
                  </Fragment>
                ))}
              </div>
            ) : error ? (
              <>
                <NotFoundError
                  title={error?.response?.data?.errors?.title}
                  description={error?.response?.data?.errors?.description}
                ></NotFoundError>
              </>
            ) : (
              Object.keys(gradeScaleList).map((objKey, index) => {
                const grade = gradeScaleList[objKey];
                return (
                  <Fragment key={objKey}>
                    {grade?.is_configured ? (
                      <GradeListCard
                        grade={grade}
                        nextStep={nextStep}
                        moduleState={moduleState}
                      />
                    ) : (
                      <NotConfiguredCard
                        grade={grade}
                        nextStep={nextStep}
                        moduleState={moduleState}
                      />
                    )}
                  </Fragment>
                );
              })
            )}
          </div>
        </div>
      </div>
      <div className="drawer-footer font-size-sm">
        <div className="d-flex flex-column w-100">
          <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.5} />
          <div className="d-flex flex-row align-items-center justify-content-between p-2">
            <button
              className="border-none bg-none p-2"
              onClick={() => previousStep()}
            >
              Back
            </button>
            <div className="d-flex flex-row align-items-center gap-2">
              {moduleState.isDirty ? (
                <ModalButton
                  action={{ modalContent: DiscardWarning }}
                  size={"md"}
                  rowData={{ handleCloseDrawer: handleClose }}
                  closeOnOutsideClick={false}
                  closeOnEscape={false}
                >
                  <button className="border rounded-3 bg-none px-3 py-2">
                    Cancel
                  </button>
                </ModalButton>
              ) : (
                <button
                  className="border rounded-3 bg-none px-3 py-2"
                  onClick={() => {
                    handleClose();
                    dispatch(resetScaleState());
                  }}
                >
                  Cancel
                </button>
              )}
              {moduleState.isDirty && (
                <button
                  className="rouned primary-background text-white border-none px-3 py-2 rounded-3"
                  onClick={() => handleCreateGrades()}
                >
                  {isPending ? <SingleSpinner /> : "Create Grade Scale"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default GradeList;

function GradeListCard({ grade, nextStep, moduleState }) {
  const dispatch = useDispatch();
  const conflicts = moduleState.diagnostics.conflicts;
  return (
    <>
      <div
        className={`card p-3 rounded-4 d-flex flex-column gap-3 ${isConflicting(grade?.letter_grade_id, conflicts) ? "border-danger" : "border"} shadow-sm`}
      >
        <div className="d-flex flex-row justify-content-between">
          <div className="d-flex flex-row align-items-center gap-2">
            <div
              className="d-flex flex-row align-items-center justify-content-center font-size-md fw-semibold gap-2 rounded-3 primary-background-100 color-primary"
              style={{ height: "2.5rem", width: "2.5rem" }}
            >
              {grade?.letter_grade}
            </div>
            <div className="d-flex flex-column">
              <small className="text-muted">Grade Tier</small>
              <span className="fw-semibold font-size-md">
                Grade {grade?.letter_grade}
              </span>
            </div>
          </div>
          {isConflicting(grade?.letter_grade_id, conflicts) ? (
            <span
              className="rounded-pill d-inline-flex align-items-center gap-1 border-0 fw-normal px-2"
              style={{
                backgroundColor: "#ffdddd",
                color: "#ff5757",
                fontSize: "0.75rem",
                height: "1.5rem",
              }}
            >
              Needs Review
            </span>
          ) : (
            <span
              className="rounded-pill d-inline-flex align-items-center gap-1 border-0 fw-normal px-2"
              style={{
                backgroundColor: "#e3f5e3",
                color: "#5cb85c",
                fontSize: "0.75rem",
                height: "1.5rem",
              }}
            >
              Configured
            </span>
          )}
        </div>
        <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.2} />
        <div className="d-flex flex-row font-size-sm  gap-4">
          <div className="d-flex flex-column gap-2 align-items-center">
            <span className="fw-normal gainsboro-color text-uppercase">
              Score Range
            </span>
            <span className="fw-semibold">
              {grade?.min_score?.value} - {grade?.max_score?.value}
            </span>
          </div>
          <div className="d-flex flex-column gap-2 align-items-center">
            <span className="fw-normal gainsboro-color text-uppercase">
              Grade Points
            </span>
            <span className="fw-semibold">{grade?.grade_point?.value}</span>
          </div>
          <div className="d-flex flex-column gap-2 align-items-center">
            <span className="fw-normal gainsboro-color text-uppercase">
              Result
            </span>
            <span className="fw-semibold text-capitalize">
              {grade?.result?.value}
            </span>
          </div>
          <div className="d-flex flex-column gap-2 align-items-center">
            <span className="fw-normal gainsboro-color text-uppercase">
              Resit Result
            </span>
            <span className="fw-semibold text-capitalize">
              {RESIT_LABEL[grade?.resit_result?.value]}
            </span>
          </div>
        </div>
        <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.2} />
        <div className="d-flex flex-row justify-content-between">
          <div className="d-flex flex-row align-items-center gap-2">
            <span>Count As</span>
            {grade?.result?.value == "failed" ? (
              <span className="text-danger fw-medium">Failing</span>
            ) : (
              <span className="text-success fw-medium">Passing</span>
            )}
          </div>
          <button
            className="font-size-sm border-none bg-none rounded-3 d-flex flex-row align-items-center gap-2 p-2 px-3"
            onClick={() => {
              dispatch(
                updatedGradeContext({
                  field: "scale",
                  data: { ...grade },
                }),
              );
              nextStep();
            }}
          >
            <span>Edit Grade</span>
            <PenLine size={16} />
          </button>
        </div>
      </div>
    </>
  );
}

function NotConfiguredCard({ grade, nextStep, moduleState }) {
  const dispatch = useDispatch();
  return (
    <>
      <div className="card p-3 rounded-4 d-flex flex-column gap-3 border shadow-sm">
        <div className="d-flex flex-row justify-content-between">
          <div className="d-flex flex-row align-items-center gap-2">
            <div
              className="d-flex flex-row align-items-center justify-content-center font-size-md fw-semibold gap-2 rounded-3"
              style={{
                height: "2.5rem",
                width: "2.5rem",
                border: "1px dashed #cccccc",
                background: "#f5f5f5",
                color: "#727272",
              }}
            >
              {grade?.letter_grade}
            </div>
            <div className="d-flex flex-column">
              <small className="text-muted">Grade Tier</small>
              <span className="fw-semibold font-size-md">
                Grade {grade?.letter_grade}
              </span>
            </div>
          </div>
          <span
            className="rounded-pill d-inline-flex align-items-center gap-1 border-0 fw-normal px-2"
            style={{
              backgroundColor: "#f5f5f5",
              color: "#727272",
              fontSize: "0.75rem",
              height: "1.5rem",
            }}
          >
            Not Setup
          </span>
        </div>
        <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.2} />
        <p className="w-50 text-muted">
          Set a score range and grade points so that students in this tier are
          grades correctly
        </p>
        <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.2} />
        <button
          className="font-size-sm border-none w-25 rounded-3 d-flex flex-row align-items-center gap-2 p-2 px-3 primary-background text-white"
          onClick={() => {
            dispatch(
              updatedGradeContext({
                field: "scale",
                data: { ...grade },
              }),
            );
            nextStep();
          }}
        >
          <Plus size={12} />
          <span>Configure Grade</span>
        </button>
      </div>
    </>
  );
}
