import React, { forwardRef, useImperativeHandle, useMemo, useCallback, useRef } from 'react';
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import { AgGridReact } from "@ag-grid-community/react";
import { themeQuartz } from "@ag-grid-community/theming";
import { useSelector } from 'react-redux';

const Table = forwardRef((props, ref) => {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const gridRef = useRef();

  const defaultColDef = {
    flex: 3,
  };

  const rowSelection = useMemo(() => ({
    mode: "multiRow",
  }), []);

  // Define themes for light and dark
  const lightTheme = themeQuartz.withParams({
    browserColorScheme: "light",
    headerFontSize: 14,
    fontFamily: { googleFont: "Poppins" },
  });

  const darkTheme = themeQuartz.withParams({
    browserColorScheme: "dark",
    headerFontSize: 14,
    fontFamily: { googleFont: "Poppins" },
    backgroundColor: "#111", 
    foregroundColor: "#666",  
    headerBackgroundColor: "#111",
    headerForegroundColor: "#f5f5f5",
  });

  const appliedTheme = darkMode ? darkTheme : lightTheme;

  const onSelectionChanged = useCallback((event) => {
    const selectedNodes = event.api.getSelectedNodes();
    const selectedData = selectedNodes.map((node) => node.data);

    if (props.handleRowCountFromChild) {
      props.handleRowCountFromChild(selectedData.length);
    }

    if (props.handleRowDataFromChild) {
      props.handleRowDataFromChild(selectedData);
    }
  }, [props]);

  const gridReady = useCallback((params) => {
    gridRef.current = params.api;
  }, []);

  useImperativeHandle(ref, () => ({
    deselectAll: () => {
      if (gridRef.current) {
        gridRef.current.deselectAll();
      }
    },
  }));

  ModuleRegistry.registerModules([ClientSideRowModelModule]);

  return (
    <div style={{ width: "100%", height: "78vh" }}>
      <AgGridReact
        rowHeight={props.rowHeight}
        rowData={props.rowData}
        columnDefs={props.colDefs}
        defaultColDef={defaultColDef}
        pagination={true}
        paginationPageSize={50}
        paginationPageSizeSelector={[50, 25, 75]}
        rowSelection={rowSelection}
        onSelectionChanged={onSelectionChanged}
        onGridReady={gridReady}
        theme={appliedTheme}   // 👈 dynamic theme applied here
      />
    </div>
  );
});

export default Table;
