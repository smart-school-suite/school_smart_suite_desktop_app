import { useMemo } from "react";
export function SchoolAdminColDefs(){
    const colDefs = useMemo(
        () => [
          {
            field: "Avatar",
            cellRenderer: ImageComponent,
            cellStyle: cellStyle,
          },
          { field: "id", cellRenderer: DataComponent },
          { field: "Full Names", cellRenderer: DataComponent },
          { field: "Role", cellRenderer: DataComponent },
          { field: "Email", cellRenderer: DataComponent },
          { field: "Salary", cellRenderer: DataComponent },
          {
            field: "Status",
            cellRenderer: StatusComponent,
            cellStyle: cellStyle,
          },
          { field: "Created At", cellRenderer: DataComponent },
          {
            field: "Action",
            cellRenderer: ActionButtonGroup,
            cellStyle: cellStyle,
          },
        ],
        []
      );
      return colDefs
}
