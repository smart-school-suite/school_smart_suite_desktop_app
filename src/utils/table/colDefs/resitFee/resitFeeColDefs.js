import {
  textColumn,
  actionsColumn,
  dateColumn,
  numberColumn,
} from "@/utils/table/columns";
import TextComponent from "../../../../components/DataTableComponents/TextComponent";
import CurrencyComponent from "../../../../components/DataTableComponents/CurrencyComponent";;
import ResitStatusRenderer from "../../../../components/Badges/ResitStatus";
import RegistrationFeeTableBadge from "../../../../components/Badges/RegistrationFeeTableBadge"

export function resitFeeColDefs({ ActionComponent }) {
  return [
    textColumn({
      field: "student_name",
      headerName: "Student Name",
      hide: false,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "course_title",
      headerName: "Course Title",
      hide: false,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "course_code",
      headerName: "Course Code",
      hide: true,
      cellRenderer: TextComponent,
    }),
    numberColumn({
      field: "course_credit",
      headerName: "Course Credit",
      hide: true,
    }),
    textColumn({
      field: "specialty_name",
      headerName: "Specialty Name",
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
      field: "level_number",
      headerName: "Level Number",
      hide: true,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "resit_fee",
      headerName: "Amount",
      hide: false,
      cellRenderer: CurrencyComponent,
    }),
    textColumn({
      field: "payment_status",
      headerName: "Payment Status",
      hide: false,
      cellRenderer: RegistrationFeeTableBadge,
    }),
    textColumn({
      field: "carry_over_status",
      headerName: "Status",
      hide: true,
      cellRenderer: ResitStatusRenderer,
    }),
    textColumn({
      field: "exam_name",
      headerName: "Exam",
      hide: false,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "school_year",
      headerName: "School Year",
      hide: true,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "semester",
      headerName: "Semester",
      hide: true,
      cellRenderer: TextComponent,
    }),
    numberColumn({
      field: "attempts",
      headerName: "Attempts",
      hide: false,
    }),
    dateColumn({
      field: "created_at",
      headerName: "Created At",
      hide: true,
    }),
    dateColumn({
      field: "updated_at",
      headerName: "Updated At",
      hide: true,
    }),
    actionsColumn({
      cellRenderer: ActionComponent,
    }),
  ];
}
