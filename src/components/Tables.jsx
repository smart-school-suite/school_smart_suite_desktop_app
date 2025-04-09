import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import { AgGridReact } from "@ag-grid-community/react";
import { themeQuartz } from "@ag-grid-community/theming";
import { useMemo, useCallback } from "react";

function Table(props) {
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

  const onSelectionChanged = useCallback((event) => {
    const rowCount = event.api.getSelectedNodes().length;
    console.log('Selected row count:', rowCount); // Log the row count to the console
    props.handleRowCountFromChild(rowCount);
  }, [props]); // Add props to dependency array

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
        theme={myTheme}
      />
    </div>
  );
}

export default Table;