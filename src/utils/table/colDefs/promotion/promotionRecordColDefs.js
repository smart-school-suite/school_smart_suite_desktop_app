import { actionsColumn, dateColumn, textColumn } from "@/utils/table/columns";
import TextComponent from "../../../../components/DataTableComponents/TextComponent";
import { AvatarRenderer } from "../../../../components/Renderer/AvatarRenderer";
import PromotionRecordOutComeRenderer from "../../../../components/Renderer/Promotion/PromotionRecordOutComeRenderer";
import PromotionRecordStatusRenderer from "../../../../components/Renderer/Promotion/PromotionRecordStatusRenderer";

function promotionRecordColDefs({ ActionComponent }) {
  return [
    textColumn({
      field: "student_avatar",
      headerName: "Student Avatar",
      hide: false,
      cellRenderer: AvatarRenderer,
      cellRendererParams: {
        firstNameField: "s_first_name",
        lastNameField: "s_last_name",
        usernameField: "s_username",
        avatarField: "s_profile_picture",
      },
    }),
    textColumn({
      field: "s_full_name",
      headerName: "Student Names",
      hide: false,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "outcome",
      headerName: "Outcome",
      hide: false,
      cellRenderer: PromotionRecordOutComeRenderer,
    }),
    textColumn({
      field: "status",
      headerName: "Status",
      hide: true,
      cellRenderer: PromotionRecordStatusRenderer,
    }),
    dateColumn({
      field: "processed_at",
      headerName: "Processed At",
      format: "dd/MM/yyyy",
      hide: true,
    }),
    dateColumn({
      field: "reviewed_at",
      headerName: "Reviewed At",
      format: "dd/MM/yyyy",
      hide: true,
    }),
    textColumn({
      field: "admin_note",
      headerName: "Admin Note",
      hide: true,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "s_first_name",
      headerName: "Student First Name",
      hide: true,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "s_last_name",
      headerName: "Student Last Name",
      hide: true,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "academic_year",
      headerName: "Academic Year",
      hide: true,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "from_spec_name",
      headerName: "From Specialty",
      hide: false,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "from_level_name",
      headerName: "From Level Name",
      hide: false,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "from_level_number",
      headerName: "From Level Number",
      hide: true,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "to_spec_name",
      headerName: "To Specialty",
      hide: false,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "to_level_name",
      headerName: "To Level Name",
      hide: false,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "to_level_number",
      headerName: "To Level Number",
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

export default promotionRecordColDefs;
