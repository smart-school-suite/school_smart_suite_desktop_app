import {
  textColumn,
  actionsColumn,
  dateColumn,
  numberColumn,
} from "@/utils/table/columns";
import TextComponent from "../../../../components/DataTableComponents/TextComponent";
import AssignmentStatusRenderer from "../../../../components/Renderer/Hall/AssignmentStatus";
export const hallSpecialtyColDefs = ({ ActionComponent }) => {
  return [
    textColumn({
      field: "specialty",
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
      field: "level",
      headerName: "Level Number",
      hide: true,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "description",
      headerName: "Description",
      hide: true,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "assigned_hall_count",
      headerName: "Assigned Halls",
      hide: false,
      cellRenderer: TextComponent,
    }),
    numberColumn({
      field: "assignment_status",
      headerName: "Assignment Status",
      hide: false,
      cellRenderer: AssignmentStatusRenderer,
    }),
    textColumn({
      field: "department",
      headerName: "Department",
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
};

export default hallSpecialtyColDefs;
