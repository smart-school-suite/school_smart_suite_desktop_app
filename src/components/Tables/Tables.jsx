import React, {
  forwardRef,
  useImperativeHandle,
  useMemo,
  useCallback,
  useRef,
} from "react";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import { AgGridReact } from "@ag-grid-community/react";
import { themeQuartz } from "@ag-grid-community/theming";
import { useSelector } from "react-redux";

const Table = forwardRef((props, ref) => {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const gridRef = useRef();

  const rowSelection = useMemo(
    () => ({
      mode: "multiRow",
    }),
    [],
  );

  // Define themes for light and dark
  const lightTheme = themeQuartz.withParams({
    browserColorScheme: "light",
    headerFontSize: "0.75rem",
    fontFamily: { googleFont: "Poppins, sans-serif" },
  });

  const darkTheme = themeQuartz.withParams({
    browserColorScheme: "dark",
    headerFontSize: "0.75rem",
    fontFamily: { googleFont: "Poppins, sans-serif" },
    backgroundColor: "#111",
    foregroundColor: "#666",
    headerBackgroundColor: "#111",
    headerForegroundColor: "#f5f5f5",
  });

  const appliedTheme = darkMode ? darkTheme : lightTheme;

  const onSelectionChanged = useCallback(
    (event) => {
      const selectedNodes = event.api.getSelectedNodes();
      const selectedData = selectedNodes.map((node) => node.data);

      if (props.handleRowCountFromChild) {
        props.handleRowCountFromChild(selectedData.length);
      }

      if (props.handleRowDataFromChild) {
        props.handleRowDataFromChild(selectedData);
      }
    },
    [props],
  );

  const gridReady = useCallback((params) => {
    gridRef.current = params.api;
  }, []);

  // Expose the full grid API to parent component
  useImperativeHandle(
    ref,
    () => ({
      getGridApi: () => gridRef.current,

      getSelectedRows: () => {
        return gridRef.current ? gridRef.current.getSelectedRows() : [];
      },

      getCurrentPageRows: () => {
        if (!gridRef.current) return [];

        const currentPage = gridRef.current.paginationGetCurrentPage(); // 0-indexed
        const pageSize = gridRef.current.paginationGetPageSize();

        const startRow = currentPage * pageSize;
        const endRow = startRow + pageSize;

        const rows = [];
        gridRef.current.forEachNodeAfterFilterAndSort((node, index) => {
          if (index >= startRow && index < endRow && node.data) {
            rows.push(node.data);
          }
        });

        return rows;
      },

      getAllFilteredData: () => {
        if (!gridRef.current) return [];
        const rows = [];
        gridRef.current.forEachNodeAfterFilterAndSort((node) => {
          if (node.data) rows.push(node.data);
        });
        return rows;
      },

      getAllTableData: () => {
        if (!gridRef.current) return [];
        const rows = [];
        gridRef.current.forEachNode((node) => {
          if (node.data) rows.push(node.data);
        });
        return rows;
      },

      // Keep your utility methods
      deselectAll: () => {
        if (gridRef.current) gridRef.current.deselectAll();
      },

      setGridOption: (key, value) => {
        if (gridRef.current) gridRef.current.setGridOption(key, value);
      },

      refreshCells: (params) => {
        if (gridRef.current) gridRef.current.refreshCells(params);
      },
      getColumnsState: () => {
        if (!gridRef.current) return [];
        const states = gridRef.current.getColumnState();

        return states.map((state) => {
          const col = gridRef.current.getColumn(state.colId);
          const colDef = col ? col.getColDef() : {};

          return {
            ...state,
            headerName: colDef.headerName || state.colId,
            field: colDef.field,
            cellDataType: colDef.cellDataType,
            isSystemColumn: !colDef.field || state.colId.startsWith("ag-"),
          };
        });
      },

      setColumnState: (state) => {
        if (gridRef.current) {
          gridRef.current.applyColumnState({ state: state, applyOrder: true });
        }
      },
    }),
    [],
  );

  ModuleRegistry.registerModules([ClientSideRowModelModule]);

  return (
    <div
      style={{
        width: "100%",
        height: props.tableHeight ? `${props.tableHeight}dvh` : "100%",
      }}
    >
      <AgGridReact
        rowHeight={props.rowHeight}
        rowData={props.rowData}
        columnDefs={props.colDefs}
        pagination={true}
        paginationPageSize={50}
        paginationPageSizeSelector={[50, 25, 75]}
        rowSelection={rowSelection}
        onSelectionChanged={onSelectionChanged}
        onGridReady={gridReady}
        theme={appliedTheme}
        loadThemeGoogleFonts={true} 
      />
    </div>
  );
});

export default Table;
