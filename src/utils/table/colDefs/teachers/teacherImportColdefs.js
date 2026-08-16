import TeacherTableBadge from "../../../../components/Badges/TeacherTableBadge";
import { TeacherAvatarComponent } from "../../../../components/DataTableComponents/TeacherTableAvatar";
import {
  textColumn,
  actionsColumn,
  dateColumn,
  numberColumn,
} from "@/utils/table/columns";
import TextComponent from "../../../../components/DataTableComponents/TextComponent";
import RepeatableGroupRenderer from "../../../../components/DataTableComponents/RepeatableGroupRenderer";

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
      field: "email",
      headerName: "Email",
      cellRenderer: TextComponent,
    }),

    textColumn({
      field: "phone",
      headerName: "Phone",
      cellRenderer: TextComponent,
    }),

    textColumn({
      field: "gender",
      headerName: "Gender",
      cellRenderer: TextComponent,
    }),

    textColumn({
      field: "address",
      headerName: "Address",
      cellRenderer: TextComponent,
    }),

    textColumn({
      field: "allowed_levels",
      headerName: "Allowed Levels",
      cellRenderer: RepeatableGroupRenderer,
      cellRendererParams: {
        label: "Allowed Levels",
        displayFields: ["allowed_level"],
        maxVisible: 3,
      },
    }),

    textColumn({
      field: "qualifications",
      headerName: "Qualifications",
      cellRenderer: RepeatableGroupRenderer,
      cellRendererParams: {
        label: "Qualifications",
        displayFields: ["qualification", "field_of_study"],
        maxVisible: 2,
        detailFields: [
          "qualification",
          "field_of_study",
          "institution",
          "year",
        ],
      },
    }),
  ];
}