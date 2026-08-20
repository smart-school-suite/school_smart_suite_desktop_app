import {
  textColumn,
  actionsColumn,
  dateColumn,
  numberColumn,
} from "@/utils/table/columns";
import SpecailtyTableBadge from "../../../../components/Badges/SpecialtyTableBadge";
import TextComponent from "../../../../components/DataTableComponents/TextComponent";
import CurrencyComponent from "../../../../components/DataTableComponents/CurrencyComponent";
import { TeacherAvatarComponent } from "../../../../components/DataTableComponents/TeacherTableAvatar";
export function tuitionFeeTransacColDefs({ ActionComponent }) {
  return [
    textColumn({
      field: "transaction_id",
      headerName: "Transaction Id",
      hide: false,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "student_name",
      headerName: "Student Name",
      hide: false,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "specialty_name",
      headerName: "Specialty",
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
    numberColumn({
      field: "amount",
      headerName: "Amount Paid",
      hide: false,
      cellRenderer: CurrencyComponent,
    }),
     textColumn({
      field: "payment_method",
      headerName: "Payment Method",
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
