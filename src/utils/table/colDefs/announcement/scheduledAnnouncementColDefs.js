import {
  textColumn,
  actionsColumn,
  dateColumn,
  numberColumn,
} from "@/utils/table/columns";
import { BadgeRenderer } from "@/components/Renderer/badges";
import TextComponent from "../../../../components/DataTableComponents/TextComponent";
import { AnnouncementAuthorRenderer } from "../../../../components/Badges/AnnouncementAuthorRenderer";
export function scheduledAnnouncementColDefs({ ActionComponent }) {
  return [
    textColumn({
      field: "author",
      headerName: "Author",
      cellRenderer: AnnouncementAuthorRenderer,
    }),
    textColumn({
      field: "author_name",
      headerName: "Author Name",
      cellRenderer: TextComponent,
      hide: true,
    }),
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
      cellRenderer: BadgeRenderer,
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
      cellRenderer: BadgeRenderer,
    }),
    dateColumn({
      field: "published_at",
      headerName: "Published At",
      hide: true,
    }),
    dateColumn({
      field: "expires_at",
      headerName: "Expires At",
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
