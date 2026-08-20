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

export function tuitionFeeColDefs({ ActionComponent }) {
  return [
    textColumn({
      field: "profile_picture",
      headerName: "Avatar",
      cellRenderer: TeacherAvatarComponent,
    }),
    textColumn({
      field: "name",
      headerName: "Full Names",
      hide: false,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "first_name",
      headerName: "First Name",
      hide: true,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "last_name",
      headerName: "Last Name",
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
      field: "department",
      headerName: "Department",
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
      field: "amount_paid",
      headerName: "Amount Paid",
      hide: false,
      cellRenderer: CurrencyComponent,
    }),
    numberColumn({
      field: "amount_left",
      headerName: "Amount Left",
      hide: false,
      cellRenderer: CurrencyComponent,
    }),
    numberColumn({
      field: "tution_fee_total",
      headerName: "Total",
      hide: false,
      cellRenderer: CurrencyComponent,
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
