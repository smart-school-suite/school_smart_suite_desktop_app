import PurchaseActivationCode from "../../ModalContent/ActivationCode/PurchaseActivationCode";
import ActionButtonDropdown, {
  ModalButton,
} from "../../components/DataTableComponents/ActionComponent";
import { Icon } from "@iconify/react";
import { useGetActivationCodes } from "../../hooks/activationCode/useGetActivationCode";
import Table from "../../components/Tables/Tables";
import React, { useMemo, useState, useRef } from "react";
import { activationCodesTableConfig } from "../../ComponentConfig/AgGridTableConfig";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
function ActivationCode() {
  const { data: activationCodes, isLoading, error } = useGetActivationCodes();
  const tableRef = useRef();
  const memoizedColDefs = useMemo(() => {
    return activationCodesTableConfig();
  }, []);
  const memoizedRowData = useMemo(() => {
    return activationCodes?.data ?? [];
  }, [activationCodes]);
  return (
    <>
      <main className="main-container gap-2 h-100">
        <div style={{ height: "5%" }}>
          <div className="d-flex flex-row align-items-center justify-content-between">
            <span>Activation Code</span>
            <ModalButton
              action={{ modalContent: PurchaseActivationCode }}
              size={"xl"}
              classname={
                "border-none green-bg font-size-sm rounded-3 px-3 py-2 gap-2 d-flex flex-row align-items-center d-flex text-white"
              }
            >
              <Icon icon="icons8:plus" className="font-size-md" />
              <span>Purchase Code</span>
            </ModalButton>
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
export default ActivationCode;
