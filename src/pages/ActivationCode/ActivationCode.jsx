import PurchaseActivationCode from "../../ModalContent/ActivationCode/PurchaseActivationCode";
import ActionButtonDropdown, {
  ModalButton,
} from "../../components/DataTableComponents/ActionComponent";
import { Icon } from "@iconify/react";
import { useGetActivationCodes } from "../../hooks/activationCode/useGetActivationCode";
import Table from "../../components/Tables/Tables";
import React, { useMemo, useState, useRef, useEffect, useCallback, Fragment } from "react";
import { activationCodesTableConfig } from "../../ComponentConfig/AgGridTableConfig";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { activationCodeColDefs } from "../../utils/table/colDefs/activationCode/activationCodeColDefs";
import TableColumnSetting from "../../ModalContent/Table/TableSetting";
import Export from "../../ModalContent/Export/Export";
import { isLastElement } from "../../utils/functions";
import HorizontalDashedLine from "../../components/DashedLine/HorizonetalDashedLine";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, ChevronDown } from "lucide-react";
import filterPopOverMap from "../../utils/maps/FilterMap";
import FilterColumns from "../../ModalContent/Teacher/FilterColumns";
import {
  resetAllCustomFilters,
  addCustomFilter,
  toggleGeneralFilter,
  removeCustomFilter,
  setCustomFilter,
} from "../../Slices/activationCode/activationCodeSlice";
import GeneralFilterWizzard from "../../components/GeneralFilter/Table/GeneralFilterWizzard";
import ImportWizzard from "../../ModalContent/Import/ImportWizzard";
import { useDispatch, useSelector } from "react-redux";
function ActivationCode() {
  const { data: activationCodes, isLoading, error } = useGetActivationCodes();
  const tableRef = useRef();
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);
  const activationCodeState = useSelector((state) => state.activationCode);
  const [searchText, setSearchText] = useState("");
  const [rowCount, setRowCount] = useState(0);
  const [columns, setColumns] = useState({
    selectedColumns: [],
    availableColumns: [],
  });
  const memoizedColDefs = useMemo(() => {
    return activationCodeColDefs();
  }, []);

  const memoizedRowData = useMemo(() => {
    return activationCodes?.data ?? [];
  }, [activationCodes]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchText(value);
    if (tableRef.current && tableRef.current.setGridOption) {
      tableRef.current.setGridOption("quickFilterText", value);
    }
  };

  const handleReset = () => {
    if (tableRef.current) {
      tableRef.current.deselectAll();
      setRowCount(0);

      if (tableRef.current.setGridOption) {
        tableRef.current.setGridOption("quickFilterText", "");
      }
      setSearchText("");
      const gridApi = tableRef.current.getGridApi
        ? tableRef.current.getGridApi()
        : null;
      if (gridApi) {
        gridApi.setFilterModel(null);
      }
    }
  };

  useEffect(() => {
    if (!isLoading && tableRef.current?.getColumnsState) {
      const timer = setTimeout(() => {
        const gridCols = tableRef.current.getColumnsState();
        if (gridCols && gridCols.length > 0) {
          const filteredCols = gridCols.filter(
            (col) =>
              !col.isSystemColumn &&
              col.field !== "action" &&
              col.colId !== "actions" &&
              col.colId !== "ActionComponent",
          );
          setColumns((prevalue) => ({
            ...prevalue,
            availableColumns: [...prevalue.availableColumns, ...filteredCols],
          }));
          setColumns((prev) => ({
            ...prev,
            selectedColumns: prev.availableColumns.slice(0, 4),
          }));
        }
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [isLoading, memoizedRowData]);
  return (
    <>
      <main className="main-container gap-2 h-100">
        <div className="h-100">
          {isLoading ? (
            <RectangleSkeleton width="100%" height="100%" />
          ) : error ? (
            <NotFoundError
              title={error?.response?.data?.errors?.title}
              description={error?.response?.data?.errors?.description}
            ></NotFoundError>
          ) : (
            <>
              <div className="d-flex flex-column gap-2 h-100">
                <div className="d-flex flex-row align-items-center justify-content-between">
                  <div className="d-flex flex-row align-items-center gap-2">
                    {columns?.selectedColumns?.map((c, index) => {
                      const FilterPopOver = filterPopOverMap.find(
                        (f) => f.cellDataType === c.cellDataType,
                      ).component;
                      return (
                        <Fragment key={index}>
                          <FilterPopOver column={c} tableRef={tableRef} />
                        </Fragment>
                      );
                    })}
                    <ModalButton
                      action={{ modalContent: FilterColumns }}
                      size={"xl"}
                      rowData={{ setColumns, columns: columns }}
                    >
                      <button
                        className="border-none border rounded-3 px-2 font-size-sm d-flex flex-row align-items-center white-bg"
                        style={{ padding: "0.45rem" }}
                      >
                        <span>
                          <Icon icon="ic:round-plus" width={14} height={14} />
                        </span>
                      </button>
                    </ModalButton>
                    <button
                      className="border-none border rounded-3 font-size-sm  d-flex flex-row align-items-center gap-2 white-bg"
                      style={{
                        fontSize: "0.7rem",
                        cursor: "pointer",
                        padding: "0.45rem",
                      }}
                      onClick={() => {
                        dispatch(toggleGeneralFilter());
                      }}
                    >
                      <span>
                        <Icon icon="mynaui:filter" width={16} height={16} />
                      </span>
                      <span style={{ lineHeight: "16px" }}>Filter</span>
                    </button>
                  </div>
                  <div className="d-flex flex-row align-items-center gap-2">
                    <button
                      className="border-none border rounded-3 font-size-sm   d-flex flex-row align-items-center white-bg"
                      onClick={handleReset}
                      style={{ padding: "0.45rem" }}
                    >
                      <span>
                        <Icon
                          icon="grommet-icons:revert"
                          width={16}
                          height={16}
                        />
                      </span>
                    </button>
                    <button
                      className="border-none border rounded-3 font-size-sm d-flex flex-row align-items-center white-bg"
                      style={{ padding: "0.45rem" }}
                    >
                      <span>
                        <Icon icon="mage:copy" width={16} height={16} />
                      </span>
                    </button>
                  </div>
                </div>
                <div className="d-flex flex-row justify-content-between align-items-center">
                  <input
                    type="search"
                    placeholder="Search Activation Code...."
                    onChange={handleSearch}
                    value={searchText}
                    className="font-size-sm form-control w-25"
                  />
                  <div className="d-flex flex-row align-items-center gap-2">
                    <ModalButton
                      action={{ modalContent: Export }}
                      size={"xl"}
                      rowData={{ tableRef, columns: columns.availableColumns }}
                    >
                      <button
                        className="border-none border rounded-3 font-size-sm px-2 d-flex flex-row align-items-center gap-1 white-bg"
                        style={{ padding: "0.45rem" }}
                      >
                        <span style={{ lineHeight: "16px" }}>Export</span>
                        <span>
                          <Icon icon="tabler:arrow-up" width={14} height={14} />
                        </span>
                      </button>
                    </ModalButton>
                    <ModalButton
                      action={{ modalContent: TableColumnSetting }}
                      size={"xl"}
                      rowData={{ tableRef }}
                    >
                      <button
                        className="border-none border rounded-3 font-size-sm px-2 d-flex flex-row align-items-center gap-1 white-bg"
                        style={{ padding: "0.45rem" }}
                      >
                        <span>
                          <Icon
                            icon="lsicon:setting-outline"
                            width={20}
                            height={20}
                          />
                        </span>
                      </button>
                    </ModalButton>
                  </div>
                </div>
                <div className="h-100">
                  <div className="d-flex flex-row align-items-start w-100 h-100 gap-1">
                    <motion.div
                      className="h-100"
                      layout
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                      style={{
                        width: activationCodeState.isGeneralFilterOpen
                          ? "60%"
                          : "100%",
                      }}
                    >
                      <Table
                        colDefs={memoizedColDefs}
                        rowData={memoizedRowData}
                        rowHeight={45}
                        ref={tableRef}
                      />
                    </motion.div>
                    {activationCodeState.isGeneralFilterOpen && (
                      <AnimatePresence mode="popLayout">
                        {activationCodeState.isGeneralFilterOpen && (
                          <motion.div
                            key="filter-panel"
                            className="card rounded-3 font-size-sm d-flex flex-column h-100"
                            initial={{ x: "100%", opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: "100%", opacity: 0 }}
                            transition={{
                              type: "spring",
                              stiffness: 350,
                              damping: 32,
                            }}
                            style={{ width: "40%" }}
                          >
                            <div
                              className="p-2 rounded-top-3 d-flex flex-column gap-2 border-bottom"
                              style={{ background: "#f9f9f9" }}
                            >
                              <div className="d-flex flex-row align-items-center justify-content-between">
                                <span>
                                  Build a custom view of your Activation Code
                                  data.
                                </span>
                                <button
                                  className="border-none bg-transparent"
                                  onClick={() =>
                                    dispatch(toggleGeneralFilter())
                                  }
                                >
                                  <Icon
                                    icon="iconoir:cancel"
                                    width={18}
                                    height={18}
                                  />
                                </button>
                              </div>
                              <div className="d-flex flex-row align-items-center justify-content-between">
                                <div className="d-flex flex-row align-items-center gap-2">
                                  <span>
                                    <Icon
                                      icon="mynaui:filter"
                                      width={18}
                                      height={18}
                                    />
                                  </span>
                                  <span>Filter Activation Codes</span>
                                </div>
                                <span>
                                  {activationCodes?.data.length} items
                                </span>
                              </div>
                            </div>
                            <div
                              className="scroll-bar-sm over-flow-x-hidden over-flow-y-auto height-auto d-flex flex-column me-1 gap-2"
                              style={{ maxHeight: "52dvh" }}
                            >
                              {activationCodeState.customFilter.length > 0 ? (
                                <div>
                                  {activationCodeState?.customFilter?.map(
                                    (cFilters) => (
                                      <Fragment key={cFilters.id}>
                                        <GeneralFilterWizzard
                                          cFilters={cFilters}
                                          columns={columns}
                                          moduleState={activationCodeState}
                                          removeCustomFilter={
                                            removeCustomFilter
                                          }
                                          setCustomFilter={setCustomFilter}
                                        />
                                      </Fragment>
                                    ),
                                  )}
                                </div>
                              ) : (
                                <div className="d-flex flex-column justify-content-center align-items-center flex-grow-1 p-4">
                                  <div className="text-center d-flex flex-column gap-1 mb-3">
                                    <span className="fw-semibold">
                                      Build a custom filter
                                    </span>
                                    <span className="text-muted">
                                      Create one or more conditions to narrow
                                      down your activation Code list.
                                    </span>
                                  </div>
                                  <button
                                    className="d-flex flex-row align-items-center gap-2 bg-transparent border-none border rounded-3 p-2 font-size-sm"
                                    onClick={() => {
                                      dispatch(addCustomFilter());
                                    }}
                                  >
                                    <span>
                                      <Icon icon="mynaui:plus" />
                                    </span>
                                    <span>Add Condition</span>
                                  </button>
                                </div>
                              )}
                            </div>
                            <div className="mt-auto">
                              {activationCodeState.customFilter.length > 0 && (
                                <div className="d-flex flex-row justify-content-start p-2">
                                  <button
                                    className="font-size-sm bg-transparent font-size-sm rounded-3 p-2 d-flex flex-row align-items-center gap-2 border-none border"
                                    onClick={() => {
                                      dispatch(addCustomFilter());
                                    }}
                                  >
                                    <span>
                                      <Icon icon="ic:round-plus" />
                                    </span>
                                    <span>Add Condition</span>
                                  </button>
                                </div>
                              )}
                              <div className="d-flex flex-row border-top justify-content-between p-2">
                                <button
                                  className="border-none border bg-transparent px-3 font-size-sm py-2 rounded-3"
                                  onClick={() => {
                                    dispatch(resetAllCustomFilters());
                                  }}
                                >
                                  Reset All
                                </button>
                                <button className="border-none border px-3 font-size-sm py-2 primary-background text-white rounded-3">
                                  Apply
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
}
export default ActivationCode;
