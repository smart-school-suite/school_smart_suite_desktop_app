import { Fragment, useEffect } from "react";
import HorizontalDashedLine from "../../components/DashedLine/HorizonetalDashedLine";
import { PenLine, Plus } from "lucide-react";
import { useGetGradeConfigDetails } from "../../hooks/schoolGradeCategory/useGetGradeConfigDetails";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { NotFoundError } from "../../components/errors/Error";
import { useDispatch, useSelector } from "react-redux";
import {
  updatedGradeContext,
  setGradeScaleLoadData,
} from "../../Slices/academics/gradeScaleSlice";
import {
  RESIT,
  RESIT_META,
  RESIT_LABEL,
  RESULT,
  RESULT_LABEL,
  RESULT_META,
  EXAM_TYPE,
} from "@/constants";

function GradeScale({ drawerData, handleClose }) {
  const {
    data: gradeScales,
    isLoading,
    error,
  } = useGetGradeConfigDetails(drawerData.id);
  return (
    <>
      <div className="drawer-content px-2 font-size-sm pt-2">
        <div className="d-flex flex-column gap-3">
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
              gradeScales?.data?.grades?.map((grade, index) => {
                return (
                  <Fragment key={grade.letter_grade_id}>
                    {grade?.configuration?.is_configured ? (
                      <GradeListCard grade={grade} />
                    ) : (
                      <NotConfiguredCard grade={grade} />
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
          </div>
        </div>
      </div>
    </>
  );
}
export default GradeScale;

function GradeListCard({ grade }) {
  const dispatch = useDispatch();
  return (
    <>
      <div className="card p-3 rounded-4 d-flex flex-column gap-3 border shadow-sm">
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
        </div>
        <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.2} />
        <div className="d-flex flex-row font-size-sm  gap-4">
          <div className="d-flex flex-column gap-2 align-items-center">
            <span className="fw-normal gainsboro-color text-uppercase">
              Score Range
            </span>
            <span className="fw-semibold">
              {grade?.configuration?.min_score} -{" "}
              {grade?.configuration?.max_score}
            </span>
          </div>
          <div className="d-flex flex-column gap-2 align-items-center">
            <span className="fw-normal gainsboro-color text-uppercase">
              Grade Points
            </span>
            <span className="fw-semibold">
              {grade?.configuration?.grade_point}
            </span>
          </div>
          <div className="d-flex flex-column gap-2 align-items-center">
            <span className="fw-normal gainsboro-color text-uppercase">
              Result
            </span>
            <span className="fw-semibold text-capitalize">
              {grade?.configuration?.result}
            </span>
          </div>
          <div className="d-flex flex-column gap-2 align-items-center">
            <span className="fw-normal gainsboro-color text-uppercase">
              Resit Result
            </span>
            <span className="fw-semibold text-capitalize">
              {RESIT_LABEL[grade?.configuration?.resit_result]}
            </span>
          </div>
        </div>
        <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.2} />
        <div className="d-flex flex-row justify-content-between">
          <div className="d-flex flex-row align-items-center gap-2">
            <span>Count As</span>
            {grade?.configuration?.result == RESULT.FAILED ? (
              <span className=" red-color fw-semibold">
                {RESULT_LABEL[RESULT.FAILED]}
              </span>
            ) : (
              <span className="green-color fw-semibold">
                {RESULT_LABEL[RESULT.PASSED]}
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function NotConfiguredCard({ grade  }) {
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
      </div>
    </>
  );
}
