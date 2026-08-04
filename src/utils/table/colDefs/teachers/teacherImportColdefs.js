import TeacherTableBadge from "../../../../components/Badges/TeacherTableBadge";
import { TeacherAvatarComponent } from "../../../../components/DataTableComponents/TeacherTableAvatar";
import {
  textColumn,
  actionsColumn,
  dateColumn,
  numberColumn,
} from "@/utils/table/columns";
import TextComponent from "../../../../components/DataTableComponents/TextComponent";

export function teacherImportColDefs() {
  return [
    textColumn({
      field: "first_name",
      headerName: "First Name",
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "last_name",
      headerName: "Last Name",
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "full_names",
      headerName: "Full Names",
      cellRenderer: TextComponent,
    }),
    textColumn({
      headerName: "Email",
      field: "email",
      cellRenderer: TextComponent,
    }),
    textColumn({
      headerName: "Phone",
      field: "phone",
      cellRenderer: TextComponent,
    }),
    textColumn({
      headerName: "Gender",
      field: "gender",
      cellRenderer: TextComponent,
    }),
    textColumn({
      headerName: "Address",
      field: "address",
      cellRenderer: TextComponent,
    }),
    textColumn({
      headerName: "Allowed Levels",
      field: "allowed_levels",
    }),
    textColumn({
      headerName: "Qualifications",
      field: "qualifications",
    })
  ];
}
