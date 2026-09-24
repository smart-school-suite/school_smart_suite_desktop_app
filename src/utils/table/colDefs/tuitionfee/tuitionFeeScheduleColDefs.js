import {
  textColumn,
  actionsColumn,
  dateColumn,
  numberColumn,
} from "@/utils/table/columns";
import TextComponent from "../../../../components/DataTableComponents/TextComponent";
import CurrencyComponent from "../../../../components/DataTableComponents/CurrencyComponent";
import { TeacherAvatarComponent } from "../../../../components/DataTableComponents/TeacherTableAvatar";
import TuitionFeePaymentStatusRenderer from "../../../../components/Badges/TuitionFeePaymentStatusRenderer";
import TuitionFeeScheduleStatusRenderer from "../../../../components/Badges/TuitionFeeScheduleStatusRenderer";

export function tuitionFeeScheduleColDefs({ ActionComponent }) {
  return [
    dateColumn({
      field: "start_date",
      headerName: "Start Date",
      hide: false,
    }),
    dateColumn({
      field: "end_date",
      headerName: "End Date",
      hide: false,
    }),
    numberColumn({
      field: "tuition_fee",
      headerName: "Tuition Fee",
      hide: false,
      cellRenderer: CurrencyComponent,
    }),
    textColumn({
      field: "specialty_name",
      headerName: "Specialty",
      hide: false,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "department_name",
      headerName: "Department",
      hide: false,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "academic_year",
      headerName: "Academic Year",
      hide: false,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "config_status",
      headerName: "Config Status",
      hide: false,
      cellRenderer: TuitionFeeScheduleStatusRenderer,
    }),
    textColumn({
      field: "level_number",
      headerName: "Level Number",
      hide: true,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "level_name",
      headerName: "Level Name",
      hide: false,
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
