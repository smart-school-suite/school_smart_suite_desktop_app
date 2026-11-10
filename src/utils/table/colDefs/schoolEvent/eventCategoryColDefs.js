import {
  textColumn,
  actionsColumn,
  dateColumn,
  numberColumn,
} from "@/utils/table/columns";
import TextComponent from "../../../../components/DataTableComponents/TextComponent";
import DepartmentTableBadge from "../../../../components/Badges/DepartmentTableBadge";
import AnnouncementStatusRenderer from "../../../../components/Badges/AnnouncementStatusRenderer";
import { AnnouncementAuthorRenderer } from "../../../../components/Badges/AnnouncementAuthorRenderer";
export function eventCategoryColDefs({ ActionComponent }) {
  return [
    textColumn({
      field: "name",
      headerName: "Title",
      hide: false,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "description",
      headerName: "Description",
      hide: false,
      cellRenderer: TextComponent,
    }),
     textColumn({
      field: "status",
      headerName: "Status",
      hide: false,
      cellRenderer: DepartmentTableBadge,
    }),
    dateColumn({
      field: "created_at",
      headerName: "Created At",
      hide: false,
    }),
    dateColumn({
      field: "updated_at",
      headerName: "Updated At",
      hide: false,
    }),
    actionsColumn({
      cellRenderer: ActionComponent,
    }),
  ];
}

export function schoolEventColDefs({ ActionComponent }) {
  return [
    textColumn({
      field: "author",
      headerName: "Author",
      cellRenderer: AnnouncementAuthorRenderer,
    }),
    textColumn({
      field: "title",
      headerName: "Title",
      hide: false,
      // drafts may not have a title yet
      valueGetter: (params) => params.data?.title || "Untitled draft",
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "description",
      headerName: "Description",
      hide: true,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "category_name",
      headerName: "Category",
      hide: false,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "status",
      headerName: "Status",
      hide: false,
      cellRenderer: AnnouncementStatusRenderer,
    }),
    textColumn({
      field: "location",
      headerName: "Location",
      hide: false,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "organizer",
      headerName: "Organizer",
      hide: true,
      cellRenderer: TextComponent,
    }),
    numberColumn({
      field: "invitee_count",
      headerName: "Invitees",
      hide: false,
    }),
    numberColumn({
      field: "likes_count",
      headerName: "Likes",
      hide: true,
    }),
    dateColumn({
      field: "start_date",
      headerName: "Starts At",
      format: "dd MMM yyyy, HH:mm",
      hide: false,
    }),
    dateColumn({
      field: "end_date",
      headerName: "Ends At",
      format: "dd MMM yyyy, HH:mm",
      hide: false,
    }),
    dateColumn({
      field: "published_at",
      headerName: "Published At",
      hide: true,
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
