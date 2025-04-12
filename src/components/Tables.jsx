import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import { AgGridReact } from "@ag-grid-community/react";
import { themeQuartz } from "@ag-grid-community/theming";
import { useMemo, useCallback, useRef } from "react";

function Table(props) {
  const gridRef = useRef();
  const defaultColDef = {
    flex: 3,
  };

  const rowSelection = useMemo(() => {
    return {
      mode: "multiRow",
    };
  }, []);

  const myTheme = themeQuartz.withParams({
    browserColorScheme: "light",
    headerFontSize: 14,
    fontFamily: {
      googleFont: "Poppins",
    },
  });

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
    [props]
  );

  const onGridReady = useCallback((params) => {
    gridRef.current = params.api;
    if (props.provideResetFunctionToParent) {
      props.provideResetFunctionToParent(() => {
        params.api.deselectAll(); 
      });
    }
  }, [props]);

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
        onGridReady={onGridReady}
        theme={myTheme}
      />
    </div>
  );
}

export default Table;