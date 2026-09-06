import HorizontalDashedLine from "../../../components/DashedLine/HorizonetalDashedLine";
import { ArrowLeft, Minus, CircleCheck } from "lucide-react";
import {
  NumberInput,
  TextInput,
} from "../../../components/FormComponents/InputComponents";
import {
  numberSchema,
  nameSchema,
} from "../../../ComponentConfig/YupValidationSchema";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import {
  setDraftFieldValue,
  setDraftFieldValidation,
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
function GradeEditor({
  handleClose,
  nextStep,
  previousStep,
  fullStep,
  currentStep,
  drawerData,
}) {
  const dispatch = useDispatch();
  const moduleState = useSelector((state) => state.gradeScale.gradeScale);
  const config = moduleState?.configContext?.scale;
  const draftState = moduleState?.draft?.grades[config.letter_grade_id];
  const gsCategory = moduleState.configContext.category.drawerData;

  return (
    <>
      <div className="drawer-content px-2 font-size-sm pt-2">
        <div className="d-flex flex-column gap-3">
          <div className="d-flex flex-row align-items-center gap-2">
            <div
              className="d-flex flex-row align-items-center justify-content-center font-size-md fw-semibold gap-2 rounded-3 primary-background-100 color-primary"
              style={{ height: "2.5rem", width: "2.5rem" }}
            >
              {moduleState?.configContext?.scale?.letter_grade}
            </div>
            <div className="d-flex flex-column">
              <small className="text-muted">Grade Tier</small>
              <span className="fw-semibold font-size-md">
                Grade {moduleState?.configContext?.scale?.letter_grade}
              </span>
            </div>
          </div>
          <div className="d-flex flex-row align-items-center gap-3">
            <div className="d-flex flex-column gap-1 w-50">
              <span className="fw-semibold">Min Score</span>
              <NumberInput
                placeholder={"Enter Minumum Score"}
                validationSchema={numberSchema({
                  min: 0,
                  max: moduleState?.draft?.maximumScore,
                  required: true,
                  messages: {
                    max: `Maximum Score Must Not Exceed ${moduleState?.draft?.maximumScore}`,
                    min: `Maximum Score Must Be Atleast 0`,
                    required: "Maximum Score Required",
                  },
                })}
                step={"0.1"}
                onChange={(value) =>
                  dispatch(
                    setDraftFieldValue({
                      field: "min_score",
                      value: value,
                      grade_id: config.letter_grade_id,
                    }),
                  )
                }
                onValidationChange={(value) =>
                  dispatch(
                    setDraftFieldValidation({
                      field: "min_score",
                      value: value,
                      grade_id: config.letter_grade_id,
                    }),
                  )
                }
                value={draftState?.min_score?.value}
              />
            </div>
            <Minus size={16} />
            <div className="d-flex flex-column gap-1 w-50">
              <span className="fw-semibold">Max Score</span>
              <NumberInput
                placeholder={"Enter Maximum Score"}
                validationSchema={numberSchema({
                  min: 0,
                  max: moduleState?.draft?.maximumScore,
                  required: true,
                  messages: {
                    max: `Maximum Score Must Not Exceed ${moduleState?.draft?.maximumScore}`,
                    min: `Maximum Score Must Be Atleast 0`,
                    required: "Maximum Score Required",
                  },
                })}
                step={"0.1"}
                onChange={(value) =>
                  dispatch(
                    setDraftFieldValue({
                      field: "max_score",
                      value: value,
                      grade_id: config.letter_grade_id,
                    }),
                  )
                }
                onValidationChange={(value) =>
                  dispatch(
                    setDraftFieldValidation({
                      field: "max_score",
                      value: value,
                      grade_id: config.letter_grade_id,
                    }),
                  )
                }
                value={draftState?.max_score?.value}
              />
            </div>
          </div>
          <div className="d-flex flex-column gap-1 w-100">
            <span className="fw-semibold">Grade Point</span>
            <NumberInput
              placeholder={"Enter Grade Point"}
              validationSchema={numberSchema({
                min: 0,
                max: 4.0,
                required: true,
                messages: {
                  max: `Grade Point Must Not Exceed 4`,
                  min: `Grade Point Must Be Atleast 0`,
                  required: "Grade Point Required",
                },
              })}
              step={"0.1"}
              onChange={(value) =>
                dispatch(
                  setDraftFieldValue({
                    field: "grade_point",
                    value: value,
                    grade_id: config.letter_grade_id,
                  }),
                )
              }
              onValidationChange={(value) =>
                dispatch(
                  setDraftFieldValidation({
                    field: "grade_point",
                    value: value,
                    grade_id: config.letter_grade_id,
                  }),
                )
              }
              value={draftState?.grade_point?.value}
            />
          </div>
          <div className="d-flex flex-column gap-1 w-100">
            <span className="fw-semibold">Performance Level</span>
            <TextInput
              validationSchema={nameSchema({
                min: 3,
                max: 50,
                required: true,
                messages: {
                  required: "Performance Level Required",
                  min: "Performance Level Must Be Atleast 3 characters Long",
                  max: "Performance Level Must Not Exceed 50 Characters",
                },
              })}
              placeholder={"E.g Excellent, Very Good Below"}
              onChange={(value) =>
                dispatch(
                  setDraftFieldValue({
                    field: "performance",
                    value: value,
                    grade_id: config.letter_grade_id,
                  }),
                )
              }
              onValidationChange={(value) =>
                dispatch(
                  setDraftFieldValidation({
                    field: "performance",
                    value: value,
                    grade_id: config.letter_grade_id,
                  }),
                )
              }
              value={draftState?.performance?.value}
            />
          </div>
          <div className="d-flex flex-column gap-1">
            <span className="fw-semibold">Result</span>
            <div className="d-flex flex-row align-items-center gap-2">
              <button
                className="border-none p-2 rounded-3 w-50 bg-none border d-flex flex-row 
               align-items-center justify-content-between text-start hover-border-primary-50 hover-text-primary-400"
                onClick={() => {
                  dispatch(
                    setDraftFieldValue({
                      field: "result",
                      value: RESULT.PASSED,
                      grade_id: config.letter_grade_id,
                    }),
                  );
                  if (gsCategory.exam_type == EXAM_TYPE.CA) {
                    dispatch(
                      setDraftFieldValue({
                        field: "resit_result",
                        value: RESIT.LOW_RESIT_POTENTIAL,
                        grade_id: config.letter_grade_id,
                      }),
                    );
                  } else {
                    dispatch(
                      setDraftFieldValue({
                        field: "resit_result",
                        value: RESIT.NO_RESIT,
                        grade_id: config.letter_grade_id,
                      }),
                    );
                  }
                }}
              >
                <span>{RESULT_LABEL[RESULT.PASSED]}</span>
                {draftState?.result?.value == RESULT.PASSED && (
                  <CircleCheck size={16} className="green-color" />
                )}
              </button>
              <button
                className="border-none p-2 rounded-3 w-50 bg-none border d-flex flex-row 
               align-items-center justify-content-between text-start hover-border-primary-50 hover-text-primary-400"
                onClick={() => {
                  dispatch(
                    setDraftFieldValue({
                      field: "result",
                      value: RESULT.FAILED,
                      grade_id: config.letter_grade_id,
                    }),
                  );
                  if (gsCategory.exam_type == EXAM_TYPE.CA) {
                    dispatch(
                      setDraftFieldValue({
                        field: "resit_result",
                        value: RESIT.HIGH_RESIT_POTENTIAL,
                        grade_id: config.letter_grade_id,
                      }),
                    );
                  } else {
                    dispatch(
                      setDraftFieldValue({
                        field: "resit_result",
                        value: RESIT.RESIT,
                        grade_id: config.letter_grade_id,
                      }),
                    );
                  }
                }}
              >
                <span>{RESULT_LABEL[RESULT.FAILED]}</span>
                {draftState?.result?.value == RESULT.FAILED && (
                  <CircleCheck size={16} className="green-color" />
                )}
              </button>
            </div>
          </div>
          <div className="d-flex flex-column gap-1">
            <span className="fw-semibold">Resit Result</span>
            {gsCategory.exam_type == EXAM_TYPE.CA ? (
              <div className="d-flex flex-row align-items-center gap-2">
                <button
                  className="border-none p-2 rounded-3 w-50 bg-none border d-flex flex-row align-items-center justify-content-between text-start hover-border-primary-50 hover-text-primary-400"
                  onClick={() => {
                    dispatch(
                      setDraftFieldValue({
                        field: "resit_result",
                        value: RESIT.LOW_RESIT_POTENTIAL,
                        grade_id: config.letter_grade_id,
                      }),
                    );
                  }}
                >
                  <span>{RESIT_LABEL[RESIT.LOW_RESIT_POTENTIAL]}</span>
                  {draftState?.resit_result.value ==
                    RESIT.LOW_RESIT_POTENTIAL && (
                    <CircleCheck size={16} className="green-color" />
                  )}
                </button>
                <button
                  className="border-none p-2 rounded-3 w-50 bg-none border d-flex flex-row align-items-center justify-content-between text-start hover-border-primary-50 hover-text-primary-400"
                  onClick={() => {
                    dispatch(
                      setDraftFieldValue({
                        field: "resit_result",
                        value: RESIT.HIGH_RESIT_POTENTIAL,
                        grade_id: config.letter_grade_id,
                      }),
                    );
                  }}
                >
                  <span>{RESIT_LABEL[RESIT.HIGH_RESIT_POTENTIAL]}</span>
                  {draftState?.resit_result.value ==
                    RESIT.HIGH_RESIT_POTENTIAL && (
                    <CircleCheck size={16} className="green-color" />
                  )}
                </button>
              </div>
            ) : (
              <div className="d-flex flex-row align-items-center gap-2">
                <button
                  className="border-none p-2 rounded-3 w-50 bg-none border d-flex flex-row align-items-center justify-content-between text-start hover-border-primary-50 hover-text-primary-400"
                  onClick={() => {
                    dispatch(
                      setDraftFieldValue({
                        field: "resit_result",
                        value: RESIT.RESIT,
                        grade_id: config.letter_grade_id,
                      }),
                    );
                  }}
                >
                  <span>{RESIT_LABEL[RESIT.RESIT]}</span>
                  {draftState?.resit_result.value == RESIT.RESIT && (
                    <CircleCheck size={16} className="green-color" />
                  )}
                </button>
                <button
                  className="border-none p-2 rounded-3 w-50 bg-none border d-flex flex-row align-items-center justify-content-between text-start hover-border-primary-50 hover-text-primary-400"
                  onClick={() => {
                    dispatch(
                      setDraftFieldValue({
                        field: "resit_result",
                        value: RESIT.NO_RESIT,
                        grade_id: config.letter_grade_id,
                      }),
                    );
                  }}
                >
                  <span>{RESIT_LABEL[RESIT.NO_RESIT]}</span>
                  {draftState?.resit_result.value == RESIT.NO_RESIT && (
                    <CircleCheck size={16} className="green-color" />
                  )}
                </button>
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
              className="border-none bg-none p-2 d-flex flex-row align-items-center gap-2"
              onClick={() => previousStep()}
            >
              <ArrowLeft size={16} />
              <span>Grade List</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default GradeEditor;
