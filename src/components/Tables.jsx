import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { ModuleRegistry } from '@ag-grid-community/core';
import { AgGridReact } from '@ag-grid-community/react';
import { themeQuartz } from '@ag-grid-community/theming';
function Table(props) {
    const defaultColDef = {
        flex: 3,
    };
    
    const rowSelection = {
        mode: 'multiRow',
        headerCheckbox: false,
    };
    
    const myTheme = themeQuartz
	.withParams({
        browserColorScheme: "light",
        headerFontSize: 14,
        fontFamily: {
            googleFont: "Poppins"
        },
    });


    ModuleRegistry.registerModules([ClientSideRowModelModule]);

    return (
        <div
             // Use the default ag-theme-quartz class
            style={{ width: '100%', height: '78vh' }} // Use vh instead of dvh
        >
            <AgGridReact
                rowData={props.rowData}
                columnDefs={props.colDefs}
                defaultColDef={defaultColDef}
                pagination={true}
                paginationPageSize={50}
                paginationPageSizeSelector={[50, 25, 75]}
                rowSelection={rowSelection}
                theme={myTheme}
            />
        </div>
    );
}

export default Table;