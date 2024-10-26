import { useEffect, useState } from "react";
import axios from "../axios/axios";
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { ModuleRegistry } from '@ag-grid-community/core';
import { AgGridReact } from '@ag-grid-community/react';
import clean_array_data from "../utils/functions";
import { themeQuartz } from '@ag-grid-community/theming';
function Table() {
    const KEY = '29e494f1837c47baa9e19c559';
    const [data, setData] = useState([]);
    const [colDefs, setColDefs] = useState([
        { field: 'name', filter: true, floatingFilter: true },
        { field: 'phone_one', filter: true, floatingFilter: true },
        { field: 'phone_two', filter: true, floatingFilter: true },
        { field: 'gender', filter: true, floatingFilter: true },
        { field: 'fee_status', filter: true, floatingFilter: true },
        { field: 'total_fee_debt', filter: true, floatingFilter: true }
    ]);
    
    const defaultColDef = {
        flex: 1,
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

    useEffect(() => {
        const fetch_student = async () => {
            try {
                const response = await axios.get('api/student/get-students', {
                    headers: {
                        SCHOOL_BRANCH_KEY: KEY
                    }
                });
                setData(response.data.students);
            } catch (e) {
                console.log("something went wrong");
            }
        };
        fetch_student();
    }, []);

    ModuleRegistry.registerModules([ClientSideRowModelModule]);

    return (
        <div
             // Use the default ag-theme-quartz class
            style={{ width: '100%', height: '78vh' }} // Use vh instead of dvh
        >
            <AgGridReact
                rowData={clean_array_data(data, ['name', 'phone_one', 'phone_two', 'gender', 'fee_status', 'total_fee_debt'])}
                columnDefs={colDefs}
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