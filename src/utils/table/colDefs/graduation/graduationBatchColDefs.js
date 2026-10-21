import {
  actionsColumn,
  dateColumn,
  textColumn
} from "@/utils/table/columns";
import TextComponent from "../../../../components/DataTableComponents/TextComponent";

export function graduationBatchColDefs({ ActionComponent }) {
  return [
     textColumn({
      field: "name",
      headerName: "Title",
      hide: false,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "description",
      headerName: "Description",
      hide: false,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "location",
      headerName: "Location",
      hide: false,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "academic_year_name",
      headerName: "Academic Year",
      hide: false,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "academic_year_start",
      headerName: "Academic Year End",
      hide: true,
      cellRenderer: TextComponent,
    }),
     textColumn({
      field: "academic_year_end",
      headerName: "Academic Year End",
      hide: true,
      cellRenderer: TextComponent,
    }),
    dateColumn({
      field: "graduation_start_date",
      headerName: "Start Date",
      format: "dd/MM/yyyy",
      hide: false,
    }),
    dateColumn({
      field: "graduation_end_date",
      headerName: "End Date",
      format: "dd/MM/yyyy",
      hide: false,
    }),
    dateColumn({
      field: "created_at",
      headerName: "Created At",
      format: "dd/MM/yyyy",
      hide: true,
    }),
    dateColumn({
      field: "updated_at",
      headerName: "Updated At",
      format: "dd/MM/yyyy",
      hide: true,
    }),
    actionsColumn({
      cellRenderer: ActionComponent,
    }),
  ];
}

export default graduationBatchColDefs;
