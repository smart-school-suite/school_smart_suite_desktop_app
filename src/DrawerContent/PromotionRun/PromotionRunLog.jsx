import { Dot, GraduationCap } from "lucide-react";
import { Fragment } from "react";
import HorizontalDashedLine from "../../components/DashedLine/HorizonetalDashedLine";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { NotFoundError } from "../../components/errors/Error";
import { useGetPromotionRunLog } from "../../hooks/promotionRun/useGetPromotionRunLog";
function PromotionRunLog({ drawerData, handleClose }) {
  const { id: promotionRunId } = drawerData;
  const { data: log, isLoading, error } = useGetPromotionRunLog(promotionRunId);
  return (
    <>
      <div className="px-2 py-2 font-size-sm">
        <div className="d-flex flex-row align-items-center gap-2">
          <div
            className="d-flex flex-row align-items-center justify-content-center font-size-md fw-semibold gap-2 rounded-3 primary-background-100 color-primary"
            style={{ height: "2.5rem", width: "2.5rem" }}
          >
            <GraduationCap size={20} strokeWidth={1.5} />
          </div>
          <div className="d-flex flex-column">
            <span className="fw-medium">
              {drawerData?.specialty || "General"} Promotion Run
            </span>
            <div className="d-flex flex-row align-items-center gap-1 text-iron-500 fw-light">
              <span>
                {drawerData?.level_name || "N/A"}{" "}
                {drawerData?.level ? `(${drawerData.level})` : ""}
              </span>
              <Dot size={16} />
              <span>{drawerData?.academic_year || "N/A"}</span>
              <Dot size={16} />
              <span>{drawerData?.department || "N/A"}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="drawer-content ps-2 pt-3 font-size-sm bg-iron-100">
        {isLoading ? (
          <div className="d-flex flex-column gap-2">
            {[...Array(4)].map((_, index) => (
              <Fragment key={index}>
                <RectangleSkeleton width="100%" height="20dvh" />
              </Fragment>
            ))}
          </div>
        ) : error ? (
          <NotFoundError
            title={error?.response?.data?.errors?.title}
            description={error?.response?.data?.errors?.description}
          ></NotFoundError>
        ) : (
          <div className="d-flex flex-column gap-2">
            <div className="card rounded-4 border-none border p-2">
              <div className="d-flex flex-column gap-2">
                <div className="d-flex flex-row align-items-center gap-2">
                  <div
                    className="d-flex flex-row align-items-center justify-content-center
                     font-size-md fw-semibold gap-2
                      rounded-3 bg-red-100 text-red-700"
                    style={{ height: "2.5rem", width: "2.5rem" }}
                  >
                    <GraduationCap size={20} strokeWidth={1.5} />
                  </div>
                  <div className="d-flex d-flex flex-column">
                    <span className="fw-medium">Next Specialty Missing</span>
                    <span className="fw-light text-iron-500">
                      Target Next Specialty Could Not Be Determined
                    </span>
                  </div>
                </div>
                <div className="d-flex flex-column gap-1">
                  <span className="fw-medium">Current Specialty</span>
                  <div className="d-flex flex-column gap-2">
                    <div className="d-flex flex-row align-items-center justify-content-between fw-light">
                      <span>Specialty Name</span>
                      <span className="fw-medium">Software Engineering</span>
                    </div>
                    <HorizontalDashedLine
                      dashed={false}
                      color="#ccc"
                      thickness={0.2}
                    />
                    <div className="d-flex flex-row align-items-center justify-content-between fw-light">
                      <span>Specialty Name</span>
                      <span className="fw-medium">Software Engineering</span>
                    </div>
                    <HorizontalDashedLine
                      dashed={false}
                      color="#ccc"
                      thickness={0.2}
                    />
                    <div className="d-flex flex-row align-items-center justify-content-between fw-light">
                      <span>Specialty Name</span>
                      <span className="fw-medium">Software Engineering</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="drawer-footer font-size-sm">
        <div className="d-flex flex-column w-100">
          <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.5} />
          <div className="d-flex flex-row align-items-center justify-content-between py-3 px-2">
            <button
              className="border-none bg-none"
              onClick={() => handleClose()}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default PromotionRunLog;
