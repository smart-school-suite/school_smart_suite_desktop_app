import { Fragment, useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import HorizontalDashedLine from "../../../components/DashedLine/HorizonetalDashedLine";
import {
  Dot,
  PenLine,
  Plus,
  X,
  TriangleAlert,
  Check,
  OctagonAlert,
  Info,
  Scale,
} from "lucide-react";
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
import {
  isConflicting,
  isError,
  isWarning,
  groupGradeScaleErrors,
} from "../../../utils/gradeScale/gradeScaleHelpers";
import { useGetGradeScaleCategoryId } from "../../../hooks/gradeScale/useGetGradeScaleCategoryId";
import { SingleSpinner } from "../../../components/Spinners/Spinners";
import { ModalButton } from "../../../components/DataTableComponents/ActionComponent";
import DiscardWarning from "../../../ModalContent/GradesConfig/DiscardWarning";
import { GRADE_SCALE_ERROR_MAP } from "../../../utils/maps/gradeScale/gradeScaleErrorMap";
import { useUpdateGradeScale } from "../../../hooks/gradeScale/useUpdateGradeScale";
function GradeList({
  handleClose,
  nextStep,
  previousStep,
  fullStep,
  currentStep,
  drawerData,
}) {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const moduleState = useSelector((state) => state.gradeScale.gradeScale);

  const gradeScaleList = moduleState?.draft?.grades;
  const [isValid, setIsValid] = useState(true);
  const {
    data: gradeScales,
    isLoading,
    error,
  } = useGetGradeScaleCategoryId(
    drawerData.id,
    moduleState?.configType,
    moduleState?.draft?.maximumScore,
  );
  const { mutate: updateGradeScale, isPending } =
    useUpdateGradeScale(handleClose);
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
            value: parseFloat(item.configuration.minimum_score).toFixed(2),
            isValid: null,
          },
          max_score: {
            value: parseFloat(item.configuration.maximum_score).toFixed(2),
            isValid: null,
          },
          grade_point: {
            value: parseFloat(item.configuration.grade_points).toFixed(2),
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
          grade_scale_id: item.id ?? null,
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

  const handleUpdateGradeScale = async () => {
    const grades = moduleState.draft.grades;
    if (moduleState.diagnostics.conflicts.length > 0) {
      setIsValid(false);
      return;
    }
    const formattedPayload = Object.keys(grades)
      .map((objKey) => ({
        letter_grade_id: grades[objKey].letter_grade_id,
        grade_scale_id: grades[objKey].grade_scale_id,
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

    updateGradeScale({
      grade_scales: formattedPayload,
      category_max_score: moduleState.draft.maximumScore,
      grades_category_id: moduleState.configContext.category.drawerData.id,
    });
    dispatch(resetScaleState());
  };

  return (
    <>
      <div className="d-flex flex-row align-items-center justify-content-between border-bottom p-2 font-size-sm">
        <span className="fw-medium">Update Grade Scale</span>
        {moduleState.isDirty ? (
          <ModalButton
            action={{
              modalContent: DiscardWarning,
              drawerData: { ...moduleState.configContext.category.drawerData },
            }}
            size={"md"}
            rowData={{ handleCloseDrawer: handleClose }}
            closeOnOutsideClick={false}
            closeOnEscape={false}
          >
            <button
              className="bg-none border-none border rounded-circle"
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
              queryClient.invalidateQueries({
                queryKey: [
                  "grade-scale-category",
                  moduleState.configContext.category.drawerData.id,
                ],
              });
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
          <div className="d-flex flex-column gap-4">
            <div className="d-flex flex-row justify-content-between">
              <div className="d-flex flex-row align-items-center gap-2">
                <div
                  className="d-flex flex-row align-items-center justify-content-center font-size-md fw-semibold gap-2 rounded-3 primary-background-100 color-primary"
                  style={{ height: "2.5rem", width: "2.5rem" }}
                >
                  <Scale size={16} />
                </div>
                <div className="d-flex flex-column">
                  <small className="text-muted">Category</small>
                  <div className="d-flex flex-row align-items-center gap-1">
                    <span className="fw-semibold font-size-md">
                      {
                        moduleState?.configContext?.category?.drawerData
                          ?.grade_title
                      }
                    </span>
                    <Dot size={16} />
                    <span className="fw-semibold font-size-md text-capitalize">
                      {
                        moduleState?.configContext?.category?.drawerData
                          ?.exam_type
                      }
                    </span>
                    <Dot size={16} />
                    <span className="fw-semibold font-size-md text-capitalize">
                      {moduleState?.draft?.maximumScore}
                    </span>
                  </div>
                </div>
              </div>
              <span className="text-end text-capitalize">{`step ${currentStep} of ${fullStep} completed`}</span>
            </div>
            <div className="d-flex flex-row justify-content-between">
              <div className="d-flex flex-row align-items-center gap-2">
                <Info size={16} />
                <small className="text-muted">
                  Only configured grades will be included when you save this
                  scale.
                </small>
              </div>
              <div className="d-flex flex-row gap-1 fw-semibold">
                <span>
                  {isLoading
                    ? 0
                    : Object.values(gradeScaleList).filter(
                        (item) => item.is_configured === true,
                      ).length}
                </span>{" "}
                <span>/</span>{" "}
                <span>
                  {isLoading ? 0 : gradeScales?.data?.grade_scales?.length}
                </span>
                <span>Grades Configured</span>
              </div>
            </div>
          </div>
          {!isValid && (
            <div className="alert alert-danger rounded-4">
              <p>
                Opps Looks Like you have errors please fix them before
                submitting again
              </p>
            </div>
          )}
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
              <div className="d-flex flex-column gap-1">
                <span className="fw-medium">Scales</span>
                <div className="d-flex flex-column gap-2">
                  {Object.keys(gradeScaleList).map((objKey, index) => {
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
                  })}
                </div>
              </div>
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
              disabled={isLoading}
            >
              Back
            </button>
            <div className="d-flex flex-row align-items-center gap-2">
              {moduleState.isDirty ? (
                <ModalButton
                  action={{ modalContent: DiscardWarning }}
                  size={"md"}
                  rowData={{
                    handleCloseDrawer: handleClose,
                    drawerData: {
                      ...moduleState.configContext.category.drawerData,
                    },
                  }}
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
                  disabled={isLoading}
                  onClick={() => {
                    handleClose();
                    dispatch(resetScaleState());
                    queryClient.invalidateQueries({
                      queryKey: [
                        "grade-scale-category",
                        moduleState.configContext.category.drawerData.id,
                      ],
                    });
                  }}
                >
                  Cancel
                </button>
              )}
              {moduleState.isDirty && (
                <button
                  className="rouned primary-background text-white border-none px-3 py-2 rounded-3"
                  onClick={() => handleUpdateGradeScale()}
                  disabled={isLoading}
                >
                  {isPending ? <SingleSpinner /> : "Update Grade Scale"}
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
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const conflicts = moduleState.diagnostics.conflicts;
  const warnings = moduleState.diagnostics.warnings;
  const groupErrors = groupGradeScaleErrors(
    grade?.letter_grade_id,
    conflicts,
    warnings,
  );
  return (
    <>
      <div
        className={`card p-3 rounded-4 d-flex flex-column gap-3 transition-all
           ${
             isError(grade?.letter_grade_id, conflicts)
               ? "border-1 border-red-200 shadow-red-50"
               : isWarning(grade?.letter_grade_id, warnings)
                 ? "border-1 border-old-lace-200 shadow-old-lace-50"
                 : "border shadow-sm"
           } `}
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
              className="rounded-pill d-inline-flex align-items-center gap-1 border-0 fw-normal px-2 pointer-cursor"
              style={{
                backgroundColor: "#ffdddd",
                color: "#ff5757",
                fontSize: "0.75rem",
                height: "1.5rem",
              }}
              onClick={() => setIsOpen(true)}
            >
              <TriangleAlert size={14} />
              <span>Action required</span>
            </span>
          ) : isWarning(grade?.letter_grade_id, warnings) ? (
            <span
              className="rounded-pill d-inline-flex align-items-center gap-1 border-0 fw-normal px-2 pointer-cursor bg-old-lace-100 text-old-lace-400"
              style={{
                fontSize: "0.75rem",
                height: "1.5rem",
              }}
              onClick={() => setIsOpen(true)}
            >
              <OctagonAlert size={12} />
              <span>Review recommended</span>
            </span>
          ) : !isConflicting(grade?.letter_grade_id, conflicts) &&
            !isWarning(grade?.letter_grade_id, warnings) ? (
            <span
              className="rounded-pill d-inline-flex align-items-center gap-1 border-0 fw-normal px-2 pointer-cursor bg-fern-100 text-fern-400"
              style={{
                fontSize: "0.75rem",
                height: "1.5rem",
              }}
            >
              <Check size={12} />
              <span>Configured</span>
            </span>
          ) : null}
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
          <div className="d-flex flex-column gap-2 align-items-center">
            <span className="fw-normal gainsboro-color text-uppercase">
              Performance
            </span>
            <span className="fw-semibold text-capitalize">
              {grade?.performance?.value}
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
        {isOpen && (
          <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.2} />
        )}
        {isOpen && (
          <div className="d-flex flex-column gap-2">
            {groupErrors?.conflicts?.length > 0 && (
              <>
                <div className="d-flex flex-column gap-1">
                  <span className="fw-medium">Errors</span>
                  {groupErrors?.conflicts?.map((conflict) => {
                    const Component =
                      GRADE_SCALE_ERROR_MAP[conflict.type]?.component;
                    return (
                      <Component
                        error={conflict}
                        updatedGradeContext={updatedGradeContext}
                        nextStep={nextStep}
                        grade={grade}
                        gradeScale={moduleState?.draft}
                      />
                    );
                  })}
                </div>
              </>
            )}
            <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.2} />
            {groupErrors?.warnings?.length > 0 && (
              <div className="d-flex flex-column gap-1">
                <span className="fw-medium">Warnings</span>
                {groupErrors?.warnings?.map((warning) => {
                  const Component =
                    GRADE_SCALE_ERROR_MAP[warning.type]?.component;
                  return (
                    <Component
                      error={warning}
                      updatedGradeContext={updatedGradeContext}
                      nextStep={nextStep}
                      grade={grade}
                      gradeScale={moduleState?.draft}
                    />
                  );
                })}
              </div>
            )}
          </div>
        )}
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
