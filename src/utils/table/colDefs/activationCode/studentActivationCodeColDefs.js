import {
  actionsColumn,
  dateColumn,
  textColumn
} from "@/utils/table/columns";
import StudentAction from "../../../../components/Badges/ActivationCode/StudentAction";
import TextComponent from "../../../../components/DataTableComponents/TextComponent";
import { AvatarRenderer } from "../../../../components/Renderer/AvatarRenderer";
export function studentActivationCodeColDefs() {
  return [
    textColumn({
      field: "profile_picture",
      headerName: "Avatar",
      cellRenderer: AvatarRenderer,
    }),
    textColumn({
      field: "name",
      headerName: "Student Name",
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
      field: "level",
      headerName: "Level Number",
      hide: false,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "sub_status",
      headerName: "Subscription Status",
      hide: false,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "activation_code",
      headerName: "Activation Code",
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
      cellRenderer: StudentAction,
    }),
  ];
}
