import Table from "../../components/Tables/Tables";
import { useMemo, useRef } from "react";
import { teacherActivationCodeStatusTableConfig } from "../../ComponentConfig/AgGridTableConfig";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { useGetTeacherActivationCodeStatus } from "../../hooks/activationCode/useGetTeacherActivationCodeStatus";
import { NotFoundError } from "../../components/errors/Error";
function Teacher() {
  const {
    data: teacherActivationStatus,
    isLoading,
    error,
  } = useGetTeacherActivationCodeStatus();
  const tableRef = useRef();
  const memoizedColDefs = useMemo(() => {
    return teacherActivationCodeStatusTableConfig();
  }, []);
  const memoizedRowData = useMemo(() => {
    return teacherActivationStatus?.data ?? [];
  }, [teacherActivationStatus]);
  return (
    <>
      <main className="main-container gap-2 h-100">
        <div style={{ height: "5%" }}>
          <div className="d-flex flex-row align-items-center justify-content-between">
            <span>Teacher Activation</span>
          </div>
        </div>
        <div style={{ height: "95%" }}>
          {isLoading ? (
            <RectangleSkeleton width="100%" height="100%" />
          ) : error ? (
            <NotFoundError
              title={error?.response?.data?.errors?.title}
              description={error?.response?.data?.errors?.description}
            ></NotFoundError>
          ) : (
            <>
              <Table
                colDefs={memoizedColDefs}
                rowData={memoizedRowData}
                rowHeight={55}
                ref={tableRef}
              />
            </>
          )}
        </div>
      </main>
    </>
  );
}
export default Teacher;
