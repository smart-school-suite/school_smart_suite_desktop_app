import {
  textColumn,
  actionsColumn,
  dateColumn,
  numberColumn,
} from "@/utils/table/columns";
import SpecailtyTableBadge from "../../../../components/Badges/SpecialtyTableBadge";
import TextComponent from "../../../../components/DataTableComponents/TextComponent";
import CurrencyComponent from "../../../../components/DataTableComponents/CurrencyComponent";

export function courseColDefs({ ActionComponent }) {
  return [
    textColumn({
      field: "course_title",
      headerName: "Course Title",
      hide: false,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "course_code",
      headerName: "Course Code",
      hide: false,
      cellRenderer: TextComponent,
    }),
    numberColumn({
      field: "course_credit",
      headerName: "Course Credit",
      hide: false,
    }),
    textColumn({
      field: "course_description",
      headerName: "Course Description",
      hide: false,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "semester_title",
      headerName: "Semester Title",
      hide: false,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "semester_count",
      headerName: "Semester Count",
      hide: true,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "specialty_name",
      headerName: "Specialty",
      hide: false,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "status",
      headerName: "Status",
      cellRenderer: SpecailtyTableBadge,
    }),
    textColumn({
      field: "level_name",
      headerName: "Level Name",
      hide: false,
      cellRenderer: TextComponent,
    }),
    numberColumn({
      field: "level_number",
      headerName: "Level Number",
      hide: true,
      cellRenderer: TextComponent,
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
