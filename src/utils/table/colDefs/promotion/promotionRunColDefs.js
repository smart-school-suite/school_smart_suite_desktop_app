import { actionsColumn, dateColumn, numberColumn, textColumn } from "@/utils/table/columns";
import TextComponent from "../../../../components/DataTableComponents/TextComponent";
import PromotionRunStatusRenderer from "../../../../components/Renderer/Promotion/PromotionRunStatusRenderer";
function promotionRunColDefs({ ActionComponent }) {
  return [
    textColumn({
      field: "academic_year",
      headerName: "Academic Year",
      hide: false,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "specialty",
      headerName: "Specialty",
      hide: false,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "level",
      headerName: "Level",
      hide: false,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "level_name",
      headerName: "Level Name",
      hide: false,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "status",
      headerName: "Status",
      hide: false,
      cellRenderer: PromotionRunStatusRenderer,
    }),
    textColumn({
      field: "department",
      headerName: "Department",
      hide: false,
      cellRenderer: TextComponent,
    }),
    numberColumn({
      field: "total_students",
      headerName: "Total Students",
      hide: true,
    }),
    numberColumn({
      field: "processed_students",
      headerName: "Processed Students",
      hide: true,
    }),
    numberColumn({
      field: "promoted_count",
      headerName: "Promoted Students",
      hide: true,
    }),
    numberColumn({
      field: "repeated_count",
      headerName: "Repeated Students",
      hide: true,
    }),
    numberColumn({
      field: "graduated_count",
      headerName: "Graduated Students",
      hide: true,
    }),
    numberColumn({
      field: "review_count",
      headerName: "Pending Review",
      hide: true,
    }),
    numberColumn({
      field: "excluded_count",
      headerName: "Excluded",
      hide: true,
    }),
    numberColumn({
      field: "failed_count",
      headerName: "Failed",
      hide: true,
    }),
    dateColumn({
      field: "ac_start_date",
      headerName: "Academic Year Start",
      format: "dd/MM/yyyy",
      hide: true,
    }),
    dateColumn({
      field: "ac_end_date",
      headerName: "Academic Year End",
      format: "dd/MM/yyyy",
      hide: true,
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

export default promotionRunColDefs;
