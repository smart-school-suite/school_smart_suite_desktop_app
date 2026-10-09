import { CircleX } from "lucide-react";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { useSelector, useDispatch } from "react-redux";
import { resetCreateAnnouncement } from "../../Slices/announcement/announcementSlice";
import { useCreateAnnouncement } from "../../hooks/announcement/useCreateAnnouncement";
function AnnouncementDiscardWarning({ handleClose, rowData }) {
  const { handleCloseDrawer } = rowData;
  const { mutate: createAnnouncement, isPending } = useCreateAnnouncement(
    handleClose,
    handleCloseDrawer,
  );
  const dispatch = useDispatch();
  const moduleState = useSelector(
    (state) => state.announcement.createAnnouncement,
  );

  const handleDiscard = () => {
    handleCloseDrawer();
    dispatch(resetCreateAnnouncement());
  };

  const handleSaveToDraft = () => {
    const payload = {
      title: moduleState?.content?.title?.value || null,
      content: moduleState?.content?.content?.value || null,
      status: "draft",
      published_at: moduleState?.publication?.schedule?.value || null,
      category_id: moduleState?.content?.category?.value?.id || null,
      label_id: moduleState?.content?.label?.value?.id || null,
      tag_ids: moduleState?.content?.tags?.value?.map((t) => ({ tag_id: t.id })) || [],
      school_wide: moduleState?.audience?.types.includes("school_wide"),
      admin_audience: [
        {
          individual_ids:
            moduleState?.audience?.targeting?.administrators?.individualIds,
        },
      ],
      student_audience: [
        {
          individual_ids:
            moduleState?.audience?.targeting?.students?.individualIds,
          department_ids:
            moduleState?.audience?.targeting?.students?.criteria.departmentIds,
          specialty_ids:
            moduleState?.audience?.targeting?.students?.criteria.specialtyIds,
          level_ids:
            moduleState?.audience?.targeting?.students?.criteria.levelIds,
        },
      ],
      teacher_audience: [
        {
          individual_ids:
            moduleState?.audience?.targeting?.teachers?.individualIds,
          department_ids:
            moduleState?.audience?.targeting?.teachers?.criteria.departmentIds,
          specialty_ids:
            moduleState?.audience?.targeting?.teachers?.criteria.specialtyIds,
          level_ids:
            moduleState?.audience?.targeting?.teachers?.criteria.levelIds,
        },
      ],
    };

    createAnnouncement(payload);
  };
  return (
    <>
      <div className="w-100">
        <div
          className="border-bottom rounded-top-4 p-2 d-flex flex-column justify-content-center"
          style={{ height: "6dvh", background: "#f9f9f9" }}
        >
          <div className="d-flex flex-row align-items-center justify-content-between">
            <div>
              <span className="font-size-sm fw-semibold">
                Dont Loose Progress
              </span>
            </div>
            <button
              onClick={() => handleClose()}
              disabled={isPending}
              className="border-none border rounded-circle bg-transparent p-0"
              style={{
                width: "2rem",
                height: "2rem",
                display: "grid",
                placeItems: "center",
                cursor: "pointer",
              }}
            >
              <CircleX size={16} />
            </button>
          </div>
        </div>
        <div className="px-1 d-flex flex-column gap-2 font-size-sm pt-3">
          <span className="fw-semibold">Are you Absolutely sure ?</span>
          <p>
            This action cannot be undone. This will Permanently delete This
            account and remove this account data from our servers
          </p>
        </div>
        <div className="mt-auto border-top p-2" style={{ height: "8dvh" }}>
          <div className="d-flex flex-row align-items-center justify-content-end gap-2 w-100">
            <button
              className="border-none px-3 py-2 border rounded-3 font-size-sm w-50 bg-none"
              onClick={() => {
                handleDiscard();
              }}
              disabled={isPending}
            >
              Discard
            </button>
            <button
              className="border-none px-3 py-2 rounded-3 font-size-sm primary-background text-white w-50"
              onClick={() => {
                handleSaveToDraft();
              }}
              disabled={isPending}
            >
              {isPending ? <SingleSpinner /> : "Yes, Save to draft"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AnnouncementDiscardWarning;
