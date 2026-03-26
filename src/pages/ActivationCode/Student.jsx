import Table from "../../components/Tables/Tables";
import { useMemo, useRef } from "react";
import { studentActivationCodeStatusTableConfig } from "../../ComponentConfig/AgGridTableConfig";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { useGetStudentActivationCodeStatus } from "../../hooks/activationCode/useGetStudentActivationCodeStatus";
import { NotFoundError } from "../../components/errors/Error";
function Student() {
  const {
    data: studentActivationStatus,
    isLoading,
    error,
  } = useGetStudentActivationCodeStatus();
  const tableRef = useRef();
  const memoizedColDefs = useMemo(() => {
    return studentActivationCodeStatusTableConfig();
  }, []);
  const memoizedRowData = useMemo(() => {
    return studentActivationStatus?.data ?? [];
  }, [studentActivationStatus]);
  return (
    <>
      <main className="main-container gap-2 h-100">
        <div style={{ height: "5%" }}>
          <div className="d-flex flex-row align-items-center justify-content-between">
            <span>Student Activation</span>
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
export default Student;
