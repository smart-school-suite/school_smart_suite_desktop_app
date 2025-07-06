import React, { forwardRef, useImperativeHandle, useMemo, useCallback, useRef } from 'react';
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import { AgGridReact } from "@ag-grid-community/react";
import { themeQuartz } from "@ag-grid-community/theming";

const Table = forwardRef((props, ref) => {
  const gridRef = useRef();
  const defaultColDef = {
    flex: 3,
  };

  const rowSelection = useMemo(() => ({
    mode: "multiRow",
  }), []);

  const myTheme = themeQuartz.withParams({
    browserColorScheme: "light",
    headerFontSize: 14,
    fontFamily: {
      googleFont: "Poppins",
    },
  });

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
        theme={myTheme}
      />
    </div>
  );
});

export default Table;