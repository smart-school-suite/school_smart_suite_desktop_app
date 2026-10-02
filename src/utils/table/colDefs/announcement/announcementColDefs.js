import {
  textColumn,
  actionsColumn,
  dateColumn,
  numberColumn,
} from "@/utils/table/columns";
import TextComponent from "../../../../components/DataTableComponents/TextComponent";
import AnnouncementStatusRenderer from "../../../../components/Badges/AnnouncementStatusRenderer";
import AnnouncementLabelRenderer from "../../../../components/Badges/AnnouncementLabelRenderer";
export function announcementColDefs({ ActionComponent }) {
  return [
    textColumn({
      field: "title",
      headerName: "Title",
      hide: false,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "content",
      headerName: "Content",
      hide: false,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "label_name",
      headerName: "Label",
      hide: false,
      cellRenderer: AnnouncementLabelRenderer,
    }),
    numberColumn({
      field: "recipient_count",
      headerName: "Recipient",
      hide: false,
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
    dateColumn({
      field: "published_at",
      headerName: "Published At",
      hide: false,
    }),
     dateColumn({
      field: "expires_at",
      headerName: "Expires At",
      hide: false,
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
